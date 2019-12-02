<template>

  <div class="app_admin">
    <span>我是管理员</span>
    <button @click="addPhone">+</button>

    <div
      v-for="(item,i) of list"
      :key="i"
    >
      <span>请输入手机号</span><input
        type="tel"
        :id="item.i"
        maxlength="11"
        placeholder="请输入需要注册的手机号"
        v-model="item.phone"
      >
    </div>

    <br>
    <br>

    <button @click="reg">提交注册</button>
  </div>

</template>

<script>
export default {
  data () {
    return {
      list: [{ phone: '', i: 1 }],
      i: 1,
      progress: 0,
      exist: false
    }
  },
  methods: {
    addPhone () {
      this.i++
      this.list.push({ phone: '', i: this.i })
    },

    reg () {
      // console.log(this.list);
      var reg = /^1[35789]\d{9}$/

      for (let item of this.list) {
        let phone = item.phone

        this.axios.get(`/checkExist?phone=${ phone }`).then(res => {
          console.log(res.data)
          if (res.data.code == 1) {
            this.exist = true
            console.log('账户数据已存在，不能再次创建。')
          } else {
            this.exist = false

            if (reg.test(item.phone) && !this.exist) {
              this.exist = true
              console.log(item.phone)
              this.axios.get(`/regUser?phone=${ phone }`).then(res => {
                console.log(res.data)
                if (res.data.code == 1) {
                  console.log('user注册成功')
                  // 有了user才能插入bill表，否则uid为空。
                  this.axios.get(`/regBill?phone=${ phone }`).then(res => {
                    if (res.data.code == 1) {
                      console.log('账单表插入成功！')
                    }
                  })
                  // 有了user才能插入order表.
                  this.axios.get(`/regOrders?phone=${ phone }`).then(res => {
                    if (res.data.code == 1) {
                      console.log('orders注册成功')
                    }
                  })
                }
              })
            }
          }
          this.progress = 100
        })
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    // ...
    next(vm => {
      if (vm.$store.getters.getAdminLog == false) {
        next('/admin')
        console.log('请先登录！')
        alert('请先登录')
      } else {
        console.log('登录成功')
      }
    })
  }
}
</script>
<style scoped>
</style>``
