import Taro, {RequestTask} from '@tarojs/taro'

Taro.addInterceptor(Taro.interceptors.logInterceptor)
Taro.addInterceptor(Taro.interceptors.timeoutInterceptor)

/**
 * 封装请求，捕获网络错误，显示Toast
 * @param params
 */
export const request = async (params: Taro.request.Option): Promise<RequestTask<any>> => {
  let result
  try {
    result = await Taro.request(params)
  } catch (e) {
    console.error(e)
    Taro.hideLoading()
    Taro.hideToast()
    await Taro.showToast({title: '请检查您的网络连接', icon: 'none'})
  }
  return result
}
