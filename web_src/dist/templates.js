angular.module("app.templates").run(["$templateCache", function($templateCache) {$templateCache.put("templates/task/task.html","<div>\n	\n	<form name=\"vm.form\" novalidate class=\'form-vertical\'>\n        <div class=\"add_task\">\n			<div >\n	        	<span class=\"taskLabel\">Add Task</span>\n	        	<span class=\"required\">*</span>\n	        </div>\n	        <div >\n		        <input type=\"text\" name=\"task\" ng-model=\"vm.task.task\" capitalize required class=\"form-control \" />\n			\n		        <button type=\"submit\" class=\"btn btn-success\" ng-click=\"vm.submit();\">ADD</button>\n	        </div>\n                   \n		</div>\n    </form>\n</div>\n<div class=\'task_list\'>\n	<div >\n	    <span class=\"taskLabel \">Tasks</span>\n	</div>\n	<table >\n		<thead>\n			<th>Id</th>\n			<th>Task</th>\n			<th>Delete</th>\n		</thead>\n		<tr ng-repeat = \"x in vm.tasks track by $index\">\n			<td>{{x.id}}</td>\n			<td>{{x.task}}</td>\n			<td><button class=\"small_btn btn btn-danger\" ng-click=\"vm.delete(x.id)\">X</button>\n		</tr>\n	</table>\n\n</div>\n\n\n        \n");
$templateCache.put("templates/task/tasks.html","<div class=\"header2\">\n	<h2>users</h2>\n</div>");}]);