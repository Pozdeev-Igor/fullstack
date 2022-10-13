package com.example.petproject.repos;

import com.example.petproject.domain.Advert;
import com.example.petproject.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

public interface AdvertRepo extends PagingAndSortingRepository<Advert, Long> {

    List<Advert> findByUser(Optional<User> user);

    @Query("select a from Advert a where a.user.id = :userId order by a.id desc")
    Page<Advert> pagingFindByUser(PageRequest pageRequest, Long userId);

    @Query("select a from Advert a where a.image is not null order by a.id desc")
    Page<Advert> findAllByImage(PageRequest pageRequest);

}
