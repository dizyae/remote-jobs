JobsController.$inject = ['logger', '$http', '$window', '$filter'];

export function JobsController(logger, $http, $window, $filter) {
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
        job.tags = job.tags.join(', ');
        job.date = $filter('date')(job.date, 'MM/dd/yy hh:mm a');
        vm.jobs.push(job);
      }
    });
    setTableConfig(vm.jobs);
  }

  function setTableConfig(data) {
    vm.tableConfig = {
      headers: [
        'Post Date',
        'Company',
        'Position',
        'Tags'
      ],
      fields: [
        'date',
        'company',
        'position',
        'tags'
      ],
      data: data,
      detailState: 'home.jobDetails'
    };
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
