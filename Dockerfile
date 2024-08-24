FROM node:22

RUN apt-get update

RUN apt-get install -y locales && \
    sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    dpkg-reconfigure --frontend=noninteractive locales

RUN apt-get install -y zsh tmux less tig sqlite3

# WORKDIR /workspaces/wiki-tracer-ts
# RUN npm install

# this is for the actual build, for now i'm just using this docker image via dev containers which map your source
# directory to /workspaces/<project-name> live

# WORKDIR /app
# COPY . .
# CMD ["node", "src/index.js"]

# EXPOSE 3000
