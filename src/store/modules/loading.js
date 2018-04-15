import * as types from '../mutation-types'

const state = {
  loadingList: []
}

const mutations = {
  [types.LOADING.PUSH_LOADING] (state, playload) {
    state.loadingList.push({text: playload || '玩命加载中...'})
  },
  [types.LOADING.SHIFT_LOADING] (state) {
    state.loadingList.shift()
  }
}

const getters = {
  [types.LOADING.IS_LOADING]: state => state.loadingList.length > 0,
  [types.LOADING.LOADING_TEXT]: state => state.loadingList.length > 0 ? state.loadingList[0].text : ''
}

const actions = {
  [types.LOADING.PUSH_LOADING] (contaxt, playload) {
    contaxt.commit(types.LOADING.PUSH_LOADING, playload)
  },
  [types.LOADING.SHIFT_LOADING] (contaxt) {
    contaxt.commit(types.LOADING.SHIFT_LOADING)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
