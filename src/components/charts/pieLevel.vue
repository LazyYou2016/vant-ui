<template>
  <ve-pie
    :data="chartData"
    :extend="EchartEQ"
    :height="height"
    :data-empty="isDataEmpty"
    :settings="chartSettings"
  ></ve-pie>
</template>

<script>
/**
 * chartData    {object}    [-]           数据
 * height       {String}    [400px]       高度
 * radius       {Boolean}   [false]       玫瑰图
 */
import option from './common'

export default {
  name: 'pie',
  props: {
    chartData: {
      type: Object
    },
    height: {
      type: String,
      default: '400px'
    },
    radius: {
      type: Boolean,
      default: false
    },
    level: {
      type: Array
    }
  },
  data () {
    this.chartSettings = {
      roseType: this.radius,
      level: this.level
    }
    this.EchartEQ = {
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
        top: '0%',
        left: '3%',
        right: '4%',
        bottom: 35,
        containLabel: true
      },
      tooltip: {
        position: function (pos, params, dom, rect, size) {
          var obj = { top: 60 }
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
          // console.log(obj)
          return obj
        }
      },
      series: {
        center: ['50%', '50%'],
        label: {
          normal: {
            show: false,
            position: 'inner',
            formatter: '{d}%',
            textStyle: {
              color: '#fff',
              fontSize: 12
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        }
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
