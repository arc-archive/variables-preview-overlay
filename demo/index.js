
import { html } from 'lit-html';
import { ArcDemoPage } from '@advanced-rest-client/arc-demo-helper/ArcDemoPage.js';
import '@advanced-rest-client/arc-demo-helper/arc-interactive-demo.js';
import '@advanced-rest-client/arc-models/variables-model.js';
import '@anypoint-web-components/anypoint-button/anypoint-button.js';
import '@advanced-rest-client/variables-manager/variables-manager.js';
import '@advanced-rest-client/variables-editor/variables-editor.js';
import '../variables-preview-overlay.js';

class DemoPage extends ArcDemoPage {
  constructor() {
    super();
    this.initObservableProperties([
      'compatibility'
    ]);
    this._componentName = 'variables-preview-overlay';
    this.demoStates = ['Material design', 'Anypoint'];

    this._demoStateHandler = this._demoStateHandler.bind(this);
    this._toggleMainOption = this._toggleMainOption.bind(this);

    this.systemVariables = {
      CHROME_DESKTOP: "Electron.desktop",
      CLUTTER_IM_MODULE: "xim",
      COLORTERM: "truecolor",
      GJS_DEBUG_OUTPUT: "stderr",
      GJS_DEBUG_TOPICS: "JS ERROR;JS LOG",
      GNOME_DESKTOP_SESSION_ID: "this-is-deprecated",
      GNOME_SHELL_SESSION_MODE: "ubuntu",
      GNOME_TERMINAL_SCREEN: "/org/gnome/Terminal/screen/f607eae9_d507_4a86_9d39_968679c41855",
      GNOME_TERMINAL_SERVICE: ":1.101",
      GPG_AGENT_INFO: "/run/user/1000/gnupg/S.gpg-agent:0:1",
      GPG_TTY: "/dev/pts/0",
      GTK_IM_MODULE: "ibus",
      GTK_MODULES: "gail:atk-bridge",
      HOME: "/home/pawel",
      IM_CONFIG_PHASE: "2",
      INIT_CWD: "/home/pawel/workspace/advanced-rest-client/arc-electron",
      LANG: "en_GB.UTF-8",
      LANGUAGE: "en_GB:en",
      LC_ADDRESS: "en_US.UTF-8",
      LC_IDENTIFICATION: "en_US.UTF-8",
      LC_MEASUREMENT: "en_US.UTF-8",
      LC_MONETARY: "en_US.UTF-8",
      LC_NAME: "en_US.UTF-8",
      LC_NUMERIC: "en_US.UTF-8",
      LC_PAPER: "en_US.UTF-8",
      LC_TELEPHONE: "en_US.UTF-8",
      LC_TIME: "en_US.UTF-8",
      LESSCLOSE: "/usr/bin/lesspipe %s %s",
      LESSOPEN: "| /usr/bin/lesspipe %s",
      LOGNAME: "pawel",
      MANDATORY_PATH: "/usr/share/gconf/ubuntu.mandatory.path",
      NODE: "/usr/bin/node",
      NO_AT_BRIDGE: "1",
      OLDPWD: "/home/pawel",
      PAPERSIZE: "letter"
    };
  }

  _toggleMainOption(e) {
    const { name, checked } = e.target;
    this[name] = checked;
  }

  _demoStateHandler(e) {
    const state = e.detail.value;
    this.compatibility = state === 1;
  }

  _openOverlay() {
    document.querySelector('variables-preview-overlay').opened = true;
  }

  _demoTemplate() {
    const {
      demoStates,
      darkThemeActive,
      compatibility
    } = this;
    return html`
      <section class="documentation-section">
        <h3>Interactive demo</h3>
        <p>
          This demo lets you preview the variables editor element with various
          configuration options.
        </p>

        <arc-interactive-demo
          .states="${demoStates}"
          @state-chanegd="${this._demoStateHandler}"
          ?dark="${darkThemeActive}"
        >
          <anypoint-button
            slot="content"
            ?compatibility="${compatibility}"
            @click="${this._openOverlay}"
            aria-label="Activate to open variables editor">Open overlay</anypoint-button>

        </arc-interactive-demo>

        <variables-preview-overlay
          dynamicalign
          horizontalalign="auto"
          verticalalign="auto"
          maskedvalues
          ?compatibility="${compatibility}"
        ></variables-preview-overlay>
      </section>
    `;
  }

  contentTemplate() {
    const {
      systemVariables
    } = this;
    return html`
      <variables-manager .systemVariables="${systemVariables}"></variables-manager>
      <variables-editor></variables-editor>
      <variables-model></variables-model>

      <h2>Variables preview overlay</h2>
      ${this._demoTemplate()}
    `;
  }
}

const instance = new DemoPage();
instance.render();
window._demo = instance;
