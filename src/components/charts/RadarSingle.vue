<template>
  <ve-radar
    :colors="colors"
    :data="chartData"
    :height="height"
    :data-empty="isDataEmpty"
    :extend="chartExtend"
    :loading="loading">
  </ve-radar>
</template>

<script>
/**
   * chartData      {object}    [-]                           数据
   * height         {String}    [400px]                       高度
   * indicatorArr   {Array}     [ ]                           雷达图的指示器，用来指定雷达图中的多个变量（维度）, 示例（详细信息）：http://www.echartsjs.com/option.html#radar.indicator
   * colors         {Array}     ['#70a7f5', '#4DC451']        调色盘颜色
   */
import option from './common'

export default {
  name: 'radar',
  props: {
    loading: {
      type: Boolean
    },
    chartData: {
      type: Object
    },
    height: {
      type: String,
      default: '400px'
    },
    indicatorArr: {
      type: Array
    },
    colors: {
      type: Array,
      default: () => {
        return ['#70a7f5', '#4DC451']
      }
    }
  },
  data () {
    this.chartExtend = {
      radar: {
        shape: 'polygon',
        center: ['50%', '50%'],
        radius: 80,
        name: {
          textStyle: {
            color: option.textColor
          }
        },
        splitArea: {
          areaStyle: {
            color: [
              'transparent', '#1d4e74'
            ]
          }
        },
        indicator: this.indicatorArr
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
      tooltip: {
        position: function (pos, params, dom, rect, size) {
          var obj = {
            top: 0
          }
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
          // console.log(obj)
          return obj
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
      if (this.loading) {
        return false
      }
      console.log(this.chartData.rows.length === 0 + 'swfefwef')
      return this.chartData.rows.length === 0
    }
  }
}
</script>
