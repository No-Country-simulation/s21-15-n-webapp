package com.backend.s21.controller;

import com.backend.s21.model.message.Message;
import com.backend.s21.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(
            @RequestParam String receiverUsername,
            @RequestParam String content) {

        Message message = messageService.sendMessage(receiverUsername, content);
        return ResponseEntity.ok(message);
    }
    @GetMapping("/sent")
    public ResponseEntity<List<Message>> getSentMessages(@Validated String user) {
        return ResponseEntity.ok(messageService.getSentMessages(user));
    }

    @GetMapping("/received")
    public ResponseEntity<List<Message>> getReceivedMessages(@Validated String user) {
        return ResponseEntity.ok(messageService.getReceivedMessages(user));
    }
}
