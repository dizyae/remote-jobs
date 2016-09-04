import angular from 'angular';
import router from '../shared/router/router.module';

import coreConstants from './core.constants';
import {configure} from './core.config';
import {run} from './core.routes';

const constants = coreConstants();

export default angular.module('core', [
  router
])
  .constant('apiUrl', constants.apiUrl)
  .config(configure)
  .run(run)
  .name;
