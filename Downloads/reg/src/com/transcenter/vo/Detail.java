package com.transcenter.vo;

public class Detail {
	private int detail_id,farm_id;
	private String order_id,start_time,end_time,detail_state;
	public int getDetail_id() {
		return detail_id;
	}
	public void setDetail_id(int detail_id) {
		this.detail_id = detail_id;
	}
	public int getFarm_id() {
		return farm_id;
	}
	public void setFarm_id(int farm_id) {
		this.farm_id = farm_id;
	}
	public String getOrder_id() {
		return order_id;
	}
	public void setOrder_id(String order_id) {
		this.order_id = order_id;
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
