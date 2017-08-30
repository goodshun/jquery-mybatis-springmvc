package com.register.service;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.register.vo.User;


@Service
public class UserService {
	@Autowired
	private SqlSession sqlSession;
	public User userLogin(String phone_mobile,String login_password){
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("phone_mobile",phone_mobile);
		map.put("login_password", login_password);
		User u = sqlSession.selectOne("com.register.dao.userLogin",map);
		return u;
	}
}
