package com.example.petproject.service;

import com.example.petproject.domain.ImageName;
import com.example.petproject.repos.ImageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageService {

    @Autowired
    private ImageRepo imageRepo;
    public void save(ImageName imageName) {
        imageRepo.save(imageName);
    }

    public List<ImageName> getByAdvertId(Long advertId) {
        return imageRepo.findAllByAdvertId(advertId);
    }

    public List<ImageName> findAll() {
        return imageRepo.findAll();
    }

    public String findFirstByAdvertId(Long advertId) {
        return imageRepo.findFirstByAdvertId(advertId);
    }
}
