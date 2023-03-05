# Stage1: Frontend Build
FROM node:14-slim AS frontend-build
WORKDIR /usr/src
COPY frontend/ ./frontend/
RUN cd frontend && npm install && npm run build

# Stage2: Backend Build
FROM node:14-slim AS backend-build
WORKDIR /usr/src
COPY backend/ ./backend/
RUN cd backend && npm install && ENVIRONMENT= npm run build --production
RUN ls

# Stage3: Packagign the app
FROM node:14-slim
WORKDIR /root/
COPY --from=frontend-build /usr/src/frontend/build ./frontend/build
COPY --from=backend-build /usr/src/backend/dist .
RUN ls

EXPOSE 80

CMD ["node", "backend.bundle.js"]

# # Create image based on the official Node image from dockerhub
# FROM node:lts-buster AS frontend
 
# # Create app directory
# WORKDIR /usr/src
# COPY frontend/ ./frontend/
# RUN cd frontend && npm install 

# FROM node:lts-buster AS backend
# WORKDIR /usr/src
# COPY backend/ ./backend/
# RUN cd backend && npm install 
# RUN ls

# FROM node:lts-buster
# WORKDIR /root/
# COPY --from=frontend /usr/src/frontend ./frontend
# COPY --from=backend /usr/src/backend .
# RUN ls
 
# EXPOSE 50

# # Serve the app
# CMD ["npm", "run","start"]