(function(){
  StaffManager.namespace('StaffManager.Models');
  
  var buildURL = function(options, path) {
		var URL = (options && options.URL) || StaffManager.Config.appURL;
		var full = URL + path;
		return full;
	};
  
  StaffManager.Models.BaseModel = Backbone.Model.extend({
		fetch: function(options) {
			if (!StaffManager.User.empId) {
				return StaffManager.logout();
			}
			options = options || {};
			Backbone.Model.prototype.fetch.call(this, options);
		},
		refreshData: function() {
			this.fetch();
		},
		startAutoRefresh: function() {
			var self = this;
			self.updateIntervalId = self.updateIntervalId || window.setInterval(function() {
				self.refreshData();
			},
			StaffManager.Config.refreshInterval);
			return self.updateIntervalId;
		},
		stopAutoRefresh: function() {
			window.clearInterval(this.updateIntervalId);
			this.updateIntervalId = undefined;
		},
		validate: function(attrs) {
			if (attrs.errors) {
				return attrs.errors[0];
			}
			return false;
		}
	});
  
  StaffManager.Models.Session = Backbone.Model.extend({
 		initialize: function(attributes, options) {
			if (! (options && options.appURL) && !StaffManager.Config.appURL) {
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
  
  /*
  StaffManager.Models.Tasks = StaffManager.Models.BaseModel.extend({
 		initialize: function(attributes, options) {
			if (! (options && options.appURL) && !StaffManager.Config.appURL) {
				throw new Error('appURL must be set');
			}
			this.url = function() {
				return buildURL(options, 'tasks');
			}
		},
		parse: function(response) {
			if (response.errors) { 
				this.trigger("error", response.errors[0]);
				return response; 
			}
			// send response into validate
			var model = {
        tasks: response.StaffManagerInformation.TasksCollection
			};
			return model;
		} 
  });
  */
  
  StaffManager.Models.Tasks = Backbone.Model.extend();
  StaffManager.Models.Alerts = Backbone.Model.extend();
})();