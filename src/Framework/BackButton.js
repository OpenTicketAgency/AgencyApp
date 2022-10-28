
import * as Craft from "@craftkit/craft-uikit";
import * as StickyHeaderNavi from "@craftkit/craft-widget-stickyheadernavi";
Craft.usePackage(StickyHeaderNavi);

export class BackButton extends Craft.Widget.StickyHeaderNavi.BackButton {

    style(componentId) {
        return super.style(componentId) + `
            :host {
                display: none;
                float: none;
                position: absolute;
                bottom: 0px;
                left: 0px;
                padding-top: 0px;
                padding-left: 0px;
                padding-right: 0px;
            }
            .root {
                /*margin-top: 41px;*/ /* 44px - 3px */
                color: #096328;
            }
        `;
    }

};
