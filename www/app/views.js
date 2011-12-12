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
      $('#checkIn_Input').datepicker({minDate: 0});
      $('#checkIn_Input').datepicker('setDate', new Date());
      $('#checkIn_Input').datepicker('option', 'dateFormat', 'D, d M, yy');

      
      $('#checkOut_Input').datepicker({minDate: +1});
      var defaultTomorrow = new Date();
      defaultTomorrow = defaultTomorrow.setDate(defaultTomorrow.getDate()+1);
      $('#checkOut_Input').datepicker('setDate', defaultTomorrow);
      $('#checkOut_Input').datepicker('option', 'dateFormat', 'D, d M, yy');
      return this;
    },
    
    search: function(){
      
    }
    
  });

  GetThereHotel.Views.ListView = Backbone.View.extend({
    el: $('#GetThereHotel'),
    template: Handlebars.compile($('#list-template').html()),
    
    initialize:function(){

    },
    
    events: {
    },
    
    render: function(){
      this.el.html( this.template() );
      return this;
    }
  });
  
  GetThereHotel.Views.MapView = Backbone.View.extend({
    el: $('#GetThereHotel'),
    template: Handlebars.compile($('#map-template').html()),
    
    initialize:function(){

    },
    
    events: {
    },
    
    render: function(){
      this.el.html( this.template() );
      return this;
    }
  });
  
  GetThereHotel.Views.RateView = Backbone.View.extend({
    el: $('#GetThereHotel'),
    template: Handlebars.compile($('#rate-template').html()),
    
    initialize:function(){

    },
    
    events: {
    },
    
    render: function(){
      this.el.html( this.template() );
      return this;
    }
  });
  
   GetThereHotel.Views.CheckoutView = Backbone.View.extend({
    el: $('#GetThereHotel'),
    template: Handlebars.compile($('#checkout-template').html()),
    
    initialize:function(){

    },
    
    events: {
    },
    
    render: function(){
      this.el.html( this.template() );
      return this;
    }
  });
  
})();