/**
 * 初始化 BootStrap Table 的封装
 * 约定：toolbar的id为 (bstableId + "Toolbar")
 * @author donglong
 */
(function () {
    var BSTable = function (bstableId, url, columns) {
        this.btInstance = null;					//jquery和BootStrapTable绑定的对象
        this.bstableId = bstableId;
        this.url =url;
        this.method = "post";
        this.paginationType = "server";			//默认分页方式是服务器分页,可选项"client"
        this.toolbarId = bstableId + "Toolbar";
        this.columns = columns;
        //this.height = 665;						//默认表格高度665
        this.data = {};
        this.ajaxOptions={};
        this.pagination=true;//设置是否分页
        this.queryParams = {}; // 向后台传递的自定义参数
        this.successCallback;//加载完成触发事件
        this.onClickRow;
        this.onPageChange;
        this.pageSize=10;
        this.pageList=[10, 20, 30];
        this.clickToSelect=true;
        this.showColumns=false;
        this.sortOrder="";
        this.sortName="";
    };

    BSTable.prototype = {
        /**
         * 初始化bootstrap table
         */
        init: function () {
            var tableId = this.bstableId;
            var me = this;
            this.btInstance =
                $('#' + tableId).bootstrapTable({
                    contentType: "application/x-www-form-urlencoded",
                	dataType: "json",//数据类型
                    url: this.url,				//请求地址
                    method: this.method,		//ajax方式,post还是get
                    ajaxOptions: {				//ajax请求的附带参数
                    	 xhrFields: {        //跨域
                             withCredentials: true
                         },
                         crossDomain: true,
                    },
                    toolbar: "#" + this.toolbarId,//顶部工具条
                    iconSize : 'outline',
                    striped: true,     			//是否显示行间隔色
                    cache: false,      			//是否使用缓存,默认为true
                    pagination:this.pagination,     		//是否显示分页（*）
                    sortable: true,      		//是否启用排序
                    sortOrder: this.sortOrder,     		//排序方式
                    sortName:this.sortName,
                    pageNumber: 1,      			//初始化加载第一页，默认第一页
                    pageSize:this.pageSize,      			//每页的记录行数（*）
                    pageList: this.pageList,  	//可供选择的每页的行数（*）
                    queryParamsType: 'limit', 	//默认值为 'limit' ,在默认情况下 传给服务端的参数为：offset,limit,sort
                    queryParams: function (param) {
                        return $.extend(param,me.queryParams);
                    }, // 向后台传递的自定义参数
                    sidePagination: this.paginationType,   //分页方式：client客户端分页，server服务端分页（*）
                    search: false,      		//是否显示表格搜索，此搜索是客户端搜索，不会进服务端
                    strictSearch: true,			//设置为 true启用 全匹配搜索，否则为模糊搜索
                    showColumns: this.showColumns,     		//是否显示所有的列
                    showRefresh: false,     		//是否显示刷新按钮
                    minimumCountColumns: 2,    	//最少允许的列数
                    clickToSelect: this.clickToSelect,    	//是否启用点击选中行
                    searchOnEnterKey: true,		//设置为 true时，按回车触发搜索方法，否则自动触发搜索方法
                    columns: this.columns,		//列数组
                    pagination: true,			//是否显示分页条
                    //height: this.height,
                    responseHandler: function(res) {//自定义数据源格式,根据不同的分页方式返回不同的数据格式
                    	var obj = res.rows;
                    	var jsonData={};
                    	if(me.paginationType =="server"){
                    		   jsonData= {
                                  "total": res.total,//总页数
                                  "rows":  res.rows   //数据
                               };
                    	}else{
                    		jsonData= res.rows;
                    	}
                    	return jsonData;
                    },
                    onLoadSuccess:function(res){//设置回调函数
                    	if(me.successCallback){
                    	   me.successCallback(res);
                    	}
                    },
                    onClickRow:function(row,obj){
                    	if(me.onClickRow){
                    		me.onClickRow(row,obj);
                    	}
                    },
                    onPageChange : function(size, number) {
                    	if(me.onPageChange){
                    		me.onPageChange(size, number);
                    	}
					},
                    formatNoMatches : function() {
        				return '无符合条件的记录';
        			},
                    icons: {
                        refresh: 'glyphicon-repeat',
                        toggle: 'glyphicon-list-alt',
                        columns: 'glyphicon-list'
                    },
                    iconSize: 'outline'
                });
            return this;
        },
        /**
         * 向后台传递的自定义参数
         * @param param
         */
        setQueryParams: function (param) {
            this.queryParams = param;
        },
        /**
         * 设置分页方式：server 或者 client
         */
        setPaginationType: function (type) {
            this.paginationType = type;
        },
        /**
         * 设置加载完成事件
         */
        setOnLoadSuccess: function (fun) {
            this.successCallback = fun;
        },
        
        
        setOnClickRow: function (fun) {
            this.onClickRow = fun;
        },
        
        setOnPageChange: function (fun) {
            this.onPageChange = fun;
        },
        //设置每页的记录行数（*）
        setPageSize:function (num) {
            this.pageSize = num;
        },   
        //设置分页页数
        setPageList: function (arr) {
            this.pageList = arr;
        },
        
        //是否点击启用行
        setClickToSelect:function(flag){
        	 this.clickToSelect = flag;
        },
        
        setShowColumns:function(flag){
        	this.showColumns=flag;
        },
        
        setSortOrder:function(order){
        	this.sortOrder=order;
        },
        
        setSortName:function(name){
        	this.sortName=name;
        },
        /**
         * 刷新 bootstrap 表格
         * Refresh the remote server data,
         * you can set {silent: true} to refresh the data silently,
         * and set {url: newUrl} to change the url.
         * To supply query params specific to this request, set {query: {foo: 'bar'}}
         */
        refresh: function (parms) {
            if (typeof parms != "undefined") {
            	this.setQueryParams(parms);
                this.btInstance.bootstrapTable('refresh', parms);
            } else {
                this.btInstance.bootstrapTable('refresh');
            }
        }
    };

    window.BSTable = BSTable;

}());