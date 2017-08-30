package com.menu.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.menu.vo.Menu;

@Service
public class MenuService {
	@Autowired
	private SqlSession sqlSession;
	
	public List<Menu> getMenu(String phone){
		List<Menu> list = sqlSession.selectList("com.menu.dao.getMenu", phone);//通过my baitis 获取
		return list;
	}
	
}
