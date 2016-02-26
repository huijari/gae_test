angular.module('JobsSearch')
  .config(config);

function config($routeProvider){
  $routeProvider
    .when('/listing', {
      templateUrl: 'template/listing.html',
      controller: 'listing as vm'
    }).when('/detail/:id', {
      templateUrl: 'template/detail.html',
      controller: 'detail as vm'
    }).when('/post', {
      templateUrl: 'template/post.html',
      controller: 'post as vm'
    }).otherwise({
      redirectTo: '/listing'
    });
}
