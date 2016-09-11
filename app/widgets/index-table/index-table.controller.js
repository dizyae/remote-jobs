IndexTableController.$inject = ['$state', 'indexTableService'];

export default function IndexTableController($state, indexTableService) {
  var vm = this;
  vm.limit = 5;
  vm.currentPage = 1;
  vm.limitOptions = [5, 10, 25, 50];
  vm.sortTable = function sortTable() {
    vm.currentData = indexTableService.getSortedData(vm.currentData, vm.sortType, vm.sortReverse);
    vm.setPage();
  };
  vm.setPage = function setPage() {
    vm.pageData = indexTableService.getPaginatedData(vm.currentData, vm.limit)[vm.currentPage - 1];
  };
  vm.goToDetails = function goToDetails(data) {
    $state.go(vm.config.detailState, {details: data});
  };
  // detects bindings initialzation and changes to one way bindings in parent scope.
  vm.$onChanges = function onChangeHook(changes) {
    if (changes.config.currentValue) {
      vm.currentData = changes.config.currentValue.data;
      vm.setPage();
      return;
    }
    if (changes.tableFilter.currentValue) {
      var filterValue = changes.tableFilter.currentValue;
      var filterFields = vm.config.fields;
      vm.currentData = indexTableService.getSearchData(vm.config.data, filterFields, filterValue);
      vm.setPage();
      return;
    }
  };
}
