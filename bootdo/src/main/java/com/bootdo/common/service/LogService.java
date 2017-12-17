package com.bootdo.common.service;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.service.IService;
import com.bootdo.common.domain.LogDO;
import com.bootdo.common.domain.PageDO;
import com.bootdo.common.domain.model.SysLog;
import com.bootdo.common.utils.Query;
@Service
public interface LogService extends IService<SysLog>{
	PageDO<LogDO> queryList(Query query);
	int remove(Long id);
	int batchRemove(Long[] ids);
}
