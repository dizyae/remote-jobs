import homeTemplate from './home.html';

setLayoutRoutes.$inject = ['routerHelper'];

export function setLayoutRoutes(routerHelper) {
  routerHelper.configureStates(getStates());
}

function getStates() {
  return [{
    state: 'home',
    config: {
      url: '/',
      abstract: true,
      template: homeTemplate
    }
  }, {
    state: 'home.jobs',
    config: {
      url: '',
      component: 'dwJobs'
    }
  }, {
    state: 'home.jobDetails',
    config: {
      url: 'jobdetails',
      template: '<p>Opening job post...</p>',
      controller: ['$state', '$stateParams', '$window', function($state, $stateParams, $window) {
        $window.open($stateParams.details.url);
        $state.go('home.jobs');
      }],
      params: {details: null}
    }
  }];
}
