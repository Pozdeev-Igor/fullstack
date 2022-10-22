package com.example.petproject.service;

import com.example.petproject.DTO.AdvertResponseDTO;
import com.example.petproject.Enums.AdvertStatusEnum;
import com.example.petproject.domain.Advert;
import com.example.petproject.domain.ImageName;
import com.example.petproject.domain.SubCategory;
import com.example.petproject.domain.User;
import com.example.petproject.repos.AdvertRepo;
import com.example.petproject.repos.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

    public Iterable<Advert> findAll() {
        return advertRepo.findAll();
    }

    public Advert totalCreateAdvert(Long advertId, AdvertResponseDTO advertResponseDTO) {
        Advert advertFromDB = advertRepo.findById(advertId).get();
        List<String> fileNames = advertResponseDTO.getImages();
        for (String imgs : fileNames) {
            ImageName imageName = new ImageName();
            imageName.setName(imgs);
            imageName.setAdvert(advertFromDB);
            imageService.save(imageName);
        }
        advertFromDB.setImage(fileNames.get(0));
        if (advertFromDB.getImage() != null) {
            advertFromDB.setStatus(AdvertStatusEnum.PUBLISHED.getStatus());
        }
        if (advertResponseDTO.getSubCategoryId() != null) {
            SubCategory subCategoryFromDB = subCategoryRepository.findById(advertResponseDTO.getSubCategoryId()).get();
            advertFromDB.setSubCategory(subCategoryFromDB);
        }
        advertFromDB.setDescription(advertResponseDTO.getDescription());
        advertFromDB.setTitle(advertResponseDTO.getTitle());
        advertFromDB.setPrice(advertResponseDTO.getPrice());

        return advertFromDB;
    }

    public Iterable<Advert> getAllAdverts(Iterable<Advert> advertList) {
        for (Advert advert : advertList) {
            if (advert.getImage() == null) {
//                advert.setImage(null);
                advert.setStatus(AdvertStatusEnum.AWAITING_CONFIRMATION.getStatus());
            }
        }
        return advertList;
    }

    public List<Advert> getAdvertsByPagination(Integer page, Integer limit) {
        PageRequest pageRequest = PageRequest.of(page, limit);
        Page<Advert> pagingAdvert = advertRepo.findAllByImage(pageRequest);

        return pagingAdvert.getContent();
    }

    public List<Advert> getAdvertsByPaginationByUser(Integer page, Integer limit, Long userId) {
        PageRequest pageRequest = PageRequest.of(page, limit);
        Page<Advert> pagingAdvertByUser = advertRepo.pagingFindByUser(pageRequest, userId);
        return pagingAdvertByUser.getContent();
    }

    public List<Advert> findByUserId(Long userId) {
        return advertRepo.findByUserId(userId);
    }
}
