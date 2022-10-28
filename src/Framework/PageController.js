
import * as Craft from "@craftkit/craft-uikit";
import * as StickyHeaderNavi from "@craftkit/craft-widget-stickyheadernavi";
Craft.usePackage(StickyHeaderNavi);

import { Welcome } from "../Pages/Welcome.js";
import { Agency } from "../Pages/Agency.js";
import { Shows } from "../Pages/Shows.js";
import { NotFound } from "../Pages/NotFound.js";

export class PageController extends Craft.Widget.StickyHeaderNavi.ViewController {

    constructor(options) {
        super(options);
        this.packagename = "OpenTicketAgency.Framework.PageController";
        this.data = {
            PageCache: {},
            currentPage: null
        };
    }

    deployCustomBackBtn() {
        // delegate to header
        this.header.deployCustomBackBtn();
    }

    getCurrentPage() {
        return this.data.currentPage;
    }

    /**
     * 
     * /<agency contract address>/welcome|agency|shoes
     * /<agency contract address>/<show contract address>/show
     * 
     */
    resolveRoutingRequest(route) {
        let path = route.path;
        let event = route.event;

        if (!path) { path = ""; }

        let agencyId = "";
        let showId = "";
        let pageName = "";

        path = path.replace(/^\/+|\/+$/g, "");
        let paths = path.split("/");

        if (paths.length == 2) {
            agencyId = paths[0];
            pageName = paths[1];
        } else if (paths.length == 3) {
            agencyId = paths[0];
            showId = paths[1];
            pageName = paths[2];
        }

        console.log(`resolveRoutingRequest: agencyId: ${agencyId}, showId: ${showId}, pageName: ${pageName}`);

        if (OpenTicketAgency.Context.agencyId == null || agencyId != OpenTicketAgency.Context.agencyId) {
            // clear cache
            this.data.PageCache = {};
        }
        OpenTicketAgency.Context.agencyId = agencyId;
        OpenTicketAgency.Context.showId = showId;

        this.openNamedPage(pageName.toLowerCase(), route);
    }

    openNamedPage(pageName, route) {
        if (!route) { route = { path: `/${OpenTicketAgency.Context.agencyId}/welcome` }; }
        switch (pageName) {
            case 'welcome':
                this.openWelcomePage(route);
                break;
            case 'agency':
                this.openAgencyPage(route);
                break;
            case 'shows':
                this.openShowsPage(route);
                break;
            default:
                this.openNotFoundPage(route);
                break;
        }
    }

    openNotFoundPage(route) {
        this.open({
            page: new NotFound(),
            callback: null,
            route: route
        });
    }

    openWelcomePage(route) {
        if (!this.data.PageCache.welcome) {
            this.data.PageCache.welcome = new Welcome();
        }
        this.open({
            page: this.data.PageCache.welcome,
            callback: null,
            route: route
        });
    }

    openAgencyPage(route) {
        if (!this.data.PageCache.agency) {
            this.data.PageCache.agency = new Agency({
                agencyAddress: OpenTicketAgency.Context.agencyId
            });
        }
        this.data.currentPage = this.data.PageCache.agency;
        this.open({
            page: this.data.PageCache.agency,
            callback: null,
            route: route
        });
    }

    openShowsPage(route) {
        if (!this.data.PageCache.shows || this.data.PageCache.shows.data.agencyAddress != OpenTicketAgency.Context.agencyId) {
            this.data.PageCache.shows = new Shows({
                agencyAddress: OpenTicketAgency.Context.agencyId
            });
        }
        this.open({
            page: this.data.PageCache.shows,
            callback: null,
            route: route
        });
    }

}
