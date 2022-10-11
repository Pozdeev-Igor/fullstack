package com.example.petproject.service;

import com.example.petproject.DTO.AdvertResponseDTO;
import com.example.petproject.domain.Advert;
import com.example.petproject.domain.ImageName;
import com.example.petproject.domain.SubCategory;
import com.example.petproject.domain.User;
import com.example.petproject.repos.AdvertRepo;
import com.example.petproject.repos.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdvertService {

    @Autowired
    private AdvertRepo advertRepo;
    @Autowired
    private ImageService imageService;
    @Autowired
    private SubCategoryRepository subCategoryRepository;

    public Optional<Advert> findById(Long advertId) {
        return advertRepo.findById(advertId);
    }

    public Advert save(User user, Advert advert) {
        advert.setUser(user);
        return advertRepo.save(advert);
    }

    public List<Advert> findByUser(Optional<User> user) {
        return advertRepo.findByUser(user);
    }

    public List<Advert> findAll() {
        return advertRepo.findAll();
    }

    public Advert totalCreateAdvert(Long advertId,  AdvertResponseDTO advertResponseDTO) {
        Advert advertFromDB = advertRepo.findById(advertId).get();
        List<String> fileNames = advertResponseDTO.getImages();
        for (String imgs : fileNames) {
            ImageName imageName = new ImageName();
            imageName.setName(imgs);
            imageName.setAdvert(advertFromDB);
            imageService.save(imageName);
        }
        SubCategory subCategoryFromDB = subCategoryRepository.findById(advertResponseDTO.getSubCategoryId()).get();
        advertFromDB.setSubCategory(subCategoryFromDB);
        advertFromDB.setDescription(advertResponseDTO.getDescription());
        advertFromDB.setTitle(advertResponseDTO.getTitle());
        return advertFromDB;
    }
}
