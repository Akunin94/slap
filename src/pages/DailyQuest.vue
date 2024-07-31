<template>
  <DailyHeader />
  <DailyBody :item-daily="itemDaily" :items-tasks="itemsTasks" />
  <MainFooter />
</template>

<script>
import { useGlobalStore } from "@/store/global";
import DailyHeader from "@/components/daily/DailyHeader.vue";
import DailyBody from "@/components/daily/DailyBody.vue";
import MainFooter from "@/components/footer/Footer.vue";

export default {
  name: "SlapDailyQuestPage",

  components: {
    DailyHeader,
    DailyBody,
    MainFooter,
  },

  data() {
    return {
      globalStore: useGlobalStore(),
      itemDaily: {
        title: "Daily reward",
        reward: "+ 5000",
        icon: "calendar",
        done: false,
      },
      itemsTasks: [
        {
          title: "Subscribe us",
          reward: "+ 10000",
          icon: "youtube",
          done: false,
        },
        {
          title: "Subscribe us",
          reward: "+ 10000",
          icon: "twitter",
          done: true,
        },
        {
          title: "Subscribe us",
          reward: "+ 15000",
          icon: "telegram",
          done: false,
        },
        {
          title: "Invite friends",
          reward: "+ 25000",
          icon: "invite",
          done: false,
        },
        {
          title: "LOREM IPSUM",
          reward: "+ 25000",
          icon: "invite",
          done: false,
        },
        {
          title: "LOREM IPSUM",
          reward: "+ 25000",
          icon: "invite",
          done: false,
        },
      ],
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

<style lang="scss">
.sl-layout:before {
  height: 454px !important;
}
</style>