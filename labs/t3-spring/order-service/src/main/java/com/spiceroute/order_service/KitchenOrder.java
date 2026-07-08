package com.spiceroute.order_service;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class KitchenOrder {
  @Id @GeneratedValue
  private Long id;
  private String item;
  private int qty;
  private String status;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getItem() { return item; }
  public void setItem(String item) { this.item = item; }
  public int getQty() { return qty; }
  public void setQty(int qty) { this.qty = qty; }
  public String getStatus() { return status; }
  public void setStatus(String status) { this.status = status; }
}
