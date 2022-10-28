
import * as Craft from "@craftkit/craft-uikit";

export class Spacer extends Craft.UI.View {

    /**
     * Spacer constructor
     * 
     * @param {Object} options - options
     * @param {Object} options.width - :host width
     * @param {String} options.height - :host height
     */
    constructor(options) {
        super(options);
        this.packagename = 'OpenTicketAgency.Framework.Spacer';
        this.data = options;
    }

    style(componentId) {
        return super.style(componentId) + `
            :host {
                width: ${this.data.width};
                height: ${this.data.height};
            }
        `;
    }

}
