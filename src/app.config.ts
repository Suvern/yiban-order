export default {
  pages: [
    'pages/home/index',
    'pages/order/index',

    'pages/profile/index',
    'pages/login/index',
    'pages/history/index',
    'pages/about/index',
    'pages/detail/index',
  ],
  tabBar: {
    list: [
      {
        iconPath: 'assets/home.png',
        selectedIconPath: 'assets/home_d.png',
        pagePath: 'pages/home/index',
      },
      {
        iconPath: 'assets/order.png',
        selectedIconPath: 'assets/order_d.png',
        pagePath: 'pages/order/index',
      },
    ],
    color: '#C2ABC7',
    selectedColor: '#0A52FC',
    backgroundColor: '#FFF',
    borderStyle: 'white',
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
