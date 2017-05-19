## windows 10 install MongoDB
1. download MongoDB database msi
[link](https://www.mongodb.org/downloads#production)
download the suitable .msi by OS

2. install MongoDB data

3. create the db folder to restore the data
for example, i create the foler in the "C:\MongoDB\data\db"
```shell
C:\MongoDB>mkdir data\db
C:\MongoDB>cd data\db
C:\MongoDB\data\db
```

4. create the log folder to store the log
```
C:\MongoDB>mkdir data\log
C:\MongoDB>cd data\log
C:\MongoDB\data\log
```

5. install MongoDB into service in System
```shell
C:\MongoDB\bin>mongod --auth --port 27017 
	-dbpath "C:\MongoDB\data\db" --logpath "C:\MongoDB\data\log\mongodb.log" --logappend --serviceName "MongoDB" --install
# --auth means user need to authenticate its identification
# --dbpath define the db's path
# --logpath define the log's path,the log must be a file not a folder
# --logappend means use the supplemental way to store the logs
# --serviceName define the service's name
```
6. remove the service 
```
C:\MongoDB\bin>mongod -remove