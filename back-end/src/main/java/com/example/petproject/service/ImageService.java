package com.example.petproject.service;

import com.example.petproject.domain.ImageName;
import com.example.petproject.repos.ImageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageService {

    @Autowired
    private ImageRepo imageRepo;
    public void save(ImageName imageName) {
        imageRepo.save(imageName);
    }
}
