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

    @GetMapping("/login")
    public String registerForm() {
        return "Login";
    }

    @PostMapping("/register")
    public String register(@RequestParam String name,
                           @RequestParam String email,
                           @RequestParam String password,
                           Model model) {
        if (userRepo.findByEmail(email).isPresent()) {
            model.addAttribute("error", "Email sudah terdaftar");
            return "LoginMasuk";
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("PEMBELI");

        userRepo.save(user);
        return "redirect:/login";
    }

    @GetMapping("/loginmasuk")
    public String loginForm() {
        return "LoginMasuk";
    }

    @PostMapping("/login")
    public String login(@RequestParam String email,
                        @RequestParam String password,
                        Model model,
                        HttpSession session) {
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

    @GetMapping("/Profil")
    public String profil(Model model, HttpSession session) {
        Object user = session.getAttribute("loggedInUser");
        if (user == null) {
            return "redirect:/login";
        }
        model.addAttribute("user", user);
        return "Profil";
    }


    @PostMapping("/profile/save")
public String saveProfile(@RequestParam String bio,
                          @RequestParam String alamat,
                          @RequestParam String gender,
                          @RequestParam String tanggalLahir,
                          @RequestParam String noHp,
                          @RequestParam String email,
                          HttpSession session,
                          Model model) {
    User user = (User) session.getAttribute("loggedInUser");
    if (user == null) {
        return "redirect:/login";
    }

    user.setBio(bio);
    user.setAlamat(alamat);
    user.setGender(gender);
    user.setTanggalLahir(tanggalLahir);
    user.setNoHp(noHp);
    user.setEmail(email);

    userRepo.save(user);
    session.setAttribute("loggedInUser", user);
    model.addAttribute("user", user);

    return "redirect:/Profil";
}

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }

}