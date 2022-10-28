import * as Craft from "@craftkit/craft-uikit";

export var Config = {

    foregroundColor: "#007aff",
    backgroundColor: "#ffffff",

    nftAssetEndoint: function (contractId, address) {
        return this.nftAssetEndpointAtOpensea(contractId, address);
    },

    nftAssetEndpointAtOpensea: function (contractId, address) {
        return `https://rinkeby-api.opensea.io/api/v1/assets?asset_contract_address=${contractId}&owner=${address}`;
    },

    agencyDigestEndpointAtOpensea: function (contractId, address) {
        return `https://rinkeby-api.opensea.io/api/v1/asset/${contractId}/${address}`;
    }

};
