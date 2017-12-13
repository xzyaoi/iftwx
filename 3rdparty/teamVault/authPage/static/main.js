/**
 * This file indicates functions used inside auth page
 * @author Xiaozhe Yao
 */

/**
 * 
 * Global Variables
 */
var socket = null
var sessId = null
var userId = null

Parse.initialize("zhulijun-app-id")
Parse.serverURL = 'https://cloud.yice.org.cn/zhulijun'

/**
 * Vault Based Backend Endpoints
 * It's Globally
 */

var base_url = 'http://127.0.0.1:5000/'
var auth_key_url = base_url + 'allowRequest'

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
function getUserInfo(userId) {
    var User = Parse.Object.extend("_User")
    var query = new Parse.Query(User)
    query.get(userId, {
        success: function(result) {
            var pojo_result = result.toJSON()
            document.getElementById('user_avatar').setAttribute("src", pojo_result.headimgurl)
            document.getElementById('apply_info').innerHTML = document.getElementById('apply_info').innerHTML.replace('{username}', pojo_result.nickName)
            document.getElementById('apply_by').innerHTML = document.getElementById('apply_by').innerHTML.replace('{username}', pojo_result.nickName)
        },
        error: function(error) {
            alert("网络错误")
        }
    })
}

/**
 * Prepare Connection
 * Load URL Params
 */
function beforeConnect() {
    userId = getUrlParam('userId')
    sessId = getUrlParam('sessId')
}


/**
 * 
 */
function initSocket() {
    if (socket === null) {
        socket = io.connect('http://localhost:5000')
        socket.on('connect', function(data) {
            console.log(data)
            socket.emit('message', { my: 'data' })
        });
    } else {
        console.warn('socket has been initialized.')
    }
}

function authPasskey() {
    $.ajax({
        type: "POST",
        url: auth_key_url,
        contentType: 'application/json',
        data: JSON.stringify({ 'sessId': sessId, 'userId': userId }),
        dataType: 'json',
        timeout: 300,
        success: function(data) {
            location.href = './success.html?userId=' + userId + '&sessId=' + sessId
        }
    })
}

function denyPasskey() {
    location.href = './success.html?userId=' + userId + '&sessId=' + sessId
}

function getOpenId() {
    var code = getUrlParam("")
}

function initWechat() {

}

function getRequestDetail(sessId) {
    var Request = Parse.Object.extend("Request")
    var query = new Parse.Query(Request)
    query.equalTo('sessId', sessId)
    query.include('channel')
    query.include('appliance')
    query.include('vault')
    query.first({
        success: function(result) {
            var pojo_result = result.toJSON()
            console.log(pojo_result)
            document.getElementById('apply_info').innerHTML = document.getElementById('apply_info').innerHTML.replace('{username}', pojo_result.appliance.nickName)
            document.getElementById('apply_by').innerHTML = document.getElementById('apply_by').innerHTML.replace('{username}', pojo_result.appliance.nickName)
            document.getElementById('apply_info').innerHTML = document.getElementById('apply_info').innerHTML.replace('{secretName}', pojo_result.secretName)
            document.getElementById('acc_info').innerHTML = document.getElementById('acc_info').innerHTML.replace('{channelName}', pojo_result.channel.name)
            document.getElementById('acc_info').innerHTML = document.getElementById('acc_info').innerHTML.replace('{vaultName}', pojo_result.vault.name)
        },
        error: function(error) {
            alert("网络错误")
        }
    })
}

function validationUser(urlUserId, applianceId) {
    if (urlUserId === applianceId) {
        return true
    } else {
        return false
    }
}

function bootstrap() {
    /**
     * Init Wechat
     */
    initWechat()
        /**
         * Init Socket
         */
        //initSocket()
        /**
         * Parsing Parameters
         */
    beforeConnect()
        /**
         * Retriving User info
         */
    getUserInfo(userId)
        /**
         * Retriving Request info
         */
    getRequestDetail(sessId)
}