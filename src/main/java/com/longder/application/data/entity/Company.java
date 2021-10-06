package com.longder.application.data.entity;

import com.longder.application.data.AbstractEntity;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedList;
import java.util.List;

import javax.annotation.Nullable;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;


@Entity
@Getter
@Setter
public class Company extends AbstractEntity {
    @NotBlank
    private String name;

    @OneToMany(mappedBy = "company")
    @Nullable
    private List<Contact> employees = new LinkedList<>();

}
