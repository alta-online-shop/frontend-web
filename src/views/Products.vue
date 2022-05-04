<template>
  <v-container>
    <v-skeleton-loader type="article" v-if="loading"></v-skeleton-loader>
    <v-card class="mx-auto mt-8" v-else>
      <v-card-text>
        <p class="text-h4 text--primary">{{ product.Name }}</p>
        <v-chip v-for="item in product.Categories" :key="item.ID">{{ item.Name }}</v-chip>
        <p>Rp <b>{{ product.Price }}</b></p>
        <v-container>
          <v-row>
            <v-rating
              hover
              dense
              length="5"
              size="18"
              v-model="ratings"
            ></v-rating>
            <span class="black--text text--lighten-2 text-caption mr-2">
              ({{ product.Ratings }})
            </span>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { get, call } from "vuex-pathify";
export default {
  data: () => ({
    ratings: 0,
  }),
  async mounted() {
    await this.getProductByID(this.$route.params.id);
    this.ratings = this.product.Ratings;
  },
  computed: {
    product: get("product/product"),
    loading: get("product/loading"),
    error: get("product/error"),
    orders: get("cart/orders"),
  },
  methods: {
    getProductByID: call("product/getProductByID"),
    setRatings: call("product/setRatings"),
    goBack() {
      this.$router.back();
    },
  },
  watch: {
    async ratings(to) {
      await this.setRatings({
        productID: this.product.ID,
        count: to,
      });
      await this.getProductByID(this.$route.params.id);
      this.ratings = this.product.Ratings;
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
.img-circle {
  border-radius: 5px;
}
</style>
