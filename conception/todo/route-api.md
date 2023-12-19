# Todo-List pour Routes API

## Gestion du Compte Utilisateur

### 1. Inscription Utilisateur

- [ ] Implémenter le point de terminaison `POST /api/register`.
- [ ] Valider les paramètres requis (email, password).
- [ ] Gérer les erreurs de validation.
- [ ] Gérer les réponses `201 Created` et `400 Bad Request`.

### 2. Profil Utilisateur Actuel

- [ ] Implémenter le point de terminaison `GET /api/me`.
- [ ] Gérer l'authentification de l'utilisateur.
- [ ] Gérer les réponses `200 OK` et `401 Unauthorized`.

### 3. Connexion / Déconnexion

- [ ] Implémenter le point de terminaison `POST /api/auth/login`.
- [ ] Implémenter le point de terminaison `POST /api/auth/logout`.
- [ ] Gérer les réponses `200 OK`, `401 Unauthorized`, et `204 No Content`.

## Gestion du Logement

### 4. Ajout des membres à la colocation

- [ ] Implémenter le point de terminaison `POST /api/colocation/{colocationID}/members`.
- [ ] Gérer les réponses `201 Created` et `404 Not Found`.

### 5. Supprimer des membres de la colocation

- [ ] Implémenter le point de terminaison `DELETE /api/colocation/{colocationID}/members/{userID}`.
- [ ] Gérer les réponses `204 No Content` et `404 Not Found`.

### 6. Changer l'Administrateur de la Colocation

- [ ] Implémenter le point de terminaison `PUT /api/colocation/{colocationID}/admin`.
- [ ] Gérer les réponses `200 OK`, `400 Bad Request`, et `404 Not Found`.

## Gestion des Tâches Ménagères

### 7. Création et Attribution de Tâches Ménagères

- [ ] Implémenter le point de terminaison `POST /api/colocation/{colocationID}/tasks`.
- [ ] Gérer les réponses `201 Created` et `400 Bad Request`.

### 8. Suivi de l'État d'Achèvement des Tâches

- [ ] Implémenter le point de terminaison `GET /api/colocation/{colocationID}/tasks`.
- [ ] Implémenter le point de terminaison `PUT /api/colocation/{colocationID}/tasks/{taskID}`.
- [ ] Gérer les réponses `200 OK` et `404 Not Found`.

#### 8.a Détails taches

- [ ] Implémenter le point de terminaison `GET /api/colocation/{colocationID}/tasks/{taskID}`.

## Gestion des Dépenses Communes

### 9. Gestion des Dépenses Communes

- [ ] Implémenter le point de terminaison `POST /api/colocation/{colocationID}/outgoings`.
- [ ] Gérer les réponses `201 Created` et `400 Bad Request`.

### 10. Liste des dépenses communes

- [ ] Implémenter le point de terminaison `GET /api/colocation/{colocationID}/outgoings`.
- [ ] Gérer les réponses `200 OK` et `404 Not Found`.

### 11. Calcul équitable des contributions financières

- [ ] Implémenter le point de terminaison `GET /api/expenses/{expenseID}/calculate`.
