import angular from 'angular';
import router from '../shared/router/router.module';

import {configure} from './core.config';
import {run} from './core.routes';

export default angular.module('core', [
  router
])
  .config(configure)
  .run(run)
  .name;
