import angular from 'angular';

import mockData from './dataMocks/mocks.data.module';
import mockServices from './serviceMocks/mocks.services.module';

export default angular.module('customMocks', [
  mockData,
  mockServices
])
  .name;
