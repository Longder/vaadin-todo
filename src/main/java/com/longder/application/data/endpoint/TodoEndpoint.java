package com.longder.application.data.endpoint;

import com.longder.application.data.entity.Todo;
import com.longder.application.data.repository.TodoRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.fusion.Endpoint;

import java.util.List;

@Endpoint
@AnonymousAllowed
public class TodoEndpoint {
    private final TodoRepository todoRepository;

    public TodoEndpoint(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> findAll(){
        return todoRepository.findAll();
    }

    public Todo save(Todo todo){
        return todoRepository.save(todo);
    }
}
