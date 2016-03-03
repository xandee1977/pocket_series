angular.module('pocket_series', ['ionic'])

.controller('VideosCtrl', function($scope, $http) {
  $scope.base_url = "https://www.googleapis.com/youtube/v3/";

  $scope.video_list = [
    { title: 'Miragem' },
    { title: 'Copas & espadas' },
    { title: 'Nada Importante' },
    { title: 'Efemero' }
  ];


  $scope.addToVideoList = function(video_itens) {
      for(var i=0;  i<itens.length; i++) {
          if($scope.controlId.indexOf(itens[i].game_id) == -1) {
              $scope.gameList.push(itens[i]);
          }
      }        
  }

  $scope.get_url = function(service) {
    var url = $scope.base_url;
    // Remove null falues
    for (var key in $scope.params) {
       if ($scope.params[key] == null) {
          delete $scope.params[key];
       }
    }
    var qs = $.param($scope.params);
    
    console.log(url + "?" + qs);
    return url +"/"+ service +"/"+ "?" + qs;
  }

  $scope.getVideos = function() {
    $scope.params = {
        "part" : "snippet",
        "maxResults" : 10,
        "playlistId" : "CUO_YglGmN3L4pUPw",
        "key" : "AIzaSyAf5H9oq3MKgDk3AWoU6KvxGYZ5amNSLx8"
    };
    $scope.params.callback = "videoListCallback";

    var url = $scope.get_url();
    $http.jsonp(url).then(
            function(s) { $scope.success = JSON.stringify(s); }, 
            function(e) { $scope.error = JSON.stringify(e); }
    );
    //https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=UUUYcp-CUO_YglGmN3L4pUPw&key=AIzaSyAf5H9oq3MKgDk3AWoU6KvxGYZ5amNSLx8
  }
});

function videoListCallback(data) {
    clearErrorMessage();
    clearSuccessMessage();

    if(data.data instanceof Array) {
        window.angular.element(document.getElementById('game-controller')).scope().addToGameList(data.data, false);
    }
}