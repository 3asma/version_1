# Guide de Déploiement et d'Exploitation - Application CPLI

Ce document fournit les instructions étape par étape pour installer, démarrer, mettre à jour et administrer l'application **CPLI (Formation Management System)** sur un serveur hôte dédié en réseau privé à l'aide de **Docker** et **Docker Compose**.

---

## 1. Prérequis sur le Serveur Hôte

Avant de commencer le déploiement, assurez-vous que le serveur hôte (Linux, Windows Server ou MacOS) dispose de :

1. **Docker Engine** (version 20.10+)
2. **Docker Compose Plugin** (version 2.0+)
3. L'ouverture des ports suivants sur le firewall du serveur :
   - **Port 80** : Accès HTTP des utilisateurs du réseau au Frontend.
   - **Port 5000** *(optionnel)* : Accès API Direct Backend si besoin.

---

## 2. Configuration Initiale

1. Copiez le dossier du projet `CPLI` sur le serveur hôte.
2. Créez le fichier de configuration `.env` à la racine du projet à partir du modèle `.env.example` :

   ```bash
   cp .env.example .env
   ```

3. Editez `.env` si nécessaire pour définir des mots de passe sécurisés :

   ```env
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=votre_mot_de_passe_securise
   POSTGRES_DB=formation_db
   JWT_SECRET=votre_cle_secrete_jwt
   PORT=5000
   CORS_ORIGIN=*
   ```

---

## 3. Installation et Démarrage

Pour construire les images et démarrer tous les services en arrière-plan :

```bash
docker compose build
docker compose up -d
```

### Vérification du statut des conteneurs

```bash
docker compose ps
```

Tous les conteneurs (`cpli_postgres`, `cpli_backend`, `cpli_frontend`) doivent indiquer l'état `running` ou `healthy`.

---

## 4. Maintenance & Commandes Utiles

### Consulter les Logs

- **Tous les services** :
  ```bash
  docker compose logs -f
  ```
- **Backend uniquement** :
  ```bash
  docker compose logs -f backend
  ```
- **Frontend Nginx uniquement** :
  ```bash
  docker compose logs -f frontend
  ```
- **PostgreSQL uniquement** :
  ```bash
  docker compose logs -f postgres
  ```

### Redémarrer l'application

Si vous devez redémarrer les services sans modifier la configuration :

```bash
docker compose restart
```

### Arrêter l'application

Pour arrêter les conteneurs :

```bash
docker compose down
```

> [!IMPORTANT]
> **Ne jamais exécuter `docker compose down -v`** en production. Le paramètre `-v` détruit les volumes Docker et supprimerait la base de données PostgreSQL et tous les scans de chèques / PDF stockés.

---

## 5. Procédure de Mise à Jour de l'Application

Pour mettre à jour le code de l'application vers une nouvelle version sans perdre les données existantes (Base de données PostgreSQL et fichiers uploadés) :

1. Remplacez le code source sur le serveur.
2. Reconstruisez les images Docker :
   ```bash
   docker compose build
   ```
3. Relancez les conteneurs :
   ```bash
   docker compose up -d
   ```

Prisma appliquera automatiquement les éventuelles évolutions du schéma de base de données sans altérer vos données de production.

---

## 6. Persistance des Données

L'application utilise deux volumes Docker nommés gérés par Docker :

1. `cpli_postgres_data` : Stocke l'intégralité de la base de données PostgreSQL (`/var/lib/postgresql/data`).
2. `cpli_uploads_data` : Stocke tous les scans de chèques et fichiers PDF générés (`/app/uploads`).

Même après la suppression ou la reconstruction des conteneurs avec `docker compose down`, ces volumes sont conservés et automatiquement réattachés au prochain `docker compose up -d`.

---

## 7. Accès Réseau depuis les Postes Clients

Les utilisateurs sur les machines du réseau privé accèdent à l'application via leur navigateur web à l'adresse IP privée du serveur :

```text
http://<IP_PRIVEE_DU_SERVEUR>
```

Exemple : `http://192.168.1.50`
