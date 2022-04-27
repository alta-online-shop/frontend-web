<template>
  <v-container>
    <h1>Transactions</h1>

    <v-card>
      <v-data-table :headers="headers" :items="transactions">
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { get, call, dispatch } from "vuex-pathify";

export default {
  data: () => ({
    search: "",
    headers: [
      { text: "Produk", value: "Product" },
      { text: "Harga", value: "Price" },
      { text: "Banyaknya", value: "Quantity" },
      { text: "Sub-total", value: "Subtotal" },
    ],
  }),

  computed: {
    transactions: get('transaction/transactions'),
  },
  async mounted() {
    await this.createTransaction();
    await this.getAllTransactions();
  },
  methods: {
    getAllTransactions: call("transaction/getAllTransactions"),
    async createTransaction() {
      let data = this.$route.query.data;
      if (data) {
        data = JSON.parse(data);
        if (data.length > 0) {
          await dispatch("transaction/createTransaction", data);
          window.location = window.location.href.split('?')[0];
        }
      }
    },
    setEdit(item) {
      console.log("item set Edit", item);
    },
    setDelete(item) {
      console.log("item set Delete", item);
    },
  },
};
</script>
