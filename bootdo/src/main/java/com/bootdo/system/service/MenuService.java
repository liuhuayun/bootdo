package com.bootdo.system.service;

import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.service.IService;
import com.bootdo.common.domain.Tree;
import com.bootdo.system.domain.MenuDO;
import com.bootdo.system.domain.model.SysMenu;

@Service
public interface MenuService extends IService<SysMenu>{
	Tree<MenuDO> getSysMenuTree(Long id);

	List<Tree<MenuDO>> listMenuTree(Long id);

	Tree<MenuDO> getTree();

	Tree<MenuDO> getTree(Long id);


	Set<String> listPerms(Long userId);
}
