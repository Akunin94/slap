<template>
  <header class="sl-rating-header">
    <div class="sl-rating-header__title">Your balance:</div>
    <div class="sl-rating-header__value">
      <IconCoin class="w-[32px] mr-2" />
      {{ globalStore.balanceFormatted }}
    </div>
    <img
      width="256"
      height="256"
      src="/icons/league-diamond.png"
      alt="Diamond league"
      class="sl-rating-header__pic"
    />
    <div class="sl-rating-header__league">Diamond league</div>
  </header>
</template>

<script>
import { useGlobalStore } from "@/store/global";
import IconCoin from "@/components/icons/IconCoin.vue";

export default {
  name: "SlapRatingHeader",

  components: { IconCoin },

  data() {
    return {
      globalStore: useGlobalStore(),
    };
  },
};
</script>

<style lang="scss" scoped>
.sl-rating-header {
  position: relative;
  padding: 10px 16px 16px;
  z-index: 5;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    font-size: 14px;
    line-height: 20px;
    color: #fff;
    text-align: center;
  }

  &__value {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    line-height: 32px;
    font-weight: 600;
    color: #ff8a00;
  }

  &__pic {
    margin: -62px 0;
  }

  &__league {
    color: #fff;
    font-size: 15px;
    line-height: 20px;
    font-weight: 700;
  }
}
</style>
