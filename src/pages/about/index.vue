<template>
  <view class="page flex-column">
    <view class="article at-article">
      <view class="at-article__h1">易班大厅预约流程</view>
      <AtSteps :current="current" :items="steps" class="steps" @change="stepChange"/>
      <view class="at-article__h2">中国矿业大学易班</view>
      <view class="at-article__p">{{ yibanInfo }}</view>
      <view v-for="item in peopleInfo" :key="item.text" class="people at-article__p">
        {{ item.text }}
        <AtTag circle size="small" @click="copy(item.phone)">
          点击复制Tel: {{ item.phone }}
        </AtTag>
      </view>

      <AtDivider content=""/>

      <view class="flying flex-row">
        <view class="at-article__h2">中国矿业大学翔工作室</view>
        <image mode="widthFix" src="https://s1.ax1x.com/2020/09/19/wIp6v8.png" style="width: 50%; margin-right: 20px;"/>
      </view>
      <view class="at-article__p">{{ flyingInfo }}</view>
      <view class="developer at-article__p">开发者：王昭君</view>
      <view class="at-article__p">
        <AtTag circle size="small" @click="copy(qqGroup)">加入QQ群：{{ qqGroup }}（点击复制群号）</AtTag>
      </view>
      <view class="blank"/>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import {ref} from 'vue'
import {AtDivider, AtSteps, AtTag} from 'taro-ui-vue3'
import {flyingInfo, peopleInfo, qqGroup, yibanInfo} from './info';

export default {
  name: 'About',
  components: {AtSteps, AtDivider, AtTag},
  setup() {
    const steps = [{title: '申请预约', desc: '注册登录小程序并申请预约'},
      {title: '管理员审核', desc: '管理员后台审核预约,请提前联系易班人员'},
      {title: '审核结果', desc: '审核结果可通过\"我的预约\"查询'}]
    const current = ref(0)
    const stepChange = e => current.value = e
    const copy = () => {
      Taro.setClipboardData({
        data: qqGroup, success: res => {
          if (res.errMsg === 'setClipboardData:ok') {
            Taro.showToast({title: '复制成功', icon: 'none'})
          }
        }
      })
    }
    return {
      steps,
      current,
      stepChange,
      yibanInfo,
      peopleInfo,
      flyingInfo,
      qqGroup,
      copy,
    }
  }
}
</script>

<style lang="scss">
@import '../../app.scss';

.article {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  margin-top: $content-margin-top;

  .steps {
    margin: 2rem 0;
  }

  .flying {
    justify-content: flex-start;
    align-items: center;
  }

  .people {
    color: #228B22;
  }

  .developer {
    color: $main-color;
  }

  .blank {
    margin-top: 10vh;
  }
}
</style>
