var prefix = "/sys/user"
var MyObj={
        searchformid:"searchForm",
		id:"exampleTable",
		table:null,
};
MyObj.initColumn = function () {
    var columns =  [
		{checkbox : true},
		{field : 'userId', title : '序号'},
		{field : 'name',title : '姓名'},
		{field : 'username',title : '用户名'},
		{field : 'email',title : '邮箱'},
		{field : 'status',title : '状态',align : 'center',
			formatter : function(value, row, index) {
				if (value == '0') {
					return '<span class="label label-danger">禁用</span>';
				} else if (value == '1') {
					return '<span class="label label-primary">正常</span>';
				}
			}
		},
		{
			title : '操作',
			field : 'id',
			align : 'center',
			formatter : function(value, row, index) {
				var e = '<a  class="btn btn-primary btn-sm ' + s_edit_h + '" href="#" mce_href="#" title="编辑" onclick="edit(\''
					+ row.userId
					+ '\')"><i class="fa fa-edit "></i></a> ';
				var d = '<a class="btn btn-warning btn-sm ' + s_remove_h + '" href="#" title="删除"  mce_href="#" onclick="remove(\''
					+ row.userId
					+ '\')"><i class="fa fa-remove"></i></a> ';
				var f = '<a class="btn btn-success btn-sm ' + s_resetPwd_h + '" href="#" title="重置密码"  mce_href="#" onclick="resetPwd(\''
					+ row.userId
					+ '\')"><i class="fa fa-key"></i></a> ';
				return e + d + f;
			}
		} ];
    return columns;
};


$(function() {
	getTreeData();
    var defaultColunms = MyObj.initColumn();
    var table = new BSTable(MyObj.id, prefix + "/list", defaultColunms);
	table.setQueryParams(getFormJson("searchForm"));
	MyObj.table = table.init();
});
function reLoad() {
	var param = getFormJson("searchForm");//获取查询条件
	MyObj.table.refresh(param);
}
function resetSearch(){
	cleanFormVal(MyObj.searchformid);
	MyObj.table.refresh(null);
}

function add() {
	layer.open({
		type : 2,
		title : '增加用户',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix + '/add'
	});
}
function remove(id) {
	var config={
			url : "/sys/user/remove",
			data:{'id' : id},
			sureDo:true,
			msg:"确定要删除选中的记录？"
	}
	EasyAjax.post(config,function(r){
		if (r.code == 0) {
			layer.msg(r.msg);
			reLoad();
		} else {
			layer.msg(r.msg);
		}
	});
}
function edit(id) {
	layer.open({
		type : 2,
		title : '用户修改',
		maxmin : true,
		shadeClose : false,
		area : [ '800px', '520px' ],
		content : prefix + '/edit/' + id // iframe的url
	});
}
function resetPwd(id) {
	layer.open({
		type : 2,
		title : '重置密码',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '400px', '260px' ],
		content : prefix + '/resetPwd/' + id // iframe的url
	});
}
function batchRemove() {
	var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length == 0) {
		layer.msg("请选择要删除的数据");
		return;
	}
	layer.confirm("确认要删除选中的'" + rows.length + "'条数据吗?", {
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		var ids = new Array();
		// 遍历所有选择的行数据，取每条数据对应的ID
		$.each(rows, function(i, row) {
			ids[i] = row['userId'];
		});
		var config={
				data : {"ids" : ids},
				url : prefix + '/batchRemove',
		};
		EasyAjax.post({url : "/system/sysDept/tree"},function(r){
			if (r.code == 0) {
				layer.msg(r.msg);
				reLoad();
			} else {
				layer.msg(r.msg);
			}
		});
	}, function() {});
}
function getTreeData() {
	EasyAjax.get({url : "/system/sysDept/tree"},function(r){
		loadTree(r);
	});
}
function loadTree(tree) {
	$('#jstree').jstree({
		'core' : {
			'data' : tree
		},
		"plugins" : [ "search" ]
	});
	$('#jstree').jstree().open_all();
}
$('#jstree').on("changed.jstree", function(e, data) {
	if (data.selected == -1) {
		var opt = {
			query : {
				deptId : '',
			}
		}
		$('#exampleTable').bootstrapTable('refresh', opt);
	} else {
		var opt = {
			query : {
				deptId : data.selected[0],
			}
		}
		$('#exampleTable').bootstrapTable('refresh',opt);
	}

});