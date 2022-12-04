package com.david.qantastest.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.david.qantastest.config.EnvConfig;

@Repository
public class ReferenceDaoImpl implements ReferenceDao {

    private EnvConfig envConfig;

    @Autowired
    public ReferenceDaoImpl(EnvConfig envConfig) {
        this.envConfig = envConfig;
    }

    @Override
    public String getCommsSearchUrl() {
        StringBuilder sb = new StringBuilder();
        sb.append(envConfig.getCommsBaseUrl());
        sb.append(envConfig.getCommsSearch());
        return sb.toString();
    }

    @Override
    public String getCommsDefaultMaxRows() {
        return envConfig.getCommsDefaultMaxRows();
    }
    
}
