package com.example.tokolaptop.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.tokolaptop.model.User;
import com.example.tokolaptop.repository.UserRepository;

import jakarta.servlet.http.HttpSession;

@Controller
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Halaman DAFTAR akun
    @GetMapping("/login")
    public String registerForm() {
        return "Login"; // Login.html adalah halaman daftar
    }

    // Proses DAFTAR akun
    @PostMapping("/register")
    public String register(@RequestParam String name,
                           @RequestParam String email,
                           @RequestParam String password,
                           Model model) {
        if (userRepo.findByEmail(email).isPresent()) {
            model.addAttribute("error", "Email sudah terdaftar");
            return "Login"; // kembali ke form daftar
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("PEMBELI");

        userRepo.save(user);
        return "redirect:/login"; // redirect ke halaman login
    }

    @GetMapping("/loginmasuk")
    public String loginForm() {
        return "LoginMasuk"; // arahkan ke LoginMasuk.html
    }

    @PostMapping("/login")
    public String login(@RequestParam String email,
                        @RequestParam String password,
                        Model model,
                        HttpSession session) { // ← ini penting
        var userOpt = userRepo.findByEmail(email);
        if (userOpt.isEmpty() || !passwordEncoder.matches(password, userOpt.get().getPassword())) {
            model.addAttribute("error", "Email atau password salah");
            return "LoginMasuk";
        }
    
        User user = userOpt.get();
        session.setAttribute("loggedInUser", user);
    
        if ("ADMIN".equalsIgnoreCase(user.getRole())) {
            return "redirect:/DLAdmin";
        } else {
            return "redirect:/Home";
        }
    }
    @GetMapping("/DLAdmin")
    public String DLAPage() {
        return "DLAdmin"; 
    }

}
