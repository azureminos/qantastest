package com.david.qantastest.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.david.qantastest.dao.ReferenceDao;

@Service
public class ReferenceServiceImpl implements ReferenceService {

    private final ReferenceDao referenceDao;

    @Autowired
    public ReferenceServiceImpl(ReferenceDao referenceDao) {
        this.referenceDao = referenceDao;
    }

    @Override
    public Map<String, String> getReference() {
        Map<String, String> map = new HashMap<>();
        map.put("commsSearchUrl", referenceDao.getCommsSearchUrl());
        map.put("commsDefaultMaxRows", referenceDao.getCommsDefaultMaxRows());
        return map;
    }

}
