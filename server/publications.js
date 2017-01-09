Meteor.publish('projects', function(limit, filterParams) {
  check(limit, Number);
  check(filterParams, {filterKey: String, filterValue: String});
  if (filterParams.filterKey === ''){
    return Projects.find({}, {limit:limit});
  }
  return Projects.find({[filterParams.filterKey]: filterParams.filterValue}, {limit:limit});
});

Meteor.publish('singleProject', function(id) {
  check(id, String);
  return id && Projects.find(id);
});

Meteor.publish('clients', function() {
  return Clients.find({});
});
