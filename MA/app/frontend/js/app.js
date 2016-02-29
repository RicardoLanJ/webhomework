'use strict';

var app = angular.module('MA', [
  'ngRoute',
  'ngCookies',
  //'ngResource',
  'ui.bootstrap'
]);

// ,
//   
//   
//   'ngTouch',
//   'ngSanitize',
//   


app.config(['$routeProvider', '$locationProvider', '$httpProvider',
  
  function ($routeProvider, $locationProvider, $httpProvider) {


    var isLoggedIn = function ($q, $timeout, $http, $rootScope, $location) {
        var deferred = $q.defer();
        $http.get('/signedin').success(function (user) {
            if (user !== '0') {
                $rootScope.isSignedIn = true;
                $rootScope.currentUser = user;
                $timeout(deferred.resolve, 0);
            } else {
                $rootScope.isSignedIn = false;
                $rootScope.currentUser = {};
                $timeout(function() { deferred.reject();}, 0);
                $location.url('/');
            }
        });
        return deferred.promise;
    };

    var isTaORTeacher = function ($rootScope, $timeout, $location) {
      $timeout(function() { 
        if ($rootScope.currentUser.role === 'stu') return $location.url('/');
      }, 0);
    };


  $httpProvider.interceptors.push('InterceptorService');

  
  $routeProvider
    .when('/', {
      templateUrl: 'views/Login', //test my jade
      controller: 'signinCtrl',
      controllerAs: 'signinbox'
    })
    .when('/404', {
      templateUrl: 'views/404',
      controller: '404Ctrl'
    })
    .when('/admin', {
      templateUrl: 'views/admin',
      controller: 'AdminCtrl',
      resolve: {loggedin: isLoggedIn}
    })
    .when('/student', {
      templateUrl: 'views/MA-main',
      controller: 'studentCtrl',
      controllerAs: 'student',
      resolve: {loggedin: isLoggedIn}
    })
    .when('/TeacherOrTa', {
      templateUrl: 'views/TeacherOrTa',
      resolve: {
        loggedin: isLoggedIn,
        isTaORTeacher: isTaORTeacher,
      }
      // controller: 'studentCtrl',
      // controllerAs: 'student',
    })
    .otherwise({
      redirectTo: '/404'
    });
  

  $locationProvider.html5Mode(true);

}]);