<template>
  <div class="sl-layout min-h-screen">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "SlapApp",
};
</script>

<style lang="scss" scoped>
.sl-layout {
  background: #55052c url("/background.png") 50% 50% / cover no-repeat;
}
</style>