$(document).ready(function () {
    $("input").keydown(function (keyEvent) {
        if (keyEvent.keyCode == 13) {
            submit();
        }
    });

    $("#login").click(function () {
        submit();
    })
});

function submit() {
    var a = $("#username").val().trim();
    var b = $("#password").val().trim();
    // $.post("/api_v1/v1/login",
    //     {
    //         username: a,
    //         password: b,
    //         grant_type: 'password'
    //     }, function (data, status) {
    //     })
    //     .error(function (data, status) {
    //         alert(data + status);
    //     });
//todo 验证
    $.ajax({
        url: '/api_v1/v1/login',
        type: 'POST',
        data: {
            username: a,
            password: b,
            grant_type: 'web'
        },
        success: function (res) {
            //rounded
            Materialize.toast('登录成功', 2000, '', function () {
                window.location.href='/'
            })
        },
        error: function (err) {
            Materialize.toast(err.responseJSON.msg, 4000);
        }
    });
}
