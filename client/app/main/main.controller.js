'use strict';

angular.module('yoAngularWithNodeApp')
  .controller('MainCtrl', function($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if ($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', {
        name: $scope.newThing
      });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    //-------------------------------------------
    $scope.isEdit = true;

    $scope.article = {};

    $scope.getData = function() {
      $http.get('/api/editcontents')
        .success(function(data) {
          $scope.article = data;
        });
    };
    $scope.postData = function() {
      $http.post('/api/editcontents', $scope.article)
        .success(function(data) {
          $scope.article = data;

        })
        .error(function(data) {
        });
    };
  });