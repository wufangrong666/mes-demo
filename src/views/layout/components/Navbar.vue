<template>
  <div class="navbar">
    <img :src="logo" class="logo" />
    <div class="nav-items-container">
      <flexbox style="width: auto;">
        <router-link
          v-for="(item, index) in items"
          :key="index"
          @click.native="navItemsClick(item.type)"
          class="nav-item"
          :style="{ 'color' : item.type == navIndexChild ? '#2362FB' : '#333' }"
          :to="item.path"
        >
          <i
            class=""
            :class="'autobox' + item.icon"
            style="margin-right: 10px;"
            :style="{ 'color': item.type == navIndexChild ? '#2362FB' : '#333'}"
          ></i>
          <div class="nav-item-title">{{item.title}}</div>
        </router-link>
      </flexbox>
    </div>

    <el-popover
      placement="bottom"
      :visible-arrow="false"
      popper-class="no-padding-popover"
      width="200"
      trigger="click"
    >
      <div class="handel-items">
        <div class="handel-item" @click="handleClick('goout')">
          <i class="-goout"></i>退出登录
        </div>
        <div v-if="manage" class="handel-box">
          <el-button @click="enterSystemSet()" type="primary" class="handel-button">管理后台</el-button>
        </div>
      </div>

      <div slot="reference" class="user-container">
        <div
          v-photo="userInfo"
          class="user-img div-photo"
          :key="userInfo.img"
          v-lazy:background-image="$options.filters.filterUserLazyImg(userInfo.img)"
        ></div>
        <span class="userName">{{userInfo.realname}}</span>
        <i class="el-icon-caret-bottom mark"></i>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Loading } from "element-ui";
import Lockr from "lockr";
import { EventBus } from "../../../utils/eventBus";
export default {
  data() {
    return {
      list: [],
      activeName: "first",
      value: true,
      navIndexChild: 0,
      information: "arrInformation",
      cententList: [],
      module: "",
      page: 1,
      flag: false
    };
  },
  props: {
    navIndex: {
      type: [Number, String],
      default: 0,
    },
  },
  components: {},
  computed: {
    ...mapGetters([
      "userInfo",
      "dsat",
      "logo",
      "manage",
    ]),
    items() {
      var tempsItems = [];
      if (this.dsat) {
        tempsItems.push({
          title: "DSAT",
          type: 0,
          path: "/dsat",
          icon: "department",
        });
      }
      return tempsItems;
    },
  },
  mounted() {
    this.navIndexChild = this.navIndex;
    let self = this;
    if (Lockr.get("authList").oa == undefined) {
      this.grzl = false;
    } else {
      if (Lockr.get("authList").oa.personset.grzl) {
        this.grzl = Lockr.get("authList").oa.personset.grzl;
      }
    }
    EventBus.$on("message", (msg) => {
      EventBus.$off("message");
    });
  },
  methods: {
    load() {
      if (this.infiniteName == "storeNum") {
        if (this.page < Math.ceil(this.storeNum / 30)) {
          this.page += 1;
          this.noMore = false;
          this.logLeftData();
        } else {
          this.noMore = true;
        }
      }
      if (this.infiniteName == "crmNum") {
        if (this.page < Math.ceil(this.crmNum / 30)) {
          this.page += 1;
          this.noMore = false;
          this.logLeftData();
        } else {
          this.noMore = true;
        }
      }
      if (this.infiniteName == "jxcNum") {
        if (this.page < Math.ceil(this.jxcNum / 30)) {
          this.page += 1;
          this.noMore = false;
          this.logLeftData();
        } else {
          this.noMore = true;
        }
      }
      if (this.infiniteName == "cwNum") {
        if (this.page < Math.ceil(this.cwNum / 30)) {
          this.page += 1;
          this.noMore = false;
          this.logLeftData();
        } else {
          this.noMore = true;
        }
      }
      if (this.infiniteName == "oaNum") {
        if (this.page < Math.ceil(this.oaNum / 30)) {
          this.page += 1;
          this.noMore = false;
          this.logLeftData();
        } else {
          this.noMore = true;
        }
      }
      if (this.infiniteName == "txNum") {
        if (this.page < Math.ceil(this.txNum / 30)) {
          this.page += 1;
          this.noMore = false;
          this.logLeftData();
        } else {
          this.noMore = true;
        }
      }
    },
    otherClick() {
      if (this.flag) {
        this.popover = "新功能";
        this.versionList = [];
        this.versionList.push(this.dataList[0]);
        this.flag = !this.flag;
      } else {
        this.versionList = [];
        this.popover = "版本信息";
        this.versionList = this.dataList;
        this.flag = !this.flag;
      }
    },
    linkClick(type) {
      this.$router.push({
        path: type.type,
      });
      this.tabClick(type.messageId);
      this.drawer = false;
      EventBus.$emit("aMsg", "来自A页面的消息");
    },
    switchChange(status) {
      if (status) {
        this.read = "0";
      } else {
        this.read = "1";
      }
      this.logLeftData();
    },
    bioMenu(val) {
      if (val == "storeNum") {
        this.infiniteName = "storeNum";
        this.module = "";
        this.cententList = [];
        this.page = 1;
        this.noMore = false;
        this.logLeftData();
      }
      if (val == "jxcNum") {
        this.infiniteName = "jxcNum";
        this.module = "2";
        this.cententList = [];
        this.page = 1;
        this.noMore = false;
        this.logLeftData();
      }
      if (val == "oaNum") {
        this.infiniteName = "oaNum";
        this.module = "4";
        this.cententList = [];
        this.page = 1;
        this.noMore = false;
        this.logLeftData();
      }
      if (val == "cwNum") {
        this.infiniteName = "cwNum";
        this.module = "3";
        this.cententList = [];
        this.page = 1;
        this.noMore = false;
        this.logLeftData();
      }
      if (val == "crmNum") {
        this.infiniteName = "crmNum";
        this.module = "1";
        this.cententList = [];
        this.page = 1;
        this.noMore = false;
        this.logLeftData();
      }
      if (val == "txNum") {
        this.infiniteName = "txNum";
        this.module = "5";
        this.cententList = [];
        this.page = 1;
        this.noMore = false;
        this.logLeftData();
      }
    },
    dropdown(command) {
      if (command == "true") {
        noticeCheckAllStatus({
          module: this.module,
        })
          .then((res) => {
            this.logLeftData();
          })
          .catch((res) => {});
      } else {
        noticeDeleteMessageByRead({
          module: this.module,
        })
          .then((res) => {})
          .catch((res) => {});
      }
    },
    tabClick(id) {
      noticeCheckStatus({
        messageIds: id,
      })
        .then((res) => {
          this.logLeftData();
        })
        .catch((res) => {});
    },
    deleteClick(id) {
      noticeDeleteMessageById({
        messageIds: id,
      })
        .then((res) => {
          this.logLeftData();
        })
        .catch((res) => {});
    },

    logLeftData() {
      this.cententList = [];
      noticeGetNoticeByModule({
        page: this.page,
        limit: 30,
        read: this.read,
        module: this.module,
      })
        .then((res) => {
          this.list = res.data;
          this.cententList = this.cententList.concat(res.data);
          // if (res.data.length == 0) {
          //   this.page -= 1;
          // }
        })
        .catch((res) => {});
    },
    navItemsClick(type) {
      this.navIndexChild = type;
      this.$store.commit("SET_NAVACTIVEINDEX", type);
      this.$emit("nav-items-click", type);
    },
    enterSystemSet() {
      this.$router.push({
        path: "/manage/yhyqx/yhgl",
      });
    },
    handleClick(type) {
      if (type === "goout") {
        this.$confirm("退出登录？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            var loading = Loading.service({
              target: document.getElementById("#app"),
            });
            this.$store
              .dispatch("LogOut")
              .then(() => {
                location.reload();
                loading.close();
              })
              .catch(() => {
                location.reload();
                loading.close();
              });
          })
          .catch(() => {});
      } else if (type === "person") {
        this.$router.push({
          path: "/oa/purchasemanagement/personalInfo",
        });
      }
    },
    switchLang(item) {
      this.$store.commit("SET_LANG", item.lang);
      this.langName = item.name;
    },
    drawerTrue() {
      this.drawer = true;
      this.logLeftData();
      this.logData();
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.message-cell:hover .message-cell__ft .handle .check,
.message-cell:hover .message-cell__ft .handle .delete {
  visibility: visible;
}
.message-cell {
  position: relative;
  font-size: 14px;
  color: #333;
  padding: 15px 20px 15px 15px;
  line-height: 1.5;
}
.message-cell:hover {
  background: #f6f8fa;
}
.message-cell__hd {
  flex-shrink: 0;
  margin-right: 15px;
  background-color: #2362fb;
  text-align: center;
  width: 28px;
  height: 28px;
  line-height: 28px;
  border-radius: 14px;
  display: inline-block;
  .wk {
    color: #fff;
    font-size: 13px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
  }
}
.message-cell__bd {
  display: inline-block;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
  width: 450px;
  .click-content {
    color: #2362fb;
    cursor: pointer;
  }
}
.message-cell__ft {
  display: inline-block;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  font-size: 12px;
  color: #999;
  width: 155px;
  text-align: left;
  position: relative;
  .handle {
    position: absolute;
    top: 20px;
    right: 42px;
    font-size: 12px;
    color: #999;
    .check,
    .delete {
      visibility: hidden;
      cursor: pointer;
      font-size: 12px;
      color: #999;
    }
    .check:hover {
      color: #2362fb;
    }
    .delete:hover {
      color: #f56c6c;
    }
  }
  .is-dot {
    position: absolute;
    width: 6px;
    height: 6px;
    background: red;
    border-radius: 50%;
    right: 20px;
    top: 5px;
  }
}

.center {
  width: 720px;
  height: 780px;
  overflow: auto;
  padding-bottom: 40px;
}
.navbar {
  height: 60px;
  min-height: 60px;
  background-color: white;
  box-shadow: 0px 1px 2px #dbdbdb;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 15px;
  .logo {
    width: 165px;
    height: 50px;
    display: block;
    flex-shrink: 0;
    margin-right: 20px;
  }
  .nav-items-container {
    flex: 1;
    display: flex;
    min-width: 500px;
    height: 100%;
    overflow-x: auto;
    line-height: 60px;
    font-size: 16px;
    font-weight: 500;
  }

  .user-container {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    cursor: pointer;
    .user-img {
      display: block;
      width: 32px;
      min-width: 32px;
      min-height: 32px;
      height: 32px;
      margin-right: 8px;
      border-radius: 50%;
    }
    .mark {
      font-size: 15px;
      color: #aaaaaa;
    }
  }

  .user-container:hover {
    .mark {
      color: #2362fb;
    }
  }
}

.nav-item {
  padding: 0 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
}

.nav-item-img {
  width: 24px;
  height: 24px;
  display: block;
  margin-right: 5px;
}

.handel-items {
  padding: 10px 0 18px 0;
  .handel-item {
    padding: 5px 20px;
    font-size: 14px;
    color: #aaa;
    cursor: pointer;
    i {
      margin-right: 8px;
      font-size: 15px;
    }
  }
  .handel-item:hover {
    background-color: #f7f8fa;
    color: #2362fb;
  }
  .handel-box {
    padding: 0 15px;
    .handel-button {
      width: 100%;
      border-radius: 4px;
      border-color: #2362fb;
      background-color: #2362fb;
    }
  }
}
.hr-top {
  margin-top: 8px;
  border-top: 1px solid #f4f4f4;
  padding-top: 3px;
}

.nav-lang {
  cursor: pointer;
  color: #888;
  padding: 20px;
  &:hover {
    color: #2362fb;
  }
  &.active {
    font-weight: bold;
    color: #2362fb;
  }
}

.auth-button {
  background: linear-gradient(to right, #d9ac7c, #c28e5c);
  color: white;
  padding: 5px 15px;
  font-size: 12px;
  height: 24px;
  outline: none;
  margin: 0;
  border: none;
  border-radius: 12px;
  transform: scale(0.9);
  margin-right: 15px;
  cursor: pointer;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.auth-content {
  text-align: center;
  color: #333;
  padding: 30px 20px;
  .title {
    font-size: 16px;
    font-weight: 600px;
  }
  .detail {
    transform: scale(0.9);
    margin-top: 8px;
    font-size: 12px;
    margin-bottom: 15px;
  }
  .phone {
    background: linear-gradient(to right, #f2dfb2, #e5c78a);
    border-radius: 4px;
    padding: 5px 17px;
    font-size: 12px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.12);
    line-height: 17px;
  }
}
.router-link-active {
  height: 58px;
  border-bottom: 3px solid #2362fb;
}
.userName {
  margin-right: 5px;
  color: #333;
}
.to-do-sth {
  cursor: pointer;
  .todo-img {
    display: flex;
    align-items: center;
    flex-shrink: 0;

    min-width: 32px;
    min-height: 32px;
    height: 32px;
    margin-right: 8px;
    border-radius: 50%;
  }
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.router-link-active {
  background-color: rgba(255, 255, 255, 0);
}
.el-dropdown-link {
  cursor: pointer;
}
.el-dropdown-menu__item {
  display: flex;
  justify-content: space-between;
}
.el-badge {
  margin-left: 30px;
}
.-message {
  font-size: 20px;
}
// 通知栏
.DioNotice {
  padding: 0 20px;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  font-weight: 800;
  color: #333;
  background-color: #f7f8fa;
  border-radius: 4px;
  border: 1px solid #f7f8fa;
}
.el-drawer__body {
  position: relative;
}
.DioMenu .el-tabs__item.is-active {
  background-color: #2362fb;
  color: #fff;
  border-radius: 20px;
}
.DioMenu {
  // overflow-x: auto;
  // overflow-y: hidden;
  padding: 0 15px;
  // height: 60px;
  // border-top: 1px solid #e6e6e6;

  .el-badge {
    .el-button--small {
      border-radius: 20px !important;
      background-color: #f6f8fa;
    }
    .el-button:hover,
    .el-button:focus {
      color: #fff;
      background-color: #2362fb;
    }
  }
  .item {
    margin-left: 40px;
    margin-right: 0;
  }
  .el-dropdown-menu__item {
    display: flex;
    justify-content: space-around;
  }
}
.sm-main__bd {
  height: calc(100% - 110px);
  overflow-y: auto;
}
.bottomBar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #f7f8fa;
}
.bgpBom {
  padding: 0 40px;
}
.el-divider--horizontal {
  margin: 0;
}
</style>
<style>
.DioMenu .el-tabs__nav .el-tabs__active-bar {
  height: 0 !important;
}
/* .DioMenu .el-badge {
  padding: 0 15px !important;
} */
.DioMenu .el-tabs__item {
  margin-top: 10px;
  margin-left: 15px !important;
  border-radius: 20px;
  text-align: center;
  background-color: #f6f8fa;
  height: 30px;
  line-height: 30px;
}
.DioMenu .el-tabs__item.is-active {
  background-color: #2362fb;
  color: #fff;
  border-radius: 20px;
}
.DioMenu .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none;
}
.DioMenu .el-tabs--card > .el-tabs__header {
  border-bottom: 0;
}
.DioMenu .el-tabs__item:hover {
  background-color: #2362fb;
  color: #fff;
}
.DioMenu .el-tabs--card > .el-tabs__header .el-tabs__item {
  border: 0 !important;
  transition: color 0s;
}

.el-icon-delete-solid,
.el-icon-check {
  line-height: 36px;
}
.popoverNav {
  height: 200px;
  position: relative;
}
.popoverUl {
  height: 160px;
  width: 100%;
  overflow: auto;
}
.popoverLi {
  width: 100%;
  line-height: 40px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 10px;
}
.popoverBtn {
  width: 100%;
  height: 40px;
  background: blank;
  position: absolute;
  bottom: 0;
  left: 0;
  padding-right: 20px;
  text-align: right;
}
.imgStyle {
  width: 20px;
  height: 20px;
}
.ld {
  width: 20px;
  height: 20px;
  transform-origin: 50% 0;
  animation: yaolingdang 3s infinite ease;
}
@keyframes yaolingdang {
  5%,
  25%,
  45% {
    transform: rotate(30deg);
  }
  0%,
  10%,
  30%,
  50% {
    transform: rotate(-30deg);
  }
  15%,
  35%,
  55% {
    transform: rotate(30deg);
  }
  20%,
  40%,
  60% {
    transform: rotate(-30deg);
  }
  65%,
  100% {
    transform: rotate(0deg);
  }
}
</style>
