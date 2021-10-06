package com.longder.application.data.entity;

import com.longder.application.data.AbstractEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Setter
@Getter
@Entity
public class Status extends AbstractEntity {
    private String name;

    public Status() {

    }

    public Status(String name) {
        this.name = name;
    }
}
