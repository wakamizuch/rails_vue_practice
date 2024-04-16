import Vue from "vue";
import VueRouter from "vue-router";
import TopPage from "@/views/TopPage";
import SamplePage from "@/views/SamplePage";
import SignUp from "@/views/SignUp";
import SignIn from "@/views/SignIn";
import TaskPage from "@/views/TaskPage";
import MyPage from "@/views/MyPage";
import { START_LOCATION } from "vue-router";

Vue.use(VueRouter);

function denyDirectAccess(to, from, next) {
  console.log("呼ばれました");
  if (from === START_LOCATION) {
    // 直アクセスだった場合
    console.log("ダメらしいです");
    alert("直接アクセスはできません");
    next({ name: "TopPage" }); // '/hoge' へリダイレクトする
  }
  next();
}
const routes = [
  {
    path: "/",
    name: "TopPage",
    component: TopPage,
  },
  {
    path: "/sample",
    name: "SamplePage",
    component: SamplePage,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    beforeEnter: denyDirectAccess,
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
    beforeEnter: denyDirectAccess,
  },

  {
    path: "/tasks",
    name: "TaskPage",
    component: TaskPage,
    //beforeEnter: denyDirectAccess,
  },

  {
    path: "/my_page",
    name: "MyPage",
    component: MyPage,
    //beforeEnter: denyDirectAccess,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
