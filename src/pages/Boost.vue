<template>
  <div class="sl-boost-page overflow-auto">
    <BoostHeader />
    <BoostBody :boosters="boosters" :items-tasks="itemsTasks" />
  </div>
  <MainFooter />
</template>

<script>
import { useGlobalStore } from "@/store/global";
import MainFooter from "@/components/footer/Footer.vue";
import BoostHeader from "@/components/boost/BoostHeader.vue";
import BoostBody from "@/components/boost/BoostBody.vue";

export default {
  name: "SlapBoostPage",

  emits: ["ready"],

  components: {
    MainFooter,
    BoostHeader,
    BoostBody,
  },

  data() {
    return {
      globalStore: useGlobalStore(),
      boosters: [
        {
          title: "Full energy",
          amount: "6 / 6 Available",
          icon: "energy",
          done: false,
          popup: {
            icon: "energy",
            title: "Full energy",
            subtitle: "Restore energy limit for free to slap a little more",
            price: "FREE",
            desc: "6/6 every 24h",
          },
        },
        {
          title: "Turbo slap",
          amount: "Coming soon",
          icon: "boost",
          done: false,
          popup: {
            icon: "boost",
            title: "Turbo Slap",
            subtitle: "Get turbo for 10 seconds",
            price: "FREE",
            desc: "2 every 24h",
          },
        },
      ],
      itemsTasks: [
        {
          title: "Slap Power",
          reward: "2000",
          lvl: "1",
          icon: "slap",
          done: false,
          popup: {
            icon: "slap",
            title: "Slap Power",
            subtitle: "Get more slap coins from every slap",
            price: "+2 SLAP",
            desc: "1 lvl",
            cost: "+1000",
          },
        },
        {
          title: "Energy limit",
          reward: "2000",
          lvl: "2",
          icon: "energyLimit",
          done: false,
          popup: {
            icon: "energyLimit",
            title: "Energy Limit",
            subtitle: "Restore energy limit for free to slap a little more",
            price: "+500 ENERGY",
            desc: "2 lvl",
            cost: "+1000",
          },
        },
      ],
      webApp: window.Telegram.WebApp,
    };
  },

  methods: {
    redirectoToMainPage() {
      this.$router.push("/");
    },
  },

  mounted() {
    this.$emit("ready");

    const webApp = window.Telegram.WebApp.BackButton;

    if (webApp) {
      webApp.show();
      webApp.onClick(this.redirectoToMainPage);
    }
  },

  unmounted() {
    const webApp = window.Telegram.WebApp.BackButton;

    if (webApp) {
      webApp.hide();
      webApp.offClick(this.redirectoToMainPage);
    }
  },
};
</script>

<style lang="scss">
.sl-layout:before {
  height: 454px !important;
}

.sl-boost-page {
  height: calc(100vh - 110px);
}
</style>