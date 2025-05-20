package com.example.tokolaptop.controller;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}


