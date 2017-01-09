Template.submit.events({
  'submit form': function(e) {
    e.preventDefault();
    var project = {
      name: $(e.target).find('[name=name]').val(),
      client: $(e.target).find('[name=client]').val(),
      cost: parseFloat($(e.target).find('[name=cost]').val()),
    };

    Meteor.call('projectInsert', project, function(error, result) {
      if (error)
        return alert(error.reason);
      Router.go('projectList');
    });

    Router.go('projectList');
  }
});
