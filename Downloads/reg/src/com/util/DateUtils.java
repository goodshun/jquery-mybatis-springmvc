package com.util;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class DateUtils {

	public static final String YMD_FORMAT = "yyyyMMdd";
	
	public static final String Y_M_D_FORMAT = "yyyy-MM-dd";

	public static final String YMDHMS_FORMAT = "yyyyMMddHHmmss";

	public static final String Y_M_D_H_M_S_FORMAT = "yyyy-MM-dd HH:mm:ss";

	public DateUtils() {
	}

	
	public static final Date now() {
		return new Date();
	}

	/**
	 * 得到当前日期的字符串
	 * 
	 * @param s
	 *  格式化类型(例如:yyyy-MM-dd)
	 * @return
	 */
	public static String getNow(String s) {
		return getDateStr(System.currentTimeMillis(), s);
	}

	/**
	 * 得到来源日期字符串
	 * 
	 * @param l   长整型日期
	 * @param s   格式化类型(例如:yyyy-MM-dd)
	 * @return
	 */
	public static String getDateStr(long l, String s) {
		SimpleDateFormat simpledateformat;
		return (simpledateformat = new SimpleDateFormat(s)).format(new Date(l));
	}
	
	/**
	 * 日起格式化
	 * @param date
	 * @param s
	 * @return
	 */
	public static final String formatDatetime(Date date ,String s) {
		SimpleDateFormat simpledateformat = new SimpleDateFormat(s);
		return simpledateformat.format(date);
	}
	
	/**
	 * 
	 * @param date
	 * @return
	 */
	public static Date formatDatetime(String source){
		SimpleDateFormat sf =new SimpleDateFormat("yyyyMMddHHmmss");
		
		Date date = null;
		
		try {
			date = sf.parse(source);
		} catch (ParseException e) {}
		
		return date;
	}
	
	
	/**
	 *  获取某个时间的下一日的时间
	 * @param date
	 * @param interval
	 * @return
	 */
	public static String nextDate(Date date, int interval ){
		return next(date,5,1);
	}
	
	/**
	 *  获取某个时间的下一周的时间
	 * @param date
	 * @param interval
	 * @return
	 */
	public static String nextWeek(Date date, int interval ){
		return next(date,3,1);
	}
	
	/**
	 *  获取某个时间的下一月的时间
	 * @param date
	 * @param interval
	 * @return
	 */
	public static String nextMonth(Date date, int interval ){
		return next(date,2,1);
	}
	
	private static String next(Date date, int type, int interval){
		/*gc.add(1,-1)表示年份减一
		*gc.add(2,-1)表示月份减一
		*gc.add(3.-1)表示周减一
		*gc.add(5,-1)表示天减一
		*/
		SimpleDateFormat sf =new SimpleDateFormat("yyyyMMddHHmmss");
		GregorianCalendar gc = new GregorianCalendar();
		gc.setTime(date);
		gc.add(type, +interval);
		
		return sf.format(gc.getTime());
	}
	public static String getNowTimeStamp() {
		SimpleDateFormat sf =new SimpleDateFormat("YMDHMS_FORMAT");
		return sf.format(Calendar.getInstance().getTime());
	}
	
	public static void main(String args[]) {
		System.out.println(nextDate(new Date(),1));
	}

}
