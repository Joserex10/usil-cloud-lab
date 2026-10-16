'use strict';
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const models = {
  iaas: { title: 'Infraestructura como servicio', description: 'Recibes recursos virtuales. Tú configuras el sistema operativo, el entorno y tu aplicación.', managedFrom: 4 },
  paas: { title: 'Plataforma como servicio', description: 'Despliegas tu código y gestionas tus datos. El proveedor administra el entorno de ejecución y la infraestructura.', managedFrom: 2 },
  saas: { title: 'Software como servicio', description: 'Utilizas una aplicación lista desde el navegador. El proveedor gestiona el software y su infraestructura; tú controlas el uso y el acceso a tus datos.', managedFrom: 0 }
};
const layers = ['Aplicación', 'Datos', 'Runtime', 'Sistema operativo', 'Virtualización', 'Servidores'];
function selectModel(key) {
  const model = models[key];
  $$('.service-tabs [role=tab]').forEach(tab => { const selected = tab.dataset.model === key; tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1; });
  $('#service-panel').setAttribute('aria-labelledby', `tab-${key}`);
  $('#model-title').textContent = model.title;
  $('#model-description').textContent = model.description;
  $('#responsibilities').replaceChildren(...layers.map((layer, index) => {
    const item = document.createElement('span');
    item.textContent = layer;
    const managed = index >= model.managedFrom;
    item.className = managed ? 'managed' : '';
    item.title = `${layer}: ${managed ? 'el proveedor' : 'tú'} administra${managed ? '' : 's'}`;
    return item;
  }));
}
const steps = [
  { file: 'index.html', stage: 'CÓDIGO FUENTE', title: 'Empieza con lo esencial.', description: 'Crea el repositorio usil-cloud-lab y abre Codespaces. Prepara tu página con HTML, CSS y JavaScript, sin librerías externas.', code: 'git --version\ndocker --version\ndocker buildx version\n\n# Crea y guarda index.html', tip: 'El código define el contenido y el diseño. GitHub conserva sus versiones; Codespaces proporciona el entorno de desarrollo.' },
  { file: 'Dockerfile', stage: 'CONSTRUCCIÓN', title: 'Tu web, en un solo paquete.', description: 'Nginx sirve los archivos de la web. El Dockerfile indica la imagen base, qué copiar y qué puerto documentar.', code: 'FROM nginx:alpine\nCOPY index.html /usr/share/nginx/html/\nCOPY styles.css app.js favicon.svg /usr/share/nginx/html/\nEXPOSE 80', tip: 'Construye con docker build --platform linux/amd64 -t TU_USUARIO/usil-cloud-lab:1.0.0 . Sustituye TU_USUARIO por tu usuario real de Docker Hub.' },
  { file: 'localhost:8080', stage: 'PRUEBA LOCAL', title: 'Comprueba antes de publicar.', description: 'Inicia una instancia de la imagen y conecta el puerto 8080 de tu entorno con el puerto 80 de Nginx dentro del contenedor.', code: 'docker run -d --name usil-web -p 8080:80 \\\n  TU_USUARIO/usil-cloud-lab:1.0.0\n\ncurl -I http://localhost:8080', tip: 'La respuesta debe ser HTTP 200. Abre también la vista previa para revisar contenido, estilos y navegación. Es una prueba local, todavía no una publicación.' },
  { file: 'Docker Hub', stage: 'REGISTRO DE IMÁGENES', title: 'Una imagen, lista para viajar.', description: 'Crea un repositorio público usil-cloud-lab en Docker Hub. Autentícate desde la terminal y publica la etiqueta 1.0.0.', code: 'docker login -u TU_USUARIO\n\ndocker push TU_USUARIO/usil-cloud-lab:1.0.0', tip: 'Introduce el token solo en el prompt protegido de Docker. Nunca lo guardes en el código. Comprueba que la etiqueta 1.0.0 aparezca en Docker Hub.' },
  { file: 'Blitz Cloud', stage: 'DESPLIEGUE HTTPS', title: 'El último salto: hacerlo público.', description: 'En Blitz Cloud, elige alojar una imagen pública de Docker Hub. Selecciona la etiqueta 1.0.0, configura el puerto 80 y publica.', code: '# Imagen: TU_USUARIO/usil-cloud-lab:1.0.0\n# Puerto del contenedor: 80\n\ncurl -I https://TU_URL_PUBLICA', tip: 'Usa la URL real asignada por Blitz Cloud. Valida HTTPS, HTTP 200 y la página visualmente. La aplicación cloud debe funcionar al cerrar Codespaces.' }
];
let currentStep = 0;
function selectStep(index) {
  currentStep = index;
  const step = steps[index];
  $$('.lab-steps [role=tab]').forEach(tab => { const selected = Number(tab.dataset.step) === index; tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1; });
  $('#lab-panel').setAttribute('aria-labelledby', `step-${index}`);
  $('#lab-file').textContent = step.file;
  $('#lab-stage').textContent = step.stage;
  $('#lab-title').textContent = step.title;
  $('#lab-description').textContent = step.description;
  $('#lab-code').textContent = step.code;
  $('#lab-tip').textContent = step.tip;
  $('#lab-position').textContent = `Paso ${index + 1} de 5`;
  $('#next-step').firstChild.textContent = index === 4 ? 'Volver al inicio ' : 'Siguiente paso ';
  $('#copy-code').textContent = 'Copiar';
}
function keyboardTabs(containerSelector, handler, valueKey, vertical = false) {
  const tabs = $$(`${containerSelector} [role=tab]`);
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => handler(tab.dataset[valueKey]));
    tab.addEventListener('keydown', event => {
      const next = vertical ? 'ArrowDown' : 'ArrowRight';
      const previous = vertical ? 'ArrowUp' : 'ArrowLeft';
      let position;
      if (event.key === next) position = (index + 1) % tabs.length;
      if (event.key === previous) position = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') position = 0;
      if (event.key === 'End') position = tabs.length - 1;
      if (position === undefined) return;
      event.preventDefault();
      handler(tabs[position].dataset[valueKey]);
      tabs[position].focus();
    });
  });
}
keyboardTabs('.service-tabs', selectModel, 'model');
keyboardTabs('.lab-steps', index => selectStep(Number(index)), 'step', true);
selectModel('iaas');
selectStep(0);
$('#next-step').addEventListener('click', () => selectStep((currentStep + 1) % steps.length));
let toastTimer;
$('#copy-code').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(steps[currentStep].code);
    $('#copy-code').textContent = 'Copiado ✓';
    $('.copy-status').textContent = 'Código copiado. Sustituye los valores de ejemplo antes de ejecutarlo.';
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents($('#lab-code'));
    selection.removeAllRanges(); selection.addRange(range);
    $('.copy-status').textContent = 'Seleccionamos el código. Usa Ctrl+C o la opción Copiar de tu dispositivo.';
  }
  $('.copy-status').classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('.copy-status').classList.remove('show'), 4000);
});
const menu = $('.menu-toggle');
function closeMenu(restoreFocus = false) {
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Abrir menú');
  $('#navigation').classList.remove('open');
  if (restoreFocus) menu.focus();
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  $('#navigation').classList.toggle('open', open);
});
$$('#navigation a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(true); });
document.addEventListener('click', event => { if (!event.target.closest('.nav') && menu.getAttribute('aria-expanded') === 'true') closeMenu(); });
matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
$$('.quiz button').forEach(button => button.addEventListener('click', () => {
  $$('.quiz button').forEach(option => option.classList.remove('correct', 'incorrect'));
  const correct = button.dataset.answer === 'true';
  button.classList.add(correct ? 'correct' : 'incorrect');
  $('#quiz-feedback').textContent = correct ? 'Correcto. La plataforma cloud ejecuta el contenedor; Nginx entrega los archivos al navegador.' : 'Inténtalo otra vez. GitHub guarda el código y el navegador muestra la página. Busca el servicio que ejecuta la imagen.';
}));
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  document.body.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.08 });
  $$('.reveal').forEach(element => observer.observe(element));
  reducedMotion.addEventListener('change', event => { if (event.matches) document.body.classList.remove('motion-ready'); });
}
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) $$('#navigation a').forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`)); }), { rootMargin: '-15% 0px -55% 0px' });
  $$('#fundamentos, #arquitectura, #laboratorio, #reflexiones').forEach(section => sectionObserver.observe(section));
}
