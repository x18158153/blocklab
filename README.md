hey, this is the readme.md file


### Downloading the Code ###

To download this code, run 

```$git clone https://github.com/eoinco/nci2021.git```

This will create a folder called nci2021 and the code will be downloaded to that folder.

To install the dependencies, make sure you are in the nci2021 folder and run:

```$npm install```


### Web Server ###

we' re using express (handlers.js)

To access the routes using curl:

```curl --get 'http://localhost:8082/transfer```

-dockerise the project
-loada file of accounts
-run the distribution
-run distro via handler
do some fun crypto


### Docker Containers

To run a docker container , you need to do the following steps:

#### Build it
To buil the docker container:

```docker build -t  abe/blocklab .```

#### Run it

#### Interact with it 

View the image in docker
```docker image ls` `

To remove all docker container etc. ( if something goes wrong)
```docker system prune```

To remove docker images
```docker image prune -a -f```

View running docker containers
```docker ps```

Run the image in docker

####
