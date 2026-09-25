package com.scholarpath.controller;

import com.scholarpath.entity.ChatMessage;
import com.scholarpath.request.ChatMessageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/api/chat-messages")
public class ChatMessageController {

    private List<ChatMessage> messagesDb = new ArrayList<>();

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAll() {
        Map<String, Object> response = new HashMap<>();
        response.put("data", messagesDb);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> save(@Valid @RequestBody ChatMessageRequest request) {
        request.validate();

        ChatMessage message = new ChatMessage(
                UUID.randomUUID().toString(),
                request.getSessionId(),
                request.getSender(),
                request.getText(),
                new Date()
        );
        messagesDb.add(message);

        Map<String, Object> response = new HashMap<>();
        response.put("data", message);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable String id,
                                                      @Valid @RequestBody ChatMessageRequest request) {
        request.validate();

        for (int i = 0; i < messagesDb.size(); i++) {
            if (messagesDb.get(i).getMessageId().equals(id)) {
                ChatMessage updated = new ChatMessage(
                        id,
                        request.getSessionId(),
                        request.getSender(),
                        request.getText(),
                        messagesDb.get(i).getTimestamp()
                );
                messagesDb.set(i, updated);

                Map<String, Object> response = new HashMap<>();
                response.put("data", updated);
                return ResponseEntity.ok(response);
            }
        }

        Map<String, Object> error = new HashMap<>();
        error.put("error", "Message not found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        boolean removed = messagesDb.removeIf(m -> m.getMessageId().equals(id));
        if (!removed) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
