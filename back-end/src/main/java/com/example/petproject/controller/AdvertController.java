package com.example.petproject.controller;

import com.example.petproject.DTO.AdvertResponseDTO;
import com.example.petproject.Enums.AdvertStatusEnum;
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
    public ResponseEntity<?> getAllAdverts(@AuthenticationPrincipal User user,
                                           @RequestParam Integer page,
                                           @RequestParam Integer limit) {
        Iterable<Advert> advertList = advertService.findAll();
        Iterable<Advert> adverts = advertService.getAllAdverts(advertList);
        List<Advert> allAdverts = advertService.getAdvertsByPagination(page, limit);
        return ResponseEntity.ok(allAdverts);
    }

    @GetMapping("/user")
    public ResponseEntity<?> getAllAdvertsByUser(@AuthenticationPrincipal User user,
                                                 @RequestParam Integer page,
                                                 @RequestParam Integer limit) {

        List<Advert> allAdverts = advertService.getAdvertsByPaginationByUser(page, limit, user.getId());
        Iterable<Advert> adverts = advertService.getAllAdverts(allAdverts);
        return ResponseEntity.ok(allAdverts);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> findAdvertsByUser (@AuthenticationPrincipal User user, @PathVariable Long userId) {
        List<Advert> advertList = advertService.findByUserId(userId);
        return ResponseEntity.ok(advertList);
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

    @PutMapping("/archived/{advertId}")
    public ResponseEntity<?> archiveAdvert(@AuthenticationPrincipal User user, @PathVariable Long advertId) {
        Advert advertFromDB = advertService.findById(advertId).orElseThrow();
        advertFromDB.setStatus(AdvertStatusEnum.ARCHIVED.getStatus());
        advertService.save(user, advertFromDB);
        return ResponseEntity.ok(advertFromDB);
    }
}
