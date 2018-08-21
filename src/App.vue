<style scoped>
    .main{
        width: 100%;
        height: 100%;
    }
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
    .sider{
        background-color: #ffffff;
    }
    .header{
        width: 100%;
        height: 80px;
        background: rgba(0,106,195,0.7);
        position:relative;
        left: 0;
        top: 0;
    }
    .header-logo{
        padding: 8px 0 0 56px;
        height: 80px;
        width: 200px;
        background-color: rgba(0,106,195,1);
        position: absolute;
        left: 0;
        right: 0;
    }
    .header-font{
        height: 80px;
        line-height: 80px;
        margin-left:185px;
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #FFFFFF;
        text-align: left;;
    }
    .header-font i{
        float: left;
        color: #FFFFFF;
        text-align: left;
        font-style: normal;
    }
    .header-font b{
        font-weight: normal;
        color: #FFFFFF;
        float: right;
        cursor: pointer;
    }
</style>
<template>
    <div v-if='!login'  class="main">
        <app-login></app-login>
    </div>
    <div v-else>
      <Header class="header">
                <div class="header-logo"> <img src="./assets/logos.png" alt="this is logo"></div>
                <div class="header-font clear"><i>上海市公共卫生管理中心后台管理系统</i><b @click="quit">退出</b></div>
     </Header>
      <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Sider collapsible :collapsed-width="78" v-model="isCollapsed" class="sider" hide-trigger>
                <Menu active-name="1-2" theme="light" width="auto" :class="menuitemClasses">
                    <router-link to="/user" tag='li' class="ivu-menu-item" active-class="ivu-menu-item ivu-menu-item-active ivu-menu-item-selected">
                        <Icon type="ios-navigate"></Icon>
                        <span>管理权限</span>
                    </router-link>
                    <router-link to="/product" tag='li'  class="ivu-menu-item" active-class="ivu-menu-item ivu-menu-item-active ivu-menu-item-selected">
                        <Icon type="ios-navigate"></Icon>
                        <span>用户管理</span>
                    </router-link>
                    <router-link to="/classify" tag='li'  class="ivu-menu-item" active-class="ivu-menu-item ivu-menu-item-active ivu-menu-item-selected">
                        <Icon type="ios-navigate"></Icon>
                        <span>角色管理</span>
                    </router-link>
                    <router-link to="/news" tag='li'  class="ivu-menu-item" active-class="ivu-menu-item ivu-menu-item-active ivu-menu-item-selected">
                        <Icon type="ios-navigate"></Icon>
                        <span>权限管理</span>
                    </router-link>
                    <router-link to="/upload" tag='li'  class="ivu-menu-item" active-class="ivu-menu-item ivu-menu-item-active ivu-menu-item-selected">
                        <Icon type="ios-navigate"></Icon>
                        <span>图片管理</span>
                    </router-link>
                    <router-link to="/comment" tag='li'  class="ivu-menu-item" active-class="ivu-menu-item ivu-menu-item-active ivu-menu-item-selected">
                        <Icon type="ios-navigate"></Icon>
                        <span>预约挂号</span>
                    </router-link>
                </Menu>
            </Sider>
            <Layout>
                <Content :style="{padding: '0 16px 16px'}">
                    <Breadcrumb :style="{margin: '16px 0'}">
                        <BreadcrumbItem to="/">Home</BreadcrumbItem>
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
            ...mapActions(['checkLogin','changeLogin']),
            quit(){
                this.changeLogin()
            }
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

