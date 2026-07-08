package com.spiceroute.kitchen_orders;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
public class OrderController {
  private final OrderService service;

  public OrderController(OrderService service) { this.service = service; }

  @PostMapping
  public KitchenOrder place(@RequestBody KitchenOrder o) { return service.place(o); }

  @GetMapping
  public List<KitchenOrder> all() { return service.all(); }
}
