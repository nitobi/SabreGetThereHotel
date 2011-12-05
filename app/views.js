(function(){
  GetThereHotel.namespace('GetThereHotel.Views');
  
  GetThereHotel.Views.SearchView = Backbone.View.extend({
    el: $('#GetThereHotel'),
    template: Handlebars.compile($('#search-template').html()),
    
    initialize:function(){

    },
    
    events: {
      "click .submit" : "search"
    },
    
    render: function(){
      this.el.html( this.template() );
      $('#titleHeader').html('Search For a Hotel');
      return this;
    },
    
    search: function(){
      
    }
    
  });

})();