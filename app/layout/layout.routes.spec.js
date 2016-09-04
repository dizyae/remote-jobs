(function() {
  'use strict';

  describe('Layout Routes', function() {
    var $state;
    var state;

    beforeEach(angular.mock.module('layout'));
    beforeEach(angular.mock.module('router'));

    beforeEach(inject(function(_$state_) {
      $state = _$state_;
    }));

    it('have a dummy test', function() {
      expect(true).toBe(true);
    });

    describe('404 state', function() {
      beforeEach(function() {
        state = $state.get('home');
      });

      it('should define a home state', function() {
        expect(state).toBeDefined();
      });

      it('should configure the home route to /', function() {
        expect(state.url).toEqual('/');
      });
    });
  });
})();
