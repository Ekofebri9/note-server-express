FROM node:22-slim
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
 
COPY package*.json  pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --prod --frozen-lockfile
 
COPY . .
 
EXPOSE 3001
 
CMD [ "pnpm", "run", "start" ]