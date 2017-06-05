angular.module('cnv-web').component('companyList', {
	templateUrl : 'views/company/list.html',
	controller : function CompanyListController($http, $scope, $location) {
		
		var SERVER = "http://localhost:9090";
		this.companyDTO = {};
		this.recoveredCompany;
		
		this.redirectPersist = function() {
			window.location = "/angular-tags-spring/company/create/";
		};
		
		this.updateCompany = function() {
			var that = this;
	    	$http.put(SERVER +'/company/', this.recoveredCompany).then(function(data){
	    		that.onFormLoad();
	    		$("#modalEditEmpresa").modal("hide");
	    	}).catch(function(data) {
	    		handleExceptionsInModal(data);
	        });
	  	};

		 this.configurarModalEdicao = function(idModal, idEmpresa) {  		
		  		var that = this;
		  		that.recoveredCompany;
				 $http.get(SERVER + '/company/' + idEmpresa).then(function(data) {
				      that.recoveredCompany = data;
				      $("#modalEditEmpresa").modal("show");
				  });
		 };

	  	this.removeCompany = function(id) {
			var that = this;
			$http.delete(SERVER + '/company/' + id).then(function(data){
	    		that.onFormLoad();
	    	});
	  	};	  	

		this.findByFilter = function() {
			var that = this;
			that.listCompany = {params:{"fantasyName": "Empresa 2", "socialReason": "Razao 2", "cnpj": "Cnpj 2", "stateInscription": "Inscricao 2", "creationTime": "15/05/1994"}};
		};

		this.onFormLoad = function() {
			 var that = this;			 
			 that.listCompany = [];
			 $http.get('http://localhost:9090/company/').then(function(data) {
			      that.listCompany = data.data;
			 }).catch(function(data) {
		    	alert('Erro!');
		     });
		};
		this.onFormLoad();
	}
});