package com.bootdo.blog.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.bootdo.blog.domain.ContentDO;
import com.bootdo.blog.domain.model.BlogContent;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
 * 文章内容
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2017-10-03 16:17:48
 */
@Mapper
public interface ContentDao extends BaseMapper<BlogContent>{

	ContentDO get(Long cid);
	
	List<ContentDO> list(Map<String,Object> map);
	
	int count(Map<String,Object> map);
	
	int save(ContentDO content);
	
	int update(ContentDO content);
	
	int remove(Long cid);
	
	int batchRemove(Long[] cids);
}
