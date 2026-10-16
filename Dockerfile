FROM nginx:alpine
LABEL org.opencontainers.image.title="USIL Cloud Lab"
LABEL org.opencontainers.image.description="Laboratorio académico de Cloud Computing"
COPY index.html styles.css app.js favicon.svg /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget -q -O /dev/null http://127.0.0.1/health || exit 1
