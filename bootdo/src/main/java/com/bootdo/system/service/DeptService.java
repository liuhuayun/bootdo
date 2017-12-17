package com.bootdo.system.service;

import com.baomidou.mybatisplus.service.IService;
import com.bootdo.common.domain.Tree;
import com.bootdo.system.domain.DeptDO;
import com.bootdo.system.domain.model.SysDept;


/**
 * 部门管理
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2017-09-27 14:28:36
 */
public interface DeptService  extends IService<SysDept>{
	Tree<DeptDO> getTree();
	boolean checkDeptHasUser(Long deptId);
}
