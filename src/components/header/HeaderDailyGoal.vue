<template>
  <div class="sl-header-daily-goal">
    <div class="sl-header-daily-goal__value">{{ percent }}%</div>
    <div class="sl-header-daily-goal__text">Daily goal</div>
    <svg
      class="sl-header-daily-goal__svg"
      width="70"
      height="70"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="GradientColor">
          <stop offset="0%" stop-color="#FA8F04" />
          <stop offset="100%" stop-color="#A5E34D" />
        </linearGradient>
      </defs>
      <circle
        cx="35"
        cy="35"
        r="33"
        stroke-linecap="round"
        :stroke-dashoffset="goalPercent"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "SlapHeaderDailyGoal",

  props: {
    percent: Number,
  },

  computed: {
    goalPercent() {
      return Math.round(218 * ((100 - this.percent) / 100));
    },
  },
};
</script>

<style lang="scss" scoped>
.sl-header-daily-goal {
  width: 74px;
  height: 74px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  &:before {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    content: "";
    border-radius: 50%;
    border: 2px solid #1c192da3;
  }

  &:after {
    position: absolute;
    left: 6px;
    top: 6px;
    right: 6px;
    bottom: 6px;
    content: "";
    border-radius: 50%;
    border: 2px solid #1c192da3;
  }

  &__value {
    color: #0099c9;
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
  }

  &__text {
    font-size: 10px;
    line-height: 16px;
    color: #fff;
  }

  &__svg {
    position: absolute;
    right: 2px;
    top: 2px;
    transform: rotate(90deg);

    circle {
      fill: none;
      stroke: url(#GradientColor);
      stroke-width: 4px;
      stroke-dasharray: 206;
      border: 1px solid white;
    }
  }
}
</style>
