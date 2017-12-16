// 获取form中的数据，并将其转换成ajax需要的数据格式
function getFormJson(formId) {
	var o = {};
	var fid = "#" + formId;
	var a = $(fid).serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value.trim() || '');
		} else {
			o[this.name] = this.value.trim() || '';
		}
	});
	return o;
}

function getFormSerialize(formid){
	var form=$("#"+formid);
	if(form.length>0){
		return form.serialize()
	}else{
		return "";
	}
}

function cleanFormVal(formid){
	$("#"+formid).find('input[type=text]').each(function(i,item){
		if($(item).val()){
			$(item).val('');
		}
	})
	$("#"+formid).find('select').each(function(i,item){
		if($(item).val()){
			$(item).val('');
		}
	})
}


function assignFormVals(formid,obj){
	$("#"+formid +" :input").each(function(i,item){
       var name=$(item).attr("name");
       if(name){
    	   if(name in obj){
    		   if($(item).attr("type")!="checkbox"){
    			   $(item).val(obj[name]);
    		   }
           }
       }
	})
}

function assignFormVal(formid,obj){
	$("#"+formid +" input").each(function(i,item){
       var name=$(item).attr("name");
       if(name){
    	   if(name in obj){
        	   $(item).val(obj[name]);
           }
       }
	})
}


function tip(content){
	layer.open({
	    content: content,
	    type:0,
	    skin: 'msg',
	    time: 2 //2秒后自动关闭
	  });
}