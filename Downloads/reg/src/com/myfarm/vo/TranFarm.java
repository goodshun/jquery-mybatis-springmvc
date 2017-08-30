package com.myfarm.vo;

public class TranFarm {
	private int farm_id;
	private String farm_name, farm_size, farm_address, farm_price, farm_photo_url, farm_phone, farm_state,
		farm_out_time, user_id,start_time,end_time,detail_id,order_id;
	public String getOrder_id() {
		return order_id;
	}
	public void setOrder_id(String order_id) {
		this.order_id = order_id;
	}
	public String getDetail_id() {
		return detail_id;
	}
	public void setDetail_id(String detail_id) {
		this.detail_id = detail_id;
	}
	public String getStart_time() {
		return start_time;
	}
	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}
	public String getEnd_time() {
		return end_time;
	}
	public void setEnd_time(String end_time) {
		this.end_time = end_time;
	}
	public TranFarm() {
		// TODO Auto-generated constructor stub
	}
	public int getFarm_id() {
		return farm_id;
	}
	public void setFarm_id(int farm_id) {
		this.farm_id = farm_id;
	}
	public String getFarm_name() {
		return farm_name;
	}
	public void setFarm_name(String farm_name) {
		this.farm_name = farm_name;
	}
	public String getFarm_size() {
		return farm_size;
	}
	public void setFarm_size(String farm_size) {
		this.farm_size = farm_size;
	}
	public String getFarm_address() {
		return farm_address;
	}
	public void setFarm_address(String farm_address) {
		this.farm_address = farm_address;
	}
	public String getFarm_price() {
		return farm_price;
	}
	public void setFarm_price(String farm_price) {
		this.farm_price = farm_price;
	}
	public String getFarm_photo_url() {
		return farm_photo_url;
	}
	public void setFarm_photo_url(String farm_photo_url) {
		this.farm_photo_url = farm_photo_url;
	}
	public String getFarm_phone() {
		return farm_phone;
	}
	public void setFarm_phone(String farm_phone) {
		this.farm_phone = farm_phone;
	}
	public String getFarm_state() {
		return farm_state;
	}
	public void setFarm_state(String farm_state) {
		this.farm_state = farm_state;
	}
	public String getFarm_out_time() {
		return farm_out_time;
	}
	public void setFarm_out_time(String farm_out_time) {
		this.farm_out_time = farm_out_time;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
}
