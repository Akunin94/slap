<template>
  <div class="sl-airdrop-page overflow-auto">
    <div class="sl-airdrop-page__header">
      <div class="sl-airdrop-page__header-title">AirDrop is Comming</div>
      <div class="sl-airdrop-page__header-subtitle">
        To participate, complete the following tasks
      </div>
    </div>
    <Countdown class="mb-3" :targetDate="targetDate" />
    <div class="sl-airdrop-page__prize flex items-center mb-[28px]">
      Prize Pool
      <IconGift class="w-[24px] h-[24px] mx-1" />
      <span class="text-[#0099C9]">261</span>
    </div>
    <AirdropBody :items-tasks="itemsTasks" />
  </div>
  <MainFooter />
</template>

<script>
import MainFooter from "@/components/footer/Footer.vue";
import Countdown from "@/components/airdrop/Countdown.vue";
import IconGift from "@/components/icons/IconGift.vue";
import AirdropBody from "@/components/airdrop/AirdropBody.vue";

export default {
  name: "SlapAirdropPage",

  components: {
    MainFooter,
    Countdown,
    IconGift,
    AirdropBody,
  },

  emits: ["ready"],

  data() {
    return {
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
      targetDate: new Date("2025-01-01"),
      itemsTasks: [
        {
          title: "Subscribe to social networks",
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
          title: "Retweet a post in ‘X’ and tag 3 people",
          icon: "twitter",
          done: true,
        },
        {
          title: "Add a coin to the watchlist on CoinMarketCap",
          icon: "coinMarketCap",
          done: false,
          popup: {
            icon: "coinMarketCap",
            title: "Add a coin to the watchlist on CoinMarketCap",
            link: "https://www.wikipedia.org/",
            linkText: "Secondary",
            text: "Wait 20 minutes for moderation check to claim",
          },
        },
        {
          title: "Fill out the registration form for the distribution",
          icon: "invite",
          done: false,
        },
        {
          title: "Connect your wallet",
          icon: "tonWallet",
          done: false,
        },
      ],
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
.sl-airdrop-page {
  height: calc(100vh - 110px);
  position: relative;
  padding: 26px 16px 0;
  background: url(/gift-bg.png) 50% 130px / 100% no-repeat;

  & > * {
    position: relative;
    z-index: 5;

    &.sl-popup {
      z-index: 10;
    }
  }

  &__header {
    text-align: center;

    &-title {
      font-size: 24px;
      line-height: 32px;
      font-weight: 600;
      color: #ff8a00;
      margin-bottom: 8px;
    }

    &-subtitle {
      font-size: 17px;
      line-height: 24px;
      margin-bottom: 12px;
      color: #ffffffcc;
      padding: 0 36px;
    }
  }

  &__prize {
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
    color: #fff;
    justify-content: center;
  }
}
</style>