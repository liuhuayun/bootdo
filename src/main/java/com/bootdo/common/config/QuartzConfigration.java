package com.bootdo.common.config;

import java.io.IOException;
import java.util.Properties;

import javax.annotation.Resource;

import org.quartz.Scheduler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.config.PropertiesFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;

import com.bootdo.common.quartz.factory.JobFactory;

@Configuration
public class QuartzConfigration {

	@Autowired
	JobFactory jobFactory;

	// 指定quartz.properties
	@Bean(name="quartProp")
	public Properties quartzProperties() throws IOException {
		PropertiesFactoryBean propertiesFactoryBean = new PropertiesFactoryBean();
		propertiesFactoryBean.setLocation(new ClassPathResource("/config/quartz.properties"));
		propertiesFactoryBean.afterPropertiesSet();
		return propertiesFactoryBean.getObject();
	}
	
	@Bean(name="schedulerFactoryBean")
	public SchedulerFactoryBean schedulerFactoryBean(@Qualifier("quartProp") Properties properties) {
		SchedulerFactoryBean schedulerFactoryBean = new SchedulerFactoryBean();
		schedulerFactoryBean.setOverwriteExistingJobs(true);
		schedulerFactoryBean.setQuartzProperties(properties);
		schedulerFactoryBean.setJobFactory(jobFactory);
		return schedulerFactoryBean;
	}



	// 创建schedule
	@Bean(name = "scheduler")
	public Scheduler scheduler(@Qualifier("schedulerFactoryBean") SchedulerFactoryBean schedulerFactoryBean) {
		return schedulerFactoryBean.getScheduler();
	}
}
