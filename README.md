
PagePro
---
Le robot peut être injecté sur tout site-web à l'aide d'un _bookmarklet_, un marque-page fonctionnel. Pour ce faire, mettez le script à disposition comme suit :
```
# install dependencies
npm install

# bundle scripts to ./build/bundle.js
npm run build

# serve bundle (alt : python2 -m SimpleHTTPServer 8192)
python -m http.server -b 127.0.0.1 8192
```
Le robot est disponible sous l'URL http://localhost:8192/build/bundle.js. Ci-dessous, le code pour l'injecter sur un site-web.
```js
const url = 'http://localhost:8192/build/bundle.js'
const doc = window.open().document
doc.write(`<script defer src="${url}"></script>`)
doc.close()
```
Pour l'avoir à porter d'un clic, créer un marque-page avec l'URL ci-dessous. :
```
javascript:(function()%7Bthis.document.write(%22%3Cscript%20defer%20src%3D'http%3A%2F%2Flocalhost%3A8192%2Fbuild%2Fbundle.js'%3E%3C%2Fscript%3E%22)%3Bthis.document.close()%7D).call(window.open())
```
Aller sur un site web quelconque, puis cliquer sur le marque-page. Le script ainsi exécuté, ouvrira un onglet qu'il prend pour base de control. Ouvrir les outils de développement, puis lancer l'application en cliquant sur le bouton `crawl`. Inspecter les onglets `Network`, la `Console`  et la variable globale `tab` afin de suivre et analyser les meta-données des toutes les resources du site.

notes
---
Ce projet est basé sur `https://github.com/wbkd/riotjs-startkit.git`.
