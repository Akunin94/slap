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

  components: {
    RatingHeader,
    MainFooter,
    RatingTabs,
  },
};
</script>

<style lang="scss">
.sl-layout:before {
  height: 454px !important;
}
</style>