# 1. Utilizar una imagen oficial de Node.js
FROM node:20-alpine

# 2. Definir un directorio de trabajo
WORKDIR /app

# 3. Copiar primero los archivos de dependencias
COPY package*.json ./

# 4. Instalar las dependencias
RUN npm install

# 5. Copiar el código de la aplicación
COPY . .

# 6. Exponer el puerto 3000
EXPOSE 3000

# 7. Definir el comando necesario para iniciar la API
CMD ["npm", "start"]
