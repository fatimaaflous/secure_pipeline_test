# Étape 1 : Construction de l'application (Builder)
FROM node:18-alpine AS builder

# Définir le dossier de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour l'installation des dépendances
COPY package*.json ./

# Installer uniquement les dépendances de production
RUN npm ci --only=production

# Copier le reste des fichiers après installation
COPY . .

# Étape 2 : Image finale optimisée
FROM node:18-alpine AS runner

# Définir un utilisateur non root pour la sécurité
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Définir le dossier de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires depuis le builder
COPY --from=builder /app /app

# Exposer le port de l’application
EXPOSE 3000

# Lancer l’application
CMD ["node", "index.js"]
