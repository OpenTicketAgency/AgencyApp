
import { ethers } from "ethers";
import { Context } from "../Context";

export class Contract {

    /**
     * ConnectedContract constructor
     * 
     * @param {Object} options - Options for the connected contract
     * @param {string} options.contractId - The contract address
     * @param {Object} options.abi - The contract json ABI
     * 
     * @example
     * const connectedContract = new Contract({
     *     contractId: '0x1234567890123456789012345678901234567890',
     *     abi: require('./Contract/contractAbi.json')
     * });
     */
    constructor(options) {
        this.packagename = "OpenTicketAgency.Models.Contract";

        this.data = {
            contractId: options.contractId,
            abi: options.abi,
            connectedContract: null
        }

        this.data.connectedContract = new ethers.Contract(
            this.data.contractId,
            this.data.abi,
            Context.Web3.signer
        );
    }

    getContract() {
        return this.data.connectedContract;
    }
}
