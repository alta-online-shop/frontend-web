<template>
  <v-container>
    <h1>Transaction</h1>
    <div>{{ data }}</div>
    <template>
      <v-card>
        <v-card-title>
          List Transaction
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="desserts" :search="search">
          <template v-slot:item.action="{ item }">
            <v-row align="center" justify="space-around">
              <v-btn
                v-model="item.edit"
                x-small
                color="primary"
                dark
                @click="setEdit(item)"
              >
                Edit
              </v-btn>
              <v-btn
                v-model="item.edit"
                x-small
                color="error"
                dark
                @click="setDelete(item)"
              >
                delete
              </v-btn>
            </v-row>
          </template>
        </v-data-table>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import { call } from "vuex-pathify";

export default {
  data: () => ({
    data: "",
    //from vuetify
    search: "",
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Calories", value: "calories" },
      { text: "Fat (g)", value: "fat" },
      { text: "Carbs (g)", value: "carbs" },
      { text: "Protein (g)", value: "protein" },
      { text: "Iron (%)", value: "iron" },
      { text: "Action", value: "action" },
    ],
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: "1%",
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: "1%",
      },
      {
        name: "Eclair",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: "7%",
      },
      {
        name: "Cupcake",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: "8%",
      },
      {
        name: "Gingerbread",
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: "16%",
      },
      {
        name: "Jelly bean",
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: "0%",
      },
      {
        name: "Lollipop",
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: "2%",
      },
      {
        name: "Honeycomb",
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: "45%",
      },
      {
        name: "Donut",
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: "22%",
      },
      {
        name: "KitKat",
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: "6%",
      },
    ],
    // ./ from vuetify
  }),
  async mounted() {
    this.loadDataFromQuery();
    await this.createTransaction();
  },
  methods: {
    setOrders: call("cart/setOrders"),
    loadDataFromQuery() {
      this.data = this.$route.query.data;
      this.data = JSON.parse(this.data);
    },
    async createTransaction() {
      await this.setOrders([]);
      // TODO: hit backend to save this transactions
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
