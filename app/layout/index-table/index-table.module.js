import indexTableComponent from './index-table.component';

export default angular.module('indexTable', [])
  .component('jobsIndexTable', indexTableComponent())
  .name;
