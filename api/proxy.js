// import fetch from "node-fetch";

// export default async function handler(req, res) {
//   const targetUrl = req.query.url;

//   if (!targetUrl) {
//     return res
//       .status(400)
//       .json({ error: "Se requiere una URL en la consulta." });
//   }

//   try {
//     const response = await fetch(targetUrl);
//     const body = await response.text();

//     // Modificar el contenido para incluir el script de bloqueo
//     const modifiedBody = body.replace(
//       "</head>",
//       `
//       <script>
//         (function () {
//           const fixScrollAndRemovePopups = () => {
//             const popups = document.querySelectorAll('.didomi-popup-container, #didomi-host, .popup, .overlay, .modal, .fc-ab-dialog, .fc-dialog, .fc-dialog-content, .fc-dialog-footer, .fc-button');
//             popups.forEach((popup) => popup.remove());
//             const elements = [document.body, document.documentElement];
//             elements.forEach((el) => {
//               el.style.overflow = 'auto';
//               el.style.position = 'static';
//               el.style.pointerEvents = 'auto';
//               el.style.height = 'auto';
//             });
//             const blockers = document.querySelectorAll('[style*="overflow: hidden"], [style*="position: fixed"], [style*="pointer-events: none"]');
//             blockers.forEach((blocker) => {
//               blocker.style.overflow = 'auto';
//               blocker.style.position = 'static';
//               blocker.style.pointerEvents = 'auto';
//             });
//             console.log('Scroll desbloqueado y página lista para navegar.');
//           };
//           document.addEventListener('DOMContentLoaded', fixScrollAndRemovePopups);
//           const observer = new MutationObserver(() => fixScrollAndRemovePopups());
//           observer.observe(document.body, { childList: true, subtree: true });
//         })();
//       </script>
//       </head>`
//     );

//     res.status(200).send(modifiedBody);
//   } catch (error) {
//     console.error("Error al cargar la página:", error);
//     res
//       .status(500)
//       .json({ error: "Error al cargar la página: " + error.message });
//   }
// }

/////////////////////////////////NEW Code/////////////////////////////

import fetch from "node-fetch";

export default async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send("URL is required");
  }

  try {
    const response = await fetch(targetUrl);
    const body = await response.text();

    return res.status(200).send(body);
  } catch (error) {
    console.error("Error in proxy function:", error.message);
    return res.status(500).send("Internal Server Error: " + error.message);
  }
};