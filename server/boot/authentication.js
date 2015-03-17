module.exports = function enableAuthentication(server) {
  // enable authentication
  var moodboard = 'initialize';
  var restApiRoot = server.get('restApiRoot');
  //var explorerApp = explorer(server, { basePath: restApiRoot });
  var router = server.loopback.Router(); 
  server.use(router);  
  router.get('/api/Moodboard/:id/pages/:fk', function(req, res) {
	moodboard = 'setrouting';
	console.log(moodboard);
	var baseUrl = server.get('url').replace(/\/$/, '');
	console.log(req.params.id + ' - id' + req.params.fk + ' - fk');
	var redirecttoUrl = '/index.html#/Moodboard/'+req.params.id + '/pages/'+req.params.fk;
	res.writeHead(302, {'Location': redirecttoUrl});
	res.end();
  });
  if(moodboard == 'initialize'){
	 server.enableAuth();
  }
};
