package com.spiceroute.order_service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class BillingClient {
  // knock on door 8082 and ask — never reach into billing's pantry
  private final RestClient http = RestClient.create("http://localhost:8082");

  public String charge(Long orderId) {
    return http.post().uri("/bills?orderId=" + orderId)
               .retrieve().body(String.class);
  }
}
