package com.bootdo.oa.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.bootdo.oa.dao.NotifyRecordDao;
import com.bootdo.oa.domain.NotifyRecordDO;
import com.bootdo.oa.domain.model.OaNotifyRecord;
import com.bootdo.oa.service.NotifyRecordService;



@Service
public class NotifyRecordServiceImpl extends ServiceImpl<NotifyRecordDao, OaNotifyRecord> implements NotifyRecordService {
	@Autowired
	private NotifyRecordDao notifyRecordDao;
	
	@Override
	public NotifyRecordDO get(Long id){
		return notifyRecordDao.get(id);
	}
	
	@Override
	public List<NotifyRecordDO> list(Map<String, Object> map){
		return notifyRecordDao.list(map);
	}
	
	@Override
	public int count(Map<String, Object> map){
		return notifyRecordDao.count(map);
	}
	
	@Override
	public int save(NotifyRecordDO notifyRecord){
		return notifyRecordDao.save(notifyRecord);
	}
	
	@Override
	public int update(NotifyRecordDO notifyRecord){
		return notifyRecordDao.update(notifyRecord);
	}
	
	@Override
	public int remove(Long id){
		return notifyRecordDao.remove(id);
	}
	
	@Override
	public int batchRemove(Long[] ids){
		return notifyRecordDao.batchRemove(ids);
	}

	@Override
	public int changeRead(NotifyRecordDO notifyRecord) {
		return notifyRecordDao.changeRead(notifyRecord);
	}

}
