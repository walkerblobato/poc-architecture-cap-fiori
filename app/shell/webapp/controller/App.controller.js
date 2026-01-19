sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/mvc/XMLView",
  "sap/m/Page"
], function (Controller, JSONModel, XMLView, Page) {
  "use strict";

  return Controller.extend("shell.controller.App", {
    onInit: function () {
      const oModel = new JSONModel({
        selectedKey: "home"
      });
      this.getView().setModel(oModel);

      this._loadedApps = {};

      // Load home app by default
      this._navigateToApp("home");
    },

    onSideNavButtonPress: function () {
      const oToolPage = this.byId("toolPage");
      const bExpanded = oToolPage.getSideExpanded();
      oToolPage.setSideExpanded(!bExpanded);
    },

    onItemSelect: function (oEvent) {
      const oItem = oEvent.getParameter("item");
      const sKey = oItem.getKey();

      if (sKey) {
        this._navigateToApp(sKey);
      }
    },

    onAvatarPress: function () {
      sap.m.MessageToast.show("User profile clicked!");
      // Aqui você pode adicionar navegação para tela de perfil, menu dropdown, etc.
    },

    _navigateToApp: function (sAppKey) {
      const oNavContainer = this.byId("navContainer");

      // Check if app is already loaded
      if (this._loadedApps[sAppKey]) {
        oNavContainer.to(this._loadedApps[sAppKey]);
        return;
      }

      // App configuration
      const oAppConfig = {
        "home": {
          viewName: "app001home.view.Main",
          id: "app001homeView"
        },
        "compliance-radar": {
          viewName: "app002complianceradar.view.Main",
          id: "app002complianceradarView"
        },
        "clean-core-kpis": {
          viewName: "app003cleancorekpis.view.Main",
          id: "app003cleancorekpisView"
        }
      };

      const oConfig = oAppConfig[sAppKey];

      if (!oConfig) {
        console.error("App configuration not found for key:", sAppKey);
        return;
      }

      console.log("Loading app:", sAppKey, "with config:", oConfig);

      // Load the app view
      XMLView.create({
        viewName: oConfig.viewName,
        id: this.getView().createId(oConfig.id)
      }).then(function (oView) {
        console.log("App loaded successfully:", sAppKey);
        this._loadedApps[sAppKey] = oView.getId();
        oNavContainer.addPage(oView);
        oNavContainer.to(oView);
      }.bind(this)).catch(function (oError) {
        console.error("Error loading app:", sAppKey, oError);
      });
    }
  });
});
