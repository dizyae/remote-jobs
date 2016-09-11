import jobsTemplate from './jobs.html';
import {JobsController} from './jobs.controller';

export default function jobsComponent() {
  return {
    template: jobsTemplate,
    controller: JobsController,
    controllerAs: 'jobs'
  };
}
