package com.david.qantastest.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.david.qantastest.service.ReferenceService;

@RestController
@RequestMapping("/api")
public class ReferenceController {
    
    private final ReferenceService referenceServiceImpl;
    
    @Autowired
    public ReferenceController(@Qualifier("referenceServiceImpl") ReferenceService referenceServiceImpl) {
        this.referenceServiceImpl = referenceServiceImpl;
    }

    @GetMapping("/reference")
    public Map<String, String> getReference() {
        return referenceServiceImpl.getReference();
    }
}
