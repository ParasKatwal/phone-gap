$(document).on("click", ".toggle_login", function () {
    var panel = $(this).closest("#login_panel");
    panel.removeClass("show_login show_signup show_forgot");

    if ($(this).hasClass("show_login_panel")) {
        panel.addClass("show_login");
    } else if ($(this).hasClass("show_forgot_panel")) {
        panel.addClass("show_forgot");
    } else if ($(this).hasClass("show_signup_panel")) {
        panel.addClass("show_signup");
    }
});

$(document).on(
    "click",
    ".commit_login, .commit_forgot, .commit_signup",
    function () {
        var form = $(this).closest("form");

        var email = form.find('input[type="email"]');
        var username = form.find('input[type="username"]');
        var password = form.find('input[type="password"]');
        var fail = false;

        if (!$(this).hasClass("commit_forgot")) {
            // email
            if (
                email != undefined &&
                email.length &&
                !email
                    .val()
                    .match(
                        /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim
                    )
            ) {
                email.addClass("input_invalid");
                email
                    .closest(".form-group")
                    .find(".help-block")
                    .removeClass("hidden");
                fail = true;
            }

            // username
            if (
                username != undefined &&
                username.length &&
                username.val() == ""
            ) {
                username.addClass("input_invalid");
                username
                    .closest(".form-group")
                    .find(".help-block")
                    .removeClass("hidden");
                fail = true;
            }

            // password
            if (
                password != undefined &&
                password.length &&
                !password
                    .val()
                    .match(
                        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/
                    )
            ) {
                password.addClass("input_invalid");
                password
                    .closest(".form-group")
                    .find(".help-block")
                    .removeClass("hidden");
                fail = true;
            }
        } else {
            if (
                email != undefined &&
                email.val() == "" &&
                username != undefined &&
                username.val() == ""
            ) {
                email.addClass("input_invalid");
                username.addClass("input_invalid");
                email
                    .closest(".form-group")
                    .find(".help-block")
                    .removeClass("hidden");
                username
                    .closest(".form-group")
                    .find(".help-block")
                    .removeClass("hidden");
                fail = true;
            }
        }

        if ($(this).hasClass("commit_signup") && !fail) {
            swal.fire({
                html:
                    "<h4>Thanks for Registering!</h4><h5>We have sent you an email to verify who you are.</h5>",
            });
        }
    }
);

$(document).on("keyup change input", "input", function () {
    $(this).removeClass("input_invalid");
    $(this).closest(".form-group").find(".help-block").addClass("hidden");
});

$(document).ready(function () {
    $("#file-upload").change(function () {
        var filepath = this.value;
        var m = filepath.match(/([^\/\\]+)$/);
        var filename = m[1];
        $("#filename").html(filename);
    });
});
