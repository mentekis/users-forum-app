FROM node:lts

WORKDIR /app

COPY . .

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g pnpm@latest
RUN pnpm i -g typescript
RUN pnpm i
RUN tsc

EXPOSE 3001

CMD ["pnpm", "start"]

