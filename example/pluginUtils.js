module.exports = {

  initialize: function (api, next) {

    api.utils.jwtSession.authClient = function(data, callback){
		callback(null, { id : 2, username : 'chucktesta' })
	}
    
    next();

  }
};