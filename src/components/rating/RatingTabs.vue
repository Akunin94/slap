<template>
  <div class="sl-rating-tabs">
    <div class="sl-rating-tabs__header">
      <div
        class="sl-rating-tabs__header-item sl-rating-tabs__header-item--active"
      >
        Today
      </div>
      <div class="sl-rating-tabs__header-item">Average</div>
      <div class="sl-rating-tabs__header-item">Record</div>
      <div class="sl-rating-tabs__header-item">Total</div>
    </div>
    <div class="sl-rating-tabs__body overflow-auto">
      <div
        v-for="item in items"
        :key="item.name"
        class="sl-rating-tabs__body-item"
        :class="[
          { 'sl-rating-tabs__body-item--active': item.isUser },
          item.league ? `sl-rating-tabs__body-item--league-${item.league}` : '',
        ]"
      >
        <div class="sl-rating-tabs__body-item-pos">{{ item.pos }}</div>
        <div class="sl-rating-tabs__body-item-name truncate">
          {{ item.name }}
        </div>
        <div class="sl-rating-tabs__body-item-league">
          <component v-if="item.league" :is="leagueIcon(item.league)" />
        </div>
        <div class="sl-rating-tabs__body-item-total">
          {{ formattedTotal(item.total) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconDiamond from "@/components/icons/IconDiamond.vue";
import IconGold from "@/components/icons/IconGold.vue";
import IconBronze from "@/components/icons/IconBronze.vue";

export default {
  name: "SlapRatingTabs",

  components: { IconDiamond, IconGold, IconBronze },

  data() {
    return {
      items: [
        {
          pos: 1,
          name: "@Pavel2000",
          league: "diamond",
          total: 1327952102,
          isUser: false,
        },
        {
          pos: 2,
          name: "@Makis",
          league: "gold",
          total: 1007945982,
          isUser: false,
        },
        {
          pos: 3,
          name: "@Xalor",
          league: "bronze",
          total: 873762563,
          isUser: false,
        },
        {
          pos: 4,
          name: "@Yareunala",
          league: "",
          total: 527836284,
          isUser: false,
        },
        {
          pos: 5,
          name: "@Yareunala",
          league: "",
          total: 527836284,
          isUser: false,
        },
        {
          pos: 6,
          name: "@Yareunala",
          league: "",
          total: 527836284,
          isUser: false,
        },
        {
          pos: 7,
          name: "@Yareunala",
          league: "",
          total: 527836284,
          isUser: false,
        },
        {
          pos: 8,
          name: "@Yareunala",
          league: "",
          total: 527836284,
          isUser: true,
        },
        {
          pos: 9,
          name: "@Yareunala",
          league: "",
          total: 527836284,
          isUser: false,
        },
        {
          pos: 10,
          name: "@Yareunala",
          league: "",
          total: 527836284,
          isUser: false,
        },
      ],
    };
  },

  methods: {
    leagueIcon(name) {
      if (name === "diamond") {
        return IconDiamond;
      }

      if (name === "gold") {
        return IconGold;
      }

      if (name === "bronze") {
        return IconBronze;
      }

      return "";
    },

    formattedTotal(value) {
      const formattedString = value
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

      return formattedString;
    },
  },
};
</script>

<style lang="scss" scoped>
.sl-rating-tabs {
  position: relative;
  z-index: 5;
  padding: 0 16px;

  &__header {
    padding: 8px;
    display: flex;
    justify-content: space-around;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    margin-bottom: 12px;

    &-item {
      font-size: 14px;
      line-height: 20px;
      color: rgba(255, 255, 255, 0.48);
      padding: 8px 0 7px;
      border-bottom: 1px solid transparent;
      cursor: pointer;

      &--active,
      &:active {
        color: #fff;
        border-bottom-color: #0099c9;
      }
    }
  }

  &__body {
    height: calc(100vh - 230px - 101px - 12px - 64px);
    padding: 0 8px;

    &-item {
      background: rgba(40, 46, 77, 0.24);
      border-radius: 8px;
      padding: 12px;
      display: flex;
      position: relative;

      &:not(:last-child) {
        margin-bottom: 8px;
      }

      &--league {
        &-bronze {
          background: #a9a9aa3d;
        }

        &-gold {
          background: #ffe55c3d;
        }

        &-diamond {
          background: #690eff3d;
        }
      }

      &--active {
        &:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 8px;
          padding: 2px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.14),
            rgba(255, 255, 255, 0.04)
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
        }
      }

      &-pos {
        font-size: 15px;
        line-height: 20px;
        font-weight: 600;
        color: #0099c9;
        flex: 0 0 50px;
        margin-right: 4px;
      }

      &-name {
        font-size: 14px;
        line-height: 20px;
        color: rgba(255, 255, 255, 0.8);
        flex: 1 0 1%;
      }

      &-league {
        flex: 0 0 20px;
        margin-left: 8px;
      }

      &-total {
        font-size: 15px;
        line-height: 20px;
        color: rgba(255, 255, 255, 0.8);
        font-weight: 700;
        flex: 0 0 118px;
        text-align: right;
        margin-left: 8px;
      }
    }
  }
}
</style>