Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
});

ProjectsListController = RouteController.extend({

  template: 'projectList',
  increment: 5,
  limit: function(){
    return parseInt(this.params.projectsLimit) || this.increment;
  },
  sort_by: function(){
    var sort_by = this.params.query.sort_by;
    var positive_ord = 1;
    if (sort_by !== undefined){
      if (sort_by[0] === '-'){
        positive_ord = -1;
        sort_by = sort_by.substring(1);
      }
      return {
        sort_by: sort_by,
        positive_ord: positive_ord
      }
    };
    return {
      sort_by: "number",
      positive_ord: 1
    }
  },
  filter: function(){
    var filterKey= '', filterValue = '';
    if (this.params.query.name !== undefined){
      filterKey = 'name';
      filterValue = this.params.query.name;
    }
    if (this.params.query.client !== undefined){
      filterKey = 'client';
      filterValue = this.params.query.client;
    }
    if (this.params.query.ownerEMail !== undefined){
      filterKey = 'ownerEMail';
      filterValue = this.params.query.ownerEMail;
    }
    return {
      filterKey: filterKey,
      filterValue: filterValue
    }

  },
  subscriptions: function() {
    filterParams = this.filter();
    this.projectsSub = Meteor.subscribe('projects', this.limit(), this.filter());
  },
  projects: function(){
    sortParams = this.sort_by();
    return Projects.find({}, {sort: {[sortParams.sort_by]: sortParams.positive_ord}});
  },
  data: function(){
    var hasMore = this.projects().fetch().length == this.limit();
    var nextPath = this.route.path({projectsLimit: this.limit() + this.increment}, {query: this.params.query});
    return {
      projects: this.projects(),
      ready: this.projectsSub.ready,
      nextPath: hasMore ? nextPath : null
    };
  }
});

Router.map(function() {
  this.route('login', {path: '/login'});
  this.route('signUp',{path: '/signup'});
  this.route('submit', {
    path: '/create',
    waitOn: function() { return Meteor.subscribe('clients') },
    data: function() { return {clients: Clients.find() } }
  });
  this.route('projectEdit', {
    path: '/projects/:_id/edit',
    waitOn: function() {return Meteor.subscribe('singleProject', this.params._id) },
    data: function() { return Projects.findOne(this.params._id) }
  });
  this.route('projectList', {
    path: '/:projectsLimit?',
    controller: ProjectsListController
  });
});

Router.onBeforeAction('loading');

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireLogin, {only: 'submit'});
Router.onBeforeAction(requireLogin, {only: 'projectEdit'});
