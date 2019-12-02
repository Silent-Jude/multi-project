<template>

  <div class="app_admin_login">
    <div class="login_wrap">
      <input
        type="text"
        name=""
        id=""
        placeholder="请输入管理员账户"
      >
      <br>
      <input
        type="password"
        v-model="password"
        placeholder="请输入管理员密码"
      >
      <br>
      <button @click="login">
        登录
      </button>
    </div>

  </div>

</template>

<script>
import admin from './admin'

export default {
  components: {
    admin
  },
  data () {
    return {
      password: ''
    }
  },
  methods: {
    login () {
      if (this.password == 888) {
        this.$store.commit('setAdminLog')
        this.$router.push('/adminSuccess')
      }
    }
  }
}
</script>
<style scoped>
</style>
