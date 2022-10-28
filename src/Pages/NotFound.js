
import * as Craft from "@craftkit/craft-uikit";
import * as StickyHeaderNavi from "@craftkit/craft-widget-stickyheadernavi";
import * as Toast from "@craftkit/craft-widget-toast";
Craft.usePackage(StickyHeaderNavi);
Craft.usePackage(Toast);

export class NotFound extends Craft.Widget.StickyHeaderNavi.Page {

    constructor(options) {
        super(options || {});
        this.packagename = "OpenTicketAgency.Pages.NotFound";
        this.data = {
            mark: "notfound"
        };
        this.views = {};
        this.path = "NotFound";
    }

    style(componentId) {
        return `
            * { 
                box-sizing:border-box;
            }
            .root {
                margin-top: 22px;
            }
            .container {
                margin-top: 22px;
                margin-left: 22px;
                margin-right: 22px;
            }
        `;
    }

    template(componentId) {
        return `
            <div id="root" class="root">
                <div class="container">
                    Not Found
                </div>
            </div>
        `;
    }

}

