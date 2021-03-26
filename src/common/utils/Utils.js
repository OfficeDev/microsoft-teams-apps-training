// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants } from "./Constants";
import { UxUtils } from "./UxUtils";

export class Utils {
    /**
     * Method to generate guid
     */
    static generateGUID() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            let r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    /**
     * Method to validate the string is json or not
     * @param str string identifier
     */
    static isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    /*
     * Method to get number to word
     * @param num number
     */
    static numbertowords(num) {
        switch (num) {
            case 1:
                return "one";
            case 2:
                return "two";
            case 3:
                return "three";
            case 4:
                return "four";
            case 5:
                return "five";
            case 6:
                return "six";
            case 7:
                return "seven";
            case 8:
                return "eight";
            case 9:
                return "nine";
            case 10:
                return "ten";
            default:
                return "one";
        }
    }

    /**
     * @description Method to get image dimensions and image div dimensions
     * @param imageURL contains image url
     * @param selector contains image where url placed
     */
    static getClassFromDimension(imgURL, selector) {
        let tmpImg = new Image();
        tmpImg.src = imgURL;
        let imgWidth = 0;
        let imgHeight = 0;
        $(tmpImg).on("load", function() {
            imgWidth = tmpImg.width;
            imgHeight = tmpImg.height;

            let divWidth = Math.round($(selector).width());
            let divHeight = Math.round($(selector).height());
            let getClass = "";
            if (imgHeight > divHeight) {
                /* height is greater than width */
                getClass = ("heightfit");
            } else if (imgWidth > divWidth) {
                /* width is greater than height */
                getClass = ("widthfit");
            } else {
                /* small image */
                getClass = ("smallfit");
            }
            $(selector).addClass(getClass);
            let tid = setInterval(() => {
                if ($(selector).hasClass(getClass) == true) {
                    setTimeout(() => {
                        UxUtils.removeImageLoader($(selector));
                        clearInterval(tid);
                    }, Constants.setIntervalTimeFiveHundred());
                }
            }, Constants.setIntervalTimeHundred());
        });
    }

    /**
     * Method to get remove Image loader from image section
     * @param selector object html on which remove image
     */
    static removeImageLoader(selector) {
        let tid = setInterval(() => {
            if ($(selector).hasClass("heightfit") || $(selector).hasClass("widthfit") || $(selector).hasClass("smallfit")) {
                $(".loader-cover").addClass("d-none");
                clearInterval(tid);
            }
        }, 100);
    }

    static getLocaleForCalendar(language) {
        let lang = "gb";
        switch (language.toLowerCase()) {
            case "en-in":
                lang = "en-GB";
                break;
            case "en-gb":
                lang = "en-GB";
                break;
            case "hi-in":
                lang = "hi";
                break;
            case "ar-sa":
                lang = "ar";
                break;
            case "az-latin-az":
                lang = "az";
                break;
            case "bg-bg":
                lang = "bg";
                break;
            case "bn-in":
                lang = "bn";
                break;
            case "ca-es":
                lang = "ca";
                break;
            case "cs-cz":
                lang = "cs";
                break;
            case "cy-gb":
                lang = "cy";
                break;
            case "da-dk":
                lang = "da";
                break;
            case "de-de":
                lang = "de";
                break;
            case "el-gr":
                lang = "el";
                break;
            case "es-es":
                lang = "es";
                break;
            case "es-mx":
                lang = "";
                break;
            case "et-ee":
                lang = "et";
                break;
            case "eu-es":
                lang = "eu";
                break;
            case "fi-fi":
                lang = "fi";
                break;
            case "fi-ph":
                lang = "";
                break;
            case "fr-ca":
                lang = "";
                break;
            case "fr-fr":
                lang = "";
                break;
            case "gl-es":
                lang = "gl";
                break;
            case "gu-in":
                lang = "";
                break;
            case "he-il":
                lang = "he";
                break;
            case "hr-hr":
                lang = "hr";
                break;
            case "hu-hu":
                lang = "hu";
                break;
            case "id-id":
                lang = "id";
                break;
            case "is-is":
                lang = "is";
                break;
            case "it-it":
                lang = "it";
                break;
            case "ja-jp":
                lang = "ja";
                break;
            case "ka-ge":
                lang = "ka";
                break;
            case "kk-kz":
                lang = "kk";
                break;
            case "kn-in":
                lang = "";
                break;
            case "ko-kr":
                lang = "ko";
                break;
            case "lt-lt":
                lang = "lt";
                break;
            case "lv-lv":
                lang = "lv";
                break;
            case "mk-mk":
                lang = "mk";
                break;
            case "ml-in":
                lang = "";
                break;
            case "mr-in":
                lang = "mr";
                break;
            case "nb-no":
                lang = "no";
                break;
            case "nl-nl":
                lang = "nl";
                break;
            case "nn-no":
                lang = "no";
                break;
            case "pl-pl":
                lang = "pl";
                break;
            case "pt-br":
                lang = "pt-BR";
                break;
            case "pt-pt":
                lang = "";
                break;
            case "ro-ro":
                lang = "ro";
                break;
            case "ru-ru":
                lang = "ru";
                break;
            case "sk-sk":
                lang = "sk";
                break;
            case "sl-si":
                lang = "sl";
                break;
            case "sq-al":
                lang = "sq";
                break;
            case "sr-latn-rs":
                lang = "sr";
                break;
            case "sv-se":
                lang = "sv";
                break;
            case "ta-in":
                lang = "ta";
                break;
            case "te-in":
                lang = "";
                break;
            case "th-th":
                lang = "";
                break;
            case "tr-tr":
                lang = "tr";
                break;
            case "uk-ua":
                lang = "uk";
                break;
            case "vi-vn":
                lang = "vi";
                break;
            case "zh-cn":
                lang = "zh-CN";
                break;
            case "zh-tw":
                lang = "zh-TW";
                break;
            default:
                lang = "en-GB";
                break;
        }
        return {
            url: `js/locales/bootstrap-datepicker.${lang}.min.js`,
            lang: lang
        };
    }

    /**
     * @description Method for calculating date diff from current date in weeks, days, hours, minutes
     * @param start - Date type
     * @param end - Date type
     * @param weekKey - Week Locale
     * @param hoursKey - hours Locale
     * @param hourKey - hour Locale
     * @param minutesKey - minutes Locale
     * @param minuteKey - minute Locale
     * @param daysKey - days Locale
     * @param dayKey - day Locale
     */
    static calcDateDiff(start, end, weekKey, hoursKey, hourKey, minutesKey, minuteKey, daysKey) {
        let days = (end - start) / (1000 * 60 * 60 * 24);
        let hourText = hourKey;
        let minuteText = minuteKey;
        if (days > 6) {
            let weeks = Math.ceil(days) / 7;
            return Math.floor(weeks) + " " + weekKey;
        } else {
            if (days < 1) {
                let t1 = start.getTime();
                let t2 = end.getTime();

                let minsDiff = Math.floor((t2 - t1) / 1000 / 60);
                let hourDiff = Math.floor(minsDiff / 60);
                minsDiff = minsDiff % 60;

                if (hourDiff > 1) {
                    hourText = hoursKey;
                } else {
                    hourText = hourKey;
                }
                if (hourDiff > 1) {
                    minuteText = minutesKey;
                } else {
                    minuteText = minuteKey;
                }
                if (hourDiff > 0 && minsDiff > 0) {
                    return hourDiff + " " + hourText + ", " + minsDiff + " " + minuteText;
                } else if (hourDiff > 0 && minsDiff <= 0) {
                    return hourDiff + " " + hourText;
                } else if (hourDiff <= 0 && minsDiff > 0) {
                    return minsDiff + " " + minuteText;
                }
            } else {
                return Math.ceil(days) + " " + daysKey;
            }
        }
    }

    /**
     * 
     * @param size - string contains File size value
     */
    static getFileSize(bytes) {
        if (bytes >= 1073741824) {
            bytes = Math.round(bytes / 1073741824) + " GB";
        } else if (bytes >= 1048576) {
            bytes = Math.round(bytes / 1048576, 2) + " MB";
        } else if (bytes >= 1024) {
            bytes = Math.round(bytes / 1024, 2) + " KB";
        } else if (bytes > 1) {
            bytes = bytes + " bytes";
        } else if (bytes == 1) {
            bytes = bytes + " byte";
        } else {
            bytes = bytes + " bytes";
        }
        return bytes;
    }

}