<template>
  <div class="sl-footer-actions">
    <div class="sl-footer-actions__item">
      <IconEnergy class="mr-1" />
      Energy
      <span class="sl-footer-actions__item-value ml-2"
        >{{ energyLeftAmount }} / {{ energyMaxAmount }}</span
      >
    </div>
    <div class="sl-footer-actions__item sl-footer-actions__item--boost">
      <IconBoost class="mr-1" />Boost
    </div>
  </div>
</template>

<script>
import { useGlobalStore } from "@/store/global";
import IconEnergy from "@/components/icons/IconEnergy.vue";
import IconBoost from "@/components/icons/IconBoost.vue";

export default {
  name: "SlapFooterActions",

  data() {
    return {
      globalStore: useGlobalStore(),
    };
  },

  computed: {
    energyMaxAmount() {
      return this.globalStore.energyMaxAmount;
    },
    energyLeftAmount() {
      return this.globalStore.energyLeftAmount;
    },
  },

  components: {
    IconEnergy,
    IconBoost,
  },
};
</script>

<style lang="scss" scoped>
.sl-footer-actions {
  display: flex;
  justify-content: space-between;

  &__item {
    padding: 4px 8px;
    border-radius: 8px;
    color: #fff;
    font-weight: 600;
    font-size: 15px;
    background-color: rgba(255, 255, 255, 0.04) !important;
    display: flex;
    align-items: center;

    &--boost:active {
      background-color: rgba(255, 255, 255, 0.12) !important;
    }

    &-value {
      color: #ff8a00;
    }
  }
}
</style>
