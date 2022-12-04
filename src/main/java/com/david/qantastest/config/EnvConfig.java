package com.david.qantastest.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:application.properties")
public class EnvConfig {
    
    /* ====== Endpoint ====== */
    @Value("${endpoint.comms.baseUrl}")
    private String commsBaseUrl;
    @Value("${endpoint.comms.search}")
    private String commsSearch;
    @Value("${endpoint.comms.defaultMaxRows}")
    private String commsDefaultMaxRows;

    /* ====== Functions ====== */
    public String getCommsBaseUrl() {
        return this.commsBaseUrl;
    }

    public void setCommsBaseUrl(String commsBaseUrl) {
        this.commsBaseUrl = commsBaseUrl;
    }

    public String getCommsSearch() {
        return this.commsSearch;
    }

    public void setCommsSearch(String commsSearch) {
        this.commsSearch = commsSearch;
    }

    public String getCommsDefaultMaxRows() {
        return this.commsDefaultMaxRows;
    }

    public void setCommsDefaultMaxRows(String commsDefaultMaxRows) {
        this.commsDefaultMaxRows = commsDefaultMaxRows;
    }

}
