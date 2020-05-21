<template>
  <div>
    <el-input v-model="user.username"/>
    <el-input v-model="user.password"/>
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
      getYourIP();
    },


    methods: {
      getUserIP(){
        var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
        if (RTCPeerConnection) (()=>{
          var rtc = new RTCPeerConnection()
          rtc.createDataChannel(''); //创建一个可以发送任意数据的数据通道
        rtc.createOffer( offerDesc => { //创建并存储一个sdp数据
          rtc.setLocalDescription(offerDesc)
      }, e => { console.log(e)})
        rtc.onicecandidate =(evt) => { //监听candidate事件
          if (evt.candidate) {
            var ip_addr = evt.candidate.address
            localStorage.setItem('ip_addr',ip_addr)
            console.log(ip_addr)
          }}
      })()
      else{console.log("目前仅测试了chrome浏览器OK")}
      },
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


  function getYourIP(){
    var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
    if (RTCPeerConnection) (function () {
      var rtc = new RTCPeerConnection({iceServers:[]});
      if (1 || window.mozRTCPeerConnection) {
        rtc.createDataChannel('', {reliable:false});
      };

      rtc.onicecandidate = function (evt) {
        if (evt.candidate) grepSDP("a="+evt.candidate.candidate);
      };
      rtc.createOffer(function (offerDesc) {
        grepSDP(offerDesc.sdp);
        rtc.setLocalDescription(offerDesc);
      }, function (e) { console.warn("offer failed", e); });

      var addrs = Object.create(null);
      addrs["0.0.0.0"] = false;
      function updateDisplay(newAddr) {
        if (newAddr in addrs) return;
        else addrs[newAddr] = true;
        var displayAddrs = Object.keys(addrs).filter(function (k) { return addrs[k]; });
        for(var i = 0; i < displayAddrs.length; i++){
          if(displayAddrs[i].length > 16){
            displayAddrs.splice(i, 1);
            i--;
          }
        }
        alert(displayAddrs[0])
        document.getElementById('list').textContent = displayAddrs[0];
      }

      function grepSDP(sdp) {
        var hosts = [];
        sdp.split('\r\n').forEach(function (line, index, arr) {
          if (~line.indexOf("a=candidate")) {
            var parts = line.split(' '),
              addr = parts[4],
              type = parts[7];
            if (type === 'host') updateDisplay(addr);
          } else if (~line.indexOf("c=")) {
            var parts = line.split(' '),
              addr = parts[2];
            updateDisplay(addr);
          }
        });
      }
    })();
    else{
      document.getElementById('list').textContent = "请使用主流浏览器：chrome,firefox,opera,safari";
    }
  }
</script>
<style>
</style>
