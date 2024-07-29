<template>
  <div class="sl-header">
    <div class="sl-header__top">
      <div class="sl-header__account">
        <div class="sl-header__account-avatar">
          <IconDefaultAvatar />
        </div>
        <div class="sl-header__account-info">
          <div class="sl-header__account-name">Pavel2000</div>
          <div class="sl-header__account-league">
            <IconLeagueDiamond class="sl-header__account-league-icon" />
            Diamond league
          </div>
        </div>
      </div>
      <div class="sl-header__balance">
        <div class="sl-header__balance-text">Balance:</div>
        <div
          v-if="balance !== null"
          class="sl-header__balance-value"
        >
          {{ balanceFormatted }}
        </div>
      </div>
    </div>
    <HeaderButtons />
  </div>
</template>

<script>
import IconLeagueDiamond from '@/components/icons/IconLeagueDiamond.vue'
import IconDefaultAvatar from '@/components/icons/IconDefaultAvatar.vue'
import HeaderButtons from '@/components/header/HeaderButtons.vue'

export default {
  name: 'SlapHeader',

  components: {
    IconLeagueDiamond,
    IconDefaultAvatar,
    HeaderButtons
  },

  props: {
    balance: Number
  },

  computed: {
    balanceFormatted() {
      const formattedString = this.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

      return formattedString;
    }
  },
}
</script>

<style lang="scss" scoped>
.sl-header {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  padding: 20px 16px;

  &__account {
    display: flex;
    align-items: center;
    gap: 10px;
    
    &-avatar {
      flex: 0 0 44px;
      height: 44px;

      svg {
        max-width: 100%;
        max-height: 100%;
        padding: 2px;
        border: 2px solid #0099C9;
        border-radius: 12px;
      }
    }

    &-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    &-name {
      color: #0099c9;
      font-weight: 600;
      font-size: 14px;
    }

    &-league {
      color: #797979;
      font-size: 10px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 4px;

      &-icon {
        width: 20px;
        height: auto;
      }
    }
  }

  &__top {
    display: flex;
    justify-content: space-between;
  }

  &__balance {
    text-align: right;

    &-text {
      font-size: 12px;
      color: #999;
      font-weight: 600;
    }

    &-value {
      font-weight: 800;
      font-size: 22px;
      color: #ff8a00;
    }
  }
}
</style>
