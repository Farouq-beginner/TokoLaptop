package com.example.tokolaptop.model;

// Tidak diberi anotasi JPA agar tidak konflik
public abstract class BaseProduct {
    protected String name;
    protected Long price;

    public abstract double calculatePrice();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }
}
