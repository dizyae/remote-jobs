/* Help configure the state-based ui.router */
routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

export function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);

  this.$get = RouterHelper;
  RouterHelper.$inject = ['$rootScope', '$state', 'logger'];

  function RouterHelper($rootScope, $state, logger) {
    var handlingStateChangeError = false;
    var hasOtherwise = false;

    var service = {
      configureStates: configureStates,
      getStates: getStates
    };

    handleRoutingErrors();

    return service;

    // Public Members
    function configureStates(states, otherwisePath) {
      states.forEach(function(state) {
        $stateProvider.state(state.state, state.config);
      });
      if (otherwisePath && !hasOtherwise) {
        hasOtherwise = true;
        $urlRouterProvider.otherwise(otherwisePath);
      }
    }

    function getStates() {
      return $state.get();
    }

    // Private Members
    function handleRoutingErrors() {
      // Route cancellation:
      // On routing error, go to the homepage.
      var deregisterStateChangeErrorListener = $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error) {
          if (handlingStateChangeError) {
            return;
          }
          handlingStateChangeError = true;
          var destination = determineDestination(toState);
          var message = setErrorMessage(destination, error);
          logger.warn(message, [toState]);
          $state.go('home');
        }
      );

      $rootScope.$on('$destroy', function() {
        deregisterStateChangeErrorListener();
      });

      function determineDestination(toState) {
        return (toState &&
          (toState.title || toState.name || toState.loadedTemplateUrl)) ||
          'unknown target';
      }

      function setErrorMessage(destination, error) {
        logger.error('Router error', error);
        return 'Error routing to ' + destination + '. ' +
          (error.data || '') + '. <br/>' + (error.statusText || '') +
          ': ' + (error.status || '');
      }
    }
  }
}
