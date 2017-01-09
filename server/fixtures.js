/* It can be helpful to have test data
for empty database, when application
run at first time */

if ( Meteor.users.find().count() === 0 ) {
    Accounts.createUser({
        username: 'username',
        email: 'leliykin@gmail.com',
          password: 'asdfasdf',
        profile: {
            first_name: 'fname',
            last_name: 'lname',
            company: 'company'
        }
    });
}

user_id = Meteor.users.findOne({username: 'username'})._id


if (Projects.find().count() === 0) {
  Projects.insert({
    number: 1,
    name: 'Test Project 1',
    client: 'Apple',
    cost: 33.23,
    submitted: new Date(),
    ownerEMail: 'leliykin@gmail.com',
    managerId: user_id
  });

  Projects.insert({
    number: 2,
    name: 'Test Project 2',
    client: 'Apple',
    cost: 22.22,
    submitted: new Date(),
    ownerEMail: 'leliykin@gmail.com',
    managerId: user_id
  });

  Projects.insert({
    number: 3,
    name: 'Test Project 3',
    client: 'Apple',
    cost: 99.99,
    submitted: new Date(),
    ownerEMail: 'leliykin@gmail.com',
    managerId: user_id
  });

  Projects.insert({
    number: 4,
    name: 'Awesome test project 4',
    client: 'Apple',
    cost: 54,
    submitted: new Date(),
    ownerEMail: 'leliykin@gmail.com',
    managerId: user_id
  });

  Projects.insert({
    number: 5,
    name: 'Awesome test project 5',
    client: 'Microsoft',
    cost: 102,
    submitted: new Date(),
    ownerEMail: 'leliykin@gmail.com',
    managerId: user_id
  });

  Projects.insert({
    number: 6,
    name: 'Project 6',
    client: 'IBM',
    cost: 999.99,
    submitted: new Date(),
    ownerEMail: 'leliykin@gmail.com',
    managerId: user_id
  });

  Projects.insert({
    number: 7,
    name: 'Project 7',
    client: 'IBM',
    cost: 99.34,
    submitted: new Date(),
    ownerEMail: 'leliykin@gmail.com',
    managerId: user_id
  });
}

if (Clients.find().count() === 0) {
  Clients.insert({
    name: 'Apple'
  });

  Clients.insert({
    name: 'Microsoft'
  });

  Clients.insert({
    name: 'IBM'
  });
}
