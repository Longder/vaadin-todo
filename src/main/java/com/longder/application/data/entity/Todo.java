package com.longder.application.data.entity;

import com.longder.application.data.AbstractEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Todo extends AbstractEntity {
    private boolean done = false;
    @NotBlank
    private String task;

    public Todo(String task){
        this.task = task;
    }
}
