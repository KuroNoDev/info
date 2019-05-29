<template>
  <div class="Panel">
    <slot v-bind:imgOnload="imgOnload"></slot>
  </div>
</template>

<script>
const letters = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'.split('')
const panels = []
let stop = false
let fpsInterval = 1000 / 144
let then = Date.now()
let startTime = then
let now, elapsed

animate()

export default {
  props: ['images'],
  created () {
    this.loadedImages = 0
  },
  methods: {
    imgOnload () {
      this.loadedImages += 1
      if (this.images && this.loadedImages === this.images) this.addToAnimate()
    },
    addToAnimate () {
      const bounding = this.$el.getBoundingClientRect()
      const {width, height} = bounding
      const objectsToAnimate = []
      
      this.$el.style.width = `${width}px`
      this.$el.style.height = `${height}px`

      Array.from(this.$el.querySelectorAll('*:not(.no-animate)')).forEach((elem) => {
        elem.setAttribute('val', elem.innerHTML)
        elem.innerHTML = ''
        objectsToAnimate.push({elem})
      })

      panels.push({
        el: this.$el,
        objectsToAnimate
      })
    }
  },
  mounted () {
    if (!this.images) this.addToAnimate()
  }
}

function animate () {
  requestAnimationFrame(animate)

  now = Date.now()
  elapsed = now - then

  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval)

    panels.forEach((panel) => {
      if (!isInViewport(panel.el)) return

      const unfinished = panel.objectsToAnimate.filter((obj) => obj.elem.innerHTML !== obj.elem.getAttribute('val'))
    
      if (!unfinished || unfinished.length === 0) {
        if (panel.el.style.width !== '') panel.el.style.width = ''
        if (panel.el.style.height !== '') {
          panel.el.style.height = ''
          panel.el.querySelectorAll('.hidden').forEach((hiddenEl) => {
            hiddenEl.classList.remove('hidden')
          })
        }
        return
      }

      unfinished.forEach((obj) => {
        const currentVal = obj.elem.innerHTML
        const originalVal = obj.elem.getAttribute('val')

        if (obj.randomLetterCount === undefined) {
          obj.randomLetterCount = originalVal.length <= 10
            ? 6 : originalVal.length <= 30
            ? 5 : originalVal.length <= 50
            ? 4 : originalVal.length <= 70
            ? 3 : originalVal.length <= 90
            ? 2 : 1
        }

        if (!obj.lettersQueue) {
          obj.lettersQueue = [...getRandom(letters, obj.randomLetterCount), originalVal.charAt(currentVal.length)]
        } else if (Array.isArray(obj.lettersQueue)) {
          if (obj.lettersQueue.length === obj.randomLetterCount + 1)
            obj.elem.innerHTML += obj.lettersQueue.shift()
          if (obj.lettersQueue.length > 0)
            obj.elem.innerHTML = obj.elem.innerHTML !== ''
              ? obj.elem.innerHTML.replace(/(\s|\S)$/, obj.lettersQueue.shift())
              : obj.lettersQueue.shift()
          else
            delete obj.lettersQueue
        }
      })
    })
  }
}

function getRandom(arr, n) {
  let result = new Array(n)
  let len = arr.length
  let taken = new Array(len)

  if (n > len) throw new RangeError("getRandom: more elements taken than available")

  while (n--) {
    const x = Math.floor(Math.random() * len)
    result[n] = arr[x in taken ? taken[x] : x]
    taken[x] = --len in taken ? taken[len] : len
  }

  return result
}

function isInViewport (elem) {
  const bounding = elem.getBoundingClientRect()
  return bounding.top >= 0 && (bounding.bottom - (bounding.height / 2)) <= document.documentElement.clientHeight
}
</script>

<style lang="scss" scoped>
.Panel {
  display: flex;
  flex-direction: column;
  margin: 10px 20px !important;
  padding: 20px;
  box-sizing: border-box;
  background: rgba(#000411, 0.3);
  box-shadow: 0px 0px 2px #fff;
  text-shadow: 0px 0px 20px rgba(#fff, 0.8);
}
</style>
