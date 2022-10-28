
import * as Craft from "@craftkit/craft-uikit";
import * as StickyHeaderNavi from "@craftkit/craft-widget-stickyheadernavi";
import * as Toast from "@craftkit/craft-widget-toast";
Craft.usePackage(StickyHeaderNavi);
Craft.usePackage(Toast);

export class Agency extends Craft.Widget.StickyHeaderNavi.Page {

    constructor(options) {
        super(options || {});
        this.packagename = "OpenTicketAgency.Pages.Agency";
        this.data = {
            wallectConnectedListener: null,
            wallectDisconnectedListener: null
        };
        this.views = {
            toast: null
        };
        this.path = `${OpenTicketAgency.Context.agencyId}/agency`;
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

        this.views.toast = new Craft.Widget.Toast();
        console.log(this.views.toast);
        this.appendView(this.views.toast);

        if (callback) { callback(); }
    }

    viewWillAppear(callback) {
        this.viewController.header.views.menu.mark("agency");

        this.updateUpdateButton();
        this.showAgency();

        if (callback) { callback(); }
    }

    walletStateChanged() {
        this.updateUpdateButton();
        this.showAgency();
    }

    async showAgency() {
        try {
            if (!OpenTicketAgency.Context.connectedWallet) return;
            if (!OpenTicketAgency.Context.connectedAgencyContract) return;
            let title = await OpenTicketAgency.Context.connectedAgencyContract.getContract().title();
            let description = await OpenTicketAgency.Context.connectedAgencyContract.getContract().description();
            let image = await OpenTicketAgency.Context.connectedAgencyContract.getContract().image();

            this.shadow.getElementById("title").value = title;
            this.shadow.getElementById("description").value = description;
            this.shadow.getElementById("image").value = image;
        } catch (error) {
            console.log("failed to load agency");
            console.log(error);
        }
    }

    async updateUpdateButton() {
        if (!OpenTicketAgency.Context.connectedAgencyContract) {
            console.log("agency contract is not connected");
            this.shadow.getElementById("status").innerHTML = "Agency contract is not connected";
            return;
        }
        if (!OpenTicketAgency.Context.connectedWallet) {
            console.log("wallet is not connected");
            this.shadow.getElementById("status").innerHTML = "You need to connect your wallet";
            this.shadow.getElementById("updateButton").disabled = true;
            return;
        } else {
            this.shadow.getElementById("status").innerHTML = "Ready to edit agency. Fill in the form above and click the button if you want to update your agency info.";
            this.shadow.getElementById("updateButton").disabled = false;
            return;
        }
    }

    async updateAgency() {
        try {
            if (!OpenTicketAgency.Context.connectedWallet) return;

            let updateAgencyTxn = await OpenTicketAgency.Context.connectedAgencyContract.getContract().createAgency(
                this.shadow.getElementById("title").value,
                this.shadow.getElementById("description").value,
                this.shadow.getElementById("image").value
            );

            this.views.toast.show({
                title: "Update your agency",
                message: "Please wait for the transaction to be confirmed",
            });

            await updateAgencyTxn.wait();
            console.log("updateAgencyTxn: ");
            console.log(updateAgencyTxn);

            this.views.toast.show({
                title: "Agency updated",
                message: "Your agency has been updated",
            });

            OpenTicketAgency.Context.Web3.provider.once("block", () => {
                this.showAgency();
            });
        } catch (error) {
            console.log("failed to update agency");
            console.log(error);
            this.views.toast.show({
                title: "Failed to update agency",
                message: "Please try again later : " + error.message,
            });
        }
    }

    style(componentId) {
        return `
            * { 
                box-sizing:border-box;
            }
            .root {
                margin-top: 22px;
            }
            .container {
                margin-top: 22px;
                margin-left: 22px;
                margin-right: 22px;
            }
            .title {
                margin-top: 22px;
                font-size: 18px;
                font-weight: bold;
            }
            .element {
                margin-top: 22px;
            }
            .element label {
                font-weight: bold;
            }
            .element input {
                width : 100%;
                line-height: 2em;
            }
            .element textarea {
                width : 100%;
                line-height: 1.5em;
            }
            #updateButton {
                width : 100%;
                font-size: 16px;
                font-weight: bold;
                line-height: 2em;
                padding-left: 22px;
                padding-right: 22px;
            }
            #agency {
                margin-top: 22px;
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
                <div class="container">
                    <div class="title">
                        Agency info
                    </div>
                    <div class="element">
                        <label for="title">Title : </label><br>
                        <input type="text" id="title" name="title" placeholder="Title">
                    </div>
                    <div class="element">
                        <label for="description">Description : </label><br>
                        <textarea id="description" name="description" placeholder="Description" rows="10"></textarea>
                    </div>
                    <div class="element">
                        <label for="image">Image : </label><br>
                        <input type="text" id="image" name="image" placeholder="Image">
                    </div>
                    <div class="element">
                        <button id="updateButton" onclick="${componentId}.updateAgency()">Update</button>
                    </div>

                    <div id="status"></div>
                </div>
            </div>
        `;
    }

}

