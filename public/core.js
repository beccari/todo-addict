var todoAddict = angular.module('todoAddict', []);

function mainController($scope, $http) {
	$scope.formData = {};

	$http.get('/api/todos')
		.success(function(data) {
			$scope.todos = data;
		})
		.error(function(data) {
			console.error('Failed to get todos', data);
		});


	$scope.createTodo = function() {
		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // cleanup form

				$scope.todos = data;
			})
			.error(function(data) {
				console.error('Failed to create a new todo', data);
			});
	}

	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
			.success(function(data) {
				$scope.todos = data;
			})
			.error(function(data) {
				console.error('Failed to delete a todo', data);
			})
	}
}