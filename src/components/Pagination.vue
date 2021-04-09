<template>
  <view class="pagination">
    <AtButton
      :disabled="!canPrev"
      size="small"
      type="primary"
      @click="onPrev"
    >
      上一页
    </AtButton>
    第 {{ page + 1 }} 页
    <AtButton size="small" type="primary" @click="onNext">下一页</AtButton>
  </view>
</template>

<script>
import {AtButton, AtIcon} from 'taro-ui-vue3'
import {computed, ref} from 'vue'

export default {
  props: ['onChange'],
  name: 'Pagination',
  components: {AtIcon, AtButton},
  setup(props) {
    const {onChange} = props
    const page = ref(0)
    const onPrev = async () => {
      page.value--;
      await onChange(page.value)
    }
    const onNext = async () => {
      page.value++;
      await onChange(page.value)
    }
    const canPrev = computed(() => page.value > 0)
    return {page, canPrev, onPrev, onNext}
  }
}
</script>

<style lang="scss">
.pagination {
  width: 88vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
