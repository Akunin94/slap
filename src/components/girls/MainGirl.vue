<template>
  <div v-show="isLoaded" class="sl-main-girl" ref="area" />
  <SlLoader v-if="!isLoaded" />
</template>

<script>
import * as PIXI from "pixi.js";
import { Spine } from "pixi-spine";
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
      animationIdleEntryCount: 0,
    };
  },

  methods: {
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
          animation.state.addListener({
            complete: (entry) => {
              animation.state.setAnimation(0, "Idle", true);

              if (entry.animation.name === "Idle") {
                this.animationIdleEntryCount += 1;

                if (this.animationIdleEntryCount > 2) {
                  animation.state.setAnimation(0, "Wait", true);
                }
              }
            },
            start: (entry) => {
              if (entry.animation.name !== "Idle") {
                this.animationIdleEntryCount = 0;
              }
            },
            interrupt: () => {},
            end: () => {},
          });
          animation.on("pointerdown", async () => {
            if (!this.energyLeftAmount) {
              return;
            }

            animation.state.setAnimation(0, "Hit", false);
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
.sl-main-girl {
  position: absolute;
  left: 0;
  left: 0;
  width: 100%;
  padding: 80px 0 120px;
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
    height: 180px;
    background: linear-gradient(180deg, #000000 39.5%, rgba(0, 0, 0, 0) 100%);
    pointer-events: none;
  }

  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    content: "";
    height: 328px;
    background: linear-gradient(0deg, #000000 35.03%, rgba(0, 0, 0, 0) 100%);
    pointer-events: none;
  }

  &:deep(canvas) {
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
    position: relative;
  }
}
</style>
