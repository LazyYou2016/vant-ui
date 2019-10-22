import Vue from 'vue'
import VueAMap from 'vue-amap' // 高德地图 npm i vue-amap --save
Vue.use(VueAMap) // 高德地图
VueAMap.initAMapApiLoader({
  key: '70d2eedd7e371fe7b81c21499cca38fb',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'Geocoder']
})
