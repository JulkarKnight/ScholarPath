package com.scholarpath.controller;

import com.scholarpath.entity.ChatSession;
import com.scholarpath.request.ChatSessionRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/api/chat-sessions")
public class ChatSessionController {

    private List<ChatSession> sessionsDb = new ArrayList<>();

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAll() {
        Map<String, Object> response = new HashMap<>();
        response.put("data", sessionsDb);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> save(@Valid @RequestBody ChatSessionRequest request) {
        request.validate();

        ChatSession session = new ChatSession(
                UUID.randomUUID().toString(),
                request.getStudentId(),
                new Date()
        );
        sessionsDb.add(session);

        Map<String, Object> response = new HashMap<>();
        response.put("data", session);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable String id,
                                                      @Valid @RequestBody ChatSessionRequest request) {
        request.validate();

        for (int i = 0; i < sessionsDb.size(); i++) {
            if (sessionsDb.get(i).getSessionId().equals(id)) {
                ChatSession updated = new ChatSession(
                        id,
                        request.getStudentId(),
                        sessionsDb.get(i).getStartedAt()
                );
                sessionsDb.set(i, updated);

                Map<String, Object> response = new HashMap<>();
                response.put("data", updated);
                return ResponseEntity.ok(response);
            }
        }

        Map<String, Object> error = new HashMap<>();
        error.put("error", "Session not found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        boolean removed = sessionsDb.removeIf(s -> s.getSessionId().equals(id));
        if (!removed) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
