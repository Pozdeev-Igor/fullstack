package com.example.petproject.repos;

import com.example.petproject.domain.ImageName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ImageRepo extends JpaRepository<ImageName, Long> {
    @Query("select i from ImageName i where i.advert.id = :advertId")
    List<ImageName> findAllByAdvertId(Long advertId);

//    @Query("select i from ImageName i where i.advert.id = :advertId ")
//    String findFirstByAdvertId(Long advertId);
}
