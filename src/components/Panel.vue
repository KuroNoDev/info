<template>
  <div id="Panel">
    <slot v-bind:imgOnload="imgOnload"></slot>
  </div>
</template>

<script>
import { setInterval } from 'timers';
const letters = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'.split('')
const objectsToAnimate = []
let loadedImages = 0
let stop = false
let frameCount = 0
let fps, fpsInterval, startTime, now, then, elapsed

export default {
  props: ['images'],
  methods: {
    imgOnload () {
      loadedImages += 1
      if (this.images && loadedImages === this.images) this.animate()
    },
    animate () {
      const el = this.$el
      const bounding = el.getBoundingClientRect()
      const {width, height} = bounding
      
      el.style.width = `${width}px`
      el.style.height = `${height}px`

      Array.from(el.querySelectorAll('*:not(.no-animate)')).forEach((elem) => {
        elem.setAttribute('val', elem.innerHTML)
        elem.innerHTML = ''
        objectsToAnimate.push({elem})
      })

      fpsInterval = 1000 / 75
      then = Date.now()
      startTime = then
      requestAnimationFrame(anim.bind(this))
    }
  },
  mounted () {
    if (!this.images) this.animate()
  }
}

function anim () {
  requestAnimationFrame(anim.bind(this))

  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval)

    const unfinished = objectsToAnimate.filter((obj) => obj.elem.innerHTML !== obj.elem.getAttribute('val'))
  
    if (unfinished.length === 0) {
      this.$el.style.width = ''
      this.$el.style.height = ''
      return
    }

    unfinished.forEach((obj) => {
      const currentVal = obj.elem.innerHTML
      const originalVal = obj.elem.getAttribute('val')

      if (obj.randomLetterCount === undefined) {
        obj.randomLetterCount = originalVal.length <= 10
          ? 10 : originalVal.length <= 30
          ? 8 : originalVal.length <= 50
          ? 6 : originalVal.length <= 70
          ? 4 : originalVal.length <= 90
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
</script>

<style lang="scss" scoped>
#Panel {
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  background: rgba(#000411, 0.3);
  box-shadow: 0px 0px 2px #fff;
  text-shadow: 0px 0px 20px rgba(#fff, 0.8);
}
</style>
