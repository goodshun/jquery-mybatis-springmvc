package com.register.vo;

import java.util.Date;

public class User {
private int id;
private String phone_mobile;//用户手机号
private String login_password;//用户登录密码
private Date register_time;//用户注册日期
private String user_code;//用户唯一识别ID

public User(int id, String phone_mobile, String login_password, Date register_time,
		String user_code) {
	super();
	this.id = id;
	this.phone_mobile = phone_mobile;
	this.login_password = login_password;
	this.register_time = register_time;
	this.user_code = user_code;
}

public User(String phone_mobile, String login_password, Date register_time, String user_code) {
	super();
	this.phone_mobile = phone_mobile;
	this.login_password = login_password;
	this.register_time = register_time;
	this.user_code = user_code;
}
public User() {
}

public int getId() {
	return id;
}
//对用户数据进行封装
public void setId(int id) {
	this.id = id;
}

public String getPhone_mobile() {
	return phone_mobile;
}

public void setPhone_mobile(String phone_mobile) {
	this.phone_mobile = phone_mobile;
}

public String getLogin_password() {
	return login_password;
}

public void setLogin_password(String login_password) {
	this.login_password = login_password;
}

public Date getRegister_time() {
	return register_time;
}

public void setRegister_time(Date register_time) {
	this.register_time = register_time;
}

public String getUser_code() {
	return user_code;
}

public void setUser_code(String user_code) {
	this.user_code = user_code;
}

public String getMoney() {
	// TODO Auto-generated method stub
	return null;
}

}
