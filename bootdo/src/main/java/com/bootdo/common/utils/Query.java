package com.bootdo.common.utils;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

/**
 * 分页查询参数
 */
public class Query<T extends Model<T>> extends LinkedHashMap<String, Object> {
	private static final long serialVersionUID = 1L;
	private Map<String, Object> searchParam;
	private Page<?> page;
	
	public Query() {
		
	}
	public Query(Map<String, Object> params) {
		this.putAll(params);
		int offset = Integer.parseInt(params.get("offset").toString());
		int limit = Integer.parseInt(params.get("limit").toString());
		this.page=PageHelper.startPage(offset / limit + 1, limit);
		this.searchParam=getSearchMap(params);
	}
	
	public Query(Map<String, Object> params,EntityWrapper<T> entityWrapper) {
		this.putAll(params);
		int offset = Integer.parseInt(params.get("offset").toString());
		int limit = Integer.parseInt(params.get("limit").toString());
		String order=(params.get("order")==null?"":params.get("order")).toString();
		String sort=(params.get("sort")==null?"":params.get("sort")).toString();
		this.page=PageHelper.startPage(offset / limit + 1, limit);
		if (params != null) {
			T t=entityWrapper.getEntity();
		    Field[] files=t.getClass().getDeclaredFields();
            for (String key : params.keySet()) {
        		 for(Field file:files){
        			 if(file.getName().equals(key)&&StringUtils.isNotBlank((String)params.get(key))){
        				 if(file.getType()==String.class){
        					 entityWrapper.like(Underline2Camel.camel2Underline(key), (String) params.get(key));
        				 }
        				 if(file.getType()==Integer.class||file.getType()==Long.class){
        					 entityWrapper.eq(Underline2Camel.camel2Underline(key), params.get(key));
        				 }
        			 }
        		 }
            }
            if(StringUtils.isNotEmpty(order)&&StringUtils.isNotEmpty(sort)){
            	if(order.equals("desc")){
            		entityWrapper.orderBy(sort, true);
            	}else{
            		entityWrapper.orderBy(sort, false);
            	}
    		}
	   }
		
	}
	
	/**
	 * @param params 参数
	 * @param page 是否分页 true 分页 false 不分页
	 */
	public Query(Map<String, Object> params,boolean page) {
		this.putAll(params);
		int offset = Integer.parseInt(params.get("offset").toString());
		int limit = Integer.parseInt(params.get("limit").toString());
		if(page){
			this.page=PageHelper.startPage(offset / limit + 1, limit);
		}
		this.searchParam=getSearchMap(params);
	}
	
	private Map<String, Object> getSearchMap(Map<String, Object> param) {
		   searchParam=new HashMap<>();
		   if (param != null) {
			   for (String key : param.keySet()) {
				   if(param.get(key)!=null&&!"".equals(param.get(key))){
					   searchParam.put(Underline2Camel.camel2Underline(key), param.get(key));
				   }
	           }
			   searchParam.remove("OFFSET");
			   searchParam.remove("LIMIT");
			   searchParam.remove("ORDER");
			   searchParam.remove("SORT");
			   MapRemoveNullUtil.removeNullEntry(searchParam);
		   }
		   return searchParam;
	}
	
	
	public Map<String, Object> getSearchParam() {
		return searchParam;
	}
	public void setSearchParam(Map<String, Object> searchParam) {
		this.searchParam = searchParam;
	}
	public Page<?> getPage() {
		return page;
	}
	public void setPage(Page<?> page) {
		this.page = page;
	}
	
	
}
