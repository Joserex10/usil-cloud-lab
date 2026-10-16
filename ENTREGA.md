# Laboratorio de contenedores

**Curso:** Cloud Computing · Universidad San Ignacio de Loyola.  
**Modalidad:** individual. **Estudiante:** Jose Maria. **Fecha:** 15 de octubre de 2026, Lima.

## Objetivo y resultado

Construir una web informativa, empaquetarla con Docker, publicar una imagen y ejecutar el contenedor en la nube.

**Página:** https://usil-cloud-web.joserex19.blitz.cloud/  
**Docker Hub:** https://hub.docker.com/r/joserex10/usil-cloud-lab  
**Imagen:** `joserex10/usil-cloud-lab:1.0.0`  
**Arquitectura:** `linux/amd64`. **Servidor:** Nginx. **Puerto:** 80.

## Proceso

1. Se analizó el chat compartido y el PDF original de ocho páginas.
2. Se prepararon HTML, CSS y JavaScript sin frameworks, fuentes remotas ni dependencias de ejecución externas. Se incorporaron objetivo, diagrama, proceso y conceptos; las preguntas de reflexión se respondieron dentro de la web.
3. Se creó un Dockerfile basado en `nginx:alpine`, copiando explícitamente los archivos públicos y configurando el puerto 80.
4. Se construyó para `linux/amd64` y se probó un contenedor local. Nginx devolvió HTTP 200, su configuración pasó `nginx -t` y su healthcheck indicó `healthy`.
5. Se creó el repositorio público `joserex10/usil-cloud-lab` en Docker Hub y se publicó la etiqueta `1.0.0`.
6. Se creó la aplicación «USIL Cloud Computing» en Blitz Cloud, sin base de datos ni almacenamiento persistente. Se utilizó el subdominio de aplicación `usil-cloud-web` bajo la dirección personal existente `joserex19.blitz.cloud`.
7. Se verificó la URL pública con HTTPS y contenido real de la aplicación. Se comprobaron vistas de escritorio y móvil, menú, pestañas, pasos, reflexiones y respuestas de repaso.

El entorno de construcción utilizado fue Docker Desktop local, no Codespaces. No se utilizó el servidor de Power BI ni se desplegó en los entornos Dokploy del usuario.

## Preguntas de reflexión

### 1. ¿Cuál es la diferencia entre una imagen Docker y un contenedor?

La imagen es un paquete de solo lectura con la aplicación, sus archivos y el entorno. El contenedor es una instancia en ejecución de esa imagen. Una misma imagen puede ejecutar varias instancias.

### 2. ¿Por qué publicar la imagen en Docker Hub antes de desplegarla?

Blitz Cloud debe descargar la imagen desde un registro accesible. Docker Hub conserva el paquete y su etiqueta; al ser público puede descargarse sin proporcionar credenciales de lectura. Docker Hub no ejecuta la web.

### 3. ¿Qué ventajas aporta un servicio administrado frente a una máquina virtual?

Reduce la configuración manual de infraestructura, ejecución, dominio y HTTPS. El estudiante sigue siendo responsable de la aplicación y su configuración. Una máquina virtual ofrece mayor control, pero también requiere más administración.

### 4. ¿Qué cambia al pasar de Codespaces a una URL pública?

La aplicación pasa del entorno de desarrollo al alojamiento cloud. El navegador solicita la web al contenedor remoto mediante una URL HTTPS. El sitio deja de depender de la vista previa local o de la pestaña de Codespaces.

### 5. ¿Qué limitaciones puede tener un alojamiento de práctica frente a producción?

Puede limitar memoria, CPU, almacenamiento, tráfico y disponibilidad, o suspender aplicaciones inactivas. En producción se deben evaluar persistencia, copias, monitoreo, seguridad, recuperación, costos y condiciones de servicio. El plan gratuito no representa una garantía de disponibilidad.

## Conservación

Se conserva la aplicación cloud para entregar y revisar el enlace. La imagen y el código permiten reproducir el resultado. Los procesos de vista previa y los contenedores locales temporales se detienen al terminar; no se eliminan recursos cloud que sirven esta entrega.

El README registra la contradicción sobre asistencia de IA presente en el enunciado. No se oculta el uso de asistencia ni se afirma una aprobación del docente.
