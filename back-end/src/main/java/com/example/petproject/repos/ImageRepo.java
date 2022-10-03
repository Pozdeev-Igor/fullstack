package com.example.petproject.repos;

import com.example.petproject.domain.ImageName;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepo extends JpaRepository<ImageName, Long> {
}
