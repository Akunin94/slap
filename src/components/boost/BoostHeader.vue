<template>
  <header class="sl-boost-header">
    <div class="sl-boost-header__title">Your balance:</div>
    <div class="sl-boost-header__value">
      <IconCoin class="w-[32px] mr-2" />
      {{ globalStore.balanceFormatted }}
    </div>
    <IconBoost class="w-[128px] h-[128px]" />
  </header>
</template>

<script>
import { useGlobalStore } from "@/store/global";
import IconCoin from "@/components/icons/IconCoin.vue";
import IconBoost from "@/components/icons/IconBoost.vue";

export default {
  name: "SlapBoostHeader",

  components: { IconCoin, IconBoost },

  data() {
    return {
      globalStore: useGlobalStore(),
    };
  },
};
</script>

<style lang="scss" scoped>
.sl-boost-header {
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
