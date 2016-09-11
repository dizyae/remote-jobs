(function() {
  'use strict';

  describe('Index Table Service tests', function() {
    var indexTableService;
    var rawData;
    var limitPerPage;
    var paginatedData;

    beforeEach(angular.mock.module('indexTable'));

    beforeEach(inject(function(_indexTableService_) {
      indexTableService = _indexTableService_;
      rawData = [
        {
          name: 'Bob',
          age: 50,
          location: 'Georgia'
        }, {
          name: 'Fred',
          age: 25,
          location: 'Florida'
        }, {
          name: 'Ted',
          age: 34,
          location: 'California'
        }
      ];
    }));

    it('should have a dummy test', function() {
      expect(true).toBe(true);
    });

    it('should be defined', function() {
      expect(indexTableService).toBeDefined();
    });

    describe('getPaginatedData method', function() {
      it('should be defined', function() {
        expect(indexTableService.getPaginatedData).toBeDefined();
      });

      it('should break arg1 array elements into arrays with length equal to arg2', function() {
        paginatedData = indexTableService.getPaginatedData(rawData, 1);
        expect(paginatedData[0].length).toEqual(1);
        expect(paginatedData[1].length).toEqual(1);
        expect(paginatedData[2].length).toEqual(1);
      });

      it('should output last array with less elements than arg2', function() {
        paginatedData = indexTableService.getPaginatedData(rawData, 2);
        expect(paginatedData[paginatedData.length - 1].length < 2).toBe(true);
        expect(paginatedData[paginatedData.length - 1].length).toEqual(1);
      });

      it('should return array containing empty array if arg1 is empty array', function() {
        paginatedData = indexTableService.getPaginatedData([], 5);
        expect(paginatedData).toEqual([[]]);
      });
    });

    it('should return array containing one array if arg1 length is <= arg2', function() {
      paginatedData = indexTableService.getPaginatedData(rawData, 3);
      expect(paginatedData.length).toEqual(1);
      paginatedData = indexTableService.getPaginatedData(rawData, 5);
      expect(paginatedData.length).toEqual(1);
    });

    describe('getSearchData method', function() {
      it('should be defined', function() {
        expect(indexTableService.getSearchData).toBeDefined();
      });

      it('should search arg1 for matches with arg3 based on properties in arg2 and return array', function() {
        var propertiesToSearch = ['name', 'age'];
        var searchedArray = indexTableService.getSearchData(rawData, propertiesToSearch, 'Bob');
        expect(searchedArray[0].name).toEqual('Bob');
        searchedArray = indexTableService.getSearchData(rawData, propertiesToSearch, 25);
        expect(searchedArray[0].age).toEqual(25);
      });

      it('should search without case sensitivity', function() {
        var propertiesToSearch = ['location'];
        var searchedArray = indexTableService.getSearchData(rawData, propertiesToSearch, 'georgia');
        expect(searchedArray[0].location).toEqual('Georgia');
      });

      it('should return empty array if no matches found', function() {
        var propertiesToSearch = ['name'];
        var searchedArray = indexTableService.getSearchData(rawData, propertiesToSearch, 'Mike');
        expect(searchedArray.length).toEqual(0);
      });
    });

    describe('getSortedData', function() {
      it('should be defined', function() {
        expect(indexTableService.getSortedData).toBeDefined();
      });

      it('should sort arg1 by property name in arg2 in direction of arg 3', function() {
        var reverse = false;
        var sortedArray = indexTableService.getSortedData(rawData, 'location', reverse);
        expect(sortedArray[0].location).toEqual('California');
        reverse = 1;
        sortedArray = indexTableService.getSortedData(rawData, 'location', reverse);
        expect(sortedArray[0].location).toEqual('Georgia');
      });

      it('should sort by numbers', function() {
        var reverse = true;
        var sortedArray = indexTableService.getSortedData(rawData, 'age', reverse);
        expect(sortedArray[0].age).toEqual(50);
      });
    });
  });
})();
