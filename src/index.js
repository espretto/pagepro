import './styles/index.css'
import './tags/app.tag'
import { store, actions } from './store'

const main = document.body.appendChild(document.createElement('main'))

const app = riot.mount(main, 'app').pop()
