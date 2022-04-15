<template>
  <v-card>
    <v-card-title>Register</v-card-title>
    <v-card-text>
      <v-form v-model="isValid">

        <v-text-field
          v-model="user.fullname"
          label="Nama Lengkap"
        ></v-text-field>


        <v-text-field
          v-model="user.email"
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          label="Password"
        ></v-text-field>

        <div class="text-center">
          <v-btn color="primary">Register</v-btn>
        </div>

      </v-form>

      <div class="mt-3 text-center">
        Sudah memiliki akun?
        <router-link :to="{ name: 'AuthLogin' }">Login</router-link>
      </div>
    </v-card-text>

  </v-card>
</template>

<script>
export default {
  data: () => ({
    isValid: false,
    user: {
      fullname: '',
      email: '',
      password: '',
    },
  }),
};
</script>
