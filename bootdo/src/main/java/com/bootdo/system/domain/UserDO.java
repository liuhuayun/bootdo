package com.bootdo.system.domain;

import java.util.List;

public class UserDO extends SysUser {
    private String deptName;
    
    
    public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	//角色
    private List<Long> roleIds;

    public List<Long> getroleIds() {
        return roleIds;
    }

    public void setroleIds(List<Long> roleIds) {
        this.roleIds = roleIds;
    }
}
