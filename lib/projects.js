Projects = new Mongo.Collection('projects');
Clients = new Mongo.Collection('clients');

Projects.allow({
  update: ownsDocument,
  remove: ownsDocument
});

/* Functional for manage clients isn't
implemented. That's why we allow for all
users update, remove and insert clients */
Clients.allow({
  update: function(id){return true},
  remove: function(id){return true},
  insert: function(id){return true}
});

Meteor.methods({
  projectInsert: function(projectAttributes) {
    check(Meteor.userId(), String);
    check(projectAttributes, {
      name: String,
      client: String,
      cost: Number
    });
    var user = Meteor.user();
    var currentNumber = Projects.findOne({},{sort:{number:-1}}).number || 1;
    var project = _.extend(projectAttributes, {
      managerId: user._id,
      ownerEMail: user.emails[0].address,
      submitted: new Date(),
      number: currentNumber + 1
    });
    var projectId = Projects.insert(project);
    return {
      _id: projectId
    };
  }
});
