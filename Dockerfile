# Etapa 1: Construção
FROM node:18 AS builder
WORKDIR /app

# Instala dependências e cria o build
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Produção
FROM node:18
WORKDIR /app
COPY --from=builder /app ./

# Expõe a porta para o Nuxt
EXPOSE 3000
CMD ["npm", "run", "migration:run"]
CMD ["npm", "run", "dev"]
