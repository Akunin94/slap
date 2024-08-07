<template>
  <div class="sl-main-page">
    <component
      v-if="animationComponent"
      :key="animationId"
      :is="animationComponent"
      @slap="onSlap"
      @ready="$emit('ready')"
    />
    <MainHeader />
    <MainFooter has-actions />
    <Popup
      class="sl-main-page__popup"
      :is-visible="isVisibleLvlUpPopup"
      @close="isVisibleLvlUpPopup = false"
    >
      <template #content>
        <div class="sl-main-page__popup-shadow" />
        <div class="sl-main-page__popup-title">Level Up</div>
        <div class="sl-main-page__popup-subtitle">
          Congratulations, you have reached
        </div>
        <div class="sl-main-page__popup-level">Level 3</div>
        <div class="sl-main-page__popup-pic">
          <img src="/girl1.png" alt="" />
        </div>
        <div class="sl-main-page__popup-benefits">
          <div class="sl-main-page__popup-benefits-item">
            <div class="sl-main-page__popup-benefits-title">Energy Limit</div>
            <div class="sl-main-page__popup-benefits-info">
              <IconEnergy class="mr-1 w-[24px] h-[24px]" />
              <div class="sl-main-page__popup-benefits-value">1500</div>
            </div>
          </div>
          <div class="sl-main-page__popup-benefits-item">
            <div class="sl-main-page__popup-benefits-title">Slap Power</div>
            <div class="sl-main-page__popup-benefits-info">
              <IconSlap class="mr-1 w-[24px] h-[24px]" />
              <div class="sl-main-page__popup-benefits-value">5</div>
            </div>
          </div>
          <div class="sl-main-page__popup-benefits-item">
            <div class="sl-main-page__popup-benefits-title">Level</div>
            <div class="sl-main-page__popup-benefits-info">
              <IconArrowTopGreen class="mr-1 w-[24px] h-[24px]" />
              <div class="sl-main-page__popup-benefits-value">3</div>
            </div>
          </div>
        </div>
      </template>
    </Popup>
  </div>
</template>

<script>
import { useGlobalStore } from "@/store/global";
import MainHeader from "@/components/header/Header.vue";
import MainFooter from "@/components/footer/Footer.vue";
import Popup from "../components/popup/Popup.vue";
import IconEnergy from "@/components/icons/IconEnergy.vue";
import IconSlap from "@/components/icons/IconSlap.vue";
import IconArrowTopGreen from "@/components/icons/IconArrowTopGreen.vue";

export default {
  name: "SlapMainPage",

  components: {
    MainHeader,
    MainFooter,
    Popup,
    IconEnergy,
    IconSlap,
    IconArrowTopGreen,
  },

  data() {
    return {
      animationId: 0,
      globalStore: useGlobalStore(),
      isVisibleLvlUpPopup: false,
      isPageReady: false,
      animationComponent: null,
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

  async mounted() {
    this.animationId += 1;

    this.animationComponent = (
      await import(
        `../components/girls/${
          this.globalStore.globalAnimation || "MainGirl"
        }.vue`
      )
    ).default;

    // setTimeout(() => {
    //   this.isVisibleLvlUpPopup = true;
    // }, 1000);
  },

  watch: {
    async "globalStore.globalAnimation"() {
      console.log("watch globalAnimation");
      this.animationId += 1;

      this.animationComponent = (
        await import(
          `../components/girls/${
            this.globalStore.globalAnimation || "MainGirl"
          }.vue`
        )
      ).default;
    },
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

    &-pic {
      margin: 0 0 -280px 0;
      position: relative;
      left: -30px;
    }

    &-shadow {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 188px;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 23.56%,
        #000000 60.25%
      );
      z-index: 1;
    }

    &-benefits {
      position: relative;
      z-index: 2;
      display: flex;
      width: calc(100% + 8px);
      text-align: left;

      &-item {
        flex: 0 0 calc(33.33% - 8px);
        margin-right: 8px;
        background: #ffffff14;
        border-radius: 8px;
        color: #fff;
        padding: 4px 8px;
      }

      &-title {
        font-size: 10px;
        line-height: 16px;
      }

      &-info {
        display: flex;
        align-items: center;
      }

      &-value {
        font-size: 17px;
        line-height: 24px;
        font-weight: 600;
      }
    }
  }
}
</style>