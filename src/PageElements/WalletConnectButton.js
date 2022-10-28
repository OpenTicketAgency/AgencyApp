
import * as Craft from "@craftkit/craft-uikit";

import { Wallet } from "../Models/Wallet.js";

export class WalletConnectButton extends Craft.UI.View {

    constructor(options) {
        super(options);
        this.packagename = "OpenTicketAgency.PageElements.WalletConnectButton";
        this.data = {
            wallet: new Wallet(),
            wallectConnectedListener: null,
            wallectDisconnectedListener: null
        };
        this.views = {};
    }

    viewDidLoad(callback) {
        this.data.wallectConnectedListener = Craft.Core.NotificationCenter.listen(
            "OpenTicketAgency.Context.walletConnected",
            this.updateButton.bind(this)
        );
        this.data.wallectDisconnectedListener = Craft.Core.NotificationCenter.listen(
            "OpenTicketAgency.Context.walletDisconnected",
            this.updateButton.bind(this)
        );
        if (callback) { callback(); }
    }

    toggle() {
        if (this.data.wallet.isConnected()) {
            this.data.wallet.disconnect();
        } else {
            this.data.wallet.connect();
        }
        this.updateButton();
    }

    updateButton() {
        if (this.data.wallet.isConnected()) {
            console.log("updateButton (wallet is connected)");
            this.shadow.getElementById("button").innerHTML = `
                Disconnect ${OpenTicketAgency.Utils.shortenAddress(this.data.wallet.data.account)}
            `;
        } else {
            console.log("updateButton (wallet is NOT connected)");
            this.shadow.getElementById("button").innerHTML = "Connect to Wallet";
        }
    }

    style(componentId) {
        return super.style(componentId) + `
            .root {
                box-sizing: border-box;
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            }
            #button {
                height: 22px;
                line-height: 22px;
                font-size: 16px;
                font-weight: bold;
                margin-left: auto;
                margin-right: auto;
                padding-left: 8px;
                padding-right: 8px;
                border-radius: 11px;
                color: #096328;
                text-align: center;
                background-color: #fff;
                border-color: #ccc;
                border-width: 1px;
                border-style: solid;
                cursor: pointer;
            }
        `;
    }

    template(componentId) {
        return `
            <div id="root" class="root">
                <div id="message"></div>
                <div id="button" onclick="${componentId}.toggle()">
                    Connect to Wallet
                </div>
            </div>
        `;
    }

}
