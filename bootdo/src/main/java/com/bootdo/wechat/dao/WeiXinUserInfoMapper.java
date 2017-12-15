package com.bootdo.wechat.dao;

import com.bootdo.wechat.model.WeiXinUserInfo;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface WeiXinUserInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(WeiXinUserInfo record);

    int insertSelective(WeiXinUserInfo record);

    WeiXinUserInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(WeiXinUserInfo record);

    int updateByPrimaryKey(WeiXinUserInfo record);
}