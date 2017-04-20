<template>
  <!-- small 4 -->
  <div class="col-sm-4 col-sm-offset-4">
    <!-- login -->
    <h2>Log In</h2>
    <!-- indicate -->
    <p>Log in to your account to get some great quotes.</p>

    <!-- erorr -->
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>

    <!-- form group with username -->
    <!-- with v model, credentials.username -->
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        placeholder="Enter your username"
        v-model="credentials.username"
      >
    </div>

    <!-- form group with username -->
    <!-- with v model, credentials.password -->
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Enter your password"
        v-model="credentials.password"
      >
    </div>

    <!-- submit button, call auth.login -->
    <button class="btn btn-primary" @click="submit()">Access</button>
  </div>
</template>

<script>
// need auth obj,
import auth from '../auth'

export default {
  // method
  // data returns obj
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      },
      error: ''
    }
  },

  // attr
  methods: {
    // submit method
    // it gets this.credentials.username or this.credentials.password
    submit() {

      var credentials = {
        username: this.credentials.username,
        password: this.credentials.password
      }
      // pass to auth.login
      // this means this object
      // this.$http
      // it is redirect: secretquote
      auth.login(this, credentials, 'secretquote')

    }
  }

}
</script>
