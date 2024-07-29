<template>
  <div
    v-show="isLoaded" 
    class="sl-main-girl-with-animation"
    ref="area"
  />
  <div
    v-if="!isLoaded"
    class="sl-main-girl-with-animation-loading"
  >
    <svg class="loader" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle class="loader__ring" cx="50" cy="50" r="45" fill="none" stroke-width="10" stroke-linecap="round" />
      <circle class="loader__indicator" cx="50" cy="50" r="45" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="282.6" stroke-dashoffset="282.6" transform="rotate(-90 50 50)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="-90 50 50"
          to="270 50 50"
          dur="2s"
          repeatCount="indefinite" />
        <animate
          attributeName="stroke-dashoffset"
          from="282.6"
          to="0"
          dur="2s"
          repeatCount="indefinite" />
      </circle>
    </svg>
  </div>
</template>

<script>
import * as PIXI from "pixi.js";
import {Spine} from 'pixi-spine';
import {debounce} from 'lodash'

export default {
  name: 'SlapMainGirl',

  emits: ['slap'],

  props: {
    energyLeftAmount: Number
  },

  data() {
    return {
      isLoaded: false
    }
  },

  methods: {
    setIdleAnimation: debounce((animation) => {
      animation.state.setAnimation(0, 'Idle', true);
    }, 1700),
    spineInit() {
      var app = new PIXI.Application({
        height: 900,
        width: 500,
        backgroundAlpha: 0
      });
      app.stage.interactive = true;
      this.$refs.area.appendChild(app.view)

      PIXI.Assets.load("spine/standard_v2_2x_faceai.json")
        .then((resource) => {
          const animation = new Spine(resource.spineData);

          animation.scale.set(0.5, 0.5);
          animation.position.set(app.screen.width / 2, app.screen.height);
          app.stage.addChild(animation);
          
          if (animation.state.hasAnimation('Idle')) {
            animation.state.setAnimation(0, 'Idle', true);
            animation.state.timeScale = 1;
            animation.autoUpdate = true;
          }

          animation.interactive = true;
          animation.on('pointerdown', async () => {
            if (!this.energyLeftAmount) {
              return
            }

            animation.state.setAnimation(0, 'Hit', false);
            this.setIdleAnimation(animation);
            this.$emit('slap')            
          });

          this.isLoaded = true
        })
        .catch((error) => {
          console.error(error)
        })
    },
  },

  async mounted() {
    this.spineInit();
  }
}
</script>

<style lang="scss" scoped>
.sl-main-girl-with-animation {
  position: absolute;
  left: 0;
  left: 0;
  width: 100%;
  padding: 5px 0 0;
  height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;

  &:before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    content: '';
    height: 120px;
    background: linear-gradient(180deg, #000000 50%, rgba(77, 23, 55, .0) 100%);
  }

  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    content: '';
    height: 120px;
    background: linear-gradient(0deg, #000000 50%, rgba(77, 23, 55, .0) 100%);
  }

  &:deep(canvas) {
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
    position: relative;
  }
}

.sl-main-girl-with-animation-loading {
  position: fixed;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  svg {
    width: 10vh;
    max-width: 10vw;
    margin: auto;
  }

  svg .loader__indicator {
    stroke: white;
  }
}
</style>
