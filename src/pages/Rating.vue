<template>
  <RatingHeader />
  <RatingTabs />
  <MainFooter />
</template>

<script>
import RatingHeader from "@/components/rating/RatingHeader.vue";
import MainFooter from "@/components/footer/Footer.vue";
import RatingTabs from "@/components/rating/RatingTabs.vue";

export default {
  name: "SlapRatingPage",

  emits: ["ready"],

  components: {
    RatingHeader,
    MainFooter,
    RatingTabs,
  },

  mounted() {
    this.$emit("ready");
  },
};
</script>

<style lang="scss">
.sl-layout:before {
  height: 454px !important;
}
</style>