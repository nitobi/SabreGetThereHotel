(function(){
  // set up namespacing -- should go before each js file with model declarations
  GetThereHotel.namespace('GetThereHotel.Collections');

  var buildURL = function(options, path) {
		var URL = (options && options.URL) || GetThereHotel.Config.appURL;
		var full = URL + path;
		return full;
	};
})();
