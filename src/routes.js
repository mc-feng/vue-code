import Manage from "./components/manage/index";
import Home from "./components/Home";
import News from "./components/news/index";
import Upload from "./components/upload/index";
import Comment from "./components/comment/index";
import BookList from "./components/bookList/index";
import Image from "./components/image/index";
import User from "./components/user/index";
import Role from "./components/role/index";
import Permission from "./components/permission/index";
import Log from "./components/log/index";
import Mission from "./components/mission/index";
import Notice from "./components/notice/index"
export const routes =[
    {path:'/',component:Home},
    {path:'/manage',component:Manage},
    {path:'/image',component:Image},
    {path:'/user',component:User},
    {path:'/role',component:Role},
    {path:'/permission',component:Permission},
    {path:'/log',component:Log},
    {path:'/bookList',component:BookList},
    {path:'/news',component:News},
    {path:'/mission',component:Mission},
    {path:'/notice',component:Notice},
    {path:'/upload',component:Upload},
    {path:'/comment/:id',component:Comment},
]