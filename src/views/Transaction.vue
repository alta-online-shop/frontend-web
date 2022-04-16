<template>
  <v-container>

    <h1>Transaction</h1>

    <div>{{ data }}</div>

  </v-container>
</template>

<script>
import { call } from 'vuex-pathify';

export default {
  data: () => ({
    data: '',
  }),
  async mounted() {
    this.loadDataFromQuery();
    await this.createTransaction();
  },
  methods: {
    setOrders: call('cart/setOrders'),
    loadDataFromQuery() {
      this.data = this.$route.query.data;
      this.data = JSON.parse(this.data);
    },
    async createTransaction() {
      await this.setOrders([]);
      // TODO: hit backend to save this transactions
    },
  },
};
</script>
