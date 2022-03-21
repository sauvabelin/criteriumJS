# criteriumJS

Un petit système permettant de gérer un criterium à la brigade de Sauvabelin.

## Particularités

Une web app complète, s'appuie sur alasql pour bénéficier d'une API SQL locale en navigateur, ce qui offre l'immense avantage de pouvoir setup un ServiceWorker très agressif au niveau du cache et donc de télécharger la totalité de l'application au premier accès.

## Technologies
- alasql
- vue (vuex, vue-router)
- ant-design-vue
- handsontable

## Lancer le truc en local

Pour lancer l'application en local, clonez le repo puis exécutez dans l'ordre
```
npm install
npm run serve
```

## Déploiement

Rien de particulier à faire, une github action va automatiquement build et upload l'application en ftp sur hostpoint.
