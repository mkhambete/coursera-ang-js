(function () {
'use strict';

angular.module('LunchChecker', [])

.controller('LunchCheckerController', function ($scope) {

  $scope.lunchItems = "";
  $scope.lunchCheckMsg = "";

  $scope.displayLunchCheckMessage = function () {

    var numOfItems = calculateNumberOfItems($scope.lunchItems);

    if(numOfItems <= 0) {
      var msg1 = "Please enter data first";
      $scope.lunchCheckMsg = msg1;
    } else if (numOfItems <= 3) {
      var msg2= "Enjoy!";
      $scope.lunchCheckMsg = msg2;
    } else {
      var msg3 = "Too much!";
      $scope.lunchCheckMsg = msg3;
    }
  };


  function calculateNumberOfItems(itemsStr) {

    if("" === itemsStr)
      return 0;
    var items = itemsStr.split(',');
    return items.length;
  }

});


})();
