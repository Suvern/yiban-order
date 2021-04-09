<template>
  <view class="page flex-column">
    <text class="title">易班大厅预约</text>
    <view class="logo-wrapper flex-row">
      <image src="https://s1.ax1x.com/2020/07/06/UPASxK.jpg"/>
      <image src="https://s1.ax1x.com/2020/07/06/UPEVw4.jpg"/>
    </view>
    <view class="login-form flex-column">
      <AtInput
        v-model:value="username"
        name="username"
        placeholder="融合门户账号"
        title="账号"
        type="text"
      />
      <AtInput
        v-model:value="password"
        name="password"
        placeholder="融合门户密码"
        title="密码"
        type="password"
      />
      <AtButton :disabled="!valid" class="btn" type="primary" @click="onLogin">登录</AtButton>
    </view>
  </view>
</template>

<script>
import {computed, ref} from 'vue'
import {useStore} from 'vuex'
import {AtButton, AtInput} from 'taro-ui-vue3'

export default {
  name: 'Login',
  components: {AtInput, AtButton},
  setup() {
    const store = useStore()
    const username = ref('')
    const password = ref('')
    const valid = computed(() => username.value && password.value)
    const onLogin = async () => await store.dispatch('login', {
      username: username.value,
      password: password.value
    }).catch(e => console.error(e))
    return {username, password, valid, onLogin}
  }
}
</script>

<style lang="scss">
@import '../../app.scss';

.title {
  font-weight: 400;
  font-size: 1.4rem;
  margin-top: 4rem;
}

.logo-wrapper {
  width: $content-width;
  margin-top: 1.6rem;

  image {
    width: 32vw;
    height: 32vw;
  }
}

.login-form {
  width: 97vw;
  margin-top: 1.6rem;

  .btn {
    width: 75%;
    margin-top: 1.5rem;
  }
}

</style>
