
import * as Craft from "@craftkit/craft-uikit";

export class TitleText extends Craft.UI.View {

    constructor(options) {
        super(options);
        this.packagename = "OpenTicketAgency.Framework.TitleText";
        this.data = {
            text: options.text
        };
    }

    style(componentId) {
        return super.style(componentId) + `
            * { box-sizing:border-box; }
            .root {
                height: 44px;
            }
            #title {
                margin: 0;
                padding: 0;
                font-size: 22px;
                line-height: 44px;
                color: #096328;
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            }
        `;
    }

    template(componentId) {
        return `
            <div id="root" class="root">
                <h1 id="title">${this.data.text}</h1>
            </div>
        `;
    }

}
