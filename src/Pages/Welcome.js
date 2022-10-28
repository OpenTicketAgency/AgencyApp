
import * as Craft from "@craftkit/craft-uikit";
import * as StickyHeaderNavi from "@craftkit/craft-widget-stickyheadernavi";
import * as Toast from "@craftkit/craft-widget-toast";
Craft.usePackage(StickyHeaderNavi);
Craft.usePackage(Toast);

export class Welcome extends Craft.Widget.StickyHeaderNavi.Page {

    constructor(options) {
        super(options || {});
        this.packagename = "OpenTicketAgency.Pages.Welcome";
        this.data = {
            mark: "welcome"
        };
        this.views = {};
        this.path = `${OpenTicketAgency.Context.agencyId}/welcome`;
    }

    viewWillAppear(callback) {
        this.viewController.header.views.menu.mark("welcome");
        if (callback) { callback(); }
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
            .container h1 {
                margin-top: 22px;
                font-size: 18px;
                font-weight: bold;
            }
        `;
    }

    template(componentId) {
        return `
            <div id="root" class="root">
                <div class="container">
                    <h1>Welcome</h1>
                    <p>
                        Here you can manage your Agency and its Shows information.
                    </p>
                </div>
            </div>
        `;
    }

}

