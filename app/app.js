const app = angular
  .module('doctorApp', ['ngRoute'])
  .config(($routeProvider)=>{
    $routeProvider
    .when('/', {
      controller: "DocCtrl",
      templateUrl: "partials/doctor.html"
    })
    .when('/doctor/:doctor_name', {
      controller: "PatCtrl",
      templateUrl: "partials/patient.html"
    })
  }) // end of config
  .controller("DocCtrl", function($scope, getMedicalFactory) {

    getMedicalFactory
    .getInfo("doctors")
    .then((response)=>{
      console.log("response inside controller", response)
      $scope.doctors = response
    })

    $scope.myFunction = () =>{}

  })
  .factory('getMedicalFactory',($http)=>{
    return {
      getInfo : (who)=> {
        return $http
        .get("data/medical.json")
        .then((response)=>{
          console.log(response.data)
          return response.data[who]
        })//endn of then
        .then((val)=>{
          var newArray = []
        //creates a new, more accessible array of objects
        for(var i=0; i< val.length; i++) {
          //utilizing a for in loop to access objects with unknown keys
          for (key in val[i]) {
            // creates a new object key value pair which stores the name of the object under a key "name"
            val[i][key].doctor_id = key
            //pushes the newly modified object to it's own array
            newArray.push(val[i][key])
          }
        }
        // returns modified array
        return newArray
      })
      //end of then
      } //end of function
    } //end of object
  }) // end of factory
