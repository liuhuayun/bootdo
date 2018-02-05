package com.bootdo.common.task;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.lang.Console;

public class HelloQuartz implements Job{

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		
		Console.log(DateUtil.format(DateUtil.date(), "yyyy-MM-dd HH:mm:ss")+"===============>Hello Quartz");
	}
	
	public void run2(){
		
	    	Console.log("===============>run2()");
	}
}
