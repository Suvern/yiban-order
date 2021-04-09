<template>
  <view class="page flex-column">
    <AtList class="detail-list">
      <AtListItem :extraText="data.content" title="主题"/>
      <AtListItem :extraText="data.unit" title="部门"/>
      <AtListItem :extraText="data.people" title="人数"/>
      <AtListItem :extraText="date" title="日期"/>
      <AtListItem :extraText="`${data.startTime} - ${data.endTime}`" title="时间段"/>
      <AtListItem :extraText="state" title="状态"/>
      <AtListItem :extraText="createDate" title="申请时间"/>
      <AtListItem :extraText="data.refuseReason" title="拒绝原因"/>
      <AtListItem :extraText="data.from.name" title="预约人"/>
      <AtListItem :extraText="data.from.phone" title="预约人手机号"/>
      <AtListItem :extraText="data.from.username" title="预约人学号"/>
    </AtList>
    <view v-if="isAdmin" class="audit-action flex-column">
      <AtTextarea v-if="preRefuse" :maxLength="200" :value="text" placeholder="拒绝原因"/>
      <view class="action-btn flex-row">
        <AtButton :type="preRefuse ? 'secondary' : 'primary'" class="btn" size="small" @click="onPass">通过</AtButton>
        <AtButton :type="preRefuse ? 'primary' : 'secondary'" class="btn" size="small" @click="onRefuse">拒绝</AtButton>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import {format} from '../../util/date';
import {computed, ref} from 'vue'
import {useStore} from 'vuex';
import {AtButton, AtList, AtListItem, AtTextarea} from 'taro-ui-vue3'

export default {
  name: 'Detail',
  components: {AtList, AtListItem, AtTextarea, AtButton},
  setup() {
    const store = useStore()
    const data = computed(() => store.getters.current)
    const date = computed(() => format('YY-mm-dd', new Date(store.getters.current.date)))
    const createDate = computed(() => format('YY-mm-dd', new Date(store.getters.current.createTime)))
    const isAdmin = computed(() => store.getters.user.isAdmin && !data.value.state)
    const text = ref('')
    const preRefuse = ref(false)
    const state = computed(() => {
      switch (store.getters.current.state) {
        case 0:
          return '待审核'
        case 1:
          return '审核通过'
        case 2:
          return '已拒绝'
      }
    })
    const onPass = async () => {
      await Taro.showModal({
        content: '确认通过该预约',
        confirmText: '通过',
        cancelText: '再想想',
        success: async res => {
          if (res.confirm) {
            await store.dispatch('audit', {id: data.value.id, pass: true})
          }
        }
      })
    }
    const onRefuse = async () => {
      if (!preRefuse.value) {
        preRefuse.value = true
        return
      }
      await Taro.showModal({
        content: '确认拒绝该预约',
        confirmText: '拒绝',
        cancelText: '再想想',
        success: async res => {
          if (res.confirm) {
            await store.dispatch('audit', {id: data.value.id, pass: false, reason: text.value})
          }
        }
      })
    }
    return {data, date, state, createDate, isAdmin, text, preRefuse, onPass, onRefuse}
  },
  mounted() {
    const store = useStore()
  }
}
</script>

<style lang="scss">
@import '../../app.scss';

.detail-list {
  width: $content-width;
  margin-top: $content-margin-top;
}

.audit-action {
  width: $content-width;
  margin-top: 1rem;

  .action-btn {
    width: 100%;

    .btn {
      width: 50%;
    }
  }
}
</style>
