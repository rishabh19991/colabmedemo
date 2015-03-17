'use strict';

angular
  .module('app', [
    'lbServices',
    'ui.router',
    'ui.select',
    'ngSanitize',
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
      })
      .state('dashboard', {
        url: '/dashboard/:currentUserId/moodboards',
        templateUrl: 'js/app/templates/dashboard.html',
        controller: 'DashboardCtrl'
      })
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
      })
      .state('main', {
        url: '/main',
        templateUrl: 'js/app/templates/main.html'
      })
    $urlRouterProvider.otherwise('/main');
  });