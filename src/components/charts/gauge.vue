<template>
  <ve-gauge
    :settings="chartSettings"
    :data="chartData"
    :data-empty="isDataEmpty"
    :height="height">
  </ve-gauge>
</template>

<script>
/**
   * chartData    {object}    [-]           数据
   * height       {String}    [400px]       高度
   * dataZoom     {Array}     [-]           设置区域缩放组件
   */
import option from './common'

export default {
  name: 'gauge',
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
    this.chartSettings = {
      dataName: {
        '温度': '温度',
        '湿度': '湿度'
      },
      seriesMap: {
        '温度': {
          radius: '90%',
          axisLine: {
            lineStyle: {
              color: [[0.09, 'lime'], [0.82, '#1e90ff'], [1, '#ff4500']],
              width: 4,
              shadowColor: '#0093f5',
              shadowBlur: 8
            }
          },
          splitLine: {
            length: 10,
            lineStyle: {
              width: 2,
              color: '#fff'
            }
          },
          detail: {
            formatter: function (value) {
              // return value.toFixed(0) + '°C'
              return value + '°C'
            },
            backgroundColor: '#344866',
            borderWidth: 1,
            borderColor: '#2C5F6B',
            shadowColor: '#2C5F6B',
            shadowBlur: 4,
            offsetCenter: [-2, '75%'],
            textStyle: {
              fontWeight: 'bolder',
              color: option.textColor,
              fontSize: '14'
            }
          },
          title: {
            show: true,
            textStyle: {
              fontWeight: 'bolder',
              fontSize: 12,
              color: '#fff'
            }
          }
        },
        '湿度': {
          radius: '90%',
          axisLine: {
            lineStyle: {
              color: [[0.09, 'lime'], [0.82, '#1e90ff'], [1, '#ff4500']],
              width: 4,
              shadowColor: '#0093f5',
              shadowBlur: 8
            }
          },
          splitLine: {
            length: 10,
            lineStyle: {
              width: 2,
              color: '#fff'
            }
          },
          detail: {
            formatter: function (value) {
              // return value.toFixed(0) + '%'
              return value + '%'
            },
            backgroundColor: '#344866',
            borderWidth: 1,
            borderColor: '#2C5F6B',
            shadowColor: '#2C5F6B',
            shadowBlur: 4,
            offsetCenter: [-2, '75%'],
            textStyle: {
              fontWeight: 'bolder',
              color: option.textColor,
              fontSize: '14'
            }
          },
          title: {
            show: true,
            textStyle: {
              fontWeight: 'bolder',
              fontSize: 12,
              color: '#fff'
            }
          }
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
        color: '#8e8e8e'
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
