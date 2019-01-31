// home controller
app.controller('HomeController', function ($rootScope, $scope, $location) {

	$scope.items = [
       {path: '/philosophie', title: 'Philosophie'},      
	   {path: '/tantra', title: 'Tantra'},
	   {path: '/paare', title: 'Frauen/Paare'},
	   {path: '/team', title: 'Team'},
	   {path: '/ambiente', title: 'Ambiente'},
	   {path: '/regeln', title: 'Regeln' },
       {path: '/jobs', title: 'Jobs' }
    ];
	  
    $rootScope.isActive = function(item) {		
      if (item.path == $location.path()) {		
        return true;
      }
      return false;
    };

    $scope.header = "Welcome to my AngularJS demo";
});

// about controller
//https://docs.angularjs.org/api/ng/directive/ngOptions
app.controller('TextController', function ($scope, $location, textService) {

    $scope.header = $location.path();
	
	$scope.texts = [
	  {id: 1, text:'black', disabled: false},
	  {id: 2, text:'white', disabled: true}
	];
	
	$scope.addItem = function()	{
		$scope.texts.push({id: $scope.texts.length });
	};
	
	$scope.deleteItem = function(index)	{
		$scope.texts.splice(index, 1);
	};
	
	$scope.save = function() {				
		var requestSaveText = {
			path: $location.path(),
			textDataList: $scope.texts
		};
		textService.saveTextItems(requestSaveText).then(function (result) {
            alert(result);
        }, function (error) {
            alert("error: " + error);
        });
	};

	function init() { 
		// alert($location.path());
		textService.getTextItems($location.path()).then(function (result) {
            // alert(JSON.stringify(result));
			$scope.texts = result;
			// angular.forEach(result, function (item) {            
			// alert(item.Id);
			// });       					
        }, function (error) {
            //alert("error: " + error);
        });	  
    };

    init();
	
});

// post controller
app.controller('TeamController', function ($scope, $location, textService) {

    $scope.header = $location.path();    
    $scope.teams =  [];
	
	$scope.dummyImage = "http://dummyimage.com/100x100&text=image";
    $scope.fullPathImage = function (image) {  
		// alert(image);
        if (!image || 0 === image.length) {            
            return $scope.dummyImage;
        }    		
        return serviceBase + "FileUploads/medium_" + image;
    };
	
	$scope.addItem = function()	{
		$scope.texts.push({id: $scope.texts.length });
	};
	
	$scope.deleteItem = function(index)	{
		$scope.texts.splice(index, 1);
	};
	
	$scope.save = function() {				
		var requestSaveText = {
			path: $location.path(),
			textDataList: $scope.texts
		};
		textService.saveTextItems(requestSaveText).then(function (result) {
            //alert(result);
        }, function (error) {
            alert("error: " + error);
        });
	};
	
	$scope.deleteGirl = function(index, id)	{		
		var	requestDeleteGirl = {
			Id: id
		};
		textService.deleteGirl(requestDeleteGirl).then(function (result) {			
			$scope.teams.splice(index, 1);
        }, function (error) {
            alert("error: " + error);
        });	
	};

	function init() { 		
		textService.getTextItems($location.path()).then(function (result) {            
			$scope.texts = result;						
        }, function (error) {
            alert("error: " + error);
        });	
		
		textService.getAllGirlsItems().then(function (result) {			
			// alert(JSON.stringify(result));
			$scope.teams = result;			
        }, function (error) {
            alert("error: " + error);
        });				
    };

    init();

});

// home controller
app.controller('GirlController', function ($rootScope, $scope, $location, $routeParams, ngAuthSettings, filesUploadService, textService) {
  
	var serviceBase = ngAuthSettings.apiServiceBaseUri;
	
    $scope.id = $routeParams.id;    
	
	$scope.name = "";
	$scope.girlTexts = [
	  {id: 1, text:'black', disabled: false},
	  {id: 2, text:'white', disabled: true}
	];
	
	$scope.photos = [];	
	
	$scope.dummyImage = "http://dummyimage.com/100x100&text=image";
    $scope.fullPathImage = function (image) {  
		// alert(image);
        if (!image || 0 === image.length) {            
            return $scope.dummyImage;
        }    		
        return serviceBase + "FileUploads/medium_" + image;
    };
	
	$scope.addItem = function()	{
		$scope.girlTexts.push({id: $scope.girlTexts.length });
	};
	
	$scope.deleteItem = function(index)	{
		$scope.girlTexts.splice(index, 1);
	};
	
	$scope.deletePhoto = function(index, image) {
		var	requestDeletePhoto = {
			Id: $routeParams.id,
			Image: image,
		};
		filesUploadService.deletePhoto(requestDeletePhoto).then(function (result) {			
			$scope.photos.splice(index, 1);
        }, function (error) {
            alert("error: " + error);
        });			
	};

	$scope.updatePhotos = function () {
	    var requestUpdatePhotos = {
	        Id: $routeParams.id,
	        PhotoDataList: $scope.photos,
	    };
	    filesUploadService.updatePhotos(requestUpdatePhotos).then(function (result) {

	    }, function (error) {
	        alert("error: " + error);
	    });
	};	
	
	$scope.save = function() {				
		var requestSaveGirl = {
			Id: $routeParams.id,
			Girl: $scope.name,
			TextDataList: $scope.girlTexts
		};
		textService.saveGirlTextItems(requestSaveGirl).then(function (result) {
		    //alert(JSON.stringify(result));
			if (result.success) {    
				$location.path("/girl/" + result.id);				
			}
        }, function (error) {
            alert("error: " + error);
        });
	};
	
	$scope.uploadPhoto = function () {        
        filesUploadService.uploadPhoto().then(function onCapturePhoto(result) {			
            var photoSetting = {
                Image: result,				
			    Id: $routeParams.id
            };
            filesUploadService.addPhoto(photoSetting).then(function (result) {
				//alert(JSON.stringify(result));
				$scope.photos = result.photos;
                if (result.success) {          
					$location.path("/girl/" + result.id);				                    
                }                
            }, function (error) {
                alert("error: " + error);
            });
        }).catch(function (error) {
            alert("error: " + error);
        });
    };
	
	function init() { 	
		if ($routeParams.id !== undefined) {				
			textService.getGirlTextItems($routeParams.id).then(function (result) {				
				$scope.name = result.Girl;
				$scope.girlTexts = result.TextDataList;
			}, function (error) {
				//alert("error: " + error);
			});
		
			filesUploadService.getPhotos($routeParams.id).then(function (result) {			
				//alert(JSON.stringify(result));
				$scope.photos = result;			
			}, function (error) {
				//alert("error: " + error);
			});
		}
    };

    init();
	
});


