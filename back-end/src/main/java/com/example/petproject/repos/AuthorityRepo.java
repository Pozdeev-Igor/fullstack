package com.example.petproject.repos;

import com.example.petproject.domain.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepo extends JpaRepository<Authority, Long> {
}
