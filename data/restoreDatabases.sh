#!/bin/bash

# books-prd keeps its data
for db in versatile-dev versatile-test
do
    echo "Dropping $db"
    mongo $db --eval "db.dropDatabase()"
    echo "Restoring $db"
    mongorestore -d $db seed/$db
done
