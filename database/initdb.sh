#!/bin/bash
mongo -- "$MONGO_INITDB_DATABASE" <<EOF
    var rootUser = '$MONGO_INITDB_ROOT_USERNAME';
    var rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
    var admin = db.getSiblingDB('admin');
    admin.auth(rootUser, rootPassword);

    use $MONGO_DATABASE
    db.about.insert({ description: "MongoDB database used in the rpg-player app!" })
    var user = '$MONGO_USERNAME';
    var passwd = '$MONGO_PASSWORD';
    db.createUser({
      user: user,
      pwd: passwd,
      roles: [ { role: "readWrite", db: "new_database" } ]
    })
EOF