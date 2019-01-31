

app.factory('filesUploadService', ['$http', 'ngAuthSettings', '$q', function ($http, ngAuthSettings, $q) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var filesUploadService = {};
	
	var _getPhotos = function (path) {
        var deferred = $q.defer();			
	    $http.get(serviceBase + 'FileUploads/' + path + '_photos.json', { headers: { 'Cache-Control': 'no-cache' } }).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;       
	};

	var _addPhoto = function (photoSetting) {
	    var deferred = $q.defer();
	    $http.post(serviceBase + 'api/files/AddPhoto', photoSetting).success(function (data) {
	        deferred.resolve(data);
	    }).error(function (error) {
	        deferred.reject(error);
	    });
	    return deferred.promise;
	};

	var _updatePhotos = function (requestUpdatePhotos) {
        var deferred = $q.defer();
	    $http.post(serviceBase + 'api/files/UpdatePhotos', requestUpdatePhotos).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };
	
	var _deletePhoto = function (photoSetting) {
        var deferred = $q.defer();
        $http.post(serviceBase + 'api/files/DeletePhoto', photoSetting).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    var _uploadPhoto = function () {
        var deferred = $q.defer();

        // create file input without appending to DOM
        var fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('id', Math.random());

        fileInput.onchange = function () {
            var fileURI = fileInput.files[0];
            var data = new FormData();
            data.append("file", fileURI);
            data.append("myParameter", "test");

            $.ajax({
                url: serviceBase + 'api/files/upload',
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (error) {
                    deferred.reject(error);
                }
            });
        };

        fileInput.click();

        // return a promise
        return deferred.promise;
    };

    function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], { type: mimeString });
    }

    var _uploadRoomCanvas = function (dataURL) {
        var deferred = $q.defer();

        var blob = dataURItoBlob(dataURL);
        var data = new FormData();
        data.append("canvasImage", blob);        

        $.ajax({
            url: serviceBase + 'api/files/upload',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function (data) {
                deferred.resolve(data);
            },
            error: function (error) {
                deferred.reject(error);
            }
        });
        return deferred.promise;
    };

    filesUploadService.uploadPhoto = _uploadPhoto;
    filesUploadService.uploadRoomCanvas = _uploadRoomCanvas;
    filesUploadService.addPhoto = _addPhoto;
	filesUploadService.getPhotos = _getPhotos;
	filesUploadService.deletePhoto = _deletePhoto;
	filesUploadService.updatePhotos = _updatePhotos;

    return filesUploadService;

}]);