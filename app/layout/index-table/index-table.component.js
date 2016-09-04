import indexTableTemplate from './index-table.html';
import {IndexTableController} from './index-table.controller';

export default function indexTableComponent() {
  return {
    template: indexTableTemplate,
    controller: IndexTableController,
    controllerAs: 'jobs'
  };
}
