package com.example.petproject.controller;

import com.example.petproject.DTO.AdvertResponseDTO;
import com.example.petproject.domain.Advert;
import com.example.petproject.domain.ImageName;
import com.example.petproject.domain.User;
import com.example.petproject.service.AdvertService;
import com.example.petproject.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/adverts")
public class AdvertController {

    @Autowired
    private AdvertService advertService;
    @Autowired
    private ImageService imageService;

    @PostMapping()
    public ResponseEntity<?> createAdvert(@AuthenticationPrincipal User user) {
        Advert newAdvert = new Advert();
                advertService.save(user, newAdvert);
        return ResponseEntity.ok(newAdvert);
    }

    @GetMapping()
    public ResponseEntity<?> getAllAdverts(@AuthenticationPrincipal User user) {
        List<Advert> allAdverts = advertService.findAll();
        return ResponseEntity.ok(allAdverts);
    }

    @PutMapping("{advertId}")
    public ResponseEntity<?> updateAdvert(
            @AuthenticationPrincipal User user,
            @PathVariable Long advertId,
            @RequestBody AdvertResponseDTO advertResponseDTO) {
        Advert advertFromDB = advertService.findById(advertId).orElse(null);
        List<String> fileNames = advertResponseDTO.getImages();
//        advertResponseDTO.
        for(String imgs : fileNames) {
        ImageName imageName = new ImageName();
            imageName.setName(imgs);
            imageName.setAdvert(advertFromDB);
            imageService.save(imageName);
        }
        advertFromDB.setSubCategory(advertResponseDTO.getSubCategoryId());
        advertFromDB.setDescription(advertResponseDTO.getDescription());
        advertFromDB.setTitle(advertResponseDTO.getTitle());
        advertService.save(user, advertFromDB);
        return ResponseEntity.ok(advertFromDB);
    }


//    @GetMapping("/{advertId}")
//    public ResponseEntity<?> getAdvertById(@PathVariable Long advertId, @AuthenticationPrincipal User user) {
//        Optional<Advert> optionalAdvert = advertService.findById(advertId);
//        AdvertResponseDTO response = new AdvertResponseDTO(optionalAdvert.orElse(new Advert()));
//        return ResponseEntity.ok(response);
//    }
}
