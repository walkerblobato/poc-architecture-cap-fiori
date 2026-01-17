sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/json/JSONModel",
  "sap/ui/Device"
], function (UIComponent, JSONModel, Device) {
  "use strict";

  return UIComponent.extend("shell.Component", {
    metadata: {
      manifest: "json",
      interfaces: ["sap.ui.core.IAsyncContentCreation"]
    },

    init: function () {
      // call the init function of the parent
      UIComponent.prototype.init.apply(this, arguments);

      // set device model
      const oDeviceModel = new JSONModel(Device);
      oDeviceModel.setDefaultBindingMode("OneWay");
      this.setModel(oDeviceModel, "device");
    }
  });
});
