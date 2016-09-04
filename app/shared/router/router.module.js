import angular from 'angular';

import uirouter from 'angular-ui-router';
import logger from '../logger/logger.module';

import {routerHelperProvider} from './router-helper.provider';

export default angular.module('router', [
  uirouter,
  logger
])
  .provider('routerHelper', routerHelperProvider)
  .name;
