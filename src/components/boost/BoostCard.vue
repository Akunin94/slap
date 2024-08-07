<template>
  <div class="sl-boost-card">
    <div v-if="data.icon" class="sl-boost-card__icon">
      <component class="w-[52px] h-[52px]" :is="iconComponent(data.icon)" />
    </div>
    <div class="sl-boost-card__info">
      <div class="sl-boost-card__title">{{ data.title }}</div>
      <div v-if="data.amount" class="sl-boost-card__amount">
        {{ data.amount }}
      </div>
      <div v-if="data.reward" class="sl-boost-card__reward">
        <IconCoin class="mr-2 w-[24px]" /> {{ data.reward }}
        <span class="sl-boost-card__lvl" v-if="data.lvl"
          >{{ data.lvl }} lvl</span
        >
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
import IconEnergy from "@/components/icons/IconEnergy.vue";
import IconBoost from "@/components/icons/IconBoost.vue";
import IconSlap from "@/components/icons/IconSlap.vue";
import IconEnergyLimit from "@/components/icons/IconEnergyLimit.vue";

export default {
  name: "SlapBoostCard",

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

      if (iconName === "energy") {
        return IconEnergy;
      }

      if (iconName === "boost") {
        return IconBoost;
      }

      if (iconName === "slap") {
        return IconSlap;
      }

      if (iconName === "energyLimit") {
        return IconEnergyLimit;
      }

      return "";
    },
  },
};
</script>

<style lang="scss" scoped>
.sl-boost-card {
  padding: 8px 16px;
  border-radius: 8px;
  background: #ffffff14;
  display: flex;
  align-items: center;
  transition: 0.1s;
  cursor: pointer;

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

  &__amount {
    font-size: 16px;
    line-height: 24px;
    color: #ffffff7a;
  }

  &__lvl {
    font-size: 16px;
    color: #ffffff7a;
    padding-left: 12px;
    margin-left: 16px;
    position: relative;
    font-weight: 400;

    &:before {
      position: absolute;
      content: "";
      width: 3px;
      height: 3px;
      top: calc(50% - 2px);
      left: 0;
      background: #a38c9b;
      border-radius: 50%;
    }
  }
}
</style>
