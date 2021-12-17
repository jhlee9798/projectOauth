package com.example.projectoauth.web.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Product extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String price;

    private String image;

    private String email;


    public Product(String title, String price, String image, String email) {
        this.title = title;
        this.price = price;
        this.image = image;
        this.email = email;
    }
}
