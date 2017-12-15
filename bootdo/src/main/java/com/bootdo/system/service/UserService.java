package com.bootdo.system.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.bootdo.system.vo.UserVO;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.service.IService;
import com.bootdo.common.domain.Tree;
import com.bootdo.system.domain.DeptDO;
import com.bootdo.system.domain.SysUser;
import com.bootdo.system.domain.UserDO;

@Service
public interface UserService extends IService<SysUser>{
	UserDO get(Long id);

	List<UserDO> list(Map<String, Object> map);

	int count(Map<String, Object> map);

	int save(UserDO user);

	int update(UserDO user);

	int remove(Long userId);

	int batchremove(Long[] userIds);

	boolean exit(Map<String, Object> params);

	Set<String> listRoles(Long userId);

	int resetPwd(UserVO userVO,UserDO userDO) throws Exception;

	Tree<DeptDO> getTree();

	/**
	 * 更新个人信息
	 * @param userDO
	 * @return
	 */
	int updatePersonal(UserDO userDO);

}
