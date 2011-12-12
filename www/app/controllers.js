(function(){
  GetThereHotel.namespace('GetThereHotel.Controllers');
  
  GetThereHotel.Controllers.ApplicationController = Backbone.Router.extend({
    routes:{
      "":              "search",
      "search":        "search",
      "list":          "list",
      "map":           "map",
      "rate":          "rate",
      "checkout":      "checkout"
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
    },
    
    list: function(){
      console.log('controller: going to list');
      var self = this;

      if (!self.listView) {
        self.listView = new GetThereHotel.Views.ListView();
      } 

      self.listView.render();   
    },
    
    map: function(){
      console.log('controller: going to map');
      var self = this;

      if (!self.mapView) {
        self.mapView = new GetThereHotel.Views.MapView();
      } 

      self.mapView.render();         
    },
    
    rate: function(){
      console.log('controller: going to rate');
      var self = this;

      if (!self.rateView) {
        self.rateView = new GetThereHotel.Views.RateView();
      } 

      self.rateView.render();     
    },
    
    checkout: function(){
      console.log('controller: going to checkout');
      var self = this;

      if (!self.checkoutView) {
        self.checkoutView = new GetThereHotel.Views.CheckoutView();
      } 

      self.checkoutView.render();       
    }
    
  });
})();