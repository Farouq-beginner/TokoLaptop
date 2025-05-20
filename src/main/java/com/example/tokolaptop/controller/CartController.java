package com.example.tokolaptop.controller;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.example.tokolaptop.model.CartItem;
import com.example.tokolaptop.model.User;
import com.example.tokolaptop.service.CartService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

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
        if (user == null) return 0;
        return cartService.getTotalItems(user);
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


    @PostMapping("/delete/{id}")
    public String deleteCartItem(@PathVariable Long id) {
        cartService.deleteItemById(id);
        return "redirect:/cart/view";
    }

    @PostMapping("/update/{id}")
    public String updateQuantity(@PathVariable Long id, @RequestParam int quantity) {
        cartService.updateItemQuantity(id, quantity);
        return "redirect:/cart/view";
    }

    @PostMapping("/checkout")
    public String checkout(@RequestParam(name = "selectedItems", required = false) List<Long> selectedItems, HttpSession session) {
    User user = (User) session.getAttribute("loggedInUser");

    if (user != null && selectedItems != null && !selectedItems.isEmpty()) {
        cartService.checkoutSelectedItems(user, selectedItems); // Buat method ini di CartService
    }

    return "redirect:/Home";
    }



    @GetMapping("/items")
    public List<Map<String, Object>> getCartItems(HttpSession session) {
    User user = (User) session.getAttribute("loggedInUser");
    if (user == null) return List.of(); // tambahkan ini biar null-safe

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




}


