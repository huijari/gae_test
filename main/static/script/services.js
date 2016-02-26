angular.module('JobsSearch')
  .factory('Jobs', jobsService)
  .factory('Moment', momentService);

function jobsService($http) {
//  var baseUrl = 'http://172.16.106.20:3000';
    var baseUrl = '/api/v1';

  var service = {
    search: search,
    getDetail: getDetail,
    create: create
  };

  return service;

  function search(description, location, fullTime, page) {
    var predicate = '?description=' + description + '&location=' + location;
    predicate += '&page=' + page;
    if (fullTime)
      predicate += '&full_time=true';
    return $http.get(baseUrl + '/positions' + predicate, {cache: true}).then(function(data) {
      return data.data;
    });
  }

  function getDetail(id) {
    return $http.get(baseUrl + '/positions/' + id, {cache: true}).then(function(data) {
      return data.data;
    });
  }
    
  function create(job) {
    return $http.post(baseUrl + '/positions', {
      title: job.title,
      location: job.location,
      type: job.type,
      description: marked(job.description_md),
      how_to_apply: marked(job.how_to_apply_md),
      company: job.company,
      company_url: job.company_url,
      company_logo: job.company_logo
    }).then(function(data) {
      return data.data;
    });
  }
}

function momentService() {
  return moment;
}
