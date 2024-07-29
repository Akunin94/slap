<template>
  <div class="sl-layout min-h-screen">
    <MainGirl :energy-left-amount="energyLeftAmount" @slap="onSlap" />
    <MainHeader :balance="balance" />
    <MainFooter
      :energy-left-amount="energyLeftAmount"
      :energy-max-amount="energyMaxAmount"
    />
  </div>
</template>

<script>
import MainGirl from "./components/girls/MainGirl.vue";
import MainHeader from "./components/header/Header.vue";
import MainFooter from "./components/footer/Footer.vue";

export default {
  name: "SlapApp",

  data() {
    return {
      balance: null,
      timeout: null,
      isReady: false,
      energyLeftAmount: null,
      energyMaxAmount: 2000,
    };
  },

  components: {
    MainGirl,
    MainHeader,
    MainFooter,
  },

  methods: {
    onSlap() {
      if (this.energyLeftAmount === 0) {
        return;
      }

      this.balance = this.balance + 1;
      this.energyLeftAmount = this.energyLeftAmount - 1;
      window.Telegram.WebApp.HapticFeedback.impactOccurred("heavy");
      console.log("slap", this.balance);
    },

    persistClicks() {
      console.log("persistClicks", this.balance);
      window.Telegram.WebApp.CloudStorage.setItem(
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
        window.Telegram.WebApp.CloudStorage.getItem(
          "clicks_count",
          (error, value) => {
            if (error) {
              console.error(error);
            } else {
              this.balance = +value;
              console.log(`Fetched clicks: ${clicksCount}`);
            }
          }
        );
      } catch (error) {
        console.error(error);
        this.balance = 0;
      } finally {
        this.isReady = true;
        // TEMP!!!
        if (this.balance === null) {
          this.balance = 0;
        }
      }
    },

    fetchEnergy() {
      try {
        window.Telegram.WebApp.CloudStorage.getItem(
          "clicks_count",
          (error, value) => {
            if (error) {
              console.error(error);
            } else {
              this.balance = +value;
              console.log(`Fetched clicks: ${clicksCount}`);
            }
          }
        );
      } catch (error) {
        console.error(error);
        this.energyLeftAmount = 20;
      } finally {
        this.isReady = true;
      }
    },

    // fetchEnergy() {
    //   try {
    //     window.Telegram.WebApp.CloudStorage.getItem('energy_left', (error, value) => {
    //       if (error) {
    //         this.energyLeftAmount = this.energyMaxAmount
    //       } else {
    //         const energyData = value.split(';')
    //         const valueEnergy = energyData[0]

    //         this.energyLeftAmount = valueEnergy;
    //       }
    //     });
    //   } catch (error) {
    //     console.error(error)
    //     this.energyLeftAmount = this.energyMaxAmount
    //   }
    // }
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
  background: url("data:image/svg+xml,%3Csvg width='1080' height='2400' viewBox='0 0 1080 2400' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1080' height='2400' transform='matrix(-1 0 0 1 1080 0)' fill='url(%23paint0_linear_49_313)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_49_313' x1='540' y1='0' x2='540' y2='2400' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23374553'/%3E%3Cstop offset='0.91' stop-color='%2355052B'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A")
    50% 50% / 100% no-repeat;
}
</style>