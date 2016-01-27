'use strict';

/* Controllers */

function IndexCtrl($scope, $http) {
  $http.get('/api/posts').
    success(function(data, status, headers, config) {
      $scope.posts = data.posts;
    });
}

function AddPostCtrl($scope, $http, $location) {
  $scope.form = {};
  $scope.submitPost = function () {
    $http.post('/api/post', $scope.form).
      success(function(data) {
        $location.path('/');
      });
  };
}

function ReadPostCtrl($scope, $http, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });
}

function EditPostCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.form = data.post;
    });

  $scope.editPost = function () {
    $http.put('/api/post/' + $routeParams.id, $scope.form).
      success(function(data) {
        $location.url('/readPost/' + $routeParams.id);
      });
  };
}

function DeletePostCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });

  $scope.deletePost = function () {
    $http.delete('/api/post/' + $routeParams.id).
      success(function(data) {
        $location.url('/');
      });
  };

  $scope.home = function () {
    $location.url('/');
  };
}

function signinupCtrl ($scope) {
  
}

//switchInOrUp.$inject = ['$scope', '$rootScope', 'AUTH_EVENTS', 'userServe'];
function switchInOrUp ($scope, $rootScope, AUTH_EVENTS, userServe) {
  $scope.active = 'signin';

  $scope.user = {
    username : '',
    password : ''
  };
  $scope.login = function(user) {
    userServe
    .checkUser(user)
    .catch(function(){
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    })
    .then(function() {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
    });
  };

}

function headerCtrl ($scope, AUTH_EVENTS) {
  $scope.$on(AUTH_EVENTS.loginSuccess, function(){
    $scope.test = 'lalalala';
  });
}
