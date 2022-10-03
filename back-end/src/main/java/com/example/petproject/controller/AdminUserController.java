package com.example.petproject.controller;

import com.example.petproject.domain.User;
import com.example.petproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("api/admin")
public class AdminUserController {

    @Autowired
    private UserService userService;


    @GetMapping("users")
    public ResponseEntity<?> getAllUsers(@AuthenticationPrincipal User user) {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }
}
