import Vue from 'vue'
import loading from '@/components/Loading'

const components = { loading }

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
