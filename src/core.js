
import { store, actions } from './store'
import headers from './http/headers'
import htmlmin from './htmlmin'
import jQuery from 'jquery'

const extend = Object.assign

const create = Object.create

const Base = {

  constructor () {
    // pass
  },
  
  create () {
    var instance = create(this)
    this.constructor.apply(instance, arguments)
    return instance
  },

  derive (proto) {
    return extend(create(this), proto)
  }

}

const Queue = Base.derive({

  constructor (consumer, limit) {
    this.items = []
    this.count = 0
    this.limit = limit
    this.consumer = consumer
    this.dequeue = this.dequeue.bind(this)
  },

  dequeue () {
    if (this.items.length) {
      this.consumer(this.items.shift()).then(this.dequeue)
    }
    else {
      this.count -= 1
    }
  },

  put (item) {
    if (this.count < this.limit) {
      this.count += 1
      this.consumer(item).then(this.dequeue)
    }
    else {
      this.items.push(item)
    }
  }

})

/* -----------------------------------------------------------------------------
 * consts and config
 */
const EMPTY_ARRAY = []

const TAG_ATTR_MAP = {
  A: ['href'],
  AREA: ['src'],
  AUDIO: ['src'],
  BUTTON: ['src', 'formaction'],
  EMBED: ['src'],
  FORM: ['action'],
  FRAME: ['src'],
  IFRAME: ['src'],
  IMG: ['src', 'longdesc'],
  INPUT: ['src', 'formaction'],
  LINK: ['href'],
  OBJECT: ['archive', 'codebase', 'data'],
  SCRIPT: ['src'],
  SOURCE: ['src'],
  TRACK: ['src'],
  VIDEO: ['src', 'poster']
}

const READY_STATES = {
  loading: false,
  interactive: true,
  complete: true
}

const ON_READY_STATE_CHANGE = 'onreadystatechange'

const AJAX_PEEK_OPTIONS = {
  method: 'HEAD',
  timeout: 5000,
  beforeSend (xhr, options) {
    xhr.options = options
  },
  success (res, status, xhr) {
    this.addResourceHead(xhr)
  },
  error (xhr, status, err) {
    this.addResourceHead(xhr)
  }
}

/* -----------------------------------------------------------------------------
 * helpers
 */
function nextNode (node) {
  var next = node.firstChild

  if (!next) {
    while (
      (next = node.nextSibling) === null &&
      (node = node.parentNode)
    );
  }

  return next
}

function getResponseHeaders (xhr) {
  var fields = {}

  headers.forEach(header => {
    var value = xhr.getResponseHeader(header)
    if (value) fields[header] = value
  })

  return fields
}

function attempt (func, ...args) {
  try {
    return func.apply(null, args)
  }
  catch (err) {
    return err
  }
}

function type (any) {
  var typo = typeof any;

  return typo !== 'object' ? typo :
         any === null      ? 'null' :
         Object.prototype.toString.call(any).slice(8, -1).toLowerCase()
}

/* -----------------------------------------------------------------------------
 * core
 */

export const Crawler = Base.derive({

  constructor (window) {
    this.window = window
    this.domain = [window.location.protocol, window.location.host].join('//')
    this.alink = window.document.createElement('A')
    this.peekQueue = Queue.create(jQuery.ajax, 4)
    this.pageQueue = Queue.create(url => this.load(url).then(() => {
      this.alink = window.document.createElement('A');
      this.hydrate()
    }), 1)
    this.resources = []
    this.urls = new Set()
  },

  setLocation (url) {
    const window = this.window

    this.window.location = url

    return new Promise((resolve, reject) => {
      var doneJob, failJob

      failJob = setTimeout(function () {
        clearTimeout(doneJob)
        reject()
      }, 1e4)

      ;(function poll () {
        if (window.location.href === url) {
          clearTimeout(failJob)
          resolve()
        }
        else {
          doneJob = setTimeout(poll, 1e2)
        }
      }())
    })
  },

  awaitDocument () {
    return new Promise(resolve => {
      var window = this.window

      ;(function poll () {
        if (READY_STATES[window.document.readyState]) {
          resolve()
        }
        else {
          setTimeout(poll, 50)
        }
      }())
    })
  },

  load (url) {
    return this.setLocation(url)
      .then(() => this.awaitDocument())
      .catch(err => console.error(err))
  },

  hydrate () {
    var root = this.window.document.documentElement
      , node = root
    
    while (node = nextNode(node)) {
      var attrs = TAG_ATTR_MAP[node.nodeName] || EMPTY_ARRAY

      // JIT: roll out loop
      switch (attrs.length) {
        case 3: this.addResource(node.getAttribute(attrs[2]))
        case 2: this.addResource(node.getAttribute(attrs[1]))
        case 1: this.addResource(node.getAttribute(attrs[0]))
      }
    }
    
    var html = root.outerHTML
    var minified = htmlmin(html)
    var ratio = minified.length / html.length
    console.log(this.window.location.href, ':', 'html-ratio', ':', ratio.toFixed(2) + '%')
  },

  addResource (url) {
    if (!url) return

    // normalize url
    this.alink.href = url
    url = this.alink.href
    var i = url.search(/[#?]/)
    if (i > -1) url = url.substring(0, i)
    
    // unique filter
    if (this.urls.has(url)) return
    this.urls.add(url)
    
    // head request same domain resources
    if (url.startsWith(this.domain)) {
      this.peekQueue.put(extend({ url, context: this }, AJAX_PEEK_OPTIONS))
    }
    else {
      this.resources.push({ url })
    }
  },

  addResourceHead (xhr) {
    var resource = {
      url: xhr.options.url,
      status: xhr.status,
      headers: getResponseHeaders(xhr)
    }

    this.resources.push(resource)

    if (
      resource.status >= 200 &&
      resource.status < 400 &&
      resource.headers &&
      resource.headers['Content-Type'] &&
      resource.headers['Content-Type'].indexOf('html') > -1
    ) {
      this.pageQueue.put(resource.url)
    }
  }

})

/*
const requests = new Queue(jQuery.ajax, 4)

const urls = new Set()

export function crawl (window) {
  var document = window.document
  var location = window.location
  var home = [location.protocol, location.hostname].join('//');
  var alink = document.createElement('A')
  var node = document.documentElement

  function add (attr) {
    var url = node.getAttribute(attr)
    
    if (url) {
      alink.href = url
      url = alink.href

      if (url.indexOf(home) === 0) {
        
        var i = url.search(/[#?]/)
        if (i > -1) {
          url = url.substring(0, i)
        }

        if (!urls.has(url)) {
          urls.add(url)

          requests.put({
            url,
            method: 'HEAD',
            timeout: 5000,
            success (data, status, xhr) {
              console.log('visited:', url)
            },
            error (xhr, status, err) {
              console.log('failed:', url)
            }
          })  
        }
      }
    }
  }

  while (node = next(node)) {
    (TAG_ATTR_MAP[node.nodeName] || EMPTY_ARRAY).forEach(add)
  }
}
*/
