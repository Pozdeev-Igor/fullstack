package com.example.petproject.service;

import com.example.petproject.DTO.CategoryDTO;
import com.example.petproject.domain.Category;
import com.example.petproject.domain.User;
import com.example.petproject.repos.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;


    public Category save(CategoryDTO categoryDTO, User user) {

        Category category = new Category();
        category.setName(categoryDTO.getName());

        return categoryRepo.save(category);
    }

    public List<Category> findAll() {
        return categoryRepo.findAll();
    }
}
