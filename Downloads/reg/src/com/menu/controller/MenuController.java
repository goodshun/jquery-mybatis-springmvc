package com.menu.controller;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.menu.service.MenuService;

@Controller
public class MenuController {
	
	@Autowired
	private MenuService ms;
	
	@RequestMapping("/getMenu.action")
	@ResponseBody
	public String   getMenu(@RequestParam("file") CommonsMultipartFile file)  throws IOException {
		
		System.out.println("22222");

		return "";
	}
	
	
	
	
 
}
