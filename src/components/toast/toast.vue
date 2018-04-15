<template>
    <transition name='fade'>
        <div class="toast"  v-show='visible' :class='position'>
            <div class="iconfont icon-duihao color-duihao"  v-if="type=='success'"></div>
            <div class="iconfont icon-guanbi color-cuowu"  v-if="type=='error'"></div>
            <div class="iconfont icon-i color-tanhao" v-if="type=='warning'"></div>
            <div class="iconfont icon-i color-tag" v-if="type=='info'"></div>
            <div class="text">{{message}}</div>
        </div>
    </transition>
</template>
<script>
    export default {
        data() {
            return {
                visible: false,
                message : '',
                position : '',
                type:'success'
            }
        }
    }
</script>

<style scoped>
    .toast .iconfont{
        font-size: 2rem;
        margin-right: 0.5rem;
    }
    .toast .text{
        flex: 1;
        font-size: 12px;
        margin-top: 0.3rem;
    }
    .color-duihao{
        color: rgb(21,182,85);
    }
    .color-cuowu{
        color: rgb(233,38,0);
    }
    .color-tanhao{
        color: rgb(255,135,0);
    }
    .color-tag{
        color: rgb(31,114,240);
    }
    .toast {
        position: fixed;
        left:50%;
        transform:translate(-50%,-50%) scale(1);
        word-wrap:break-word;
        padding: 0.5rem 1rem;
        text-align: center;
        z-index:99991;
        font-size:.3rem;
        max-width:80%;
        color: #fff;
        border-radius: 5px;
        background: rgba(0,0,0,0.7);
        overflow: hidden;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
    }
    .toast.middle{
        top:50%;
    }
    .toast.top{
        top:5%;
    }
    .toast.bottom{
        top:90%;
    }
    .fade-enter-active, .fade-leave-active {
        transition: transform .5s
    }
    .fade-enter, .fade-leave-active {
        transform:translate(-50%,-50%) scale(0);
    }
</style>