<template>
  <el-container>
    <el-header class="nav-container">
      <navbar :navIndex="0" @nav-items-click="navClick"></navbar>
    </el-header>
    <el-container>
      <el-aside width="auto" class="aside-container">
        <sidebar
          :items="dsatRouters.children"
          :addOffset="quickAddOffset"
          createButtonTitle="快速创建"
          mainRouter="dsat"
        >
          <div slot="add" class="quick-add">
            <div class="quick-add-content">
              <p v-for="(item, index) in quickAddList" :key="index" @click="addSkip(item)">
                <i class="autobox" :class="'autobox-' + item.icon"></i>
                <span>{{item.label}}</span>
              </p>
            </div>
          </div>
        </sidebar>
      </el-aside>
      <el-main id="crm-main-container" style="padding:15px;">
        <app-main></app-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { childrenMenu } from "@/router/modules/dsat/dsat";
import { mapGetters } from "vuex";
import { Navbar, Sidebar, AppMain } from "./components";

export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain
  },

  computed: {
    ...mapGetters(["dsat", "dsatRouters", "operAuth"]),
    dsatRoutesItems() {
      for (let index = 0; index < childrenMenu.length; index++) {
        const routerMenuItem = childrenMenu[index];
        routerMenuItem.hidden = this.dsat[routerMenuItem.meta.subType]
          ? false
          : true;
      }
      return childrenMenu;
    },
    // 快捷添加
    quickAddList() {
      var addItems = [];
      if (this.dsat.jcsjpz ) {
        addItems.push({
          icon: "customer",
          index: "jcsjpz",
          label: "器件类型",
        });
      }
      if (this.dsat.xmpz ) {
        addItems.push({
          icon: "help_tips",
          index: "xmpz",
          label: "项目模板",
        });
      }
      return addItems;
    },
    quickAddOffset() {
      return Math.round(this.quickAddList.length / 2) * 25;
    },
  },

  data() {
    return {
    };
  },

  created() {
    // this.getcrmMessagNum();
    // this.getcrmSettingConfig();
  },

  mounted() {},

  methods: {
    navClick() {},

    /**
     * 获取消息数
     */
    getcrmMessagNum() {
      this.$store
        .dispatch("GetMessageNum")
        .then((res) => {})
        .catch(() => {});
    },
    /**
     * 获取客户管理配置信息
     */
    getcrmSettingConfig() {
      this.$store.dispatch("CRMSettingConfig");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./styles/common.scss";
.el-container {
  min-height: 0;
}
.aside-container {
  position: relative;
  background-color: #001529;
  box-sizing: border-box;
  border-right: solid 1px #e6e6e6;
}
.nav-container {
  padding: 0;
  // box-shadow: 0px 1px 2px #dbdbdb;
  z-index: 100;
  min-width: 1200px;
}
.clear-border {
  border: none !important;
}
.clear-border:hover {
  background: "#F7F8FA" !important;
}
</style>
