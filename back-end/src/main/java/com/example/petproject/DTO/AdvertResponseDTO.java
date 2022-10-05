package com.example.petproject.DTO;

import com.example.petproject.Enums.AdvertStatusEnum;
import com.example.petproject.domain.Advert;
import com.example.petproject.domain.SubCategory;

import java.util.List;

public class AdvertResponseDTO {

    private Advert advert;
    private String title;
    private String description;
    private SubCategory userId;
    private Long subCategoryId;
    private List<String> images;
    private AdvertStatusEnum[] statusEnum = AdvertStatusEnum.values();

    public AdvertResponseDTO(Advert advert) {
        super();
        this.advert = advert;
    }

    public AdvertResponseDTO() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public SubCategory getUserId() {
        return userId;
    }

    public void setUserId(SubCategory userId) {
        this.userId = userId;
    }

    public Long getSubCategoryId() {
        return subCategoryId;
    }

//    public void setSubCategory(Long subCategoryId) {
//        this.subCategoryId = subCategoryId;
//    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public void setStatusEnum(AdvertStatusEnum[] statusEnum) {
        this.statusEnum = statusEnum;
    }

    public Advert getAdvert() {
        return advert;
    }

    public void setAdvert(Advert advert) {
        this.advert = advert;
    }

//    public AssignmentEnum[] getAssignmentEnums() {
//        return assignmentEnums;
//    }

    public AdvertStatusEnum[] getStatusEnum() {
        return statusEnum;
    }
}
