# Projet de Développement Web
*Groupe 3 :* Maxime DECLEMY - Enguerrand MARQUANT - Tom MULLIER - Paul SLOSSE

## Implémentations

### Répartition des tâches
Afin de mener à bien ce projet, nous avons du nous répartir les tâches à faire. L'ensemble du groupe ayant déjà été habitué à la répartition front/back, c'est naturellement que nous avons choisi cette répartition. Ainsi :
- sur le front : Paul et Tom
- sur le back : Maxime et Enguerrand

Cette séparation des tâches, au vu du projet rendu, semble avoir porté ses fruits. Nous sommes tous 4 fiers du résultat rendu, d'autant plus que React et Nest ainsi que la structure du code étaient nouveaux pour nous, tout en prenant en compte le temps imparti et les indisponibilités de chacun.

### En détail, d'un point de vue back :
Nous avons utilisé le framework Nest.js pour le côté back. 
Nous avons commencé par créer les entités de la base de données, les controller, presenter, dto, useCases pour chacunes des features (author, book, comment, genre). Nous avons défini les fonctionnalités pour chacunes de ces features (getAll, getById, create, update, delete). Nous avons également mis en place les tests unitaires et les tests d'intégration avec Jest. La documentation de l'api est également disponible grâce à Swagger.

### En détail, d'un point de vue front :
Nous avons utilisé Next.js pour le côté front et le framework Tailwind pour le CSS (ainsi que du CSS pure pour gagner en précision). 
Nous avons commencé par créer Le layout (layout.tsx) puis la base de chaque page. Nous avons ensuite développé les fonctionnalités de chaque page (comme les filtres, les modales, etc ...).
Afin de laisser le temps à l'équipe back-end de créer l'API, nous avons travaillé avec des données brutes en créant nous même les composants que l'on était censé récupérer de l'api lors des requêtes. Bien sûr, nous avons enlevé ces données brutes lors de la réunification avec le back.

### Réunion du front et du back :
Nous avons choisi de créer nos fonctionnalités sur des branches différentes et une fois créées dans chaque partie, nous avons assemblé le front et le back sur la branche main. Nous avons choisi cette organisation car nous travaillions sur 2 dossiers différents (library-api et library-site) et nous n'avons donc pas eu de conflits lors du merge des 2 parties. Il a juste fallu quelques adaptation pour les associer.

## Fonctionnalités

### Layout

Le layout est composé d'un menu avec les liens des différentes pages mais aussi d'un breadcrumb indiquant la page actuelle avec le "chemin" de navigation.
Ce layout est utilisé sur toutes les pages.

### Page d'accueil

Les horaires d'ouverture et de fermeture sont affichées en fonction du jour de la semaine.
Il y a plusieurs livre recommandés.

### Page Books

Sur la page Books, le nombre de livre total est affiché ainsi que la liste des livres.
Il est possible de filtrer les livres de plusieurs manières. En cherchant par titre, en triant par genres ou par auteur.
Il est possible de cliquer sur un livre pour accéder à sa page, mais aussi sur le nom d'un auteur pour accéder à sa page.
Un bouton permet de créer un nouveau livre à ajouter à la liste.

### Page Books/[:id]

Sur cette page, une "carte" du livre est affichée avec son titre, ses genres et son auteur (nom, prénom, photo). 
Il est possible de cliquer sur le nom de l'auteur pour accéder à sa page.
Un drawer accessible avec un bouton permet de lire et écrire des commentaires sur le livre.
Une modale de confirmation permet de supprimer le livre de la liste.

### Page Authors

La liste des auteurs est affichée sur la page et il est possible de filtrer les auteurs par nombre de livres écrits ou en cherchant par nom à l'aide de la barre de recherche.
Grâce à une modale, il est possible de créer un nouvel auteur.

### Page Authors/[:id]

On peut voir sur la page une "carte" de l'auteur avec son nom, son prénom, sa photo ainsi que la liste de ses livres.
Il est possible de cliquer sur les livres afin de se rendre sur leur page.
Il est possible d'ajouter ou de supprimer un livre de la liste de l'auteur.
Il est possible de créer ou supprimer un livre pour l'auteur
Il est possible de modifier les informations de l'auteur grâce à une modale.
Une bouton permet de supprimer l'auteur de la liste, une modale permet de confirmer ou annuler le choix. La suppression d'un auteur entraine la suppression de ses livres ainsi que les commentaires associés à ces derniers.

### Page Users

Nous n'avons pas eu le temps de créer cette page.

### Page Users/[:id]

Nous n'avons pas eu le temps de créer cette page.

## Auteurs

- [@MaximeDeclemy](https://github.com/MaximeDeclemy)

- [@EnguerrandMQT](https://github.com/EnguerrandMQT)

- [@TomMullier](https://github.com/TomMullier)

- [@paulslosse](https://github.com/paulslosse)

## Licence

[MIT](https://choosealicense.com/licenses/mit/)

