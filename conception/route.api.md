# Routes API
## Gestion du Compte Utilisateur

### 1. Inscription Utilisateur

- **Endpoint**: `POST /api/register`
- **Description**: Permet à un utilisateur de créer un compte en fournissant les informations nécessaires.
- **Paramètres**:
  - `email` (string): Adresse e-mail unique de l'utilisateur.
  - `password` (string): Mot de passe sécurisé choisi par l'utilisateur.
  - `firstName` (string, optionnel): Prénom de l'utilisateur.
  - `lastName` (string, optionnel): Nom de famille de l'utilisateur.
  - `birthdate` (string, optionnel): Date de naissance de l'utilisateur au format YYYY-MM-DD.
- **Réponse**:
  - 201 Created: Compte utilisateur créé avec succès.
  - 400 Bad Request: En cas d'erreurs de validation (e.g., e-mail déjà existant).

### 2. Profil Utilisateur Actuel

- **Endpoint**: `GET /api/me`
- **Description**: Récupère les informations du profil de l'utilisateur connecté.
- **Réponse**:
  - 200 OK: Renvoie les détails du profil de l'utilisateur.
  - 401 Unauthorized: Si l'utilisateur n'est pas authentifié.

### 3. Connexion / Déconnexion

- **Endpoint (Connexion)**: `POST /api/auth/login`
- **Description**: Permet à l'utilisateur de se connecter avec son adresse e-mail et son mot de passe.
- **Paramètres**:
  - `email` (string): Adresse e-mail de l'utilisateur.
  - `password` (string): Mot de passe de l'utilisateur.
- **Réponse**:
  - 200 OK: Authentification réussie, renvoie le token JWT.
  - 401 Unauthorized: En cas d'échec de l'authentification.

- **Endpoint (Déconnexion)**: `POST /api/auth/logout`
- **Description**: Déconnecte l'utilisateur en invalidant le token JWT.
- **Réponse**:
  - 204 No Content: Déconnexion réussie.

## Gestion du Logement

### 4. Ajout des membres à la colocation

- **Endpoint**: `POST /api/housing/{housingID}/members`
- **Description**: Ajoute un membre à la colocation spécifiée.
- **Paramètres**:
  - `housingID` (string): Identifiant unique du logement.
  - `userID` (string): Identifiant unique de l'utilisateur à ajouter.
- **Réponse**:
  - 201 Created: Membre ajouté avec succès.
  - 404 Not Found: Si le logement n'est pas trouvé.

### 5. Supprimer des membres de la colocation

- **Endpoint**: `DELETE /api/housing/{housingID}/members/{userID}`
- **Description**: Supprime un membre de la colocation spécifiée.
- **Paramètres**:
  - `housingID` (string): Identifiant unique du logement.
  - `userID` (string): Identifiant unique de l'utilisateur à supprimer.
- **Réponse**:
  - 204 No Content: Membre supprimé avec succès.
  - 404 Not Found: Si le logement ou l'utilisateur n'est pas trouvé.

### 6. Changer l'Administrateur de la Colocation

- **Endpoint**: `PUT /api/housing/{housingID}/admin`
- **Description**: Permet de changer l'administrateur de la colocation spécifiée.
- **Paramètres**:
  - `housingID` (string): Identifiant unique du logement.
  - `newAdminID` (string): Identifiant unique du nouvel administrateur.
- **Réponse**:
  - 200 OK: L'administrateur de la colocation a été changé avec succès.
  - 400 Bad Request: En cas d'erreurs de validation.
  - 404 Not Found: Si le logement ou le nouvel administrateur n'est pas trouvé.

## Gestion des Tâches Ménagères

### 7. Création et Attribution de Tâches Ménagères

- **Endpoint**: `POST /api/tasks`
- **Description**: Crée une nouvelle tâche ménagère et l'attribue à un utilisateur spécifié.
- **Paramètres**:
  - `description` (string): Description de la tâche.
  - `assignedTo` (string): Identifiant unique de l'utilisateur auquel la tâche est attribuée.
- **Réponse**:
  - 201 Created: Tâche créée avec succès.
  - 400 Bad Request: En cas d'erreurs de validation.

### 8. Suivi de l'État d'Achèvement des Tâches

- **Endpoint (Liste des tâches)**: `GET /api/tasks`
- **Description**: Récupère la liste des tâches ménagères.
- **Réponse**:
  - 200 OK: Renvoie la liste des tâches avec leur état d'achèvement.
  - 404 Not Found: Si aucune tâche n'est trouvée.

- **Endpoint (Marquer une tâche comme terminée)**: `PUT /api/tasks/{taskID}/complete`
- **Description**: Marque une tâche spécifiée comme terminée.
- **Paramètres**:
  - `taskID` (string): Identifiant unique de la tâche.
- **Réponse**:
  - 200 OK: Tâche marquée comme terminée avec succès.
  - 404 Not Found: Si la tâche n'est pas trouvée.

## Gestion des Dépenses Communes

### 9. Gestion des Dépenses Communes

- **Endpoint (Création d'une dépense commune)**: `POST /api/expenses`
- **Description**: Crée une nouvelle dépense commune.
- **Paramètres**:
  - `description` (string): Description de la dépense.
  - `amount` (number): Montant de la dépense.
- **Réponse**:
  - 201 Created: Dépense créée avec succès.
  - 400 Bad Request: En cas d'erreurs de validation.

- **Endpoint (Liste des dépenses communes)**: `GET /api/expenses`
- **Description**: Récupère la liste des dépenses communes.
- **Réponse**:
  - 200 OK: Renvoie la liste des dépenses avec leurs détails.
  - 404 Not Found: Si aucune dépense n'est trouvée.

- **Endpoint (Calcul équitable des contributions financières)**: `GET /api/expenses/{expenseID}/calculate`
- **Description**: Calcule la contribution financière équitable des membres pour une dépense spécifiée.
- **Paramètres**:
  - `expenseID` (string): Identifiant unique de la dépense.
- **Réponse**:
  - 200 OK: Renvoie les détails du calcul des contributions.
  - 404 Not Found: Si la dépense n'est pas trouvée.
