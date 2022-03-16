call ng build --aot --output-hashing=all --configuration=production
docker build -t utfprpatobranco/oficina_lab_quimica_frontend:1.0.0 .
docker push utfprpatobranco/oficina_lab_quimica_frontend:1.0.0
pause
