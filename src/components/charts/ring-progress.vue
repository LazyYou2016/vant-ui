<template>
  <ve-ring
    :data="chartData"
    height="90%"
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
import echarts from 'echarts/lib/echarts'
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
    }
  },
  data () {
    this.chartExtend = {
      'series.0.data.1.label.show': false,
      'series.0.data.1.itemStyle': {
        normal: {
          color: 'transparent'
          // borderWidth: 1,
          // borderColor: '#073A66'
        }
      },
      'series.0.data.0.itemStyle': {
        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
          offset: 0,
          color: '#2CC6ED'
        }, {
          offset: 1,
          color: '#71D9F3'
        }])
        // color: 'red'
      },
      'series.0.data.0.label': {
        show: true,
        position: 'center',
        formatter: [
          '{count|{c}}',
          '{title|{b}}'
        ].join('\n'),
        fontSize: '20',
        lineHeight: '24',
        padding: [10, 0, 0, 0],
        rich: {
          count: {
            // color: this.colorArr[0],
            color: '#2CC6ED',
            fontSize: '24'
          },
          title: {
            color: '#6A899E',
            align: 'center',
            fontSize: '12'
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
        top: '0%',
        left: '3%',
        right: '4%',
        bottom: 35,
        containLabel: true
      },
      tooltip: {
        show: false
        // position: function (pos, params, dom, rect, size) {
        //   var obj = { top: 0 }
        //   obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
        //   // console.log(obj)
        //   return obj
        // }
      },
      series (v) {
        v.forEach(i => {
          i.center = ['50%', '50%']
          i.radius = ['80%', '90%']
          i.hoverAnimation = false
        })
        v.push({
          name: '面积模式',
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['70%', '80%'],
          hoverAnimation: false,
          data: [{
            value: 100,
            name: 'invisible'
          }],
          label: {
            show: false
          },
          itemStyle: {
            normal: {
              color: '#162B3D'
            }
          }
        })

        /* v[0].label = {
          show: true,
          position: 'center',
          formatter: [
            '{count|{c}}',
            '{title|{b}}'
          ].join('\n'),
          fontSize: '20',
          lineHeight: '24',
          padding: [-20, 0, 0, 0],
          rich: {
            count: {
              // color: this.colorArr[0],
              color: '#2CC6ED',
              fontSize: '24'

            },
            title: {
              color: '#6A899E',
              align: 'center',
              fontSize: '12'
            }
          }
        } */

        return v
      },
      /* series: {
        center: ['50%', '50%'],
        radius: ['70%', '80%'],
        label: {
          show: true,
          position: 'center',
          formatter: [
            '{count|{c}}',
            '{title|{b}}'
          ].join('\n'),
          fontSize: '20',
          lineHeight: '24',
          padding: [0, 0, 0, 0],
          textStyle: {
            color: option.textColor,
            fontSize: 12
          },
          rich: {
            count: {
              // color: this.colorArr[0],
              color: '#2CC6ED',
              fontSize: '24'

            },
            title: {
              color: '#6A899E',
              align: 'center',
              fontSize: '12'
            }
          }
        }
      }, */
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
