(function() {
  'use strict';

  describe('Core Constants', function() {
    var apiUrl;

    beforeEach(angular.mock.module('core'));

    beforeEach(inject(function(_apiUrl_) {
      apiUrl = _apiUrl_;
    }));

    it('has a dummy test', function() {
      expect(true).toBe(true);
    });

    describe('apiUrl', function() {
      it('apiUrl is defined', function() {
        expect(apiUrl).toBeDefined();
        expect(apiUrl).not.toBeNull();
      });

      it('apiUrl is a function', function() {
        expect(typeof apiUrl).toEqual('string');
      });

      // match api.payscaperegistration.com for development
      // OR registration-api.dev.payscape.com for production
      it('apiUrl returns correct url', function() {
        expect(apiUrl).toEqual(jasmine.stringMatching(
          /^http(s)?:\/\/(api\.payscaperegistration\.com|registration-api.dev.payscape.com)$/
        ));
      });
    });
  });
})();
