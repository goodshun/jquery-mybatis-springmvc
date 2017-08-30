package com.myfarm.vo;

public class Food {
	private int food_id,detail_id,food_type;
	private String food_count;
	public int getFood_id() {
		return food_id;
	}
	public void setFood_id(int food_id) {
		this.food_id = food_id;
	}
	public int getDetail_id() {
		return detail_id;
	}
	public void setDetail_id(int detail_id) {
		this.detail_id = detail_id;
	}
	public int getFood_type() {
		return food_type;
	}
	public void setFood_type(int food_type) {
		this.food_type = food_type;
	}
	public String getFood_count() {
		return food_count;
	}
	public void setFood_count(String food_count) {
		this.food_count = food_count;
	}
}
