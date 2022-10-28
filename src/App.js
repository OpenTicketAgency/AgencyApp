
import * as Craft from "@craftkit/craft-uikit";

import { PageController } from "./Framework/PageController.js";
import { LargeTitle } from "./Framework/LargeTitle.js";
import { SmallTitle } from "./Framework/SmallTitle.js";
import { Header } from "./Framework/Header.js";
import { Menu } from "./Framework/Menu.js";

export var App = {
    router: Craft.Core.PathRouter,

    didBootApplication: function (env) {

        Craft.Core.Defaults.ALLOW_COMPONENT_SHORTCUT = true;
        Craft.Core.KeyboardManager.activate();

        const rootViewController = new PageController({
            header: new Header({
                large: new LargeTitle(),
                small: new SmallTitle(),
                menu: new Menu(),
            }),
            custombackbtn: true,
            enableSwipeBack: true
        });
        Craft.Core.Context.setRootViewController(rootViewController);
        rootViewController.bringup();
    }

};
