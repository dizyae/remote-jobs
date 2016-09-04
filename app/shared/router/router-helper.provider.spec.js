(function() {
  'use strict';

  describe('RouterHelper', function() {
    var $locationProvider;
    var $log;
    var $rootScope;
    var $state;
    var $stateProvider;
    var $urlRouterProvider;
    var getStatesMock;
    var mockRoutes;
    var routerHelper;

    beforeEach(angular.mock.module('router'));
    beforeEach(angular.mock.module('customMocks'));

    beforeEach(function() {
      angular.module('mockModuleWithRoutes', [])
        .run(function(_mockRoutes_, _routerHelper_) {
          mockRoutes = _mockRoutes_;
          routerHelper = _routerHelper_;
          routerHelper.configureStates(mockRoutes());
        });

      angular.module('mockModuleWithOutRoutes', [])
        .config(function(_$locationProvider_, _$stateProvider_, _$urlRouterProvider_) {
          $locationProvider = _$locationProvider_;
          $stateProvider = _$stateProvider_;
          $urlRouterProvider = _$urlRouterProvider_;
        });

      angular.mock.module('mockModuleWithOutRoutes');
      angular.mock.module('mockModuleWithRoutes');
      inject();
    });

    beforeEach(function() {
      getStatesMock = function getStatesMock(state, url) {
        return [{
          state: state,
          config: {
            url: url
          }
        }];
      };
    });

    beforeEach(inject(function(_$log_, _$rootScope_, _$state_) {
      $log = _$log_;
      $rootScope = _$rootScope_;
      $state = _$state_;
    }));

    it('should have a dummy test', function() {
      expect(true).toBe(true);
    });

    it('defines routerHelper', function() {
      expect(routerHelper).toBeDefined();
    });

    describe('routerHelper public functions', function() {
      it('has a configureStates function', function() {
        expect(routerHelper.configureStates).toBeDefined();
      });

      it('calls the configureStates function', function() {
        spyOn(routerHelper, 'configureStates');
        routerHelper.configureStates(getStatesMock('bar'));
        expect(routerHelper.configureStates).toHaveBeenCalled();
      });

      it('has a getStates function', function() {
        expect(routerHelper.getStates).toBeDefined();
      });

      it('calls the getStates function', function() {
        spyOn(routerHelper, 'getStates');
        routerHelper.getStates();
        expect(routerHelper.getStates).toHaveBeenCalled();
      });

      it('should call $state.get when getStates() is called', function() {
        spyOn($state, 'get');
        routerHelper.getStates();
        expect($state.get).toHaveBeenCalled();
      });
    });

    describe('routerHelper injected providers', function() {
      it('should activate html5Mode', function() {
        expect($locationProvider.html5Mode().enabled).toBe(true);
      });

      it('calls otherwise() when passed an otherwisePath', function() {
        spyOn($urlRouterProvider, 'otherwise');
        routerHelper.configureStates(getStatesMock('foobar'), '/foobar');
        expect($urlRouterProvider.otherwise).toHaveBeenCalled();
      });

      it('does not call otherwise() when not passed an otherwisePath', function() {
        spyOn($urlRouterProvider, 'otherwise');
        routerHelper.configureStates(getStatesMock('none'));
        expect($urlRouterProvider.otherwise).not.toHaveBeenCalled();
      });

      it('should call $stateProvider.state()', function() {
        spyOn($stateProvider, 'state');
        routerHelper.configureStates(getStatesMock('mock', '/mock'));
        expect($stateProvider.state).toHaveBeenCalled();
        expect($stateProvider.state).toHaveBeenCalledWith('mock', {
          url: '/mock'
        });
      });
    });

    describe('routerHelper private functions', function() {
      it('should call $state.get()', function() {
        spyOn($state, 'get');
        routerHelper.getStates();
        expect($state.get).toHaveBeenCalled();
      });

      it('should routing correctly', function() {
        $state.go('daffy');
        expect($state.href('daffy')).toEqual('/daffy');
        expect(true).toBe(true);
      });
    });

    describe('handleStateChangeError', function() {
      it('can handle a routing error', function() {
        $rootScope.$emit('$stateChangeError', 'event', 'toState', 'toParams', 'fromState', 'fromParams', 'error');
        $rootScope.$digest();
        expect($state.current.name).toBe('home');
      });

      it('can handle two errors in a row', function() {
        $rootScope.$emit('$stateChangeError', 'event', 'toState', 'toParams', 'fromState', 'fromParams', 'error');
        $rootScope.$emit('$stateChangeError', 'event', 'toState', 'toParams', 'fromState', 'fromParams', 'error');
        $rootScope.$digest();
        expect($state.current.name).toBe('home');
      });

      it('sets an error message', function() {
        $rootScope.$emit('$stateChangeError', 'event', 'toState', 'toParams', 'fromState', 'fromParams', 'error');
        $rootScope.$digest();
        expect($log.error.logs).toEqual(jasmine.stringMatching('Router error'));
      });
    });
  });
})();
