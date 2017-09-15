import * as types from '../mutation-types.js'
import router from '@/router'
import { Parse, axios } from '@/service/index'
import store from '@/store'
import { acquire_qrcode_url } from '@/service/apis'

var Channel = Parse.Object.extend("Channel")
var App = Parse.Object.extend("App")
const state = {
    current_channel: {},
    qrcode_url: ''
}

const getters = {}

const actions = {
    login({ commit }, user_data) {
        // Insert your own login methods
    },
    logout({ commit }) {
        commit('LOG_OUT')
    },
    createChannel({ commit }, payload) {
        var channelName = payload.channelName
        var userid = payload.secret
        var query = new Parse.Query(Parse.User)
        query.equalTo("objectId", userid)
        query.find({
            success: function(user_result) {
                if (user_result.length != 0) {
                    var app = new App()
                    app.set('objectId', '9FDEfuTrGZ')
                    var channel = new Channel()
                    channel.set('name', channelName)
                    channel.set('app', app)
                    channel.save(null, {
                        success: function(result) {
                            commit(types.CREATE_CHANNEL, result.toJSON())
                        }
                    })
                }
            },
        })
    },
    acquireQrcode({ commit }) {
        var channelId = store.state.user.current_channel.objectId
        axios.post(acquire_qrcode_url, {
            channelId: channelId
        }).then(function(result) {
            console.log(result)
            commit(types.ACQUIRE_QRCODE, result.data.result)
        })
    }
}

const mutations = {
    [types.CREATE_CHANNEL](state, current_channel) {
        state.current_channel = current_channel
        store.dispatch('acquireQrcode')
    },
    [types.ACQUIRE_QRCODE](state, qrcode_url) {
        state.qrcode_url = qrcode_url
    }
}
export default {
    state,
    getters,
    actions,
    mutations,
}