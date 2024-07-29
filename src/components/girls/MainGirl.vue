<template>
  <div v-show="isLoaded" class="sl-main-girl-with-animation" ref="area" />
  <SlLoader v-if="!isLoaded" />
</template>

<script>
import * as PIXI from "pixi.js";
import { Spine } from "pixi-spine";
import { debounce } from "lodash";
import SlLoader from "@/components/Loader.vue";

export default {
  name: "SlapMainGirl",

  components: {
    SlLoader,
  },

  emits: ["slap"],

  props: {
    energyLeftAmount: Number,
  },

  data() {
    return {
      isLoaded: false,
    };
  },

  methods: {
    setIdleAnimation: debounce((animation) => {
      animation.state.setAnimation(0, "Idle", true);
    }, 1700),
    spineInit() {
      var app = new PIXI.Application({
        height: 900,
        width: 500,
        backgroundAlpha: 0,
      });
      app.stage.interactive = true;
      this.$refs.area.appendChild(app.view);

      PIXI.Assets.load("spine/standard_v2_2x_faceai.json")
        .then((resource) => {
          const animation = new Spine(resource.spineData);

          animation.scale.set(0.5, 0.5);
          animation.position.set(app.screen.width / 2, app.screen.height);
          app.stage.addChild(animation);

          if (animation.state.hasAnimation("Idle")) {
            animation.state.setAnimation(0, "Idle", true);
            animation.state.timeScale = 1;
            animation.autoUpdate = true;
          }

          animation.interactive = true;
          animation.on("pointerdown", async () => {
            if (!this.energyLeftAmount) {
              return;
            }

            animation.state.setAnimation(0, "Hit", false);
            this.setIdleAnimation(animation);
            this.$emit("slap");
          });

          this.isLoaded = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },

  async mounted() {
    this.spineInit();
  },
};
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
    content: "";
    height: 120px;
    background: linear-gradient(180deg, #000000 50%, rgba(77, 23, 55, 0) 100%);
  }

  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    content: "";
    height: 120px;
    background: linear-gradient(0deg, #000000 50%, rgba(77, 23, 55, 0) 100%);
  }

  &:deep(canvas) {
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
    position: relative;
  }
}
</style>
