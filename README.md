# watchGram — Clon móvil de Instagram (TP-9)

Aplicación Instagram-like construida con **Expo / React Native**, con feed dinámico consumido desde la **API pública de Unsplash** (a modo de proveedor de imágenes reales), navegación completa con **React Navigation** (tabs + stack modal) y un tema visual oscuro fiel al diseño de Figma de referencia.

> Este proyecto no usa Expo Router, por lo tanto no existe una carpeta `app/` en sentido literal. El código de la aplicación vive en la raíz (`App.js`) y en `src/`, que cumple el mismo rol que cumpliría `app/` en otros proyectos Expo: es la carpeta que concentra toda la lógica y las pantallas de la app. El árbol completo se detalla en la sección siguiente.

---

## 1. Diseño de referencia (Figma)

Archivo de Figma utilizado como base visual: **"İnstagram Modern Mobile Design (Community)"**

- Link directo (frame principal del feed, implementado en `Home`):
  https://www.figma.com/design/nwMdOOytT5zEo0NW6DbD4G/İnstagram-Modern-Mobile-Design--Community-?node-id=2105-5
- Link adicional provisto para esta documentación (mismo archivo):
  https://www.figma.com/design/nwMdOOytT5zEo0NW6DbD4G/İnstagram-Modern-Mobile-Design--Community-?node-id=2112-24

El feed (`Home`) sigue ese frame de forma pixel-cercana: header con logo, historias con anillo degradado, tarjetas de post con imagen, acciones y caption, y bottom nav flotante. El resto de las pantallas (`Perfil`, `Comentarios`, `DetallePost`) no tienen un frame 1:1 en el archivo de Figma — se diseñaron a mano reutilizando la misma paleta de colores, tipografía y componentes visuales (íconos, anillos degradados, grillas) para mantener consistencia con esa referencia.

---

## 2. Árbol de directorios

```
TP-9-Clon-m-vil-de-Instagram/
├── App.js                             # Entry point: navegación raíz + splash screen propia
├── app.json                           # Config de Expo (ícono nativo, splash, adaptive icon)
├── index.js                           # registerRootComponent (boilerplate de Expo)
├── package.json
│
├── assets/                            # Activos nativos generados para el branding de la app
│   ├── icon.png                       # Ícono 1024x1024 (iOS / general)
│   ├── android-icon-foreground.png    # Adaptive icon Android (glifo, fondo transparente)
│   ├── android-icon-background.png    # Adaptive icon Android (fondo degradado)
│   ├── android-icon-monochrome.png    # Adaptive icon Android 13+ (tema monocromo)
│   ├── splash-icon.png                # Logo usado en la splash screen nativa y en App.js
│   ├── favicon.png                    # Ícono para la build web
│   └── logo-mark.png                  # Logo chico usado en el header de Home
│
└── src/
    ├── compontents/
    │   ├── Home/
    │   │   ├── index.js                # Pantalla del feed principal (tab)
    │   │   └── icons.js                # Librería de íconos SVG compartidos por toda la app
    │   ├── Perfil/index.js             # Pantalla de perfil de usuario (tab)
    │   ├── Comentarios/index.js        # Modal: comentarios de un post del feed (solo lectura + like)
    │   ├── DetallePost/index.js        # Modal: detalle extendido de un post (desde la grilla del perfil)
    │   ├── ComentarioItem/index.js     # Fila de comentario individual, reutilizada por los dos modales
    │   │
    │   └── (legado — no importados por App.js, quedaron de una iteración anterior al rediseño de Figma)
    │       ├── Feed/index.js
    │       ├── Post/index.js
    │       ├── Historia/index.js
    │       ├── SearchBar/index.js
    │       └── PostDetalleModal/index.js
    │
    ├── services/
    │   └── unsplashApi.js              # Cliente Axios + funciones fetchFeed / fetchUsuario
    │
    └── utils/
        └── contenidoSimulado.js        # Generadores determinísticos de comentarios y etiquetas simuladas
```

> **Nota sobre los componentes "legado":** `Feed`, `Post`, `Historia`, `SearchBar` y `PostDetalleModal` fueron el scaffolding inicial del proyecto (tema claro, datos hardcodeados) y **no están importados en ningún punto activo de la app** (`App.js` sólo importa `Home`, `Perfil`, `Comentarios` y `DetallePost`). Se dejaron en el repositorio sin borrar, pero no forman parte del flujo funcional actual y `PostDetalleModal` incluso quedó con una firma de props desactualizada respecto al `ComentarioItem` vigente. Se documentan igual por transparencia, ya que la consigna pide reflejar la jerarquía de archivos tal cual existe en el repo.

---

## 3. Componentes: qué son y cómo reciben datos (props)

### `App.js` — Raíz de la aplicación
No es un "componente atómico" de UI sino el **orquestador de navegación**. Se encarga de:
- Mostrar una splash screen propia (imagen estática del logo) durante `1400ms` mientras "arranca" la app, sincronizada con `expo-splash-screen` (nativo).
- Declarar el `RootStack` (`@react-navigation/native-stack`) con 3 rutas: `Tabs` (pantalla normal) y `Comentarios` / `DetallePost` (`presentation: 'modal'`).
- Declarar el `Tab.Navigator` (`Tabs`) con las pestañas `Home` y `Perfil`, con un tab bar flotante y translúcido con estilo custom.
- No recibe props (es el root); les pasa `navigation` y `route` a sus pantallas hijas automáticamente vía React Navigation.

### `src/compontents/Home/index.js` — Feed principal (pantalla de tab)
Responsabilidad: pedir el feed a Unsplash y renderizarlo como una lista de historias + posts, estilo Instagram. Es la pantalla "raíz" de datos: es la única que hace el `fetch` real del feed (10 fotos), y **exporta** `BUSQUEDA`, `CANTIDAD_POSTS` y `mapearFotoAPost` para que otras pantallas (`Perfil`) reutilicen exactamente la misma fuente de datos sin duplicar lógica.

Contiene 3 sub-componentes internos (no exportados, viven solo dentro de este archivo porque no se reutilizan en ningún otro lado):

| Componente | Props que recibe | Por qué existe |
|---|---|---|
| `AvatarAnillo` | `uri`, `size`, `variante` (`'gradiente' \| 'vista' \| 'propia'`), `children` | Encapsula el anillo circular con degradado (estilo "historia activa") o gris (estilo "vista"/sin historia). Se reutiliza para el avatar de historias **y** el avatar de cada post, evitando repetir el degradado + borde en cada lugar. |
| `HistoriaItem` | `historia` (objeto `{ id, username, avatar, esPropia?, vista? }`) | Renderiza un ítem del carrusel de historias. Recibe el objeto completo por prop en vez de campos sueltos porque es un dato de solo-lectura que no necesita normalizarse más. |
| `PostCard` | `post` (objeto mapeado por `mapearFotoAPost`) | Es el ítem que renderiza el `FlatList` del feed. Mantiene su propio estado de "like" (ver sección 4) y dispara la navegación al modal de `Comentarios` pasándole el `post` completo por `route.params`. |

`Home` (el componente principal) no recibe props — es una pantalla de tab, así que la instancia React Navigation directamente.

### `src/compontents/Home/icons.js` — Librería de íconos
No es un componente de pantalla sino una **colección de componentes SVG puros** (`IconCamera`, `IconSend`, `IconHeart`, `IconComment`, `IconShare`, `IconBookmark`, `IconMenuDots`, `IconPlus`, `IconHome`, `IconProfile`). Cada uno recibe `size` y `color`/`filled` por props para poder reusarse con distintos tamaños y estados (ej. `IconHeart` cambia de contorno a relleno rojo según `filled`). Se centralizaron acá porque son íconos compartidos por `Home`, `Perfil`, `Comentarios`, `DetallePost`, `ComentarioItem` y `App.js` (tab bar) — evita duplicar los mismos `<Path>` de SVG en cada componente.

### `src/compontents/Perfil/index.js` — Perfil de usuario (pantalla de tab)
Responsabilidad: mostrar el perfil del autor del primer post del feed (avatar, nombre, bio, métricas) y una grilla 3x de sus posts. Reutiliza `BUSQUEDA`, `CANTIDAD_POSTS` y `mapearFotoAPost` importados desde `Home` — así la grilla del perfil muestra exactamente los mismos 10 posts que ya trajo el feed, sin definir una segunda fuente de datos. Recibe `navigation` como prop (inyectada automáticamente por el `Tab.Navigator`) para poder navegar a `DetallePost` al tocar una celda de la grilla.

### `src/compontents/Comentarios/index.js` — Modal "ver comentarios" (desde el feed)
Se abre al tocar el ícono de comentarios de un `PostCard` en el `Home`. Recibe `route` y `navigation` (inyectados por el stack modal): de `route.params.post` saca el post de referencia (avatar, username, descripción) para mostrarlo como encabezado, y genera sus comentarios simulados con `generarComentarios(post.id)`. Es intencionalmente de **solo lectura + like** (no tiene campo para escribir un comentario nuevo), por decisión de diseño explícita del proyecto: desde el feed sólo se puede interactuar con likes y comentarios existentes.

### `src/compontents/DetallePost/index.js` — Modal "post extendido" (desde la grilla del perfil)
Se abre al tocar una celda de la grilla en `Perfil`. Recibe `post` completo por `route.params` y renderiza la vista tipo Instagram real: imagen en alta definición, avatar/usuario/ubicación, acciones (like propio e independiente del feed), caption, etiquetas (`generarEtiquetas`, derivadas de la descripción real de la foto) y la lista de comentarios simulados debajo.

### `src/compontents/ComentarioItem/index.js` — Fila de comentario
Componente atómico puro: recibe un único prop `comentario` (`{ id, usuario: { username, avatar }, mensaje, likesBase }`) y renderiza avatar + texto + botón de like. Se eligió recibir el objeto completo (en vez de 4 props sueltas) porque tanto `Comentarios` como `DetallePost` generan comentarios con la misma forma vía `generarComentarios`, así que pasar el objeto entero evita desestructurar/reconstruirlo en cada pantalla que lo usa.

### `src/services/unsplashApi.js` — Cliente HTTP
No es un componente sino el único punto de acceso a la API externa. Expone `fetchFeed(numberPhotos, parametro)` (búsqueda de fotos) y `fetchUsuario(username)` (perfil completo de un fotógrafo de Unsplash), ambas usadas por `Home` y `Perfil` dentro de sus `useEffect`.

### `src/utils/contenidoSimulado.js` — Generadores de datos simulados
Funciones puras (no componentes) que generan comentarios y etiquetas de forma **determinística** (mismo `postId` → mismos comentarios siempre, vía un hash simple), usadas por `Comentarios` y `DetallePost`.

---

## 4. Manejo de estado (hooks)

**No hay estado global** (no se usa Context API, Redux, Zustand ni ningún store compartido). Toda la data vive como estado local de cada componente vía `useState`/`useEffect`, y la única forma en la que una pantalla le pasa datos a otra es a través de **`route.params` de React Navigation** (que no es "estado" en el sentido de React: es un dato de navegación de solo lectura para la pantalla que lo recibe).

| Archivo | Hook | Estado / variable | Alcance | Para qué se usa |
|---|---|---|---|---|
| `App.js` | `useState` | `listo` | Local a `App` | Controla si se muestra la splash screen propia o el árbol de navegación real. |
| `App.js` | `useEffect` | — | Local a `App` | Dispara el `setTimeout` que oculta la splash (`setListo(true)` + `SplashScreen.hideAsync()`). |
| `Home/index.js` (`Home`) | `useState` | `historias` | Local a `Home` | Lista de historias a mostrar en el carrusel superior (se llena tras el fetch). |
| `Home/index.js` (`Home`) | `useState` | `posts` | Local a `Home` | Los 10 posts mapeados que renderiza el `FlatList` del feed. |
| `Home/index.js` (`Home`) | `useState` | `cargando` | Local a `Home` | Controla el `ActivityIndicator` mientras se espera la respuesta de Unsplash. |
| `Home/index.js` (`Home`) | `useEffect` | — | Local a `Home` | Dispara `fetchFeed` una sola vez al montar y llena `historias`/`posts`/`cargando`. |
| `Home/index.js` (`PostCard`) | `useState` | `liked` | Local a **cada instancia** de `PostCard` (uno por post) | Estado del like de ese post puntual en el feed; independiente del like del mismo post en `DetallePost`. |
| `Perfil/index.js` | `useState` | `posts` | Local a `Perfil` | Los 10 posts (mapeados) que arma la grilla 3x del perfil. |
| `Perfil/index.js` | `useState` | `usuario` | Local a `Perfil` | Datos del usuario de Unsplash (`fetchUsuario`) que arman el encabezado del perfil. |
| `Perfil/index.js` | `useState` | `cargando` | Local a `Perfil` | Controla el `ActivityIndicator` mientras se resuelven `fetchFeed` + `fetchUsuario`. |
| `Perfil/index.js` | `useEffect` | — | Local a `Perfil` | Dispara la carga del perfil una sola vez al montar. |
| `DetallePost/index.js` | `useState` | `liked` | Local a `DetallePost` | Like del post en su vista extendida (propio, no comparte estado con `PostCard` del feed). |
| `ComentarioItem/index.js` | `useState` | `liked` | Local a **cada instancia** de `ComentarioItem` | Like individual de ese comentario. |

**Dato de navegación (no es estado de React):** `Comentarios` y `DetallePost` reciben el `post` completo vía `route.params.post` — es el mecanismo que reemplaza a un "estado global": en vez de un store compartido, la pantalla que navega le pasa explícitamente los datos que la pantalla destino necesita.

---

## 5. Stack técnico

- **Expo SDK 57** / **React Native 0.86** / **React 19**
- **React Navigation 7**: `@react-navigation/native` + `@react-navigation/native-stack` (stack raíz, modales) + `@react-navigation/bottom-tabs` (tabs Home/Perfil)
- **Axios** para el consumo de la API de Unsplash (`src/services/unsplashApi.js`)
- **expo-image** para todas las imágenes remotas (avatares, fotos de posts)
- **expo-linear-gradient** para los anillos degradados estilo Instagram
- **react-native-svg** para los íconos vectoriales propios (`src/compontents/Home/icons.js`)
- **expo-splash-screen** + splash screen propia en JS para la pantalla de carga
- **react-native-safe-area-context** (`SafeAreaView` / `useSafeAreaInsets`) en las 4 pantallas activas, para respetar notch, isla dinámica y home indicator

---

## 6. Cómo correr el proyecto

```bash
npm install
npx expo start        # o: npm run web / npm run android / npm run ios
```
