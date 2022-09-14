package com.example.petproject.repos;

import com.example.petproject.domain.Advert;
import com.example.petproject.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface AdvertRepo extends JpaRepository<Advert, Long> {

     Set<Advert> findByUser (User user);

//    @Query("select a from Advert a " +
//            "where (a.status = 'Submitted' and (a.codeReviewer is null or a.codeReviewer = :codeReviewer))" +
//            "or a.codeReviewer = :codeReviewer")
//    Set<Advert> findByCodeReviewer(User codeReviewer);
}
