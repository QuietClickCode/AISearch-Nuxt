<template>
  <div>
    <div>
      <div style="" :class="searchinput">
        <el-input style="width: 500px;margin-top:5px;" v-model="keyword" @keyup.enter.native="search"
                  :class="searchinput2">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
      <div style="" :class="searchinput3">
        <div class="table-div section" v-loading="loading">
          <section class="centertest">
            <p style="margin:0px 200px 10px;font-size: 12px;
    color: #999;" v-if="isShow">AISearch为您找到相关结果{{result.total}}个,耗时{{result.took}}ms</p>
            <div style="list-style:none;">
              <div v-for="(item,i) in data">
                <el-card class="box-card" style="margin: 30px 150px;">

                  <p v-html="item.title" @click="toArticleDetail(item.id)"
                     style="cursor:pointer;color: #2866bd;margin-bottom:20px;margin-top:10px;font-weight: 700;"
                     class="articlecontent">
                    </p>
                  <p v-html="item.content">
                    </p>
                  <span>id:{{item.id}}</span>|
                  <span>创建时间:{{item.createtime}}</span>
                </el-card>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from '~/plugins/axios'

  export default {
    name: "home",
    data() {
      return {
        isShow: false,
        searchinput3: {
          searchinputClass4: false,
          searchinputClass5:true
        },
        searchinput: {
          searchinputClass: true,
          searchinputClass2: false,
          searchinputClass3: false
        },
        searchinput2: {
          searchinputClass: true,
          searchinputClass2: false,

        },
        keyword: "",
        result: [],
        data: {},
        loading: false
      }
    },
    created() {
      // this.init()
    },
    methods: {
      search() {
        var vueThis = this;
        vueThis.loading = true;
        axios({
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'get',
          url: "http://114.55.94.186" + '/searchbky?wd=' + this.keyword
        }).then(function (res) {
          vueThis.data = res.data.data.list
          vueThis.result = res.data.data
          vueThis.loading = false
          vueThis.searchinput.searchinputClass = false
          vueThis.searchinput.searchinputClass2 = true
          vueThis.searchinput2.searchinputClass = false
          vueThis.searchinput2.searchinputClass2 = true
          vueThis.searchinput.searchinputClass3 = true
          vueThis.searchinput3.searchinputClass4 = true
          vueThis.searchinput3.searchinputClass5 = false
          vueThis.isShow = true
        }).catch(function (error) {
        })
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
    box-shadow: 0 0 15px 3px rgba(0,0,0,.18);
  }
  em {
    color: orangered !important;
    font-style:normal
  }
</style>
