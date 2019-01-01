angular.module('app', [])
  .controller('AppController', function($http, $scope) {
      let app = this;

      app.nums = [1,2,3,4,5,6,7,8,9,10]

      app.titles = []

      app.search = () => {
        app.titles = []
        $http.get('http://localhost:3000/pesquisar?query=' + app.term).then(res => {
          app.titles = res.data.titles
        })
        $http.get('http://publichost:8887/pesquisar?query=' + app.term).then(res => {
          app.titles = res.data.titles
        })
      }

      app.choose = (num) => {
        $http.get('http://localhost:3000/escolher?num=' + num) 
        $http.get('http://publichost:8887/escolher?num=' + num) 
      }

      app.next = () => {
        $http.get('http://localhost:3000/prox') 
        $http.get('http://publichost:8887/prox') 
      }

      app.fullscreen = () => {
        $http.get('http://localhost:3000/tela-cheia') 
        $http.get('http://publichost:8887/tela-cheia') 
      }

      app.scroll = (direction) => {
        $http.get('http://localhost:3000/scroll?direction=' + direction)
        return $http.get('http://publichost:8887/scroll?direction=' + direction)
      }

      app.skipAd = () => {
        return $http.get(`http://localhost:3000/skip-ad`)
        return $http.get(`http://publichost:8887/skip-ad`)
      }

      $http.get('http://localhost:3000/address').then(res => {
        app.ip = res.data.ip
        app.port = res.data.port
      })

  })