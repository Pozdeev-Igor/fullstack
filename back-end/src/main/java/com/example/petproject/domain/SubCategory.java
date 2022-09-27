package com.example.petproject.domain;

import javax.persistence.*;
import java.util.Optional;

@Entity
public class SubCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Optional<Category> getCategory() {
        return Optional.ofNullable(category);
    }

    public void setCategory(Category category) {
        this.category = category;
    }

}