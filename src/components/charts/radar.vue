<template>
  <ve-radar :data="chartData"
            :height="height"
            :data-empty="isDataEmpty"
            :extend="chartExtend">
  </ve-radar>
</template>

<script>
/**
   * chartData    {object}    [-]           数据
   * height       {String}    [400px]       高度
   * dataZoom     {Array}     [-]           设置区域缩放组件
   */
import option from './common'

export default {
  name: 'radar',
  props: {
    chartData: {
      type: Object
    },
    height: {
      type: String,
      default: '400px'
    }
  },
  data () {
    this.chartExtend = {
      radar: {
        center: ['50%', '50%'],
        radius: 80,
        name: {
          textStyle: {
            color: option.textColor
          }
        },
        splitArea: {
          areaStyle: {
            color: ['rgba(38, 111, 177, 0.2)',
              'rgba(38, 111, 177, 0.4)', 'rgba(38, 111, 177, 0.6)',
              'rgba(38, 111, 177, 0.8)', 'rgba(38, 111, 177, 1)'],
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 10
          }
        }
      },
      legend: {
        show: false,
        itemWidth: 8,
        itemHeight: 8,
        icon: 'circle',
        bottom: 0,
        textStyle: {
          color: option.textColor
        }
      },
      grid: {
        top: '15%',
        right: '0%',
        left: '0%',
        bottom: '0%',
        containLabel: true
      },
      textStyle: {
        color: option.textColor
      }
    }
    return {
    }
  },
  computed: {
    isDataEmpty: function () {
      // if (this.loading) {
      //   return false
      // }
      return this.chartData.rows.length === 0
    }
  }
}
</script>
