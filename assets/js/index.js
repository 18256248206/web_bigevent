$(function() {
    //调用getUserInfo()获取用户基本信息
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            //do something
            console.log('ok');

            // 1.清空本地存储的token数据
            localStorage.removeItem('token')
                // 2.重新跳转login页面
            location.href = '/login.html'
        });
    })
})

//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败了！')
                }
                renderAvatar(res.data)
            }
            // complete: function(res) {
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败') {
            //         // 1.强制清空token
            //         localStorage.removeItem('token')
            //             // 2.强制跳转到登录页面
            //         location.href = '/login.html'
            //     }
            // }
    })
}


//渲染用户头像
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
            // 把用户名称第一个字符转换为大写的
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}