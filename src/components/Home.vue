<!-- template -->
<template>
  <!-- div col sm 6 -->
  <div class="col-sm-6 col-sm-offset-3">
    <!-- quote -->
    <h1>Get a Free Chuck Norris Quote!</h1>
    <!-- click, get quote func -->
    <button class="btn btn-primary" v-on:click="getQuote()">Get a Quote</button>
    <div class="quote-area" v-if="quote">
      <!-- show quote -->
      <h2><blockquote>{{ quote }}</blockquote></h2>
    </div>
  </div>
</template>

<script>

export default {
  // data return quote
  data() {
    return {
      quote: ''
    }
  },

  methods: {
    // this http, gets data, assign to quote...
    getQuote() {
      this.$http
        .get('http://localhost:3001/api/random-quote', (data) => {
          this.quote = data;
        })
        .error((err) => console.log(err))
    }
  }

}
</script>
