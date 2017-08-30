 package com.register.controller;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.menu.service.MenuService;
import com.menu.vo.Menu;
import com.register.service.UserService;
import com.register.vo.User;
import com.usercenter.vo.UserInfo;


//让控制器成为一个bean
@Controller
//这个控制器是接受user_reg页面传过来的参数去操作数据库
public class UserController {
	@Autowired
	private SqlSession sqlSession;
	
	@Autowired
	private UserService us;
	@Autowired
	private HttpServletRequest req;
	@RequestMapping("/userReg.action")
	//jsp页面通过userReg.action找到这个方法
	public String userReg(User user){
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("phone_mobile", user.getPhone_mobile());
		map.put("login_password", user.getLogin_password());
               
		//判断页面传回的数据要求
	/*	Pattern pattern = Pattern.compile("^((13[0-9])|(15[^4,\\D])|(18[01236789]))\\d{8}$");
	     Matcher matcher = pattern.matcher(user.getPhone_mobile());*/
		if(user.getPhone_mobile()==null || user.getLogin_password()==null ){
			return "index.jsp";
		}
		
		//获取当前注册时间
		Date date = new Date();
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		map.put("register_time", df.format(date));
		
		//生成唯一识别码
		 String s = UUID.randomUUID().toString(); 
    	 String user_code =  s.substring(0,8)+s.substring(9,13)+s.substring(14,18)+s.substring(19,23)+s.substring(24); 
    	 map.put("user_code", user_code);
    	 map.put("user_role", "P");
    	 //将数据添加到数据库中
		@SuppressWarnings("unused")
		int a = sqlSession.insert("com.register.dao.addUser",map);
		
		req.setAttribute("phone_mobile", user.getPhone_mobile());
		req.setAttribute("login_password", user.getLogin_password());
		return "pages/main/userInfo.jsp";
	}


	//处理用户名唯一性的判断                                                                     
	@RequestMapping("/userJudge.action")
	@ResponseBody
	public User userJudge(String phone_mobile) {
		User u = sqlSession.selectOne("com.register.dao.judgeUser",phone_mobile);
		System.out.println(u.getPhone_mobile());
		return u;
	}
	
	//用户登录的判断
	@RequestMapping("/userLogin.action")
	public String userLogin(String phone_mobile,String login_password){
		//对页面传回的值进行二次判断
		 Pattern pattern = Pattern.compile("^((13[0-9])|(15[^4,\\D])|(18[01236789]))\\d{8}$");
	     Matcher matcher = pattern.matcher(phone_mobile);
		if(phone_mobile==null || login_password==null || !matcher.matches()){
			return "pages/user-login-no.jsp";
		}
		
		User u = us.userLogin(phone_mobile, login_password);
		
		//查到用户了，执行登录成功的操作
		if(u!=null){
			req.getSession().setAttribute("u", u);
			return "pages/main/user-login-ok.jsp";
		}else{
			return "pages/user-login-no.jsp";
		}
	}
	//用户退出销毁session 跳转到登录页
	@RequestMapping("/userExit.action")
	public String userExit(HttpSession session){
		session.invalidate();
		return "index.jsp";
	}
	
	//保存用户信息
		@RequestMapping(value="/saveUserInfo.action",produces="text/html;charset=utf-8")
		@ResponseBody
		public String saveUserInfo(@RequestBody Map<String,String> map){
			 sqlSession.insert("com.register.dao.addUserInfo",map);
			return "注册成功";
		}
	//获取用户信息
		@RequestMapping("/getUserInfo.action")
		@ResponseBody
		public List getUserInfo(@RequestBody Map<String,String> map){
			List<UserInfo> list =  sqlSession.selectList("com.register.dao.getUserInfo",map);
			return list;
		}
}
