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
    state: 'home.indexTable',
    config: {
      url: '',
      component: 'dwJobs'
    }
  }];
}
