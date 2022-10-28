
import * as Craft from "@craftkit/craft-uikit";

export class Title extends Craft.UI.View {

    constructor(options) {
        super(options);
        this.packagename = "OpenTicketAgency.Framework.Title";
        this.views = {};
    }

    viewDidLoad(callback) {
        super.viewDidLoad();
        this.title = this.shadow.getElementById("title");
        if (callback) { callback(); }
    }

    setTitle(title) {
        this.shadow.getElementById("title").innerHTML = title;
    }

    slideOutTitle() {
        this.title.classList.add("slide_out");
        this.title.classList.remove("slide_in");
    }

    slideInTitle() {
        this.title.classList.add("slide_in");
        this.title.classList.remove("slide_out");
    }

    style(componentId) {
        return super.style(componentId) + `
            * { box-sizing:border-box; }
            .root {
                padding: 0px 11px;
                color:black;
            }
            .slide_out {
                transition: 0.05s;
                margin-left: 44px;
                width: calc( 100vw - 44px );
            }
            .slide_in {
                transition: 0.05s;
                margin-left: 0px;
                width: 100vw;
            }
        `;
    }

    template(componentId) {
        return `
            <div id="root" class="root">
                <div id="title">
                    OpenTicketAgency Deploy
                </div>
            </div>
        `;
    }
}
