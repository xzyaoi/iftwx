<template>
<v-app id="inspire">
    <v-navigation-drawer
      fixed
      clipped
      app
      v-model="drawer"
    >
      <v-list dense>
        <template v-for="(item, i) in items">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="i"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group v-else-if="item.children" v-model="item.model" no-action v-bind:key="i">
            <v-list-tile slot="item" @click="triggerChangePath(item.text)">
              <v-list-tile-action>
                <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click="triggerChangePath(child.text)"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else @click="triggerChangePath(item.text)" v-bind:key="i">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="blue darken-3"
      dark
      app
      clipped-left
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        助理君 | 后台管理
      </v-toolbar-title>
      <v-text-field
        solo
        prepend-icon="search"
        placeholder="Search"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img
            :src="current_user.headimgurl"
            :alt="current_user.nickName"
          >
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import router from '../router'
import user from '../store/modules/user'
import Vue from 'vue'
export default Vue.extend({
  name: 'app',
  data:()=>({
    current_user: user.state.current_user.toJSON(),
    dialog: false,
    drawer: true,
      items: [
        { icon: 'contacts', text: '总览' },
        { icon: 'history', text: '最常使用' },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: '频道',
          model: true,
          children: [
            { icon: 'add', text: '创建频道' },
            { icon: 'history', text: '我的频道' },
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: '更多',
          model: false,
          children: [
            { text: '导出' },
          ]
        },
        { icon: 'settings', text: '设置' },
        { icon: 'chat_bubble', text: '反馈意见' },
        { icon: 'help', text: '帮助' },
        { icon: 'phonelink', text: '关注' }]
  }),
  props: {
    source: String
  },
  methods:{
    triggerChangePath(contentText:string) {
      console.log(this.current_user)
      if(contentText === "反馈意见") {
        location.href="https://discord.gg/6BpzrDG"
      } else if (contentText === "我的频道") {
        router.push('/app/channel')
      } else if (contentText === "我的频道") {
        router.push('/app/channel/create')
      }
    }
  }
})
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
