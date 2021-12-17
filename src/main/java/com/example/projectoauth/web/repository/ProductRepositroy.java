package com.example.projectoauth.web.repository;

import com.example.projectoauth.web.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepositroy extends JpaRepository<Product, Long> {

    List<Product> findByEmail(String email);
}
