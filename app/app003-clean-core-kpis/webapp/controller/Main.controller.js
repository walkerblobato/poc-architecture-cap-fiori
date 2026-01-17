sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
  "use strict";

  return Controller.extend("app003cleancorekpis.controller.Main", {
    onInit: function () {
      // Sample data for KPIs
      const oData = {
        kpis: [
          {
            title: "Code Quality Index",
            value: 87,
            unit: "%",
            trend: "Up",
            deviation: "+5",
            color: "Good"
          },
          {
            title: "Custom Code Reduction",
            value: 32,
            unit: "%",
            trend: "Up",
            deviation: "+8",
            color: "Good"
          },
          {
            title: "API Adoption Rate",
            value: 78,
            unit: "%",
            trend: "Up",
            deviation: "+12",
            color: "Good"
          },
          {
            title: "Technical Debt",
            value: 245,
            unit: "hours",
            trend: "Down",
            deviation: "-15",
            color: "Critical"
          },
          {
            title: "Standard API Coverage",
            value: 91,
            unit: "%",
            trend: "Up",
            deviation: "+3",
            color: "Good"
          },
          {
            title: "Cloud Readiness Score",
            value: 73,
            unit: "%",
            trend: "Up",
            deviation: "+7",
            color: "Neutral"
          }
        ],
        monthlyTrend: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          values: [65, 68, 72, 75, 80, 87]
        }
      };

      const oModel = new JSONModel(oData);
      this.getView().setModel(oModel);
    }
  });
});
