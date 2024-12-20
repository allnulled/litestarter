const Importer = class {

  static async scriptSrc(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve();
      script.onerror = (e) => reject(e);
      document.head.appendChild(script);
    });
  }

  static async scriptSrcModule(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.type = "module";
      script.onload = () => resolve();
      script.onerror = (e) => reject(e);
      document.head.appendChild(script);
    });
  }

  static async scriptAsync(url, context = {}) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch script: ${url}`);
    const scriptText = await response.text();
    const AsyncFunction = (async function() {}).constructor;
    const asyncFunction = new AsyncFunction(...Object.keys(context), scriptText);
    return await asyncFunction(...Object.values(context));
  }

  static async linkStylesheet(href) {
    return new Promise((resolve, reject) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = href;
      link.onload = () => resolve();
      link.onerror = (e) => reject(e);
      document.head.appendChild(link);
    });
  }

  static async text(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch text: ${url}`);
    return response.text();
  }

  static async importVueComponent(url) {
    try {
      const urlJs = url + ".js";
      const urlCss = url + ".css";
      const urlHtml = url + ".html";
      const template = await this.text(urlHtml);
      await this.scriptAsync(urlJs, { $template: template });
      await this.linkStylesheet(urlCss);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
}

window.Importer = Importer;