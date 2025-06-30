FROM node:20-alpine

WORKDIR /Otero_Samir_ui_garden

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build-storybook

EXPOSE 8083

CMD ["npx", "http-server", "storybook-static", "-p", "8083", "-a", "0.0.0.0"]