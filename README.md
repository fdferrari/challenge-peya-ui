# Challenge UI Search PeYa

Esta app brinda los siguientes servicios:

* Búsqueda por geolocalización de restaurantes.

# Technological Stack 

Para la construcción de esta app se decidió el uso de la librería Javascript React para el desarrollo ágil de la UI basándose en componentes. Una de las principales ventajas al utilizar esta tecnologías es la capacidad de manipular de forma dinámica el DOM lo cual permite solo renderizar aquellas porciones de la app que solo hayan sufrido alguna modificación en su estado. Con esta tecnología es fácil organizar el código a través de componentes e incorporar distintas librerías que la complementen. De ser necesario, a través de React Native se puede reutilizar el código generado para la construcción de una aplicación móvil.

# Pending Requirements

* **Completar cobertura de tests**: solo se incluye "smoke test" sobre el renderizado de componentes.

## Getting Started
Estas instrucciones le permitirá tener la aplicación funcionando en su máquina local con fines de desarrollo y pruebas.

### Prerequisities
Para ejecutar la aplicación, es necesario tener instalado en su sistema lo siguiente:
- [Node.JS](https://nodejs.org/en/) (>= v8.11.3)
- [NPM](https://www.npmjs.com/get-npm) (>= v5.6.0)

### Routes Documentation

Las rutas de la app son las siguientes:

* `http://host:port/login`
* `http://host:port/search?lat=-34.90549&lng=-56.181319` (Tanto el valor de latitud como longitud son opcionales. En caso de no proporcionarlos, la app se posiciona de acuerdo a la geolocalización del browser o la establecida por default.)

### Folder Structure

```
challenge-peya-ui/
  ├───public
  └───src/
      .eslintrc.json
      package.json
      README.md
```

## Installing
### Configuración de variables de entorno

1. Crear en el directorio raiz del proyecto un archivo `.env.local`
2. Establecer el valor de las siguientes variables de entorno. Por ejemplo:

`.env.local` :

```dosini
# Conexión con backend
REACT_APP_API=http://localhost:5000/api/
# API KEY Google para el uso de maps (se puede utilizar esta key => https://blog.vanila.io/writing-a-google-maps-react-component-fae411588a91)
REACT_APP_API_KEY_GOOGLE = AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo
# Repositorio de imagenes de los restaurantes 
REACT_APP_IMAGE = https://foobarfoo/restaurants/
# Link al perfil del restaurant
REACT_APP_PERFIL = http://foobarfoo/foo/bar/
```

### Instalación de dependencias

Dentro de la carpeta del proyecto, ejecutar el siguiente comando para instalar todas las dependencias:
```
npm install
```

### Inicio de la aplicación

```
npm run start
```

Inicia la aplicación en `development mode`.<br />

### Run test

```
npm run test
```

### Build Application

```
npm run build
```
Realiza el `build` de la aplicación para desplegar en producción. 

### Serve app

```
npm run serve
```
Inicia un servidor para montar el build de la app.

### Lint Source Code

```
npm run lint
```

## Built With

* [React](https://reactjs.org/)
* [React Bootstrap](https://react-bootstrap.github.io/)
* [Google Maps React](https://www.npmjs.com/package/google-maps-react)
* [Axios](https://www.npmjs.com/package/axios)

## Authors

* [Federico D. Ferrari](federico.d.ferrari@gmail.com)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
