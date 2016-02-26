angular.module('JobsSearch', ['ngRoute'])
  .controller('listing', listingController)
  .controller('detail', detailController)
  .controller('post', postController)
  .filter('fromnow', fromnowFilter);

function listingController($routeParams, $route, Jobs) {
  var vm = this;

  vm.description = $routeParams.description || '';
  vm.location = $routeParams.location || '';
  vm.fullTime = true;
  vm.jobs = [];
  vm.page = 0;

  vm.submit = function() {
    $route.updateParams({
      description: vm.description,
      location: vm.location
    });
  }

  vm.search = function() {
    vm.loading = 'is-active';
    Jobs.search(vm.description, vm.location, vm.fullTime, vm.page).then(function(data) {
      vm.jobs = data;
      vm.loading = '';
    });
    componentHandler.upgradeDom();
  };

  vm.prev = function() {
    if (vm.page != 1) {
      vm.page--;
      vm.search();
    }
  }

  vm.next = function() {
    vm.page++;
    vm.search();
  }

  vm.search();
  componentHandler.upgradeDom();
}

function detailController($routeParams, $sce, Jobs) {
  var vm = this;

  Jobs.getDetail($routeParams.id).then(function(data) {
    vm.job = data;
    vm.job.description = $sce.trustAsHtml(vm.job.description);
    vm.job.how_to_apply = $sce.trustAsHtml(vm.job.how_to_apply);
  });
}

function postController($sce, Jobs) {
  var vm = this;
  vm.job = {
    title: '',
    location: '',
    type: 'Type',
    description_md: '',
    how_to_apply_md: '',
    company: '',
    company_url: '',
    company_logo: ''
  };
  vm.setType = function(type) {
    vm.job.type = type;
  };
  vm.switch = function() {
    componentHandler.upgradeDom();
    vm.job.company_logo = vm.previewSource;
    vm.job.how_to_apply = $sce.trustAsHtml(marked(vm.job.how_to_apply_md));
    vm.job.description = $sce.trustAsHtml(marked(vm.job.description_md));
  };
  vm.save = function() {
    Jobs.create(vm.job).then(function(job) {
      location.hash = '/detail/' + job.id;
    });
  };
}

function fromnowFilter(Moment) {
  return function(input) {
    return Moment(new Date(input)).fromNow();
  }
}
