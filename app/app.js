(function()  {
  "use strict";

  angular.module("app",[])
    .controller("Todo",Todo)
    .factory("todoService", todoService)
    .filter("checkedItems", checkedItems)
    .value("model", {
      "user" : "Vitaliy",
      "userPhoto" : "images/VZ.jpg",
      "items" : [
        { "action" : "Estimate...", "done": false},
        { "action" : "Create...", "done": false},
        { "action" : "Edit...", "done": true},
        { "action" : "Delete...", "done": false}
      ]
    });

  angular.element(document).ready(() => {
    angular.bootstrap(document,["app"]);
  });

  function Todo(model, todoService){
    let $ctrl = this;
    $ctrl.todo = model;
    $ctrl.showComplete = false;
    $ctrl.itemOrder = 'action';
    $ctrl.orderWay = false;

    Object.assign($ctrl, todoService);
  }

  function todoService() {
    return {
        addNewItem,
        deleteItem
    };

    function addNewItem(items, newItem) {
      if (newItem && newItem.action){
        items.push({
          action: newItem.action,
          done: false
        });

        newItem.action = "";
      }
    }

    function deleteItem(items, item) {
      if(item) {
        let index = items.indexOf(item);
        if(index >= 0) {
          items.splice(index, 1);
        }
      }
    }
  }

  function checkedItems() {
    return function(items, filterItem) {
      let result = [];

      if (angular.isArray(items) && filterItem) {
        angular.forEach(items, (item) => {
          if(item.action.startsWith(filterItem.action)) {
            result.push(item);
          }
        });

        return result;
      }
      else {
        return items;
      }
    };
  }
})();
