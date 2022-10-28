
import * as Craft from "@craftkit/craft-uikit";

export class Seat extends Craft.UI.View {

    constructor(options) {
        super();
        this.packagename = "OpenTicketAgency.PageElements.Seat";
        this.data = {
        };
        this.views = {};
    }

    style(componentId) {
        return super.style(componentId) + `
            .root {
                color: #096328;
                margin-top: 11px;
            }
        `;
    }

    template(componentId) {
        return `
            <div id="root" class="root">
            </div>
        `;
    }
};
