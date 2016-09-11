import angular from 'angular';

import router from '../shared/router/router.module';
import jobs from './jobs/jobs.module';

import {setLayoutRoutes} from './layout.routes';

export default angular.module('layout', [
  router,
  jobs
])
  .run(setLayoutRoutes)
  .name;
