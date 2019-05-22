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
            <br>
            <h4>A frontend developer that can operate without getting energy from coffee</h4>
            <h4>Rumors say that he lives in a swamp</h4>
            <h4>Current whereabouts is unknown</h4>
          </div>
        </div>
      </Panel>
      <Panel>
        <h1>AFFILIATIONS</h1>
        <h3>TORO Limited</h3>
        <h4>Date joined: November 2014</h4>
        <h4>Last seen: May 2019</h4>
      </Panel>
      <Panel>
        <h1>PUBLIC SIGHTINGS</h1>
        <h3>Location: Holy Angel University</h3>
        <h3>Date: March 2016</h3>
        <h4>Operation: Hackathon</h4>
        <h4>Role: Speaker and Facilitator</h4>
        <br>
        <h3>Location: Angel University Foundation</h3>
        <h3>Date: August 2016</h3>
        <h4>Operation: Basic Web Development Seminar</h4>
        <h4>Role: Resource Speaker</h4>
        <br>
        <h3>Location: PSITE Region 3</h3>
        <h3>Date: September 2017</h3>
        <h4>Operation: Conference and Hackathon</h4>
        <h4>Role: Speaker and Facilitator</h4>
      </Panel>
    </div>
    <div class="row" style="flex-direction: column; align-items: center;">
      <h1>Power Levels</h1>
      <h3>Warning: Because power levels are hard to calculate, what you'll see below is the subject's time spent with each ability</h3>
    </div>
    <div class="row">
      <apexchart width="600" height="500" type="rangeBar" :options="options" :series="series"></apexchart>
    </div>
    <div class="row">
      <h1>Projects</h1>
    </div>
    <div class="row">
      <Panel>
        <h1>TORO IT Elite 2018 Championship - TORO Towers</h1>
        <h3>A tower defense game</h3>
        <h3>Participants must place their towers on the most efficient position</h3>
        <h3>Technologies: Node.js, Javascript, Websockets</h3>
      </Panel>
      <Panel>
        <h1>TORO IT Elite 2019 Championship - TORO CIV</h1>
        <h3>A civilization-esque game</h3>
        <h3>Participants must build their own civilization with the fastest strategy</h3>
        <h3>Technologies: Node.js, Javascript</h3>
      </Panel>
    </div>
    <div class="row">
      <Panel>
        <h1>TORO Coder Cloud</h1>
        <h3>A revolutionary web based IDE</h3>
        <h3 class="no-animate">
          <a href="https://www.torocloud.com/toro-integrate/developing" target="blank">more info</a>
        </h3>
        <h3>Technologies: Node.js, Websockets, ES6, AnguarJS</h3>
      </Panel>
    </div>
    <div class="row">
      <Panel v-slot="slotProps" :images="2" style="max-width: 80%;">
        <h1>TORO Build</h1>
        <h3>A web based SPA builder</h3>
        <h3>Technologies: Node.js, ES6, AnguarJS</h3>
        <div class="no-animate" style="display: flex;">
          <div class="no-animate" style="flex: 1; margin-right: 10px;">
            <img v-on:load="slotProps.imgOnload" class="no-animate" src="./assets/build 1.gif" style="display: block; width: 100%; height: 100%;">
          </div>
          <div class="no-animate" style="flex: 1;">
            <img v-on:load="slotProps.imgOnload" class="no-animate" src="./assets/build 2.gif" style="display: block; width: 100%; height: 100%;">
          </div>
        </div>
      </Panel>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import Panel from './components/Panel'
const today = Date.now()

export default {
  name: 'app',
  components: {
    Panel,
    apexchart: VueApexCharts
  },
  data () {
    return {
      options: {
        chart: {
          toolbar: {
            show: false
          }
        },
        fill: {
          colors: ['rgba(0, 4, 17, 0.7)']
        },
        grid: {
          borderColor: 'transparent',
          row: {
            colors: ['transparent']
          },
          column: {
            colors: ['transparent']
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
          }
        },
        tooltip: {
          followCursor: true,
          intersect: true,
          style: {
            fontSize: '1rem',
            fontFamily: 'Share Tech Mono, monospace',
            color: '#fff'
          },
          theme: 'dark'
        },
        yaxis: {
          min: new Date('2013-02-02').getTime(),
          max: today,
          labels: {
            offsetY: 5,
            style: {
              fontSize: '1.2rem',
              fontFamily: 'Share Tech Mono, monospace',
              color: '#fff'
            }
          }
        },
        xaxis: {
          type: 'datetime',
          labels: {
            style: {
              fontSize: '1rem',
              fontFamily: 'Share Tech Mono, monospace',
              colors: ['#fff']
            }
          }
        }
      },
      series: [{
        name: 'Time Spent',
        data: [{
          x: 'PHP',
          y: [new Date('2013-02-02').getTime(), new Date('2014-06-06').getTime()]
        }, {
          x: 'Flash',
          y: [new Date('2013-05-02').getTime(), new Date('2014-08-03').getTime()]
        }, {
          x: 'jQuery',
          y: [new Date('2014-11-02').getTime(), today]
        }, {
          x: 'AngularJS',
          y: [new Date('2015-04-15').getTime(), today]
        }, {
          x: 'SCSS',
          y: [new Date('2014-12-02').getTime(), today]
        }, {
          x: 'Node.js',
          y: [new Date('2016-04-15').getTime(), today]
        }, {
          x: 'Websockets',
          y: [new Date('2016-01-15').getTime(), today]
        }, {
          x: 'mySQL',
          y: [new Date('2017-02-15').getTime(), new Date('2017-04-15').getTime()]
        }, {
          x: 'MongoDB',
          y: [new Date('2018-03-11').getTime(), new Date('2019-05-17').getTime()]
        }, {
          x: 'ReactJS',
          y: [new Date('2017-07-11').getTime(), new Date('2017-08-11').getTime()]
        }, {
          x: 'Angular',
          y: [new Date('2017-01-11').getTime(), new Date('2017-03-12').getTime()]
        }, {
          x: 'Jekyll',
          y: [new Date('2018-09-11').getTime(), today]
        }, {
          x: 'Firebase',
          y: [new Date('2019-04-11').getTime(), today]
        }, {
          x: 'Vue.js',
          y: [new Date('2019-05-11').getTime(), today]
        }]
      }]
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
  justify-content: space-evenly;
  align-items: flex-start;
  margin-top: 20px !important;
}

a {
  color: #fff;
}
</style>
