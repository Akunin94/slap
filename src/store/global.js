import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    balance: null,
    energyLeftAmount: null,
    energyMaxAmount: 2000
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
    setBalance(value) {
      this.balance = value
    },
    incrementBalance() {
      this.balance += 1
    },
    setEnergyLeftAmount(value) {
      this.energyLeftAmount = value
    },
    decrementEnergyLeftAmount() {
      if (!this.energyLeftAmount) {
        return
      }

      this.energyLeftAmount -= 1
    }
  }
})