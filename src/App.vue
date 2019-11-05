<template>
  <div id="app">
    <wj-header></wj-header>
    <div class="app-middle">
      <wj-left-header></wj-left-header>
      <div class="right-content">
        <!-- 需要缓存 -->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <!-- 不需要缓存 -->
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import '@A/scss/common.scss'
export default {
  name: 'App'
}
</script>

<style>
html,body,#app{
  height: 100%;
  width: 100%;
  overflow:hidden;
}
body{
  margin:0;
  padding:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin:0;
  font-size:16px;
  position: relative;
}
.app-middle{
  width:100%;
  position: absolute;
  top:60px;
  bottom:0;
}
.right-content{
  margin-left:200px;
  height:100%;
  overflow:auto;
}
</style>
