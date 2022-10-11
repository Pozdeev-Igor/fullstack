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
    public ResponseEntity<?> createAdvert(@AuthenticationPrincipal User user) {
        Advert newAdvert = new Advert();
        advertService.save(user, newAdvert);
        return ResponseEntity.ok(newAdvert);
    }

    @GetMapping()
    public ResponseEntity<?> getAllAdverts(@AuthenticationPrincipal User user) {
        List<Advert> allAdverts = advertService.findAll();
        List<Advert> adverts = advertService.getAllAdverts(allAdverts);
        return ResponseEntity.ok(adverts);
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
        advertFromDB.setPrice(advert.getPrice());
        advertService.save(user, advertFromDB);
        return ResponseEntity.ok(advertFromDB);
    }
}
