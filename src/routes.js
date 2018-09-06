import Manage from "./components/manage/index";
import Home from "./components/Home";
import BookList from "./components/bookList/index";
import Classify from "./components/classify/index";
import News from "./components/news/index";
import Upload from "./components/upload/index";
import Comment from "./components/comment/index";
import Image from "./components/image/index";
import Kongbai from "./components/kongbai/index";
import User from "./components/user/index";

export const routes =[
    {path:'/',component:Home},
    {path:'/manage',component:Manage},
    {path:'/bookList',component:BookList},
    {path:'/image',component:Image},
    {path:'/user',component:User},
    {path:'/classify',component:Classify},
    {path:'/news',component:News},
    {path:'/upload',component:Upload},
    {path:'/kongbai',component:Kongbai},
    {path:'/comment/:id',component:Comment},
]