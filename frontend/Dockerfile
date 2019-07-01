FROM node:10.16.0-alpine

# set working directory
RUN mkdir -p /app
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install

# copy frontend app files
COPY . /app

CMD ["npm", "start"]