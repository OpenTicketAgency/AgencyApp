
import * as Craft from "@craftkit/craft-uikit";
import * as StickyHeaderNavi from "@craftkit/craft-widget-stickyheadernavi";
import * as Toast from "@craftkit/craft-widget-toast";
Craft.usePackage(StickyHeaderNavi);
Craft.usePackage(Toast);

import { ShowList } from "../PageElements/ShowList.js";
import { ShowDigest } from "../PageElements/ShowDigest.js";
import { ShowEditor } from "../PageElements/ShowEditor.js";

export class Shows extends Craft.Widget.StickyHeaderNavi.Page {

    constructor(options) {
        super(options || {});
        this.packagename = "OpenTicketAgency.Pages.Shows";
        this.data = {
            wallectConnectedListener: null,
            wallectDisconnectedListener: null,
            showList: []
        };
        this.views = {
            showList: null,
            toast: null
        };
        this.path = `${OpenTicketAgency.Context.agencyId}/shows`;
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

        this.views.showList = new ShowList({});
        this.appendView({
            id: "showList",
            component: this.views.showList
        });

        this.views.toast = new Craft.Widget.Toast();

        if (callback) { callback(); }
    }

    viewWillAppear(callback) {
        this.viewController.header.views.menu.mark("shows");

        this.updateShows();

        if (callback) { callback(); }
    }

    walletStateChanged() {
        this.updateShows();
    }

    showShowEditorModal() {
        let modalViewController = new Craft.UI.ModalViewController();
        modalViewController.loadView();

        let editor = new ShowEditor({
            show: null,
            saveHandler: (options) => {
                this.createShow(options);
            },
            closeHandler: () => {
                modalViewController.hideContent(() => {
                    editor.unloadView();
                    modalViewController.unloadView();
                });
            }
        });
        editor.loadView();

        modalViewController.setContent(editor);
        modalViewController.container.style['background-color'] = OpenTicketAgency.Config.backgroundColor; // fill safe area with header color

        Craft.Core.Context.getRootViewController().appendView(modalViewController);
        modalViewController.showContent();
    }

    async updateShows() {
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

    async createShow(options) {
        try {
            if (!OpenTicketAgency.Context.connectedWallet) return;

            // TODO: more accurate validation
            if (!options.title) {
                Craft.Core.Context.getRootViewController().appendView(this.views.toast);
                this.views.toast.show({
                    message: "Please enter a title",
                    callback: () => {
                        this.views.toast.removeFromParent();
                    }
                });
                return;
            }
            if (!options.description) {
                Craft.Core.Context.getRootViewController().appendView(this.views.toast);
                this.views.toast.show({
                    message: "Please enter a description",
                    callback: () => {
                        this.views.toast.removeFromParent();
                    }
                });
                return;
            }
            if (!options.date) {
                Craft.Core.Context.getRootViewController().appendView(this.views.toast);
                this.views.toast.show({
                    message: "Please enter a date",
                    callback: () => {
                        this.views.toast.removeFromParent();
                    }
                });
                return;
            }
            if (!options.openingTime) {
                Craft.Core.Context.getRootViewController().appendView(this.views.toast);
                this.views.toast.show({
                    message: "Please enter an opening time",
                    callback: () => {
                        this.views.toast.removeFromParent();
                    }
                });
                return;
            }
            if (!options.closingTime) {
                Craft.Core.Context.getRootViewController().appendView(this.views.toast);
                this.views.toast.show({
                    message: "Please enter a closing time",
                    callback: () => {
                        this.views.toast.removeFromParent();
                    }
                });
                return;
            }
            
            let createShowTxn = await OpenTicketAgency.Context.connectedAgencyContract.getContract().createShow(
                options.title,
                options.description,
                options.image,
                options.date,
                options.openingTime,
                options.closingTime
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
            .form {
                margin-top: 22px;
                margin-left: 22px;
                margin-right: 22px;
            }
            .title {
                margin-top: 11px;
                font-size: 18px;
                font-weight: bold;
            }
            .buttonContainer {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                margin-top: 22px;
            }
            #newButton {
                font-size: 16px;
                font-weight: bold;
                line-height: 2em;
                padding-left: 22px;
                padding-right: 22px;
                margin-left: auto;
                margin-right: 22px;
            }
            #showList {
                margin-top: 22px;
            }
        `;
    }

    template(componentId) {
        return `
            <div id="root" class="root">
                <div class="form" style="padding-bottom:200px;">
                    <div class="buttonContainer">
                        <button id="newButton" onclick="${componentId}.showShowEditorModal();">Add new show</button>
                    </div>
                    <div class="title">
                        Your shows
                    </div>
                    <div id="showList"></div>
                </div>
            </div>
        `;
    }

}
