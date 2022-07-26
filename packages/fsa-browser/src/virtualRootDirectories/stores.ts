import { createStore } from 'idb-keyval'

const rootStore = function () {
  return createStore('fsa-browser', 'virtual-root-store')
}

export default rootStore
