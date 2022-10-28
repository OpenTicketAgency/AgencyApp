
import { Utils } from "../Utils";

export class Agency {

    /**
     * Agency constructor
     * 
     * @param {Object} options - Options for the agency
     * @param {string} options.account - The wallet account
     * @param {string} options.agencyId - The contract address
     */
    constructor(options) {
        this.packagename = "OpenTicketAgency.Models.Agency";

        this.data = {
            account: options.account,
            agencyId: options.agencyId,
            name: title,
            address: address,
            icon: null,
            image: null
        };
    }

    /**
     * Load the agency asstet from the Blockchain
     * 
     * @returns void
     */
    load() {
        Utils.loadAgencyDigest(this.data.agencyId, this.data.account, (asset) => {
            this.data.title = asset.title;
            this.data.address = asset.address;
            this.data.icon = asset.icon;
            this.data.image = asset.image;
        });
    }

}
