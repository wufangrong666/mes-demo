<template>
  <el-container>
    <el-header class="nav-container">
      <manager-navbar></manager-navbar>
    </el-header>
    <el-container>
      <el-aside width="auto" class="aside-container">
        <sidebar :items="manageRouters.children" createButtonTitle="快速创建" mainRouter="manage">
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
      <el-main id="manager-main-container">
        <app-main></app-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";
import { ManagerNavbar, Sidebar, AppMain } from "./components";
import { childrenMenu } from "@/router/modules/manage/manage";
export default {
  name: "Layout",
  components: {
    ManagerNavbar,
    Sidebar,
    AppMain
  },
  computed: {
    ...mapGetters(["manage", "manageRouters", "operAuth"]),
    manageRoutersItems() {
      for (let index = 0; index < childrenMenu.length; index++) {
        const routerMenuItem = childrenMenu[index];
        routerMenuItem.hidden = this.manage[routerMenuItem.meta.subType]
          ? false
          : true;
      }
      return childrenMenu;
    },
    // 快捷添加
    quickAddList() {
      var addItems = [];
      if (this.manage.yhyqx) {
        addItems.push({
          icon: "customer",
          label: "员工"
        });
      }
      return addItems;
    },
    quickAddOffset() {
      return Math.round(this.quickAddList.length / 2) * 25;
    }
  },
  watch: {

  },
  data() {
    return {
      loading: false,
    };
  },
  mounted() {

  },
  methods: {

    filterAsyncRouter(routers, authInfo) {
      const res = [];
      routers.forEach(router => {
        const tmp = {
          ...router
        };
        if (this.checkAuth(tmp, authInfo)) {
          if (tmp.children) {
            tmp.children = this.filterAsyncRouter(tmp.children, authInfo);
          }
          res.push(tmp);
        }
      });
      return res;
    },

    checkAuth(router, authInfo) {
      if (router.meta) {
        const metaInfo = router.meta;
        if (!metaInfo.requiresAuth) {
          return true;
        } else {
          if (metaInfo.index == 0) {
            return authInfo[metaInfo.type] ? true : false;
          } else if (metaInfo.index == 1) {
            if (authInfo[metaInfo.type]) {
              return authInfo[metaInfo.type][metaInfo.subType] ? true : false;
            }
            return false;
          } else {
            var typeAuth = authInfo[metaInfo.type];
            for (let index = 0; index < metaInfo.subType.length; index++) {
              const field = metaInfo.subType[index];
              typeAuth = typeAuth[field];
              if (typeAuth && metaInfo.subType.length - 1 == index) {
                return true;
              } else if (!typeAuth) {
                return false;
              }
            }
          }
        }
      }
      return true;
    },

    navClick(index) {},

    getAuthMenu() {
      adminGroupsTypeListAPI()
        .then(res => {
          for (let index = 0; index < this.routerItems.length; index++) {
            const menuItem = this.routerItems[index];
            if (menuItem.meta.icon == "contacts" && !menuItem.hidden) {
              menuItem.children = res.data.map(item => {
                return {
                  name: "role-auth",
                  path: `role-auth/${item.roleType}/${encodeURI(item.name)}`,
                  meta: {
                    title: item.name
                  }
                };
              });
            }
          }
        })
        .catch(err => {});
    }
  },
  created() {}
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
  overflow: visible;
}

.nav-container {
  padding: 0;
  // box-shadow: 0px 1px 2px #dbdbdb;
  z-index: 100;
  min-width: 1200px;
}
.quick-add {
  height: 178px;
}

.new-dialog-form {
  height: 47vh;
  overflow-y: auto;
  padding: 20px;
}
.new-dialog-form /deep/ .el-form-item {
  width: 50%;
  margin: 0;
  padding-bottom: 10px;
}
.new-dialog-form /deep/ .el-form-item .el-form-item__label {
  padding: 0;
}
.new-dialog-form /deep/ .el-form-item .el-form-item__content {
  width: 70%;
}
.new-dialog-form .el-select {
  display: block;
  width: 100%;
}
</style>
