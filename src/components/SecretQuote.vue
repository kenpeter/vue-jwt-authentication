<template>
  <!-- small 6 -->
  <div class="col-sm-6 col-sm-offset-3">
    <!-- h1 title -->
    <h1>Get a Secret Chuck Norris Quote!</h1>
    <!-- button get a quote -->
    <button class="btn btn-warning" v-on:click="getQuote()">Get a Quote</button>
    <div class="quote-area" v-if="quote">
      <!-- display quote -->
      <h2><blockquote>{{ quote }}</blockquote></h2>
    </div>
  </div>
</template>

<script>
// get auth obj
import auth from '../auth'

export default {
  // date return quote, init empty
  data() {
    return {
      quote: ''
    }
  },

  // build a methods
  methods: {
    // get quote
    // this.$http.get
    // http://localhost:3001
    // /api/protected/random-quote
    getQuote() {
      this.$http
        .get('http://localhost:3001/api/protected/random-quote', (data) => {
          this.quote = data;
        }, {
          // send with headers {headers: xxx}
          // {headers: 'Authorization: Bearer....'}
          headers: auth.getAuthHeader()
        })
        .error((err) => console.log(err)) // error
    }
  },

  // what is this route???
  // canActive()
  // return auth.user.authenticated === true or false
  route: {
    canActivate() {
      return auth.user.authenticated
    }
  }

}
</script>
