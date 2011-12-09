(function(){
  GetThereHotel.namespace('GetThereHotel.Models');
  
  var buildURL = function(options, path) {
		var URL = (options && options.URL) || GetThereHotel.Config.appURL;
		var full = URL + path;
		return full;
	};
  
  GetThereHotel.Models.BaseModel = Backbone.Model.extend({
		fetch: function(options) {
			options = options || {};
			Backbone.Model.prototype.fetch.call(this, options);
		},
		refreshData: function() {
			this.fetch();
		},
		validate: function(attrs) {
			if (attrs.errors) {
				return attrs.errors[0];
			}
			return false;
		}
	});
  
  GetThereHotel.Models.Session = Backbone.Model.extend({
 		initialize: function(attributes, options) {
			if (! (options && options.appURL) && !GetThereHotel.Config.appURL) {
				throw new Error('appURL must be set');
			}
			this.url = function() {
				return buildURL(options, 'authenticate');
			}
		},
 		fetch: function(options) {
			options = options || {};
			Backbone.Model.prototype.fetch.call(this, options);
		},
		parse: function(response) {
			if (response.errors) { 
				this.trigger("error", response.errors[0]);
				return response; 
			}
		},
    create: function(options){
      if(!options.username || !options.password){
        throw new Error('Need a username or password');
      }
      var data = '{"StaffManagerAuthenticateRQ":{"UserName":"'+options.username+'","Password":"'+options.password+'"}}';
      var dataString = JSON.stringify(data);
      
      this.fetch({
        type: 'POST',
        data: data,
        contentType: "application/json",
        success: options.success,
        error: options.error,
        dataType: 'json'
      });    
    }
  });
  
  GetThereHotel.Models.Tasks = Backbone.Model.extend();
  GetThereHotel.Models.Alerts = Backbone.Model.extend();
})();