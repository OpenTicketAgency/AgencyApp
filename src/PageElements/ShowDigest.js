
import * as Craft from "@craftkit/craft-uikit";

export class ShowDigest extends Craft.UI.View {

    constructor(options) {
        super();
        this.packagename = "OpenTicketAgency.PageElements.ShowDigest";
        this.data = {
            title: options.title,
            description: options.description,
            image: options.image,
            date: options.date,
            openingTime: options.openingTime,
            closingTime: options.closingTime
        };
        this.views = {};
    }

    style(componentId) {
        return `
            * { 
                box-sizing:border-box;
            }
            .root {
                margin-top: 22px;
            }
            .title {
                margin-right: 10px;
                font-weight: bold;
            }
            .title::before {
                content: "✨";
                margin-right: 5px;
            }
            .date {
                margin-top: 5px;
                margin-left: 40px;
                margin-right: 10px;
            }
            .description {
                margin-top: 5px;
                margin-left: 40px;
                margin-right: 10px;
                font-size: 12px;
            }
        `;
    }

    template(componentId) {
        return `
            <div id="root" class="root">
                <div class="title">
                    ${this.data.title}
                </div>
                <div class="date">
                    ${this.data.date} ${this.data.openingTime} - ${this.data.closingTime}
                </div>
                <div class="description">
                    Description : ${this.data.description}
                </div>
            </div>
        `;
    }

};
