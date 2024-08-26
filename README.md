# Prueba Pokémon

¡Hola! Bienvenido a esta **"Prueba Pokémon"**, un proyecto creado con Vue 3. A continuación, te presento una visión general de las tecnologías y enfoques utilizados para construirlo.

## Tecnologías Utilizadas

### Vue 3 y Composition API

Vue 3 es la base de este proyecto, y la Composition API se utiliza para una mayor flexibilidad y control en la organización del código. Esto facilita la reutilización de lógica y mejora la mantenibilidad.

### TypeScript

El proyecto usa TypeScript por el tipado estático y las ventajas que ofrece en la creación de interfaces. Esto asegura un desarrollo más robusto y un código más fácil de mantener.

### SCSS

SCSS se encarga de los estilos, aprovechando variables globales y anidamiento para un manejo más ordenado y flexible de los estilos.

### Pinia

Pinia se utiliza como store para la gestión del estado. Su capacidad para modularizar los stores ayuda a mantener el código organizado y escalable. Se eligió Pinia en lugar de Vuex ya que el proyecto usa Composition API y Pinia se acopla mejor a esta.

## Principios de Desarrollo

### KISS (Keep It Simple, Stupid)

Se eligio el principio KISS, separando la lógica compleja en componentes aislados. Esto simplifica el código y facilita su comprensión y mantenimiento.

## Estructura del Proyecto

La estructura del proyecto es la siguiente:

- **assets/**: Archivos estáticos como imágenes y fuentes.
- **components/**: Componentes Vue reutilizables.
- **model/**: Modelos TypeScript para la definición de tipos e interfaces.
- **router/**: Configuración de las rutas del proyecto.
- **scss/**: Archivos SCSS globales donde se especifican las variables.
- **service/**: Servicios para interactuar con APIs o manejar lógica de negocio.
- **store/**: Configuración de Pinia para la gestión del estado.
- **views/**: Vistas principales del proyecto.

## Instalación y Ejecución

Para poner en marcha el proyecto, sigue estos pasos:

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/prueba-pokemon.git
   ```
   2. **_Instala las dependencias_**
   ```bash
   cd prueba-pokemon
   npm install
   ```
   3. **_Inicia el servidor de desarrollo_**
   ```bash
    npm run dev
   ```
   ¡Y eso es todo! Ahora deberías tener el proyecto corriendo en tu entorno local.
