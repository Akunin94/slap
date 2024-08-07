<template>
  <div v-show="isLoaded" class="sl-main-girl2" ref="area">
    <div
      class="sl-main-girl2__slapable-area sl-main-girl2__slapable-area--left"
      @mousedown="onSlap('left')"
    />
    <div
      class="sl-main-girl2__slapable-area sl-main-girl2__slapable-area--right"
      @mousedown="onSlap('right')"
    />
  </div>
  <SlLoader class="sl-main-girl2__loader" v-if="!isLoaded" />
</template>

<script>
import { useGlobalStore } from "@/store/global";
import * as PIXI from "pixi.js";
import { Spine } from "pixi-spine";
import SlLoader from "@/components/Loader.vue";

export default {
  name: "SlapMainGirl",

  components: {
    SlLoader,
  },

  emits: ["slap", "ready"],

  data() {
    return {
      isLoaded: false,
      animationIdleEntryCount: 0,
      globalStore: useGlobalStore(),
      animation: null,
      app,
    };
  },

  methods: {
    spineInit() {
      this.app = new PIXI.Application({
        height: 900,
        width: 600,
        backgroundAlpha: 0,
      });

      this.app.stage.interactive = true;
      this.$refs.area.appendChild(this.app.view);

      PIXI.Assets.load("/spine1/standard_v2_2x_faceai.json")
        .then((resource) => {
          this.animation = new Spine(resource.spineData);

          this.animation.scale.set(0.5, 0.5);
          this.animation.position.set(
            this.app.screen.width / 2,
            this.app.screen.height
          );
          this.app.stage.addChild(this.animation);

          if (this.animation.state.hasAnimation("Idle")) {
            this.animation.state.setAnimation(0, "Idle", true);
            this.animation.state.timeScale = 1;
            this.animation.autoUpdate = true;
          }

          this.animation.interactive = true;
          this.animation.state.addListener({
            complete: (entry) => {
              this.animation.state.setAnimation(0, "Idle", true);

              if (entry.animation.name === "Idle") {
                this.animationIdleEntryCount += 1;

                if (this.animationIdleEntryCount > 2) {
                  this.animation.state.setAnimation(0, "Wait", true);
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

          this.isLoaded = true;
          setTimeout(() => {
            this.$emit("ready");
          }, 500);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    onSlap(position) {
      if (
        this.globalStore.energyLeftAmount <
        this.globalStore.energyLeftIncrementAmount
      ) {
        return;
      }

      // const hitAnimationName = "Hits";
      const hitAnimationName = position === "left" ? "Hit_R" : "Hit_L";

      this.animation.state.setAnimation(0, hitAnimationName, false);
      this.$emit("slap");
    },
  },

  async mounted() {
    this.spineInit();
  },
};
</script>

<style lang="scss" scoped>
.sl-main-girl2 {
  position: absolute;
  left: 0;
  left: 0;
  width: 100%;
  padding: 50px 0 150px;
  height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  z-index: 4;

  &:deep(canvas) {
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
    position: relative;
  }

  &__slapable-area {
    position: absolute;
    z-index: 10;
    bottom: 20vh;
    left: 50%;
    transform: translateX(-50%);
    width: 23vh;
    height: 27vh;

    &--left {
      margin-left: -11.5vh;
    }

    &--right {
      margin-left: 11.5vh;
    }
  }

  &__loader {
    position: fixed;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
