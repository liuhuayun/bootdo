package com.bootdo.system.service;

import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.service.IService;
import com.bootdo.system.domain.RoleDO;
import com.bootdo.system.domain.model.SysRole;

@Service
public interface RoleService extends IService<SysRole>{

	RoleDO get(Long id);

	List<RoleDO> list();

	int save(RoleDO role);

	int update(RoleDO role);

	int remove(Long id);

	List<RoleDO> list(Long userId);

	int batchremove(Long[] ids);

	Set<String> listRoles(Long userId);
}
