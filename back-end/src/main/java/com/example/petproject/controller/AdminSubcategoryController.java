package com.example.petproject.controller;

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

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"}, allowCredentials = "true")
public class AdminSubcategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private SubCategoryRepository subCategoryRepository;



    @GetMapping("/subcategories")
    public ResponseEntity<List<SubCategory>> getSubCategories() {
        List<SubCategory> subCategories = subCategoryRepository.findAll();
        return ResponseEntity.ok(subCategories);
    }

    @PostMapping("categories/{categoryId}")
    public ResponseEntity<?> saveSubCategory (
            @PathVariable Long categoryId,
            @RequestBody SubCategory subCategory,
            @AuthenticationPrincipal User user
    ) {
        SubCategory newSubCategory = new SubCategory();
        Optional<Category> optCategory = categoryService.findById(categoryId);
        newSubCategory.setName(subCategory.getName());
        newSubCategory.setCategory(optCategory.orElse(null));
        subCategoryRepository.save(newSubCategory);
        return ResponseEntity.ok(newSubCategory);
    }

    @PutMapping("categories/{categoryId}/{subId}")
    public ResponseEntity<?> updateSubCategory(
            @PathVariable Long categoryId,
            @PathVariable Long subId,
            @RequestBody SubCategory subCategory,
            @AuthenticationPrincipal User user
    ) {
        SubCategory updatedSubCAtegory = subCategoryRepository.save(subCategory);
        return ResponseEntity.ok(updatedSubCAtegory);
    }

    @DeleteMapping("categories/{categoryId}/{subId}")
    public ResponseEntity<?> deleteSubCategory(@PathVariable Long categoryId, @PathVariable Long subId, @AuthenticationPrincipal User user) {
        try {
            subCategoryRepository.deleteById(subId);
            return ResponseEntity.ok(subId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Ошибка! Такой подкатегории нет в БД");
        }
    }
}
