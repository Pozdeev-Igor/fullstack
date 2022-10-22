package com.example.petproject.controller;

import com.example.petproject.DTO.UsersDataDTO;
import com.example.petproject.domain.Advert;
import com.example.petproject.domain.User;
import com.example.petproject.service.AdvertService;
import com.example.petproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"}, allowCredentials = "true")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AdvertService advertService;

    @GetMapping
    public Optional<User> getUsersNameByUser(@AuthenticationPrincipal User user) {

        return Optional.ofNullable(userService.findUserByUsername(user.getUsername()).orElse(null));

    }

    @GetMapping("/adverts")
    public ResponseEntity<?> getAllAdverts(@AuthenticationPrincipal User user) {
        Optional<User> userFromDB = userService.findUserByUsername(user.getUsername());
        List<Advert> advertList = advertService.findByUser(userFromDB);
        return ResponseEntity.ok(advertList);
    }

    @PutMapping("{userId}")
    public ResponseEntity<?> updateUsersData(@AuthenticationPrincipal User user,
                                             @RequestBody UsersDataDTO usersDataDTO,
                                             @PathVariable Long userId) {
        User userFromDB = userService.findUserById(userId);
        userFromDB.setName(usersDataDTO.getName());
        userFromDB.setEmail(usersDataDTO.getEmail());
        userFromDB.setPhoneNumber(usersDataDTO.getPhoneNumber());
        userService.update(userFromDB);
        return ResponseEntity.ok(userFromDB);
    }

}
