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
  .controller("DocCtrl", function($scope, getMedicalFactory, $location) {

    getMedicalFactory
    .getInfo("doctors", "doctor_id")
    .then((response)=>{
      console.log("response inside controller", response)
      $scope.doctors = response
    })

    $scope.seePatients = (val) =>{
      $location.url(`/doctor/${val}`)
    }

  })
  .controller("PatCtrl", function($scope, getPatientFactory, $routeParams){

    getPatientFactory
    .getDoctorsPatients($routeParams.doctor_name)
    .then((response)=>{
      $scope.patients = response;
      console.log("patient ctrol response", response)
    })

  })
  .factory('getMedicalFactory',($http)=>{
    return {
      getInfo : (who, whatKey)=> {
        return $http
        .get("https://doctorsandpatients-34f3e.firebaseio.com/.json")
        .then((response)=>{
          console.log(response.data)
          return response.data[who]
        })//end of then
        .then((val)=>{
          var newArray = []
        //creates a new, more accessible array of objects
        for(var i=0; i< val.length; i++) {
          //utilizing a for in loop to access objects with unknown keys
          for (key in val[i]) {
            // creates a new object key value pair which stores the name of the object under a key "name"
            val[i][key][whatKey] = key
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
  .factory("getPatientFactory", (getMedicalFactory)=>{
    return {
      getDoctorsPatients : (doctor_name) => {

          let patientArray = [];
          return getMedicalFactory
          .getInfo("patients", "patient_id")
          .then((response)=>{
            console.log("response in get patient", response)

            for (var i = 0; i < response.length; i++) {
              if(response[i].doctor_id === doctor_name){
                patientArray.push(response[i])
              } //end of if
            }//end of for loop
            return patientArray;
            console.log("editted patient Array", patientArray)
          }) //end of then


      }//end of function
    } //end of object

  }) //end of factory
