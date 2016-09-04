import angular from 'angular';

import router from './router/router.module';
import logger from './logger/logger.module';

export default angular.module('shared', [
  router,
  logger
])
  .name;
