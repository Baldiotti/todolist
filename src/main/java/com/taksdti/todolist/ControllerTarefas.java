package com.taksdti.todolist;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taksdti.todolist.models.Tarefas;
import com.taksdti.todolist.repositories.RepoTarefas;


@RestController
@RequestMapping("/tarefas")
public class ControllerTarefas {
    
    @Autowired
    private RepoTarefas repository;

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping("/allTask")
    public List<Tarefas> getAllTasks() {
        Sort sort = Sort.by("data").ascending();
        return repository.findAll(sort);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping("/{id}")
    public Tarefas getTaskById(@PathVariable Long id) {
        return repository.findById(id).get();
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @PostMapping
    public Tarefas postTask(@RequestBody Tarefas task) {
        return repository.save(task);
    }


    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @DeleteMapping("/{id}")
    public void delTask(@PathVariable Long id) {
        repository.deleteById(id);
    }



}
