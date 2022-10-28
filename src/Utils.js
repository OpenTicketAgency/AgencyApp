
import * as Craft from "@craftkit/craft-uikit";

import { Config } from "./Config.js";

export var Utils = {

    Constants: {
        KEYCODE: {
            ESC: 27,
        }
    },

    escape: function (str) {
        return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    },

    api: function (url, obj, callback) {
        var http = new XMLHttpRequest();
        http.onload = function (e) { callback(this.responseText); };
        http.onerror = function (e) { alert("cannot call api"); };
        http.ontimeout = function () { alert("timeout"); };
        http.open("POST", url);
        http.send(JSON.stringify(obj));
    },

    shortenAddress: function (str) {
        if (str.length > 7) {
            return str.substring(0, 5) + "..." + str.substring(str.length - 2);
        } else {
            return str;
        }
    },

    load: function (url, callback) {
        let http = new XMLHttpRequest();
        http.onload = (e) => { callback(http.response); };
        http.onerror = (e) => { alert("Cannot load"); };
        http.ontimeout = () => { alert("Timeout"); };
        http.open("GET", url);
        http.send();
    },

    loadAgencyDigest: function (agencyId, address, callback) {
        let http = new XMLHttpRequest();
        http.onload = (e) => {
            let asset = JSON.parse(http.response);
            if (asset == null) {
                callback(null);
            } else {
                console.log("agency digest loaded:");
                console.log(asset);
                callback(asset);
            }
        };
        http.onerror = (e) => { alert("Cannot load"); };
        http.ontimeout = () => { alert("Timeout"); };
        http.open("GET", `${Config.agencyDigestEndpointAtOpensea(agencyId, address)}`);
        http.send();
    }

};
