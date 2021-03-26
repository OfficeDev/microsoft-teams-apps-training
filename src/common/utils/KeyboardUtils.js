// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants } from "./Constants";

export class KeyboardUtils {
    /**
     * @Method for keydown event and handles click event based on space and enter
     * @param document object html page object
     * @param event object html selector to perform event
     */
    static keydownClick(document, event) {
        $(document).on({
            keydown: function(e) {
                let key = e.which;
                // Replace this with constant Proper Naming Convension
                if (key === Constants.getEnterKeyEvent() || key === Constants.getSpaceKeyEvent()) {
                    e.preventDefault();
                    $(this).click();
                    return false;
                }
            }
        }, event);
    }

    static removeOptionKeydownClick(document, event) {
        $(document).on({
            keydown: function(e) {
                let key = e.which;
                // Replace this with constant Proper Naming Convension
                if (key === Constants.getEnterKeyEvent() || key === Constants.getSpaceKeyEvent()) {
                    e.preventDefault();
                    $(this).find(".remove-option").click();
                    return false;
                }
            }
        }, event);
    }
}