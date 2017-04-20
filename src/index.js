// index.js -> App.vue -> Home.vue
// this is vue router
// vue
import Vue from 'vue'
// app.vue
import App from './components/App.vue'
// home vue
import Home from './components/Home.vue'
// a quote vue
import SecretQuote from './components/SecretQuote.vue'
// signup vue
import Signup from './components/Signup.vue'
// login vue
import Login from './components/Login.vue'
// vue router
import VueRouter from 'vue-router'
// vue http request
import VueResource from 'vue-resource'
// use http request
Vue.use(VueResource)
// use router
Vue.use(VueRouter)

// use auth method
import auth from './auth'

// vue set http headers with common
// Authorization
// Bearer, local storage id_token
Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');

// Check the user's auth status when the app starts
// this set this.user.authenticated true or false
auth.checkAuth()

// export router. this call very last
export var router = new VueRouter()

// router map
router.map({
  // home
  '/home': {
    component: Home
  },
  // quote
  'secretquote': {
    component: SecretQuote
  },
  // login
  '/login': {
    component: Login
  },
  // signup
  '/signup': {
    component: Signup
  }
})

// anything else redirect to home
router.redirect({
  '*': '/home'
})

// router start the App.vue with id=#app
router.start(App, '#app')
