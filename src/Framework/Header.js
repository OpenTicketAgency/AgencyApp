
import * as Craft from "@craftkit/craft-uikit";
import * as StickyHeaderNavi from "@craftkit/craft-widget-stickyheadernavi";
Craft.usePackage(StickyHeaderNavi);

import { BackButton } from "./BackButton.js";

export class Header extends Craft.Widget.StickyHeaderNavi.Header {

    constructor(options) {
        super(options);
        this.views = {
            backbtn: new BackButton(),
            menu: options.menu
        };
    }

    /**
     * override to support parcial(only title element) slide in/out behaviour
     */
    onAppearBackButton() {
        this.large.slideOutTitle();
        this.small.slideOutTitle();
    }

    /**
     * override to support parcial(only title element) slide in/out behaviour
     */
    onDisappearBackButton() {
        this.large.slideInTitle();
        this.small.slideInTitle();
    }

    deployCustomBackBtn() {
        this.appendView(this.views.backbtn);
        this.viewController.backbtn = this.views.backbtn;
    }

    style(componentId) {
        return super.style(componentId) + `
            :host{
                box-shadow: 0px 2px 0px rgba(128,128,128,.25);
                background-color: rgba(255,255,255,.5);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
            .root{ 
                box-sizing: border-box; 
            }
        `;
    }

}
