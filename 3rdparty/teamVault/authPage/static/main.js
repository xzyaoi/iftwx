/**
 * 
 * Global Variables
 */
var socket = null

/**
 * @param {string} endpoint
 */
function getRequestUrl(endpoint) {
    var base = 'https://cloud.yice.org.cn/zhulijun/classes/'
    return base + endpoint
}

/**
 * 
 * @param {*} name 
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
}

/**
 * 
 */
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
            console.log(xhr)
            console.log(type)
        }
    })
}

/**
 * 
 */
function initSocket() {
    if (socket === null) {
        socket = io.connect('http://localhost:8080')
        socket.on('connect', function(data) {
            console.log(data)
            socket.emit('message', { my: 'data' })
        });
    } else {
        console.warn('socket has been initialized.')
    }
}

function authPasskey() {
    if (socket === null) {
        console.error('socket has not been initialized.')
        return;
    }
    socket.emit('auth_success', { data: '123' })
}

function denyPasskey() {
    if (socket === null) {
        console.error('socket has not been initialized.')
        return;
    }
    socket.emit('auth_denied', { data: '123' })
}