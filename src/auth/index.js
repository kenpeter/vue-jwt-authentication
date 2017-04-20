// ./src/index.js, this is the router
import {router} from '../index'

// api url localhost 3001
const API_URL = 'http://localhost:3001/'
// http://localhost:3001/session/create... create session
const LOGIN_URL = API_URL + 'sessions/create/'
// http://localhost:3001/users, sign up url, why users... sign up?????
const SIGNUP_URL = API_URL + 'users/'

// you know, this export default is like building an obj with attr and methods.
export default {
  // user.authenticated = false
  user: {
    authenticated: false
  },

  // how to login
  // need context, secret, and redirect to somewhere.
  login(context, creds, redirect) {
    // context with $http client, we post to login, so this client
    // post to http://localhost:3001/session/create
    // with secret
    // so we have a fat arrow callback
    context.$http.post(LOGIN_URL, creds, (data) => {
      // local storage
      // set item
      // {id_token, data.id_token}
      localStorage.setItem('id_token', data.id_token)

      // this.user.auth = true
      this.user.authenticated = true

      // if redirect, go somewhere.
      if(redirect) {
        router.go(redirect)
      }

    }).error((err) => {
      // or we have error
      // assign to context.error
      // what is context.
      context.error = err
    })
  },

  // very similar to signin
  // with context, secret and redirect
  signup(context, creds, redirect) {
    // post to http://localhost:3001/users
    // screct
    // callback
    context.$http.post(SIGNUP_URL, creds, (data) => {
      // {id_token, data.id_token}
      localStorage.setItem('id_token', data.id_token)

      // this.user.auth = true
      this.user.authenticated = true

      // redirect
      if(redirect) {
        router.go(redirect)
      }

    }).error((err) => {
      // error
      context.error = err
    })
  },

  logout() {
    // logout, local storage, remove item
    // id_token
    localStorage.removeItem('id_token')
    // { user: {authenticated: false}}
    this.user.authenticated = false
  },

  checkAuth() {
    // get jwt from local stoage
    var jwt = localStorage.getItem('id_token')
    if(jwt) {
      // have jwt, this.user.authenticated = true
      this.user.authenticated = true
    }
    else {
      // else false
      this.user.authenticated = false
    }
  },


  getAuthHeader() {
    // get Authorization: Bearer + jwt.....
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }
}
