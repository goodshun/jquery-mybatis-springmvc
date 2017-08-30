package com.util;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class ImageLoad {
	private static String PATH="http://localhost:8080/upload/";
	private static String SAVE_PATH="C:/Program Files/Apache Software Foundation/Tomcat 7.0/wtpwebapps/upload";
	@RequestMapping(value="/saveorupdate.action",produces="text/html;charset=utf-8")
	@ResponseBody
	public  String importPicFile1( @RequestParam MultipartFile myfile,HttpServletRequest request){  
	           System.out.println("2222");
	            if(myfile.isEmpty()){  
	               return  "empty";  
	           } else{  
	                 String originalFilename=myfile.getOriginalFilename();  
	                 String newfileName=DateUtil.getDateString14()+"_"+originalFilename;  
	                  try{  
	                        //把上传的图片放到服务器的文件夹下  
	                       FileUtils. copyInputStreamToFile(myfile.getInputStream(), new File(SAVE_PATH,newfileName));  
	                        //coding  
	                       return PATH+newfileName;
	                 } catch (Exception e) {  
	                      return "systemBug" ;
	                         
	                 }  
	           }  
	     }    
	
}
