<template>
  <v-container>
    <v-btn @click="BackButton" elevation="2">Back</v-btn>
    <v-card class="mx-auto mt-8">
      <v-card-text>
        <div>Details</div>

        <p class="text-h4 text--primary">{{ Details.Name }}</p>
        <p>Price : {{ Details.Price }}</p>
        <v-container>
          <v-row>
            <span class="black--text text--lighten-2 text-caption mr-2">
              ({{ Details.Ratings }})
            </span>
            <v-rating
              v-model="this.Details.Ratings"
              background-color="black"
              color="yellow accent-4"
              dense
              half-increments
              readonly
              size="12"
            ></v-rating>
          </v-row>
        </v-container>
        <v-container>
          <div class="text--primary">
            <li v-for="item in Details.Categories" :key="item.message">
              {{ item.Name }}
            </li>
            {{ Details.Description }}
          </div>
        </v-container>
      </v-card-text>

      <v-expand-transition>
        <v-card
          v-if="reveal"
          class="transition-fast-in-fast-out v-card--reveal"
          style="height: 100%"
        >
          <v-card-text class="pb-0">
            <p class="text-h4 text--primary">Origin</p>
            <p>
              late 16th century (as a noun denoting a place where alms were
              distributed): from medieval Latin eleemosynarius, from late Latin
              eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’
            </p>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-btn text color="teal accent-4" @click="reveal = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-expand-transition>
    </v-card>
  </v-container>
</template>

<script>
import { get } from "vuex-pathify";
// import axios from "axios";
export default {
  mounted() {
    // axios
    //   .get("https://be-qa.alta.id/api/products/" + this.$route.params.id)
    //   .then((response) => {
    //     // console.log(response);
    //     this.Details = response;
    //   });
    // this.getDetailProducts();
    this.products.map((product) => {
      if (product.ID == this.$route.params.id) {
        this.Details = product;
      }
    });
    console.log("product all " + JSON.stringify(this.Details));
  },
  computed: {
    products: get("product/products"),
    loading: get("product/loading"),
    error: get("product/error"),
    orders: get("cart/orders"),
  },
  data: function () {
    return {
      Details: "",
    };
  },
  methods: {
    BackButton() {
      //   console.log("nack button :");
      this.$router.push("/");
    },
  },
};
</script>

<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
