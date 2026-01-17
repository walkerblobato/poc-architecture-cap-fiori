sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/mvc/XMLView"
], function (Controller, JSONModel, XMLView) {
  "use strict";

  return Controller.extend("shell.controller.App", {
    onInit: function () {
      const oModel = new JSONModel({
        selectedKey: "home"
      });
      this.getView().setModel(oModel);

      // Load app001-home Main.view.xml
      this._loadApp001Home();
    },

    _loadApp001Home: function () {
      const oMainContent = this.byId("app001-home");
      
      XMLView.create({
        viewName: "app001home.view.Main",
        id: this.getView().createId("app001homeView")
      }).then(function (oView) {
        oMainContent.addItem(oView);
      });
    },

    onSideNavButtonPress: function () {
      const oToolPage = this.byId("toolPage");
      const bExpanded = oToolPage.getSideExpanded();
      oToolPage.setSideExpanded(!bExpanded);
    },

    onItemSelect: function (oEvent) {
      // Home is always selected
      this.getView().getModel().setProperty("/selectedKey", "home");
    }
  });
});
