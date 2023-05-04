package com.taksdti.todolist.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taksdti.todolist.models.Tarefas;

public interface RepoTarefas extends JpaRepository<Tarefas, Long>  {
    
}
