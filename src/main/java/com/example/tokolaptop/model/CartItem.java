package com.example.tokolaptop.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Laptop laptop;

    private int quantity;

    public CartItem() {}

    public CartItem(User user, Laptop laptop, int quantity) {
        this.user = user;
        this.laptop = laptop;
        this.quantity = quantity;
    }

    public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}

public User getUser() {
    return user;
}

public void setUser(User user) {
    this.user = user;
}

public Laptop getLaptop() {
    return laptop;
}

public void setLaptop(Laptop laptop) {
    this.laptop = laptop;
}

public int getQuantity() {
    return quantity;
}

public void setQuantity(int quantity) {
    this.quantity = quantity;
}



}
