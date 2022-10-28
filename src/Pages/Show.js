
import * as Craft from "@craftkit/craft-uikit";
import * as StickyHeaderNavi from "@craftkit/craft-widget-stickyheadernavi";
import * as Toast from "@craftkit/craft-widget-toast";
Craft.usePackage(StickyHeaderNavi);
Craft.usePackage(Toast);

import { SeatTypes } from "../PageElements/SeatTypes.js";
import { Seat } from "../PageElements/Seat.js";

export class Show extends Craft.Widget.StickyHeaderNavi.Page {

    constructor(options) {
        super(options || {});
        this.packagename = "OpenTicketAgency.Pages.Show";
        this.data = {
            wallectConnectedListener: null,
            wallectDisconnectedListener: null,
            seatTypes: [],
            showAddress: options.showAddress
        };  
        this.views = {
            seatTypes: [],
            toast: null
        };
        this.path = `${OpenTicketAgency.Context.agencyId}/${OpenTicketAgency.Context.showId}/show`;
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

        this.views.seatTypes = new SeatTypes({});
        this.appendView({
            id: "seatTypes",
            component: this.views.seatTypes
        });

        this.views.toast = new Craft.Widget.Toast();
        console.log(this.views.toast);
        this.appendView(this.views.toast);

        if (callback) { callback(); }
    }

    viewWillAppear(callback) {
        this.viewController.header.views.menu.mark("show");

        this.updateCreateButton();
        this.updateShows();

        if (callback) { callback(); }
    }

    walletStateChanged() {
        this.updateCreateButton();
        this.updateShows();
    }

    showAddSeatTypesDialog(){
		let modalViewController = new Craft.UI.ModalViewController();
		modalViewController.loadView();
		
		let dialog = new SeatTypeDialog({
            // seatTypeId : seatTypeId,
			closeHandler : () => {
				modalViewController.hideContent( () => {
					dialog.unloadView();
					modalViewController.unloadView();
				});
			}
		});
		dialog.loadView();
		
		modalViewController.setContent(dialog);
		
		Craft.Core.Context.getRootViewController().appendView(modalViewController);
		modalViewController.showContent();
	}

    async updateCreateButton() {
        if (!OpenTicketAgency.Context.connectedShowContract) {
            console.log("Show contract is not connected");
            this.shadow.getElementById("status").innerHTML = "Contract is not connected";
            return;
        }
        if (!OpenTicketAgency.Context.connectedWallet) {
            console.log("wallet is not connected");
            this.shadow.getElementById("status").innerHTML = "You need to connect your wallet";
            this.shadow.getElementById("createButton").disabled = true;
            return;
        } else {
            this.shadow.getElementById("status").innerHTML = "Ready to create show.";
            this.shadow.getElementById("createButton").disabled = false;
            return;
        }
    }

    async updateShow() {
        try {
            if (!OpenTicketAgency.Context.connectedWallet) return;
            let shows = await OpenTicketAgency.Context.connectedAgencyContract.getContract().getShowsDigests();
            console.log(shows);

            for (let i = 0; i < this.data.showList.length; i++) {
                this.data.showList[i].unloadView();
            }
            this.data.showList = [];

            this.views.showList.clear();
            for (let i = 0; i < shows.length; i++) {
                let showDigestView = new ShowDigest({
                    title: shows[i].title,
                    description: shows[i].description,
                    date: shows[i].date,
                    openingTime: shows[i].openingTime,
                    closingTime: shows[i].closingTime
                });
                this.data.showList.push(showDigestView);
                this.views.showList.appendView(showDigestView);
            }
        } catch (error) {
            console.log("failed to load shows");
            console.log(error);
        }
    }

    async createShow() {
        try {
            if (!OpenTicketAgency.Context.connectedWallet) return;

            let createShowTxn = await OpenTicketAgency.Context.connectedAgencyContract.getContract().createShow(
                this.shadow.getElementById("title").value,
                this.shadow.getElementById("description").value,
                this.shadow.getElementById("image").value,
                this.shadow.getElementById("date").value,
                this.shadow.getElementById("openingTime").value,
                this.shadow.getElementById("closingTime").value
            );

            this.views.toast.show({
                title: "Create your show",
                message: "Please wait for the transaction to be confirmed",
            });

            await createShowTxn.wait();
            console.log("createShowTxn: ");
            console.log(createShowTxn);

            this.views.toast.show({
                title: "Show created",
                message: "Your show has been created",
            });

            OpenTicketAgency.Context.Web3.provider.once("block", () => {
                this.updateShows();
            });

            this.shadow.getElementById("title").value = "";
            this.shadow.getElementById("description").value = "";
            this.shadow.getElementById("image").value = "";
            this.shadow.getElementById("date").value = "";
            this.shadow.getElementById("openingTime").value = "";
            this.shadow.getElementById("closingTime").value = "";
        } catch (error) {
            console.log("failed to create show");
            console.log(error);
            this.views.toast.show({
                title: "Failed to create show",
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
            #createButton {
                width : 100%;
                font-size: 16px;
                font-weight: bold;
                line-height: 2em;
                padding-left: 22px;
                padding-right: 22px;
            }
            #showList {
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
                    <div class="formelement">
                        <button id="createButton" onclick="${componentId}.createShow()">Create</button>
                    </div>

                    <div id="status"></div>
                </div>
                
                <div class="form" style="padding-bottom:200px;">
                    <div class="formtitle">
                        Your shows
                    </div>
                    <div id="showList"></div>
                </div>
            </div>
        `;
    }

}
