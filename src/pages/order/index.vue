<template>
  <view class="page flex-column">
    <view class="order-form flex-column">
      <AtInput v-model:value="content" class="input" name="content" placeholder="请输入活动内容" title="活动内容" type="text"/>
      <AtInput v-model:value="unit" class="input" name="unit" placeholder="请输入主办单位" title="主办单位" type="text"/>
      <AtInput v-model:value="people" class="input" name="number" placeholder="不超过50人" title="活动人数" type="number"/>
      <view class="picker-input flex-row" style="height: 51px;">
        <text>活动日期</text>
        <picker :value="date" class="picker" mode='date' @change="onDateChange">
          <view class="content flex-row">
            <view v-if="!date">请选择日期</view>
            <view v-if="date">{{ date }}</view>
          </view>
        </picker>
      </view>
      <view class="picker-input flex-row" style="height: 51px;">
        <text>开始时间</text>
        <picker :range="startTimeSelector" :value="startTime" class="picker" mode='selector' @change="startTimeChange">
          <view class="content flex-row">
            <view v-if="!startTime">请选择日期</view>
            <view v-if="startTime">{{ startTime }}</view>
          </view>
        </picker>
      </view>
      <view class="picker-input flex-row" style="height: 51px;">
        <text>结束时间</text>
        <picker :range="endTimeSelector" :value="endTime" class="picker" mode='selector' @change="endTimeChange">
          <view class="content flex-row">
            <view v-if="!endTime">请选择结束时间</view>
            <view v-if="endTime">{{ endTime }}</view>
          </view>
        </picker>
      </view>
      <AtTextarea v-model:value="extra" :maxlength="200" class="textarea" placeholder="备注（使用设备、桌椅摆放等）"/>
    </view>

    <AtButton :disabled="!valid" class="submit-btn" type="primary" @click="onSubmit">提交预约</AtButton>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import {computed, reactive, toRefs} from 'vue'
import {AtButton, AtInput, AtTextarea} from 'taro-ui-vue3'
import {format} from '../../util/date';
import {useStore} from 'vuex';

export default {
  name: 'Order',
  components: {AtInput, AtTextarea, AtButton},
  setup() {
    const store = useStore()
    const form = reactive({
      content: '',
      unit: '',
      people: '',
      date: '',
      startTime: '',
      endTime: '',
      extra: '',
    })
    const onDateChange = e => {
      const selected = format('YY-mm-dd 00:00:00', new Date(e.detail.value))
      const today = format('YY-mm-dd 00:00:00', new Date())
      if (new Date(selected) <= new Date(today)) {
        Taro.showToast({
          title: '需提前一天预约',
          icon: 'none'
        })
      } else {
        form.date = e.detail.value
      }
    }
    const startTimeChange = e => {
      const startTime = startTimeSelector[e.detail.value]
      if (form.endTime && (new Date(`2000-1-1 ${startTime}`) >= new Date(`2000-1-1 ${form.endTime}`))) {
        Taro.showToast({title: '开始时间需早于结束时间', icon: 'none'})
        return
      }
      return form.startTime = startTime;
    }
    const endTimeChange = e => {
      const endTime = endTimeSelector[e.detail.value]
      if (form.startTime && (new Date(`2000-1-1 ${form.startTime}`) >= new Date(`2000-1-1 ${endTime}`))) {
        Taro.showToast({title: '结束时间需晚于开始时间', icon: 'none'})
        return
      }
      return form.endTime = endTime;
    }
    const startTimeSelector = ['8:00', '10:00', '14:00', '16:00', '19:00']
    const endTimeSelector = ['10:00', '12:00', '16:00', '18:00', '21:00']
    const valid = computed(() => store.getters.isLogin && form.content && form.unit && (Number(form.people) > 0 && Number(form.people) <= 10) >= 1 && form.date && form.startTime && form.endTime)
    const onSubmit = async () => await store.dispatch('order', form).catch(e => console.error(e))
    return {
      ...toRefs(form),
      onDateChange,
      startTimeChange,
      endTimeChange,
      startTimeSelector,
      endTimeSelector,
      valid,
      onSubmit,
    }
  }
}
</script>

<style lang="scss">
@import '../../app.scss';

.order-form {
  width: 100vw;
  margin-top: $content-margin-top;

  .input {
    width: 90%;
  }

  .picker-input {
    align-items: center;
    justify-content: flex-start;
    width: 86%;

    .picker {
      margin-left: 2.4rem;
      width: 50%;
      display: flex;

      .content {
        width: 100%;
      }
    }
  }

  .textarea {
    width: 90%;
  }
}

.submit-btn {
  width: $content-width;
  margin-top: 1rem;
}
</style>
