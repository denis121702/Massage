
app.factory('textService', ['$http', '$q', 'ngAuthSettings', function ($http, $q, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var textService = {};
	
	 var _saveGirlTextItems = function (requestSaveGirl) {
        var deferred = $q.defer();
        $http.post(serviceBase + 'api/Account/SaveGirl', requestSaveGirl).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;       
    };

    var _saveTextItems = function (textDataList) {
        var deferred = $q.defer();
        $http.post(serviceBase + 'api/Account/Save', textDataList).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;       
    };
	
	var _getTextItems = function (path) {
	    var deferred = $q.defer();
	    //https://github.com/angular/angular.js/issues/1586
	    //http://stackoverflow.com/questions/17593491/angularjs-browser-caching-json-data
	    //response.headers["Cache-Control"] = "no-cache, no-store, max-age=0, must-revalidate"
	    //response.headers["Pragma"] = "no-cache"
	    //response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
	    //$http.get(url, { headers: { 'Cache-Control': 'no-cache' } });
	    $http.get(serviceBase + 'FileUploads' + path + '.json',{ headers: { 'Cache-Control': 'no-cache' } }).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;       
    };
	
	var _getAllGirlsItems = function (path) {
	    var deferred = $q.defer();
	    //$http.get(url, { headers: { 'Cache-Control': 'no-cache' } });
	    $http.get(serviceBase + 'FileUploads/allGirls.json', { headers: { 'Cache-Control': 'no-cache' } }).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;       
    };
	
	var _getGirlTextItems = function (path) {
	    var deferred = $q.defer();
	    //$http.get(url, { headers: { 'Cache-Control': 'no-cache' } });
	    $http.get(serviceBase + 'FileUploads/' + path + '.json', { headers: { 'Cache-Control': 'no-cache' } }).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;       
    };
	
	var _deleteGirl = function (requestDeleteGirl) {
        var deferred = $q.defer();
        $http.post(serviceBase + 'api/Account/DeleteGirl', requestDeleteGirl).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;       
    };	
   
    textService.deleteGirl = _deleteGirl;
    textService.saveTextItems = _saveTextItems;
	textService.getTextItems = _getTextItems;
	textService.saveGirlTextItems = _saveGirlTextItems;
	textService.getGirlTextItems = _getGirlTextItems;
	textService.getAllGirlsItems = _getAllGirlsItems;	

    return textService;

}]);