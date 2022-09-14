package com.example.petproject.Enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AdvertStatusEnum {
    AWAITING_CONFIRMATION("Объявление на проверке", 1),
    PUBLISHED("Объявление опубликовано", 2),
    ARCHIVED("Объявление в архиве", 3);

    private String status;
    private int orderStep;

    AdvertStatusEnum(String status, int orderStep) {
        this.status = status;
        this.orderStep = orderStep;
    }

    public String getStatus() {
        return status;
    }

    public int getOrderStep() {
        return orderStep;
    }
}
