<template>
  <div class="sl-header-buttons">
    <router-link
      to="/daily"
      class="sl-header-buttons__item"
      active-class="sl-header-buttons__item--active"
      exact
    >
      <div class="sl-header-buttons__icon">
        <IconDailyQuests />
      </div>
      <div class="sl-header-buttons__text">Daily quests</div>
    </router-link>
    <router-link
      to="/collections"
      class="sl-header-buttons__item"
      active-class="sl-header-buttons__item--active"
      exact
    >
      <div class="sl-header-buttons__icon">
        <IconCollections />
      </div>
      <div class="sl-header-buttons__text">Collections</div>
    </router-link>
    <div
      class="sl-header-buttons__item"
      active-class="sl-header-buttons__item--active"
      exact
    >
      <div class="sl-header-buttons__icon">
        <IconSpecialOffers />
      </div>
      <div class="sl-header-buttons__text">Special offers</div>
    </div>
  </div>
</template>

<script>
import IconDailyQuests from "@/components/icons/IconDailyQuests.vue";
import IconSpecialOffers from "@/components/icons/IconSpecialOffers.vue";
import IconCollections from "@/components/icons/IconCollections.vue";

export default {
  name: "SlapHeaderButtons",

  components: {
    IconDailyQuests,
    IconSpecialOffers,
    IconCollections,
  },
};
</script>

<style lang="scss" scoped>
.sl-header-buttons {
  display: flex;
  justify-content: center;

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    border-radius: 8px;
    flex: 0 0 calc(33.33% - 2px);
    color: rgba(255, 255, 255, 0.48);
    fill-opacity: 0.24;

    &:not(:last-child) {
      margin-right: 2px;
    }

    &:active,
    &--active {
      background: #ffffff14;
      color: #fff;

      svg {
        fill-opacity: 1;
      }
    }
  }

  &__icon {
    width: 24px;
    margin-right: 8px;
  }

  &__text {
    white-space: nowrap;
    font-size: 14px;
  }
}
</style>
