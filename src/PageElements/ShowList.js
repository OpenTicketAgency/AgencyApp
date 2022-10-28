
import * as Craft from "@craftkit/craft-uikit";

export class ShowList extends Craft.UI.View {

    constructor(options) {
        super(options);
        this.packagename = "OpenTicketAgency.PageElements.ShowList";
    }

    clear() {
        this.root.innerHTML = "";
    }

    style(componentId) {
        return super.style(componentId) + `
            .root {
                margin-top: 22px;
                margin-left: 0px;
                color: #096328;
            }
        `;
    }

    template(componentId) {
        return `
            <div id="root" class="root">
                (no shows)
            </div>
        `;
    }
};
