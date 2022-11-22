# Información del proyecto

docker build --tag app-mascota

docker run -p 8080:8080 app-mascota --name app-mascota


## Respaldo para la base de datos
En la el directorio BD/mascotas_db se encuentra los archivos de respaldo para la base de datos MongoDB utilizando las herrammientas [mongodump y mongorestore]()

### Comando crear copia de respaldo
```sh
./mongodump --db mascotas_db --out 'C:\Directorio\salida'
```
### Comando para restaurar los registros en una nueva base de datos
```sh
./mongorestore --db=mascotas_db --nsInclude="db1.*" mascotas_db/
```


Para deplegar en kubernetes
```sh
docker build . -t edcamero/mascotas-api:<TAG>
docker push edcamero/mascotas-api:<TAG>

kubectl apply -f deployment.yaml
```

