(function(){
  GetThereHotel.namespace('GetThereHotel.User');
  GetThereHotel.Config ={
    appURL : 'http://mobileengine2.sabre.com:8080/MTX-WEB-DEV/',
  };
  
  GetThereHotel.initialize = function(){
    console.log('Set up controller');
    this.appController = new GetThereHotel.Controllers.ApplicationController();
    Backbone.history.start();
  }

})();

// Start the application on document ready
$(document).ready(function() {
	GetThereHotel.initialize();
});