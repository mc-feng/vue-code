import User from "./components/users/index";
import Home from "./components/Home";
import Product from "./components/product/index";
import Classify from "./components/classify/index";
import News from "./components/news/index";
import Upload from "./components/upload/index";
import Comment from "./components/comment/index";

export const routes =[
    {path:'/',component:Home},
    {path:'/user',component:User},
    {path:'/product',component:Product},
    {path:'/classify',component:Classify},
    {path:'/news',component:News},
    {path:'/upload',component:Upload},
    {path:'/comment/:id',component:Comment},
]