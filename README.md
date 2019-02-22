# Pasos para clonar repositorio apk
  - Desde la terminal ingresar a la ubicación en la cual queremos clonar el proyecto
    ```sh
    cd C:\Users\XXXX\Documents\miproyecto
    ````
  - Clonar repositorio
       ```sh
       git clone https://billyrogers@bitbucket.org/billyrogers/app1.git
       ````
  - Ejecutar el comando para instalar todos los paquetes y dependencias
    ```sh
    $ npm install
    ```
# Pasos para generar apk
- Remover la plataforma para asegurarnos que tenga los ultimos cambios (se debe realizar
    cada vez que se vaya a compilar una versión nueva)
    ```sh
    ionic cordova platform rm {android / ios}
    ionic cordova platform rm android
    ```
- Agregar el plugin de geolocation para que obtenga las coordenadas de nuestro dispositivo
    ```sh
    ionic cordova plugin add cordova-plugin-geolocation --save
    ```
    
- Agregar el plugin del mapa de google. Para obtener el api key es necesatio crear el proyecto en [Google Cloud](https://cloud.google.com/maps-platform/?hl=es-419.)
    ```sh
    ionic cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="YOUR_ANDROID_API_KEY_IS_HERE" --variable API_KEY_FOR_IOS="YOUR_IOS_API_KEY_IS_HERE" --save
    ```
- Agregar la plataforma 
    ```sh
    ionic cordova platform add {android / ios}
    ionic cordova platform add android
    ```
- Crear APK  
    ```sh
    ionic cordova build {android / ios}
    ionic cordova build android
    ```
    
# Notas
- El apk para IOS se debe generar desde un dispositivo Mac
- Las librerias que se deben activar para el mapa son *Directions API*, *Maps Javascript API* y *Places API for Web* 

# Informacion adicional para el mapa de google

https://blog.ng-classroom.com/blog/ionic2/google-maps-native/

https://blog.ng-classroom.com/blog/ionic2/google-maps-js-and-ionic/
