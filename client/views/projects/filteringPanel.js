Template.filteringPanel.events({
    'click .js-filter': function (event){
      event.preventDefault();
      var field = $('.filter-field').val();
      var filterFor = $('.filter-for').val();
      var projectsLimit = Router.current().params.projectsLimit;
      var queryString = updateQueryStringByFilter(Router.current().params.query, field, filterFor);
      Router.go('projectList', {projectsLimit: projectsLimit}, {query: queryString});
    },
    'click .js-clear-filter': function(event){
      event.preventDefault();
      $('.filter-for').val('');
      var projectsLimit = Router.current().params.projectsLimit;
      var queryString = removeFiltersFromQueryString(Router.current().params.query);
      Router.go('projectList', {projectsLimit: projectsLimit}, {query: queryString});
    }
});
