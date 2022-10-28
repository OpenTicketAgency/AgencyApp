
import * as Craft from "@craftkit/craft-uikit";

export class ShowEditor extends Craft.UI.View {

    constructor(options) {
        super(options);
        this.packagename = "OpenTicketAgency.PageElements.ShowEditor";
        this.data = {
            wallectConnectedListener: null,
            wallectDisconnectedListener: null,
            saveHandler: options.saveHandler,
            closeHandler: options.closeHandler
        };
        this.views = {};
    }

    viewDidLoad(callback) {
        this.data.wallectConnectedListener = Craft.Core.NotificationCenter.listen(
            "OpenTicketAgency.Context.walletConnected",
            this.walletStateChanged.bind(this)
        );
        this.data.wallectDisconnectedListener = Craft.Core.NotificationCenter.listen(
            "OpenTicketAgency.Context.walletDisconnected",
            this.walletStateChanged.bind(this)
        );
        if (callback) { callback(); }
    }

    viewWillAppear(callback) {
        this.updateSaveButton();
        if (callback) { callback(); }
    }

    walletStateChanged() {
        // close the modal if the wallet state changed
        this.data.closeHandler();
    }

    discard() {
        this.data.closeHandler();
    }

    async saveShow() {
        this.data.saveHandler({
            title: this.shadow.getElementById("title").value,
            description: this.shadow.getElementById("description").value,
            image: this.shadow.getElementById("image").value,
            date: this.shadow.getElementById("date").value,
            openingTime: this.shadow.getElementById("openingTime").value,
            closingTime: this.shadow.getElementById("closingTime").value
        });
    }

    async updateSaveButton() {
        if (!OpenTicketAgency.Context.connectedAgencyContract) {
            console.log("contract is not connected");
            this.shadow.getElementById("status").innerHTML = "Agency contract is not connected";
            return;
        }
        if (!OpenTicketAgency.Context.connectedWallet) {
            console.log("wallet is not connected");
            this.shadow.getElementById("status").innerHTML = "You need to connect your wallet";
            this.shadow.getElementById("saveButton").disabled = true;
            return;
        } else {
            this.shadow.getElementById("status").innerHTML = "Ready to create show.";
            this.shadow.getElementById("saveButton").disabled = false;
            return;
        }
    }

    style(componentId) {
        return super.style(componentId) + `
            * { 
                box-sizing:border-box;
            }
            .root {
                margin-top: 22px;
                background-color: #fff;
            }
            #info {
                margin-top: 22px;
                margin-left: 22px;
                margin-right: 22px;
            }
            .form {
                margin-top: 22px;
                margin-left: 22px;
                margin-right: 22px;
            }
            .formtitle {
                margin-top: 22px;
                font-size: 18px;
                font-weight: bold;
            }
            .formelement {
                margin-top: 22px;
            }
            .formelement label {
                font-weight: bold;
            }
            .formelement input {
                width : 100%;
                line-height: 2em;
            }
            .formelement textarea {
                width : 100%;
                line-height: 1.5em;
            }
            .formelement button {
                width : 100%;
                font-size: 16px;
                font-weight: bold;
                line-height: 2em;
                padding-left: 22px;
                padding-right: 22px;
            }
            #status {
                margin-top: 22px;
                color: red;
            }
        `;
    }

    template(componentId) {
        return `
            <div id="root" class="root">
                <div class="form">
                    <div class="formtitle">
                        Create new show
                    </div>
                    <div class="formelement">
                        <label for="title">Title : </label><br>
                        <input type="text" id="title" name="title" placeholder="Title">
                    </div>
                    <div class="formelement">
                        <label for="description">Description : </label><br>
                        <textarea id="description" name="description" placeholder="Description" rows="10"></textarea>
                    </div>
                    <div class="formelement">
                        <label for="image">Image : </label><br>
                        <input type="text" id="image" name="image" placeholder="Image">
                    </div>
                    <div class="formelement">
                        <label for="date">Date : </label><br>
                        <input type="date" id="date" name="date" placeholder="12/10 (reccomend ISO8601)">
                    </div>
                    <div class="formelement">
                        <label for="openingTime">Opening time : </label><br>
                        <input type="time" id="openingTime" name="openingTime" placeholder="15:00 (reccomend ISO8601)">
                    </div>
                    <div class="formelement">
                        <label for="closingTime">Closing time : </label><br>
                        <input type="time" id="closingTime" name="closingTime" placeholder="18:00 (reccomend ISO8601)">
                    </div>

                    <div id="status"></div>

                    <div class="formelement">
                        <button id="discardButton" onclick="${componentId}.discard()">Discard</button>
                    </div>
                    <div class="formelement">
                        <button id="saveButton" onclick="${componentId}.saveShow()">Save</button>
                    </div>
                </div>
            </div>
        `;
    }
};
