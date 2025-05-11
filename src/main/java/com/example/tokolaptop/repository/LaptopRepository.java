package com.example.tokolaptop.repository;
import com.example.tokolaptop.model.Laptop;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LaptopRepository extends JpaRepository<Laptop, Long> {
}