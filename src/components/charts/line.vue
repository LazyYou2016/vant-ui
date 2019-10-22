<template>
  <ve-line ref="chart"
           :data="chartData"
           :colors="colors"
           :height="height"
           :data-zoom="dataZoom"
           :extend="chartExtend"
           :settings="chartSettings"
           :data-empty="isDataEmpty"
           :loading="loading">
  </ve-line>
</template>

<script>
/**
 * chartData    {object}    [-]           数据
 * height       {String}    [400px]       高度
 * dataZoom     {Array}     [-]           设置区域缩放组件
 * area         {Boolean}   [false]       堆叠面积图
 */
import option from './common'

export default {
  name: 't-line',
  props: {
    loading: {
      type: Boolean
    },
    chartData: {
      type: Object
    },
    chartSettings: {
      type: Object
    },
    height: {
      type: String,
      default: '400px'
    },
    legendShow: {
      type: Boolean,
      default: false
    },
    dataZoom: {
      type: Array
    },
    stack: {
      type: Object,
      default: function () {
        return {}
      }
    },
    colors: {
      type: Array
    },
    area: {
      type: Boolean,
      default: false
    },
    smooth: {
      type: Boolean,
      default: true
    },
    sTest: String,
    id: String,
    top: {
      type: Number,
      default: 10
    },
    rotate: {
      type: Number,
      default: 0
    }
  },
  data () {
    let that = this
    let varColors = this.colors
    // this.chartSettings = {
    //   stack: this.stack,
    //   area: this.area
    // }
    /* this.dataZoom = [
      {
        type: 'slider',
        start: 0,
        end: 20
      }
    ] */
    this.chartExtend = {
      legend: {
        show: this.legendShow,
        itemWidth: 8,
        itemHeight: 8,
        icon: 'circle',
        right: 0,
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
          let html = ''
          html += params[0].name + '<br>'
          params.forEach(key => {
            if (key.data.value) {
              html += `${key.marker} ${key.seriesName} : ${key.data.value} <br>`
            }
          })
          return html
        }
      },
      grid: {
        top: this.top + '%',
        right: '2%',
        left: '2%',
        bottom: '1%',
        containLabel: true
      },
      xAxis: {
        boundaryGap: false,
        /* axisLine: {
          show: true,
          lineStyle: {
            color: '#2E405B'
          }
        }, */
        splitLine: {
          show: true,
          lineStyle: {
            color: '#273642'
          }
        },
        axisLabel: option.xAxis.axisLabel,
        axisTick: {
          show: false
        }
      },
      'xAxis.0.axisLabel.rotate': this.rotate,
      yAxis: {
        nameTextStyle: {
          color: option.nameTextStyle
        },
        splitLine: option.yAxis.splitLine,
        splitArea: option.yAxis.splitArea,
        axisLabel: option.yAxis.axisLabel
      },
      // series: {
      //   smooth: this.smooth
      // },
      series (v) {
        // v.smooth = that.smooth
        v.forEach((i, index1) => {
          i.smooth = that.smooth
          i.symbol = 'circle'
          i.symbolSize = 0
          let lastIndex = ''

          i.data.forEach((j, index) => {
            if (j[1]) {
              // console.log(j[1], index)
              lastIndex = {
                index: index,
                name: j[0],
                value: j[1]
              }
            }

            i.data.splice(index, 1, {
              name: j[0],
              value: j[1]
            })
          })

          // if (index === lastIndex) {

          let data = {
            name: lastIndex.name,
            value: lastIndex.value,
            symbol: 'circle',
            symbolSize: 14,
            itemStyle: {
              color: varColors[index1],
              borderColor: 'blue',
              borderWidth: 0,
              shadowColor: varColors[index1],
              shadowBlur: 10
            }
          }
          i.data.splice(lastIndex.index, 1, data)
          // }
        })

        return v
      },
      /* series: {
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 14,
        barMaxWidth: 14,
        itemStyle: {
          barBorderRadius: 100
        },
        lineStyle: {
          shadowBlur: 10,
          shadowOffsetY: 7
        },
        textStyle: {
          color: option.textColor
        }
      }, */
      textStyle: {
        color: option.textColor
      }
    }
    return {
      dataEmpty: false
    }
  },
  mounted () {
    const unwatch = this.$watch('sTest', v => {
      if (v !== this.id) return
      this.$nextTick(function () {
        this.$refs[`chart`].echarts.resize()
        unwatch()
      })
    })

    // 判断数据rows里面有没有数据，如果数据为空，显示暂无数据,给用户友好的提示
    // this.$nextTick(function () {
    //   this.dataEmpty = this.chartData.rows.length === 0
    // })

    // 等于
    /* if (this.chartData.rows.length === 0) {
      this.dataEmpty = true
    } else {
      this.dataEmpty = false
    } */

    // this.fullName = true
  },
  computed: {
    isDataEmpty: function () {
      if (this.loading) {
        return false
      }
      return this.chartData.rows.length === 0
    }
  }
}
</script>
