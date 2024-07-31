<template>
  <header class="sl-daily-header">
    <div class="sl-daily-header__title">Your balance:</div>
    <div class="sl-daily-header__value">
      <IconCoin class="w-[32px] mr-2" />
      {{ globalStore.balanceFormatted }}
    </div>
    <img
      width="128"
      height="128"
      src="/icons/icon-coin.png"
      alt="Diamond league"
      class="sl-daily-header__pic"
    />
  </header>
</template>

<script>
import { useGlobalStore } from "@/store/global";
import IconCoin from "@/components/icons/IconCoin.vue";

export default {
  name: "SlapDailyHeader",

  components: { IconCoin },

  data() {
    return {
      globalStore: useGlobalStore(),
    };
  },
};
</script>

<style lang="scss" scoped>
.sl-daily-header {
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
    margin: 0 0 28px;
  }
}
</style>
