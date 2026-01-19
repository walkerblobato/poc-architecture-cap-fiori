# Clean Core Service

Projeto SAP CAP com arquitetura de Shell App + Apps Fiori desacoplados.

## 🏗️ Arquitetura

Este projeto segue a **Opção 3 – Shell App + Apps Fiori desacoplados (RECOMENDADO)** ⭐⭐⭐

Essa é a arquitetura usada pela SAP em apps grandes (My Inbox, Build Work Zone, etc.)

### Conceito

O projeto é composto por:

#### 1️⃣ Shell Application (App Contêiner)

Localizado em `app/shell/`, responsável por:

- **Header global** - Interface unificada
- **Menu lateral** - Navegação entre apps
- **Layout base** - Estrutura comum
- **Navegação entre apps** - Gerenciamento de rotas
- **Autenticação** - Controle de acesso
- **Contexto global** - Estado compartilhado

👉 Um único app UI5 que funciona como contêiner

#### 2️⃣ Apps Fiori independentes (micro frontends)

Cada item do menu é um Fiori App separado:

- `app001-home/` - Tela inicial
- `app002-compliance-radar/` - Radar de conformidade
- `app003-clean-core-kpis/` - KPIs do Clean Core

Cada app possui:
- `manifest.json` próprio
- `Component.js` independente
- Testes unitários isolados
- Desenvolvimento e testes independentes

👉 Vários apps UI5 pequenos e desacoplados

#### 3️⃣ Integração via UI5 Component + Router

O Shell carrega os apps dinamicamente, sem iframe, através de:
- Configuração de rotas no `manifest.json`
- Targets do tipo `Component`
- Navegação assíncrona

### 📁 Estrutura do Projeto

```
app/
 ├─ shell/                  # App principal (header + menu)
 │   ├─ webapp/
 │   │   ├─ view/
 │   │   ├─ controller/
 │   │   ├─ Component.js
 │   │   └─ manifest.json
 │
 ├─ app001-home/            # App funcional - Home
 ├─ app002-compliance-radar/  # App funcional - Compliance
 ├─ app003-clean-core-kpis/   # App funcional - KPIs
 │
db/                         # Modelos de dados
 ├─ schema.cds
 ├─ data/
 │
srv/                        # Serviços CAP
 ├─ cat-service.cds
 ├─ admin-service.cds
```

👉 Cada `app00X` é um Fiori App legítimo e independente

### 🧭 Navegação

A navegação é configurada no **Shell** via `manifest.json`:

```json
"routing": {
  "routes": [
    {
      "pattern": "",
      "name": "home",
      "target": "home"
    },
    {
      "pattern": "app001",
      "name": "app001",
      "target": "app001"
    }
  ],
  "targets": {
    "app001": {
      "type": "Component",
      "name": "com.sap.app001",
      "options": {
        "async": true
      }
    }
  }
}
```

📌 O menu lateral apenas muda a rota, o shell permanece ativo.

### 🎨 Componentes Reutilizáveis

#### Header
- Criado uma vez no Shell
- Exemplo: `sap.f.DynamicPage` ou `ShellBar`

#### Menu Lateral
- Utiliza `sap.tnt.SideNavigation`
- Configuração via JSON ou serviço CAP

```json
{
  "items": [
    { "key": "app001", "text": "Home" },
    { "key": "app002", "text": "Compliance Radar" },
    { "key": "app003", "text": "Clean Core KPIs" }
  ]
}
```

### 🧪 Testes Unitários

**Vantagem desta arquitetura:**

Cada app possui estrutura própria de testes:
- `webapp/test/unit/` - Testes QUnit
- `webapp/test/integration/` - Testes OPA5 (opcional)

**Permite testar:**
- ✅ App isolado
- ✅ Serviços mockados
- ✅ Sem depender do shell

**Shell também possui testes:**
- Teste de navegação
- Teste de menu
- Teste de layout

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js (v18 ou superior)
- npm
- SAP CAP SDK (`@sap/cds-dk`)

### Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd clean-core-service

# Instale as dependências
npm install
```

### Executar em Desenvolvimento

#### Opção 1: Usando CDS Watch (Recomendado)

```bash
# Inicia o servidor CAP com hot-reload
cds watch
```

Ou via VS Code:
- **Terminal** > **Run Task** > **cds watch**

#### Opção 2: Usando CDS Serve

```bash
# Inicia o servidor CAP com mocks
cds serve --with-mocks --in-memory
```

### Acessar a Aplicação

Após iniciar o servidor, acesse:

- **Shell App (App Principal)**: http://localhost:4004/shell/webapp/index.html
- **App001 - Home**: http://localhost:4004/app001-home/webapp/index.html
- **App002 - Compliance Radar**: http://localhost:4004/app002-compliance-radar/webapp/index.html
- **App003 - Clean Core KPIs**: http://localhost:4004/app003-clean-core-kpis/webapp/index.html

**Serviços CAP:**
- **CAP Index**: http://localhost:4004/
- **Catalog Service**: http://localhost:4004/catalog
- **Admin Service**: http://localhost:4004/admin

### Estrutura de Arquivos

File or Folder | Purpose
---------|----------
`app/shell/` | Shell Application (contêiner principal)
`app/app001-home/` | App Fiori - Home
`app/app002-compliance-radar/` | App Fiori - Compliance Radar
`app/app003-clean-core-kpis/` | App Fiori - Clean Core KPIs
`db/` | Modelos de domínio e dados
`srv/` | Modelos de serviço e código
`_i18n/` | Arquivos de internacionalização
`package.json` | Metadados e configuração do projeto

## 🚢 Deploy no BTP

Para deploy no SAP Business Technology Platform, utilize `mta.yaml`:

```yaml
modules:
  - name: shell
    type: html5

  - name: app001-home
    type: html5

  - name: app002-compliance-radar
    type: html5

  - name: app003-clean-core-kpis
    type: html5
```

👉 O Launchpad aponta para o **Shell**, não para os apps individuais.

## 📚 Learn More

- [SAP CAP Documentation](https://cap.cloud.sap/docs/get-started/)
- [UI5 Documentation](https://ui5.sap.com/)
- [Fiori Design Guidelines](https://experience.sap.com/fiori-design-web/)
