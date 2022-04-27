<template>
  <v-select
    solo
    v-model="selected"
    :items="categories"
    item-text="Name"
    item-value="ID"
    label="Select category ..."
    clearable
    @change="onCategorySelected"
  ></v-select>
</template>

<script>
import { get, call } from 'vuex-pathify';

export default {
  data: () => ({
    selected: null,
  }),

  computed: {
    categories: get('category/categories'),
  },

  async mounted() {
    await this.getAllCategories();
  },

  methods: {
    getAllCategories: call('category/getAllCategories'),
    onCategorySelected() {
      this.$emit('change', this.selected);
    },
  },
};
</script>
