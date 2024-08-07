<template>
  <div class="sl-collections-footer">
    <div class="sl-collections-footer__animation">
      <component :is="girlsList[activeGirlIndex].animation" />
    </div>
    <div class="sl-collections-footer__info">
      <div class="sl-collections-footer__name">{{ girlName }}</div>
      <div class="sl-collections-footer__author">{{ girlAuthor }}</div>
    </div>
    <div
      class="sl-collections-footer__actions-btn"
      :style="{
        backgroundImage: showBackground
          ? `url(${girlsList[activeGirlIndex].bg})`
          : `url(${backgroundList[activeBackgroundIndex].bg})`,
      }"
      @click="showBackground = !showBackground"
    >
      <IconEdit v-if="!showBackground" />
    </div>
    <div class="sl-collections-footer__list">
      <div
        v-if="showBackground"
        v-for="(item, index) in backgroundList"
        :key="index"
        class="sl-collections-footer__list-item"
        :class="{
          'sl-collections-footer__list-item--active':
            activeBackgroundIndex === index,
        }"
        :style="{ backgroundImage: `url('${item.bg}')` }"
        @click="changeBackground(index)"
      />
      <div
        v-else
        v-for="(item, index) in girlsList"
        :key="item.bg"
        class="sl-collections-footer__list-item"
        :class="{
          'sl-collections-footer__list-item--active': activeGirlIndex === index,
        }"
        :style="{ backgroundImage: `url('${item.bg}')` }"
        @click="changeGirl(index)"
      />
    </div>
    <div class="sl-collections-footer__buttons">
      <div
        class="sl-collections-footer__buttons-item sl-collections-footer__buttons-item--back"
        @click="back"
      >
        <IconArrowLeft class="mr-1" /> Back
      </div>
      <div
        class="sl-collections-footer__buttons-item sl-collections-footer__buttons-item--confirm"
        @click="confirm"
      >
        Confirm
      </div>
    </div>
  </div>
</template>

<script>
import { useGlobalStore } from "@/store/global";
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import MainGirl from "@/components/girls/MainGirl.vue";
import MainGirl2 from "@/components/girls/MainGirl2.vue";
import { shallowRef } from "vue";

export default {
  name: "SlapCollectionsFooter",

  components: {
    IconArrowLeft,
    IconEdit,
  },

  data() {
    return {
      globalStore: useGlobalStore(),
      activeBackgroundIndex: 0,
      backgroundList: [
        { bg: "/background.png" },
        { bg: "/background2.png" },
        { bg: "/background3.png" },
      ],

      activeGirlIndex: 0,
      girlsList: [
        {
          bg: "girl1.png",
          name: "Girl #1",
          author: "Author #1",
          animation: shallowRef(MainGirl),
          animationComponent: "MainGirl",
        },
        {
          bg: "girl1_1_preview.png",
          name: "Girl #2",
          author: "Author #2",
          animation: shallowRef(MainGirl2),
          animationComponent: "MainGirl2",
        },
      ],
      showBackground: false,

      girlName: null,
      girlAuthor: null,

      checkedAnimation: null,

      initialBackground: null,
      initialAnimation: null,
    };
  },

  computed: {
    webApp() {
      return window.Telegram.WebApp;
    },
  },

  methods: {
    back() {
      this.$router.push("/");
      this.globalStore.setGlobalAnimation(this.initialAnimation);
      this.globalStore.setGlobalBackground(this.initialBackground);
    },
    async confirm() {
      const activeGirl = this.girlsList[this.activeGirlIndex];
      const animation = activeGirl.animationComponent;
      const background = this.backgroundList[this.activeBackgroundIndex].bg;

      this.checkedAnimation = animation;

      try {
        await this.webApp.CloudStorage.setItem(
          "background",
          background,
          (error, success) => {
            if (error) {
              console.error("set background", error);
            } else {
              if (success) {
                console.log(`Background persisted succesfuly: ${background}`);
              } else {
                console.log(`Background failed to persist: ${background}`);
              }
            }
          }
        );
      } catch (error) {
        console.error(error);
      }

      try {
        await this.webApp.CloudStorage.setItem(
          "main_animation",
          this.checkedAnimation,
          (error, success) => {
            if (error) {
              console.error("set animation", error);
            } else {
              if (success) {
                console.log(
                  `Animation persisted succesfuly: ${this.checkedAnimation}`
                );
              } else {
                console.log(
                  `Animation failed to persist: ${this.checkedAnimation}`
                );
              }
            }
          }
        );
      } catch (error) {
        console.error(error);
      }

      this.$emit("not-ready");
      this.$router.push("/");
    },
    changeBackground(index) {
      this.activeBackgroundIndex = index;

      this.globalStore.setGlobalBackground(this.backgroundList[index].bg);
    },
    changeGirl(index) {
      const checkedGirl = this.girlsList[index];

      this.activeGirlIndex = index;
      this.girlName = checkedGirl.name;
      this.girlAuthor = checkedGirl.author;
    },
  },

  mounted() {
    let background = document.querySelector(".sl-layout").style.backgroundImage;

    this.initialBackground = this.globalStore.globalBackground;
    this.initialAnimation = this.globalStore.globalAnimation;
    console.log(this.initialAnimation);

    this.backgroundList.forEach((item, index) => {
      if (background.indexOf(item.bg) >= 0) {
        this.activeBackgroundIndex = index;
      }
    });

    this.girlsList.forEach((item, index) => {
      if (this.initialAnimation === item.animationComponent) {
        this.activeGirlIndex = index;
      }
    });

    const defaultGirl = this.girlsList[0];

    this.girlName = defaultGirl.name;
    this.girlAuthor = defaultGirl.author;
  },

  async unmounted() {
    try {
      await this.webApp.CloudStorage.getItem("background", (error, value) => {
        if (error) {
          this.globalStore.setGlobalBackground("/background.png");
        } else {
          this.globalStore.setGlobalBackground(value);
        }
      });
    } catch (error) {
      this.globalStore.setGlobalBackground("/background.png");
    }

    try {
      await this.webApp.CloudStorage.getItem(
        "main_animation",
        (error, value) => {
          if (error) {
            this.globalStore.setGlobalAnimation("MainGirl");
          } else {
            this.globalStore.setGlobalAnimation(value);
          }
        }
      );
    } catch (error) {
      this.globalStore.setGlobalAnimation("MainGirl");
    }
  },
};
</script>

<style lang="scss" scoped>
.sl-collections-footer {
  &__actions-btn {
    position: fixed;
    top: 170px;
    left: 16px;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    overflow: hidden;
    background: #00000066;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
  }

  &__buttons {
    display: flex;
    margin-top: 16px;
    position: relative;
    z-index: 6;
    position: fixed;
    left: 16px;
    right: 16px;
    bottom: 34px;

    &-item {
      flex: 0 0 calc(50% - 6px);
      border-radius: 8px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      font-size: 19px;
      font-weight: 600;
      cursor: pointer;

      &--back {
        border: 2px solid #2f61b7;

        &:active {
          border-color: #1a4186;
        }
      }

      &--confirm {
        background: #2f61b7;
        border: 1px solid;
        border-image-source: linear-gradient(
          180deg,
          #578fee 0%,
          rgba(87, 143, 238, 0) 100%
        );

        &:active {
          background: #1a4186;
        }
      }

      &:last-child {
        margin-left: 12px;
      }
    }
  }

  &__list {
    display: flex;
    position: relative;
    display: flex;
    margin-top: 16px;
    z-index: 6;
    position: fixed;
    left: 16px;
    right: 16px;
    bottom: 110px;

    &-item {
      width: 72px;
      height: 72px;
      border-radius: 8px;
      background-size: cover;
      background-color: #0b0908;

      &:not(:last-child) {
        margin-right: 16px;
      }

      &--active {
        box-shadow: 0 0 0 1px #0099c9 inset;
      }
    }
  }

  &__info {
    position: fixed;
    left: 16px;
    right: 16px;
    text-align: center;
    top: 120px;
  }

  &__name {
    color: #fff;
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
  }

  &__author {
    font-size: 16px;
    line-height: 24px;
    color: #ffffff7a;
  }

  &__animation {
    position: fixed;
    left: 0;
    right: 0;
    top: 50px;
  }
}
</style>