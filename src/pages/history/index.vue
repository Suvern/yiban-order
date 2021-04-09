<template>
  <view class="page flex-column">
    <Pagination :onChange="onPageChange"/>
    <AtList class="history-list">
      <OrderItem v-for="item in data" :key="item.id" :data="item"/>
      <view class="blank"/>
    </AtList>
  </view>
</template>

<script>
import {computed, ref} from 'vue'
import {useStore} from 'vuex'
import {AtList} from 'taro-ui-vue3'
import Pagination from '../../components/Pagination';
import OrderItem from '../../components/OrderItem';

export default {
  name: 'History',
  components: {OrderItem, AtList, Pagination},
  setup() {
    const store = useStore()
    const page = ref(0)
    const data = computed(() => {
      if (store.getters.type === 'history') {
        return store.getters.history[page.value];
      } else {
        return store.getters.all[page.value];
      }
    })
    const onPageChange = async p => {
      page.value = p
      await store.dispatch(store.getters.type, p)
    }
    return {data, onPageChange}
  },
  mounted() {
    const store = useStore()
    store.dispatch(store.getters.type, 0)
  },
}
</script>

<style lang="scss">
@import '../../app.scss';

.empty-tip {
  position: absolute;
  z-index: 999;
  width: 100vw;
  text-align: center;
  margin-top: 48vh;
}

.pagination {
  width: 88vw;
}

.history-list {
  width: 100vw;
  height: calc(100% - 1rem);
  margin-top: $content-margin-top;
  overflow-y: scroll;

  .blank {
    height: 30px;
  }
}
</style>
