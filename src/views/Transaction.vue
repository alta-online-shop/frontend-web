<template>
  <v-container>

    <h1>Transaction</h1>

    <div>{{ data }}</div>

  </v-container>
</template>

<script>
export default {
  data: () => ({
    data: '',
  }),
  async mounted() {
    this.loadDataFromQuery();
    await this.createTransaction();
  },
  methods: {
    loadDataFromQuery() {
      this.data = this.$route.query.data;
      this.data = JSON.parse(this.data);
    },
    async createTransaction() {
      // TODO: hit backend to save this transactions
    },
  },
};
</script>
