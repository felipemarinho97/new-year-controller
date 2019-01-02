angular.module('app', [])
  .controller('AppController', function($http, $timeout) {
      let app = this;

      app.nums = [1,2,3,4,5,6,7,8,9,10]

      app.titles = []

      app.search = () => {
        app.titles = []
        $http.get('http://localhost:3000/pesquisar?query=' + app.term).then(res => {
          app.titles = res.data.titles
          $timeout(cleanTitles, 30000)
        })
        $http.get('http://publichost:8887/pesquisar?query=' + app.term).then(res => {
          app.titles = res.data.titles
          $timeout(cleanTitles, 30000)
        })
      }

      app.choose = (num) => {
        app.titles = []
        $http.get('http://localhost:3000/escolher?num=' + num).then(res => {
          app.titles = res.data.titles
          $timeout(cleanTitles, 30000)
        })
        $http.get('http://publichost:8887/escolher?num=' + num).then(res => {
          app.titles = res.data.titles
          $timeout(cleanTitles, 30000)
        })
      }

      app.next = () => {
        app.titles = []
        $http.get('http://localhost:3000/prox').then(res => {
          app.titles = res.data.titles
          $timeout(cleanTitles, 30000)
        })
        $http.get('http://publichost:8887/prox').then(res => {
          app.titles = res.data.titles
          $timeout(cleanTitles, 30000)
        })
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
        $http.get(`http://localhost:3000/skip-ad`)
        return $http.get(`http://publichost:8887/skip-ad`)
      }

      $http.get('http://localhost:3000/address').then(res => {
        app.ip = res.data.ip
        app.port = res.data.port
      })

      app.getDisplay = () => app.titles[0] && app.titles[0].name ? 'block' : 'flex'

      function cleanTitles() {
        app.titles = app.titles.map(elm => ({ num: elm.num }))
      }

  })