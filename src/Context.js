
import { ethers } from "ethers";
import { Contract } from "./Models/Contract.js";

export var Context = {
    agencyContractAbi: require("./Contracts/Agency.json").abi,
    showContractAbi: require("./Contracts/Show.json").abi,

    _agencyId: null,
    _showId: null,

    _connectedAgencyContract: null,
    _connectedShowContract: null,

    _connectedWallet: null,

    Web3: {
        _ethereum: null,
        _provider: null,
        _signer: null,

        get ethereum() {
            if (this._ethereum === null) {
                const { ethereum } = window;
                this._ethereum = ethereum;
            }
            return this._ethereum;
        },

        get provider() {
            if (this._provider === null) {
                this._provider = new ethers.providers.Web3Provider(
                    this.ethereum
                );
            }
            return this._provider;
        },

        get signer() {
            if (this._signer === null) {
                this._signer = this.provider.getSigner();
            }
            return this._signer;
        }
    },

    set agencyId(agencyId) {
        console.log('check agencyId:');
        console.log('this._agencyId:' + this._agencyId);
        console.log('agencyId:' + agencyId);
        if (this._agencyId !== agencyId) {
            this._agencyId = agencyId;
            this.connectedAgencyContract = new Contract({
                contractId: agencyId,
                abi: this.agencyContractAbi
            });
            console.log('Contract');
            console.log(this.connectedAgencyContract);
        }
    },

    get agencyId() {
        return this._agencyId;
    },

    set showId(showId) {
        if (this._showId !== showId) {
            this._showId = showId;
            this.connectedShowContract = new Contract({
                contractId : showId,
                abi: this.showContractAbi
            });
            console.log('Show Contract');
            console.log(this.connectedShowContract);
        }
    },

    /**
     * Set the connected agency contract and notify the listeners
     * 
     * @param {OpenTicketAgency.Model.Contract} contract - The contract to set
     * @returns void
     * @fires OpenTicketAgency.Context.connectedAgencyContract
     * @fires OpenTicketAgency.Context.disconnectedAgencyContract
     */
    set connectedAgencyContract(contract) {
        this._connectedAgencyContract = contract;
        if (contract) {
            Craft.Core.NotificationCenter.notify("OpenTicketAgency.Context.agencyContractConnected", contract);
        } else {
            Craft.Core.NotificationCenter.notify("OpenTicketAgency.Context.agencyContractDisconnected");
        }
        queueMicrotask(() => {
            this.checkIfOwner();
        });
    },

    /**
     * Get the connected agency contract
     * 
     * @returns {Object} - The connected contract
     */
    get connectedAgencyContract() {
        return this._connectedAgencyContract;
    },

    /**
     * Set the connected show contract and notify the listeners
     * 
     * @param {OpenTicketAgency.Model.Contract} contract - The contract to set
     * @returns void
     * @fires OpenTicketAgency.Context.connectedShowContract
     * @fires OpenTicketAgency.Context.disconnectedShowContract
     */
    set connectedShowContract(contract) {
        this._connectedShowContract = contract;
        if (contract) {
            Craft.Core.NotificationCenter.notify("OpenTicketAgency.Context.showContractConnected", contract);
        } else {
            Craft.Core.NotificationCenter.notify("OpenTicketAgency.Context.showContractDisconnected");
        }
        queueMicrotask(() => {
            this.checkIfOwner();
        });
    },

    /**
     * Get the connected contract
     * 
     * @returns {Object} - The connected show contract
     */
    get connectedShowContract() {
        return this._connectedShowContract;
    },

    /**
     * Set the connected wallet and notify the listeners
     * 
     * @param {Wallet} wallet - OpenTicketAgency.Model.Wallet
     * @returns void
     * @fires OpenTicketAgency.Context.connectedWallet
     * @fires OpenTicketAgency.Context.disconnectedWallet
     */
    set connectedWallet(wallet) {
        this._connectedWallet = wallet;
        if (wallet) {
            Craft.Core.NotificationCenter.notify("OpenTicketAgency.Context.walletConnected", wallet);
        } else {
            Craft.Core.NotificationCenter.notify("OpenTicketAgency.Context.walletDisconnected");
        }
        console.log('Wallet');
        console.log(this.connectedWallet);
        queueMicrotask(() => {
            this.checkIfOwner();
        });
    },

    /**
     * Get the connected wallet
     * 
     * @returns {Object} - The connected wallet
     */
    get connectedWallet() {
        return this._connectedWallet;
    },

    /**
     * Check if the connected wallet is the owner of the connected contract
     * 
     * @returns {void}
     * @fires OpenTicketAgency.Context.connectedAsOwner - When the wallet is the owner of the contract
     */
    async checkIfOwner() {
        if (!this._connectedContract || !this._connectedWallet) {
            Craft.Core.NotificationCenter.notify("OpenTicketAgency.Context.connectedAsNotOwner", null);
            console.log('Not owner');
            return;
        }
        console.log('Checking if owner');
        let owner = await this._connectedContract.data.connectedContract.owner();
        owner = owner.toLowerCase();
        const account = this._connectedWallet.data.account.toLowerCase();
        console.log("Owner: " + owner);
        console.log("Wallet: " + account);
        if (owner === account) {
            Craft.Core.NotificationCenter.notify("OpenTicketAgency.Context.connectedAsOwner", owner);
        } else {
            Craft.Core.NotificationCenter.notify("OpenTicketAgency.Context.connectedAsNotOwner", owner);
        }
    }

};
