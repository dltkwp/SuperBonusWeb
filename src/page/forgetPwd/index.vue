<template>
    <div class="middle-box text-center loginscreen   animated fadeInDown">
        <div>
            <div>
                <div class="logo-red-xlg"></div>
            </div>
            <h3>忘记密码</h3>
            <p>请通过手机验证码重新设置</p>
            <form class="m-t" role="form" action="login.html">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="手机号" required="">
                </div>
                <div class="form-group">
                    <div class="row">
                        <div class="col-md-6">
                            <input type="text" class="form-control" placeholder="验证码" required="">
                        </div>
                        <div class="col-md-6">
                            <div class="btn btn-block btn-default">发送验证码</div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="新密码" required="">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="再次输入新密码" required="">
                </div>
                <button type="submit" class="btn btn-primary block full-width m-b">立即注册</button>
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
