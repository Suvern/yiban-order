import Taro from '@tarojs/taro'
import {createStore} from 'vuex'
import {audit, getAllOrder, getMyOrder, login, order} from "./util/api";

const state = {
  user: {
    isAdmin: false,
    name: '',
    phone: '',
    token: '',
    unit: '',
    username: ''
  },
  history: {},
  all: {},
  current: {},
  type: 'history',
}

const actions = {
  login: async ({commit}, payload) => {
    await Taro.showLoading({title: '登录中...'})
    const result = await login(payload)
    await Taro.hideLoading()
    if (result.statusCode >= 200 && result.statusCode < 300) {
      commit('SET_USER', {username: payload.username, token: result.data.token, ...result.data.user})
      commit('SET_STORAGE')
      await Taro.navigateBack()
      await Promise.resolve()
    } else {
      await Taro.showToast({title: result.data, icon: 'none'})
      await Promise.reject(result.data)
    }
  },
  order: async ({}, payload) => {
    await Taro.showLoading({title: '提交中'})
    const result = await order(state.user.token, payload,)
    await Taro.hideLoading()
    if (result.statusCode >= 200 && result.statusCode < 300) {
      await Taro.showToast({title: '提交成功', icon: 'success'})
      await Promise.resolve()
    } else {
      await Taro.showToast({title: result.data, icon: 'none'})
      await Promise.reject(result.data)
    }
  },
  history: async ({commit}, payload) => {
    await Taro.showLoading({title: '加载中'})
    const result = await getMyOrder(state.user.token, payload)
    await Taro.hideLoading()
    if (result.statusCode >= 200 && result.statusCode < 300) {
      commit('SET_HISTORY', {page: payload, data: result.data})
      await Promise.resolve()
    } else {
      await Taro.showToast({title: result.data, icon: 'none'})
      await Promise.reject(result.data)
    }
  },
  all: async ({commit}, payload) => {
    await Taro.showLoading({title: '加载中'})
    const result = await getAllOrder(payload)
    await Taro.hideLoading()
    if (result.statusCode >= 200 && result.statusCode < 300) {
      commit('SET_ALL', {page: payload, data: result.data})
      await Promise.resolve()
    } else {
      await Taro.showToast({title: result.data, icon: 'none'})
      await Promise.reject(result.data)
    }
  },
  logout: async ({commit}) => {
    commit('CLEAR_DATA')
    await Taro.navigateTo({url: '/pages/login/index'})
  },
  audit: async ({}, payload) => {
    await Taro.showLoading({title: '操作中'})
    console.log('payload: ', payload)
    const result = await audit(state.user.token, payload.id, payload.pass, payload.reason)
    await Taro.hideLoading()
    if (result.statusCode >= 200 && result.statusCode < 300) {
      await Taro.showToast({title: '操作成功', icon: 'success'})
      await Taro.navigateBack()
      await Taro.startPullDownRefresh()
      await Taro.stopPullDownRefresh()
      await Promise.resolve()
    } else {
      await Taro.showToast({title: result.data, icon: 'none'})
      await Promise.reject(result.data)
    }
  }
}

const getters = {
  user: state => state.user,
  isLogin: state => Boolean(state.user?.token),
  history: state => state.history,
  all: state => state.all,
  current: state => state.current,
  type: state => state.type,
}

const mutations = {
  SET_TYPE: (state, payload) => state.type = payload,
  SET_USER: (state, payload) => state.user = payload,
  SET_HISTORY: (state, payload) => state.history[payload.page] = payload.data,
  SET_ALL: (state, payload) => state.all[payload.page] = payload.data,
  SET_CURRENT: (state, payload) => state.current = payload,
  SET_STORAGE: state => {
    try {
      Taro.setStorageSync('user', state.user)
    } catch (err) {
      console.error(err)
    }
  },
  GET_STORAGE: state => {
    try {
      const user = Taro.getStorageSync('user')
      if (user) {
        state.user = user
      }
    } catch (err) {
      console.error(err)
    }
  },
  CLEAR_DATA: state => {
    state.user = {
      isAdmin: false,
      name: '',
      phone: '',
      token: '',
      unit: '',
      username: ''
    }
    try {
      Taro.clearStorageSync()
    } catch (err) {
      console.error(err)
    }
  },
}

const store = createStore({
  state,
  mutations,
  actions,
  getters
})

export default store
