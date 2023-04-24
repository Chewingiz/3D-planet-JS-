# Planet_3D_JS
J'ai implémenté une scène 3D avec une planète et des bâtiments. J'ai 'ai appliqué un effet de tracé à la forme et utilisé le shader "toon" pour donner un style cartoon à ma scène. J'ai également ajouté des animations aux bâtiments pour leur donner vie et rendu l'atmosphère de la planète plus réaliste en ajoutant des effets de lumière.

 ## Comment lancer la page web avec un serveur Python?

Pour lancer la page web, vous devez d'abord vous assurer que Python est installé sur votre ordinateur. Si ce n'est pas le cas, vous pouvez le télécharger et l'installer depuis le site officiel de Python.

Ensuite, ouvrez une invite de commande ou un terminal et accédez au répertoire racine du projet contenant la page web et les fichiers JavaScript. À partir de là, vous pouvez lancer un serveur Python en utilisant la commande suivante :
````
python -m http.server
````

Cela va lancer un serveur HTTP local sur le port 8000 par défaut. Si vous souhaitez utiliser un port différent, vous pouvez spécifier le numéro de port à la fin de la commande, par exemple :
```
python -m http.server 8080
```

Une fois le serveur lancé, vous pouvez accéder à la page web en ouvrant votre navigateur et en saisissant l'adresse suivante dans la barre d'adresse :

```

http://localhost:8000
```
Cela va ouvrir une page web dans le navigateur, lancez "base.html", et le JavaScript contenu dans les fichiers sera exécuté.
## Images
![Image planète](image.gif)
## Bibliothèques utilisées

    Three.js : une bibliothèque JavaScript pour créer des animations et des rendus en 3D dans le navigateur
