
import * as Craft from "@craftkit/craft-uikit";

export class Agency extends Craft.UI.View {

    /**
     * Constructor of Agency
     * 
     * @param {Object} options - Options for the ticket
     * 
     */
    constructor(options) {
        super();
        this.packagename = "OpenTicketAgency.PageElements.Agency";
        this.data = {
            title: options.title,
            description: options.description,
            image: options.image
        };
        this.views = {};
    }

    clear() {
        this.root.innerHTML = "";
    }

    style(componentId) {
        return super.style(componentId) + `
            .root {
                color: #096328;
                margin-top: 11px;
            }
            a {
                text-decoration: none;
            }
            .title {
                font-size: 16px;
            }
            .address {
                font-size: 12px;
            }
        `;
    }

    template(componentId) {
        return `
            <div id="root" class="root">
                <div class="title">${this.data.title}</div>
                <div class="description">${this.data.description}</div>
                <div class="image">${this.data.image}</div>
            </div>
        `;
    }
};
