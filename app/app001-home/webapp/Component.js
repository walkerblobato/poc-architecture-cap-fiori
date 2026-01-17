sap.ui.define([
  "sap/ui/core/UIComponent"
], function (UIComponent) {
  "use strict";

  return UIComponent.extend("app001home.Component", {
    metadata: {
      manifest: "json"
    },

    init: function () {
      // call the init function of the parent
      UIComponent.prototype.init.apply(this, arguments);

      // create the device model
      this.setModel(new sap.ui.model.json.JSONModel(sap.ui.Device), "device");
    }
  });
});
