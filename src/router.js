import * as VueRouter from "vue-router";
import MainPage from "./pages/MainPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import PostInfoPage from "./pages/PostInfoPage.vue";
import PostEditPage from "./pages/PostEditPage.vue";

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    {
      name: "login",
      path: "/",
      component: LoginPage,
    },
    {
      name: "mainpage",
      path: "/clientmain",
      component: MainPage,
    },
    {
      name: "postinfo",
      path: "/postinfo",
      component: PostInfoPage,
    },
    {
      name: "postedit",
      path: "/postedit",
      component: PostEditPage,
    },
  ],
});

export default router;
