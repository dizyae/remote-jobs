(function() {
  'use strict';

  describe('Index Table Controller tests', function() {
    var ctrl;
    var config;
    var tableFilter;
    var $state;
    var indexTableService;
    var bindingsChanges;

    beforeEach(angular.mock.module('indexTable'));

    beforeEach(inject(function(_$componentController_) {
      config = {
        header: 'Test',
        fields: 'test',
        data: [{test: 'test'}],
        detailState: 'some.state'
      };
      bindingsChanges = {
        tableFilter: {}
      };
      $state = jasmine.createSpyObj('$state', ['go']);
      indexTableService = jasmine.createSpyObj('indexTableService', [
        'getPaginatedData',
        'getSearchData',
        'getSortedData'
      ]);
      indexTableService.getPaginatedData.and.returnValue([[{pagindated: 'data'}]]);
      indexTableService.getSearchData.and.returnValue([{searched: 'data'}]);
      indexTableService.getSortedData.and.returnValue([{sorted: 'data'}]);
      ctrl = _$componentController_('psaIndexTable', {
        $state: $state,
        indexTableService: indexTableService
      }, {
        config: config,
        tableFilter: tableFilter
      });
    }));

    beforeEach(function() {
      ctrl.$onChanges(bindingsChanges);
    });

    it('has a dummy test', function() {
      expect(true).toBe(true);
    });

    it('should be defined', function() {
      expect(ctrl).toBeDefined();
    });

    describe('initialization', function() {
      it('should define and set currentData model to config.data binding', function() {
        expect(ctrl.currentData).toBeDefined();
        expect(ctrl.currentData).toEqual(ctrl.config.data);
      });

      it('should define and set limit model to 5', function() {
        expect(ctrl.limit).toBeDefined();
        expect(ctrl.limit).toEqual(5);
      });

      it('should define and set currentPage model to 1', function() {
        expect(ctrl.currentPage).toBeDefined();
        expect(ctrl.currentPage).toEqual(1);
      });

      it('should define and set limitOptions model to array', function() {
        expect(ctrl.limitOptions).toBeDefined();
        expect(ctrl.limitOptions).toEqual([5, 10, 25, 50]);
      });
    });

    describe('sortTable model method', function() {
      it('should be defined', function() {
        expect(ctrl.sortTable).toBeDefined();
      });

      it('should call indexTableService.getSortedData', function() {
        ctrl.sortTable();
        expect(indexTableService.getSortedData).toHaveBeenCalled();
      });

      it('should change value of currentData model', function() {
        expect(ctrl.currentData).toEqual(ctrl.config.data);
        ctrl.sortTable();
        expect(ctrl.currentData).not.toEqual(ctrl.config.data);
        expect(ctrl.currentData).toEqual([{sorted: 'data'}]);
      });
    });

    describe('$onChanges hook', function() {
      beforeEach(function() {
        bindingsChanges = {
          tableFilter: {
            currentValue: true
          }
        };
      });

      it('should be defined', function() {
        expect(ctrl.$onChanges).toBeDefined();
      });

      it('should call indexTableService.getSearchData', function() {
        ctrl.$onChanges(bindingsChanges);
        expect(indexTableService.getSearchData).toHaveBeenCalled();
      });

      it('should call setPage method', function() {
        spyOn(ctrl, 'setPage');
        ctrl.$onChanges(bindingsChanges);
        expect(ctrl.setPage).toHaveBeenCalled();
      });

      it('should change value of currentData model', function() {
        expect(ctrl.currentData).toEqual(ctrl.config.data);
        ctrl.$onChanges(bindingsChanges);
        expect(ctrl.currentData).not.toEqual(ctrl.config.data);
        expect(ctrl.currentData).toEqual([{searched: 'data'}]);
      });

      it('should reset the value of currentData model to initialization value', function() {
        delete bindingsChanges.tableFilter.currentValue;
        expect(ctrl.currentData).toEqual(ctrl.config.data);
        ctrl.currentData = [{someNew: 'data'}];
        ctrl.$onChanges(bindingsChanges);
        expect(ctrl.currentData).toEqual(ctrl.config.data);
      });
    });

    describe('setPage model method', function() {
      it('should be defined', function() {
        expect(ctrl.setPage).toBeDefined();
      });

      it('should call indexTableService.getPaginatedData', function() {
        ctrl.setPage();
        expect(indexTableService.getPaginatedData).toHaveBeenCalled();
      });
    });

    describe('goToDetails model method', function() {
      it('should be defined', function() {
        expect(ctrl.goToDetails).toBeDefined();
      });

      it('should call $state.go', function() {
        ctrl.goToDetails({some: 'data'});
        expect($state.go).toHaveBeenCalledWith('some.state', {details: {some: 'data'}});
      });
    });
  });
})();
