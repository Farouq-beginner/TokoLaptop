package com.example.tokolaptop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.tokolaptop.model.CartItem;
import com.example.tokolaptop.model.User;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
    CartItem findByUserAndLaptopId(User user, Long laptopId);
}
