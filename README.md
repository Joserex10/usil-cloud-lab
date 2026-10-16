# Cloud Computing | USIL

Laboratorio académico individual de Jose Maria. Web educativa sin dependencias externas, servida por Nginx en un contenedor Docker `linux/amd64`.

- Web: https://usil-cloud-web.joserex19.blitz.cloud/
- Imagen pública: https://hub.docker.com/r/joserex10/usil-cloud-lab/tags
- Etiqueta del laboratorio: `joserex10/usil-cloud-lab:1.0.0`
- Plataforma de ejecución: Blitz Cloud, puerto del contenedor `80`.

## Contenido

Objetivo del laboratorio, arquitectura del proyecto, proceso de construcción y publicación, conceptos de imagen y contenedor, comparación interactiva de IaaS/PaaS/SaaS, respuestas a las cinco preguntas de reflexión y una pregunta de repaso. Diseño adaptable, menú móvil, teclado, copia de comandos y animaciones que respetan movimiento reducido.

## Ejecutar

```sh
docker build --platform linux/amd64 -t joserex10/usil-cloud-lab:1.0.0 .
docker run -d --name usil-web -p 8080:80 joserex10/usil-cloud-lab:1.0.0
curl -I http://localhost:8080
```

También puede abrirse `index.html` directamente para ver el diseño, o servirse con `python -m http.server 8080`. La copia al portapapeles requiere un contexto seguro o localhost; si no está disponible, la web selecciona el código para copiarlo manualmente.

## Publicar la imagen

```sh
docker login
docker push joserex10/usil-cloud-lab:1.0.0
```

El inicio de sesión por navegador evita copiar tokens al código. Para un fork, sustituir `joserex10` por el usuario propio de Docker Hub. No guardar credenciales en archivos ni commits.

En Blitz Cloud: elegir imagen pública, seleccionar `1.0.0`, puerto `80`, sin base de datos ni volúmenes, y publicar. Para fijar esta entrega se puede usar la referencia exacta:

```text
joserex10/usil-cloud-lab:1.0.0@sha256:8ecf44cd1bd8eb238d462ec406ad646c7320b35082c47be6d9383df3a12f78d7
```

## Archivos

| Archivo | Función |
| --- | --- |
| `index.html` | Contenido y estructura accesible |
| `styles.css` | Diseño, animación y composición móvil |
| `app.js` | Controles interactivos sin librerías |
| `favicon.svg` | Icono propio del proyecto académico |
| `Dockerfile` | Empaquetado con Nginx y comprobación de salud |
| `nginx.conf` | Puerto HTTP, rutas y encabezados |
| `ENTREGA.md` | Proceso, resultados, preguntas y límites |

El contenedor solo copia los cuatro archivos públicos y su configuración. El código de la aplicación no solicita datos personales ni utiliza analítica externa. El alojamiento gratuito puede insertar su propia insignia.

## Alcance y fuentes

El desarrollo y la construcción se realizaron con Docker Desktop en Windows, como alternativa local al entorno Codespaces propuesto en la guía. La imagen sí se publica en Docker Hub y se ejecuta en Blitz Cloud. No se afirma haber utilizado Codespaces.

La guía del laboratorio contiene indicaciones contradictorias sobre IA: la norma general de la página 1 la prohíbe, mientras la descripción de esa misma página y la página 3 permiten generar o mejorar el HTML/CSS con IA. Esta entrega se preparó con asistencia de IA; corresponde confirmar el criterio de evaluación con el docente.

Proyecto académico independiente; no representa un sitio institucional de USIL.

- [Definición de Cloud Computing, NIST SP 800-145](https://www.nist.gov/publications/nist-definition-cloud-computing)
- [Dockerfile, Docker Docs](https://docs.docker.com/get-started/docker-concepts/building-images/writing-a-dockerfile/)
- [Despliegue de imágenes, Blitz Cloud](https://blitz.cloud/docs/deploy-docker-image/)
- [Direcciones y HTTPS, Blitz Cloud](https://blitz.cloud/docs/addresses-and-https/)

El plan gratuito de Blitz duerme las aplicaciones después de 30 minutos sin visitas y las reactiva en la siguiente solicitud. Cerrar Codespaces, este navegador o el equipo local no detiene el contenedor cloud.
