(function () {
    'use strict';

    /*Write above code here*/
var movieApp = angular.module('movieApp', []);
movieApp.controller('movieController', ['$scope', '$http', movieController]);

function movieController($scope, $http) {
    //user defined variables in $scope(model) for CRUD operations
    $scope.loading = true; //to show loading image while data is loaded
    $scope.showAddMovieForm = false; //to toggle add movies 
    
    $http.get('/api/Movie').then(function onSuccess(response) {
            // Handle success
        $scope.movies = response.data;
        debugger; 
        $scope.loading = false;
      }).catch(function onError(response) {
          $scope.error = "An Error has occured while loading movies! :(";
          $scope.loading = false;
         
        });
    $http.get('/api/Actor').then(function onSuccess(response) {
        // Handle success
        $scope.actors = response.data;
        $scope.loading = false;
    }).catch(function onError(response) {
        $scope.error = "An Error has occured while loading actors data! :(";
        $scope.loading = false;
        });
    $http.get('/api/Producer').then(function onSuccess(response) {
        // Handle success
        $scope.producers = response.data;
        $scope.loading = false;
    }).catch(function onError(response) {
        $scope.error = "An Error has occured while loading producers data! :(";
        $scope.loading = false;
    });
   
    //to toggle edit/save, called when toggleEdit ng-click button clicked 
    $scope.toggleEdit = function () {
        this.movie.enableEdit = !this.movie.enableEdit;
    }
    //to toggle add new moview form/add button called when pressing toggleAdd ng-click button clicked
    $scope.toggleAdd = function () {
        $scope.showAddMovieForm = !$scope.showAddMovieForm;
    };
    $scope.getActors = function (data) {
        return data.map(function (obj) { return obj.Name; }).join(',');
    };
   
    //Insert new movie
    $scope.add = function () {
        $scope.loading = true;
        debugger;
        $http.post('api/Movie/', this.newMovie).then(function onSuccess(response) {
            alert("Added Successfully!!");
            debugger;
            $scope.showAddMovieForm = false;
            $scope.movies.push(response.data);
            $scope.loading = false;
        }).catch(function (response) {
            $scope.error = "An Error has occured while adding movie! :(" + response.data;
            $scope.loading = false;
        });

    };

    $scope.save = function () {
        $scope.loading = true;
        var mov = this.movie;
        $http.put('api/Movie/' + mov.movieId, mov).then(function () {
            mov.enableEdit = false;
            $scope.loading = false;
        }).catch(function (data) {
            $scope.error = "An Error has occured while saving movie! :(" + data;
            $scope.loading = false;
            })
    };

    $scope.delete = function (index) {
        $scope.loading = true;
        var Id = this.movie.movieId;
        $http.delete('/api/Movie/' + Id).then(function (data) {
            alert("Movie deleted successfully!!");
            $scope.movies.splice(index, 1);
            $scope.loading = false;
        }).catch(function (data) {
            $scope.error = "An Error has occured while deleting movie! :(" + data;
            $scope.loading = false;
        });
    };

    $scope.file_changed = function (element) {

        var photofile = element.files[0];
        if (photofile) {
            var reader = new FileReader();
            reader.readAsDataURL(photofile);
            reader.onload = function (e) {
                // browser completed reading file - display it
                $scope.$apply(function () {
                    $scope.poster = e.target.result;
                    $scope.newMovie.Poster = e.target.result;
                });
            };
        }

    };

    //Insert new Actor
    $scope.addActor = function () {
        $scope.loading = true;
        $http.post('api/Actor/', this.newActor).then(function onSuccess(response) {
            alert("Added Successfully!!" + response.data.Name);
            $scope.actors.push(response.data);
            $scope.loading = false;
        }).catch(function (response) {
            $scope.error = "An Error has occured while adding actors! :(" + response.data;
            $scope.loading = false;
        });

    };
    $scope.addProducer = function () {
        $scope.loading = true;
        $http.post('api/Producer/', this.newProducer).then(function onSuccess(response) {
            alert("Added Successfully!!" + response.data.Name);
            $scope.producers.push(response.data);
            $scope.loading = false;
        }).catch(function (response) {
            $scope.error = "An Error has occured while adding producers! :(" + response.data;
            $scope.loading = false;
        });

    };
};


   

})();
