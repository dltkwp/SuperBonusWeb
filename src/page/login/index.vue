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
                    <input type="text" class="form-control" placeholder="请输入用户名" required="" v-model="phone" maxlength="11">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="请输入密码" required="" v-model="pwd" maxlength="20">
                </div>
                <button type="button" @click="loginSubmit" class="btn btn-primary block full-width m-b">登录</button>
                <router-link to="/v_forgetpwd"><small>忘记密码?</small></router-link>
            </form>
        </div>
    </div>
</template>

<script>
import regex from '../../util/regex';
import { mapActions , mapGetters} from 'vuex';
import * as types from '@/store/mutation-types.js';
import superConst from "../../util/super-const";
export default {
    data() {
        return {
            phone:'',
            pwd:''
        }
    },
    mounted(){
        let _this = this;
        _this.SHIFT_LOADING();
    },
    methods:{
        ...mapActions([types.LOADING.PUSH_LOADING,types.LOADING.SHIFT_LOADING]),
        loginSubmit: function (){
            let _this = this
            let phone = _this.phone.trim()
            let pwd = _this.pwd.trim()
            if(!regex.phone(phone)){
                _this.$toast.warning('用户名格式不正确');
                return false;
            }
            if(pwd==''){
                _this.$toast.warning('密码不可为空');
                return false;
            }

            _this.PUSH_LOADING();
            let param = [];
            param.push('username=' + phone);
            param.push('password=' + pwd);
            _this.$axios.post('login?' + param.join('&')).then((result)=> {
                var res = result.data;
                console.log(res);
                if(res.code){
                    _this.$toast.error(res.msg);
                }else{
                    localStorage.setItem(superConst.SUPER_TOKEN_KEY, JSON.stringify(res));
                    window.location.href = 'v_index';
                }
                _this.SHIFT_LOADING();
            }).catch((err) => {
                _this.SHIFT_LOADING();
            });
        }
    }
}
</script>

<style>
    body {
        background-color: #f3f3f4;
    }
</style>
