package com.myfarm.controller;

import java.io.File;
import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.myfarm.vo.Farm;
import com.myfarm.vo.Food;
import com.myfarm.vo.TranFarm;
import com.util.DateUtil;
import com.util.DateUtils;

@Controller
public class MyFarmController {
	private static String FARM_STATE_A="00A";
	
	@Autowired
	private SqlSession sqlSession;

	/**
	 * 1.0 获取我租赁的农场信息
	 * 
	 * @param map
	 * @return 农场list
	 */
	@RequestMapping("/getMyOrderFarm.action")
	@ResponseBody
	public List getMyOrderFarm(@RequestBody Map<String, String> map) {
		List<TranFarm> list = sqlSession.selectList("com.myfarm.dao.getHaveFarmList", map);
		return list;
	}

	/**
	 * 1.1  我租赁的农场  消息发送  
	 * 
	 * @param map
	 * @return 农场list
	 */
	@RequestMapping(value="/sendOrderMessage.action",produces="text/html;charset=utf-8")
	@ResponseBody
	public String sendOrderMessage(@RequestBody Map<String, String> map) {
		map.put("message_time", DateUtil.getDateTime19());
		map.put("message_state","00A");
		 sqlSession.insert("com.myfarm.dao.addMessage", map);
		return "发送成功";
	}
	
	
	/**
	 * 2.0 获取我被租赁的农场信息
	 * 
	 * @return 农场list
	 */
	@RequestMapping("/getMyOwnFarm.action")
	@ResponseBody
	public List getMyOwnFarm(@RequestBody Map<String, String> map) {
		List<TranFarm> list = sqlSession.selectList("com.myfarm.dao.getMyOwnFarm", map);
		return list;
	}
	/**
	 * 2.1 更新作物信息
	 * 
	 * @return 农场list
	 */
	@RequestMapping(value="/updateFood.action",produces="text/html;charset=utf-8")
	@ResponseBody
	public String updateFood(@RequestBody Map<String, Object> map) {
		  String  detail_id=(String) map.get("detail_id");
	  	  @SuppressWarnings("unchecked")
	  	  List<String> l=  (List) map.get("list");
	  	  Map<String,Object> foodMap = new HashMap<>();
	  	  foodMap.put("detail_id", detail_id);
		//先删除 food
		//sqlSession.delete("com.myfarm.dao.deleteFood",map);
		//依次插入
		for(int i=0;i<l.size();i++){
			 foodMap.put("food_count",l.get(i));
		  	 foodMap.put("food_type", i+1);
		  	 int a =sqlSession.insert("com.myfarm.dao.insertFood",foodMap);
		  	 System.out.println(a);
		}
		return "更新成功";
	}
	
	
	/**
	 * 2.2获取农场作物产量信息
	 * 
	 * @return 农场list
	 */
	@RequestMapping("/getFoodList.action")
	@ResponseBody
	public List getFoodList(@RequestBody Map<String, String> map) {
		 List<Food> list = sqlSession.selectList("com.myfarm.dao.getFoodList", map);
		 return list;
	}

	
	
	
	
	
	/**
	 * 3.2更新作物产量信息
	 * 
	 * @return string
	 */
	@RequestMapping("/updateFoodInfo.action")
	public String updateFoodInfo(@RequestBody String food_id) {
		int a = sqlSession.update("com.myfarm.dao.updateFoodInfo", food_id);
		if (a != 1)
			return "系统出错，请重试";
		else
			return "更新成功";
	}

	
	/**
	 * 4.0 上传农场信息,添加新农场
	 * 
	 * @param map一般形式的数据，不含文件
	 * @return string
	 */
	@RequestMapping("/getWaitTranFarmList.action")
	@ResponseBody
	public List getWaitTranFarmList(@RequestBody Map<String, String> map) {
		String user_id=map.get("user_id");
		List<Farm> list = sqlSession.selectList("com.myfarm.dao.getWaitFarmList",user_id);
		return list;
	}
	
	
//待租赁农场部分	
	/**
	 *3.0 上传农场信息,添加新农场
	 * 
	 * @param map一般形式的数据，不含文件
	 * @return string
	 */
	@RequestMapping("/addFarm.action")
	@ResponseBody
	public List addFarm(@RequestBody Map<String, String> map) {
		String user_id=map.get("user_id");
		map.put("farm_out_time", DateUtil.getDateTime19());
		int a = sqlSession.update("com.myfarm.dao.addFarm", map);
		List<Farm> list = sqlSession.selectList("com.myfarm.dao.getWaitFarmList",user_id);
		
		return list;
	}
	
	/**
	 *3.1 删除农场信息
	 * 
	 * @param map一般形式的数据，不含文件
	 * @return string
	 */
	@RequestMapping(value="/deleteFarm.action",produces="text/html;charset=utf-8")
	@ResponseBody
	public String deleteFarm(@RequestBody Map<String, String> map) {
		//String user_id=map.get("user_id");
		int a = sqlSession.delete("com.myfarm.dao.deleteFarm", map);
		//List<Farm> list = sqlSession.selectList("com.myfarm.dao.getWaitFarmList",user_id);
		
		return "撤销成功";
	}
	
	/**
	 * 4.1 上传的图片
	 * 
	 * @param partFile
	 *            rootPath
	 * @return 农场list
	 * @throws IOException
	 * @throws IllegalStateException
	 */
	@RequestMapping("/uploadFile.action")
	public String upload(MultipartFile partFile, String rootPath) throws IllegalStateException, IOException {
		if (partFile != null && partFile.getOriginalFilename() != null && partFile.getOriginalFilename().length() > 0) {
			Calendar cal = Calendar.getInstance();
			int month = cal.get(Calendar.MONTH) + 1;
			int year = cal.get(Calendar.YEAR);
			String filePath = rootPath + year + month + "/";
			File dir = new File(filePath);
			if (!dir.isDirectory())
				dir.mkdir();
			String fileOriginalName = partFile.getOriginalFilename();
			String newFileName = UUID.randomUUID() + fileOriginalName.substring(fileOriginalName.lastIndexOf("."));
			File file = new File(filePath + newFileName);
			// 文件写入磁盘
			partFile.transferTo(file);
			// 返回存储的相对路径+文件名称
			return "" + year + month + "/" + newFileName;
		} else
			return null;
	}

	/**
	 * 5.0 修改农场信息
	 * 
	 * @return String
	 */
	@RequestMapping("/updateFarmInfo.action")
	public String updateFarmInfo(@RequestBody Map<String, String> map) {
		int a = sqlSession.update("com.myfarm.dao.updateFarmrmInfo", map);
		if (a != 1)
			return "系统出错，请重试";
		else
			return "修改成功";

	}

	
//首页加载列表部分
	
	/**
	 *4.0 上传农场信息,添加新农场
	 * 
	 * @param map一般形式的数据，不含文件
	 * @return string
	 */
	@RequestMapping("/getLastFarm.action")
	@ResponseBody
	public List getLastFarm(@RequestBody Map<String, String> map) {
		List<Farm> list = sqlSession.selectList("com.myfarm.dao.getLastFarm");
		return list;
	}
}
