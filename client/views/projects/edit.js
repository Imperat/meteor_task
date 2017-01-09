Template.projectEdit.helpers({
  'clients': function(){
    Meteor.subscribe('clients');
    return Clients.find({});
  }
});

Template.projectEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentProjectId = this._id;

    var projectProperties = {
      name: $(e.target).find('[name=name]').val(),
      client: $(e.target).find('[name=client]').val(),
      cost: parseFloat($(e.target).find('[name=cost]').val())
    }

    Projects.update(currentProjectId, {$set: projectProperties}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        Router.go('projectList');
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentProjectId = this._id;
      Projects.remove(currentProjectId, function(error) {
        alert(error.reason);
      });
      Router.go('projectList');
    }
  }
});
