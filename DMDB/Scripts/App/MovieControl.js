(function () {
    'use strict';

    /*Write above code here*/
var movieApp = angular.module('movieApp', []);
movieApp.controller('movieController', ['$scope', '$http', movieController]);

function movieController($scope, $http) {
    //user defined variables in $scope(model) for CRUD operations
    $scope.loading = true; //to show loading image while data is loaded
    $scope.showAddMovieForm = false; //to toggle add movies 
    $scope.showError = false;
        
    $http.get('/api/Movie').then(function onSuccess(response) {
            // Handle success
        $scope.movies = response.data;
        $scope.loading = false;
      }).catch(function onError(response) {
          $scope.error = "An Error has occured while loading movies! :(";
          $scope.showError = true;
          $scope.loading = false;
         
        });
    $http.get('/api/Actor').then(function onSuccess(response) {
        // Handle success
        $scope.actors = response.data;
        $scope.loading = false;
    }).catch(function onError(response) {
        $scope.error = "An Error has occured while loading actors data! :(";
        $scope.showError = true;
        $scope.loading = false;
        });
    $http.get('/api/Producer').then(function onSuccess(response) {
        // Handle success
        $scope.producers = response.data;
        $scope.loading = false;
    }).catch(function onError(response) {
        $scope.error = "An Error has occured while loading producers data! :(";
        $scope.showError = true;
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
        this.newMovie.Poster = $scope.poster;
        $http.post('api/Movie/', this.newMovie).then(function onSuccess(response) {
            alert("Added Successfully!!");
            $scope.showAddMovieForm = false;
            $scope.movies.push(response.data);
            $scope.loading = false;
        }).catch(function (response) {
            $scope.error = "An Error has occured while adding movie! :(" + response.data;
            $scope.showError = true;
            $scope.loading = false;
        });

    };

    $scope.save = function () {
        $scope.loading = true;
        var mov = this.movie;
        debugger;
        $http.put('api/Movie/' + mov.MovieId, mov).then(function () {
            mov.enableEdit = false;
            $scope.loading = false;
            alert("Saved Successfully!!");
        }).catch(function (data) {
            $scope.error = "An Error has occured while saving movie! :(" + data;
            $scope.showError = true;
            $scope.loading = false;
            })
    };

    $scope.deleteMovie = function () {
        $scope.loading = true;
        var deletedMovie = this.movie;
        var Id = this.movie.MovieId;
        $http.delete('/api/Movie/' + Id).then(function (response) {
            
            var index = $scope.movies.indexOf(deletedMovie);
            alert("Movie deleted successfully!!");
            $scope.movies.splice(index, 1);
            $scope.loading = false;
        }).catch(function (data) {
            $scope.error = "An Error has occured while deleting movie! :(" + data;
            $scope.showError = true;
            $scope.loading = false;
        });
    };

    $scope.file_changed = function (element) {
        var updatedMovie = this.movie;
        var photofile = element.files[0];
        if (photofile) {
            var reader = new FileReader();
            reader.readAsDataURL(photofile);
            reader.onload = function (e) {
                // browser completed reading file - display it
                $scope.$apply(function () {
                    var index = $scope.movies.indexOf(updatedMovie);
                    var d = $(element).attr('id');
                    if (d == "editMoviePoster") {
                        $scope.movies[index].Poster = e.target.result;
                    }
                    else
                    {
                        $scope.poster = e.target.result;
                    }
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
            $scope.showError = true;
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
            $scope.showError = true;
            $scope.loading = false;
        });

    };
};


   

})();
