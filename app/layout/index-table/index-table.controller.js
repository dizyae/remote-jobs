IndexTableController.$inject = ['logger', '$http', '$window'];

export function IndexTableController(logger, $http, $window) {
  var vm = this;
  vm.jobs = [];
  vm.tags = ['php', 'javascript', 'angularjs'];
  vm.gotoJob = function(url) {
    $window.open(url, '_blank');
  };

  activate();

  function activate() {
    $http.get('http://dustinweaver.com/jobs/remote-jobs.php')
      .then(filterJobs)
      .catch(function(error) {
        logger.error('XHR failed to get remoteok listings', error);
      });
  }

  function filterJobs(response) {
    response.data.forEach(function(job) {
      if (checkForTags(job.tags)) {
        vm.jobs.push(job);
      }
    });
  }

  function checkForTags(jobTags) {
    if (!jobTags) {
      return false;
    }
    return vm.tags.some(function(tag) {
      return jobTags.indexOf(tag) >= 0;
    });
  }
}
