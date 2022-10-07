package com.example.petproject.service;

import com.example.petproject.domain.Advert;
import com.example.petproject.domain.User;
import com.example.petproject.repos.AdvertRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdvertService {

    @Autowired
    private AdvertRepo advertRepo;

    public Optional<Advert> findById(Long advertId) {
        return advertRepo.findById(advertId);
    }

    public Advert save(User user, Advert advert) {
//        Advert advert = new Advert();
        advert.setUser(user);

        return advertRepo.save(advert);
    }

    public List<Advert> findByUser(Optional<User> user) {
        return advertRepo.findByUser(user);
    }

    public List<Advert> findAll() {
        return advertRepo.findAll();
    }

}
