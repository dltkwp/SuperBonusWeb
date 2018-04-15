<template>
  <div class="middle-box text-center loginscreen animated fadeInDown">
        <div>
            <div>
                <div class="logo-red-xlg"></div>
            </div>
            <h3>立即登录</h3>
            <p>请输入用户名及密码进行登录</p>
            <form class="m-t" role="form" action="index.html">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="请输入用户名" required="">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="请输入密码" required="">
                </div>
                <button type="submit" class="btn btn-primary block full-width m-b">登录</button>

                <router-link to="/v_forgetpwd"><small>忘记密码?</small></router-link>

                <!-- <a class="btn btn-sm btn-white btn-block m-t-lg" href="register.html">立即注册</a> -->
            </form>

        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
