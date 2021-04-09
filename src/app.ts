import {createApp} from 'vue'
import store from './store'

import './app.scss'

const App = createApp({
  onLaunch() {
    store.commit('GET_STORAGE')
  }
})

App.use(store)

export default App
