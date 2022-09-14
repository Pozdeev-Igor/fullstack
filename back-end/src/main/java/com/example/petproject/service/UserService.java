package com.example.petproject.service;

import com.example.petproject.domain.User;
import com.example.petproject.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;
    public Optional<User> findUserByUsername(String username) {
       return userRepo.findByUsername(username);
    }
}
