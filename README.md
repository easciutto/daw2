
DESARROLLO DE APLICACIONES MULTIPLATAFORMA - RESOLUCION DEL TP
=======================

La consigna del trabajo práctico puede consultarse en el archivo: 
El dessarrollo del trabajo práctico implica la implementación en conjunto de: una aplicación frontend en ionic, una API en NodeJs Express como servidor backend y una base de datos MySQL para consultar y modificar los datos  es una aplicación frontend desarrollada en IONIC. que se ejecuta sobre el ecosistema `Docker`. Está compuesta por un compilador de `TypeScript` que te permite utilizar este superset de JavaScript para poder programar un `cliente web`. También tiene un servicio en `NodeJS` que te permite ejecutar código en backend y al mismo tiempo disponibilizar el código del cliente web para interactar con el servicio. Además tiene una `base de datos` MySQL que puede interactuar con el backend para guardar y consultar datos, y de manera adicional trae un `administrador` de base de datos para poder administrar la base en caso que lo necesites.

La aplicación IoT de base que viene con este proyecto se encarga de crear una tabla llamada `Devices` en la base de datos, y la idea es que vos puedas desarrollar el código de backend y frontend que te permita controlar desde el navegador el estado de los devices de un hogar inteligente - *como pueden ser luces, TVs, ventiladores, persianas, enchufes y otros* - y almacenar los estados de cada uno en la base de datos. 

Realizando estas tareas vas a a tener una aplicación fullstack IoT del mundo real que utiliza tecnologías actuales en la que un backend es capaz de interactuar con una DB para cumplir con las peticiones de control que se le mandan desde el cliente web.

En esta imagen podés ver una posible implementación del cliente web que controla los artefactos del hogar.

![architecture](doc/webapp-example-1.png)

## Comenzando 🚀

Esta sección es una guía con los pasos escenciales para que puedas poner en marcha la aplicación.

<details><summary><b>Mira los pasos necesarios</b></summary><br>

### Instalar las dependencias

Para correr este proyecto es necesario que instales `Docker` y `Docker Compose`. 
En [este artículo](Trabajo Práctico Desarrollo de Aplicaciones Multiplataforma.pdf)
En [este artículo](https://www.gotoiot.com/pages/articles/docker_installation_linux/) publicado en nuestra web están los detalles para instalar Docker y Docker Compose en una máquina Linux. Si querés instalar ambas herramientas en una Raspberry Pi podés seguir [este artículo](https://www.gotoiot.com/pages/articles/rpi_docker_installation) de nuestra web que te muestra todos los pasos necesarios.

En caso que quieras instalar las herramientas en otra plataforma o tengas algún incoveniente, podes leer la documentación oficial de [Docker](https://docs.docker.com/get-docker/) y también la de [Docker Compose](https://docs.docker.com/compose/install/).

Continua con la descarga del código cuando tengas las dependencias instaladas y funcionando.

### Descargar el código

Para descargar el código, lo más conveniente es que realices un `fork` de este proyecto a tu cuenta personal haciendo click en [este link](https://github.com/gotoiot/app-fullstack-base/fork). Una vez que ya tengas el fork a tu cuenta, descargalo con este comando (acordate de poner tu usuario en el link):

```
git clone https://github.com/USER/app-fullstack-base.git
```

> En caso que no tengas una cuenta en Github podes clonar directamente este repo.

### Ejecutar la aplicación

Para ejecutar la aplicación tenes que correr el comando `docker-compose up` desde la raíz del proyecto. Este comando va a descargar las imágenes de Docker de node, de typescript, de la base datos y del admin de la DB, y luego ponerlas en funcionamiento. 

Para acceder al cliente web ingresa a a la URL [http://localhost:8000/](http://localhost:8000/) y para acceder al admin de la DB accedé a [localhost:8001/](http://localhost:8001/). 

Si pudiste acceder al cliente web y al administrador significa que la aplicación se encuentra corriendo bien. 

> Si te aparece un error la primera vez que corres la app, deteńe el proceso y volvé a iniciarla. Esto es debido a que el backend espera que la DB esté creada al iniciar, y en la primera ejecución puede no alcanzar a crearse. A partir de la segunda vez el problema queda solucionado.

</details>

Continuá explorando el proyecto una vez que lo tengas funcionando.

## Configuraciones de funcionamiento 🔩

Al crearse la aplicación se ejecutan los contenedores de Docker de cada servicio, se crea la base de datos y sus tablas. A continuación podés encontrar info si querés cambiar la estructura de la DB o bien sus configuraciones de acceso.

<details><summary><b>Lee cómo configurar la aplicación</b></summary><br>

### Configuración de la DB

Como ya comprobaste, para acceder PHPMyAdmin tenés que ingresar en la URL [localhost:8001/](http://localhost:8001/). En el login del administrador, el usuario para acceder a la db es `root` y contraseña es la variable `MYSQL_ROOT_PASSWORD` del archivo `docker-compose.yml`.

Para el caso del servicio de NodeJS que se comunica con la DB fijate que en el archivo `src/backend/mysql-connector.js` están los datos de acceso para ingresar a la base.

Si quisieras cambiar la contraseña, puertos, hostname u otras configuraciones de la DB deberías primero modificar el servicio de la DB en el archivo `docker-compose.yml` y luego actualizar las configuraciones para acceder desde PHPMyAdmin y el servicio de NodeJS.

### Estructura de la DB

Al iniciar el servicio de la base de datos, si esta no está creada toma el archivo que se encuentra en `db/dumps/smart_home.sql` para crear la base de datos automáticamente.

En ese archivo está la configuración de la tabla `Devices` y otras configuraciones más. Si quisieras cambiar algunas configuraciones deberías modificar este archivo y crear nuevamente la base de datos para que se tomen en cuenta los cambios.

Tené en cuenta que la base de datos se crea con permisos de superusuario por lo que no podrías borrar el directorio con tu usuario de sistema, para eso debés hacerlo con permisos de administrador. En ese caso podés ejecutar el comando `sudo rm -r db/data` para borrar el directorio completo.

</details>


## Detalles principales 🔍

En esta sección vas a encontrar las características más relevantes del proyecto.

<details><summary><b>Mira los detalles más importantes de la aplicación</b></summary><br>
<br>

### Arquitectura de la aplicación

Como ya pudiste ver, la aplicación se ejecuta sobre el ecosistema Docker, y en esta imagen podés ver el diagrama de arquitectura.

![architecture](doc/architecture.png)

### El cliente web

El cliente web es una Single Page Application que se comunica con el servicio en NodeJS mediante JSON a través de requests HTTP. Puede consultar el estado de dispositivos en la base de datos (por medio del servicio en NodeJS) y también cambiar el estado de los mismos. Los estilos del código están basados en **Material Design**.

### El servicio web

El servicio en **NodeJS** posee distintos endpoints para comunicarse con el cliente web mediante requests HTTP enviando **JSON** en cada transacción. Procesando estos requests es capaz de comunicarse con la base de datos para consultar y controlar el estado de los dispositivos, y devolverle una respuesta al cliente web también en formato JSON. Así mismo el servicio es capaz de servir el código del cliente web.

### La base de datos

La base de datos se comunica con el servicio de NodeJS y permite almacenar el estado de los dispositivos en la tabla **Devices**. Ejecuta un motor **MySQL versión 5.7** y permite que la comunicación con sus clientes pueda realizarse usando usuario y contraseña en texto plano. En versiones posteriores es necesario brindar claves de acceso, por este motivo la versión 5.7 es bastante utilizada para fases de desarrollo.

### El administrador de la DB

Para esta aplicación se usa **PHPMyAdmin**, que es un administrador de base de datos web muy utilizado y que podés utilizar en caso que quieras realizar operaciones con la base, como crear tablas, modificar columnas, hacer consultas y otras cosas más.

### El compilador de TypeScript

**TypeScript** es un lenguaje de programación libre y de código abierto desarrollado y mantenido por Microsoft. Es un superconjunto de JavaScript, que esencialmente añade tipos estáticos y objetos basados en clases. Para esta aplicación se usa un compilador de TypeScript basado en una imagen de [Harmish](https://hub.docker.com/r/harmish) en Dockerhub, y está configurado para monitorear en tiempo real los cambios que se realizan sobre el directorio **src/frontend/ts** y automáticamente generar código compilado a JavaScript en el directorio  **src/frontend/js**. Los mensajes del compilador aparecen automáticamente en la terminal al ejecutar el comando **docker-compose up**.

### Ejecución de servicios

Los servicios de la aplicación se ejecutan sobre **contenedores de Docker**, así se pueden desplegar de igual manera en diferentes plataformas. Los detalles sobre cómo funcionan los servicios los podés ver directamente en el archivo **docker-compose.yml**.

### Organización del proyecto

En la siguiente ilustración podés ver cómo está organizado el proyecto para que tengas en claro qué cosas hay en cada lugar.

```sh
├── db                          # directorio de la DB
│   ├── data                    # estructura y datos de la DB
│   └── dumps                   # directorio de estructuras de la DB
│       └── smart_home.sql      # estructura con la base de datos "smart_home"
├── doc                         # documentacion general del proyecto
└── src                         # directorio codigo fuente
│   ├── backend                 # directorio para el backend de la aplicacion
│   │   ├── index.js            # codigo principal del backend
│   │   ├── mysql-connector.js  # codigo de conexion a la base de datos
│   │   ├── package.json        # configuracion de proyecto NodeJS
│   │   └── package-lock.json   # configuracion de proyecto NodeJS
│   └── frontend                # directorio para el frontend de la aplicacion
│       ├── js                  # codigo javascript que se compila automáticamente
│       ├── static              # donde alojan archivos de estilos, imagenes, fuentes, etc.
│       ├── ts                  # donde se encuentra el codigo TypeScript a desarrollar
│       └── index.html          # archivo principal del cliente HTML
├── docker-compose.yml          # archivo donde se aloja la configuracion completa
├── README.md                   # este archivo
├── CHANGELOG.md                # archivo para guardar los cambios del proyecto
├── LICENSE.md                  # licencia del proyecto
```

> No olvides ir poniendo tus cambios en el archivo `CHANGELOG.md` a medida que avanzas en el proyecto.

</details>

## Detalles de implementación 💻

En esta sección podés ver los detalles específicos de funcionamiento del código y que son los siguientes.

<details><summary><b>Mira los detalles de implementación</b></summary><br>

### Detalles de la aplicación webb

Desde un browser, ingresando a la url : http://localhost:8000/, se visualiza la aplicación webb.

EN la parte superior de la pantalla encontrarás un campo para ingresar el usuario. Éste es simplemente ilustrativo, ya que no realiza ninguna acción de restricción sobre el de uso de la aplicación.

Por debajo continúa una sección en la cual se listan los dispositivos dados de alta en la base de datos. Aquí podrás visualizar información de cada dispositivo y su estado. Además, ya sea mediante un switch o un slider (según sea el tipo de  dispositivo) podrás ajustar su estado y persistir dicha acción en la base de datos.

![architecture](doc/pantalla_1.png)

Finalmente en la última la sección de la página, escontrarás una serie de campos para gestionar el ABM (altas, bajas, modificaciones) de los dispositivos.
Para el caso de crear un dispositivo nuevo, deberás especificar un nombre, una descripción y el tipo de dispositivo que decidiste agregar. Una vez que hayas completado los campos, debés pulsar el botón "Crear". Recibirás un mensaje en la pantalla como resultado de ésta última acción, tanto sea para notificar una transacción exitosa, como para advertirte de algún porblema u error en la carga de datos.
De modo similar, podrás editar cualquier propiedad de un dispositivo existente o borrarlo.

![architecture](doc/pantalla_2.png)

### Frontend

El archivo principal del cliente HTML es 'index.html'. En él está toda la configuración de estilo y formato de cómo se presenta la información de la aplicación webb.

El código Typescript desarrollado se encuentra el la carpeta './frontend/ts'. El archivo principal del código es 'main.ts' En éste archivo se crea una clase 'Main' dentro de la cual se estructuran las partes más importantes del código. La clase Main requiere implementar una serie de Interfaces y Clases secundarias, las cuales se describen a continuación.

El archivo 'persona.ts' crea la clase Persona, la cual permite crear objetos con los atributos "nombre" y "edad" y también implementar el método mostrar() para poder recuperar la información de los mismos.

El archivo 'user.ts' crea la clase Usuario, que hereda la clase Persona e implementa la interfaz Acciones. Las propiedades de un objeto clase Usuario son: "nombre" y "edad" (heredados de la clase Persona) y "nombre de usuario".

El archivo 'admin.ts' crea la clase Administrador, que hereda la clase Persona e implementa la interfaz Acciones. Las propiedades de un objeto clase Administrador son las mismas que heredé de la clase Persona: "nombre" y "edad".

El archivo 'acciones.ts' crea la Interfaz Acciones, que define las acciones posibles a ser realizadas por los administradores y los usuarios.

El archivo 'device.ts' define la estructura de pares "clave":"valor" que debe respetarse y ser coincidente con el formato de respuesta del servidor ante una petición GET.

El archivo 'ResponseLister.ts' crea la interfaz ResponseLister, que permite manejar las respuestas del servidor, tanto para cuando se utiliza un método GET, como para cuando se utiliza el método POST.

El archivo 'framework.ts' crea la clase Framework, la cual aplica tecnología Ajax para realizar una petición asíncrona al servidor backend, mediante el objeto XMLHttpRequest. También en ésta clase definimos un método para sistematizar la acción de recuperar un elemento de la página HTML.

Volviendo al archivo 'main.ts', comentaré brevemente cada bloque del código. Lo primero es declarar las implementaciones de interfaces y clases. Desde el constructor creamos algunos usuarios y administradores, aunque en el estadío actual de desarrollo, su uso no tiene relevancia para el establecimiento de los métodos contra el servidor. 

A continuación, se desarrolla un bloque de código que crea el Lister GET para traer los dispositivos a la pantalla. Aquí se va construyendo el objeto 'listaDispositivos' con la información aportada por la respuesta del GET al servidor, para luego asignarsela al elemento de pantalla 'CajaDiv' utilizando la propiedad 'innerHTML'.

Luego se desarrolla un bloque de código que crea el Lister para recibir respuesta del servidor al POST de actualización de estado de los dispositivos en pantalla.

El bloque siguiente crea el Método para gestionar y producir una acción a los distintos eventos ejecutados desde la pantalla frontend, que se dan al hacer "click" en los botones. El detalle de cada gestión de evento está documentada en el mismo código.

Finalmente el último bloque cumple la función de esperar la carga completa de la pagina HTML, para posteriormente hacer el recupero de los elementos de pantalla a distintos objetos mediante el método 'document.getElementById'. También establecer la sociación de tipo de evento con la referencia de la función a ejecutar para cada botón.


### Backend

Ésta implementación utiliza el paquete de funcionalidades "express" para facilitar la creación de los métodos GET y POST utilizados. También se implementa el paquete "utils", para realizar la interación con la base de datos, mediante consultas (Querys).

En una primera etapa de puesta a punto y pruebas, podés utilizar el archivo 'datos.js', el cual tiene cargada una lista de dispositivos con sus parámetros. En mi caso, me permitió ajustar el funcionamiento de los primeros métodos GET y la interacción con el frontend. Luego, al establecer la conexión con la base de datos, ya no resultó necesario, por consiguiente quedó desabilitado.

El primer método GET creado, es el utilizado por el frontend para popular la pantalla con la lista de Dispositivos. Se utiliza la url: http://localhost:8000/devices/. Se realiza una consulta SQL de todos los dispositivos cargados en la base de datos y se envía una respuesta a la solicitud del frontend con un status=200. Por el contrario, si hubiese algún error en el procesamiento del request, se envía un status=400.

El segundo método GET se utiliza para solicitar información de un único dispositivo, cuyo 'id' es pasado como parámetro en la url. Por ejemplo, si interesa recuperar el dispositivo id = 1  , la url es : http://localhost:8000/devices/1. Por consiguiente, éste método efectúa una consulta SQL selectiva a la base de datos, para traer sólo información del 'id' requerido. Posteriormente envía la respuesta con el parámetro status =200 si resultó exitosa, o por el cotrario status =400 al detectar un error en la misma.

Continúan 4 métodos POST. El primero procesa los cambios de estado de los dispositivos que se pueden ajustar desde la pantalla de la aplicación web. La url que espera el servidor para éste caso es: http://localhost:8000/actualizar , y en el cuerpo (body) de la solicitud, el frontend envía el 'id' y el 'state' (estado) a ser actualizado en la base de datos. Al igual que con los métodos GET y el resto de los métodos POST,  se realiza una validación y se responde con el correspondiente valor de status.

El resto de los métodos POST se solicitan desde la sección ABM de la aplicación web y nos permiten realizar modificaciones, altas o borrado de dispositivos. Las url son: http://localhost:8000/modificar, http://localhost:8000/crear, http://localhost:8000/borrar respectivamente. Al igual que lo descripto para el primer POST, en el body de la solicitud se envían los parámetros respectivos para realizar los cambios en la base de datos.

<details><summary><b>Ver los endpoints disponibles</b></summary><br>

A continuación verás la lista de los endpoints implementados con sus características.

1) Devolver el estado de los dispositivos.

    "method": "get",
    "request_headers": "application/json",
    "request_body": "",
    "response_code": 200
    "response_body": String "{ "id": 1, "name": "Lampara 1", "description": "Luz cocina", "state": 1, "type": 1} ......"

2) Devolver el estado de un dispositivo seleccionado en la url.

    "method": "get",
    "url": "http://localhost:8000/devices/1"
    "request_headers": "application/json",
    "request_body": "",
    "response_code": 200
    "response_body": String "{ "id": 1, "name": "Lampara 1", "description": "Luz cocina", "state": 1, "type": 1}"

3) Actualizar estado de un dispositivo.

    "method": "post",
    "url": "http://localhost:8000/devices/actualizar"
    "request_headers": "application/json",
    "request_body": {"id":1, "state":0},
    "response_code": 200
    "response_body": OkPacket {fieldCount: 0, affectedRows: 1, insertId: 0, serverStatus: 2, warningCount: 0, message: '(Rows matched: 1  Changed: 1  Warnings: 0', protocol41: true, changedRows: 1 }

4) Modificar atributos de un dispositivo.
 
    "method": "post",
    "url": "http://localhost:8000/devices/modificar"
    "request_headers": "application/json",
    "request_body": { "id": 1, "name": "Lampara 1", "description": "Luz cocina", "state": 1, "type": 1},
    "response_code": 200
    "response_body": OkPacket {fieldCount: 0, affectedRows: 1, insertId: 0, serverStatus: 2, warningCount: 0, message: '(Rows matched: 1  Changed: 1  Warnings: 0', protocol41: true, changedRows: 1 }

5) Dar de alta un dispositivo.

    "method": "post",
    "url": "http://localhost:8000/devices/crear"
    "request_headers": "application/json",
    "request_body": { "name": "Lampara 1", "description": "Luz cocina", "state": 1, "type": 1},
    "response_code": 200
    "response_body": OkPacket {fieldCount: 0, affectedRows: 1, insertId: 12, serverStatus: 2, warningCount: 0, message: '', protocol41: true, changedRows: 0 }

6) Eliminar un dispositivo.

    "method": "post",
    "url": "http://localhost:8000/devices/borrar"
    "request_headers": "application/json",
    "request_body": { "id": 12},
    "response_code": 200
    "response_body": OkPacket {fieldCount: 0, affectedRows: 1, insertId: 0, serverStatus: 2, warningCount: 0, message: '', protocol41: true, changedRows: 0 }

</details>

</details>


## Tecnologías utilizadas 🛠️

En esta sección podés ver las tecnologías más importantes utilizadas.

<details><summary><b>Mira la lista completa de tecnologías</b></summary><br>

* [Docker](https://www.docker.com/) - Ecosistema que permite la ejecución de contenedores de software.
* [Docker Compose](https://docs.docker.com/compose/) - Herramienta que permite administrar múltiples contenedores de Docker.
* [Node JS](https://nodejs.org/es/) - Motor de ejecución de código JavaScript en backend.
* [MySQL](https://www.mysql.com/) - Base de datos para consultar y almacenar datos.
* [PHPMyAdmin](https://www.phpmyadmin.net/) - Administrador web de base de datos.
* [Material Design](https://material.io/design) - Bibliotecas de estilo responsive para aplicaciones web.
* [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript tipado y con clases.

</details>

## Contribuir 🖇️

Si estás interesado en el proyecto y te gustaría sumar fuerzas para que siga creciendo y mejorando, podés abrir un hilo de discusión para charlar tus propuestas en [este link](https://github.com/gotoiot/app-fullstack-base/issues/new). Así mismo podés leer el archivo [Contribuir.md](https://github.com/gotoiot/gotoiot-doc/wiki/Contribuir) de nuestra Wiki donde están bien explicados los pasos para que puedas enviarnos pull requests.

## Sobre Goto IoT 📖

Goto IoT es una plataforma que publica material y proyectos de código abierto bien documentados junto a una comunidad libre que colabora y promueve el conocimiento sobre IoT entre sus miembros. Acá podés ver los links más importantes:

* **[Sitio web](https://www.gotoiot.com/):** Donde se publican los artículos y proyectos sobre IoT. 
* **[Github de Goto IoT:](https://github.com/gotoiot)** Donde están alojados los proyectos para descargar y utilizar. 
* **[Comunidad de Goto IoT:](https://groups.google.com/g/gotoiot)** Donde los miembros de la comunidad intercambian información e ideas, realizan consultas, solucionan problemas y comparten novedades.
* **[Twitter de Goto IoT:](https://twitter.com/gotoiot)** Donde se publican las novedades del sitio y temas relacionados con IoT.
* **[Wiki de Goto IoT:](https://github.com/gotoiot/doc/wiki)** Donde hay información de desarrollo complementaria para ampliar el contexto.

## Muestas de agradecimiento 🎁

Si te gustó este proyecto y quisieras apoyarlo, cualquiera de estas acciones estaría más que bien para nosotros:

* Apoyar este proyecto con una ⭐ en Github para llegar a más personas.
* Sumarte a [nuestra comunidad](https://groups.google.com/g/gotoiot) abierta y dejar un feedback sobre qué te pareció el proyecto.
* [Seguirnos en twitter](https://github.com/gotoiot/doc/wiki) y dejar algún comentario o like.
* Compartir este proyecto con otras personas.

## Autores 👥

Las colaboraciones principales fueron realizadas por:

* **[Matias Ramos](https://github.com/mramos88)**: Creación inicial del frontend, elección de Material Design.
* **[Brian Ducca](https://github.com/brianducca)**: Ayuda para conectar el backend a la base de datos, puesta a punto de imagen de Docker.

También podés mirar todas las personas que han participado en la [lista completa de contribuyentes](https://github.com/###/contributors).

## Licencia 📄

Este proyecto está bajo Licencia ([MIT](https://choosealicense.com/licenses/mit/)). Podés ver el archivo [LICENSE.md](LICENSE.md) para más detalles sobre el uso de este material.

---

**Copyright © Goto IoT 2021** ⌨️ [**Website**](https://www.gotoiot.com) ⌨️ [**Group**](https://groups.google.com/g/gotoiot) ⌨️ [**Github**](https://www.github.com/gotoiot) ⌨️ [**Twitter**](https://www.twitter.com/gotoiot) ⌨️ [**Wiki**](https://github.com/gotoiot/doc/wiki)
