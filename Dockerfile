FROM node:16-alpine3.14 as builder
WORKDIR /usr/src/app

# Install production dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Transpile ts to js
COPY . .
RUN npm run build

# Remove typings and other files not useful after transpiling
RUN npm install --omit=dev

# Only keep files needed to run
FROM node:16-alpine3.14
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist dist
COPY --from=builder /usr/src/app/node_modules node_modules
# COPY --from=builder /usr/src/app/src/routes/*.ts src/routes/
# COPY --from=builder /usr/src/app/src/middleware/*.ts src/middleware/
COPY --from=builder /usr/src/app/package.json .

CMD [ "npm", "run", "serve" ]