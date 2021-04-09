<template>
  <view class="page flex-column">
    <AtList class="profile-list">
      <AtListItem :extraText="user.name" note="信息来源于融合门户" title="姓名"/>
      <AtListItem :extraText="user.username" note="学号/工号" title="账号"/>
      <AtListItem :extraText="user.phone" note="如有错误请联系开发者" title="手机号"/>
      <AtListItem :extraText="user.unit" note="您最近一次预约中填写的单位" title="工作单位"/>
      <AtListItem :extraText="user.isAdmin ? '管理员' : '普通用户'" note="管理员可以审核预约" title="用户类别"/>
    </AtList>
  </view>
</template>

<script>
import {AtList, AtListItem} from 'taro-ui-vue3'
import {useStore} from 'vuex';
import {computed} from 'vue'

export default {
  name: 'Profile',
  components: {AtList, AtListItem},
  setup() {
    const store = useStore()
    const user = computed(() => store.getters.user)
    return {user,}
  }
}
</script>

<style lang="scss">
@import '../../app.scss';

.profile-list {
  width: $content-width;
  margin-top: $content-margin-top;
}
</style>
