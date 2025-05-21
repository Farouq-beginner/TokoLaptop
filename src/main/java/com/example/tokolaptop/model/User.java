package com.example.tokolaptop.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    private String role = "PEMBELI"; // default

    private String bio;
    private String alamat;
    private String gender;
    private String tanggalLahir; // jika kamu tidak pakai LocalDate
    private String noHp;


    
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    
    public String getBio() {
    return bio;
}
public void setBio(String bio) {
    this.bio = bio;
}

public String getAlamat() {
    return alamat;
}
public void setAlamat(String alamat) {
    this.alamat = alamat;
}

public String getGender() {
    return gender;
}
public void setGender(String gender) {
    this.gender = gender;
}

public String getTanggalLahir() {
    return tanggalLahir;
}
public void setTanggalLahir(String tanggalLahir) {
    this.tanggalLahir = tanggalLahir;
}

public String getNoHp() {
    return noHp;
}
public void setNoHp(String noHp) {
    this.noHp = noHp;
}

}
