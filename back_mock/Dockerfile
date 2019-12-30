FROM node:latest

RUN npm install -g aglio --unsafe-perm

#最新パッケージだと以下の不具合が残っているためgitから最新版を落としてインストール
#(git最新版では修正済み。同じセクションでURIパラメータを指定するURIとそうでないURIが共存できない問題)
# https://github.com/Aconex/drakov/issues/147
#RUN npm install -g drakov
RUN git clone https://github.com/Aconex/drakov.git
WORKDIR drakov
RUN npm install -g 

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]

WORKDIR /projects
CMD ["bash"]