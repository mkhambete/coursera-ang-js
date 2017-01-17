(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.message = "Everything is bought!";
  toBuy.items = ShoppingListCheckOffService.getItemsToBuy();

  toBuy.transferItem = function (itemIndex) {
    ShoppingListCheckOffService.checkOffItem(itemIndex);
  }
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {

  var alreadyBought = this;
  alreadyBought.message = "Nothing bought yet";
  alreadyBought.items = ShoppingListCheckOffService.getItemsBought();
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var itemsToBuy = [
    {name:'Bags of Chips', quantity: 5},
    {name:'Cookies', quantity: 20},
    {name:'Bagels', quantity: 4},
    {name:'Donuts', quantity: 4},
    {name:'Chocolates', quantity: 2},
    {name:'Soup Cans', quantity: 3},
    {name:'Eggs', quantity: 12}
  ];
  var itemsBought = [];

  service.checkOffItem = function (itemIndex) {
    itemsBought.push(itemsToBuy[itemIndex]);
    itemsToBuy.splice(itemIndex, 1);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.getItemsBought = function () {
    return itemsBought;
  };

}

})();
