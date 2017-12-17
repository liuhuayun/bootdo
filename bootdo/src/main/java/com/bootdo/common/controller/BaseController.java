package com.bootdo.common.controller;

import java.util.List;
import java.util.Map;

import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.baomidou.mybatisplus.service.IService;
import com.bootdo.common.utils.R;
import com.bootdo.common.utils.ShiroUtils;
import com.bootdo.system.domain.UserDO;

public abstract class BaseController <T,Service extends IService<T>>{
	
	@Autowired
	protected Service service;
	
	
	public UserDO getUser() {
		return ShiroUtils.getUser();
	}

	public Long getUserId() {
		return getUser().getUserId();
	}

	public String getUsername() {
		return getUser().getUsername();
	}
	
	/** 
	* @Description: 操作公共方法
	* @param @param id
	* @param @return  
	* @return T 
	* @throws 
	*/ 
	@RequestMapping("selectById")
	@ResponseBody
	public T selectById(@RequestParam("id") Integer id){
		return service.selectById(id);
	}
	
	@RequestMapping("selectByIds")
	@ResponseBody
	public List<T> selectById(@RequestParam(value="ids[]",required=false) List<Integer> ids){
		return service.selectBatchIds(ids);
	}
	
	@RequiresRoles(logical=Logical.OR,value={"admin","base_delete"})
	@RequestMapping("deleteById")
	@ResponseBody
	@Transactional
	public R deleteById(@RequestParam("id") Integer id){
		if(service.deleteById(id)){
			return R.ok();
		}else{
			return R.error();
		}
	}
	
	@RequiresRoles(logical=Logical.OR,value={"admin","base_delete"})
	@RequestMapping("deleteByIds")
	@ResponseBody
	@Transactional
	public R deleteByIds(@RequestParam(value="ids[]",required=false) List<Integer> ids){
		if(service.deleteBatchIds(ids)){
			return R.ok();
		}else{
			return R.error();
		}
	}
	
	@RequiresRoles(logical=Logical.OR,value={"admin","base_delete"})
	@RequestMapping("deleteByMap")
	@ResponseBody
	@Transactional
	public boolean deleteByMap(@RequestParam Map<String, Object> map){
		return service.deleteByMap(map);
	}
	
	
	@RequestMapping("insert")
	@ResponseBody
	@Transactional
	public boolean insert(@RequestBody T t){
		return service.insert(t);
	}
	
	
	@RequestMapping("updateById")
	@ResponseBody
	@Transactional
	public boolean updateById(@RequestBody T t){
		return service.updateById(t);
	}
}