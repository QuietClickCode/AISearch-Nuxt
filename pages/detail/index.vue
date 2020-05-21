<template>
  <div>
    <div>{{title}}</div>
    <div class="content">
<textarea :value="content" style="width: 100%;height: 95vh"></textarea>
    </div>

  </div>
</template>
<script>
  import axios from '~/plugins/axios'
  export default {
    name: "detail",
    data() {
      return {
        title:'',
        content:'',
        test:true,
        drawer: false,
        direction: 'ltr',
        message:'',
        lastKeyword:'',
        page:1,
        isLoaded:true,
        isShow: false,
        searchinput3: {
          searchinputClass4: true,
          searchinputClass5:false
        },
        searchinput: {
          searchinputClass: false,
          searchinputClass2: true,
          searchinputClass3: true
        },
        searchinput2: {
          searchinputClass: false,
          searchinputClass2: true,

        },
        keyword: "",
        result: [],
        data: [],
        loading: false
      }
    },
    created() {

    },
    mounted() {
//      alert(this.$route.query.id)
var id = this.$route.query.id
      this.search(id);
    },

    methods: {
      search(id) {
        var vueThis = this
        axios({
          url:  '/queryarticle',
          method: 'post',
          data: {
            id: id,
            platform: 'bky_article'
          }
        })
          .then(res => {
            this.content = res.data[0].content;
            this.title = res.data[0].title;
            // console.log(this.content)
          })
          .catch(function (error) {
            console.log('--------------------')
            console.log(error)
          })
      },
      handleClose() {
        this.drawer = false;
        this.test = true;
      },
      handleClick() {
        this.drawer = true;
        this.test = false;
      },

      haha() {
        this.isLoaded =false;
      }
    }

  }
</script>
<style>
  .searchinputClass {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)
  }

  .searchinputClass2 {
    position: fixed;
    left: 50%;
    top: 0%;
    transform: translate(-50%)
  }

  .searchinputClass3 {
    background-color: rgb(248, 248, 248);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    width: 100%;
    height: 50px;
  }

  .searchinputClass4 {
    background-color: rgb(248, 248, 248);
    margin-top: 50px;
    padding: 10px
  }

  .searchinputClass5 {
    background-color: rgb(248, 248, 248);
    width: 100%;
    height: 100vh
  }
  .el-card.is-always-shadow{
    box-shadow: 0 0px 0px 0 rgba(0,0,0,0);
  }
  .el-card__body {
    border-collapse: collapse;
    padding: 0px 15px 20px;
    border: 1px solid transparent;
    transition: all .2s cubic-bezier(.23,1,.32,1) 0s;
  }
  .el-card__body:hover {
    border: 1px solid rgba(0,0,0,.1);
  }
  .el-card:hover {
    box-shadow: 0 0 0px 0px rgba(0,0,0,.18);
  }
  em {
    color: orangered !important;
    font-style:normal
  }
  .margin1 {
    margin: 0px 150px 30px 150px;
  }
  .margin2 {
    margin: 0px 30px 30px 270px;
  }
  .margin3 {
    margin: 5px 150px;
  }
  .margin4 {
    margin: 5px 30px 5px 270px;
  }
</style>
