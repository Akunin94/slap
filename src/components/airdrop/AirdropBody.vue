<template>
  <div class="sl-airdrop-body">
    <div class="sl-airdrop-body__title">Tasks list</div>
    <div class="sl-airdrop-body__items">
      <AirdropCard
        v-for="(item, index) in itemsTasks"
        :key="index"
        :data="item"
        @click="shopPopupForTask(item)"
      />
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
import AirdropCard from "@/components/airdrop/AirdropCard.vue";

export default {
  name: "SlapAirdropBody",

  components: { AirdropCard, Popup },

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
    itemsTasks: Array,
  },

  methods: {
    shopPopupForTask(item) {
      if (!item.popup) {
        return;
      }

      this.popupData = item.popup;
      this.popupButtonText = "Check";
      this.isVisiblePopup = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.sl-airdrop-body {
  &__title {
    font-size: 20px;
    line-height: 24px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 16px;
  }
}
</style>
