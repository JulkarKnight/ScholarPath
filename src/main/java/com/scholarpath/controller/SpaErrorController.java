package com.scholarpath.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;

@Controller
public class SpaErrorController implements ErrorController {

    @GetMapping(value = {"/login", "/register", "/app", "/app/{tab:[^\\.]*}"})
    public String forwardSpaRoutes() {
        return "forward:/index.html";
    }

    @RequestMapping("/error")
    public Object handleError(HttpServletRequest request, HttpServletResponse response) {
        String originalUri = (String) request.getAttribute(RequestDispatcher.ERROR_REQUEST_URI);
        Object statusAttr = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        int statusCode = statusAttr != null ? Integer.parseInt(statusAttr.toString()) : 500;

        if (originalUri != null && originalUri.startsWith("/api/")) {
            HttpStatus status = HttpStatus.resolve(statusCode);
            if (status == null) status = HttpStatus.INTERNAL_SERVER_ERROR;
            return ResponseEntity.status(status)
                    .body(Collections.singletonMap("error", status.getReasonPhrase()));
        }

        response.setStatus(HttpStatus.OK.value());
        return "forward:/index.html";
    }
}
