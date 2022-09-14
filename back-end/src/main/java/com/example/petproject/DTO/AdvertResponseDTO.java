package com.example.petproject.DTO;

import com.example.petproject.Enums.AdvertStatusEnum;
import com.example.petproject.domain.Advert;

public class AdvertResponseDTO {

    private Advert advert;
//    private AssignmentEnum[] assignmentEnums = AssignmentEnum.values();
    private AdvertStatusEnum[] statusEnum = AdvertStatusEnum.values();

    public AdvertResponseDTO(Advert assignment) {
        super();
        this.advert = assignment;
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
