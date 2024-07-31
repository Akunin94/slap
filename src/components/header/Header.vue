<template>
  <header class="sl-header">
    <div class="sl-header__top">
      <div class="sl-header__account">
        <div class="sl-header__account-avatar">
          <IconDefaultAvatar />
        </div>
        <div class="sl-header__right">
          <div class="sl-header__account-info">
            <div class="sl-header__account-name">Pavel2000</div>
            <div class="sl-header__account-league flex align-center">
              <IconDiamond class="mr-1" />
              Diamond league
            </div>
          </div>
          <div v-if="globalStore.balance !== null" class="sl-header__balance">
            <IconCoin class="mr-1 w-[24px]" />
            {{ globalStore.balanceFormatted }}
          </div>
        </div>
      </div>
    </div>
    <HeaderButtons />
    <HeaderDailyGoal class="sl-header__daily-goal" :percent="56" />
  </header>
</template>

<script>
import { useGlobalStore } from "@/store/global";
import IconLeagueDiamond from "@/components/icons/IconLeagueDiamond.vue";
import IconDefaultAvatar from "@/components/icons/IconDefaultAvatar.vue";
import IconDiamond from "@/components/icons/IconDiamond.vue";
import IconCoin from "@/components/icons/IconCoin.vue";
import HeaderButtons from "@/components/header/HeaderButtons.vue";
import HeaderDailyGoal from "@/components/header/HeaderDailyGoal.vue";

export default {
  name: "SlapHeader",

  components: {
    IconLeagueDiamond,
    IconDefaultAvatar,
    IconDiamond,
    HeaderButtons,
    IconCoin,
    HeaderDailyGoal,
  },

  data() {
    return {
      globalStore: useGlobalStore(),
    };
  },
};
</script>

<style lang="scss" scoped>
.sl-header {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  padding: 10px 16px;
  z-index: 5;

  &__account {
    display: flex;
    align-items: center;

    &-avatar {
      flex: 0 0 50px;
      height: 50px;
      margin-right: 10px;

      svg {
        max-width: 100%;
        max-height: 100%;
        padding: 1px;
        border: 1px solid #0099c9;
        border-radius: 8px;
      }
    }

    &-info {
      display: flex;
      margin-bottom: 8px;
      white-space: nowrap;
    }

    &-name {
      color: #0099c9;
      font-weight: 600;
      font-size: 15px;
      margin-right: 8px;
      line-height: 20px;
    }

    &-league {
      color: #797979;
      font-size: 14px;
      line-height: 20px;
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
  }

  &__top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
  }

  &__balance {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: #ff8a00;
    display: flex;
    align-items: center;
  }

  &__daily-goal {
    position: absolute;
    top: 124px;
    right: 16px;
  }
}
</style>
