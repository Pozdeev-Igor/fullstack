package com.example.petproject.controller;

import com.example.petproject.DTO.AdvertResponseDTO;
import com.example.petproject.Enums.AdvertStatusEnum;
import com.example.petproject.domain.Advert;
import com.example.petproject.domain.ImageName;
import com.example.petproject.domain.SubCategory;
import com.example.petproject.domain.User;
import com.example.petproject.repos.ImageRepo;
import com.example.petproject.repos.SubCategoryRepository;
import com.example.petproject.service.AdvertService;
import com.example.petproject.service.ImageService;
import net.minidev.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/adverts")
public class AdvertController {

    @Autowired
    private AdvertService advertService;
    @Autowired
    private ImageService imageService;
    @Autowired
    private SubCategoryRepository subCategoryRepository;

    @PostMapping()
    public ResponseEntity<?> createAdvert(@AuthenticationPrincipal User user) {
        Advert newAdvert = new Advert();
        advertService.save(user, newAdvert);
        return ResponseEntity.ok(newAdvert);
    }

    @GetMapping()
    public ResponseEntity<?> getAllAdverts(@AuthenticationPrincipal User user) {
        String imageBase64 = new String();
        List<ImageName> images;
        List<Advert> allAdverts = advertService.findAll();
        for (Advert advert : allAdverts) {
            images = imageService.getByAdvertId(advert.getId());
            if ((!images.isEmpty()) && (advert.getId() == images.get(0).getAdvert().getId())) {
                for (int i = 0; i < 1; i++) {
                    advert.setImage(images.get(i).getName());
                }
            } else {
                advert.setImage(null);
                advert.setStatus(AdvertStatusEnum.AWAITING_CONFIRMATION.getStatus());
            }
        }
        return ResponseEntity.ok(allAdverts);
    }

    @PostMapping("/{advertId}")
    @ResponseBody
    public ResponseEntity<?> totalCreateAdvert(
            @AuthenticationPrincipal User user,
            @PathVariable Long advertId,
            @RequestBody AdvertResponseDTO advertResponseDTO) {

        Advert advertFromDB = advertService.totalCreateAdvert(advertId, advertResponseDTO);
        advertService.save(user, advertFromDB);
        return ResponseEntity.ok(advertFromDB);
    }


    @GetMapping("/{advertId}")
    public ResponseEntity<?> getAdvertById(@PathVariable Long advertId, @AuthenticationPrincipal User user) {
        Optional<Advert> optionalAdvert = advertService.findById(advertId);
        return ResponseEntity.ok(optionalAdvert);
    }

    @PutMapping("{advertId}")
    public ResponseEntity<?> updateAdvert(@AuthenticationPrincipal User user,
                                          @PathVariable Long advertId,
                                          @RequestBody AdvertResponseDTO advert) {
        Advert advertFromDB = advertService.findById(advertId).get();
        advertFromDB.setTitle(advert.getTitle());
        advertFromDB.setDescription(advert.getDescription());
        advertService.save(user, advertFromDB);
        return ResponseEntity.ok(advertFromDB);
    }
}
