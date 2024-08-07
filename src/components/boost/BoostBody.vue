<template>
  <div class="sl-boost-body">
    <div class="sl-boost-body__group">
      <div class="sl-boost-body__title">Free daily boosters</div>
      <div class="sl-boost-body__items">
        <BoostCard
          v-for="(item, index) in boosters"
          :key="index"
          :data="item"
          @click="shopPopupForBooster(item)"
        />
      </div>
    </div>
    <div class="sl-boost-body__group">
      <div class="sl-boost-body__title">Tasks list</div>
      <div class="sl-boost-body__items">
        <BoostCard
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
    :button-text-title="popupButtonTextTitle"
    :button-text-cost="popupButtonTextCost"
    @close="isVisiblePopup = false"
  />
</template>

<script>
import Popup from "@/components/popup/Popup.vue";
import BoostCard from "@/components/boost/BoostCard.vue";

export default {
  name: "SlapBoostBody",

  components: { BoostCard, Popup },

  data() {
    return {
      isVisiblePopup: false,
      popupData: null,
      popupButtonText: "",
      popupButtonTextTitle: "",
      popupButtonTextCost: "",
    };
  },

  props: {
    boosters: Array,
    itemsTasks: Array,
  },

  methods: {
    shopPopupForBooster(item) {
      if (!item.popup) {
        return;
      }

      this.popupData = item.popup;
      this.popupButtonText = "Use";
      this.popupButtonTextTitle = "";
      this.popupButtonTextCost = "";
      this.isVisiblePopup = true;
    },
    shopPopupForTask(item) {
      if (!item.popup) {
        return;
      }

      this.popupData = item.popup;
      this.popupButtonText = "";
      this.popupButtonTextTitle = "Upgrade";
      this.popupButtonTextCost = item.popup.cost;
      this.isVisiblePopup = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.sl-boost-body {
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
