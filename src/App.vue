<template>
  <div id="app">
    <div class="row">
      <h1>Public Info</h1>
    </div>
    <div class="row">
      <Panel v-slot="slotProps" :images="1">
        <h1>IDENTITY</h1>
        <div class="no-animate" style="display: flex;">
          <div class="no-animate" style="width: 150px; margin-right: 10px;">
            <img v-on:load="slotProps.imgOnload" class="no-animate" src="./assets/avatar.png" style="display: block; width: 100%;">
          </div>
          <div class="no-animate" style="display: flex; flex-direction: column;">
            <h3>CODENAME: MYKE</h3>
            <br class="no-animate">
            <h4>A frontend developer that can operate without getting energy from coffee</h4>
            <h4>Current whereabouts is unknown but rumors say that he lives in a swamp</h4>
          </div>
        </div>
      </Panel>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import Panel from './components/Panel'
import chartOptions from './data/chartOptions'
import chartSeries from './data/chartSeries'

export default {
  name: 'app',
  components: {
    Panel,
    apexchart: VueApexCharts
  },
  data () {
    return {
      options: chartOptions,
      series: chartSeries
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Share+Tech+Mono&display=swap');

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

html {
  background-size: 40px 40px;
  background-image: linear-gradient(to right, #112740 1px, transparent 1px), linear-gradient(to bottom, #112740 1px, #001831 1px);
}

#app {
  padding: 20px;
  color: #fff;
  font-family: 'Share Tech Mono', monospace;
  -webkit-font-smoothing: antialiased;

  * {
    line-height: 1;
    margin: 5px 0 0 0;
  }

  h1 {
    margin: 0 0 10px 0;
  }

  h1::before {
    content: '|';
    margin-right: 5px;
    font-weight: 900;
    color: white;
  }
}

.row {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: 20px !important;
}

a {
  color: #fff;
}
</style>
