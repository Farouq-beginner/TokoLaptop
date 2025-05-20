package com.example.tokolaptop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.tokolaptop.model.CartItem;
import com.example.tokolaptop.model.Laptop;
import com.example.tokolaptop.model.User;
import com.example.tokolaptop.repository.CartItemRepository;
import com.example.tokolaptop.repository.LaptopRepository;

@Service
public class CartService {

    @Autowired
    private CartItemRepository cartRepo;

    @Autowired
    private LaptopRepository laptopRepo;

    @Autowired
    private CartItemRepository cartItemRepository;


    public void addToCart(User user, Long laptopId) {
       
        Object result = cartRepo.findByUserAndLaptopId(user, laptopId);
        CartItem item = result instanceof CartItem ? (CartItem) result : null;

        if (item != null) {
            item.setQuantity(item.getQuantity() + 1);
        } else {
            Laptop laptop = laptopRepo.findById(laptopId).orElseThrow();
            item = new CartItem(user, laptop, 1);
        }
        cartRepo.save(item);
    }

    public List<CartItem> getCartItems(User user) {
        // Perbaikan jika findByUser mengembalikan List<Object>
        List<?> result = cartRepo.findByUser(user);
        return result.stream()
                .filter(obj -> obj instanceof CartItem)
                .map(obj -> (CartItem) obj)
                .toList();
    }

    public int getTotalItems(User user) {
        return getCartItems(user).stream()
                .mapToInt(CartItem::getQuantity)
                .sum();
    }
    
    public void deleteItemById(Long id) {
    cartItemRepository.deleteById(id);
    }

    public void updateItemQuantity(Long id, int quantity) {
    CartItem item = cartItemRepository.findById(id).orElse(null);
    if (item != null && quantity > 0) {
        item.setQuantity(quantity);
        cartItemRepository.save(item);
    }
    }

    public void clearCart(User user) {
    List<CartItem> items = cartItemRepository.findByUser(user);
    cartItemRepository.deleteAll(items);
    }

    public void checkoutSelectedItems(User user, List<Long> selectedItemIds) {
    List<CartItem> userCart = getCartItems(user);

    for (CartItem item : userCart) {
        if (selectedItemIds.contains(item.getId())) {
            deleteItemById(item.getId()); // atau proses order sesuai logikamu
        }
    }
}


}
