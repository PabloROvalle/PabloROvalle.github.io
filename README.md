# Pablo Rodríguez Ovalle — academic website (Research V4)

## IMPORTANTE ANTES DE SUBIR A GITHUB

Este paquete no contiene `publications.json` a propósito: el archivo de tu repositorio contiene la bibliografía REAL actualizada por GitHub Actions. **No lo borres ni lo sustituyas.**

### Actualización en GitHub (sin terminal)
1. Descomprime este ZIP en tu equipo.
2. Sube a la raíz del repositorio los nuevos `index.html`, `styles.css`, `script.js` y `README.md` y confirma la sustitución de versiones anteriores. Puedes hacerlo mediante **Add file → Upload files**.
3. En la carpeta `assets/`, añade `methods-placeholder.svg` y conserva `mountain-night-sky.png`.
4. En `scripts/`, actualiza `sync_publications.py` con el archivo del paquete (incluye la corrección del identificador nulo).
5. En `.github/workflows/` conserva el workflow; también se incluye una copia en este paquete por si te hiciera falta.
6. No borres otros archivos de tu repositorio. En especial conserva `publications.json`.
7. Haz Commit changes y espera al despliegue Pages.

## Imágenes de Research
- Saturno: imagen real JWST/NIRCam alojada en NASA Science (cargada mediante URL oficial).
  Fuente: https://science.nasa.gov/asset/webb/saturn-nircam/
- Marte: ilustración oficial de ESA sobre ExoMars TGO y ocultaciones solares (cargada mediante URL oficial).
  Fuente: https://www.esa.int/ESA_Multimedia/Images/2019/04/ExoMars_Trace_Gas_Orbiter_analyses_the_martian_atmosphere
- Methods: `assets/methods-placeholder.svg` es un DIAGRAMA TEMPORAL, NO la figura original.
  El PDF https://www.aanda.org/articles/aa/pdf/2024/11/aa51453-24.pdf impidió recuperar la Figura 3 de forma verificable. Para incorporar la figura real, exporta tú la Figura 3 como `assets/research-methods-figure3.png` y modifica SOLO su ruta en `index.html` desde `assets/methods-placeholder.svg` a `assets/research-methods-figure3.png`. Revisa las condiciones de reutilización y conserva la atribución del artículo.

## Sincronización de publicaciones
La acción Github Actions diaria y la clave secreta `OPENALEX_API_KEY` continúan funcionando. No necesitas generar otra clave. `publications.json` se mantiene en GitHub y se seguirá actualizando automáticamente.
