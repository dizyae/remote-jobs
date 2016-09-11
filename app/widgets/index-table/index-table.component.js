import template from './index-table.html';
import IndexTableController from './index-table.controller';

export default function indexTableComponent() {
  return {
    template: template,
    controller: IndexTableController,
    controllerAs: 'indexTable',
    bindings: {
      config: '<',
      tableFilter: '<'
    }
  };
}
