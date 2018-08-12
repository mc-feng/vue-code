<style scoped>
    .layout-con{
        height: 100%;
        width: 100%;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
<template>
    <div v-if='!login'  class="main">
        <app-login></app-login>
    </div>
    <div v-else>
      <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                    <router-link to="/user" tag='li' class="ivu-menu-item" active-class="ivu-menu-item ivu-menu-item-active ivu-menu-item-selected">
                        <Icon type="ios-navigate"></Icon>
                        <span>用户模块</span>
                    </router-link>
                    <router-link to="/product" tag='li'  class="ivu-menu-item" active-class="ivu-menu-item ivu-menu-item-active ivu-menu-item-selected">
                        <Icon type="ios-navigate"></Icon>
                        <span>产品模块</span>
                    </router-link>
                    <router-link to="/classify" tag='li'  class="ivu-menu-item" active-class="ivu-menu-item ivu-menu-item-active ivu-menu-item-selected">
                        <Icon type="ios-navigate"></Icon>
                        <span>分类模块</span>
                    </router-link>
                    <router-link to="/news" tag='li'  class="ivu-menu-item" active-class="ivu-menu-item ivu-menu-item-active ivu-menu-item-selected">
                        <Icon type="ios-navigate"></Icon>
                        <span>新闻模块</span>
                    </router-link>
                    <router-link to="/upload" tag='li'  class="ivu-menu-item" active-class="ivu-menu-item ivu-menu-item-active ivu-menu-item-selected">
                        <Icon type="ios-navigate"></Icon>
                        <span>上传模块</span>
                    </router-link>
                    <router-link to="/comment" tag='li'  class="ivu-menu-item" active-class="ivu-menu-item ivu-menu-item-active ivu-menu-item-selected">
                        <Icon type="ios-navigate"></Icon>
                        <span>评论模块</span>
                    </router-link>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
                <Content :style="{padding: '0 16px 16px'}">
                    <Breadcrumb :style="{margin: '16px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Card>
                        <div style="height: 700px">
                            <router-view></router-view>
                        </div>
                    </Card>
                </Content>
            </Layout>
        </Layout>
      </div>
    </div>
</template>
<script>
   import {mapGetters,mapActions} from 'vuex';
   import Login from './components/login'
    export default {
        data () {
            return {
                isCollapsed: false,
            };
        },
        methods:{
            ...mapActions(['checkLogin']),
        },
        computed: {
            ...mapGetters(['login']),
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        components:{
           appLogin:Login
        }
    }
</script>
<style  scoped>
  .main{
     width: 100%;
     height: 100%;
  }
</style>

