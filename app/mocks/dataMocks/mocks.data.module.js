import angular from 'angular';

import mockRoutes from './mocks.routes.value';

export default angular.module('mockData', [])
  .value('mockRoutes', mockRoutes)
  .name;
