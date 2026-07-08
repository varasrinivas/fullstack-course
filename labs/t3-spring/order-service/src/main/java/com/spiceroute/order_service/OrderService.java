package com.spiceroute.order_service;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
  private final KitchenOrderRepository repo;
  private final BillingClient billing;

  public OrderService(KitchenOrderRepository repo, BillingClient billing) {
    this.repo = repo;
    this.billing = billing;
  }

  public KitchenOrder place(KitchenOrder o) {
    KitchenOrder saved = repo.save(o);
    try {
      saved.setStatus(billing.charge(saved.getId()));   // e.g. "PAID-1"
    } catch (Exception e) {
      // billing is down — the order still saves (the synchronous pain of m12,
      // handled gracefully; the ticket rail removes it entirely in m16)
      saved.setStatus("PENDING_PAYMENT");
    }
    return repo.save(saved);
  }

  public List<KitchenOrder> all() { return repo.findAll(); }
}
