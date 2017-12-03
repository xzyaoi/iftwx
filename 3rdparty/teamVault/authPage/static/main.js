function getRequestUrl(endpoint) {
    var base = 'https://cloud.yice.org.cn/zhulijun/classes/'
    return base + endpoint
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function getUserInfo() {
    var userid = getUrlParam('userid')
    $.ajax({
        type: 'GET',
        url: getRequestUrl('_User') + '/' + getUrlParam('userid'),
        headers: {
            'X-Parse-Application-Id': 'zhulijun-app-id'
        },
        dataType: 'json',
        success: function(data) {
            console.log(data)
            document.getElementById('user_avatar').setAttribute("src", data.headimgurl)
            document.getElementById('apply_info').innerHTML = document.getElementById('apply_info').innerHTML.replace('{username}', data.nickName)
            document.getElementById('apply_by').innerHTML = document.getElementById('apply_by').innerHTML.replace('{username}', data.nickName)
        },
        error: function(xhr, type) {
            alert('Ajax error!')
        }
    })
}