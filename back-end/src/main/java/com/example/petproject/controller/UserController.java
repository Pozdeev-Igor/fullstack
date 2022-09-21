package com.example.petproject.controller;

import com.example.petproject.domain.User;
import com.example.petproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public Optional<User> getUsersNameByUser (@AuthenticationPrincipal User user) {

        return Optional.ofNullable(userService.findUserByUsername(user.getUsername()).orElse(null));

    }


}
