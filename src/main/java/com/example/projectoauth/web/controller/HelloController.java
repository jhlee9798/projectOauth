package com.example.projectoauth.web.controller;


import com.example.projectoauth.web.domain.Product;
import com.example.projectoauth.web.dto.HelloResponseDto;
import com.example.projectoauth.web.repository.ProductRepositroy;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello(){
        return "hello";
    }

    @GetMapping("/hello/dto")
    public HelloResponseDto helloDto(@RequestParam("name") String name,
                                     @RequestParam("amount") int amount) {
        return new HelloResponseDto(name, amount);
    }

    private final ProductRepositroy productRepositroy;

    @GetMapping("/product/save")
    public List<Product> productSave(){
        List<Product> products = new ArrayList<>();
        products.add(new Product("Queen Bed","500.99","./images/product-1.jpeg"));
        products.add(new Product("Keyboard","80.99","./images/product-2.jpg"));
        products.add(new Product("NoteBook","1247.99","./images/product-3.jpg"));


        productRepositroy.saveAll(products);

        return products;
    }

    @GetMapping("/products")
    public List<Product> products(){

        return productRepositroy.findAll();

    }
}
