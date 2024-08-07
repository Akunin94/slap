import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    isDevMode: false,
    balance: null,
    energyLeftAmount: null,
    energyMaxAmount: 10000,
    energyLeftIncrementAmount: 10,
    globalBackground: null,
    globalAnimation: null
  }),
  getters: {
    balanceFormatted: (state) => {
      if (state.balance === null) {
        return '';
      }

      const formattedString = state.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      return formattedString;
    },
  },
  actions: {
    setGlobalBackground(value) {
      this.globalBackground = value
    },
    setGlobalAnimation(value) {
      this.globalAnimation = value
    },
    setIsDevMode(value) {
      this.isDevMode = value
    },
    setBalance(value) {
      this.balance = value
    },
    incrementBalance() {
      this.balance += this.energyLeftIncrementAmount
    },
    setEnergyLeftAmount(value) {
      this.energyLeftAmount = Math.min(this.energyMaxAmount, value)
    },
    decrementEnergyLeftAmount() {
      if (!this.energyLeftAmount && this.energyLeftAmount < this.energyLeftIncrementAmount) {
        return
      }

      this.energyLeftAmount -= this.energyLeftIncrementAmount
    }
  }
})