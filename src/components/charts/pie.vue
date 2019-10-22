<template>
  <ve-pie :data="chartData"
          :extend="chartExtend"
          :height="height"
          :colors="colors"
          :data-empty="isDataEmpty"
          :settings="chartSettings"></ve-pie>
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
    },
    legendBool: {
      type: Boolean,
      default: false
    },
    colors: {
      type: Array,
      default: () => ['#43D0F2', '#104F5D', '#176577', '#21879F', '#299FBB']
    }
  },
  data () {
    let richs = {
      // fang: {
      //   width: 10,
      //   height: 10,
      //   backgroundColor: '#43D0F2',
      //   align: 'right'
      // },
      a: {
        padding: [2, 10],
        color: '#7A9CB3',
        fontSize: 12,
        align: 'right'
      },
      b: {
        color: '#2CC6ED',
        fontSize: 20,
        lineHeight: 40
      }
    }
    this.colors.forEach(key => {
      richs[key.replace('#', '')] = {
        width: 10,
        height: 10,
        backgroundColor: key,
        align: 'right'
      }
    })

    this.chartSettings = {
      roseType: this.radius,
      level: this.level
    }
    this.chartExtend = {
      legend: {
        show: this.legendBool,
        // show: true,
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
          var obj = {
            top: 60
          }
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
          // console.log(obj)
          return obj
        }
      },
      series: {
        center: ['50%', '60%'],
        radius: ['0', this.legendBool === true ? '75%' : '70%'],
        label: {
          normal: {
            // position: 'inner',
            // formatter: ['{red|}{a|{b}}', '{b|{d}%}'].join('\n'),
            formatter: function (params) {
              // console.log(params.color)
              if (!params.color) return
              return '{' + params.color.replace('#', '') + '|}{a|' + params.name + '}\n{b|' + params.percent + '%}'
            },
            textStyle: {
              color: '#2CC6ED',
              fontSize: 25
            },
            padding: [0, -70],
            height: 100,
            align: 'right',
            rich: richs
          }
        },
        labelLine: {
          normal: {
            show: true,
            length: 20,
            length2: 70,
            lineStyle: {
              color: '#20A5C5'
            },
            align: 'right'
          }
        }
      }
      // textStyle: {
      //   color: option.textColor
      // }
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
