<template>
  <MainGirl @slap="onSlap" />
  <MainHeader />
  <MainFooter has-actions />
</template>

<script>
import { useGlobalStore } from "@/store/global";
import MainGirl from "@/components/girls/MainGirl.vue";
import MainHeader from "@/components/header/Header.vue";
import MainFooter from "@/components/footer/Footer.vue";

export default {
  name: "SlapMainPage",

  components: {
    MainGirl,
    MainHeader,
    MainFooter,
  },

  data() {
    return {
      globalStore: useGlobalStore(),
    };
  },

  computed: {
    energyLeftAmount() {
      return this.globalStore.energyLeftAmount;
    },
  },

  methods: {
    onSlap() {
      if (this.energyLeftAmount === 0) {
        return;
      }

      this.globalStore.incrementBalance();
      this.globalStore.decrementEnergyLeftAmount();
      window.Telegram.WebApp.HapticFeedback.impactOccurred("heavy");
      console.log("slap", this.globalStore.balance);
    },
  },
};
</script>