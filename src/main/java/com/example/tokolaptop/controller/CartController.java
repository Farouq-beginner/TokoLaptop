package com.example.tokolaptop.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import com.example.tokolaptop.model.CartItem;
import com.example.tokolaptop.model.Laptop;
import com.example.tokolaptop.model.User;
import com.example.tokolaptop.repository.CartItemRepository;
import com.example.tokolaptop.repository.LaptopRepository;
import com.example.tokolaptop.service.CartService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private LaptopRepository laptopRepository;

    @PostMapping("/add/{laptopId}")
    public Map<String, Object> addToCart(@PathVariable Long laptopId, HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        User user = (User) session.getAttribute("loggedInUser");

        if (user == null) {
            response.put("success", false);
            response.put("message", "Not logged in");
            return response;
        }

        cartService.addToCart(user, laptopId);
        int totalItems = cartService.getTotalItems(user);

        response.put("success", true);
        response.put("totalItems", totalItems);
        return response;
    }

    @GetMapping("/total-items")
    public int getTotalItems(HttpSession session) {
        User user = (User) session.getAttribute("loggedInUser");
        return user == null ? 0 : cartService.getTotalItems(user);
    }

    @GetMapping("/view")
    public ModelAndView viewCart(HttpSession session) {
        User user = (User) session.getAttribute("loggedInUser");
        if (user == null) return new ModelAndView("redirect:/loginmasuk");

        List<CartItem> cartItems = cartService.getCartItems(user);
        ModelAndView mav = new ModelAndView("cart");
        mav.addObject("cartItems", cartItems);
        return mav;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCartItem(@PathVariable Long id, HttpSession session) {
        User user = (User) session.getAttribute("loggedInUser");
        if (user == null) {
            return ResponseEntity.status(401).body("Belum login");
        }

        CartItem item = cartItemRepository.findById(id).orElse(null);
        if (item == null) {
            return ResponseEntity.notFound().build();
        }

        if (!item.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body("Anda tidak memiliki akses ke item ini");
        }

        cartItemRepository.deleteById(id);
        return ResponseEntity.ok("Item berhasil dihapus");
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<String> updateQuantity(@PathVariable Long id, @RequestParam int quantity) {
        Optional<CartItem> cartItemOpt = cartItemRepository.findById(id);
        if (cartItemOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        CartItem cartItem = cartItemOpt.get();
        Laptop laptop = cartItem.getLaptop();

        if (quantity > laptop.getStockQuantity()) {
            return ResponseEntity.badRequest().body("Jumlah melebihi stok tersedia.");
        }

        cartItem.setQuantity(quantity);
        cartItemRepository.save(cartItem);
        return ResponseEntity.ok("Jumlah berhasil diperbarui.");
    }

    @PostMapping("/checkout")
    public ModelAndView checkout(
            @RequestParam(name = "selectedItems", required = false) List<Long> selectedItems,
            HttpSession session) {
    
        User user = (User) session.getAttribute("loggedInUser");
    
        if (user != null && selectedItems != null && !selectedItems.isEmpty()) {
            List<CartItem> selectedCartItems = cartService.getCartItemsByIds(user, selectedItems);
            session.setAttribute("checkoutItems", selectedCartItems);
        }
    
        return new ModelAndView("Pembayaran");
    }

    @PostMapping("/payment/process")
    public ModelAndView processPayment(HttpSession session) {
        User user = (User) session.getAttribute("loggedInUser");
        List<CartItem> checkoutItems = (List<CartItem>) session.getAttribute("checkoutItems");

        if (user != null && checkoutItems != null) {
            for (CartItem item : checkoutItems) {
                Laptop laptop = item.getLaptop();
                int currentStock = laptop.getStockQuantity();
                int quantity = item.getQuantity();

                if (quantity <= currentStock) {
                    laptop.setStockQuantity(currentStock - quantity);
                    laptopRepository.save(laptop);
                    cartItemRepository.deleteById(item.getId());
                }
            }
            session.removeAttribute("checkoutItems");
        }

        return new ModelAndView("/payment-succes");
    }

    @GetMapping("/items")
    public List<Map<String, Object>> getCartItems(HttpSession session) {
        User user = (User) session.getAttribute("loggedInUser");
        if (user == null)
            return List.of();

        List<CartItem> cartItems = cartService.getCartItems(user);

        return cartItems.stream().map(item -> {
            Map<String, Object> itemMap = new HashMap<>();
            itemMap.put("id", item.getId());
            itemMap.put("name", item.getLaptop().getName());
            itemMap.put("price", item.getLaptop().getPrice());
            itemMap.put("image", item.getLaptop().getImage());
            itemMap.put("quantity", item.getQuantity());
            return itemMap;
        }).toList();
    }

    @GetMapping("/total")
public Map<String, Object> getTotal(HttpSession session) {
    User user = (User) session.getAttribute("loggedInUser");
    Map<String, Object> response = new HashMap<>();

    if (user == null) {
        response.put("total", 0L);
        response.put("count", 0);
        return response;
    }

    List<CartItem> cartItems = cartService.getCartItems(user);

    long total = cartItems.stream()
            .mapToLong(item -> item.getLaptop().getPrice() * item.getQuantity())
            .sum();

    int count = cartItems.stream()
            .mapToInt(CartItem::getQuantity)
            .sum();

    response.put("total", total);
    response.put("count", count);
    return response;
}

}
