# Rpg-player
This is an educational repository to demonstrate my learning skills with React. This project also feature: MongoDB, NodeJs, GraphQL. The project consists of an online platform where you can play Dungeons and Dragons in the web with your friends.

# Dependencies
So far, to run this project you need:
* Docker-compose https://docs.docker.com/compose

# Running
## Init your database
1. Go to the folder ```database```
2. Edit the file ```.env```, you are free to change every value that you want (after the character '=' in each line). The variables that have 'ROOT' in the name are responsible for the admin data on your database, while the others are only responsible for the data the app actually uses. Do not share this file. 
3. Run your database with ```docker-compose up```

# Troubleshoot
## Inspect database
If you want to inspect the data being stored or edit something manually, you can deploy a friendly site to do so. Go to the database folder and run ```docker-compose -f debug-compose.yaml up -d```. Now you can always go to your browser on the link http://localhost:8081 and check that up.

# TODO
