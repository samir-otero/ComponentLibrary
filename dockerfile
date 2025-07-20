FROM node:20-alpine

WORKDIR /Otero_Samir_ui_garden_build_checks

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build-storybook

EXPOSE 8018

CMD ["npx", "http-server", "storybook-static", "-p", "8018", "-a", "0.0.0.0"]