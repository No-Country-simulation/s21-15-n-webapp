package com.backend.s21.service;

import com.backend.s21.model.message.Message;
import com.backend.s21.model.users.User;
import com.backend.s21.repository.IMessageRepository;
import com.backend.s21.repository.IUserRepository;
import com.backend.s21.security.service.impl.KeyCloakServiceImpl;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class MessageService {

    @Autowired
    private IMessageRepository messageRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private KeyCloakServiceImpl keycloakAuthService;

    public List<Message> getSentMessages(String user) {
        String username = String.valueOf(keycloakAuthService.searchUserByUsername(user));
        User sender = userRepository.findByNickname(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return messageRepository.findBySender(sender);
    }

    public List<Message> getReceivedMessages(String user) {
        String username = String.valueOf(keycloakAuthService.searchUserByUsername(user));
        User receiver = userRepository.findByNickname(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return messageRepository.findByReceiver(receiver);
    }

    @Transactional
    public Message sendMessage(String user, String receiverUsername, String content) {
        String senderUsername = String.valueOf(keycloakAuthService.searchUserByUsername(user));

        User sender = userRepository.findByNickname(senderUsername)
                .orElseThrow(() -> new RuntimeException("Usuario remitente no encontrado"));

        User receiver = userRepository.findByNickname(receiverUsername)
                .orElseThrow(() -> new RuntimeException("Usuario destinatario no encontrado"));

        Message message = new Message();
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setContent(content);

        return messageRepository.save(message);
    }
}

