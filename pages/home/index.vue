<el<template>
  <div>
    <div style=" position: fixed;
    bottom: 0px;
    left: 50%;
font-size: 30px;"
         v-show="loading"
         class="el-icon-loading"
    >

    </div>
    <el-drawer
      size="13%"
      :modal="false"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose">
      <div slot="title" style="text-align: center">
        <el-avatar  type="primary" style="margin-left: 16px;" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <div>{{username}}</div>
      </div>
      <div>
        <div class="item">
          <i class="el-icon-user-solid icon"></i>
          <a class="post-title-link">个人中心</a>
        </div>
        <div class="item">
          <i class="el-icon-user-solid icon"></i>
          <a class="post-title-link">历史记录</a>
        </div>
        <div class="item">
          <i class="el-icon-user-solid icon"></i>
          <a class="post-title-link">主题设置</a>
        </div>
        <div class="item">
          <i class="el-icon-user-solid icon"></i>
          <a class="post-title-link">退出</a>
        </div>
      </div>
    </el-drawer>
    <div v-loading="isLoaded" >
      <div style="" :class="searchinput">
        <el-input style="width: 500px;margin-top:5px;" v-model="keyword" @keyup.enter.native="search(1)"
                  :class="searchinput2">
          <el-button slot="append" icon="el-icon-search" @click="search(1)"></el-button>
        </el-input>
        <div @click="handleClick">
        <el-avatar  type="primary" style="margin-left: 16px;" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </div>
      </div>
      <div :class="searchinput3" >
        <div class="table-div section">
          <section class="centertest" >
            <div style="list-style:none;">

            <p style="font-size: 12px;transition: 0.3s;
    color: #999;" v-if="isShow" :class="{margin3:test,margin4:!test}">AISearch为您找到相关结果{{result.total}}个,耗时{{result.took}}ms</p>
              <div v-for="(item,i) in data"  >
                <el-card class="box-card" :class="{margin1:test,margin2:!test}" >

                  <a v-html="item.title" @click="toArticleDetail(item.id)"
                     style="cursor:pointer;color: #2866bd;margin-bottom:20px;margin-top:10px;font-weight: 700;"
                     class="articlecontent post-title-link">
                    </a>
                  <p v-html="item.content">
                    </p>
                  <a>id:{{item.id}}</a>|
                  <a>创建时间:{{item.createtime}}</a>
                </el-card>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>
<script>
  import axios from '~/plugins/axios'
  export default {
    name: "home",
    data() {
      return {
        username:"",
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
      this.username = localStorage.getItem("loginuser");
      this.keyword = localStorage.getItem("word");
      this.search(1);
      this.haha();
      var vueThis = this;
      window.onscroll = function(){
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        //变量windowHeight是可视区的高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
        //滚动条到底部的条件
        if(scrollTop+windowHeight == scrollHeight){
          //到了这个就可以进行业务逻辑加载后台数据了
          vueThis.search(vueThis.page ++);
        }
      }
    },

    methods: {
      toArticleDetail(id) {
        this.$router.push({
          path:"/detail",
          query:{
            id:id
          }
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
      },
      search(page) {
        if (this.lastKeyword != this.keyword) {
          this.data = [];
        }
        this.lastKeyword = this.keyword
        var vueThis = this;
        vueThis.loading = true;
        localStorage.setItem("word",this.keyword)
        axios({
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'get',
          url: "http://114.55.94.186" + '/searchbky?wd=' + this.keyword + '&pn=' + page
        }).then(function (res) {
            vueThis.data.push(...res.data.data.list)
            console.log(vueThis.data)
            vueThis.result = res.data.data
            vueThis.isShow = true
            vueThis.loading = false
        }).catch(function (error) {
        })
      }
    }

  }
</script>
<style>
  .post-title-link:hover::after, .post-title-link:active::after {
    visibility: visible;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
  .post-title-link::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #3f51b5;
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: 0.4s ease-in-out;
    transition: 0.4s ease-in-out;
  }
  .icon {
    margin: 0px 20px;
  }
  .text {
    cursor: pointer;
    margin: 0px 20px 0px 0px;
  }
  .item {
    height:40px;
    line-height: 40px;
  }
  .post-title-link:hover {
    text-decoration: none;
  }
  a:hover {
    color: #303f9f;
    text-decoration: underline;
  }
  .post-title-link {
    color: #3f51b5;
    position: relative;
    display: inline-block;
  }
  a {
    background-color: transparent;
    background-image: none;
    color: #3f51b5;
    text-decoration: none;
    outline: 0;
  }
  /*.item:hover {

    background-color: grey;
  }*/
  button:focus {
    outline: -webkit-focus-ring-color auto 0px;
  }
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
