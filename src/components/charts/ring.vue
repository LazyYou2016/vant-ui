<template>
  <ve-ring
    :data="chartData"
    :height="height"
    :extend="chartExtend"
    :settings="chartSettings"
    :data-empty="isDataEmpty"
    :colors="colorArr">
  </ve-ring>
</template>

<script>
/**
 * chartData    {object}    [-]           数据
 * height       {String}    [400px]       高度
 * colorArr     {Array}     ['#19d4ae', '#5ab1ef']  颜色
 */
import option from './common'

export default {
  name: 'ring',
  props: {
    chartData: {
      type: Object
    },
    height: {
      type: String,
      default: '400px'
    },
    colorArr: {
      type: Array,
      default: () => {
        return ['#43D0F2', '#104F5D', '#176577', '#21879F', '#299FBB']
      }
    },
    chartSettings: {
      type: Object
    },
    LabelLine: {
      type: Boolean,
      default: true
    }
  },
  data () {
    this.chartExtend = {
      // 'series.0.data.0.label.show': false,
      // 'series.0.data.1.label': {
      //   formatter: [
      //     '{count|{c}}',
      //     '{title|{b}}'
      //   ].join('\n'),
      //   fontSize: '20',
      //   lineHeight: '24',
      //   padding: [-20, 0, 0, 0],
      //   rich: {
      //     count: {
      //       color: this.colorArr[0],
      //       fontSize: '24'
      //
      //     },
      //     title: {
      //       color: option.textColor,
      //       align: 'center',
      //       fontSize: '12'
      //     }
      //   }
      // },
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
        // formatter: this.chartSettings ? this.chartSettings.tooltip.formatter : ['{b}', '{c}'].join('\n')
        // position: function (pos, params, dom, rect, size) {
        //   var obj = { top: 0 }
        //   obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
        //   // console.log(obj)
        //   return obj
        // }
      },
      series: {
        center: this.LabelLine ? ['50%', '55%'] : ['50%', '50%'],
        radius: ['60%', '70%'],
        label: {
          show: this.LabelLine,
          // position: 'center',
          // formatter: '{b}\n{c}',
          formatter: this.chartSettings ? this.chartSettings.label.formatter : ['{a|{b}}', '{b|{c}}'].join('\n'),
          textStyle: {
            color: option.textColor,
            fontSize: 12
          },
          padding: [0, -70],
          height: 100,
          rich: {
            a: {
              color: '#7A9CB3',
              fontSize: 12,
              align: 'left'
            },
            b: {
              color: '#2CC6ED',
              fontSize: 22,
              lineHeight: 40
            }
          }
        },
        labelLine: {
          normal: {
            show: this.LabelLine,
            length: 10,
            length2: 70,
            lineStyle: {
              color: '#20A5C5'
            },
            align: 'right'
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
