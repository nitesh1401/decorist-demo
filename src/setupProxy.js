const proxy = require('http-proxy-middleware');
    module.exports = function(app) {
    app.use(proxy('/api', 
          { target: 'http://users.dev.decorist.com' ,
            changeOrigin: true,
            logLevel: "debug",
          }
      ));
    }