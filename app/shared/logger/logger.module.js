import angular from 'angular';

import {loggerService} from './logger.service';

export default angular.module('logger', [])
  .factory('logger', loggerService)
  .name;
