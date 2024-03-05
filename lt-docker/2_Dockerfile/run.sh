# setup
docker build -t study-dockerfile .
docker run study-dockerfile

# delete
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker image rm study-docekrfile
