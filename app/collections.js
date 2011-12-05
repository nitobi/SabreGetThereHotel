(function(){
  // set up namespacing -- should go before each js file with model declarations
  StaffManager.namespace('StaffManager.Collections');

  var buildURL = function(options, path) {
		var URL = (options && options.URL) || StaffManager.Config.appURL;
		var full = URL + path;
		return full;
	};

  StaffManager.Collections.TasksCollection = Backbone.Collection.extend({
 		initialize: function(attributes, options) {
			if (! (options && options.appURL) && !StaffManager.Config.appURL) {
				throw new Error('appURL must be set');
			}
			this.url = function() {
				return buildURL(options, 'tasks');
			}
		},
    fetch: function(options) {
			if (!StaffManager.User.empId) {
				return StaffManager.logout();
			}
      options = options || {};
      options.type = options.type || 'POST';
      options.contentType = options.contentType || 'application/json';
      options.data = options.data || '{ "StaffManagerTasksRQ":{"EmpNumber":"'+StaffManager.User.empId +'"}}';
      Backbone.Collection.prototype.fetch.call(this, options);
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
    model: StaffManager.Models.Tasks,
    parse: function(response) {
      // parse response for errors, since it's technically a "success" when we get any kind of data back, even errors
      if (response.errors) { 
        this.trigger("error", response.errors[0]);
        return response; 
      }
      // iterate over the Reports array
      //var testResponse = { "EmployeeInformation": [], "Tasks": [ { "TaskInformation": { "TaskId": '1', "TaskType": 'GT_ARR', "TaskPosition":"location 126", "StartTime": '2011-08-29T09:30:00', "EndTime": '2011-08-29T12:41:34', "TaskStatus": [], "TaskLocation": [], "FlightNumber": 'AC463', "NumberofCrew": [], "StartCompleteIndicator": [], "Comments": [] }, "FlightInformation": { "InboundFlight": { "FlightNumber": [], "UplineStation": [], "EstimatedArrivalTime": [], "FlightStatus": [], "PaxInformation": { "PaxFClass": [], "PaxCClass": [], "PaxYClass": [] }, "BaggageInformation": [[]], "GateInformation": { "Gate": [], "Stand": [] }, "LoadFactor": [], "Remarks": { "ATW": [], "BTW": [], "TOW": [], "OPS": [], "Cargo": [] }, "MiscInformation": { "TotalWheelChairs": [], "TotalCarryOnOffWheelChairs": [] } }, "OutboundFlight": { "FlightNumber": [], "UplineStation": [], "EstimatedDepartureTime": [], "FlightStatus": [], "PaxInformation": { "PaxFClass": [], "PaxCClass": [], "PaxYClass": [] }, "BaggageInformation": [[]], "GateInformation": { "Gate": [], "Stand": [] }, "LoadFactor": [], "Remarks": { "ATW": [], "BTW": [], "TOW": [], "OPS": [], "Cargo": [] }, "MiscInformation": { "TotalWheelChairs": [], "TotalCarryOnOffWheelChairs": [] } }, "EquipmentInformation": { "AircraftType": [], "TailNumber": [], "AircraftGroundTime": [] } } },{ "TaskInformation": { "TaskId": '2', "TaskType": 'Turn_1',"TaskPosition":"location 30", "StartTime": '2011-07-29T09:30:00', "EndTime": '2011-07-29T12:41:34', "TaskStatus": [], "TaskLocation": [], "FlightNumber": 'AC333', "NumberofCrew": [], "StartCompleteIndicator": [], "Comments": [] }, "FlightInformation": { "InboundFlight": { "FlightNumber": [], "UplineStation": [], "EstimatedArrivalTime": [], "FlightStatus": [], "PaxInformation": { "PaxFClass": [], "PaxCClass": [], "PaxYClass": [] }, "BaggageInformation": [[]], "GateInformation": { "Gate": [], "Stand": [] }, "LoadFactor": [], "Remarks": { "ATW": [], "BTW": [], "TOW": [], "OPS": [], "Cargo": [] }, "MiscInformation": { "TotalWheelChairs": [], "TotalCarryOnOffWheelChairs": [] } }, "OutboundFlight": { "FlightNumber": [], "UplineStation": [], "EstimatedDepartureTime": [], "FlightStatus": [], "PaxInformation": { "PaxFClass": [], "PaxCClass": [], "PaxYClass": [] }, "BaggageInformation": [[]], "GateInformation": { "Gate": [], "Stand": [] }, "LoadFactor": [], "Remarks": { "ATW": [], "BTW": [], "TOW": [], "OPS": [], "Cargo": [] }, "MiscInformation": { "TotalWheelChairs": [], "TotalCarryOnOffWheelChairs": [] } }, "EquipmentInformation": { "AircraftType": [], "TailNumber": [], "AircraftGroundTime": [] } } }], "EmpInformation": { "EmpNumber": [], "EmpName": [], "EmpPhoneNumber": [] } }; 
  
      var collection = _.map(response.Tasks, function(item) {
        /*
        switch(item.Task.TaskType){
          case 'Turn_1': 
            item.Task.TaskType = 'CABIN';
          break;
          case 'ON/L': 
            item.Task.TaskType = 'DEPARTURE';
          break;
          case 'OFF/L': 
            item.Task.TaskType = 'ARRIVAL';
          break;
          case 'TOW': 
            item.Task.TaskType = 'TOW';
          break;
          case 'GT_ARR': 
            item.Task.TaskType = 'ARRIVAL';
          break;
          case 'CNX': 
            item.Task.TaskType = 'CNX';
          break;
          case 'ASSIST': 
            item.Task.TaskType = 'DEPARTURE';
          break;
        }
        */
        var tempStart = item.TaskInformation.StartTime.split('T')[1];
        var tempEnd = item.TaskInformation.EndTime.split('T')[1];
        item.TaskInformation.StartTime = tempStart.substr(0,tempStart.lastIndexOf(':'));
        item.TaskInformation.EndTime = tempEnd.substr(0,tempEnd.lastIndexOf(':'));
        
        if(item.FlightInformation.InboundFlight){ 
          if(item.FlightInformation.InboundFlight.EstimatedArrivalTime.length>0){
            var tempETA = item.FlightInformation.InboundFlight.EstimatedArrivalTime.split('T')[1];
            item.FlightInformation.InboundFlight.EstimatedArrivalTime = tempETA.substr(0,tempETA.lastIndexOf(':'));
          }
        }
        
        if(item.FlightInformation.OutboundFlight){
          if(item.FlightInformation.OutboundFlight.EstimatedDepartureTime.length>0){
            var tempETD = item.FlightInformation.OutboundFlight.EstimatedDepartureTime.split('T')[1];
            item.FlightInformation.OutboundFlight.EstimatedDepartureTime = tempETD.substr(0,tempETD.lastIndexOf(':'));
          }
        }
        
        item.buttonState = 'Start';
        return item;
      },this);

      return collection;
    }
    
  });
  
  StaffManager.Collections.AlertsCollection = Backbone.Collection.extend({
 		initialize: function(attributes, options) {
			if (! (options && options.appURL) && !StaffManager.Config.appURL) {
				throw new Error('appURL must be set');
			}
			this.url = function() {
				return buildURL(options, 'alerts?empNumber='+StaffManager.User.empId);
			}
		},
    fetch: function(options) {
			if (!StaffManager.User.empId) {
				return StaffManager.logout();
			}
      options = options || {};
      options.add = options.add || true;
      
      Backbone.Collection.prototype.fetch.call(this, options);
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
    model: StaffManager.Models.Alerts,
    parse: function(response) {
      // parse response for errors, since it's technically a "success" when we get any kind of data back, even errors
      if (response.errors) { 
        this.trigger("error", response.errors[0]);
        return response; 
      }
      
      // get rid of last empty element
      response.TaskAlertInformation.Alert.pop();
      var collection = _.map(response.TaskAlertInformation.Alert, function(item) {
        item.unread = true;
        /*
        item.alertId = item.AlertID;
        item.alertHeader = item.AlertSeverity;
        item.alertDescription = item.AlertString;
        */
        return item;
      },this);
      return collection;
  
    }
  });
})();
