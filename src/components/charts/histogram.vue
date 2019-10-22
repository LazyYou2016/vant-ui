<template>
  <ve-histogram :colors="colors"
                :data="chartData"
                :height="height"
                ref="chart"
                :extend="chartExtend"
                :settings="chartSettings"
                :rotate="rotate"
                :data-empty="isDataEmpty"
                :loading="loading"></ve-histogram>
</template>

<script>
/**
 * chartData {Object} - 注入数据
 * isXAxisItalic {Boolean}  [false] - X轴文字显示全部
 * id {String} - ID
 */

import option from './common'

export default {
  name: 'histogram',
  props: {
    loading: {
      type: Boolean
    },
    chartData: {
      type: Object
    },
    height: {
      type: String,
      default: '300px'
    },
    chartSettings: {
      type: Object
    },
    sTest: String,
    id: String,
    isXAxisItalic: {
      type: Boolean,
      default: false
    },
    axisRotate: {
      type: Number,
      default: 40
    },
    colors: {
      type: Array
    },
    rotate: {
      type: Number,
      default: 0
    },
    series: {
      type: Object
    }
  },
  data () {
    this.chartExtend = {
      legend: {
        show: false,
        itemWidth: 8,
        itemHeight: 8,
        icon: 'circle',
        // top: 0,
        // right: 0,
        textStyle: {
          color: option.textColor
        }
      },
      tooltip: {
        show: true,
        // formatter: '{a} {b}: {c}'
        formatter: function (params) {
          // console.log(params)
          let html = ''
          html += params[0].name + '<br>'
          params.forEach(key => {
            if (key.value) {
              html += `${key.marker} ${key.seriesName} : ${key.value} <br>`
            }
          })
          return html
        }
      },
      grid: {
        top: '10%',
        right: '2%',
        left: '2%',
        bottom: '1%',
        containLabel: true
      },
      xAxis: {
        /* axisLine: {
          show: true,
          lineStyle: {
            color: '#2E405B'
          }
        }, */
        axisLabel: option.xAxis.axisLabel,
        axisTick: {
          show: false
        }
      },
      yAxis: {
        nameTextStyle: {
          color: option.nameTextStyle
        },
        splitLine: option.yAxis.splitLine,
        splitArea: option.yAxis.splitArea,
        axisLabel: option.yAxis.axisLabel
      },
      'xAxis.0.axisLabel.rotate': this.rotate,
      series: this.series,
      textStyle: {
        color: option.textColor
      }
    }
    return {
      // chartData: null
      dataEmpty: false
    }
  },
  mounted: function () {
    console.log(this.series)

    // 图表不重复渲染
    const unwatch = this.$watch('sTest', v => {
      if (v !== this.id) return
      this.$nextTick(function () {
        this.$refs[`chart`].echarts.resize()
        unwatch()
      })
    })
    if (this.isXAxisItalic === true) {
      // console.log('字体显示全部')
      this.chartExtend.xAxis = {
        axisLabel: {
          interval: 0,
          rotate: 90,
          formatter: function (params) {
            var newParamsName = ''
            var paramsNameNumber = params.length
            console.log(paramsNameNumber)
            var provideNumber = 2 // 一行显示几个字
            var rowNumber = Math.ceil(paramsNameNumber / provideNumber)
            if (paramsNameNumber > provideNumber) {
              for (var p = 0; p < rowNumber; p++) {
                var tempStr = ''
                var start = p * provideNumber
                var end = start + provideNumber
                if (p === rowNumber - 1) {
                  tempStr = params.substring(start, paramsNameNumber)
                } else {
                  tempStr = params.substring(start, end) + '\n'
                }
                newParamsName += tempStr
              }
            } else {
              newParamsName = params
            }
            return newParamsName
          }
        }
      }
    } else {
      // console.log('默认：不全')
    }

    // 判断数据rows里面有没有数据，如果数据为空，显示暂无数据,给用户友好的提示
  },
  computed: {
    isDataEmpty: function () {
      if (this.loading) {
        return false
      }
      return this.chartData.rows.length === 0
    }
  },
  watch: {
    /* sTest: function (newVal, oldVal) {
        // console.log(newVal, oldVal, '检查')
        this.$nextTick(function () {
          // console.log(this.$refs)
          // console.log(this.$refs.chart)
          this.$refs[`chart`].echarts.resize()
        })
      } */
  }
}
</script>
