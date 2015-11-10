var jwt = require('jsonwebtoken');

module.exports = {

	loadPriority:  500,
  startPriority: 1000,
  stopPriority:  1000,

  initialize: function(api, next){
  	
  	api.actions.actions.jwtSessionAuth['1'].inputs[api.config.jwtSession.params.password] = { required : true },
  	api.actions.actions.jwtSessionAuth['1'].inputs[api.config.jwtSession.params.id] = { required : true },

  	api.actions.addMiddleware({
      name: 'setJwtSession',
      global: true,
      priority: 100,
      preProcessor: function(data, next){
        
        api.utils.jwtSession.findToken(data, function(err, token){
        	if(err) next(err);
        	if(token){
        		api.utils.jwtSession.verify(token, function(err, tokenData){
        			if(err) next(err);
        			api.utils.jwtSession.applyTokenData(tokenData, data, function(err){
        				next(err);
        			});
        		})
        	}else{
        		next();
        	}
        })
 
      }
    })

  	api.utils.jwtSession = {

  		authClient : function(data, next){
  			next('authentication function has not been set up');
  		},

  		decorateToken : function(clientData, data, next){
  			var tokenData = clientData;
  			next(null, tokenData);
  		},

  		decorateAuthResponse : function(clientData, token, data, next){
  			data.response.result = 'success';
  			data.response.authorization_token = token;
  			next();
  		},

  		findToken : function(data, next){
  			var token = null;
        if (!_.isUndefined(data.params.authorization)) {
          token = data.params.authorization;
        }else if (!_.isUndefined(((data.connection.rawConnection.req || {}).headers || {}).authorization)) {
          token = data.connection.rawConnection.req.headers.authorization;
        }
        next(null, token)
  		},

  		applyTokenData : function(tokenData, data, next){
  			data.connection.jwtSession = tokenData;
  			next();
  		},

  		authPath : function(data, next){
  			api.utils.jwtSession.authClient(data, function(err, clientData){
  				if(err) next(err);
		      api.utils.jwtSession.decorateToken(clientData, data, function(err, tokenData){
		      	if(err) next(err);
		      	api.utils.jwtSession.applyTokenData(tokenData, data, function(err){
		      		if(err) next(err);
		      		var token = api.utils.jwtSession.sign(tokenData)
			        api.utils.jwtSession.decorateAuthResponse(clientData, token, data, function(err){
			          next(err);
			        })
		      	})
		      })
		    })
  		},
  		
  		sign : function(tokenData){
  			return jwt.sign(tokenData, api.config.jwtSession.secret, { 
  				expiresIn : api.config.jwtSession.sessionLength 
  			});
  		},

  		verify : function(token, callback){
  			if(token){
	            jwt.verify(token, api.config.jwtSession.secret, function (err, tokenData) {
	              if(err){
	                callback(err)
	              }else{
	                callback(null, tokenData)
	              }
	            });
	        }else{
	            callback('no token found')
	        }
  		},

  		decode : function(token, callback){
  			if(token){
	            jwt.decode(token, api.config.jwtSession.secret, function (err, decoded) {
	              if(err){
	                callback(err)
	              }else{
	                callback(null, decoded)
	              }
	            });
	        }else{
	            callback('no token found')
	        }
  		},
		    
  	}
    
    next();
  }
};