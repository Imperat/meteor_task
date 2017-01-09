Template.projectItem.helpers({
    isEditable: function(){
      if (Meteor.user()){
        return (this.ownerEMail === Meteor.user().emails[0].address)
      }
      return false;
    }
});
