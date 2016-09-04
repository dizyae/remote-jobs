/*
 * Testing $logProvider is tricky because it's only available in `.config()`
 * Because of this, it is necessary to create a dummy module, and, within the
 * dummy module's `.config()`, assign _$logProvider_ to a local variable.
 */
(function() {
  'use strict';

  describe('Core Config', function() {
    var $logProvider;

    beforeEach(angular.mock.module('core'));

    beforeEach(function() {
      // Configure the dummyModule in order to make $logProvider available for testing
      angular.module('mockModule', [])
        .config(function(_$logProvider_) {
          $logProvider = _$logProvider_;
        });
      // load the dummyModule
      angular.mock.module('mockModule');
      // Run the injector. It is `inject()`, not `config()`, that defines `$logProvider`
      inject();
    });

    // This block is a more terse, but less readable & intelligible, version of the above
    // beforeEach(function () {
    //   module(function (_$logProvider_) {
    //     $logProvider = _$logProvider_;
    //   });
    //   inject();
    // });

    it('have a dummy test', function() {
      expect(true).toBe(true);
    });

    it('should define $logProvider', function() {
      expect($logProvider).toBeDefined();
    });

    it('should enable debug level logins', function() {
      expect($logProvider.debugEnabled).toBe(true);
    });
  });
})();
