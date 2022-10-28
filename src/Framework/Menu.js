
import * as Craft from "@craftkit/craft-uikit";

import { MenuButton } from "./MenuButton.js";

export class Menu extends Craft.UI.View {

    constructor(options) {
        super(options || {});
        this.packagename = "OpenTicketAgency.Framework.Menu";
        this.data = {
            wallectConnectedListener: null,
            wallectDisconnectedListener: null
        };
        this.views = {
            welcomeButton: null,
            agencyButton: null,
            showsButton: null
        };
    }

    viewDidLoad(callback) {
        this.clearMeneu();
        this.appendWelcomeButton();
        this.appendAgencyButton();
        this.appendShowsButton();
        if (callback) { callback(); }
    }

    clearMeneu() {
        this.views.welcomeButton?.removeFromParent();
        this.views.welcomeButton = null;
        this.views.agencyButton?.removeFromParent();
        this.views.agencyButton = null;
        this.views.showsButton?.removeFromParent();
        this.views.showsButton = null;
    }

    appendWelcomeButton() {
        this.views.welcomeButton = new MenuButton({
            label: 'Welcome',
            action: () => {
                this.viewController.openNamedPage('welcome');
                this.markWelcome();
            }
        });
        this.appendView(this.views.welcomeButton);
    }

    appendAgencyButton() {
        this.views.agencyButton = new MenuButton({
            label: 'Agency',
            action: () => {
                this.viewController.openNamedPage('agency');
                this.markAgency();
            }
        });
        this.appendView(this.views.agencyButton);
    }

    appendShowsButton() {
        this.views.showsButton = new MenuButton({
            label: 'Shows',
            action: () => {
                this.viewController.openNamedPage('shows');
                this.markShows();
            }
        });
        this.appendView(this.views.showsButton);
    }

    mark(name) {
        switch (name) {
            case 'welcome':
                this.markWelcome();
                break;
            case 'agency':
                this.markAgency();
                break;
            case 'shows':
                this.markShows();
                break;
            default:
                this.markWelcome();
                break;
        }
    }

    markWelcome() {
        this.views.welcomeButton?.mark();
        this.views.agencyButton?.unmark();
        this.views.showsButton?.unmark();
    }

    markAgency() {
        this.views.welcomeButton?.unmark();
        this.views.agencyButton?.mark();
        this.views.showsButton?.unmark();
    }

    markShows() {
        this.views.welcomeButton?.unmark();
        this.views.agencyButton?.unmark();
        this.views.showsButton?.mark();
    }

    style() {
        return `
			.root {
				box-sizing:border-box;
				display: flex;
				flex-direction: row;
				justify-content: center;
				height: 44px;
				line-height: 40px;
				text-align: center;
			}
		`;
    }
}
