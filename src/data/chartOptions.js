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
}