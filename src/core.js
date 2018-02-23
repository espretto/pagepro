
import { store, actions } from './store'
import headers from './http/headers'
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
      var item, resolve, reject = this.items.shift()
        , whenConsumed = this.consumer(item)

      whenConsumed.then(this.dequeue, this.dequeue)
      whenConsumed.then(resolve, reject)
    }
    else {
      this.count -= 1
    }
  },

  put (item) {
    return new Promise((resolve, reject) => {
      if (this.count < this.limit) {
        this.count += 1
        var whenConsumed = this.consumer(item)
        whenConsumed.then(this.dequeue, this.dequeue)
        whenConsumed.then(resolve, reject)
      }
      else {
        this.items.push( [item, resolve, reject] )
      }  
    })
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

const headquest = {
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

export const Crawler = Base.derive({

  constructor (window) {
    this.window = window
    this.domain = [window.location.protocol, window.location.host].join('//')
    this.alink = window.document.createElement('A')
    this.requeue = Queue.create(jQuery.ajax, 4)
    this.resources = []
    this.urls = new Set()
  },

  load (url) {
    var that = this
    
    this.window.location = url

    return new Promise(resolve => {
      (function poll (){
        if (that.window.location.href === url && that.window.document.body) {

          // update link normalizer
          that.alink = that.window.document.createElement('A')
          
          resolve(that)
        }
        else {
          setTimeout(poll, 64)
        }
      }())
    })
  },

  hydrate () {
    var node = this.window.document.documentElement
    
    while (node = nextNode(node)) {
      var attrs = TAG_ATTR_MAP[node.nodeName] || EMPTY_ARRAY

      // JIT: roll out loop
      switch (attrs.length) {
        case 3: this.addResource(node.getAttribute(attrs[2]))
        case 2: this.addResource(node.getAttribute(attrs[1]))
        case 1: this.addResource(node.getAttribute(attrs[0]))
      }
    }
    /*
    Array.of(this.window.document.styleSheets).forEach(sheet => {
      
      var href = attempt(sheet => sheet.href, sheet)

      if (href) {
        if (type(href) === 'error' || href.indexOf(this.domain) !== 0) {
          requeue.put()
        }
        else {
          requeue.put()
        }
      }
      else {
        sheet.cssText || sheet.ownerNode.innerHTML
      }

    })
    */


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
      this.requeue.put(extend({ url, context: this }, headquest)).then()
    }
    else {
      this.resources.push({ url })
    }
  },

  addResourceHead (xhr) {
    this.resources.push({
      url: xhr.options.url,
      status: xhr.status,
      headers: getResponseHeaders(xhr)
    })
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
