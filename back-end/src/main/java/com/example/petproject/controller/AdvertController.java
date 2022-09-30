package com.example.petproject.controller;

import com.example.petproject.DTO.AdvertResponseDTO;
import com.example.petproject.domain.Advert;
import com.example.petproject.domain.User;
import com.example.petproject.service.AdvertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/adverts")
public class AdvertController {

    @Autowired
    private AdvertService advertService;

    @PostMapping()
    public ResponseEntity<?> createAdvert (@AuthenticationPrincipal User user) {
        Advert newAdvert = advertService.save(user);
        return ResponseEntity.ok(newAdvert);
    }



//    @GetMapping("/{advertId}")
//    public ResponseEntity<?> getAdvertById(@PathVariable Long advertId, @AuthenticationPrincipal User user) {
//        Optional<Advert> optionalAdvert = advertService.findById(advertId);
//        AdvertResponseDTO response = new AdvertResponseDTO(optionalAdvert.orElse(new Advert()));
//        return ResponseEntity.ok(response);
//    }
}
