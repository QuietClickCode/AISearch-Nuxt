<template>
  <div>
    <el-input v-model="user.username"/>
    <el-input v-model="user.password" @keyup.enter.native="login"/>
    <el-button @click="login">登录</el-button>
    <remote-js src="http://pv.sohu.com/cityjson?ie=utf-8"></remote-js>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  export default {
    name: "login",
    components: {
      'remote-js': {
        render(createElement) {

          return createElement('script', {attrs: {type: 'text/javascript', src: this.src}})

        },

        props: {

          src: {type: String, required: true},

        }
      }
    },
    data() {
      return {
        user: {
          username: '',
          password: ''
        }
      }
    },
    created() {
    },
    mounted() {
      var ip = returnCitySN["cip"];
      console.log(ip, "ip");
    },


    methods: {
      login() {
        var vueThis = this
        axios({
          headers: {
            'Content-Type': 'application/json'
          },
          url: '/tologin',
          method: 'post',
          data: JSON.stringify({
            'user': this.user
          }),
        })

          .then(function (response) {
            if (response.data.status == 0) {
              /*window.location.href = '/#' + |response.data.url*/
              sessionStorage.setItem('userToken', response.data.msg)
              localStorage.setItem('token', response.data.msg)
              /*sessionStorage.setItem('userToken', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ6amoifQ.WduZcdFyZSMdrx82JOYFbAKoDPQ4evDFPvt6i6USK5Y')
              localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ6amoifQ.WduZcdFyZSMdrx82JOYFbAKoDPQ4evDFPvt6i6USK5Y')*/
              localStorage.setItem('loginuser', vueThis.user.username)
              vueThis.$router.push('/')
            } else {
              vueThis.$message(response.data.msg)
            }
          })
          .catch(function (error) {
          })
      }
    }

  }


</script>
<style>
</style>
