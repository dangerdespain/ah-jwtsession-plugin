exports.default = {
  jwtSession : function(api){
    return {
      
      sessionLength : '2h',
      secret : 'replaceThisWithYourOwnSecret',
      
      validateAsEmail : true,
      params : { id : 'email', password : 'password' },
      tokenName : 'authorization',
      
      errorMessages : {
        missingUserError : 'Invalid User/Password Combination',
        incorrectPasswordError : 'Invalid User/Password Combination',
      },
      
      // authUser : function(data, next){
      //   // next(err, tokenData) decorate the jwt token in the callback response
      //   data.response = 'success'
      //   next()
      // },

      // extractToken : function(data, next){
        
      //   var token = null;
        
      //   if (!_.isUndefined(data.params.authorization)) {
      //     token = data.params.authorization;
      //   }else if (!_.isUndefined(((data.connection.rawConnection.req || {}).headers || {}).authorization)) {
      //     token = data.connection.rawConnection.req.headers.authorization;
      //   }else if (!_.isUndefined(((data.connection.rawConnection || {}).params || {}).authorization)) {
      //     token = data.connection.rawConnection.params.authorization;
      //   }

      //   next(null, token)
      // },

    }
  }
}

exports.test = {}

exports.production = {}