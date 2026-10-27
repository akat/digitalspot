FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/src ./src
COPY --from=build /app/package*.json ./
COPY --from=build /app/payload.config.ts ./payload.config.ts
COPY --from=build /app/tsconfig.json ./tsconfig.json
COPY --from=build /app/build ./build
RUN addgroup -S payload && adduser -S payload -G payload && chown -R payload:payload /app
USER payload
EXPOSE 3055
CMD ["npm", "run", "start"]
