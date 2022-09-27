package com.example.petproject.repos;

import com.example.petproject.domain.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Long> {

    @Query("select s from SubCategory s where s.category.id = :categoryId")
    Set<SubCategory> findByCategoryId(Long categoryId);
}
