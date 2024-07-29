<template>
  <div class="sl-header-buttons">
    <div class="sl-header-buttons__item">
      <div class="sl-header-buttons__icon">
        <IconDailyQuests />
      </div>
      <div class="sl-header-buttons__text">Daily quests</div>
    </div>
    <div class="sl-header-buttons__item">
      <div class="sl-header-buttons__icon">
        <IconCollections />
      </div>
      <div class="sl-header-buttons__text">Collections</div>
    </div>
    <div class="sl-header-buttons__item">
      <div class="sl-header-buttons__icon">
        <IconSpecialOffers />
      </div>
      <div class="sl-header-buttons__text">Special offers</div>
    </div>
  </div>
</template>

<script>
import IconDailyQuests from "@/components/icons/IconDailyQuests.vue";
import IconCollections from "@/components/icons/IconCollections.vue";
import IconSpecialOffers from "@/components/icons/IconSpecialOffers.vue";

export default {
  name: "SlapHeaderButtons",

  components: {
    IconDailyQuests,
    IconCollections,
    IconSpecialOffers,
  },
};
</script>

<style lang="scss" scoped>
.sl-header-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 16px;

  &__item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__icon {
    width: 24px;
  }

  &__text {
    white-space: nowrap;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.68);
  }
}
</style>
