(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItemsList', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItemsList.html',
    scope: {
      found: '<',
      nfMessage: '@nothingfound',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;

  list.found;

  list.nothingfound = "";

  list.searchTerm = "";

  list.onSearch = function () {
    list.found = [];
    list.nothingfound = "";

    var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);

    promise.then(function (response) {
      list.found = response.foundItems;

      if(list.found.length === 0) {
        list.nothingfound = "Nothing Found";
      }
    });
  };

  list.removeItem = function (itemIndex) {
    list.found.splice(itemIndex, 1);
  };
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {

    var promise = $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
    }).then(function (response) {
      var fullMenu = response.data.menu_items;
      var filteredMenu = [];
      if(searchTerm != ""){
        for(var x=0; x<fullMenu.length; x++){
          if(fullMenu[x].description.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1) {
            filteredMenu.push(fullMenu[x]);
          }
        }
      }
      return {
        foundItems : filteredMenu
      };
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
    return promise;
  };

}

})();
