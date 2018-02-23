
<app>
  <h1>{shared.title}</h1>

  <button onclick={crawl}>crawl</button>

  <ul>
    <li each={resource in shared.resources}>{resource.url}</li>
  </ul>

  <ul>
    <li each={page in shared.pages}>{page.url}</li>
  </ul>

  <script>
    import { store, actions } from '../store'
    import { Crawler } from '../core'

    // add the opener
    this.on('mount', function () {
      store.dispatch(actions.addPage(opener.location.href))
    })

    // retrieve initial state
    this.shared = store.getState()

    // subscribe to state changes
    store.subscribe(() => {
      this.shared = store.getState()
      this.update()
    })

    this.crawl = function () {
      window.tab = Crawler.create(opener)
      
      tab.hydrate()
    }

  </script>
</app>

