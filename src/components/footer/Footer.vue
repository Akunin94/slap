<template>
  <footer class="sl-footer">
    <FooterActions v-if="hasActions" class="mb-4" />
    <FooterMenu />
  </footer>
</template>

<script>
import FooterActions from "@/components/footer/FooterActions.vue";
import FooterMenu from "@/components/footer/FooterMenu.vue";

export default {
  name: "SlapFooter",

  props: {
    hasActions: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    FooterActions,
    FooterMenu,
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
  z-index: 5;
}
</style>