indexTableService.$inject = ['$filter'];

export function indexTableService($filter) {
  var service = {
    getPaginatedData: getPaginatedData,
    getSearchData: getSearchData,
    getSortedData: getSortedData
  };

  return service;

  function getPaginatedData(data, limitPerPage) {
    var index = 0;
    var dataInPages = [];
    if (data.length <= limitPerPage) {
      return [data];
    }
    while (index < data.length) {
      var page = data.slice(index, index += limitPerPage);
      dataInPages.push(page);
    }
    return dataInPages;
  }

  function getSearchData(data, filterFields, filterValue) {
    return $filter('filter')(data, function getMatches(row, index, data) {
      var matchFound = false;
      filterFields.forEach(function(field) {
        if (row[field].toString().toLowerCase().indexOf(filterValue.toString().toLowerCase()) > -1) {
          matchFound = true;
          return;
        }
      });
      return matchFound;
    });
  }

  function getSortedData(data, sortOrder, reverse) {
    return $filter('orderBy')(data, sortOrder, reverse);
  }
}
