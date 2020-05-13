<template>
  <div>
    <el-input/>
  </div>
</template>
<script>
  import axios from '~/plugins/axios'
  export default {
    name:"home",
    created() {
      this.init()
    },
    methods:{
      init() {
        axios({
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'get',
          url: "http://114.55.94.186" + '/searchbky?wd=' + "haha"
        }).then(function (response) {
          alert(JSON.stringify(response))
        }).catch(function (error) {
        })
      }
    }

  }
</script>
