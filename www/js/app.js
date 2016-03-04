var app = angular.module('pocket_series', ['ionic'])

app.controller('VideosCtrl', function($scope, $http, $sce) {
  $scope.base_url = "https://www.googleapis.com/youtube/v3/";

  $scope.video_list = [
    { title: 'Miragem' },
    { title: 'Copas & espadas' },
    { title: 'Nada Importante' },
    { title: 'Efemero' }
  ];

  $scope.addToVideoList = function(video_itens) {
      $scope.video_list = [];
      console.log("addToVideoList");
      console.log(video_itens);
      for(var i=0;  i<video_itens.length; i++) {
          $scope.video_list.push(video_itens[i])
      } 
  };

  $scope.get_url = function(service) {
    var url = $scope.base_url;
    // Remove null falues
    for (var key in $scope.params) {
       if ($scope.params[key] == null) {
          delete $scope.params[key];
       }
    }
    var qs = $.param($scope.params);
    
    url = url + service +"/"+ "?" + qs;

    console.log(url);
    return url;
  };

  $scope.getVideos = function() {
    $scope.current_view = "views/video-list.html";

    var youtube_service = "playlistItems";
    console.log("getVideos");
    $scope.params = {
        "part" : "snippet",
        "maxResults" : 10,
        "playlistId" : "UUUYcp-CUO_YglGmN3L4pUPw",
        "key" : "AIzaSyAf5H9oq3MKgDk3AWoU6KvxGYZ5amNSLx8"
    };
    
    $scope.params.callback = "videoListCallback";

    var url = $scope.get_url(youtube_service);

    $http.jsonp(url).then(
            function(s) { $scope.success = JSON.stringify(s); }, 
            function(e) { $scope.error = JSON.stringify(e); }
    );
  };

  $scope.videoDetail = function(videoId) {
    $scope.code = videoId;
    $scope.current_view = "views/video-detail.html";
  };
  
  $scope.getVideos();

  // teste detail
  //$scope.videoDetail("tf1YucwJ_5g");  
});


app.directive('myYoutube', function($sce) {
  return {
    restrict: 'EA',
    scope: { code:'=' },
    replace: true,
    template: '<iframe class="playerFrame" src="{{url}}" frameborder="0" allowfullscreen></iframe>',
    link: function (scope) {
        console.log('here');
        scope.$watch('code', function (newVal) {
           if (newVal) {
               scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
           }
        });
    }
  };
});

function videoListCallback(data) {
  console.log("videoListCallback");
  
  var items = data.items;
  if(items instanceof Array) {
      window.angular.element(document.getElementById('VideosCtrl')).scope().addToVideoList(items, false);
  }
}