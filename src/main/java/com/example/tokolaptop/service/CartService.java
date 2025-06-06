package com.example.tokolaptop.service;

import java.util.List;
import java.util.Optional;

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
    private CartItemRepository cartItemRepository;

    @Autowired
    private LaptopRepository laptopRepo;

    public void addToCart(User user, Long laptopId) {
        Optional<Laptop> laptopOpt = laptopRepo.findById(laptopId);
        if (laptopOpt.isEmpty()) return;

        Laptop laptop = laptopOpt.get();
        if (laptop.getStockQuantity() <= 0) return;

        CartItem item = cartItemRepository.findByUserAndLaptopId(user, laptopId);
        if (item != null) {
            int newQuantity = item.getQuantity() + 1;
            if (newQuantity > laptop.getStockQuantity()) {
                return;
            }
            item.setQuantity(newQuantity);
        } else {
            item = new CartItem(user, laptop, 1);
        }

        cartItemRepository.save(item);
    }

    public List<CartItem> getCartItems(User user) {
        return cartItemRepository.findByUser(user);
    }

    public List<CartItem> getCartItemsByIds(User user, List<Long> itemIds) {
        return cartItemRepository.findAllById(itemIds).stream()
                .filter(item -> item.getUser().getId().equals(user.getId()))
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
            Laptop laptop = item.getLaptop();
            if (quantity <= laptop.getStockQuantity()) {
                item.setQuantity(quantity);
                cartItemRepository.save(item);
            }
        }
    }

    public void clearCart(User user) {
        List<CartItem> items = cartItemRepository.findByUser(user);
        cartItemRepository.deleteAll(items);
    }

    public void checkoutSelectedItems(User user, List<Long> selectedItemIds) {
        List<CartItem> items = getCartItemsByIds(user, selectedItemIds);

        for (CartItem item : items) {
            Laptop laptop = item.getLaptop();
            int qty = item.getQuantity();
            if (qty <= laptop.getStockQuantity()) {
                laptop.setStockQuantity(laptop.getStockQuantity() - qty);
                laptopRepo.save(laptop);
                cartItemRepository.deleteById(item.getId());
            }
        }
    }
}
