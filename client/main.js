import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.layout.events({
  "click .js-logout": function(event) {
        event.preventDefault();
        Meteor.logout();
  },
});
