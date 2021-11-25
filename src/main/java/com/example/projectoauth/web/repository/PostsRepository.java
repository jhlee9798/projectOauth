package com.example.projectoauth.web.repository;

import com.example.projectoauth.web.domain.Posts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostsRepository extends JpaRepository<Posts, Long> {

    @Query("SELECT p From Posts p ORDER BY p.id DESC")
    List<Posts> findAllDesc();

}
