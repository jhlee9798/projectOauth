package com.example.projectoauth.web.controller;


import com.example.projectoauth.config.auth.CustomOAuth2UserService;
import com.example.projectoauth.web.domain.Product;
import com.example.projectoauth.web.dto.HelloResponseDto;
import com.example.projectoauth.web.repository.ProductRepositroy;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import static com.example.projectoauth.config.auth.CustomOAuth2UserService.StaticUserEmail;

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
        products.add(new Product("Queen Bed","500.99","./images/product-1.jpeg", "ryim9798@gmail.com"));
        products.add(new Product("Keyboard","80.99","./images/product-2.jpg", "ryim979899@gmail.com"));
        products.add(new Product("NoteBook","1247.99","./images/product-3.jpg", "ryim9798@gmail.com"));
        products.add(new Product("television","1500.33","./images/product-4.jpg", "ryim979899@gmail.com"));
        products.add(new Product("hood T-shirt","80.11","./images/product-5.jpeg", "ryim9798@gmail.com"));
        products.add(new Product("shoes","132.99","./images/product-6.jpg", "ryim979899@gmail.com"));
        products.add(new Product("Ramen","5.99","./images/product-7.jpg", "jhlee1346@agilesoda.ai"));
        products.add(new Product("flashlight","33.99","./images/product-8.jpg", "ryim979899@gmail.com"));
        productRepositroy.saveAll(products);

        return products;
    }

    @GetMapping("/products")
    public List<Product> products(){

        return productRepositroy.findAll();

    }

    @GetMapping("/products/mypage")
    public List<Product> productsMypage(){
        System.out.println(StaticUserEmail);
        return productRepositroy.findByEmail(StaticUserEmail);

    }
}
