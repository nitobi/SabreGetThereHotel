(function(){
  GetThereHotel.namespace('GetThereHotel.Controllers');
  
  GetThereHotel.Controllers.ApplicationController = Backbone.Router.extend({
    routes:{
      "":              "search",
      "search":         "search",
    },
    
    parseErrorResponse: function(response) {
      var message = "Connection Error";
      return message;
    },
    
    search: function(){
      console.log('controller: going to search');
      var self = this;

      if (!self.searchView) {
        self.searchView = new GetThereHotel.Views.SearchView();
      } 

      self.searchView.render();
    }
  });
})();