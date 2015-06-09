status = 1;
task_model = [
];
content_model = {
	title : "",
	date : "",
	content : ""
};
var App = React.createClass({displayName: "App",
	task_model : "aaafas",

	render : function(){
		return (
			React.createElement("div", null, 
			React.createElement(Category, {data: this.props.data.category}), 
			React.createElement(Task, {data: this.props.data.task, model: task_model}), 
			React.createElement(Content, {model: content_model})
			)
		);
	}
});
var Category = React.createClass({displayName: "Category",
	render : function(){
		var catagoryNodes = this.props.data.map(function(category){
			var _category = category;
			var GotoTask = function(e){
				var id = e.target.id;
				data.category.map(function(item){
					if(item.id == id){
						console.log(item.child);
						task_model =  returnTask(item.child);
					}
				});
				render();
				status = 2;
				$(".category").animate({"left": "-320px"}, 500);
				$(".task").animate({"left": "0px"}, 500);
				$(".content").animate({"left":"320px"}, 500);
				$(".back").css("display","block");
			}
			return (
				React.createElement("div", {className: "categoryItem", id: _category.id, onClick: GotoTask, onTouchEnd: GotoTask}, 
					category.title
				)
			);
		});

		return (
			React.createElement("div", {className: "category"}, 
			catagoryNodes
			)

		);
	}
});

var Task = React.createClass({displayName: "Task",
	render : function(){
		var taskNodes = this.props.model.map(function(task){
			var _task = task;
			var GotoContent = function(e){
				var id = e.target.id;
				task_model.map(function(item){
					if(item.id == id){
						content_model.title = item.title;
						content_model.date = item.date;
						content_model.content = item.content;
					}
				})
				render();
				status = 3;
				$(".category").animate({"left": "-640px"}, 500);
				$(".task").animate({"left": "-320px"}, 500);
				$(".content").animate({"left":"0px"}, 500);
			}
			return(
				React.createElement("div", {className: "taskItem", id: _task.id, onClick: GotoContent, onTouchEnd: GotoContent}, 
					task.title
				)
			);
		})
		return(
			React.createElement("div", {className: "task"}, 
			taskNodes
			)
		);
	}
});
var Content = React.createClass({displayName: "Content",
	render : function(){
		return(
			React.createElement("div", {className: "content"}, 
				React.createElement("div", {className: "content_title"}, 
				this.props.model.title
				), 
				React.createElement("div", {className: "content_date"}, 
				this.props.model.date
				), 
				React.createElement("div", {className: "content_content"}, 
				this.props.model.content
				)
			)
		);
	}
});
function render(){
	React.initializeTouchEvents(true);
	React.render(
		React.createElement(App, {data: data}),
		document.getElementById("app")
	);
}
render();
	
function returnTask(str){
	var idArrays = str.split(",");
	var model = [];
	for(var i = 0 ; i < idArrays.length ; i++){
		data.task.map(function(item){
			if(item.id == idArrays[i]){
				model.push(item);
			}
		})
	}
	return model;
}

$(".back").click(function(event) {
	if(status == 2){
		status = 1;
		$(".category").animate({"left": "0"}, 500);
		$(".task").animate({"left": "320px"}, 500);
		$(".content").animate({"left":"640px"}, 500);
		$(".back").css("display","none");
	}
	if(status == 3){
		status = 2;
		$(".category").animate({"left": "-320"}, 500);
		$(".task").animate({"left": "0px"}, 500);
		$(".content").animate({"left":"320px"}, 500);
	}
});