package com.example.petproject.controller;

import com.example.petproject.DTO.CategoryDTO;
import com.example.petproject.domain.Category;
import com.example.petproject.domain.User;
import com.example.petproject.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private CategoryService categoryService;


    @PostMapping("/categories")
    public ResponseEntity<Category> createCategory (@RequestBody CategoryDTO categoryDTO, @AuthenticationPrincipal User user) {
        Category category = categoryService.save(categoryDTO, user);
        return ResponseEntity.ok(category);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getCategory(
//            @AuthenticationPrincipal User user
    ) {
        List<Category> categories = categoryService.findAll();
        return ResponseEntity.ok(categories);
    }
}