<template>
  <div class="sl-layout min-h-screen">
    <router-view />
  </div>
</template>

<script>
import { useGlobalStore } from "@/store/global";

export default {
  name: "SlapApp",

  data() {
    return {
      timeout: null,
      isReady: false,
      globalStore: useGlobalStore(),
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

      // const energyStorageData = `${this.energyLeftAmount};${new Date().getTime()}`

      // window.Telegram.WebApp.CloudStorage.setItem('energy_left', energyStorageData, (error, success) => {
      //    if (error) {
      //     console.error('energy_left', error);
      //   } else {
      //     if (success) {
      //       console.log(`Energy left setted: ${this.balance}`)
      //     }
      //     else {
      //       console.log(`Energy left failed: ${this.balance}`)
      //     }
      //   }
      // });
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

    fetchEnergy() {
      try {
        this.webApp.CloudStorage.getItem("clicks_count", (error, value) => {
          if (error) {
            console.error(error);
          } else {
            this.globalStore.setEnergyLeftAmount(+value);
            console.log(`Fetched clicks: ${value}`);
          }
        });
      } catch (error) {
        console.error(error);
        this.globalStore.setEnergyLeftAmount(20);
      } finally {
        this.isReady = true;
        // TEMP!!!
        if (this.energyLeftAmount === null) {
          this.globalStore.setEnergyLeftAmount(20);
        }
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

  mounted() {
    this.fetchClicks();
    this.fetchEnergy();
  },
};
</script>

<style lang="scss" scoped>
.sl-layout {
  background: #55052c url("/background.png") 50% 50% / cover no-repeat;
  position: relative;

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
}
</style>