<template>
  <div class="sl-daily-quest__content overflow-auto">
    <DailyHeader />
    <DailyBody :item-daily="itemDaily" :items-tasks="itemsTasks" />
  </div>
  <MainFooter />
</template>

<script>
import { useGlobalStore } from "@/store/global";
import DailyHeader from "@/components/daily/DailyHeader.vue";
import DailyBody from "@/components/daily/DailyBody.vue";
import MainFooter from "@/components/footer/Footer.vue";

export default {
  name: "SlapDailyQuestPage",

  emits: ["ready"],

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
          popup: {
            icon: "youtube",
            title: "Your first steps in Crypto & Stock trading",
            subtitle: "Trading basics for stocks and crypto: 5-Step Guide",
            link: "https://www.wikipedia.org/",
            linkText: "Watch video",
            text: "Wait 20 minutes for moderation check to claim the prize",
            reward: 10000,
          },
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
          popup: {
            icon: "telegram",
            title: "Join our TG channel",
            link: "https://www.wikipedia.org/",
            linkText: "Join channel",
            reward: 10000,
          },
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
      webApp: window.Telegram.WebApp,
    };
  },

  computed: {
    energyLeftAmount() {
      return this.globalStore.energyLeftAmount;
    },
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

.sl-daily-quest {
  &__content {
    height: calc(100vh - 110px);
  }
}
</style>