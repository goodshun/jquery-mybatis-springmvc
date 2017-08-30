package com.transcenter.controller;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.myfarm.vo.Farm;
import com.register.vo.User;
import com.transcenter.vo.MessageInfo;
import com.util.DateUtil;
import com.util.DateUtils;


@Controller
//租赁中心模块控制器
public class TransCenterController {
	private static String OFF_OVER = "已被租赁";
	@Autowired
	private SqlSession sqlSession;
	
	
	/**
	 * 获取农场列表
	 * 
	 * @param map一般形式的数据，不含文件
	 * @return string
	 */
	@RequestMapping("/getCanTranFarmList.action")
	@ResponseBody
	public List getCanTranFarmList(@RequestBody Map<String, String> map) {
		String user_id=map.get("user_id");
		List<Farm> list = sqlSession.selectList("com.transcenter.dao.getCanTranFarmList",user_id);
		return list;
	}
	
	/**
	 * 
	 * 将农场添加至购物车
	 *  map  为前台传递过来的数据包括user_id,farm_id
	 */
	@RequestMapping(value="/addToCar.action",produces="text/html;charset=utf-8" )  
	@ResponseBody
	public String addFormToCar(@RequestBody Map<String, String> map){	
		String userId =	map.get("user_id");
		String farm_id = map.get("farm_id");
		Farm fm = sqlSession.selectOne("com.transcenter.dao.judgeState",farm_id);//查询id为farmID且状态为待租赁的农场
		//判断农场状态是否被租赁，若fm对象为null表示待租赁的农场不存在，若不为空，则可租赁
		if(fm !=null){
			//需要加个判断，判断是否已经加入购物车
			int a = sqlSession.insert("com.transcenter.dao.addToCar", map);
			if(a==1)
			return  "添加成功";
			else return "系统出错";
		}
		else
		return "已被租赁";
	}
	
	/**
	 * 立即租赁功能实现
	 *  map  {
	 *  	user_id:租赁人ID，
	 * 		farm_id:农场ID。
	 * 		start_time：开始时间
	 * 		end_time:结束时间
	 * 		food_id：农作物ID
	 * 		farm_price:租赁价格
	 *  }
	 */
	@SuppressWarnings("null")
	@RequestMapping(value="/transFarm.action",produces="text/html;charset=utf-8" )  
	@ResponseBody
	public String transFarm(@RequestBody Map<String, String> map){	
		String userId =	map.get("user_id");
		String farmId = map.get("farm_id");
		String start_time = DateUtil.getFormatedDate();
		String end_time = start_time.replace("2017", "2018");
	
		map.put("start_time", start_time);
		map.put("end_time", end_time);
		map.put("detail_state", "00A");
		/*String foodId=map.get("food_id");*/
		/*String farm_price=map.get("farm_price");
		Map<String, String>	countMap =null;*/
		
		Farm fm = sqlSession.selectOne("com.transcenter.dao.judgeState",farmId);//查询id为farmID且状态为待租赁的农场
		//判断农场状态是否被租赁，若fm对象为null表示待租赁的农场不存在，若不为空，则可租赁
		if(fm !=null){
			//User u = sqlSession.selectOne("com.user.dao.userInfo",userId);//查询用户余额信息
			//if( Integer.parseInt(farm_price) >  Integer.parseInt(u.getMoney()))//判断账户余额
			//	return  "余额不足";
			//countMap.put("userId", userId);
			//countMap.put("user_count", userId);
			int a = sqlSession.insert("com.transcenter.dao.addDetail", map);//保存订单信息
			/*int b = sqlSession.insert("com.transcenter.dao.addFood", foodId);//保存作物信息
*/			//int c = sqlSession.update("com.transcenter.dao.updateUserCount",countMap);//更新账户余额
			int d =	sqlSession.update("com.transcenter.dao.updateFarmState",farmId);//更新农场状况
			if(a==1  && d==1)
			return  "租赁成功";
			else return "系统出错";
		}
		else return "已被租赁";
	}
	
	//  消息处理
	//消息处理
	
	/**
	 * 
	 * 消息列表加载
	 */
	@RequestMapping(value="/getMessageList.action" )  
	@ResponseBody
	public List getMessageList(@RequestBody Map<String, String> map){	
			
		List<MessageInfo> list = sqlSession.selectList("com.transcenter.dao.getMessageList",map);//查询id为farmID且状态为待租赁的农场
	
		return list;
	}
	
	/**
	 * 
	 * 更新消息状态
	 */
	@RequestMapping(value="/updateMessageState.action" )  
	@ResponseBody
	public List  updateMessageState(@RequestBody Map<String, String> map){	
			
		sqlSession.update("com.transcenter.dao.updateMessageState",map);//查询id为farmID且状态为待租赁的农场
		return null;
	}
	
}
