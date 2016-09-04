(function() {
  'use strict';

  describe('Core Routes', function() {
    var $state;
    var state;

    beforeEach(angular.mock.module('core'));

    beforeEach(inject(function(_$state_) {
      $state = _$state_;
    }));

    it('have a dummy test', function() {
      expect(true).toBe(true);
    });

    describe('404 state', function() {
      beforeEach(function() {
        state = $state.get('404');
      });

      it('should define a 404 state', function() {
        expect(state).toBeDefined();
      });

      it('should configure the /404 route', function() {
        expect(state.url).toEqual('/404');
      });

      it('should set state template', function() {
        expect(state.template).not.toBeNull();
      });
    });
  });
})();
