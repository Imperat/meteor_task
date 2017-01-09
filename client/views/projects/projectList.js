Template.projectList.events({
  'click .js-sorted-column': function (event){
    event.preventDefault();
    var $column = $(event.currentTarget);
    var field = $column.data('field');
    var projectsLimit = Router.current().params.projectsLimit;
    var currentSorted = $column.data('sorted');
    if (currentSorted){
      field = '-' + field;
    }
    $column.data('sorted', !currentSorted);
    var queryString = updateQueryStringBySort(Router.current().params.query, field);
    Router.go('projectList', {projectsLimit: projectsLimit}, {query: queryString});
  }
});
