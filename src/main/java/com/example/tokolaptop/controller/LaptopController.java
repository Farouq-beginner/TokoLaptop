package com.example.tokolaptop.controller;

import com.example.tokolaptop.model.Laptop;
import com.example.tokolaptop.repository.LaptopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/laptops")
@CrossOrigin(origins = "*")
public class LaptopController {

    @Autowired
    private LaptopRepository laptopRepository;

    @GetMapping
    public List<Laptop> getAllLaptops() {
        return laptopRepository.findAll();
    }

    @PostMapping
    public Laptop createLaptop(@RequestBody Laptop laptop) {
        System.out.println(">> Stock quantity received: " + laptop.getStockQuantity());
        return laptopRepository.save(laptop);
    }

    @PutMapping("/{id}")
    public Laptop updateLaptop(@PathVariable Long id, @RequestBody Laptop laptopDetails) {
        Laptop laptop = laptopRepository.findById(id).orElseThrow();
        laptop.setName(laptopDetails.getName());
        laptop.setPrice(laptopDetails.getPrice());
        laptop.setImage(laptopDetails.getImage());
        laptop.setStockQuantity(laptopDetails.getStockQuantity());
        laptop.setLimited(laptopDetails.isLimited());
        return laptopRepository.save(laptop);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLaptop(@PathVariable Long id) {
        laptopRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> checkoutLaptops(@RequestBody List<Map<String, Object>> checkoutItems) {
        for (Map<String, Object> item : checkoutItems) {
            Long id = Long.valueOf(item.get("id").toString());
            Integer quantity = Integer.valueOf(item.get("quantity").toString());

            Laptop laptop = laptopRepository.findById(id).orElseThrow(() -> new RuntimeException("Laptop not found"));

            if (laptop.getStockQuantity() < quantity) {
                return ResponseEntity
                        .badRequest()
                        .body("Stok tidak cukup untuk: " + laptop.getName());
            }

            laptop.setStockQuantity(laptop.getStockQuantity() - quantity);
            laptopRepository.save(laptop);
        }

        return ResponseEntity.ok("Checkout berhasil. Stok telah diperbarui.");
    }
}
