module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', function(req, res) {
    res.writeHead(302, {'Location': 'index.html'});
    res.end();
  });
  server.use(router);
};
