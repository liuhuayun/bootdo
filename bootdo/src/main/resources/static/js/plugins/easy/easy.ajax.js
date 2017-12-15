/**
 * easy.ajax 1.0
 * 该框架依赖jquery,请先引入jquery1.5+版本。
 */
;
(function (window, $) {
    var EasyAjax = {};
    var _ajaxType = ['get', 'POST', 'put', 'delete', 'options', 'head', 'connect', 'trace'];
    var _ajaxDataType = ['json', 'xml', 'html', 'script'];
    var _ajaxContentType = ["application/json", "application/x-www-form-urlencoded"];
    /**
     * Ajax Get请求
     * @param config Ajax需要参数
     * @param callback ajax结束回掉函数
     */
    EasyAjax.get = function (config, callback) {
        config.type = _ajaxType[0];
        if(config.sureDo&&config.msg){//确认要操作
        	sureDo(config,callback);
        }else{
        	_ajax(config, callback);
        }
    };
    /**
     * Ajax Post请求
     * @param config Ajax需要参数
     * @param callback ajax结束回掉函数
     */
    EasyAjax.post = function (config, callback) {
        config.type = _ajaxType[1];
        if(config.sureDo&&config.msg){//确认要操作
        	sureDo(config,callback);
        }else{
        	_ajax(config, callback);
        }
    };
    /**
     * Ajax Get请求数据格式是JSON
     * @param config Ajax需要参数可只配URL
     * @param callback ajax结束回掉函数
     */
    EasyAjax.get_json = function (config, callback) {
        config.type = _ajaxType[0];
        config.dataType = _ajaxDataType[0];
        if(config.sureDo&&config.msg){//确认要操作
        	sureDo(config,callback);
        }else{
        	 _ajax(config, callback);
        }
    };
    /**
     * 文件上传Ajax
     * @param config ajax配置项
     * @param callback 回调函数
     */
    EasyAjax.upload_file = function (config, callback) {
        config.type = _ajaxType[1];
        config.dataType = _ajaxDataType[0];
        config.cache = false;
        config.contentType = false;
        config.processData = false;
        _ajax(config, callback);
    };
    /**
     * 根据dom元素上传文件
     * @param config
     * @param callback  回掉函数
     * @param elem 文件dom id or class
     */
    EasyAjax.Upload_File_Elem = function (config, callback) {
        var file = $(config.elem).get(0).files[0];
        var fileData = new FormData();
        fileData.append("file", file);
        config.type = _ajaxType[1];
        config.dataType = _ajaxDataType[0];
        config.cache = false;
        config.contentType = false;
        config.processData = false;
        config.data = fileData;
        _ajax(config, callback);
    };
    /**
     * Ajax post请求数据格式是JSON，接口使用@RequestParam时使用，使用form表单提交方式
     * @param config Ajax需要参数可只配URL
     * @param callback ajax结束回掉函数
     */
    EasyAjax.post_form_json = function (config, callback) {
        config.type = _ajaxType[1];
        config.dataType = _ajaxDataType[0];
        if (!config.contentType) {
            config.contentType = _ajaxContentType[1];
        }
        if(config.sureDo&&config.msg){//确认要操作
        	sureDo(config,callback);
        }else{
        	 _ajax(config, callback);
        }
    };

    /**
     * Ajax post请求数据格式是JSON
     * 接口使用@RequestBody时使用自动添加contentType以及格式化参数
     * @param config Ajax需要参数可只配URL
     * @param callback ajax结束回掉函数
     */
    EasyAjax.post_json = function (config, callback) {
        config.type = _ajaxType[1];
        config.dataType = _ajaxDataType[0];
        if (!config.contentType) {
            config.contentType = _ajaxContentType[0];
        }
        if (config.contentType == 'application/json') {
            config.data = JSON.stringify(config.data);
        }
        if(config.sureDo&&config.msg){//确认要操作
        	sureDo(config,callback);
        }else{
        	_ajax(config, callback);
        }
    };
    
    function sureDo(config,callback){
    	layer.confirm(config.msg, { 
		btn : [ '确定', '取消' ]
	    }, function(index) {
	    	 _ajax(config, callback)
			 layer.close(index);
		})
    }

    
    function _ajax(config, callback) {
    	var index;
        $.ajax({
            url: config.url,
            type: config.type,
            data: config.data,
            dataType: config.dataType,
            contentType: config.contentType,
            xhrFields: {
                withCredentials: true
        	},
        	crossDomain: true,
            timeout: config.timeout,
            async: config.async,
            cache: config.cache,
            processData: config.processData,
            beforeSend: function () {
            	index = layer.load(2, {time: 10*1000}); //又换了种风格，并且设定最长等待10秒 
            },
            success: function (_resultData) {
            	var statusCode = _resultData.code;
    			var statusMsg = _resultData.msg;
                if (callback||config.mustCallback) {
                    (callback && typeof(callback) === "function") && callback(_resultData);
                }else {
                	if(!statusMsg)
        			{
                		layer.msg(statusMsg);
        			}
                }
                layer.close(index);   
            },
            error: function (XMLHttpRequest) {
                _handleStatus(XMLHttpRequest.status);
                layer.close(index); 
            },
            complete: function () {
            	layer.close(index);   
            }
        });
    }

    function _handleStatus(status) {
        switch (status) {
            case 404:
            	layer.msg('请求资源不存在!');
                break;
            case 400:
            	layer.msg('请求参数有误!');
                break;
            case 500:
            	layer.msg('服务器异常!');
                break;
            case 504:
            	layer.msg('请求超时!');
                break;
            default:
            	layer.msg('未知错误!');
                break;
        }
    }
    window.EasyAjax = EasyAjax;
})(window, jQuery);
// API
/*
    文件上传
    var file = $("#upImgFile").get(0).files[0];
    var fileData = new FormData();
    fileData.append("upImg", file);
*/