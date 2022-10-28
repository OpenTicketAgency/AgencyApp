
export class Wallet {

    /**
     * Wallet constructor
     * 
     * @param {Object} options - Options for the Wallet
     */
    constructor(options) {
        this.packagename = "OpenTicketAgency.Models.Wallet";
        this.data = {
            account: null
        };
    }

    /**
     * Check if the wallet is connected
     * 
     * @returns boolean - True if the wallet is connected
     */
    isConnected() {
        return this.data.account != null;
    }

    /**
     * Connect to the wallet
     *
     * @returns void
     */
    async connect() {
        const { ethereum } = window;
        if (!ethereum) {
            alert("Please install MetaMask");
            OpenTicketAgency.Context.connectedWallet = null; // will fire the notification "OpenTicketAgency.Context.walletDisconnected"
            return;
        }
        try {
            const accounts = await ethereum.request({
                method: "eth_requestAccounts"
            });
            if (accounts.length > 0) {
                this.data.account = accounts[0];
                OpenTicketAgency.Context.connectedWallet = this; // will fire the notification "OpenTicketAgency.Context.walletConnected"
            }
        } catch (e) {
            OpenTicketAgency.Context.connectedWallet = null;
            console.error(e);
        }
    }

    /**
     * Disconnect from the wallet
     * 
     * @returns void
     */
    disconnect() {
        this.data.account = null;
        OpenTicketAgency.Context.connectedWallet = null; // will fire the notification "OpenTicketAgency.Context.walletDisconnected"
    }

}
