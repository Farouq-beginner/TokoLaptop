
package com.example.tokolaptop;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll() // semua endpoint bebas diakses
            )
            .csrf(csrf -> csrf.disable())        // nonaktifkan CSRF
            .formLogin(form -> form.disable())   // nonaktifkan form login
            .httpBasic(basic -> basic.disable()); // nonaktifkan basic auth

        return http.build();
    }
}
