const main = async function () {
  try {
      Import_scripts: {
          await Promise.all([
              Importer.scriptSrc("src/external/socket.io-client.js"),
              Importer.scriptSrc("src/external/vue-v2.js"),
              Importer.importVueComponent("src/components/c-title/c-title"),
              Importer.importVueComponent("src/components/home-page/home-page"),
              Importer.importVueComponent("src/components/app/app"),
          ]);
          await Importer.linkStylesheet("src/external/win7.css");
          await Importer.scriptSrc("src/external/refresher.js");
      }
      Create_app: {
          console.log("Deplyoing app");
          Vue.prototype.$window = window;
          Vue.prototype.$importer = Importer;
          Vue.prototype.$socketio = io;
          const app = new Vue({
              render: h => h(Vue.options.components.app),
          }).$mount("#app");
      }
  } catch (error) {
      console.log(error);
      throw error;
  }
};
window.addEventListener("load", main);