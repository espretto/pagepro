
Lancer le robot
---

Créer un marque-page avec le contenu suivant :
```
javascript:(function()%7Bthis.document.write(%22%3Cscript%20defer%20src%3D'http%3A%2F%2Flocalhost%3A4000%2Fbundle.js'%3E%3C%2Fscript%3E%22)%3Bthis.document.close()%7D).call(window.open())
```

Installer les dependences et lancer le serveur :
```
npm install
npm run dev
```

Aller sur un site web quelconque, puis cliquer sur le marque-page. Le script ainsi exécuté, ouvrira un onglet qu'il prend pour base de control. Ouvrir les outils de développement, puis lancer l'application en cliquant sur le bouton `crawl`. Inspecter les onglets `Network`, la `Console`  et la variable globale `tab` afin de suivre et analyser les meta-données des toutes les resources du site.

notes
---
Ce projet est basé sur `https://github.com/wbkd/riotjs-startkit.git`.
