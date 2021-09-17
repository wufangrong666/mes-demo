<template>
  <div class="wrapper">
    <div class="bgp">
      <div class="bgpBtm">
        <div class="bgpTitle">
          <p style="font-size:32px;margin-bottom: 15px;">上海奥特博格汽车工程有限公司</p>
          <p style="font-size:18px;margin-bottom:6px;">AUTOBOX Technology (SHANGHAI) CO., LTD</p>
          <p style="font-size:15px;line-height:2;">
            作为智能制造解决方案供应商，我们旨在为您创造高效而简洁
            <br />的自动化生产线！
          </p>
        </div>
        <img class="picb" src="@/assets/img/login/loginlogo.png" alt />
        <!--
        <div class="bgpBom">
          <el-tooltip effect="light" placement="top" style="border:none;">
            <div slot="content">
              <img style="width:125px;" src="../../../static/img/android_code.png" alt="androind图片" />
            </div>
            <el-button class="bgpBom-btn btn-android" round size="mini">
              <img class="picb-img" src="../../../static/img/android.692f627.png" alt="android下载" /> Android下载
            </el-button>
          </el-tooltip>
          <el-tooltip effect="light" placement="top" style="border:none;">
            <div slot="content">
              <img style="width:125px;" src="../../../static/img/ios_code.png" alt="ios图片" />
            </div>
            <el-button class="bgpBom-btn" round size="mini">
              <img class="picb-img" src="../../../static/img/ios.0ef203c.png" alt="ios下载" /> IOS下载
            </el-button>
          </el-tooltip>
          <el-button class="bgpBom-btn" round size="mini">
            <img class="picb-img" src="../../../static/img/windows.89eace0.png" alt="windows下载" /> Windos下载
          </el-button>
          <el-button class="bgpBom-btn" round size="mini">
            <img class="picb-img" src="../../../static/img/mac.1986491.png" alt="mac下载" /> Mac下载
          </el-button>
        </div>
        -->
      </div>
      <div class="bgpForm">
        <div class="verBar"></div>
        <div class="title">欢迎登录</div>
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
        >
          <el-form-item prop="username">
            <el-input
              ref="name"
              v-model="loginForm.username"
              autofocus="autofocus"
              name="username"
              type="text"
              auto-complete="on"
              placeholder="请输入用户名"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              name="password"
              auto-complete="on"
              placeholder="请输入密码"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>
          <el-form-item>
            <el-checkbox style="float:left;" v-model="checked">记住账号</el-checkbox>
            <img
              style="float:right;width:26px;padding: 7px 0 0 0px;cursor:pointer;"
              @click="dialogVisible = true"
              src="../../assets/img/login/sm.png"
              alt
            />
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="submit-btn"
              @click.native.prevent="handleLogin"
            >登&nbsp;录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="20%" style="text-align:center;margin-top:25vh;" class="ewm">正在开发，敬请期待</el-dialog>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      loadLists: [
        {
          id: 0,
          labelName: "Android下载",
          pic: "../../../static/img/android.692f627.png"
        },
        {
          id: 1,
          labelName: "IOS下载",
          pic: "../../../static/img/ios.0ef203c.png"
        },
        {
          id: 2,
          labelName: "Windos下载",
          pic: "../../../static/img/windows.89eace0.png"
        },
        {
          id: 3,
          labelName: "Mac下载",
          pic: "../../../static/img/mac.1986491.png"
        }
      ],
      checked: true,
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      loading: false,
      redirect: undefined,
      remember: false
    };
  },
  computed: {
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  mounted() {},
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then(res => {
              this.loading = false;
              this.$router.push({ path: this.redirect || "/" });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$dark_gray: #ccc;
$light_gray: #333;
$login_theme: #3e6bea;
/deep/ input {
  border: 0 none;
  background-color: white;
  -webkit-appearance: none;
  &:-webkit-autofill {
    background-image: none;
    // -webkit-box-shadow: 0 0 0 1000px white inset !important;
    -webkit-text-fill-color: $light_gray !important;
  }
}
/deep/ .el-input__inner {
  height: 50px;
  padding: 0 12px;
  background-color: #f6f6f6;
  border: 1px solid #e6e6e6;
}
/deep/ .el-input__inner:focus {
  border: 1px solid #3e6bea;
}
/deep/ .el-form-item__error {
  left: 12px;
}
.wrapper {
  position: relative;
  width: 100%;
  min-width: 1300px;
  display: flex;
  .bgp {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: url("../../assets/img/login/loginbgc.png") no-repeat center;
    background-size:cover;
    .bgpBtm {
      .bgpBom-btn {
        margin-left: 20px;
        background-color: #2b5db9;
        color: #fff;
        border: none;
      }
      .bgpTitle {
        color: #fff;
        letter-spacing: 3px;
        line-height: 1.15;
        padding-left: 50px;
      }
      .picb {
        width: 600px;
        height: auto;
        margin-top: 50px;
        margin-bottom: 20px;
      }
    }
    .picb-img {
      width: 22px;
      height: 22px;
      vertical-align: middle;
      margin-right: 8px;
    }
    .title {
      font-size: 20px;
      color: $light_gray;
      margin: 15px 0 20px;
      padding: 0 40px;
      text-align: left;
      letter-spacing: 2px;
      font-weight: 700;
    }
    .verBar {
      position: absolute;
      top: 35px;
      left: 24px;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      content: "";
      width: 4px;
      height: 16px;
      background-color: #3e6bea;
      border-radius: 2px;
      display: block;
    }
    .bgpForm {
      position: relative;
      width: 480px;
      margin-left: 80px;
      padding-top: 10px;
      height: 480px;
      background-color: #fff;
      border-radius: 6px;
      .ewm {
        text-align: center;
      }
      .el-form {
        padding: 0 40px;
        .submit-btn {
          width: 100%;
          line-height: 34px;
          font-size: 20px;
          color: white;
          border-radius: 3px;
          background-color: $login_theme;
          display: block;
        }
        .submit-btn:hover {
          background-color: rgba($color: #3e6bea, $alpha: 0.8);
        }
        .el-button {
          border: 0 none;
        }
        .action-control {
          color: #999;
          /deep/ .el-checkbox {
            .el-checkbox__label {
              color: #999;
            }
            .el-checkbox__input.is-checked .el-checkbox__inner {
              background-color: $login_theme;
              border-color: $login_theme;
            }
          }
          .forget {
            cursor: pointer;
            float: right;
          }
        }
      }
    }
  }
  .logo {
    position: absolute;
    left: 60px;
    top: 50px;
    width: 180px;
    height: 48px;
    z-index: 200;
  }
}
.item-yzm {
  float: right;
}
</style>
