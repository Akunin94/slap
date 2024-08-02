<template>
  <div class="sl-daily-body">
    <div class="sl-daily-body__group">
      <div class="sl-daily-body__title">Daily tasks</div>
      <div class="sl-daily-body__items">
        <DailyCard :data="itemDaily" @click="showDailyRewardPopup" />
      </div>
    </div>
    <div class="sl-daily-body__group">
      <div class="sl-daily-body__title">Tasks list</div>
      <div class="sl-daily-body__items">
        <DailyCard
          v-for="(item, index) in itemsTasks"
          :key="index"
          :data="item"
          @click="shopPopupForTask(item)"
        />
      </div>
    </div>
  </div>
  <Popup
    :is-visible="isVisiblePopup"
    :data="popupData"
    :button-text="popupButtonText"
    @close="isVisiblePopup = false"
  />
</template>

<script>
import Popup from "@/components/popup/Popup.vue";
import DailyCard from "@/components/daily/DailyCard.vue";

export default {
  name: "SlapDailyBody",

  data() {
    return {
      isVisiblePopup: false,
      popupData: null,
      popupButtonText: "",
      dailyRewardPopupData: {
        icon: "calendar",
        title: "Daily tasks",
        subtitle: "your streak",
        description: "6 days",
        dailyItems: [
          {
            reward: 5000,
            done: true,
          },
          {
            reward: 10000,
            done: true,
          },
          {
            reward: 50000,
            done: false,
          },
          {
            reward: 80000,
            done: false,
          },
          {
            reward: 100000,
            done: false,
          },
          {
            reward: 150000,
            done: false,
          },
          {
            reward: 180000,
            done: false,
          },
          {
            reward: 200000,
            done: false,
          },
          {
            reward: 250000,
            done: false,
          },
          {
            reward: 280000,
            done: false,
          },
        ],
      },
    };
  },

  components: { DailyCard, Popup },

  props: {
    itemDaily: Object,
    itemsTasks: Array,
  },

  methods: {
    shopPopupForTask(item) {
      this.popupData = item.popup;
      this.popupButtonText = "Check";
      this.isVisiblePopup = true;
    },
    showDailyRewardPopup() {
      this.popupData = this.dailyRewardPopupData;
      this.popupButtonText = "Claim";
      this.isVisiblePopup = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.sl-daily-body {
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
