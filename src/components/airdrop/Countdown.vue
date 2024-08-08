<template>
  <div class="slap-countdown">
    <div class="slap-countdown__item">
      <span class="slap-countdown__value">{{ months }}</span>
      <span class="slap-countdown__label">Mo</span>
    </div>
    <div class="slap-countdown__item">
      <span class="slap-countdown__value">{{ days }}</span>
      <span class="slap-countdown__label">Day</span>
    </div>
    <div class="slap-countdown__item">
      <span class="slap-countdown__value">{{ hours }}</span>
      <span class="slap-countdown__label">Hr</span>
    </div>
    <div class="slap-countdown__item">
      <span class="slap-countdown__value">{{ minutes }}</span>
      <span class="slap-countdown__label">Min</span>
    </div>
    <div class="slap-countdown__item">
      <span class="slap-countdown__value">{{ seconds }}</span>
      <span class="slap-countdown__label">Sec</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CountdownTimer",
  props: {
    targetDate: {
      type: Date,
      required: true,
    },
  },
  data() {
    return {
      intervalId: null,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  },
  mounted() {
    this.startTimer();
  },
  beforeUnmount() {
    this.stopTimer();
  },
  methods: {
    startTimer() {
      this.intervalId = setInterval(() => {
        this.updateTimer();
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.intervalId);
    },
    updateTimer() {
      const currentDate = new Date();
      const targetDate = new Date(this.targetDate);
      const timeDiff = targetDate.getTime() - currentDate.getTime();

      if (timeDiff <= 0) {
        this.stopTimer();
        this.months = 0;
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        return;
      }

      const totalSeconds = Math.floor(timeDiff / 1000);
      this.seconds = totalSeconds % 60;
      this.minutes = Math.floor(totalSeconds / 60) % 60;
      this.hours = Math.floor(totalSeconds / 3600) % 24;
      this.days = Math.floor(totalSeconds / 86400) % 30;
      this.months = Math.floor(totalSeconds / 2592000);
    },
  },
};
</script>

<style lang="scss" scoped>
.slap-countdown {
  display: flex;
  justify-content: center;
  align-items: center;

  &__item {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 40px;
    height: 48px;
    border-radius: 8px;
    background: #ffffff14;
    position: relative;

    &:not(:last-child) {
      margin-right: 13px;

      &:before {
        position: absolute;
        left: 100%;
        width: 13px;
        text-align: center;
        top: 0;
        bottom: 0;
        font-size: 17px;
        font-weight: 600;
        content: ":";
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  &__value {
    font-size: 17px;
    line-height: 24px;
    font-weight: 600;
    color: #fff;
  }

  &__label {
    font-size: 10px;
    line-height: 16px;
    color: #ffffff7a;
  }
}
</style>