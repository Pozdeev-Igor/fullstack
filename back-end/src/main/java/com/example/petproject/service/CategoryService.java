package com.example.petproject.service;

import com.example.petproject.DTO.CategoryDTO;
import com.example.petproject.domain.Category;
import com.example.petproject.domain.User;
import com.example.petproject.repos.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;

    public Category save(Category category) {
        return categoryRepo.save(category);
    }


//    public Category update(CategoryDTO categoryDTO, User user, Long id) {
//
//        Category newCategory = new Category();
//        Optional<Category> oldCategory = categoryRepo.findById(id);
//        oldCategory.
//        oldCategory.setName(categoryDTO.getName());
//        return categoryRepo.save(oldCategory);
//    }


    public List<Category> findAll() {
        return categoryRepo.findAll();
    }

    public Optional<Category> findById(Long categoryId) {
        return categoryRepo.findById(categoryId);
    }

    public Category save(CategoryDTO categoryDTO, User user) {
        Category category = new Category();
        category.setName(categoryDTO.getName());

        return categoryRepo.save(category);
    }

    public void delete(Long categoryId) {
        categoryRepo.deleteById(categoryId);
    }
}
