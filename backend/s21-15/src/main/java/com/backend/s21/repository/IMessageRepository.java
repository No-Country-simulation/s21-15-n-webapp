package com.backend.s21.repository;

import com.backend.s21.model.message.Message;
import com.backend.s21.model.users.User;

import java.util.List;

public interface IMessageRepository extends  IGenericRepo<Message, Long>{
    List<Message> findBySender(User sender);  // Buscar mensajes enviados por un usuario
    List<Message> findByReceiver(User receiver); // Buscar mensajes recibidos
    List<Message> findBySenderOrReceiver(User sender, User receiver); // Buscar ambos
}
