// 图表
import histogram from '@/components/charts/histogram'
import bar from '@/components/charts/bar'
import line from '@/components/charts/line'
import pie from '@/components/charts/pie'
import pieLevel from '@/components/charts/pieLevel'
import radar from '@/components/charts/radar'
import RadarSingle from '@/components/charts/RadarSingle'
import ring from '@/components/charts/ring'
import gauge from '@/components/charts/gauge'
import ringProgress from '@/components/charts/ring-progress'

// 卡片
import card from './card/card'
const components = {
  'tw-histogram': histogram,
  'tw-bar': bar,
  'tw-line': line,
  'tw-pie': pie,
  'tw-pie-level': pieLevel,
  'tw-radar': radar,
  'tw-radar-single': RadarSingle,
  'tw-ring': ring,
  'tw-gauge': gauge,
  'tw-ring-progress': ringProgress,
  'card': card
}
const install = function (Vue, opts = {}) {
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key])
  })
}
export default install
