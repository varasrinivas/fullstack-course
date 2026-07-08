package com.spiceroute.billing_service;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BillingController {
  private final KafkaTemplate<String, String> rail;

  public BillingController(KafkaTemplate<String, String> rail) { this.rail = rail; }

  @PostMapping("/bills")
  public String charge(@RequestParam Long orderId) {
    String receipt = "PAID-" + orderId;
    try {
      rail.send("order.paid", orderId.toString(), receipt);   // pin & go (m16)
    } catch (Exception e) {
      // rail not installed yet (m12) — billing still answers the knock
    }
    return receipt;
  }
}
