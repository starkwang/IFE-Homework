(function(){
	status = 1;
	click = true;
	task_model = [
	];
	content_model = {
		title : "",
		date : "",
		content : ""
	};
	var App = React.createClass({
		task_model : "aaafas",

		render : function(){
			return (
				<div>
				<Category data={this.props.data.category} /> 
				<Task data={this.props.data.task} model={task_model} />
				<Content model={content_model} />
				</div>
			);
		}
	});
	var Category = React.createClass({
		render : function(){
			var catagoryNodes = this.props.data.map(function(category){
				var _category = category;
				var GotoTask = function(e){
					if(click){
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
					click = true;
				}
				var PreventClick = function(e){
					click = false;
				}
				return (
					<div className="categoryItem" id={_category.id} onClick={GotoTask} onTouchMove={PreventClick} onTouchEnd={GotoTask}>
						{category.title}
					</div>
				);
			});

			return (
				<div className="category">
				{catagoryNodes}
				</div>

			);
		}
	});

	var Task = React.createClass({
		render : function(){
			var taskNodes = this.props.model.map(function(task){
				var _task = task;
				var GotoContent = function(e){
					if(click){
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
					click = true;
				}
				var PreventClick = function(e){
					click = false;
				}
				return(
					<div className="taskItem" id={_task.id} onClick={GotoContent} onTouchMove={PreventClick} onTouchEnd={GotoContent}>
						{task.title}
					</div>
				);
			})
			return(
				<div className="task">
				{taskNodes}
				</div>
			);
		}
	});
	var Content = React.createClass({
		render : function(){
			return(
				<div className="content">
					<div className="content_title">
					{this.props.model.title}
					</div>
					<div className="content_date">
					{this.props.model.date}
					</div>
					<div className="content_content">
					{this.props.model.content}
					</div>
				</div>
			);
		}
	});
	function render(){
		React.initializeTouchEvents(true);
		React.render(
			<App data={data} />,
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
})()