package com.example.tokolaptop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class LoginController {

   

    @GetMapping("/Login")
    public String showLoginForm() {
        return "login";
    }

   
}
