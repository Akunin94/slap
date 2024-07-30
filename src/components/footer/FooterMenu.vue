<template>
  <div class="sl-footer-menu">
    <router-link
      to="/"
      class="sl-footer-menu__item"
      :active-class="'sl-footer-menu__item--active'"
      exact
    >
      <IconDoor class="sl-footer-menu__svg mb-1" />
      Room
    </router-link>
    <div
      class="sl-footer-menu__item"
      :active-class="'sl-footer-menu__item--active'"
      exact
    >
      <IconShop class="sl-footer-menu__svg mb-1" />
      Shop
    </div>
    <router-link
      to="/rating"
      class="sl-footer-menu__item"
      :active-class="'sl-footer-menu__item--active'"
      exact
    >
      <IconRating class="sl-footer-menu__svg mb-1" />
      Rating
    </router-link>
    <div
      class="sl-footer-menu__item"
      :active-class="'sl-footer-menu__item--active'"
      exact
    >
      <IconEarn class="sl-footer-menu__svg mb-1" />
      Earn
    </div>
    <div
      class="sl-footer-menu__item"
      :active-class="'sl-footer-menu__item--active'"
      exact
    >
      <IconEarn class="sl-footer-menu__svg mb-1" />
      Airdrop
    </div>
  </div>
</template>

<script>
import IconDoor from "@/components/icons/IconDoor.vue";
import IconShop from "@/components/icons/IconShop.vue";
import IconRating from "@/components/icons/IconRating.vue";
import IconEarn from "@/components/icons/IconEarn.vue";

export default {
  name: "SlapFooterMenu",

  components: {
    IconDoor,
    IconShop,
    IconRating,
    IconEarn,
  },

  props: {
    energyLeftAmount: Number,
    energyMaxAmount: Number,
  },
};
</script>

<style lang="scss" scoped>
.sl-footer-menu {
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 8px;
  padding: 1px;
  display: flex;
  overflow: hidden;

  &__item {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.48);
    fill: rgba(255, 255, 255, 0.48);
    font-weight: 600;
    align-items: center;
    justify-content: center;
    padding: 6px 4px 4px;
    flex: 0 0 20%;

    &:first-child {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }

    &:last-child {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }

    &--active,
    &:active {
      color: #0099c9;
      background: rgba(36, 36, 36, 0.48);
    }
  }

  &__svg {
    fill: currentColor;
  }
}
</style>
