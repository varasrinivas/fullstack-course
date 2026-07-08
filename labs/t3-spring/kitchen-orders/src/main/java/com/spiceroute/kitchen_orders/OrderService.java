package com.spiceroute.kitchen_orders;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
  private final KitchenOrderRepository repo;

  public OrderService(KitchenOrderRepository repo) { this.repo = repo; }

  public KitchenOrder place(KitchenOrder o) { return repo.save(o); }

  public List<KitchenOrder> all() { return repo.findAll(); }
}
