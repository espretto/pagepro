
import { createStore } from 'redux'

/* -----------------------------------------------------------------------------
 * consts and config
 */
const initial = {
  title: 'It\'s alive!',
  pages: [],
  resources: []
}

const home = [location.protocol, location.host].join('//')

/* -----------------------------------------------------------------------------
 * helpers
 */
function renew (state, update) {
  return Object.assign({}, state, update)
}

/* -----------------------------------------------------------------------------
 * actions
 */
const actions = {

  addPage (url) {
    return url
  },

  addResource (url) {
    return url
  }

}

Object.keys(actions).forEach(type => {
  const action = actions[type]
  actions[type] = data => { return { type: type, data: action(data) } }
})

/* -----------------------------------------------------------------------------
 * reducers
 */
const reducers = {

  default (state) {
    return state
  },

  addPage (state, url) {
    state.pages.push({ url })
    return renew(state)
  },

  addResource (state, url) {

    // http[s] only
    if (url.indexOf('http') === 0) {
    
      // strip query and hash
      var i = url.search(/[#?]/)
      if (i > -1) {
        url = url.substring(0, i)
      }
      
      // filter unique
      if (!state.resources.find(res => res.url === url)) {
        state.resources.push({ url })
        return renew(state)
      }
    }

    return state
  }

}

/* -----------------------------------------------------------------------------
 * store
 */
const store = createStore((state=initial, action) =>
  (reducers[action.type] || reducers.default)(state, action.data)
)

export { actions, store }
