angular.module('app', [])
  .controller('AppController', function($http, $scope) {
      let app = this;

      app.nums = [1,2,3,4,5,6,7,8,9,10]

      app.search = () => {
        $http.get('http://localhost:3000/pesquisar?query=' + app.term)
      }

      app.choose = (num) => {
        $http.get('http://localhost:3000/escolher?num=' + num) 
      }

      app.next = () => {
        $http.get('http://localhost:3000/prox') 
      }

      app.fullscreen = () => {
        $http.get('http://localhost:3000/tela-cheia') 
      }

      app.scroll = (direction) => {
        return $http.get('http://localhost:3000/scroll?direction=' + direction)
      }

      app.skipAd = () => {
        return $http.get(`http://localhost:3000/skip-ad`)
      }

      $http.get('http://localhost:3000/address').then(res => {
        app.ip = res.data.ip
        app.port = res.data.port
      })

  })