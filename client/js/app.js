'use strict';

angular
  .module('app', [
    'lbServices',
    'ui.router',
    'ui.select',
    'ngSanitize',		'ui.tinymce',		'froala',		'ui.bootstrap',		'ui.grid',		'ngCookies',		'pubnub.angular.service'
  ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('sign', {
        url: '/register',
        templateUrl: 'js/app/templates/sign.html',
        controller: 'SignCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'js/app/templates/login.html',
        controller: 'LoginCtrl'
      })			  .state('newsign', {        url: '/newregister',        templateUrl: 'js/app/templates/sign.html',        controller: 'newMoodboardCtrl'      })      .state('newlogin', {        url: '/newlogin',        templateUrl: 'js/app/templates/login.html',        controller: 'newMoodboardCtrl'      })	  
      .state('dashboard', {
        url: '/dashboard/:currentUserId/moodboards',
        templateUrl: 'js/app/templates/dashboard.html',
        controller: 'DashboardCtrl'
      })	  	  .state('profile', {        url: '/dashboard/:currentUserId/profile',        templateUrl: 'js/app/templates/profileupdate.html',        controller: 'updateProfileCtrl'      })
      .state('add_moodboard', {
        url: '/dashboard/:currentUserId/add_moodboard',
        templateUrl: 'js/app/templates/add_moodboard.html',
        controller: 'DashboardCtrl'
      })
      .state('moodboard', {
        url: '/dashboard/:currentUserId/moodboard/:moodboardId/pages',
        templateUrl: 'js/app/templates/moodboard.html',
        controller: 'MoodboardCtrl'
      })
      .state('page', {
        url: '/dashboard/:currentUserId/moodboard/:moodboardId/pages/:pageId',
        templateUrl: 'js/app/templates/page.html',
        controller: 'PageCtrl'
      })
      .state('add_page', {
        url: '/dashboard/:currentUserId/moodboard/:moodboardId/pages/:pageId/add',
        templateUrl: 'js/app/templates/add_page.html',
        controller: 'PageCtrl'
      })
      .state('tasks', {
        url: '/dashboard/:currentUserId/tasks',
        templateUrl: 'js/app/templates/tasks.html',
        controller: 'TasksCtrl'
      })	  	  .state('new_moodboard', {        url: '/Moodboard/:moodboardId/pages/:pageId',        templateUrl: 'js/app/templates/newmain.html',				controller: 'sharedMoodboardCtrl'      })
      .state('main', {
        url: '/main',
        templateUrl: 'js/app/templates/main.html'
      })	  	  .state('join', {        url: '/join',        templateUrl: 'js/app/templates/join.html',				controller: 'JoinCtrl'      })	  	  .state('chat', {        url: '/chat',        templateUrl: 'js/app/templates/chat.html',				controller: 'ChatCtrl'      });
    $urlRouterProvider.otherwise('/main');		//$locationProvider.html5Mode(true);
  });