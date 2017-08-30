package com.usercenter.contoller;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.usercenter.vo.CarInfo;
import com.usercenter.vo.DetailInfo;

@Controller
public class UserCenterControler {

	@Autowired
	private SqlSession sqlSession;
	
	/**
	 * 2.0 获取购物车信息
	 * @param map
	 * @return
	 */
	@RequestMapping("/getCarList.action")
	@ResponseBody
	private List getCarList(@RequestBody Map<String, String> map){
	List<CarInfo> list=	sqlSession.selectList("com.usercenter.dao.getCarList", map);
		
		return list;
	}
	/**
	 * 2.1 删除购物清单
	 * @param map
	 * @return
	 */
	@RequestMapping(value="/deleteCarList.action",produces="text/html;charset=utf-8" )
	@ResponseBody
	private String  deleteCarList(@RequestBody Map<String, String> map){
	int a= 	sqlSession.delete("com.usercenter.dao.deleteCarList", map);
		if(a!=1) return "系统出错请刷新页面重试";
		else  return "删除成功";
	}
	
	/**
	 * 3.0 获取订单列表
	 * @param map
	 * @return
	 */
	@RequestMapping("/getDetailList.action" )
	@ResponseBody
	private List  getDetailList(@RequestBody Map<String, String> map){
	List<DetailInfo> list= 	sqlSession.selectList("com.usercenter.dao.getDetailList", map);
	return list;
	}
	/**
	 * 3.1   模糊查询订单
	 * @param map
	 * @return
	 */
	@RequestMapping("/queryDetailList.action" )
	@ResponseBody
	private List  queryDetailList(@RequestBody Map<String, String> map){
	List<DetailInfo> list= 	sqlSession.selectList("com.usercenter.dao.queryDetailList", map);
	return list;
	}
}
