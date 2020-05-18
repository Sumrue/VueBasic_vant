<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '首页',
    meta: [
      {
        name: 'keyworlds',
        content: '首页,官网首页'
      },
      {
        name: 'description',
        content: '这是首页的描述信息'
      }
    ]
  },
  data () {
    return {
      msg: 'axios的封装，采用模块化，方便了多人使用，并且可用多个默认请求地址'
    }
  },
  created () {
    this.$api.modleOne.firstGetRequest().then(
      res => {
        console.log(res)
      }
    )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.iii {
  float: left;
}
</style>
