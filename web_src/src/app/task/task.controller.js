

angular.module('app.task').controller('TaskController',TaskController);

function TaskController(Task,util, $http){
	var vm  = this;
	vm.tasks =null;
	vm.task = null;
	getTasks();


	function getTasks(){

		var id={ id:1}

		
		var t = Task.get(id).$promise.then(
			function(response){
				vm.tasks = response;
			}).catch(function(e) {
				console.log("got an error in edit", e);
				
				throw e; // rethrow to not marked as handled, 
				// in $q it's better to `return $q.reject(e)` here
			});
	}

	vm.submit = function(){
		
		
		if(vm.task == null){
			alert('You have to supply a task');
			return;
		}else{
			if(vm.task.task !=null){
				Task.save(vm.task).$promise.then(
					
					function(response){
						getTasks();
						vm.task = null;
					}
				).catch(function(e) {
					console.log("got an error in adding", e);
					
					throw e; 
				});
			}
		}
	}

	vm.delete = function(id){

		if(confirm('Aere you sure you want to remove this?')){
			var id = {id:id}
			Task.delete(id).$promise.then(
				
				function(response){
					getTasks();
				}
			).catch(function(e) {
				console.log("got an error in adding", e);
				throw e; // rethrow to not marked as handled, 
					
			});
		}

	}



	
	

	
}

