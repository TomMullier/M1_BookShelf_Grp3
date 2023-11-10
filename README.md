# Projet de Développement Web
*Groupe 3 :* Maxime DECLEMY - Enguerrand MARQUANT - Tom MULLIER - Paul SLOSSE

## Implémentations

### Répartition des tâches
Afin de mener à bien ce projet, nous avons du nous répartir les tâches à faire. L'ensemble du groupe ayant déjà été habitué à la répartition front/back, c'est naturellement que nous avons choisi cette répartition. Ainsi :
- sur le front : Paul et Tom
- sur le back : Maxime et Enguerrand

Cette séparation des tâches, au vu du projet rendu, semble avoir porté ses fruits. Nous sommes tous 4 fiers du résultat rendu, d'autant plus que React et Nest ainsi que toute la structure étaient nouveaux pour nous, tout en prenant en compte le temps imparti et les indisponibilités de chacun.

### En détail, d'un point de vue back :


### En détail, d'un point de vue front :


## Fonctionnalités

### Layout

Le layout est composé d'un menu avec les liens des différentes pages mais aussi d'un breadcrumb indiquant la page actuelle avec le "chemin" de navigation.
Ce layout est utilisé sur toutes les pages.

### Page d'accueil

Les horaires d'ouverture et de fermeture sont affichés en fonction du jour de la semaine.
Il y a plusieurs livre recommandés.

### Page Books

La page est composée de X parties. Le nombre de livre total est affiché ainsi que la liste des livres.
Il est possible de filtrer les livres de plusieurs manières. En cherchant par titre, en triant par genres ou par auteur.
Il est possible de cliquer sur un livre pour accéder à sa page, mais aussi sur le nom d'un auteur pour accéder à sa page.
Un bouton permet de créer un nouveau livre à ajouter à la liste.

### Page Books/[:id]

La page est composée de X parties. Une "carte" du livre est affiché avec son titre, ses genres et son auteur (nom, prénom, photo). 
Il est possible de cliquer sur le nom de l'auteur pour accéder à sa page.
Un drawer accessible avec un bouton permet de lire et écrire des commentaires sur le livre.
Une modale de confirmation permet de supprimer le livre de la liste.

### Page Authors

La page est composé de X parties. La liste des auteurs est affichée et il est possible de filtrer les auteurs par nombre de livres écrits ou en cherchant par nom à l'aide de la barre de recherche.
Grâce à une modale, il est possible de créer un nouvel auteur.

### Page Authors/[:id]

La page est composée de X parties. Une "carte" de l'auteur est affichée avec son nom, son prénom, sa photo ainsi que la liste de ses livres.
Il est possible de cliquer sur les livres afin de se rendre sur leur page.
Il est possible d'ajouter ou de supprimer un livre de la liste de l'auteur.
Il est possible de créer ou supprimer un livre pour l'auteur
Il est possible de modifier les informations de l'auteur grâce à une modale.
Une bouton permet de supprimer l'auteur de la liste, une modale permet de confirmer ou annuler le choix.

### Page Users

Nous n'avons pas eu le temps de créer cette page.

### Page Users/[:id]

Nous n'avons pas eu le temps de créer cette page.

## Authors

- [@MaximeDeclemy](https://github.com/MaximeDeclemy)

- [@EnguerrandMQT](https://github.com/EnguerrandMQT)

- [@TomMullier](https://github.com/TomMullier)

- [@paulslosse](https://github.com/paulslosse)

## License

[MIT](https://choosealicense.com/licenses/mit/)

