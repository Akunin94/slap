<template>
  <Popup
    class="sl-level-up"
    :is-visible="isVisibleLvlUpPopup"
    @close="isVisibleLvlUpPopup = false"
  >
    <template #content>
      <div class="sl-level-up__shadow" />
      <div class="sl-level-up__title">Level Up</div>
      <div class="sl-level-up__subtitle">Congratulations, you have reached</div>
      <div class="sl-level-up__level">Level 3</div>
      <div class="sl-level-up__pic">
        <img src="/girl1.png" alt="" />
      </div>
      <div class="sl-level-up__benefits">
        <div class="sl-level-up__benefits-item">
          <div class="sl-level-up__benefits-title">Energy Limit</div>
          <div class="sl-level-up__benefits-info">
            <IconEnergy class="mr-1 w-[24px] h-[24px]" />
            <div class="sl-level-up__benefits-value">1500</div>
          </div>
        </div>
        <div class="sl-level-up__benefits-item">
          <div class="sl-level-up__benefits-title">Slap Power</div>
          <div class="sl-level-up__benefits-info">
            <IconSlap class="mr-1 w-[24px] h-[24px]" />
            <div class="sl-level-up__benefits-value">5</div>
          </div>
        </div>
        <div class="sl-level-up__benefits-item">
          <div class="sl-level-up__benefits-title">Level</div>
          <div class="sl-level-up__benefits-info">
            <IconArrowTopGreen class="mr-1 w-[24px] h-[24px]" />
            <div class="sl-level-up__benefits-value">3</div>
          </div>
        </div>
      </div>
    </template>
  </Popup>
</template>

<style lang="scss" scoped>
.sl-level-up {
  overflow: hidden;

  &:deep(.sl-popup__body:after) {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    content: "";
    pointer-events: none;
    background: url(/icons/icon-fx.svg) 50% 0 / 320% auto no-repeat;
    opacity: 0.6;
  }

  &__title {
    font-size: 24px;
    line-height: 32px;
    color: #fff;
    font-weight: 700;
    margin-bottom: 8px;
  }

  &__subtitle {
    font-size: 16px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 6px;
  }

  &__level {
    font-size: 16px;
    line-height: 24px;
    padding: 0 28px;
    background: url(/icons/icon-leaf.svg) 0 0 no-repeat;
    position: relative;
    color: #ff8a00;
    margin-bottom: 12px;
    font-weight: 700;

    &:after {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 24px;
      content: "";
      background: url(/icons/icon-leaf.svg) 0 0 no-repeat;
      transform: scaleX(-1);
    }
  }

  &__pic {
    margin: 0 0 -280px 0;
    position: relative;
    left: -30px;
  }

  &__shadow {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 188px;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 23.56%,
      #000000 60.25%
    );
    z-index: 1;
  }

  &__benefits {
    position: relative;
    z-index: 2;
    display: flex;
    width: calc(100% + 8px);
    text-align: left;

    &-item {
      flex: 0 0 calc(33.33% - 8px);
      margin-right: 8px;
      background: #ffffff14;
      border-radius: 8px;
      color: #fff;
      padding: 4px 8px;
    }

    &-title {
      font-size: 10px;
      line-height: 16px;
    }

    &-info {
      display: flex;
      align-items: center;
    }

    &-value {
      font-size: 17px;
      line-height: 24px;
      font-weight: 600;
    }
  }
}
</style>