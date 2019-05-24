<template>
  <div class="Panel">
    <slot v-bind:imgOnload="imgOnload"></slot>
  </div>
</template>

<script>
import { setTimeout } from 'timers';

export default {
  props: ['images'],
  created () {
    this.objectsToAnimate = []
    this.loadedImages = 0
    this.stop = false
    this.frameCount = 0

    const actions = [{ 
      message: 'test', func: data => {
        const letters = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'.split('')

        data.now = Date.now()
        data.elapsed = data.now - data.then

        if (data.elapsed > data.fpsInterval) {
          data.then = data.now - (data.elapsed % data.fpsInterval)

          if (!isInViewport(data.elData)) return

          const unfinished = data.objectsToAnimate

          if (!unfinished || unfinished.length === 0) {
            return []
          }

          unfinished.forEach((obj) => {
            const currentVal = obj.elem.currentVal
            const originalVal = obj.elem.originalVal

            if (obj.randomLetterCount === undefined) {
              obj.randomLetterCount = originalVal.length <= 10
                ? 9 : originalVal.length <= 20
                ? 6 : originalVal.length <= 30
                ? 3 : 2
            }

            if (!obj.lettersQueue) {
              const lettersQueue = getRandom(letters, obj.randomLetterCount)
              lettersQueue.push(originalVal.charAt(currentVal.length))
              obj.lettersQueue = lettersQueue
            } else if (Array.isArray(obj.lettersQueue)) {
              if (obj.lettersQueue.length === obj.randomLetterCount + 1)
                obj.elem.currentVal += obj.lettersQueue.shift()
              if (obj.lettersQueue.length > 0)
                obj.elem.currentVal = obj.elem.currentVal !== ''
                  ? obj.elem.currentVal.replace(/(\s|\S)$/, obj.lettersQueue.shift())
                  : obj.lettersQueue.shift()
              else
                delete obj.lettersQueue
            }
          })
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

        function isInViewport (elemData) {
          return elemData.top >= 0 && elemData.bottom <= data.windowInnerHeight
        }

        return data.objectsToAnimate
      }
    }]

    this.testWorker = this.$worker.create(actions)
  },
  methods: {
    imgOnload () {
      this.loadedImages += 1
      if (this.images && this.loadedImages === this.images) this.startAnimate()
    },
    startAnimate () {
      const bounding = this.$el.getBoundingClientRect()
      const {width, height} = bounding
      
      this.$el.style.width = `${width}px`
      this.$el.style.height = `${height}px`

      Array.from(this.$el.querySelectorAll('*:not(.no-animate)')).forEach((elem) => {
        elem.setAttribute('val', elem.innerHTML)
        elem.innerHTML = ''
        this.objectsToAnimate.push({elem})
      })

      this.fpsInterval = 1000 / 144
      this.then = Date.now()
      this.startTime = this.then
      requestAnimationFrame(this.animate)
    },
    animate () {
      // requestAnimationFrame(this.animate)
      const objectsToAnimate = this.objectsToAnimate.filter((obj) => obj.elem.innerHTML !== obj.elem.getAttribute('val'))

      this.testWorker.postMessage('test', [{
        objectsToAnimate: objectsToAnimate.map((obj) => {
          const cleanElem = {
            currentVal: obj.elem.innerHTML,
            originalVal: obj.elem.getAttribute('val')
          }
          
          return {
            elem: cleanElem,
            lettersQueue: obj.lettersQueue,
            randomLetterCount: obj.randomLetterCount
          }
        }),
        fpsInterval: this.fpsInterval,
        then: this.then,
        startTime: this.startTime,
        elData: this.$el.getBoundingClientRect(),
        windowInnerHeight: window.innerHeight
      }])
      .then((res) => {
        objectsToAnimate.forEach((obj, index) => {
          obj.elem.innerHTML = res[index].elem.currentVal
          obj.lettersQueue = res[index].lettersQueue
          obj.randomLetterCount = res[index].randomLetterCount
        })
      })
      .catch(console.error)

      // this.now = Date.now()
      // this.elapsed = this.now - this.then

      // if (this.elapsed > this.fpsInterval) {
      //   this.then = this.now - (this.elapsed % this.fpsInterval)

      //   if (!isInViewport(this.$el)) return

      //   const unfinished = this.objectsToAnimate.filter((obj) => obj.elem.innerHTML !== obj.elem.getAttribute('val'))
      
      //   if (!unfinished || unfinished.length === 0) {
      //     if (this.$el.style.width !== '') this.$el.style.width = ''
      //     if (this.$el.style.height !== '') this.$el.style.height = ''
      //     return
      //   }

      //   unfinished.forEach((obj) => {
      //     const currentVal = obj.elem.innerHTML
      //     const originalVal = obj.elem.getAttribute('val')

      //     if (obj.randomLetterCount === undefined) {
      //       obj.randomLetterCount = originalVal.length <= 10
      //         ? 9 : originalVal.length <= 20
      //         ? 6 : originalVal.length <= 30
      //         ? 3 : 2
      //     }

      //     if (!obj.lettersQueue) {
      //       obj.lettersQueue = [...getRandom(letters, obj.randomLetterCount), originalVal.charAt(currentVal.length)]
      //     } else if (Array.isArray(obj.lettersQueue)) {
      //       if (obj.lettersQueue.length === obj.randomLetterCount + 1)
      //         obj.elem.innerHTML += obj.lettersQueue.shift()
      //       if (obj.lettersQueue.length > 0)
      //         obj.elem.innerHTML = obj.elem.innerHTML !== ''
      //           ? obj.elem.innerHTML.replace(/(\s|\S)$/, obj.lettersQueue.shift())
      //           : obj.lettersQueue.shift()
      //       else
      //         delete obj.lettersQueue
      //     }
      //   })
      // }
    }
  },
  mounted () {
    if (!this.images) {
      setTimeout(() => this.startAnimate())
    }
  }
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
