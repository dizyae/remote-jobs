import angular from 'angular';

import router from '../shared/router/router.module';
import indexTable from './index-table/index-table.module';

import {setLayoutRoutes} from './layout.routes';

export default angular.module('layout', [
  router,
  indexTable
])
  .run(setLayoutRoutes)
  .name;
