<template>
  <view class="page flex-column">
    <view class="profile-card-wrapper flex-row" @tap="onProfileTap">
      <view class="card flex-row">
        <AtAvatar circle image="https://z3.ax1x.com/2021/04/10/cULbFS.jpg"/>
        <text class="name">{{ name }}</text>
      </view>
    </view>

    <view class="setting-items flex-column">
      <view v-for="item in settings" :key="item.name" class="item flex-row"
            @tap="item.action">
        <text class="name">{{ item.name }}</text>
        <view class="icon"/>
      </view>
      <view v-if="admin" class="item flex-row" @tap="auditClick">
        <text class="name">审核预约</text>
        <view class="icon"/>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import {AtAvatar} from 'taro-ui-vue3'
import {computed} from 'vue'
import {useStore} from 'vuex';

export default {
  name: 'Home',
  components: {AtAvatar},
  setup() {
    const store = useStore()
    const name = computed(() => store.getters.user?.name || '点击登录')
    const admin = computed(() => store.getters.user.isAdmin)
    const avatar = computed(() => store.getters.isLogin ? store.getters.user.name.split('').reverse().join('') : '?')
    const actionGuard = async action => {
      console.log('guard', action)
      if (store.getters.isLogin) {
        await action()
      } else {
        await Taro.navigateTo({url: '/pages/login/index'})
      }
    }
    const settings = [
      {
        name: '个人信息', action: () => actionGuard(() => Taro.navigateTo({url: '/pages/profile/index'}))
      },
      {
        name: '我的预约', action: () => actionGuard(() => {
          store.commit('SET_TYPE', 'history')
          Taro.navigateTo({url: '/pages/history/index'});
        })
      },
      {
        name: '关于易班', action: () => Taro.navigateTo({url: '/pages/about/index'})
      }
    ]
    const onProfileTap = async () => {
      if (store.getters.isLogin) {
        await Taro.showModal({
          content: '确定要退出登录吗？',
          success: res => res.confirm && store.dispatch('logout')
        })
      } else {
        await Taro.navigateTo({url: '/pages/login/index'})
      }
    }
    const auditClick = () => actionGuard(() => {
      store.commit('SET_TYPE', 'all')
      Taro.navigateTo({url: '/pages/history/index'});
    })
    return {name, admin, avatar, settings, actionGuard, onProfileTap, auditClick}
  },
  mounted() {
    const store = useStore()
    if (!store.getters.user?.token) {
      Taro.showModal({
        content: '登录以使用更多功能',
        confirmText: '去登录',
        success: res => {
          if (res.confirm) {
            Taro.navigateTo({url: '/pages/login/index'})
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../app.scss';

.profile-card-wrapper {
  width: $content-width;
  height: 30vw;
  box-shadow: 0 2px 13px 0 rgba(16, 36, 213, 0.1);
  margin-top: $content-margin-top;
  border-radius: 10px;
  justify-content: center;

  .card {
    width: 80%;
    height: 100%;
    align-items: center;
    justify-content: flex-start;

    .name {
      margin-left: 10%;
    }
  }
}

.setting-items {
  width: $content-width;
  height: calc(100% - 30vw - 4vw);
  margin-top: 4vw;

  .item {
    width: 92%;
    height: 2.8rem;
    margin: .5rem 0;
    align-items: center;
    justify-content: space-between;

    .icon {
      width: 12px;
      height: 12px;
      background-color: white;
      border-radius: 50%;
      border: 4px solid $main-color;
    }
  }
}
</style>
