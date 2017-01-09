Template.Login.events({
  'submit .login-form': function (event, template) {
    event.preventDefault();

    var $form = $(event.currentTarget);
    var $emailInput = $form.find('.email-address-input').eq(0);
    var $passwordInput = $form.find('.password-input').eq(0);

    var emailAddress = $emailInput.val() || '';
    var password = $passwordInput.val() || '';

    //trim
    emailAddress = emailAddress.replace(/^\s*|\s*$/g, '');
    password = password.replace(/^\s*|\s*$/g, '');

    //validate
    var isValidEmail = checkEmailIsValid(emailAddress);
    var isValidPassword = checkPasswordIsValid(password);

    if (!isValidEmail || !isValidPassword) {
      if (!isValidEmail) {
        $form.find('#form-message').show();
        $form.find('#form-message').text('Invalid email address');
      }
      if (!isValidPassword) {
        $form.find('#form-message').show();
        $form.find('#form-message').text('Invalid password');
      }
    } else {
      Meteor.loginWithPassword(emailAddress, password, function (error) {
        if (error) {
          $form.find('#form-message').show();
          $form.find('#form-message').text('Yor credentials are incorrect');
        } else {
          Router.go('projectList');
        }
      });
    }
  }
});
