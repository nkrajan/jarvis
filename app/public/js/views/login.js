$(document).ready(function(){

    /** Validate the signin-form **/
    $('#signin-form').validate();

    /** Validate the register-form **/
    $('#register-form').validate();

    /** help-inline**/
    $('#email').focus(function() {
        $(".help-inline").remove();
    });
});