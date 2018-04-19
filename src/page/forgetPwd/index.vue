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
                    <input type="text" class="form-control" placeholder="手机号" required="" maxlength="11" v-model="phone">
                </div>
                <div class="form-group">
                    <div class="row">
                        <div class="col-md-6">
                            <input type="text" class="form-control" placeholder="验证码" required="" maxlength="8" v-model="smsCode">
                        </div>
                        <div class="col-md-6">
                            <div @click="getSmsCode" class="btn btn-block btn-default">{{smsTip}}</div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="新密码" required="" maxlength="20" v-model="newPwd">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="再次输入新密码" required="" maxlength="20" v-model="replPwd">
                </div>
                <button type="button" @click="updatePwd" class="btn btn-primary block full-width m-b">修改密码</button>
            </form>
        </div>
    </div>
</template>

<script>
let timer = null;

import regex from '../../util/regex';
import { mapActions , mapGetters} from 'vuex';
import * as types from '@/store/mutation-types.js';
import superConst from "../../util/super-const";

export default {
    data(){
        return {
            phone:'',
            smsCode:'',
            newPwd:'',
            replPwd:'',
            isActiveSms: false,
            totalInterval: 60,
            smsTip: '获取验证码',
            interval: 1000
        }
    },
    methods:{
        ...mapActions([types.LOADING.PUSH_LOADING,types.LOADING.SHIFT_LOADING]),
        startTimer: function (){
            let _this = this;
            if(!timer){
                timer = window.setInterval(function(){
                    let curCnt = _this.totalInterval - 1;
                    if (_this.totalInterval != 0) {
                        _this.isActive = true;
                        _this.totalInterval = curCnt;
                        _this.smsTip = curCnt + 's后重新获取';
                    } else {
                        _this.isActive = false;
                        _this.smsTip = '获取验证码';
                        _this.totalInterval = 60;
                        if (timer) {
                            window.clearInterval(timer);
                            timer = null;
                        }
                    }
                },_this.interval);
            }
        },
        getSmsCode: function (){
            let _this = this;
            let phone = _this.phone.trim();
            if(!regex.phone(phone)){
                _this.$toast.warning('手机号格式不正确');
                return false;
            }
            
            _this.PUSH_LOADING();
            _this.$axios.post('sms/send?phone=' + phone).then((result)=> {
                var res = result.data;
                if(res.code&&res.code>0){
                    _this.$toast.error(res.msg);
                }else{
                    _this.$toast.success('验证码发送成功');
                    _this.startTimer();
                }
                _this.SHIFT_LOADING();
            }).catch((err) => {
                _this.SHIFT_LOADING();
            });
        },
        updatePwd: function(){
            let _this = this;
            let phone = _this.phone.trim();
            let smsCode = _this.smsCode.trim();
            let newPwd = _this.newPwd.trim();
            let replPwd = _this.replPwd.trim();

            if(!regex.phone(phone)){
                _this.$toast.warning('手机号格式不正确');
                return false;
            }
            if(smsCode==''){
                _this.$toast.warning('验证码不可为空');
                return false;
            }
            if(!regex.pwd(newPwd)){
                _this.$toast.warning('新密码格式不正确');
                return false;
            }
            if(!regex.pwd(replPwd)){
                _this.$toast.warning('再次输入新密码格式不正确');
                return false;
            }
            if(newPwd!=replPwd){
                _this.$toast.warning('两次输入的密码不一致');
                return false;
            }

            _this.PUSH_LOADING();
            let param = [];
            param.push('phone=' + phone);
            param.push('checkCode=' + smsCode);
            param.push('password=' + newPwd);
            param.push('password2=' + replPwd);
            _this.$axios.post('forget?' + param.join('&')).then((result)=> {
                var res = result.data;
                if(res.code&&res.code>0){
                    _this.$toast.error(res.msg);
                }else{
                    _this.$toast.success('修改密码成功');
                    localStorage.setItem(superConst.SUPER_TOKEN_KEY,'');
                    window.location.href = '/v_login';
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
