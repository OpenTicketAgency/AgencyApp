
import * as Craft from "@craftkit/craft-uikit";

export class Footer extends Craft.UI.View {

    style(componentId) {
        return super.style(componentId) + `
            .root {
                padding: 11px;
                font-size: 12px;
                color: #666;
                border-style: dotted;
                border-width: 0.5px 0px 0px 0px;
                border-color: #ccc;
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            }
            #title {
                margin-bottom: 22px;
                font-weight: bold;
            }
            #container {
                padding: 22px;
            }
            #whatis {
                font-size: 12px;
                line-height: 24px;
            }
            #howto {
                font-size: 12px;
                line-height: 24px;
            }
            #contact {
                font-size: 12px;
                line-height: 24px;
            }
            p {
                padding: 11px 0px;
            }
        `;
    }

    template(componentId) {
        // TODO: use OpenTicketAgency.Dic
        return `
            <div id="root" class="root">
                <div id="container">
                    <div id="title">
                        Five Years Ahead Inc.
                    </div>
                    <div id="whatis">
                        About Ticket Forge
                    </div>
                    <div id="howto">
                        How to use
                    </div>
                    <div id="contact">
                        Contact
                    </div>
                </div>
            </div>
        `;
    }
}
