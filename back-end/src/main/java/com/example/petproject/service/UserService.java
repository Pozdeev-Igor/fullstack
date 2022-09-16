package com.example.petproject.service;

import com.example.petproject.DTO.RegistrationUserDTO;
import com.example.petproject.domain.User;
import com.example.petproject.repos.UserRepo;
import com.example.petproject.utils.CustomPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private CustomPasswordEncoder passwordEncoder;

    public Optional<User> findUserByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    public User save(User user, RegistrationUserDTO registrationUserDTO) {
        user = new User();
        user.setName(registrationUserDTO.getName());
        user.setUsername(registrationUserDTO.getUsername());
        user.setEmail(registrationUserDTO.getEmail());
        user.setPassword(passwordEncoder.getPasswordEncoder().encode(registrationUserDTO.getPassword()));
        if (user.getId() == null) {
            user.setCohortStartDate(LocalDate.now());
        }
        return userRepo.save(user);
    }
}

