<template>
  <div class="sl-daily-card">
    <div v-if="data.icon" class="sl-daily-card__icon">
      <component class="w-[52px]" :is="iconComponent(data.icon)" />
    </div>
    <div class="sl-daily-card__info">
      <div class="sl-daily-card__title">{{ data.title }}</div>
      <div class="sl-daily-card__reward">
        <IconCoin class="mr-2 w-[24px]" /> {{ data.reward }}
      </div>
    </div>
    <div v-if="data.done">
      <IconCheck class="w-[24px]" />
    </div>
    <div v-else>
      <IconArrowRight class="w-[24px]" />
    </div>
  </div>
</template>

<script>
import IconCalendar from "@/components/icons/IconCalendar.vue";
import IconYoutube from "@/components/icons/IconYoutube.vue";
import IconTwitter from "@/components/icons/IconTwitter.vue";
import IconTelegram from "@/components/icons/IconTelegram.vue";
import IconInvite from "@/components/icons/IconInvite.vue";
import IconCoin from "@/components/icons/IconCoin.vue";
import IconArrowRight from "@/components/icons/IconArrowRight.vue";
import IconCheck from "@/components/icons/IconCheck.vue";

export default {
  name: "SlapDailyCard",

  components: {
    IconCoin,
    IconArrowRight,
    IconCheck,
  },

  props: {
    data: Object,
  },

  methods: {
    iconComponent(iconName) {
      if (iconName === "calendar") {
        return IconCalendar;
      }

      if (iconName === "youtube") {
        return IconYoutube;
      }

      if (iconName === "twitter") {
        return IconTwitter;
      }

      if (iconName === "telegram") {
        return IconTelegram;
      }

      if (iconName === "invite") {
        return IconInvite;
      }

      return "";
    },
  },
};
</script>

<style lang="scss" scoped>
.sl-daily-card {
  padding: 8px 16px;
  border-radius: 8px;
  background: #ffffff14;
  display: flex;
  align-items: center;
  transition: 0.1s;

  &:not(:last-child) {
    margin-bottom: 8px;
  }

  &:active {
    background: #ffffff20;
  }

  &__icon {
    margin-right: 16px;
  }

  &__info {
    margin-right: auto;
  }

  &__title {
    font-size: 16px;
    line-height: 24px;
    color: #fff;

    &:not(:last-child) {
      margin-bottom: 4px;
    }
  }

  &__reward {
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
    color: #fff;
    display: flex;
  }
}
</style>
