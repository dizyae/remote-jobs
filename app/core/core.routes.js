import fourOhFourTemplate from './404.html';

run.$inject = ['routerHelper'];

export function run(routerHelper) {
  var otherwise = '/404';
  routerHelper.configureStates(getStates(), otherwise);
}

function getStates() {
  return [{
    state: '404',
    config: {
      url: '/404',
      template: fourOhFourTemplate
    }
  }];
}
