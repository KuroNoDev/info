import chartSeries from './chartSeries'
const today = Date.now()

export default {
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
    style: {
      fontSize: '1rem',
      fontFamily: 'Share Tech Mono, monospace',
      color: '#fff'
    },
    theme: 'dark',
    custom ({dataPointIndex}) {
      const item = chartSeries[0].data[dataPointIndex]
      let diff = (item.y[1] - item.y[0]) / 1000
      diff /= (60 * 60 * 24)
      diff /= 365.25
      return `<div style="padding: 5px;">${item.x}: ${diff.toFixed(2)} years</div>`
    }
    // x: {
    //   show: true,
    //   format: 'dd MMM',
    //   formatter (value, timestamp) {
    //     console.log(value, timestamp)
    //     return value
    //   }
    // }
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
}