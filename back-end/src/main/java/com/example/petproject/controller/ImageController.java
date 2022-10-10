package com.example.petproject.controller;

import com.example.petproject.domain.ImageName;
import com.example.petproject.domain.User;
import com.example.petproject.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/images")
public class ImageController {

    @Autowired
    private ImageService imageService;


    @GetMapping()
    public ResponseEntity<?> getAllImages(@AuthenticationPrincipal User user) {
        List<ImageName> images = imageService.findAll();
        return ResponseEntity.ok(images);
    }

    @GetMapping("{advertId}")
    public ResponseEntity<?> getImagesByAdvertId (@AuthenticationPrincipal User user, @PathVariable Long advertId) {
                List<ImageName> images = imageService.getByAdvertId(advertId);
        return ResponseEntity.ok(images);
    }
}
