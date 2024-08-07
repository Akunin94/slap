<template>
  <div
    class="sl-layout"
    :style="{ backgroundImage: `url('${globalStore.globalBackground}')` }"
  >
    <router-view
      v-show="isPageReady"
      @ready="isPageReady = true"
      @not-ready="isPageReady = false"
    ></router-view>
    <div
      class="sl-layout__splash"
      :class="{ 'sl-layout__splash--hidden': isPageReady }"
    >
      <SlLoader
        class="sl-layout__loader fixed left-0 right-0 top-1/2 -translate-y-1/2"
      />
    </div>
  </div>
</template>

<script>
import { useGlobalStore } from "@/store/global";
import SlLoader from "@/components/Loader.vue";
import { useWebAppViewport } from "vue-tg";

const { disableVerticalSwipes } = useWebAppViewport();

export default {
  name: "SlapApp",

  components: { SlLoader },

  data() {
    return {
      timeout: null,
      isReady: false,
      globalStore: useGlobalStore(),
      isDev: import.meta.env.DEV,
      isPageReady: false,
    };
  },

  computed: {
    isTelegramBot() {
      return window.Telegram?.WebApp?.initData;
    },
    energyLeftAmount() {
      return this.globalStore.energyLeftAmount;
    },
    balance() {
      return this.globalStore.balance;
    },
    webApp() {
      return window.Telegram.WebApp;
    },
  },

  methods: {
    persistClicks() {
      console.log("persistClicks", this.balance);
      try {
        this.webApp.CloudStorage.setItem(
          "clicks_count",
          this.balance,
          (error, success) => {
            if (error) {
              console.error("clicks_count", error);
            } else {
              if (success) {
                console.log(`Clicks persisted succesfuly: ${this.balance}`);
              } else {
                console.log(`Clicks failed to persist: ${this.balance}`);
              }
            }
          }
        );
      } catch (error) {
        console.error(error);
      }

      const nowTimestamp = new Date().getTime();
      const energyStorageData = `${this.energyLeftAmount};${nowTimestamp}`;

      try {
        this.webApp.CloudStorage.setItem(
          "energy_left",
          energyStorageData,
          (error, success) => {
            if (error) {
              console.error("energy_left", error);
            } else {
              if (success) {
                console.log(`Energy left setted: ${this.energyStorageData}`);
              } else {
                console.log(`Energy left failed: ${this.energyStorageData}`);
              }
            }
          }
        );
      } catch (error) {
        console.error(error);
      }
    },

    fetchClicks() {
      try {
        this.webApp.CloudStorage.getItem("clicks_count", (error, value) => {
          if (error) {
            console.error(error);
          } else {
            this.globalStore.setBalance(+value);
            console.log(`Fetched clicks: ${value}`);
          }
        });
      } catch (error) {
        console.error(error);
        this.globalStore.setBalance(0);
      } finally {
        this.isReady = true;
        // TEMP!!!
        if (this.balance === null) {
          this.globalStore.setBalance(0);
        }
      }
    },

    getActualEnergy(input) {
      const [energy, timestamp] = input.split(";");
      const initialEnergy = parseInt(energy);
      const initialTimestamp = parseInt(timestamp) / 1000;
      const currentTimestamp = Date.now() / 1000;
      const timeDiff = currentTimestamp - initialTimestamp;
      const actualEnergy = initialEnergy + Math.floor(timeDiff * 3);

      if (typeof actualEnergy === "number" && !isNaN(actualEnergy)) {
        return actualEnergy;
      }

      return this.globalStore.energyMaxAmount;
    },

    fetchEnergy() {
      if (this.globalStore.isDevMode) {
        this.globalStore.setEnergyLeftAmount(500);
      }

      try {
        this.webApp.CloudStorage.getItem("energy_left", (error, value) => {
          if (error) {
            console.error(error);
          } else {
            this.globalStore.setEnergyLeftAmount(this.getActualEnergy(value));
            console.log(`Fetched energy: ${value}`);
          }
        });
      } catch (error) {
        console.error(error);
        this.globalStore.setEnergyLeftAmount(this.globalStore.energyMaxAmount);
      } finally {
        this.isReady = true;
      }
    },
  },

  watch: {
    balance() {
      if (!this.isReady) {
        return;
      }

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        this.persistClicks();
      }, 1000);
    },
  },

  created() {
    this.webApp.ready();
    this.webApp.expand();
    this.webApp.setHeaderColor("#000000");
    this.webApp.setBackgroundColor("#000000");
    disableVerticalSwipes();
  },

  mounted() {
    console.log("APP VERSION", 9);
    this.globalStore.setIsDevMode(this.isDev);
    this.fetchClicks();
    this.fetchEnergy();

    try {
      this.webApp.CloudStorage.getItem("background", (error, value) => {
        console.log("get background", error, value);
        if (error) {
          this.globalStore.setGlobalBackground("/background.png");
        } else {
          this.globalStore.setGlobalBackground(value);
        }
      });
    } catch (error) {
      console.log("get background error", error);
      this.globalStore.setGlobalBackground("/background.png");
    }

    try {
      this.webApp.CloudStorage.getItem("main_animation", (error, value) => {
        if (error) {
          this.globalStore.setGlobalAnimation("MainGirl");
        } else {
          this.globalStore.setGlobalAnimation(value);
        }
      });
    } catch (error) {
      this.globalStore.setGlobalAnimation("MainGirl");
    }

    setInterval(() => {
      this.globalStore.setEnergyLeftAmount(
        this.globalStore.energyLeftAmount + 3
      );
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
.sl-layout {
  background: #55052c url("/background.png") 50% 50% / cover no-repeat;
  position: relative;
  height: var(--tg-viewport-height, 100vh);

  &__splash {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: var(--tg-viewport-height, 100vh);
    background: url(/girl3.png) 50% 100% / auto 100% no-repeat,
      url("/background3.png") 50% 50% / cover no-repeat #4c2949;
    opacity: 1;
    visibility: visible;
    transition: 0.35s;
    z-index: 10;

    &--hidden {
      opacity: 0;
      visibility: hidden;
    }
  }

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
    z-index: 4;
  }

  &__loader {
    &:deep(.sl-loader__svg) {
      width: 80px;
      height: 80px;
      max-width: 80px;
    }
  }
}
</style>