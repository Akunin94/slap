<template>
  <div class="sl-main-page">
    <MainGirl @slap="onSlap" @ready="$emit('ready')" />
    <MainHeader />
    <MainFooter has-actions />
    <Popup
      class="sl-main-page__popup"
      :is-visible="isVisibleLvlUpPopup"
      @close="isVisibleLvlUpPopup = false"
    >
      <template #content>
        <div class="sl-main-page__popup-title">Level Up</div>
        <div class="sl-main-page__popup-subtitle">
          Congratulations, you have reached
        </div>
        <div class="sl-main-page__popup-level">Level 3</div>
        <div class="sl-main-page__popup-pic"></div>
        <div class="sl-main-page__popup-benefits"></div>
      </template>
    </Popup>
  </div>
</template>

<script>
import { useGlobalStore } from "@/store/global";
import MainGirl from "@/components/girls/MainGirl.vue";
import MainHeader from "@/components/header/Header.vue";
import MainFooter from "@/components/footer/Footer.vue";
import Popup from "../components/popup/Popup.vue";

export default {
  name: "SlapMainPage",

  components: {
    MainGirl,
    MainHeader,
    MainFooter,
    Popup,
  },

  data() {
    return {
      globalStore: useGlobalStore(),
      isVisibleLvlUpPopup: false,
      isPageReady: false,
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

  mounted() {
    // setTimeout(() => {
    //   this.isVisibleLvlUpPopup = true;
    // }, 1000);
  },
};
</script>

<style lang="scss" scoped>
.sl-main-page {
  &__popup {
    overflow: hidden;

    &:deep(.sl-popup__body:after) {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      content: "";
      pointer-events: none;
      background: url(/icons/icon-fx.svg) 50% 0 / 320% auto no-repeat;
      opacity: 0.6;
    }

    &-title {
      font-size: 24px;
      line-height: 32px;
      color: #fff;
      font-weight: 700;
      margin-bottom: 8px;
    }

    &-subtitle {
      font-size: 16px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 6px;
    }

    &-level {
      font-size: 16px;
      line-height: 24px;
      padding: 0 28px;
      background: url(/icons/icon-leaf.svg) 0 0 no-repeat;
      position: relative;
      color: #ff8a00;
      margin-bottom: 12px;
      font-weight: 700;

      &:after {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 24px;
        content: "";
        background: url(/icons/icon-leaf.svg) 0 0 no-repeat;
        transform: scaleX(-1);
      }
    }
  }
}
</style>