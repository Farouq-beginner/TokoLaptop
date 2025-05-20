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

    public void addToCart(User user, Long laptopId) {
        // Perbaikan: casting dari Object ke CartItem
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
}
