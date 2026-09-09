import { i as HTTPResponse } from "../_libs/h3+rou3+srvx.mjs";
//#region #nitro/virtual/renderer-template
var rendererTemplate = () => new HTTPResponse("<!DOCTYPE html>\n<html lang=\"tr\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover\" />\n    <title>ÇÖP ADAM: SON ÇİZGİ</title>\n    <style>\n      @font-face {\n        font-family: 'Caveat';\n        font-style: normal;\n        font-weight: 400;\n        font-display: swap;\n        src: url('./fonts/Caveat-Regular.ttf') format('truetype');\n      }\n      @font-face {\n        font-family: 'Caveat';\n        font-style: normal;\n        font-weight: 700;\n        font-display: swap;\n        src: url('./fonts/Caveat-Bold.ttf') format('truetype');\n      }\n      html, body {\n        margin: 0;\n        padding: 0;\n        width: 100%;\n        height: 100%;\n        overflow: hidden;\n        user-select: none;\n        -webkit-user-select: none;\n        -webkit-touch-callout: none;\n        touch-action: none;\n        overscroll-behavior: none;\n        background-color: #f7f4ec;\n        color: #111111;\n        font-family: 'Caveat', cursive, sans-serif;\n      }\n      #root {\n        width: 100%;\n        height: 100%;\n        overflow-y: auto;\n        overflow-x: hidden;\n        -webkit-overflow-scrolling: touch;\n      }\n    </style>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/client.tsx\"><\/script>\n  </body>\n</html>\n", { headers: { "content-type": "text/html; charset=utf-8" } });
//#endregion
//#region node_modules/nitro/dist/runtime/internal/routes/renderer-template.mjs
function renderIndexHTML(event) {
	return rendererTemplate(event.req);
}
//#endregion
export { renderIndexHTML as default };
