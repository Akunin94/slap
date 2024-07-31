<template>
  <div class="sl-daily-body overflow-auto">
    <div class="sl-daily-body__group">
      <div class="sl-daily-body__title">Daily tasks</div>
      <div class="sl-daily-body__items">
        <DailyCard :data="itemDaily" />
      </div>
    </div>
    <div class="sl-daily-body__group">
      <div class="sl-daily-body__title">Tasks list</div>
      <div class="sl-daily-body__items">
        <DailyCard
          v-for="(item, index) in itemsTasks"
          :key="index"
          :data="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DailyCard from "./DailyCard.vue";

export default {
  name: "SlapDailyBody",

  components: { DailyCard },

  props: {
    itemDaily: Object,
    itemsTasks: Array,
  },
};
</script>

<style lang="scss" scoped>
.sl-daily-body {
  height: calc(100vh - 344px);
  padding: 0 16px;
  position: relative;
  z-index: 5;

  &__group {
    &:not(:last-child) {
      margin-bottom: 32px;
    }
  }

  &__title {
    font-size: 20px;
    line-height: 24px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 16px;
  }
}
</style>
