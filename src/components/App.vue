<!-- template, the App is like layout, it has nav, then router view -->
<template>
  <!-- nav bar -->
  <nav class="navbar navbar-default">
    <!-- container -->
    <div class="container">
      <!-- nav -->
      <ul class="nav navbar-nav">
        <!-- home -->
        <li><a v-link="'home'">Home</a></li>
        <!-- not login, so login link -->
        <li v-if="!user.authenticated"><a v-link="'login'">Login</a></li>
        <!-- no login, signup -->
        <li v-if="!user.authenticated"><a v-link="'signup'">Sign Up</a></li>
        <!-- login, quote -->
        <li v-if="user.authenticated"><a v-link="'secretquote'">Secret Quote</a></li>
        <!-- -login, logout link -->
        <li v-if="user.authenticated"><a v-link="'login'" @click="logout()">Logout</a></li>
      </ul>
    </div>
  </nav>

  <!-- container -->
  <div class="container">
    <!-- router view -->
    <router-view></router-view>
  </div>
</template>

<script>
// get auth obj
import auth from '../auth'

// export method, and attr
export default {
  // data return user: auth.user
  data() {
    return {
      user: auth.user
    }
  },

  // methods: auth.logout
  methods: {

    logout() {
      auth.logout()
    }
  }
}
</script>
