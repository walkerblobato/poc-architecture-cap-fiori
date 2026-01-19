sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
  "use strict";

  return Controller.extend("app001home.controller.Main", {
    onInit: function () {
      // Dados mockados (simulando banco de dados)
      var oData = {
        userName: "Vandré",
        userTitle: "Enterprise Architect",
        userDepartment: "SAP Center of Excellence",
        greeting: this._getGreeting(),
        connectionStatus: "SAP (Prod) Connected",
        metrics: {
          cleanCoreScore: { value: "72%", label: "CLEAN CORE SCORE" },
          pendingActions: { value: "5", label: "PENDING ACTIONS" },
          aiInsights: { value: "12", label: "AI INSIGHTS" }
        }
      };

      var oModel = new JSONModel(oData);
      this.getView().setModel(oModel, "home");

      // Gerar HTML do banner
      this._updateBannerHTML();

      // Para buscar do backend:
      // this._loadDataFromBackend();
    },

    _updateBannerHTML: function () {
      var oModel = this.getView().getModel("home");
      var oData = oModel.getData();

      var sHTML =
        "<div style='" +
        "background: linear-gradient(135deg, #0070f2 0%, #0052cc 50%, #003d99 100%);" +
        "border-radius: 16px;" +
        "box-shadow: 0 4px 20px rgba(0, 112, 242, 0.3);" +
        "padding: 2rem;" +
        "height: 280px;" +
        "display: flex;" +
        "flex-direction: column;" +
        "justify-content: space-between;" +
        "'>" +
        "<div>" +
        "<h1 style='color: white; font-size: 2.5rem; font-weight: 300; margin: 0 0 0.5rem 0; line-height: 1.2;'>" +
        oData.greeting + ", " + oData.userName + "</h1>" +
        "<p style='color: rgba(255, 255, 255, 0.9); font-size: 1rem; margin: 0;'>" +
        oData.userTitle + " • " + oData.userDepartment + "</p>" +
        "</div>" +
        "<div style='display: flex; gap: 1rem;'>" +
        this._createMetricCard(oData.metrics.cleanCoreScore.value, oData.metrics.cleanCoreScore.label) +
        this._createMetricCard(oData.metrics.pendingActions.value, oData.metrics.pendingActions.label) +
        this._createMetricCard(oData.metrics.aiInsights.value, oData.metrics.aiInsights.label) +
        "</div>" +
        "</div>";

      oModel.setProperty("/bannerHTML", sHTML);
    },

    _createMetricCard: function (value, label) {
      return "<div style='" +
        "background: rgba(255, 255, 255, 0.15);" +
        "backdrop-filter: blur(10px);" +
        "-webkit-backdrop-filter: blur(10px);" +
        "border: 1px solid rgba(255, 255, 255, 0.2);" +
        "border-radius: 12px;" +
        "padding: 1.5rem;" +
        "min-width: 180px;" +
        "cursor: pointer;" +
        "transition: all 0.3s ease;" +
        "' onmouseover=\"this.style.background='rgba(255, 255, 255, 0.25)'; this.style.transform='translateY(-4px)'; this.style.boxShadow='0 8px 16px rgba(0, 0, 0, 0.2)';\" " +
        "onmouseout=\"this.style.background='rgba(255, 255, 255, 0.15)'; this.style.transform='translateY(0)'; this.style.boxShadow='none';\">" +
        "<h2 style='color: white; font-size: 3rem; font-weight: 300; margin: 0 0 0.5rem 0; line-height: 1;'>" +
        value + "</h2>" +
        "<p style='color: rgba(255, 255, 255, 0.85); font-size: 0.75rem; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; margin: 0;'>" +
        label + "</p>" +
        "</div>";
    },

    _getGreeting: function () {
      var hour = new Date().getHours();
      if (hour < 12) return "Good Morning";
      if (hour < 18) return "Good Afternoon";
      return "Good Evening";
    },

    // Exemplo OData
    _loadDataFromBackend: function () {
      var oModel = this.getView().getModel(); // OData Model
      oModel.read("/UserMetrics('current')", {
        success: function (oData) {
          var oHomeModel = this.getView().getModel("home");
          oHomeModel.setProperty("/metrics/cleanCoreScore/value", oData.CleanCoreScore + "%");
          oHomeModel.setProperty("/metrics/pendingActions/value", oData.PendingActions);
          oHomeModel.setProperty("/metrics/aiInsights/value", oData.AIInsights);
          this._updateBannerHTML(); // Atualizar HTML após buscar dados
        }.bind(this)
      });
    }
  });
});