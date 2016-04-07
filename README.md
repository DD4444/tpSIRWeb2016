# Patron d'architecture MVC appliquer au canvas HTML

## Le modèle

- Drawing : le dessin, représente le contenu du canvas. Il possède
    - une liste de formes : les formes qui vont être affichées dans le canvas
    - deux listes d'états de la liste de formes : ces piles vont permettre de restaurer l'état de la liste de forme à un moment donné (undo/redo)
- Form : la classe générale d'une forme. Elle possède
    - une épaisseur de trait
    - une couleur de trait
    - un style de trait
    - une couleur de remplissage
    - deux coordonnées initiales x et y
    - elle définit également des héritiers comme :
        - Rectangle : une forme de type rectangle! qui possède en sus des attributs de Form:
            - une longueur
            - une largeur
        - Line : une ligne qui possède:
            - des coordonnées de fin x2 et y2
        - Circle : un cercle qui possède :
            - un radius
        - Oval : une ellipse qui possède :
            - des coordonnées finales x2 et y2

## La vue

Comme précisé dans le sujet du tp, la vue est ici feintée par **l'ajout d'une fonction de dessin 'paint'** à chaque class de type Form.
On utilise les fonctions propres au contexte du canevas afin de dessiner les formes.

- Drawing : la fonction paint de la classe dessin permet d'ajouter une couleur de fond au canevas.
- Form : la fonction paint de la classe mère permet de définir
    - le style de trait
    - la couleur du trait
    - l'épaisseur du trait
    - la couleur de remplissage
- Rectangle : dessine un rectangle en prenant comme coin haut gauche les coordonnées de départ ainsi qu'une largeur et une longueur.
- Line : dessine une ligne depuis les coordonnées de départ jusqu'à celles d'arrivée.
- Circle : dessine un cercle inscrit dans un rectangle qui prend comme point haut gauche les coordonnées de départ et comme diamètre le minimum entre la largeur et la longueur du rectangle.
- Oval : dessine un oval inscrit dans un rectangle et qui forme deux courbes de bézier depuis le milieu du coté gauche jusqu'au milieu du coté droit et inversement.

## Le controleur

Le controleur est définit par une classe DnD et une classe Pencil.

Le DnD comprend :
- les coordonnées de départ
- les coordonnées de fin
- un booléen pour savoir si le clique dans le canevas est activé
- trois fonctions d'évènements liés au canevas :
    - onPress, quand on clique avec la souris dans le canevas, on initialise les coordonnées de départ avec la position de la souris et on appelle la fonction liée dans Pencil qui permet d'initialiser la forme qui va être dessinée.
    - onMove, quand on bouge la souris dans le canevas avec le clique maintenu, on initialise les coordonnées de fin avec la position de la souris et on appelle la fonction liée dans Pencil qui permet de mettre à jour la forme qui va être dessinée.
    - onEnd, lorsqu'on relache le clique on appelle la fonction liée dans Pencil qui permet de dessiner la forme dans le canevas.
- une liste d'objets javascript liés à des évènement sur une action spécifique :
    - au clique d'un bouton de form (rectangle, circle, ...), on appelle la fonction de mise à jour du type de forme dans Pencil
    - à la saisie du bouton de couleur de trait, on appelle la fonction de mise à jour de la couleur de trait dans Pencil
    - à la saisie du bouton de couleur remplissage, on appelle la fonction de mise à jour de la couleur de remplissage dans Pencil
    - au clique du bouton de transparence, on appelle la fonction de mise à jour de la couleur de remplissage dans Pencil
    - au changement du cadre de saisie de l'épaisseur du trait, on appelle la fonction de mise à jour de l'épaisseur du trait dans Pencil
    - au clique sur un item de la liste déroulante de style de trait, on appelle la fonction de mise à jour du style de trait dans Pencil
    - au clique du bouton d'annulation, on appelle la fonction d'annulation dans Pencil
    - au clique du bouton de contre-annulation, on appelle la fonction de contre-annulation dans Pencil
    - au clique d'un bouton de suppression de forme, on appelle la fonction de suppression d'une forme lié à un id dans Pencil

Le Pencil comprend donc :
- Le type de forme à dessiner
- L'épaisseur de trait
- La couleur de trait
- La couleur de remplissage effective
- La couleur de remplissage en attente
- Le style de trait  
Tous ces attributs sont modifiés par des actions via le DnD.
- La forme courante qui va être dessinée avec toutes les propriétés définies si dessus
