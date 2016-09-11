import angular from 'angular';
import pagination from 'angular-ui-bootstrap/src/pagination';

import indexTableComponent from './index-table.component';
import {indexTableService} from './index-table.service';

export default angular.module('indexTable', [pagination])
  .component('dwIndexTable', indexTableComponent())
  .factory('indexTableService', indexTableService)
  .name;
