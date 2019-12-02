<!-- 太阳系 -->
<template>
  <div>
    <!-- 太阳系 -->
    <ul class="solar">
      <!-- <li class="pluto"/> -->
      <li class="neptune">
        <div class="planet"/>
      </li>
      <li class="uranus">
        <div class="planet"/>
      </li>
      <li class="saturn">
        <div class="planet"/>
      </li>
      <li class="jupiter">
        <div class="planet"/>
      </li>
      <li class="mars">
        <div class="planet"/>
      </li>
      <li class="earth">
        <div class="planet">
          <div class="moon"/>
        </div>
      </li>
      <li class="venus">
        <div class="planet"/>
      </li>
      <li class="mercury">
        <div class="planet"/>
      </li>
      <li class="sun"/>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
    }
  },

  computed: {},

  watch: {},

  created () {},

  methods: {}
}

</script>
<style rel='stylesheet/less' lang='less' scoped>
ul.solar{
  position: relative;
  width: 400px;
  height: 400px;
  background: #000;
  margin: 0 auto;
  li {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border: 1px solid #3B3C51;
    animation: track linear 0s infinite normal none;
    // animation-play-state: paused;
    border-radius: 50%;
  }
  .planet{
    width: 10px;
    height: 10px;
    border-radius: 50%;
    // background: #B8BCC7;
    transform: translate(-50%, -50%);
    margin: 0 auto
  }
  // .pluto { width: 90%; height: 90%;}
  .neptune {
    width: 90%;
    height: 90%;
    animation-duration: 100s;
    .planet{
      background: #826955
    }
  }
  .uranus {
    width: 80%;
    height: 80%;
    animation-duration: 70s;
    .planet{
      background: #89B7D9
    }
  }
  .saturn {
    width: 70%;
    height: 70%;
    animation-duration: 60s;
    .planet{
      background: #E5D4A6
    }
  }
  .jupiter {
    width: 60%;
    height: 60%;
    // background: #006ACC;
    animation-duration: 30s;
    .planet{
      background: #DCB069
    }
  }
  .mars {
    width: 50%;
    height: 50%;
    animation-duration: 20s;
    .planet{
      background: #A64300
    }
  }
  .earth {
    width: 40%;
    height: 40%;
    animation-duration: 12s;
    .planet{
      background: #006ACC;
      animation: track 2s linear 0s infinite normal none;
      .moon{
        width: 2px;
        height: 2px;
        border-radius: 50%;
        background: #B8BCC7;
        transform: translate(-200%, -200%);
        // margin: 0 auto
      }
    }
  }
  .venus {
    width: 30%;
    height: 30%;
    animation-duration: 8s;
    .planet{
      background: #BC8A35
    }
  }
  .mercury {
    width: 20%;
    height: 20%;
    animation-duration: 5s;
    .planet{
      background: #B8BCC7
    }
  }
  .sun {
    width: 10%;
    height: 10%;
    border: none;
    box-shadow: 0 0 10px 2px #b85801 inset, 0 0 10px 2px #b85801;
    background-color: #F1C73F; /* 浏览器不支持的时候显示 */
    background-image: radial-gradient(circle , #f7d872, #ea6f00); /* 标准的语法（必须放在最后） */
  }
  @keyframes track {
    from{
      transform: translate(-50%, -50%) rotate(0turn)
    }
    to {
      transform: translate(-50%, -50%) rotate(1turn)
    }
  }
}
@media screen and (max-device-width: 750px){
  ul.solar{
    width: 200px;
    height: 200px;
  }
}
@media screen and (min-device-width: 750px){

}

</style>
