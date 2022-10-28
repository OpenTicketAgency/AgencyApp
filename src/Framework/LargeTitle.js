
import * as Craft from "@craftkit/craft-uikit";

import { Title } from "./Title.js";
import { TitleText } from "./TitleText.js";
import { WalletConnectButton } from "../PageElements/WalletConnectButton.js";

export class LargeTitle extends Title {

    constructor(options) {
        super(options);
        this.packagename = "OpenTicketAgency.Framework.LargeTitle";
        this.views = {
            title: new TitleText({
                text: "OpenTicketAgency",
            }),
            wallet: new WalletConnectButton({}),
            menuArea: null,
        };
    }

    viewDidLoad(callback) {
        super.viewDidLoad();
        this.views.menuArea = this.shadow.getElementById("menu");
        if (callback) { callback(); }
    }

    viewWillAppear(callback) {
        this.appendView({
            id: "#title",
            component: this.views.title
        });
        this.appendView({
            id: "#wallet",
            component: this.views.wallet
        });
        // teke over the menu
        this.appendView({
            id: "#menu",
            component: this.viewController.header.views.menu
        });
        if (callback) { callback(); }
    }

    setTitle(title) {
        this.views.title.setText(title);
    }

    openTopPage() {
        Craft.Core.Context.getRootViewController().enterTopPage({ path: "/" });
    }

    slideOutTitle() {
        this.views.menuArea.classList.add("slide_out");
        this.views.menuArea.classList.remove("slide_in");
    }

    slideInTitle() {
        this.views.menuArea.classList.add("slide_in");
        this.views.menuArea.classList.remove("slide_out");
    }

    style(componentId) {
        return super.style(componentId) + `
            * { box-sizing:border-box; }
            .root {
                height: 88px; /* 44+44 */
            } 
            #head {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                height: 44px;
            }
            #title {
                overflow-x: scroll;
                overflow-y: hidden;
            }
            #wallet {
                display: flex;
                justify-content: flex-end;
            }
            #menu {
                height: 44px;
                overflow-x: scroll;
                overflow-y: hidden;
            }
        `;
    }

    template(componentId) {
        return `
            <div id="root" class="root">
                <div id="head">
                    <div id="title" onclick="${componentId}.openTopPage()"></div>
                    <div id="wallet"></div>
                </div>
                <div id="menu"></div>
            </div>
        `;
    }

}
