loggerService.$inject = ['$log'];

// This code is organized according to the Revealing Module Pattern
export function loggerService($log) {
  // First, show the service object, at the top of the code
  var service = {
    // Custom wrappers around $log.error, $log.info, and $log.warn
    error: error,
    info: info,
    warn: warn,

    // 'log' and 'debug' are just the ordinary Angular $log.log and $log.debug functions
    debug: $log.debug,
    log: $log.log
  };

  return service;

  // Public/Callable Members ////////////////////////////////////////////////////////////////////////////

  // Secondly, expose callable/public members at the top of the function
  function error(message, data) {
    $log.error('Error: ' + message);
    $log.error(data);
  }

  function info(message, data) {
    $log.info('Info: ' + message);
    $log.info(data);
  }

  function warn(message, data) {
    $log.warn('warn: ' + message);
    $log.warn(data);
  }
  // Private/Non-Callable Members /////////////////////////////////////////////////////////////////////////
}
