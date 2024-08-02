<template>
  <div v-if="isVisibleInner" class="sl-popup">
    <div class="sl-popup__backdrop" />
    <div class="sl-popup__body">
      <div class="sl-popup__close" @click="closePopup">
        <IconClose />
      </div>
      <template v-if="data">
        <div v-if="data.icon" class="mb-4">
          <component class="w-[80px]" :is="iconComponent(data.icon)" />
        </div>
        <div class="sl-popup__header">
          <div v-if="data.title" class="sl-popup__title">
            {{ data.title }}
          </div>
          <div v-if="data.subtitle" class="sl-popup__subtitle">
            {{ data.subtitle }}
          </div>
          <div v-if="data.description" class="sl-popup__description">
            {{ data.description }}
          </div>
          <a
            v-if="data.link && data.linkText"
            :href="data.link"
            target="_blank"
            class="sl-popup__link"
            >{{ data.linkText }}</a
          >
          <div v-if="data.text" class="sl-popup__text">
            {{ data.text }}
          </div>
          <div v-if="data.reward" class="sl-popup__reward">
            <IconCoin class="mr-2 w-[32px]" /> +
            {{ formattedReward(data.reward) }}
          </div>
        </div>
        <div v-if="data.dailyItems" class="sl-popup__daily-reward">
          <div
            v-for="(item, index) in data.dailyItems"
            :key="index"
            class="sl-popup__daily-reward-item"
            :class="{ 'sl-popup__daily-reward-item--done': item.done }"
          >
            <div class="sl-popup__daily-reward-item-title">
              Day {{ index + 1 }}
            </div>
            <IconCoin class="w-[40px]" />
            <div class="sl-popup__daily-reward-item-reward">
              {{ formattedReward(item.reward) }}
            </div>
          </div>
        </div>
      </template>
      <slot name="content" />
      <button v-if="buttonText" class="sl-popup__button" type="button">
        <div class="sl-popup__button-text">{{ buttonText }}</div>
        <Loader class="sl-popup__button-loading" />
      </button>
    </div>
  </div>
</template>

<script>
import IconCalendar from "@/components/icons/IconCalendar.vue";
import IconYoutube from "@/components/icons/IconYoutube.vue";
import IconTwitter from "@/components/icons/IconTwitter.vue";
import IconTelegram from "@/components/icons/IconTelegram.vue";
import IconInvite from "@/components/icons/IconInvite.vue";
import IconClose from "@/components/icons/IconClose.vue";
import IconCoin from "@/components/icons/IconCoin.vue";
import Loader from "@/components/Loader.vue";

export default {
  name: "SlapPopup",

  emits: ["close"],

  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      required: false,
    },
    buttonText: {
      type: String,
      required: false,
    },
  },

  components: {
    IconClose,
    IconCoin,
    Loader,
  },

  data() {
    return {
      isVisibleInner: false,
    };
  },

  methods: {
    formattedReward(value) {
      const formattedString = value
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

      return formattedString;
    },

    closePopup() {
      this.$emit("close");
    },

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

  watch: {
    isVisible(value) {
      this.$nextTick(() => {
        this.isVisibleInner = value;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.sl-popup {
  &__body {
    position: fixed;
    left: 16px;
    right: 16px;
    bottom: 0;
    padding: 20px 16px;
    border-radius: 16px;
    background: linear-gradient(360deg, #000000 0%, #34021a 92%);
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 16px;
      padding: 2px;
      background: linear-gradient(
        180deg,
        rgba(0, 153, 201, 0.6),
        rgba(0, 153, 201, 0)
      );
      -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
      pointer-events: none;
    }
  }

  &__backdrop {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 9;
  }

  &__close {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    padding: 8px;
  }

  &__header {
    margin-bottom: 16px;

    & > *:last-child {
      margin-bottom: 0;
    }
  }

  &__title {
    font-size: 20px;
    line-height: 24px;
    color: #fff;
    font-weight: 700;
    margin-bottom: 12px;
  }

  &__subtitle {
    font-size: 16px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.8);
  }

  &__description {
    font-size: 20px;
    line-height: 24px;
    color: #fff;
    font-weight: 700;
  }

  &__link {
    font-size: 19px;
    line-height: 28px;
    padding: 10px 32px;
    border-radius: 8px;
    border: 2px solid #2f61b7;
    text-decoration: none;
    color: #fff;
    display: inline-block;
    margin: 16px 0 24px;
    font-weight: 600;
  }

  &__text {
    font-size: 16px;
    line-height: 24px;
    color: #ffffffcc;
    margin-bottom: 24px;
  }

  &__reward {
    display: flex;
    justify-content: center;
    color: #ff8a00;
    font-size: 24px;
    line-height: 32px;
    font-weight: 600;
  }

  &__daily-reward {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -4px 20px 0;

    &-item {
      margin: 0 4px 4px 0;
      flex: 0 0 calc(25% - 4px);
      background: #2424247a;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #ffffff7a;
      padding: 8px 4px;
      border: 1px solid transparent;

      &--done {
        border-color: #0099c9;
        color: #fff;
        background: #00000099;
      }

      &-day {
        font-size: 14px;
        line-height: 20;
      }

      &-reward {
        font-size: 15px;
        line-height: 20px;
        font-weight: 600;
      }
    }
  }

  &__button {
    background: #2f61b7;
    border: 1px solid;
    border-image-source: linear-gradient(
      180deg,
      #578fee 0%,
      rgba(87, 143, 238, 0) 100%
    );
    position: relative;
    overflow: none;
    border-radius: 8px;
    display: flex;
    width: 100%;
    height: 60px;
    align-items: center;
    justify-content: center;
    font-size: 19px;
    font-weight: 600;
    color: #fff;

    &-loading {
      display: none;
      width: 32px;
      height: 32px;

      &:deep(svg) {
        width: 32px;
        height: 32px;
      }
    }

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 8px;
      border: linear-gradient(180deg, #578fee 0%, rgba(87, 143, 238, 0) 100%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
    }

    &:active {
      background: var(--Button-Button-Pressed, #1a4186);

      &:before {
        display: none;
      }
    }

    &[disabled] {
      background: #242424;
      color: #ffffff3d;

      &:before {
        display: none;
      }
    }

    &--loading {
      .sl-popup__button-text {
        display: none;
      }

      .sl-popup__button-loading {
        display: block;
      }
    }
  }
}
</style>