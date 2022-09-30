package com.example.petproject.controller;

import com.example.petproject.DTO.CategoryDTO;
import com.example.petproject.domain.Category;
import com.example.petproject.domain.SubCategory;
import com.example.petproject.domain.User;
import com.example.petproject.repos.SubCategoryRepository;
import com.example.petproject.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"}, allowCredentials = "true")
public class AdminCategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private SubCategoryRepository subCategoryRepository;


    @PostMapping("/categories")
    public ResponseEntity<Category> createCategory(@RequestBody CategoryDTO categoryDTO, @AuthenticationPrincipal User user) {
        Category newCategory = categoryService.save(categoryDTO, user);
        return ResponseEntity.ok(newCategory);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getCategories() {
        List<Category> categories = categoryService.findAll();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("categories/{categoryId}")
    public ResponseEntity<?> getCategory(@PathVariable Long categoryId, @AuthenticationPrincipal User user) {
        Optional<Category> optionalCategory = categoryService.findById(categoryId);
        Set<SubCategory> subCategories = subCategoryRepository.findByCategoryId(categoryId);
        if (!subCategories.isEmpty()) {
            for (SubCategory sub : subCategories) {
                sub.setCategory(optionalCategory.orElse(null));
            }
            return ResponseEntity.ok(subCategories);
        }
        return ResponseEntity.ok(optionalCategory);
    }

    @PutMapping("categories/{categoryId}")
    public ResponseEntity<?> updateCategory(
            @PathVariable Long categoryId,
            @RequestBody Category category,
            @AuthenticationPrincipal User user
    ) {
        Optional<Category> updatedCategory = categoryService.findById(categoryId);
        updatedCategory.orElse(null).setName(category.getName());
        categoryService.save(updatedCategory.orElse(null));
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("categories/{categoryId}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long categoryId, @AuthenticationPrincipal User user) {
        try {
            categoryService.delete(categoryId);
            return ResponseEntity.ok(categoryId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Ошибка! На ключ (id)=(" + categoryId + ") всё ещё есть ссылки в таблице \"sub_category\".");
        }
    }


}
