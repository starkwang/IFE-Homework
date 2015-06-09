
	var _ID3_content,_ID123,_ID1_title,_ID2_title;
	var _newID1,_newID2,_newID3;
	var category_list_template = "<div class=\"category-item\" id=\"category-item-{{id}}\"><i class=\"iconfont\">&#xe6a1;</i>{{title}}<i class=\"iconfont delete\" act=\"deleteCategory\">&#xe69d;</i></div><div class=\"category-tasklist\" id=\"category-item-{{id}}-tasklist\"></div>";
	var category_list_total = 0;
	var category_list_task_template = "<div class=\"category-task\" id=\"task-{{parentID}}-{{taskID}}\"><i class=\"iconfont\">&#xe6a2;</i>{{content}}({{childtask-amount}})<i class=\"iconfont delete\" act=\"deleteTask\">&#xe69a;</i></div>";
	var child_task_template = "<div class=\"childtask\" id=\"{{ID3}}\">{{title}}</div>";
	var childtask_date_template = "<div id=\"childtask-{{date}}\"><div class=\"childtask-date\">{{date}}</div></div>";

	function addClass(ele,classname){
		ele.setAttribute("class",ele.getAttribute("class")+" "+classname);
	}

	function sortID3ByDate(id31,id32){
		var dateArr1 = _ID3_content[id31].date.split("-");
		var dateArr2 = _ID3_content[id32].date.split("-");
		if(dateArr1[0]>dateArr2[0]){
			return 1;
		}
		if(dateArr1[0] == dateArr2[0] && dateArr1[1] > dateArr2[1]){
			return 1;
		}
		if(dateArr1[0] == dateArr2[0] && dateArr1[1] == dateArr2[1] && dateArr1[2] > dateArr2[2]){
			return 1;
		}
		return -1;
	}

	function getChildTask(category_task_id) {
		//比如说task-1-1
		var childArray = [];
		category_id = category_task_id.split("-")[1];
		console.log(category_id);
		task_id = category_task_id.split("-")[2];
		console.log(_ID123[category_id]);
		for(item in _ID123[category_id]["task"][task_id]["childtask"]){
			console.log(item);
			childArray.push(item);
		}
		return childArray;
	}

	function init(){
		//ID3_content为ID3-内容表，ID123为ID1-ID2-ID3三层表，ID1_title、ID2_title为ID-标题表
		category_list_total = 0;
		if(localStorage.newID1 == undefined){
			_newID1 = 1;
			localStorage.newID1 = _newID1;
		}else{
			_newID1 = localStorage.newID1;
		}
		if(localStorage.newID2 == undefined){
			_newID2 = 1;
			localStorage.newID2 = _newID2;
		}else{
			_newID2 = localStorage.newID2;
		}
		if(localStorage.newID3 == undefined){
			_newID3 = 1;
			localStorage.newID3 = _newID3;
		}else{
			_newID3 = localStorage.newID3;
		}

		//读取LS，实例化_ID1_title
		if(localStorage.getItem("ID1_title")){
			if(localStorage.ID1_title){
				_ID1_title = JSON.parse(localStorage.ID1_title);
			}else{
				_ID1_title = {};
			}
		}else{
			localStorage.ID1_title = "";
			_ID1_title = {};
		}

		//读取LS，实例化_ID123
		if(localStorage.getItem("ID123")){
			if(localStorage.ID123){
				_ID123 = JSON.parse(localStorage.ID123);
			}else{
				_ID123 = {};
			}
		}else{
			localStorage.ID123 = "";
			_ID123 = {};
		}

		//读取LS，实例化_ID2_title
		if(localStorage.getItem("ID2_title")){
			if(localStorage.ID2_title){
				_ID2_title = JSON.parse(localStorage.ID2_title);
			}else{
				_ID2_title = {};
			}
		}else{
			localStorage.ID2_title = "";
			_ID2_title = {};
		}

		//读取LS，实例化_ID3_content
		if(localStorage.getItem("ID3_content")){
			if(localStorage.ID3_content){
				_ID3_content = JSON.parse(localStorage.ID3_content);
			}else{
				_ID3_content = {};
			}
		}else{
			localStorage.ID3_content = "";
			_ID3_content = {};
		}

		if(_ID1_title[1] == undefined){
			addID1("默认分类");
			addID2("默认子分类","1");
		}
		//初始化category
		document.getElementById("category-list").innerHTML = "";
		for(var item in _ID1_title){
			console.log(item);
			
			$("#category-list").innerHTML += category_list_template.replace(/{{title}}/g, _ID1_title[item].title).replace(/{{id}}/g,item);
			for(var task in _ID123[item]["task"]){
				var childtask_amount = 0;
				for(var childtask in _ID123[item]["task"][task]["childtask"]){
					childtask_amount++;
					category_list_total++;
				}
				$("#category-item-"+item+"-tasklist").innerHTML += category_list_task_template.replace(/{{parentID}}/g,item).replace(/{{taskID}}/g,task).replace(/{{content}}/g,_ID2_title[task].title).replace(/{{childtask-amount}}/g,childtask_amount);

			}
			console.log($("#category-item-"+item));
			// $("#category-item-"+item).addEventListener("click",function(){
			// 	alert("aaa");
			// 	//$(this.id + "-tasklist").setAttribute("class",document.getElementById(this.id + "-tasklist").getAttribute("class")+" category-tasklist-clicked");
			// 	//addClass($(this.id + "-tasklist"),"category-tasklist-clicked");

			// });

		}
		$("#category-alltask").innerHTML = "所有任务("+category_list_total+")";

		if($("#category-item-1 .delete").length>0){
			$("#category-item-1 .delete")[0].remove();
		}
	}

	function addID1(title){
		if(_ID1_title[_newID1]==undefined){
			_ID1_title[_newID1] =  {	id : _newID1,
							title : title};
			
			localStorage.ID1_title = JSON.stringify(_ID1_title);

			_ID123[_newID1] = {	id:_newID1,
				task : {}
			}
			localStorage.ID123 = JSON.stringify(_ID123);
			_newID1++;
			localStorage.newID1 = _newID1;
		}else{
			while(_ID1_title[_newID1]!=undefined){
				_newID1++;
			}
			_ID1_title[_newID1] = {	id : _newID1,
							title : title};
			localStorage.ID1_title = JSON.stringify(_ID1_title);

			_ID123[_newID1] = {	id:_newID1,
				task : {}
			}
			localStorage.ID123 = JSON.stringify(_ID123);
			_newID1++
			localStorage.newID1 = _newID1;
		}
		if(_newID1>2){
			init();
		}
		console.log(_ID1_title,_ID123);
	}

	function addID2(title,parentID){
		if(_ID2_title[_newID2]==undefined){
			_ID2_title[_newID2] =  {	id : _newID2,
							title : title,
						};
			
			localStorage.ID2_title = JSON.stringify(_ID2_title);

			_ID123[parentID]["task"][_newID2] = {	id : _newID2,
							parentID : parentID,
							childtask : {}
						};
			localStorage.ID123 = JSON.stringify(_ID123);
			_newID2++;
			localStorage.newID2 = _newID2;
		}else{
			while(_ID2_title[_newID2]!=undefined){
				_newID2++;
			}
			_ID2_title[_newID2] =  {	id : _newID2,
							title : title,
						};
			
			localStorage.ID2_title = JSON.stringify(_ID2_title);

			_ID123[parentID]["task"][_newID2] = {	id : _newID2,
							parentID : parentID,
							childtask : {}
						};
			localStorage.ID123 = JSON.stringify(_ID123);
			_newID2++;
			localStorage.newID2 = _newID2;
		}
		if(_newID2>2){
			init();
		}
		console.log(_ID1_title,_ID123,_ID2_title);
	}

	function addID3(title,date,content,ID2,ID1){
		if(_ID3_content[_newID3]==undefined){
			_ID3_content[_newID3] =  {	id : _newID3,
								title : title,
								date : date,
								content : content};
			
			localStorage.ID3_content = JSON.stringify(_ID3_content);

			_ID123[ID1]["task"][ID2]["childtask"][_newID3] = {	id : _newID3,
												ID2 : ID2,
												ID1 : ID1};
			localStorage.ID123 = JSON.stringify(_ID123);
			_newID3++;
			localStorage.newID3 = _newID3;
		}else{
			while(_ID3_content[_newID3]!=undefined){
				_newID3++;
			}
			_ID3_content[_newID3] =  {	id : _newID3,
								title : title,
								date : date,
								content : content};
			
			localStorage.ID3_content = JSON.stringify(_ID3_content);

			_ID123[ID1]["task"][ID2]["childtask"][_newID3] = {	id : _newID3,
												ID2 : ID2,
												ID1 : ID1};
			localStorage.ID123 = JSON.stringify(_ID123);
			_newID3++;
			localStorage.newID3 = _newID3;
		}
		init();
	}

	window.init = init; 

	init();

window.onload = window.onresize = function(){
	if(document.documentElement.clientHeight<600){
		$("#category").style.height = "600px";
		$("#task").style.height = "600px";
		$("#category-list").style.height = "500px";
		$("#task-body").style.height = "500px";
	}else{
		$("#category").style.height = "100%";
		$("#task").style.height = "100%";
		$("#category-list").style.height = "100%";
		$("#task-body").style.height = "100%";
	}
	if(document.documentElement.clientWidth<1000){
		$("#header").style.width = "1000px";
		$("#content").style.width = "600px";
	}else{
		$("#header").style.width = "100%";
		$("#content").style.width = " ";
	}
}
