'use strict';

var ColabApp = angular.module('app');

ColabApp.factory('MenuService', function() {

    var activeMenuButton = function() {
      var menu_btn = angular.element('.menu_btn'),
          content = angular.element('.content'),
          wrapper = angular.element('.wrapper'),
          nav_menu = angular.element('.nav_menu'),
          left_sb = angular.element('.left_sidebar');
      var wrapperWidth = wrapper.width();
      var wrapperHeight = wrapper.outerHeight();
      var contentWidth = content.width();
      var contentWidthSlide = wrapperWidth - 309;
      menu_btn.on('click', function() {
        content.toggleClass('slide');
        nav_menu.toggleClass('slide');
        left_sb.toggleClass('slide');
        nav_menu.height(wrapperHeight);
        content.width(contentWidthSlide);
        if (!content.hasClass('slide')) {
          content.width(contentWidth);
        }
      });
    };

    return {
      activeMenuButton: function () {
        return activeMenuButton();
      }
    };
});

ColabApp.factory('AccountService', function(Account,Moodboard) {

    var _accounts = [];

    var _getAccounts = function() {
      Account
        .find()
        .$promise
        .then(function (data) {
          angular.copy(data, _accounts);
        });
    };

    var _logout = function() {
      Account
        .logout();
    };

    return {
      accounts: _accounts,
      getAccounts: _getAccounts,
      logout: _logout
    };
});

ColabApp.factory('MoodboardService', function(Account,Moodboard) {

    var _moodboards = [];
    var _moodboard = {};
    var _moodboardAccounts = [];
    var _moodboadPageImages = [];

    var _getMoodboard = function (moodboardId) {
      Moodboard
        .findById({'id': moodboardId})
        .$promise
        .then(function (data) {
          angular.copy(data, _moodboard);
        });
    };

    var _getMoodboards = function (userId) {
      Account
        .prototype$__get__moodboards({'id': userId})
        .$promise
        .then(function (data) {
          var dataFiltered = [];
          for (var i = 0; i < data.length; i++) {
            if (Object.keys(data[i]).length) {
              
              // make clean array becouse of repeating moodboadPageImages objects
              var _moodboadPageImagesFiltered = [];
              var id = data[i].id;

              // make looping request for each moodboard
              Moodboard
                .prototype$__get__pages({'id': id})
                .$promise
                .then(function(dataResp) {
                    // take first moodboard page and first img here
                    if (dataResp[0]){

                      var pageData = $(dataResp[0].data);
                      var firstImage = pageData.find('img:first');
                      if (firstImage) {
                        dataResp[0].imageFile = firstImage.attr('src');

                        // push images with moodboardId for riltering on dashboard page 
                        _moodboadPageImagesFiltered.push({
                          'id': dataResp[0].moodboardId,
                          'src': dataResp[0].imageFile
                        });

                        angular.copy(_moodboadPageImagesFiltered, _moodboadPageImages);

                      }

                    }
              });

              dataFiltered.push(data[i]);
            }
          }
          angular.copy(dataFiltered, _moodboards);

        });
    };

    var _getMoodboardAccounts = function (moodboardId) {
      Moodboard
        .prototype$__get__accounts({'id': moodboardId})
        .$promise
        .then(function (data) {
          angular.copy(data, _moodboardAccounts);
      });
    };

    var _deleteMoodboard = function (moodboardId, userId) {
      Moodboard
        .deleteById({'id':moodboardId})
        .$promise
        .then(function (data) {
          _getMoodboards(userId);
        });
    };

    return {
      moodboard: _moodboard,
      moodboards: _moodboards,
      moodboardAccounts: _moodboardAccounts,
      getMoodboard: _getMoodboard,
      getMoodboards: _getMoodboards,
      getMoodboardAccounts: _getMoodboardAccounts,
      deleteMoodboard: _deleteMoodboard,
      moodboadPageImages: _moodboadPageImages
    };
});

ColabApp.factory('PageService', function($state,Moodboard) {

    var _pages = [];

    var _getPages =  function (moodboardId) {
      Moodboard
        .prototype$__get__pages({'id': moodboardId})
        .$promise
        .then(function(data) {
          for (var i = 0; i < data.length; i++) {
            var pageData = $(data[i].data);
            var firstImage = pageData.find('img:first');
            if (firstImage) {
              data[i].imageFile = firstImage.attr('src'); 
            }
          }
          angular.copy(data, _pages);
      });
    };

    var _createPage = function (userId, moodboardId, data) {
      Moodboard
        .prototype$__create__pages({'id': moodboardId }, data)
        .$promise
        .then(function (data) {
          $state.go('add_page',{currentUserId: userId, moodboardId: moodboardId, pageId: data.id});
      });
    };

    var _updatePage = function (userId, moodboardId, pageId, data) {
      Moodboard
        .prototype$__updateById__pages({'id': moodboardId,'fk': pageId }, data)
        .$promise
        .then(function (data) {			//alert(data);		});
    };    

    var _deletePage = function (moodboardId, pageId) {
      Moodboard
        .prototype$__destroyById__pages({'id':moodboardId,'fk':pageId})
        .$promise
        .then(function (data) {
          _getPages(moodboardId);
        });
    };

    return {
      pages: _pages,
      getPages: _getPages,
      createPage: _createPage,
      updatePage: _updatePage,
      deletePage: _deletePage
    };
});

ColabApp.factory('TaskService', function(Task) {

    var _tasks = [];

    var _getTasks = function () {
      Task
        .find()
        .$promise
        .then(function (data) {
          angular.copy(data, _tasks);
        });
    };

    var _updateTaskState = function (taskId, state) {
      Task
        .upsert({
          'id': taskId,
          'done': state
        });
    };

    var _addTask = function(name, accountId, pageId) {
      Task
        .create({
          'name': name,
          'accountId': accountId,
          'pageId': pageId
        })
        .$promise
        .then(function (data) {
          _getTasks();
        });
    };

    return {
      tasks: _tasks,
      getTasks: _getTasks,
      updateTaskState: _updateTaskState,
      addTask: _addTask
    };
});