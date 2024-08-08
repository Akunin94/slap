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
          <div
            class="sl-main-page__popup-pic-label"
            :class="{
              'sl-main-page__popup-pic-label--hidden':
                isLvlupClaimed || !isVisibleLvlUpPopupWithButton,
            }"
            @click="claim"
          >
            <div class="sl-main-page__popup-pic-label-title">Energy Limit</div>
            <div class="sl-main-page__popup-pic-label-value">
              <IconEnergy class="w-[24px] h-[24px]" /> +32 000
            </div>
            <div class="sl-main-page__popup-pic-label-button">Claim</div>
          </div>
        </div>
        <div
          class="sl-main-page__popup-button"
          :class="{
            'sl-main-page__popup-button--active': isVisibleLvlUpPopupWithButton,
            'sl-main-page__popup-button--claimed': isLvlupClaimed,
          }"
          @click="onButtonClick"
        >
          <template v-if="isLvlupClaimed">
            <div class="sl-main-page__popup-button-title">Share</div>
            <div class="flex items-center">
              <IconCoin class="mr-1 w-[24px] h-[24px]" /> +1000 Slap
            </div>
          </template>
          <template v-else> Claim All </template>
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
import IconCoin from "@/components/icons/IconCoin.vue";
import IconArrowTopGreen from "@/components/icons/IconArrowTopGreen.vue";

export default {
  name: "SlapMainPage",

  components: {
    MainHeader,
    MainFooter,
    Popup,
    IconEnergy,
    IconCoin,
    IconSlap,
    IconArrowTopGreen,
  },

  data() {
    return {
      animationId: 0,
      globalStore: useGlobalStore(),
      isPageReady: false,
      animationComponent: null,
      isVisibleLvlUpPopup: false,
      isVisibleLvlUpPopupWithButton: false,
      isLvlupClaimed: false,
    };
  },

  computed: {
    energyLeftAmount() {
      return this.globalStore.energyLeftAmount;
    },
  },

  methods: {
    claim() {
      this.isLvlupClaimed = !this.isLvlupClaimed;
    },
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

    setTimeout(() => {
      this.isVisibleLvlUpPopup = true;
    }, 5000);
    setTimeout(() => {
      this.isVisibleLvlUpPopupWithButton = true;
    }, 7000);
  },

  watch: {
    async "globalStore.globalAnimation"() {
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

      &-label {
        position: absolute;
        top: 130px;
        left: calc(50% - 35px);
        width: 120px;
        height: 156px;
        background: url(/lvlup-label.png) 0 0 / 100% no-repeat;
        transform: rotate(15deg);
        opacity: 1;
        visibility: visible;
        transition: 0.2s;

        &--hidden {
          opacity: 0;
          visibility: hidden;
        }

        &-title {
          position: absolute;
          left: 0;
          right: 0;
          text-align: center;
          top: 28px;
          font-size: 15px;
          font-weight: 600;
          color: #000000cc;
        }

        &-value {
          position: absolute;
          left: 0;
          right: 0;
          top: 56px;
          font-size: 20px;
          font-weight: 700;
          color: #000000cc;
          display: flex;
          align-items: center;
          justify-content: center;

          svg {
            filter: brightness(0);
          }
        }

        &-button {
          position: absolute;
          left: 0;
          right: 0;
          text-align: center;
          bottom: 12px;
          font-size: 15px;
          line-height: 20px;
          font-weight: 600;
          color: #000000cc;
        }
      }
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
      position: absolute;
      left: 16px;
      right: 8px;
      bottom: 32px;
      z-index: 2;
      display: flex;
      text-align: left;
      transition: 0.2s;

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

    &-button {
      height: 60px;
      border-radius: 8px;
      border: 2px solid #2f61b7;
      font-size: 19px;
      font-weight: 600;
      color: #fff;
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: 0.2s;
      position: absolute;
      left: 16px;
      right: 16px;
      bottom: 32px;
      display: flex;
      flex-direction: column;

      &--active {
        opacity: 1;
        visibility: visible;
      }

      &:active {
        border-color: #1a4186;
      }

      &--claimed {
        background: #2f61b7;

        &:active {
          background-color: #1a4186;
        }
      }

      &-title {
        font-size: 13px;
        line-height: 20px;
        font-weight: 400;
      }
    }

    &-button--active + &-benefits {
      bottom: 108px;
    }
  }
}
</style>