import Vue from 'vue'
import CToast from '@/components/toast/toast.vue';
const ToastConstructor = Vue.extend(CToast)

let removeDom = event => {
    event.target.parentNode.removeChild(event.target)
}

ToastConstructor.prototype.close = function() {
    this.visible = false
    this.$el.addEventListener('transitionend', removeDom)
}
const Toast = (options = {}) => {
    var instance = new ToastConstructor().$mount(document.createElement('div'))

    let duration = options.duration || 2500

    instance.message = typeof options === 'string' ? options : options.message

    instance.position = options.position || 'top'

    instance.type = options.type || 'success'

    document.body.appendChild(instance.$el)

    instance.visible = true

    Vue.nextTick(() => {
        instance.timer = setTimeout(function() {
            instance.close()
        }, duration)
    })
    return instance
}

export default {
    install: function(Vue, name = 'Toast') {
        Toast.info = (message, position) => {
            Toast({ message: message, position: (position || 'top'), type: 'info' })
        }
        Toast.success = (message, position) => {
            Toast({ message: message, position: (position || 'top'), type: 'success' })
        }
        Toast.warning = (message, position) => {
            Toast({ message: message, position: (position || 'top'), type: 'warning' })
        }
        Toast.error = (message, position) => {
            Toast({ message: message, position: (position || 'top'), type: 'error' })
        }
        Object.defineProperty(Vue.prototype, '$toast', { value: Toast })
    }
}