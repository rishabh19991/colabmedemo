var server = require('./server');
var dataSource = server.dataSources.db;
dataSource.automigrate('Account');
dataSource.automigrate('Moodboard');
dataSource.automigrate('MoodboardAccount');
dataSource.automigrate('Page');
dataSource.automigrate('Task');
dataSource.automigrate('AccessToken');
