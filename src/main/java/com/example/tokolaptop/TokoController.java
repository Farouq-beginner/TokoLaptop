package com.example.tokolaptop;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@Controller
public class TokoController {
	@GetMapping("/")
	public String getHello() {
		return "Hello World!";
	}

	@GetMapping("/Home/{name}")
	public String getHomeName(@PathVariable String name) {
        return "hello, " + name + "!" + "\nWelcome to Laptop Store";}

	@GetMapping("/Home")
	public String getHome() {
		return "homePage";
	}

	@GetMapping("/DaftarLaptop")
    public String showDaftarLaptop() {
        return "DaftarLaptop"; 
    }

	@GetMapping("/Aboutus")
	public String getAboutus() {
		return "Aboutus";
	}

	@GetMapping("/Services")
	public String getServices() {
		return "Services";
	}

	@GetMapping("/Contactus")
	public String getContactus() {
		return "Contactus";
	}
}
