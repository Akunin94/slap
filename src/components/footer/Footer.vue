<template>
  <footer class="sl-footer">
    <FooterActions
      class="mb-4"
      :energyLeftAmount="energyLeftAmount"
      :energyMaxAmount="energyMaxAmount"
    />
    <FooterMenu />
  </footer>
</template>

<script>
import FooterActions from "@/components/footer/FooterActions.vue";
import FooterMenu from "@/components/footer/FooterMenu.vue";

export default {
  name: "SlapFooter",

  components: {
    FooterActions,
    FooterMenu,
  },

  props: {
    energyLeftAmount: Number,
    energyMaxAmount: Number,
  },
};
</script>

<style lang="scss">
.sl-footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 16px 34px;
}
</style>