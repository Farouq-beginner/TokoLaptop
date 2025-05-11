package com.example.tokolaptop.controller;
import com.example.tokolaptop.model.Laptop;
import com.example.tokolaptop.repository.LaptopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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
        return laptopRepository.save(laptop);
    }

    @PutMapping("/{id}")
    public Laptop updateLaptop(@PathVariable Long id, @RequestBody Laptop laptopDetails) {
        Laptop laptop = laptopRepository.findById(id).orElseThrow();
        laptop.setName(laptopDetails.getName());
        laptop.setPrice(laptopDetails.getPrice());
        laptop.setImage(laptopDetails.getImage());
        laptop.setlimited(laptopDetails.isLimited());
        return laptopRepository.save(laptop);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLaptop(@PathVariable Long id) {
        laptopRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}

