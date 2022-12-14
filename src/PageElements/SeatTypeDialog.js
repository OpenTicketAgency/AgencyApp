
import * as Craft from '@craftkit/craft-uikit';

import { Utils } from '../Utils.js';

export class SeatTypeDialog extends Craft.UI.View {

    constructor(options) {
        super();
        this.packagename = 'OpenTicketAgency.PageElements.SeatTypeDialog';
        this.data = {
            closeHandler: options.closeHandler,
            closeHandlerId: null, // defined in viewDidLoad with this.componentId
        };
    }

    viewDidLoad(callback) {
        this.data.closeHandlerId = this.componentId + '_close_shortcut';
        if (callback) { callback(); }
    }

    viewWillAppear(callback) {
        Craft.Core.KeyboardManager.register(this.data.closeHandlerId, Utils.Constants.KEYCODE.ESC, () => {
            this.closeDialog();
        });
        if (callback) { callback(); }
    }

    viewWillDisappear(callback) {
        Craft.Core.KeyboardManager.remove(this.data.closeHandlerId);
        if (callback) { callback(); }
    }

    closeDialog() {
        this.closeHandler();
    }

    style(componentId) {
        return `
			.root {
				box-sizing: border-box;
				width: 100%;
				height: 100%;
				overflow-x: hidden;
				overflow-y: hidden;
			}
			.container {
				box-sizing: border-box;
				width: 80%;
				padding-left: 44px;
				padding-right: 44px;
				padding-top: 22px;
				padding-bottom: 22px;
				margin-left: auto;
				margin-right: auto;
				margin-top: 66px;
				border-radius: 10px;
				background-color: #fff;
				box-shadow: 0 1px 10px rgba(0, 0, 0, 0.5);
				overflow-x: hidden;
				overflow-y: hidden;
				font-size : 18px;
			}
			.btn {
				box-sizing : border-box;
				display : block;
				width : 100%;
				height : 44px;
				margin-top : 32px;
				margin-bottom : 5px;
				margin-right : 5px;
				border-radius : 5px;
				font-size : 18px;
				color : #555;
				line-height : 44px;
				text-align : center;
				background-color : #e4e4e4;
				border-color : #d6d6d6;
				border-width : 1px;
				border-style : solid;
				cursor : pointer;
			}
			.btn:hover {
				background-color : #d1d1d1;
			}
			@media screen and (max-width:600px){
				.container {
					width: 95%;
					padding-left: 11px;
					padding-right: 11px;
					font-size : 14px;
				}
				.btn {
					font-size : 14px;
				}
			}
		`;
    }

    template(componentId) {
        return `
			<div class="root">
				<div class="container">
					You are going to leave demo page.<br>
					<div style="word-break:break-all;margin-top:11px;">
						<a href="${this.url}">${this.url}</a>
					</div>
					<div class="btn" onclick="${componentId}.closeDialog();">Cancel</div>
				</div>
			</div>
		`;
    }

}
