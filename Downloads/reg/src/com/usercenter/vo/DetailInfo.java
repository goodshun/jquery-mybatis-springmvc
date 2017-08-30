package com.usercenter.vo;

public class DetailInfo {
	
	private String detail_id,user_id,farm_id,farm_name,farm_address,farm_price,farm_size,start_time,end_time,detail_state;
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public DetailInfo() {
		// TODO Auto-generated constructor stub
	}
	public String getDetail_id() {
		return detail_id;
	}

	public void setDetail_id(String detail_id) {
		this.detail_id = detail_id;
	}

	public String getFarm_id() {
		return farm_id;
	}

	public void setFarm_id(String farm_id) {
		this.farm_id = farm_id;
	}

	public String getFarm_name() {
		return farm_name;
	}

	public void setFarm_name(String farm_name) {
		this.farm_name = farm_name;
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

	public String getFarm_size() {
		return farm_size;
	}

	public void setFarm_size(String farm_size) {
		this.farm_size = farm_size;
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

	public String getDetail_state() {
		return detail_state;
	}

	public void setDetail_state(String detail_state) {
		this.detail_state = detail_state;
	}
}
