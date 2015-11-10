exports.jwtSessionAuth = {
  name: 'jwtSessionAuth',
  description: 'I am an authentication action for jwt token sessions',
  middleware: [],

  inputs: {},

  run: function (api, data, next) {

    api.utils.jwtSession.authPath(data, function(err){
      next(err);
    })

  }
};