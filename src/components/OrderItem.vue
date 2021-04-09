<template>
  <view class="order-item flex-column">
    <AtCard
      :extra="date"
      :icon="icon"
      :note="`申请人：${data.from.name}`"
      :title="`${data.unit} - ${data.content}`"
      class="card"
      @tap="onDetail"
    >
      <view class="content flex-row">
        <text>人数：{{ data.people }}</text>
        <text class="time">时间段：{{ data.startTime }} - {{ data.endTime }}</text>
      </view>
    </AtCard>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import {AtCard} from 'taro-ui-vue3'
import {format} from '../util/date'
import {computed} from 'vue'
import {useStore} from 'vuex';

export default {
  props: ['data'],
  name: 'OrderItem',
  components: {AtCard},
  setup(props) {
    const store = useStore()
    const {data} = props
    const icon = computed(() => {
      switch (data.state) {
        case 0:
          return {value: 'clock', color: '#FF00FF'}
        case 1:
          return {value: 'check', color: '#008000'}
        case 2:
          return {value: 'close', color: '#808080'}
      }
    })
    const date = format('YY-mm-dd', new Date(data.date))
    const onDetail = async () => {
      store.commit('SET_CURRENT', data)
      await Taro.navigateTo({url: '/pages/detail/index',})
    }
    return {data, date, icon, onDetail}
  },
}
</script>

<style lang="scss">
@import '../app.scss';

.order-item {
  width: 100%;
  margin: 30px 0;
  justify-content: center;

  .card {
    width: 88vw;

    .content {
      justify-content: start;

      .time {
        margin-left: 15%;
      }
    }
  }
}
</style>
