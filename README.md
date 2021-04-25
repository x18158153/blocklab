
#  Blockchain CA Project/ Student x18158153 NCI #

## Test of blockchain using 'ABE' token ##

I have performed this implementation as part of the project for the module Blockchain concepts of the course Postgrare Diploma in Science in Cloud Computing  .


## Downloading the Code ##

To download this code, run 

    git clone https://github.com/x20157576/nciblockchain.git

This will create a folder called blocklab and the code will be downloaded to that folder.

To install the dependencies, make sure you are in the blocklab folder and run:

     npm install

once the code is donwloaded create .env file with the following attributed:

    INFURA_KEY= key from Infura account 
    OWNER_ADDRESS= addresss of the contract owner 
    OWNER_PRIVATE_KEY= private key for the owner account
    CONTRACT_ADDRESS= address for the contract

## Web Server ##

we are using express (handlers.js)

run the following:

    node handlers.js

### Interact with the Web Server ###

To access the routes using curl:

Get token symbol 

    curl -get 'http://localhost:8082/symbol'

Get the token total supply 

    curl -get 'http://localhost:8082/supply'

Trigger a transfer to a 10 accounts of a  text file  

    curl -get 'http://localhost:8082/transfer'

Distribute 5% of the remaining tokens in the owner account evenly amongst a list of supplied accounts. The list of accounts is passed from a text file:

    curl -XPOST http://localhost:8082/distribute


## Docker Containers ##

**reference  ```https://docs.docker.com/get-started/```**

To run a docker container , you need to do the following steps:

### Build it ###

    docker build -t  abe/blocklab .

#### Run it

## Interact with docker ##

**View docker images:** 

    docker images ls

**Remove all docker containers etc.**

***Do this if something goes wrong (it will refresh all your containers to a known default state)***

    docker system prune

**Remove docker images**
    
    docker image prune -a -f

**View running docker containers**: 
    
    docker ps

``` or ```
    
    docker ps -a


**Run the image in docker**: 

    docker run -p 41960:8082 --name abe -d abe/blocklab

**Kill a running container**: 

    docker kill abe  

**Kill a running container(2)**: 

    docker kill <CONTAINER_ID>

**Stop a running container**: 

    docker stop abe

**Start a running container**: 

    docker start abe

**View the logs of a container**: 

    docker logs abe

**View the running logs inside a container**: 

    docker logs -f <container id>

**Enter the docker image bash terminal**: 

    docker -t exec abe

## Getting ready to push the image to Dockerhub ##

**Log in to Dockerhub**: 

    docker login --username=<username>

**Tag image ready for push to dockerhub**: 

    docker tag nciblockchain:latest ceebish/nciblockchain

**Push to dockerhub**: 

    docker push ceebish/nciblockchain
