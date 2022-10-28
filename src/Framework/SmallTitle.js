
import * as Craft from "@craftkit/craft-uikit";

import { Menu } from "./Menu.js";
import { Title } from "./Title.js";

export class SmallTitle extends Title {

    constructor(options) {
        super(options);
        this.packagename = 'OpenTicketAgency.Framework.SmallTitle';
        this.views = {
            menu: null,
        };
    }

    viewWillAppear(callback) {
        super.viewWillAppear();
        // teke over the menu
        this.appendView({
            id: "#menu",
            component: this.viewController.header.views.menu
        });
        if (callback) { callback(); }
    }

    slideOutTitle() {
        this.root.classList.add("slide_out");
        this.root.classList.remove("slide_in");
    }

    slideInTitle() {
        this.root.classList.add("slide_in");
        this.root.classList.remove("slide_out");
    }

    openTopPage() {
        Craft.Core.Context.getRootViewController().enterTopPage({ path: "/" });
    }

    style(componentId) {
        return super.style(componentId) + `
			* { box-sizing:border-box; }
			.root {
				display: flex;
				flex-direction: column;
				justify-content: left;
				height: 44px; /* 44+0 */
			}
			.menu {
				overflow-x: scroll;
				overflow-y: hidden;
			}
		`;
    }

    template(componentId) {
        return `
			<div id="root" class="root">
				<div id="back" class="back"></div>
				<div id="menu" class="menu"></div>
			</div>
		`;
    }

}
