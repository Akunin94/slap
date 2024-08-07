<template>
  <div class="sl-collections-page">
    <MainHeader no-daily-quest />
    <CollectionsFooter @not-ready="$emit('not-ready')" />
  </div>
</template>

<script>
import MainHeader from "@/components/header/Header.vue";
import CollectionsFooter from "@/components/collections/CollectionsFooter.vue";

export default {
  name: "SlapCollectionsPage",

  components: {
    MainHeader,
    CollectionsFooter,
  },

  methods: {
    redirectoToMainPage() {
      this.$router.push("/");
    },
  },

  mounted() {
    this.$emit("ready");

    const webApp = window.Telegram.WebApp.BackButton;

    if (webApp) {
      webApp.show();
      webApp.onClick(this.redirectoToMainPage);
    }
  },

  unmounted() {
    const webApp = window.Telegram.WebApp.BackButton;

    if (webApp) {
      webApp.hide();
      webApp.offClick(this.redirectoToMainPage);
    }
  },
};
</script>

<style lang="scss" scoped>
.sl-collections-page {
}
</style>