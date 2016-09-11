import angular from 'angular';

import jobsComponent from './jobs.component';

export default angular.module('jobs', [])
  .component('dwJobs', jobsComponent())
  .name;
