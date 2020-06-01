<template>
  <div class="echarts">
    <v-chart v-if="chart" class="echarts" :options="polar" />
    <div v-else>no data</div>
  </div>
</template>

<style>
/**
 * The default size is 600px×400px, for responsive charts
 * you may need to set percentage values as follows (also
 * don't forget to provide a size for the container).
 */
.echarts {
  width: 100%;
  height: 100%;
}
</style>

<script>
// import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import echarts from 'vue-echarts'
// Import components of tooltip, title and toolbox.
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/axisPointer'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/grid'
// import 'echarts/lib/component/xAxis'
// import 'echarts/lib/component/yAxis'
// import 'echarts/lib/component/series'
// console.log(import 'excharts')
// import 'echarts/lib/chart/line'
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/component/polar'
// import 'echarts/lib/component/pie'

export default {
  components: {
    'v-chart': echarts
  },
  // props: {
  //   chartData: {
  //     type: Array,
  //     required: true
  //   },
  //   timeStamp: {
  //     type: Array,
  //     required: true
  //   },
  //   sparkline: {
  //     type: Array,
  //     required: true
  //   }
  // },
  data() {
    return {
      chart: false,
      sparkline: [1, 2, 3],
      dates: [1, 2, 3],
      polar: {
        title: {
          left: 'center'
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.dates
        },
        yAxis: {
          type: 'value',
          nameGap: 15,
          boundaryGap: [0, '100%'],
          max(value) {
            const indentation = (value.max / 100) * 5
            return value.max + indentation
          },
          min(value) {
            const indentation = (value.min / 100) * 5
            return value.min - indentation
          }
        },
        dataZoom: [
          {
            type: 'inside',
            start: 80,
            end: 100
          },
          {
            start: 0,
            end: 10,
            handleIcon:
              'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }
        ],
        series: [
          {
            name: '模拟数据',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 158, 68)'
                },
                {
                  offset: 1,
                  color: 'rgb(255, 70, 131)'
                }
              ])
            },
            data: this.sparkline
          }
        ]
      }
    }
  },
  mounted() {}
  // methods: {
  //   dates() {
  //     const today = Date.now()
  //     const dayInMiliseconds = 24 * 3600 * 1000
  //     let sevenDaysAgo = today - dayInMiliseconds * 7
  //     const timeInterval = (today - sevenDaysAgo) / this.sparkline.length
  //     const dates = []
  //     for (let i = 0; i <= this.sparkline.length - 1; i++) {
  //       sevenDaysAgo += timeInterval
  //       dates.push(this.$moment(sevenDaysAgo).format('Do, h:mm a'))
  //     }
  //     return dates
  //   }
  // }
}
</script>
