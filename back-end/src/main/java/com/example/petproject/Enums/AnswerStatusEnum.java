package com.example.petproject.Enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AnswerStatusEnum {

    UNWATCHED("Не просмотрено", 1),
    VIEWED("Просмотрено", 2);

    private String status;
    private int orderStep;

    AnswerStatusEnum(String status, int orderStep) {
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
