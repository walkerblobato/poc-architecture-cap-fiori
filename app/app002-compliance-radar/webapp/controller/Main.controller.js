sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
  "use strict";

  return Controller.extend("app002complianceradar.controller.Main", {
    onInit: function () {
      // Sample data for compliance radar
      const oData = {
        complianceScore: 85,
        totalChecks: 120,
        passedChecks: 102,
        failedChecks: 18,
        areas: [
          {
            name: "API Usage",
            score: 92,
            status: "Success"
          },
          {
            name: "Custom Code",
            score: 78,
            status: "Warning"
          },
          {
            name: "Extensions",
            score: 88,
            status: "Success"
          },
          {
            name: "Modifications",
            score: 65,
            status: "Error"
          }
        ]
      };

      const oModel = new JSONModel(oData);
      this.getView().setModel(oModel);
    }
  });
});
