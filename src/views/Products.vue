<template>
  <v-container>
    <v-btn @click="BackButton" elevation="2">Back</v-btn>
    <v-card class="mx-auto mt-8">
      <v-card-text>
        <div>Details</div>
        <p class="text-h4 text--primary">{{ Details.data.data.Name }}</p>
        <p>Price : {{ Details.data.data.Price }}</p>
        <span class="black--text text--lighten-2 text-caption mr-2">
          ({{ Details.data.data.Ratings }})
        </span>
        <v-rating
          v-model="this.Details.data.data.Ratings"
          background-color="black"
          color="yellow accent-4"
          dense
          half-increments
          readonly
          size="18"
        ></v-rating>
        <div class="text--primary">
          <li v-for="item in Details.data.data.Categories" :key="item.message">
            {{ item.Name }}
          </li>
          {{ Details.data.data.Description }}
        </div>
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
// import { get, call, dispatch } from "vuex-pathify";
import axios from "axios";
export default {
  mounted() {
    console.log("mounted");
    axios
      .get("https://be-qa.alta.id/api/products/" + this.$route.params.id)
      .then((response) => {
        // console.log(response);
        this.Details = response;
      });
    // this.getDetailProducts();
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
