IndexTableController.$inject = ['logger', '$http'];

export function IndexTableController(logger, $http) {
  var vm = this;
  vm.jobs = [];
  vm.tags = ['php', 'javascript', 'angularjs'];

  activate();

  function activate() {
    $http.get('http://localhost/jobs/')
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
