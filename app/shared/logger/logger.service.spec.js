(function() {
  'use strict';

  describe('logger', function() {
    var $log;
    var logger;
    var mockData;
    var mockMessage;

    beforeEach(angular.mock.module('logger'));

    beforeEach(inject(function(_logger_, _$log_) {
      $log = _$log_;
      logger = _logger_;
      mockData = {};
      mockMessage = 'foo';
    }));

    afterEach(function() {
      $log.reset();
    });

    it('have a dummy test', function() {
      expect(true).toBe(true);
    });

    it('defines five functions', function() {
      expect(logger.error).toBeDefined();
      expect(logger.error).not.toBeNull();
      expect(logger.info).toBeDefined();
      expect(logger.info).not.toBeNull();
      expect(logger.warn).toBeDefined();
      expect(logger.warn).not.toBeNull();
      expect(logger.debug).toBeDefined();
      expect(logger.debug).not.toBeNull();
      expect(logger.log).toBeDefined();
      expect(logger.log).not.toBeNull();
    });

    it('calls error()', function() {
      spyOn(logger, 'error');
      logger.error(mockMessage, mockData);
      expect(logger.error).toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalledWith(mockMessage, mockData);
    });

    it('logs the error message', function() {
      logger.error(mockMessage, mockData);
      expect($log.error.logs).toEqual(jasmine.stringMatching(mockMessage));
    });

    it('calls info()', function() {
      spyOn(logger, 'info');
      logger.info(mockMessage, mockData);
      expect(logger.info).toHaveBeenCalled();
      expect(logger.info).toHaveBeenCalledWith(mockMessage, mockData);
    });

    it('logs the info message', function() {
      logger.info(mockMessage, mockData);
      expect($log.info.logs).toEqual(jasmine.stringMatching('foo'));
    });

    it('calls warn()', function() {
      spyOn(logger, 'warn');
      logger.warn(mockMessage, mockData);
      expect(logger.warn).toHaveBeenCalled();
      expect(logger.warn).toHaveBeenCalledWith(mockMessage, mockData);
    });

    it('logs the warn message', function() {
      logger.warn(mockMessage, mockData);
      expect($log.warn.logs).toEqual(jasmine.stringMatching('foo'));
    });

    it('calls debug()', function() {
      spyOn(logger, 'debug');
      logger.debug(mockMessage, mockData);
      expect(logger.debug).toHaveBeenCalled();
      expect(logger.debug).toHaveBeenCalledWith(mockMessage, mockData);
    });

    it('logs the debug message', function() {
      logger.debug(mockMessage, mockData);
      expect($log.debug.logs).toEqual(jasmine.stringMatching('foo'));
    });

    it('calls log()', function() {
      spyOn(logger, 'log');
      logger.log(mockMessage, mockData);
      expect(logger.log).toHaveBeenCalled();
      expect(logger.log).toHaveBeenCalledWith(mockMessage, mockData);
    });

    it('logs the log message', function() {
      logger.log(mockMessage, mockData);
      expect($log.log.logs).toEqual(jasmine.stringMatching('foo'));
    });
  });
})();
