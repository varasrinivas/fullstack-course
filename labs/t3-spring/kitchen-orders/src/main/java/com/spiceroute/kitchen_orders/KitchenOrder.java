package com.spiceroute.kitchen_orders;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class KitchenOrder {
  @Id @GeneratedValue
  private Long id;
  private String item;
  private int qty;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getItem() { return item; }
  public void setItem(String item) { this.item = item; }
  public int getQty() { return qty; }
  public void setQty(int qty) { this.qty = qty; }
}
