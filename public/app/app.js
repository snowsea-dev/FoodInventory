var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $scope.baseUrl = "http://localhost:1337/"
    $scope.items = [
    ];
    $scope.expiredItems = [];
    $scope.notExpiredItems = [];
    $scope.curItems = $scope.notExpiredItems;

    $scope.input = {};
    $scope.input.item = {};
    $scope.input.register = {};
    $scope.input.login = {};
    $scope.mode = 'NotExpired';

    $scope.addItem = function() {

      var username = localStorage.getItem("user");
      if (username == undefined) {
        $.notify("Please Login !", "info");
      }

      if ($scope.input.item.name == null || $scope.input.item.description == null || $scope.input.item.expireDate == null) {
        $.notify("Please fill all information !", "warn");
        return;
      }

      $scope.items.push($scope.input.item);
      $scope.addCurItem($scope.input.item);


      var params = {
        username: username,
        name: $scope.input.item.name,
        description: $scope.input.item.description,
        expireDate: $scope.input.item.expireDate,
      }
      $http.post("/add_item", {item: params})
        .then(function(response) {
          var item = response.data;
          $('#add_item_dialog').modal('toggle');

        }, function myError(response) {
          $.notify("Network Error !", "error");
      });
    }

    $scope.addCurItem = function(curItem) {
      if ($scope.isExpired(curItem.expireDate) == true) {
        $scope.expiredItems.push(curItem);
      } else {
        $scope.notExpiredItems.push(curItem);
      }
    };

    $scope.splitItems = function() {
      for (var i = 0; i < $scope.items.length; i++)
        $scope.addCurItem($scope.items[i]);
    }

    $scope.getItem = function() {
      var username = localStorage.getItem("user");

      $http.post("/get_item", {username: username})
        .then(function(response) {
          $scope.items = response.data.items;
          $scope.expiredItems = [];
          $scope.notExpiredItems = [];
          $scope.splitItems();
          $scope.setMode($scope.mode);

        }, function myError(response) {
          $.notify("Network Error !", "error");
      });
    }

    $scope.isExpired = function(date) {
      var d = date.split("/");
      var curDate = new Date();
      var curYear = curDate.getFullYear();
      var curMonth = curDate.getMonth() + 1;
      var curDay = curDate.getDate();
      var month = parseInt(d[0]);
      var day = parseInt(d[1]);
      var year = parseInt(d[2]);

      if (curYear > year) return true;
      if (curYear < year) return false;
      if (curMonth > month) return true;
      if (curMonth < month) return false;
      if (curDay > day) return true;
      return false;
    }

    $scope.addItemDialog = function() {
      $scope.input.item = {};
    }

    $scope.registerDialog = function() {
      if ($scope.input.email == undefined) {

      }
      $scope.input.register = {};
    }

    $scope.loginDialog = function() {
      $scope.input.login = {};
    }

    $scope.setMode = function(mode) {
      if (mode == 'NotExpired') {
        $('#btnExpired').removeClass('selected');
        $('#btnNotExpired').addClass('selected');
        $scope.curItems = $scope.notExpiredItems;
      } else {
        $('#btnNotExpired').removeClass('selected');
        $('#btnExpired').addClass('selected');
        $scope.curItems = $scope.expiredItems;
      }
      $scope.mode = mode;
    }

    $scope.login = function() {
      if ($scope.input.login.password == null || $scope.input.login.email == null) {
        $.notify("Please fill all information !", "warn");
        return;
      }

      var params = {
        username: $scope.input.login.email,
        password: $scope.input.login.password
      }
      $http.post("/login", params)
        .then(function(response) {
          var user = response.data;

          localStorage.setItem("user", user.email);
          $('#login_dialog').modal('toggle');
          $scope.getItem();
          $.notify(`Welcome ${user.email} !`, "success");

        }, function myError(response) {
          $.notify("Username or Password is not correct !", "error");
      });
    }

    $scope.register = function() {

      if ($scope.input.register.password == null || $scope.input.register.confirmPassword == null || $scope.input.register.email == null) {
        $.notify("Please fill all information !", "warn");
        return;
      }

      if ($scope.input.register.password != $scope.input.register.confirmPassword) {
        $.notify("Password don't match !", "warn");
        return;
      }

      var params = {
        email: $scope.input.register.email,
        password: $scope.input.register.password
      };

      $http.post("/register", params)
        .then(function(response) {
          var user = response.data;

          $('#register_dialog').modal('toggle');
          $.notify("Successfully Registered !", "success");

        }, function myError(response) {
          $.notify("User Name Already Exists !", "error");
      });
    }

    $scope.load = function() {
      var username = localStorage.getItem("user");
      if (username == undefined) {
        $.notify("Please Login !", "info");
      }
      else {
        $.notify(`Welcome ${username} !`, "success");
        $scope.getItem();
      }
    }

    $scope.load();
});
