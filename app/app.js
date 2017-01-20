const app = angular
  .module('doctorApp', ]['ngRoute'])
  .config(($routeProvider)=>{
    $routeProvider
    .when('/', {
      controller: "DocCtrl"
      templateUrl: "doctor.html"
    })

  }) // end of config
