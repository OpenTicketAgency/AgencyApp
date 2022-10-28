
import * as Craft from '@craftkit/craft-uikit';

export class MenuButton extends Craft.UI.View {

    constructor(options) {
        super();
        this.packagename = 'OpenTicketAgency.Framework.MenuButton';
        this.data = {
            label: options.label,
            action: options.action // function
        };
    }

    mark() {
        this.root.classList.add("mark");
    }

    unmark() {
        this.root.classList.remove("mark");
    }

    style() {
        return `
			:host { box-sizing:border-box; }
			.root {
				box-sizing:border-box;
				padding: 0px 11px;
				cursor: pointer;
				-webkit-tap-highlight-color:rgba(0,0,0,0);
				-webkit-touch-callout: none;
			}
			.root:active {
				background-color: #d0d0d0;
			}
			.mark {
				box-sizing:border-box;
				font-weight: bold;
				border-width: 0px 0px 4px 0px;
				border-style: solid;
				border-color: #d8a4a4;
			}
		`;
    }

    template(componentId) {
        return `
			<div id="root" class="root" onclick="${componentId}.data.action();" ontouchstart="">
                ${this.data.label}
            </div>
		`;
    }
}
