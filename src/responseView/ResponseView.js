// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import "../common/utils/JqueryGlobal";
import "bootstrap/dist/js/bootstrap";
import "ekko-lightbox/dist/ekko-lightbox.js";
import "ekko-lightbox/dist/ekko-lightbox.css";
import {
    Localizer,
    ActionHelper
} from "../common/ActionSdkHelper";
import {
    Constants
} from "../common/utils/Constants";
import {
    UxUtils
} from "../common/utils/UxUtils";
import {
    Utils
} from "../common/utils/Utils";
import "../../assets/css/style-custom";
import "../../assets/css/style-default";

let $root = "";
let row = {};
let actionInstance = null;
let summaryAnswerResp = [];
let memberIds = [];
let myUserId = [];
let contextActionId;
let request = "";
let actionDataRows = null;
let actionDataRowsLength = 0;
let questCounter = 1;
let questionKey = "";
let questionsKey = "";
let startKey = "";
let noteKey = "";
let correctKey = "";
let incorrectKey = "";
let submitKey = "";
let nextKey = "";
let backKey = "";
let pagination = 0;
let trainingSummary = "";
let trainingExpired = "";
let doneKey = "";
let closeKey = "";
let previousKey = "";
let footerSection1 = "";
let footerSection2 = "";
let footerSection3 = "";
let trainingContentKey = "";

/* Async method for fetching localization strings */
/**
 * @description Method to get Local string
 */
async function getStringKeys() {
    Localizer.getString("question").then(function(result) {
        questionKey = result;
        $(".question-key").text(questionKey);
    });

    Localizer.getString("start").then(function(result) {
        startKey = result;
        $("#start").text(startKey);
    });

    Localizer.getString("note").then(function(result) {
        noteKey = result;
        $(".note-key").text(noteKey);
    });

    Localizer.getString("correct").then(function(result) {
        correctKey = result;
    });

    Localizer.getString("incorrect").then(function(result) {
        incorrectKey = result;
    });

    Localizer.getString("submit").then(function(result) {
        submitKey = result;
        $(".submit-key").text(submitKey);
    });

    Localizer.getString("next").then(function(result) {
        nextKey = result;
        $(".next-btn-sec").text(nextKey);
    });

    Localizer.getString("back").then(function(result) {
        backKey = result;
        $(".back-key").text(backKey);
    });

    Localizer.getString("trainingSummary").then(function(result) {
        trainingSummary = result;
    });

    Localizer.getString("trainingContent").then(function(result) {
        trainingContentKey = result;
    });

    Localizer.getString("trainingExpired").then(function(result) {
        trainingExpired = result;
    });

    Localizer.getString("done").then(function(result) {
        doneKey = result;
    });

    Localizer.getString("previous").then(function(result) {
        previousKey = result;
        $(".next-btn-sec").text(previousKey);
    });

    Localizer.getString("questions").then(function(result) {
        questionsKey = result;
    });

    Localizer.getString("close").then(function(result) {
        closeKey = result;
    });

}

/**
 * @description Method to get theme and load page content
 * @param request object
 */
async function loadResponseView(request) {
    let response = await ActionHelper.executeApi(request);
    let context = response.context;
    $("form.section-1").show();
    let theme = context.theme;
    $("link#theme").attr("href", "css/style-" + theme + ".css");
    UxUtils.setAppend("div.section-1", UxUtils.getThemeSection());
    $root = $("#root");
    setTimeout(() => {
        $("div.section-1").show();
        $("div.footer").show();
    }, Constants.setIntervalTimeThousand());
    ActionHelper.hideLoader();
    OnPageLoad();
}

/**
 * @description Method to get responder ids who responded the app
 * @param actionId string identifier
 */
async function getResponderIds(actionId) {
    ActionHelper
        .executeApi(ActionHelper.requestDataRows(actionId))
        .then(function(batchResponse) {
            actionDataRows = batchResponse.dataRows;
            actionDataRowsLength = actionDataRows == null ? 0 : actionDataRows.length;
            if (actionDataRowsLength > 0) {
                for (let i = 0; i < actionDataRowsLength; i++) {
                    memberIds.push(actionDataRows[i].creatorId);
                }
            }
        }).catch(function(error) {
            console.error("Console log: Error: " + JSON.stringify(error));
        });
}

// *********************************************** HTML ELEMENT***********************************************
/**
 * @description Event when document is ready
 */
$(function() {
    request = ActionHelper.getContextRequest();
    getStringKeys();
    loadResponseView(request);
});

/**
 * @event Onclick Enter or Space Key click on back or submit button
 */
$(document).on({
    keydown: function(e) {
        let key = e.which;
        // Replace this with constant Proper Naming Convension
        if (key === Constants.getEnterKeyEvent() || key === Constants.getSpaceKeyEvent()) {
            e.preventDefault();
            if ($(this).attr("role") == "checkbox") {
                $(this).find("input").click();
                // $(this).find("input[type=checkbox]").click();
            }
            if ($(this).attr("role") == "button") {
                if ($(this).data("id") == "back" && $(this).hasClass("disabled")) {
                    return false;
                }
                $("#" + $(this).data("id")).click();
            }
            if ($(this).attr("role") == "input") {
                $(".quiz-clear").click();
            }

            if ($(this).attr("role") == "image" || $(this).attr("role") == "doc") {
                if ($(this).parents("div.section-1").length > 0) {
                    $(".section-2").find("div.training-card-section:first").find(`input[type="file"]`).click();
                } else {
                    $(".section-2").find("div.training-card-section:last").find(`input[type="file"]`).click();
                }
            }
            return false;
        }
    }
}, "div[tabindex=0] , span[tabindex=0] , a[tabindex=0]");

/**
 * @description Method to create body when page load
 */
function OnPageLoad() {
    ActionHelper.executeApi(request).then(function(response) {
            console.info("GetContext - Response: " + JSON.stringify(response));
            myUserId = response.context.userId;
            contextActionId = response.context.actionId;
            getResponderIds(contextActionId);
            getActionInstance(response.context.actionId);
        })
        .catch(function(error) {
            console.error("GetContext - Error: " + JSON.stringify(error));
        });
}

/**
 * @description Method to create body of the app
 * @param actionId string identifier
 */
function getActionInstance(actionId) {
    ActionHelper.executeApi(ActionHelper.getActionRequest(actionId))
        .then(function(response) {
            console.info("Response: " + JSON.stringify(response));
            actionInstance = response.action;
            createBody();
        }).catch(function(error) {
            console.error("Error: " + JSON.stringify(error));
        });
}

/**
 * @description Method to create body
 */
function createBody() {
    /* Check if already responded */
    /*  Check Expiry date time  */
    let currentTime = new Date().getTime();
    if (actionInstance.expiryTime <= currentTime) {
        let $card = $(UxUtils.getBodyCardSection());
        let $spDiv = $(UxUtils.getBodySpanSection());
        let $sDiv = $(UxUtils.getTrainingExpiredTitle(trainingExpired));
        UxUtils.setAppend($card, $spDiv);
        UxUtils.setAppend($spDiv, $sDiv);
        UxUtils.setAppend($root, $card);
    } else {
        $("div.section-1").show();
        headSection1 = UxUtils.getResponseHeader(trainingContentKey);
        UxUtils.setAppend("div.section-1", headSection1);
        $("#section1-training-title").html(actionInstance.displayName);
        $("#section1-training-description").html(actionInstance.customProperties[0].value);
        let allowMultipleAttempt = actionInstance.customProperties[Constants.getMultipleAttemptIndex()].value;
        $("#multiple-attempt").hide();
        $("#quiz-title-image").hide();
        let mid = setInterval(() => {
            if ($.inArray(myUserId, memberIds) !== -1) {
                $("#multiple-attempt").show();
                if (allowMultipleAttempt == "No") {
                    Localizer.getString("multipleAttemptNo").then(function(result) {
                        UxUtils.setAppend("#allow-multiple-attempt", UxUtils.getMultipleAttemptSection(result));
                        $("#start:button").prop("disabled", true);
                        $("#start:button").removeAttr("id");
                    });
                }
                if (allowMultipleAttempt == "Yes") {
                    Localizer.getString("multipleAttemptYes").then(function(result) {
                        UxUtils.setAppend("#allow-multiple-attempt", UxUtils.getMultipleAttemptSection(result));
                    });
                }
                clearInterval(mid);
            }
        }, Constants.setIntervalTimeHundred());

        /* Create Text and Question summary */
        let resQuestCount = 0;
        let imageCounter = 0;
        let successDownLoadImageCounter = 0;
        actionInstance.dataTables.forEach((dataTable, ind) => {
            if (dataTable.attachments.length > 0) {
                imageCounter++;
                let uniqueIdCarousel = Constants.getUniqueId();
                let req = ActionHelper.getAttachmentInfo(contextActionId, dataTable.attachments[0].id);
                ActionHelper.executeApi(req).then(function(response) {
                        actionInstance.dataTables[ind].attachments[0].url = response.attachmentInfo.downloadUrl;
                        if (actionInstance.dataTables[ind].attachments[0].url != null) {
                            UxUtils.setAppend($("div.section-1").find("#response-cover-img"), UxUtils.createImageLightBox(actionInstance.dataTables[0].attachments[0].url, uniqueIdCarousel));
                            Utils.getClassFromDimension(response.attachmentInfo.downloadUrl, $(`a[data-gallery=gallery${uniqueIdCarousel}]`).find("img"));
                            $(".quiz-template-image").show();
                            $(".quiz-updated-img").show();
                            UxUtils.removeImageLoader(".quiz-updated-img");
                            successDownLoadImageCounter++;
                            setTimeout(function() {
                                $("div.section-1").find("#response-cover-img").removeClass("d-none");
                            }, 1000);
                        }
                        ActionHelper.hideLoader();

                    })
                    .catch(function(error) {
                        console.error("AttachmentAction - Errorquiz: " + JSON.stringify(error));
                    });
            }

            dataTable.dataColumns.forEach((data, index) => {
                if (data.valueType == "LargeText") {
                    /* Call Text Section 1 */
                    let counterDescbox = $("div.desc-box").length;
                    let counter = $("div.card-box").length;
                    let textTitle = data.displayName;
                    if (data.name.indexOf("photo") >= 0) {
                        UxUtils.setAppend("#desc-section", textSection3);
                        $("div.desc-box p:last").attr("id", "contain-" + counterDescbox);
                        $("div.desc-box p#contain-" + counterDescbox).find("span.counter").text(counterDescbox);
                        $("div.desc-box p#contain-" + counter).find(".text-description").text(textTitle);
                        Localizer.getString("photo").then(function(result) {
                            $("div.desc-box p#contain-" + counterDescbox).find("span.training-type").text(result);
                            $("div.desc-box p#contain-" + counterDescbox).text(textTitle);
                        });

                        if (data.attachments.length > 0) {
                            $.each(data.attachments, function(i, att) {
                                imageCounter++;
                                let attachmentId = att.id;
                                let req = ActionHelper.getAttachmentInfo(contextActionId, attachmentId);
                                ActionHelper.executeApi(req).then(function(response) {
                                        actionInstance.dataTables[ind].dataColumns[index].attachments[i].url = response.attachmentInfo.downloadUrl;
                                        successDownLoadImageCounter++;
                                    })
                                    .catch(function(error) {
                                        console.error("AttachmentAction - Error: " + JSON.stringify(error));
                                    });
                            });
                        }
                    } else if (data.name.indexOf("document") >= 0) {
                        UxUtils.setAppend("#desc-section", textSection3);
                        $("div.desc-box p:last").attr("id", "contain-" + counterDescbox);
                        $("div.desc-box p#contain-" + counterDescbox).find("span.counter").text(counterDescbox);
                        Localizer.getString("document").then(function(result) {
                            $("div.desc-box p#contain-" + counterDescbox).find("span.training-type").text(result);
                            $("div.desc-box p#contain-" + counterDescbox).text(textTitle);
                        });
                        if (data.attachments.length > 0) {
                            $.each(data.attachments, function(i, att) {
                                imageCounter++;
                                let attachmentId = att.id;
                                let req = ActionHelper.getAttachmentInfo(contextActionId, attachmentId);
                                ActionHelper.executeApi(req).then(function(response) {
                                        actionInstance.dataTables[ind].dataColumns[index].attachments[i].url = response.attachmentInfo.downloadUrl;
                                        successDownLoadImageCounter++;
                                    })
                                    .catch(function(error) {
                                        console.error("AttachmentAction - Error: " + JSON.stringify(error));
                                    });
                            });
                        }
                    } else if (data.name.indexOf("video") >= 0) {
                        UxUtils.setAppend("#desc-section", textSection3);
                        $("div.desc-box p:last").attr("id", "contain-" + counterDescbox);
                        $("div.desc-box p#contain-" + counterDescbox).find("span.counter").text(counterDescbox);
                        $("div.desc-box p#contain-" + counterDescbox).find(".text-description").text(textTitle);
                        Localizer.getString("video").then(function(result) {
                            $("div.desc-box p#contain-" + counterDescbox).find("span.training-type").text(result);
                            $("div.desc-box p#contain-" + counterDescbox).text(textTitle);
                        });

                        if (data.attachments.length > 0) {
                            $.each(data.attachments, function(i, att) {
                                imageCounter++;
                                let attachmentId = att.id;
                                let req = ActionHelper.getAttachmentInfo(contextActionId, attachmentId);
                                ActionHelper.executeApi(req).then(function(response) {
                                        actionInstance.dataTables[ind].dataColumns[index].attachments[i].url = response.attachmentInfo.downloadUrl;
                                        successDownLoadImageCounter++;
                                    })
                                    .catch(function(error) {
                                        console.error("AttachmentAction - Error: " + JSON.stringify(error));
                                    });
                            });
                        }
                    } else {
                        UxUtils.setAppend("#desc-section", textSection1);
                        $("div.desc-box p:last").attr("id", "contain-" + counterDescbox);
                        $("div.desc-box p#contain-" + counterDescbox).find("span.counter").text(counterDescbox);
                        Localizer.getString("text").then(function(result) {
                            $("div.desc-box p#contain-" + counterDescbox).find("span.training-type").text(result);
                            $("div.desc-box p#contain-" + counterDescbox).text(textTitle);
                        });
                    }

                } else if (data.valueType == "SingleOption" || data.valueType == "MultiOption") {
                    /* Question Attachments */
                    if (data.attachments.length > 0) {
                        imageCounter++;
                        let attachmentId = data.attachments[0].id;
                        let req = ActionHelper.getAttachmentInfo(contextActionId, attachmentId);
                        ActionHelper.executeApi(req).then(function(response) {
                                actionInstance.dataTables[ind].dataColumns[index].attachments[0].url = response.attachmentInfo.downloadUrl;
                                successDownLoadImageCounter++;
                            })
                            .catch(function(error) {
                                console.error("AttachmentAction - Error: " + JSON.stringify(error));
                            });
                    }
                    resQuestCount++;
                }

                $.each(data.options, function(optind, opt) {
                    if (opt.attachments != undefined && opt.attachments.length > 0) {
                        imageCounter++;
                        let attachmentId = opt.attachments[0].id;
                        let req = ActionHelper.getAttachmentInfo(contextActionId, attachmentId);
                        ActionHelper.executeApi(req).then(function(response) {
                                actionInstance.dataTables[ind].dataColumns[index].options[optind].attachments[0].url = response.attachmentInfo.downloadUrl;
                                successDownLoadImageCounter++;
                            })
                            .catch(function(error) {
                                console.error("AttachmentAction - Error: " + JSON.stringify(error));
                            });
                    }
                });

            });
            if (resQuestCount > 0) {
                let localeQuest = "";
                if (resQuestCount > 1) {
                    localeQuest = questionsKey;
                } else {
                    localeQuest = questionKey;
                }
                Localizer.getString("totalQuestionTraining", resQuestCount, localeQuest).then(function(result) {
                    UxUtils.setAppend("#question-msg", result);
                });
            }

        });
        UxUtils.setAfter("div.section-1", footerSection1);
        let tid = setInterval(() => {
            if (imageCounter == successDownLoadImageCounter) {
                $("#start").find(".spinner-border").remove();
                $("#start").removeClass("disabled");
                clearInterval(tid);
            }
        }, Constants.setIntervalTimeHundred());

    }
}

/**
 * @description Method to create question view
 * @param actionId string identifier
 */
function createQuestionView(indexNum, questionNumber) {
    actionInstance.dataTables.forEach((dataTable) => {
        dataTable.dataColumns.forEach((question, ind) => {
            if (ind == indexNum) {
                let $card = $(UxUtils.getQuestionCardBoxSection());
                let $questionHeading = UxUtils.getQuestionHeadingSection(questionKey, questionNumber, question.displayName);
                UxUtils.setAppend($card, $questionHeading);
                //add radio button
                if (question.valueType == "SingleOption") {
                    //add checkbox button
                    question.options.forEach((option) => {
                        let attachmentURL = option.attachments.length > 0 ? option.attachments[0].url : "";
                        let $radioOption = getRadioButton(
                            option.displayName,
                            question.name,
                            option.name,
                            attachmentURL
                        );
                        UxUtils.setAppend($card, $radioOption);
                    });
                } else {
                    question.options.forEach((option) => {
                        let attachmentURL = option.attachments.length > 0 ? option.attachments[0].url : "";
                        let $radioOption = getCheckboxButton(
                            option.displayName,
                            question.name,
                            option.name,
                            attachmentURL
                        );
                        UxUtils.setAppend($card, $radioOption);
                    });
                }
                UxUtils.setAppend("div.section-2 > .container:first", $card);
            }

        });
    });
    if (actionInstance.customProperties[Constants.getisShowAnswerEveryQuestionIndex()].value == "Yes" && $("div.card-box:visible").find("input").parent("label").attr("disabled") !== "disabled") {
        $("#next").text("Check").attr("id", "check").append(`<span class="next-btn-sec"></span> ${Constants.getNextCaratIcon()}`);
    }
}

/**
 * @description Method to create radio button
 * @param text string
 * @param name string
 * @param id string identifier
 */
function getRadioButton(text, name, id, attachmentURL) {
    let $divData = $(UxUtils.getRadioButtonSection(text, name, id));
    if (attachmentURL != "") {
        $divData.find(".custom-check").prepend(UxUtils.getOptionImageWithLoader(attachmentURL));
    }
    return $divData;
}

/**
 * @description Method to create checkbox button
 * @param text string
 * @param name string
 * @param id string identifier
 */
function getCheckboxButton(text, name, id, attachmentURL) {
    let $divData = $(UxUtils.getCheckboxButtonSection(text, name, id));
    if (attachmentURL != "") {
        // $divData.find(".custom-check").prepend(UxUtils.getOptionImageWithLoader(attachmentURL));
    }
    return $divData;
}

/**
 * @description Method to show Result view if already attempted the quiz
 */
function loadSummaryView() {
    $("div.section-2").hide();
    $("div.section-2-footer").hide();
    if ($(".section-3").length <= 0) {
        headSection1 = UxUtils.getResponseHeader(trainingContentKey);
        UxUtils.setAfter("div.section-2", UxUtils.getTrainingSummaryViewSection(trainingSummary));
        UxUtils.setAppend("div.section-3 .container:first", headSection1);
        /* Main Heading and Description */
        $("div.section-3 #multiple-attempt").hide();
        $("div.section-3 #quiz-title-image").hide();
        $("div.section-3 .quiz-updated-img").hide();
        $("div.section-3 #section1-training-title").hide();
        $("div.section-3 #section1-training-description").hide();
        $("div.section-3 #question-msg").hide();
        /* Create Text and Question summary */
        let resQuestCount = 0;
        actionInstance.dataTables.forEach((dataTable) => {
            dataTable.dataColumns.forEach((data) => {
                $("div.section-3").show();
                if (data.valueType == "LargeText") {
                    let counter = $("div.card-box").length;
                    let counterDescbox = $("div.desc-box").length;
                    /* Call Text Section 1 */
                    let textTitle = data.displayName;
                    UxUtils.setAppend("div.section-3 #desc-section", textSection1);
                    $("div.desc-box p:last").attr("id", "contain-" + counterDescbox);
                    $("div.desc-box p#contain-" + counterDescbox).find("span.counter").text(counterDescbox);
                    Localizer.getString("text").then(function(result) {
                        $("div.desc-box p#contain-" + counterDescbox).find("span.training-type").text(result);
                        $("div.desc-box p#contain-" + counterDescbox).text(textTitle);
                    });

                    if (data.name.indexOf("photo") >= 0) {
                        Localizer.getString("photo").then(function(result) {
                            $("div.desc-box p#contain-" + counterDescbox).find("span.training-type").text(result);
                            $("div.desc-box p#contain-" + counterDescbox).text(textTitle);
                        });
                        let attachments = data.attachments;
                        let $carousel = $(UxUtils.getResponseViewCarouselSection());
                        let $olSection = $(UxUtils.getCarouselOlSection());
                        let $carouselInner = $(UxUtils.getCarouselInnerSection());
                        if (attachments.length > 0) {
                            let count = 0;
                            UxUtils.setAppend($carousel, $olSection);
                            UxUtils.setAppend($carousel, $carouselInner);
                            attachments.forEach(function(att) {
                                let $imgDiv = $(UxUtils.getCarousalImages(count, att.url));
                                UxUtils.setAppend($carouselInner, $imgDiv);
                                UxUtils.setAppend($carousel, UxUtils.getCarouselSection());
                                count++;
                            });
                            UxUtils.setAfter($("div.card-box#content-" + counter).find("#text-description"), $carousel);
                            $(".carousel").carousel();
                        }
                    } else if (data.name.indexOf("video") >= 0) {
                        Localizer.getString("video").then(function(result) {
                            $("div.card-box#content-" + counter).find(".training-type").text(result);
                        });
                        UxUtils.setAfter($("div.card-box#content-" + counter).find("#text-description"), UxUtils.getTrainingVideoSection(data.name, data.attachments[0].url));
                    } else if (data.name.indexOf("document") >= 0) {
                        Localizer.getString("document").then(function(result) {
                            $("div.card-box#content-" + counter).find(".training-type").text(result);
                            UxUtils.setAfter($("div.card-box#content-" + counter).find("#text-description"), UxUtils.getTrainingDocumentSection(data.attachments[0].url, data.attachments[0].name));
                        });
                    }
                } else if (data.valueType == "SingleOption" || data.valueType == "MultiOption") {

                    /* Call Question Section 1 */
                    let textTitle = data.displayName;
                    let counterDescbox = $("div.desc-box").length;
                    let questionCounter = $("div.section-3 .container:first div.col-12 div.card-box div#desc-section div.question-box-sec").length;
                    questionCounter++;
                    if (questionCounter > 0) {
                        $("div.section-3 .container:first div.col-12 div.card-box p#question-msg").show();
                        $("div.section-3 .container:first div.col-12 div.card-box  span#question-counter").text(questionCounter);
                    }
                    UxUtils.setAppend("div#desc-section", questionSection1);
                    $("div.desc-box p:last").attr("id", "contain-" + counterDescbox);
                    $("div.desc-box p#contain-" + counterDescbox).find("span.counter").text(counterDescbox);
                    Localizer.getString("question_with", Utils.numbertowords(Object.keys(data.options).length)).then(function(result) {
                        $("div.desc-box p#contain-" + counterDescbox).find("span.training-type").text(result);
                        $("div.desc-box p#contain-" + counterDescbox).text(textTitle).hide();
                    });
                    resQuestCount++;
                }
            });

            if (resQuestCount > 0) {
                let localeQuest = "";
                if (resQuestCount > 1) {
                    localeQuest = questionsKey;
                } else {
                    localeQuest = questionKey;
                }
                Localizer.getString("totalQuestionTraining", resQuestCount, localeQuest).then(function(result) {
                    UxUtils.setAppend(".section-3 #question-msg", result);
                });
            }
            let $mb16Div2 = $(`<div class="mt--16"></div>`);
            /*  Check Show Correct Answer  */
            if (Object.keys(row).length > 0) {
                let correctAnswer = actionInstance.customProperties[Constants.getCorrectAnswerIndex()].value;
                let score = 0;
                $(".section-2").find("div.card-box-question").each(function(i, val) {
                    let cardQuestion = $(val).clone().show();
                    UxUtils.setAppend($(".section-3").find(".container:first"), cardQuestion);
                    let correctAnswerString = "";
                    let userAnswerString = "";
                    let userAnswerArray = row[i + 1];

                    if ($(val).find(`.option-sec input[type="radio"]`).length > 0) {

                        $(cardQuestion).find(".option-sec").each(function(i, optionSec) {
                            $(optionSec).find(".custom-radio-outer").addClass("disabled");
                            $(optionSec).find("div[tabindex=0]").attr("tabindex", "-1");
                        });

                        if (Utils.isJson(correctAnswer)) {
                            correctAnswer = JSON.parse(correctAnswer);
                        }
                        correctAnswerString = correctAnswer[i];
                        $(val).find(`.option-sec input[type="radio"]`).each(function(optindex, opt) {
                            let optId = $(opt).attr("id");
                            if (correctAnswer[i].includes(optId)) {
                                $(cardQuestion).find("input[type='radio']#" + optId).parent("label.custom-radio").find(".check-in-div").append(`&nbsp;<i class="success-with-img">
                                ${Constants.getSuccessTickIcon()}
                                </i>`);
                            }
                        });
                    } else {
                        $(cardQuestion).find(".option-sec").each(function(i, optionSec) {
                            $(optionSec).find(".custom-check-outer").addClass("disabled");
                            $(optionSec).attr("tabindex", "-1");
                        });
                        if (Utils.isJson(correctAnswer)) {
                            correctAnswer = JSON.parse(correctAnswer);
                        }
                        correctAnswerString = correctAnswer[i];
                        $(val).find(".option-sec input[type='checkbox']").each(function(optindex, opt) {
                            let optId = $(opt).attr("id");
                            if (correctAnswer[i].includes(optId)) {
                                $(cardQuestion).find("input[type='checkbox']#" + optId).parent("label.custom-check").find(".check-in-div").append(`&nbsp;<i class="success-with-img">
                                ${Constants.getSuccessTickIcon()}
                                </i>`);
                            }
                        });
                    }
                    if (Utils.isJson(userAnswerArray)) {
                        userAnswerString = JSON.parse(userAnswerArray).join(",");
                    } else {
                        userAnswerString = userAnswerArray;
                    }
                    if (correctAnswerString == userAnswerString) {
                        score++;
                        $(cardQuestion).find(".result-status").html(UxUtils.getCorrectArea(correctKey));
                    } else {
                        $(cardQuestion).find(".result-status").html(UxUtils.getIncorrectArea(incorrectKey));
                    }
                });
                let scoreIs = (score / correctAnswer.length) * 100;
                if (scoreIs % 1 != 0) {
                    scoreIs = parseFloat(scoreIs).toFixed(2);
                }
                Localizer.getString("score", ":").then(function(result) {
                    UxUtils.setAppend($mb16Div2, UxUtils.getScoreResponseView(result, scoreIs));
                });

                let summeryQuestionCounter = $("div.section-3 .container:first div.col-12 div.card-box div#desc-section div.question-box-sec").length;
                if (summeryQuestionCounter > 0) {
                    UxUtils.setBefore("div.section-3 .container:first div#response-cover-img ", $mb16Div2);
                }

                $(".summary-section").find(".option-sec .card-box").removeClass("alert-success");
            }
        });
        footerSection3 = UxUtils.getSummarySectionFooter(closeKey);
        UxUtils.setAfter("div.section-3 .container:first", footerSection3);
    }

}

// *********************************************** HTML ELEMENT END***********************************************

// *********************************************** SUBMIT ACTION***********************************************
/**
 * @description Method to submit form
 */
function submitForm() {
    ActionHelper
        .executeApi(ActionHelper.getContextRequest())
        .then(function(response) {
            console.info("GetContext - Response: " + JSON.stringify(response));
            addDataRows(response.context.actionId);
        })
        .catch(function(error) {
            console.error("GetContext - Error: " + JSON.stringify(error));
        });
}

/**
 * @description  Method to get data row
 * @param actioId string identifier
 */
function getDataRow(actionId) {
    if (Object.keys(row).length <= 0) {
        row = {
            "": ""
        };
    }
    let data = {
        id: Utils.generateGUID(),
        actionId: actionId,
        dataTableId: "TrainingDataSet",
        columnValues: row,
    };
    return data;
}

/**
 * @description  Method to add data row
 * @param actionId string identifier
 */
function addDataRows(actionId) {
    let addDataRowRequest = ActionHelper.addDataRow(getDataRow(actionId));
    // let closeViewRequest = ActionHelper.closeView();
    let batchRequest = ActionHelper.batchRequest([addDataRowRequest]);
    ActionHelper.executeBatchApi(batchRequest)
        .then(function(batchResponse) {
            console.info("BatchResponse: " + JSON.stringify(batchResponse));
        })
        .catch(function(error) {
            console.error("Error: " + JSON.stringify(error));
        });
}

/**
 * @description  Method to create training section with pagination
 * @param indexNum number identifier
 */
function createTrainingSection(indexNum) {
    /* Create Text and Question summary */
    actionInstance.dataTables.forEach((dataTable, index) => {
        if (index == 0) {
            let y = Object.keys(dataTable.dataColumns).length;
            $("#y").text(y);
            dataTable.dataColumns.forEach((data, ind) => {
                if (ind == indexNum) {
                    let x = ind + 1;
                    $("#x").text(x);
                    if (data.valueType == "LargeText") {
                        /* Call Text Section 1 */
                        UxUtils.setAppend("div.section-2 > .container:first", textSection2);
                        let counter = $("div.section-2 .container > div.card-box").length;
                        let textTitle = data.displayName;
                        let textDescription = data.options[0].displayName;
                        $("div.section-2 > .container:first > div.card-box:last").find("span.counter").text(counter);
                        $("div.section-2 > .container:first > div.card-box:last").find("#text-description").text(textTitle);
                        $("div.section-2 > .container:first > div.card-box:last").find(".text-content-section").text(textDescription);
                        $("div.section-2 > .container:first > div.card-box:last").attr("id", "page-" + counter);
                        if (data.name.indexOf("photo") >= 0) {
                            $("div.section-2 .container:first div.card-box:visible").find(".question-sec-card-box").removeClass("d-none");
                            UxUtils.setAppend($("div.section-2 > .container:first > div.card-box:last").find("#text-description"), loader);
                            Localizer.getString("photo").then(function(result) {
                                $("div.section-2 > .container:first > div.card-box:last").find("span.section-type-title").text(result);
                            });
                            let uniqueCarouselId = Constants.getUniqueId();
                            let attachments = data.attachments;
                            let $carousel = $(UxUtils.getResponseViewCarouselSection(uniqueCarouselId));
                            let $olSection = $(UxUtils.getCarouselOlSection());
                            let $carouselInner = $(UxUtils.getCarouselInnerSection());
                            let filesAmount = attachments.length;
                            let photoUploadCounter = 0;
                            if (attachments.length > 1) {
                                let count = 0;
                                UxUtils.setAppend($carousel, $olSection);
                                UxUtils.setAppend($carousel, $carouselInner);
                                attachments.forEach(function(att) {
                                    let $imgDiv = $(UxUtils.getCarousalImages(att.url, count, uniqueCarouselId));
                                    UxUtils.setAppend($carouselInner, $imgDiv);
                                    // UxUtils.setAppend($carousel, UxUtils.getCarouselSection());
                                    count++;
                                    photoUploadCounter++;
                                });

                                $("div.section-2 .container:first div.card-box:visible").find(".question-sec-card-box").removeClass("d-none");

                                UxUtils.setAppend($("div.section-2 .container:first div.card-box:visible").find(".question-sec-card-box"), $carousel);
                                // UxUtils.setAfter($("div.section-2 > .container:first > div.card-box:last").find("#text-description"), $carousel);

                                UxUtils.setAppend($carousel, UxUtils.getCarousalPagination(uniqueCarouselId));
                                $(".carousel").carousel();
                            } else {
                                let uniqueIdCarousel = Constants.getUniqueId();
                                photoUploadCounter++;
                                UxUtils.setAfter($("div.section-2 > .container:first > div.card-box:last").find("#text-description"), UxUtils.getSingleImageCarousel(attachments[0].url, uniqueIdCarousel));
                                $("div.section-2 .container:first div.card-box:visible").find(".question-sec-card-box").addClass("d-none");
                            }
                            let tid = setInterval(() => {
                                if (photoUploadCounter == filesAmount) {
                                    $("div.section-2 > .container:first > div.card-box").find(".loader-cover").remove();
                                    clearInterval(tid);
                                }
                            }, Constants.setIntervalTimeHundred());
                        } else if (data.name.indexOf("document") >= 0) {
                            UxUtils.setAppend($("div.section-2 > .container:first").find("#text-description"), loader);
                            Localizer.getString("document").then(function(result) {
                                $("div.section-2 > .container:first > div.card-box:last").find("span.section-type-title").text(result);
                            });
                            if (data.attachments[0].url != null) {
                                let tid = setInterval(() => {
                                    $("div.section-2 > .container:first > div.card-box").find(".loader-cover").remove();
                                    clearInterval(tid);
                                }, Constants.setIntervalTimeHundred());
                            }
                            UxUtils.setAfter($("div.section-2 > .container:first > div.card-box:last").find("#text-description"), UxUtils.getTrainingDocumentSection(data.attachments[0].url, data.attachments[0].name));
                        } else if (data.name.indexOf("video") >= 0) {
                            let textTitle = data.displayName;
                            let textDescription = data.options[0].displayName;
                            UxUtils.setAppend("div.section-1", textSection3);
                            $("div.section-2 > .container:first > div.card-box:last").find("span.counter").text(counter);
                            $("div.section-2 > .container:first > div.card-box:last").find("#text-description").text(textTitle);
                            $("div.section-2 > .container:first > div.card-box:last").find(".text-content-section").text(textDescription);
                            UxUtils.setAppend($("div.section-2 > .container:first").find("#text-description"), loader);
                            Localizer.getString("video").then(function(result) {
                                $("div.section-2 > .container:first > div.card-box:last").find("span.section-type-title").text(result);
                                $("div.section-2 > .container:first > div.card-box:last").find("img.image-sec").remove();
                                $("div.section-2 > .container:first > div.card-box:last").attr("id", data.name);
                            });
                            if (data.attachments[0].url != null) {
                                let tid = setInterval(() => {
                                    $("div.section-2 > .container:first > div.card-box").find(".loader-cover").remove();
                                    clearInterval(tid);
                                }, Constants.setIntervalTimeHundred());
                            }
                            UxUtils.setAfter($("div.section-2 > .container:first > div.card-box:last").find("#text-description"), UxUtils.getTrainingVideoSection(data.name, data.attachments[0].url));
                        } else {
                            /* text */
                            UxUtils.setAppend("div.section-1", textSection1);
                            $("div.card-box:last").find("span.counter").text(counter);
                            $("div.card-box:last").find("#text-description").text(textTitle);

                        }

                    } else if (data.valueType == "SingleOption" || data.valueType == "MultiOption") {
                        createQuestionView(indexNum, questCounter);
                        $("div.section-2 > .container:first > div.card-box:last").attr("id", "quiz-" + questCounter);
                        let filesAmountHeaderImg = data.attachments.length;
                        let photoUploadCounterHeaderImg = 0;
                        let uniqueIdCarousel = Constants.getUniqueId();
                        let counter = $("div.section-2 .container > div.card-box").length;
                        $("div.section-2 > .container:first > div.card-box:last").find(".result-status").attr("id", "status-" + counter);
                        if (data.attachments.length > 0) {
                            $("div.section-2 > .container:first > div.card-box:last").find("#question-image > img").before(loader);
                            UxUtils.setAppend($("div.section-2 #quiz-" + questCounter).find("div#question-image"), UxUtils.createImageLightBox(data.attachments[0].url, uniqueIdCarousel));
                            Utils.getClassFromDimension(data.attachments[0].url, $(`a[data-gallery=gallery${uniqueIdCarousel}]`).find("img"));
                            $(".quiz-updated-img").show();
                            if (data.attachments[0].url != null) {
                                photoUploadCounterHeaderImg++;
                            }
                        }
                        let tid = setInterval(() => {
                            if (photoUploadCounterHeaderImg == filesAmountHeaderImg) {
                                $("div.section-2 > .container:first > div.card-box:last > div.quiz-updated-img").find(".loader-cover").remove();
                                clearInterval(tid);
                            }
                        }, Constants.setIntervalTimeHundred());
                        if (data.options.length > 0) {
                            $.each(data.options, function(i, opt) {
                                if (opt.attachments != undefined && opt.attachments.length > 0 && opt.attachments[0].url != null) {

                                    $("div.section-2 > .container:first > div.card-box.card-box-question").find(`div#question${questCounter}option${i + 1}`).before(loader);

                                    let imageUrl = opt.attachments[0].url;
                                    if (opt.attachments[0].url != null) {
                                        $("div.section-2 > .container:first > div.card-box.card-box-question")
                                            .find(`input#question${questCounter}option${i + 1}`)
                                            .before(UxUtils.getQuizOptionImage(imageUrl, uniqueIdCarousel));
                                        $(`a[data-gallery=gallery${uniqueIdCarousel}]`).each(function(imageIndex, imageAnchSection) {
                                            Utils.getClassFromDimension(imageUrl, $(imageAnchSection).find("img"));
                                        });
                                    } else {
                                        $("div.section-2 > .container:first > div.card-box.card-box-question").find(`div#question${questCounter}option${i + 1}`).find("#question-image").hide();
                                    }
                                    // $(`div#question${questCounter}option${i + 1}`).find(".loader-cover").remove();
                                    $("div.section-2 > .container:first > div.card-box.card-box-question").find(`div#question${questCounter}option${i + 1}`).parents(".option-sec").find("div.loader-cover").hide();
                                }
                            });
                        }
                        $("div.section-2 > .container:first > div.card-box:last").find("span.counter").text(counter);
                        questCounter++;
                    }
                }
                if ($("#x").text() == $("#y").text()) {
                    $(".footer.section-2-footer .check-key").text(doneKey).append(`<span class="next-btn-sec"></span> ${Constants.getNextCaratIcon()}`);
                    $(".footer.section-2-footer #next").text(doneKey).append(`<span class="next-btn-sec"></span> ${Constants.getNextCaratIcon()}`);
                    $(".footer.section-2-footer #next").addClass("done-key");
                    $(".footer.section-2-footer #check").text(doneKey).append(`<span class="next-btn-sec"></span> ${Constants.getNextCaratIcon()}`);
                    $(".footer.section-2-footer #check").addClass("done-key");
                    $(".footer.section-2-footer .check-key").removeClass(".check-key").addClass("done-key");
                }
            });
        }
    });
}

// *********************************************** SUBMIT ACTION END***********************************************

// *********************************************** OTHER ACTION STARTS***********************************************

$(document).on("click", ".done-key", function() {
    submitForm();
});

/**
 * @event when click on start button on summary view of page
 */
$(document).on("click", "#start", function() {
    $("div.section-1").hide();
    $("div.section-1-footer").hide();
    UxUtils.setAfter("div.section-1", UxUtils.getTrainingSection());
    /* Show first section */
    UxUtils.setAfter("div.section-2", footerSection2);
    createTrainingSection(pagination);
    $("#back").prop("disabled", true);
    $("#back").addClass("disabled");
});

/**
 * @event click on check button for getting correct or incorrect answer
 */
$(document).on("click", "#check", function() {

    /* Question Validations */
    let data = [];
    let answerKeys = Utils.isJson(actionInstance.customProperties[Constants.getCorrectAnswerIndex()].value) ? JSON.parse(actionInstance.customProperties[Constants.getCorrectAnswerIndex()].value) : actionInstance.customProperties[Constants.getCorrectAnswerIndex()].value;
    let correctAnsArr = [];
    let selectedAnswer = [];
    let allOptions = [];
    let checkCounter = 0;
    let correctAnswer = false;
    let attrName = "";
    let isChecked = false;

    let quesIndex = "";
    let quesIndexArr = "";
    let rowIndex = "";

    $("div.card-box:visible").find("input[type='checkbox']:checked").each(function(ind, ele) {
        if ($(ele).is(":checked")) {
            quesIndex = $(this).parents(".card-box-question").attr("id");
            quesIndexArr = quesIndex.split("quiz-");
            rowIndex = quesIndexArr[quesIndexArr.length - 1];
            checkCounter++;
            selectedAnswer.push($.trim($(ele).attr("id")));
            attrName = $(ele).attr("name");
            data.push($(this).attr("id"));
            isChecked = true;
            allOptions.push($.trim($(this).attr("id")));
            if (!row[rowIndex]) {
                row[rowIndex] = [];
            }
            row[rowIndex] = JSON.stringify(data);
        }
    });

    $("div.card-box:visible").find("input[type='radio']:checked").each(function(ind, ele) {
        checkCounter++;
        selectedAnswer.push($.trim($(ele).attr("id")));
        attrName = $(ele).attr("name");
        allOptions.push($.trim($(this).attr("id")));
        quesIndex = $(this).parents(".card-box-question").attr("id");
        quesIndexArr = quesIndex.split("quiz-");
        rowIndex = quesIndexArr[quesIndexArr.length - 1];
        data.push($(this).attr("id"));
        isChecked = true;
        if (!row[rowIndex]) {
            row[rowIndex] = [];
        }
        row[rowIndex] = $(this).attr("id");
    });


    if (checkCounter <= 0) {
        $("#next").prop("disabled", true).addClass("disabled");
    } else {
        $("#next").prop("disabled", false).removeClass("disabled");
    }

    if ($(".error-msg").length > 0) {
        $(".error-msg").remove();
    }
    /* Validate if show answer is Yes */
    if (isChecked == true) {
        isChecked = false;
        let ansRes = [];

        $.each(selectedAnswer, function(i, selectedSubarray) {
            if ($.inArray(selectedSubarray, answerKeys[(attrName - 1)]) !== -1) {
                ansRes.push("true");
            } else {
                ansRes.push("false");
            }
        });

        if ((answerKeys[(attrName - 1)].length == ansRes.length) && ($.inArray("false", ansRes) == -1)) {
            correctAnswer = true;
        } else {
            correctAnswer = false;
        }

        $("div.section-2").find("div.card-box").each(function(inde, ele) {
            if ($(ele).is(":visible")) {
                summaryAnswerResp[inde] = correctAnswer;
                return false;
            }
        });
        let statusID = $("#x").text();
        if (actionInstance.customProperties[Constants.getisShowAnswerEveryQuestionIndex()].value == "Yes" && $("div.card-box:visible").find("input").parent("label").attr("disabled") !== "disabled") {
            if (correctAnswer == true) {
                $("div.card-box:visible").find("label.result-status span:last").remove();

                UxUtils.setAppend($("div.card-box:visible").find("#status-" + statusID), UxUtils.getCorrectArea(correctKey));

                $.each(answerKeys[(attrName - 1)], function(ii, subarr) {
                    correctAnsArr.push($.trim($("#" + subarr).text()));
                    UxUtils.setAppend($("#" + subarr).find("div.check-in-div"), `&nbsp;<i class="success-with-img">${Constants.getSuccessTickIcon()}</i>`);
                });

                $.each(allOptions, function(i, val) {
                    if ($.inArray(val, answerKeys[(attrName - 1)]) != -1) {
                        $("div.option-sec").find("div#" + val).parent().addClass("alert-success");
                    }
                });
                $("#check").text(nextKey).attr("id", "next").append(`<span class="next-btn-sec"></span> ${Constants.getNextCaratIcon()}`);

            } else {
                $("div.card-box:visible").find("label.result-status span:last").remove();
                UxUtils.setAppend($("div.card-box:visible").find("#status-" + statusID), UxUtils.getIncorrectArea(incorrectKey));
                $.each(answerKeys[(attrName - 1)], function(ii, subarr) {
                    correctAnsArr.push($.trim($("#" + subarr).text()));
                    UxUtils.setAppend($("#" + subarr).find("div.check-in-div"), `&nbsp;<i class="success-with-img">${Constants.getSuccessTickIcon()}</i>`);
                });

                $.each(allOptions, function(i, val) {
                    if ($.inArray(val, answerKeys[(attrName - 1)]) == -1) {
                        $("div.option-sec").find("div#" + val).parent().addClass("alert-danger");
                    }
                });
                $("#check").text(nextKey).attr("id", "next").append(`<span class="next-btn-sec"></span> ${Constants.getNextCaratIcon()}`);
            }

            $("div.section-2").find("div.card-box:visible").find("input").each(function(ind, ele) {
                $(ele).parent("label").attr("disabled", true);
                if ($(ele).parents("div.custom-radio-outer").length > 0) {
                    $(ele).parents("div.custom-radio-outer").addClass("disabled");
                    $(ele).parents("div.option-sec").find("div[tabindex=0]").attr("tabindex", "-1");
                } else {
                    $(ele).find("input[type=checkbox]").attr("disabled", true);
                    $(ele).parents("div.option-sec").find("div[tabindex=0]").attr("tabindex", "-1");
                }
            });
        }

    } else {
        Localizer.getString("notePleaseChooseChoice").then(function(result) {
            $("div.section-2").find("div.card-box:visible").find(".choice-required-err").remove();
            UxUtils.setAppend($("div.section-2").find("div.card-box:visible").find(".option-sec:last"), `<p class="mt--32 text-danger choice-required-err"><font>${result}</font></p>`);
        });
    }
});

/**
 * @event Change for radio or check box
 */
$(document).on("change", "input[type='radio'], input[type='checkbox']", function() {
    $(this).each(function(ind, opt) {
        if ($(opt).is(":checked")) {
            $(".text-danger.choice-required-err").remove();
            $("#next").attr("disabled", false).removeClass("disabled");
            return false;
        }
    });
});

/**
 * @event Click Event on next button to load next page or content
 */
$(document).on("click", "#next", function() {

    let data = [];
    let limit = $("#y").text();

    if ($(".error-msg").length > 0) {
        $(".error-msg").remove();
    }
    /* Validate */
    if ($("div.card-box:visible").find(".training-type").text() == "Question") {
        /* Question Validations */
        let answerKeys = Utils.isJson(actionInstance.customProperties[Constants.getCorrectAnswerIndex()].value) ? JSON.parse(actionInstance.customProperties[Constants.getCorrectAnswerIndex()].value) : actionInstance.customProperties[Constants.getCorrectAnswerIndex()].value;
        let correctAnsArr = [];
        let selectedAnswer = [];
        let checkCounter = 0;
        let correctAnswer = false;
        let attrName = "";
        let isChecked = false;
        $("div.card-box:visible").find("input[type='checkbox']:checked").each(function(ind, ele) {
            if ($(ele).is(":checked")) {
                checkCounter++;
                selectedAnswer.push($.trim($(ele).attr("id")));
                attrName = $(ele).attr("name");
                data.push($(this).attr("id"));
                isChecked = true;
                let quesIndex = $(this).parents(".card-box-question").attr("id");
                let quesIndexArr = quesIndex.split("quiz-");
                let rowIndex = quesIndexArr[quesIndexArr.length - 1];
                if (!row[rowIndex]) {
                    row[rowIndex] = [];
                }
                row[rowIndex] = JSON.stringify(data);
            }
        });

        $("div.card-box:visible").find("input[type='radio']:checked").each(function(ind, ele) {
            if ($(ele).is(":checked")) {
                checkCounter++;
                selectedAnswer.push($.trim($(ele).attr("id")));
                attrName = $(ele).attr("name");
                isChecked = true;
                let quesIndex = $(this).parents(".card-box-question").attr("id");
                let quesIndexArr = quesIndex.split("quiz-");
                let rowIndex = quesIndexArr[quesIndexArr.length - 1];
                if (!row[rowIndex]) {
                    row[rowIndex] = [];
                }
                row[rowIndex] = $(this).attr("id");
            }
        });
        if (checkCounter <= 0) {
            $("#next").prop("disabled", true).addClass("disabled");
        } else {
            $("#next").prop("disabled", false).removeClass("disabled");
        }

        /* Validate if show answer is Yes */
        if (isChecked == true) {
            $(".text-danger.choice-required-err").remove();
            $("#next").attr("disabled", "false").removeClass("disabled");
            isChecked = false;
            let ansRes = [];
            $.each(selectedAnswer, function(i, selectedSubarray) {
                if ($.inArray(selectedSubarray, answerKeys[(attrName - 1)]) !== -1) {
                    ansRes.push("true");
                } else {
                    ansRes.push("false");
                }
            });

            if ((answerKeys[(attrName - 1)].length == ansRes.length) && ($.inArray("false", ansRes) == -1)) {
                correctAnswer = true;
            } else {
                correctAnswer = false;
            }

            $("div.section-2").find("div.card-box").each(function(inde, ele) {
                if ($(ele).is(":visible")) {
                    summaryAnswerResp[inde] = correctAnswer;
                    return false;
                }
            });

            $.each(answerKeys[(attrName - 1)], function(ii, subarr) {
                correctAnsArr.push($.trim($("#" + subarr).text()));
            });

            if (actionInstance.customProperties[Constants.getisShowAnswerEveryQuestionIndex()].value == "Yes" && $("div.card-box:visible").find("input").parent("label").attr("disabled") !== "disabled") {
                if (correctAnswer == true) {
                    /* If Correct Answer */
                    pagination++;
                    let limit = $("#y").text();
                    if (pagination < limit) {
                        $("#next").prop("disabled", false).removeClass("disabled");
                        $("#back").prop("disabled", false).removeClass("disabled");

                        $("div.section-2 > .container:first > div.card-box:nth-child(" + pagination + ")").hide();
                        if ($("div.section-2 > .container:first > div.card-box").length <= pagination) {
                            createTrainingSection(pagination);
                        } else {
                            $("div.section-2 > .container:first > div.card-box:nth-child(" + (pagination + 1) + ")").show();
                            setTimeout(
                                function() {
                                    if ($("div.card-box:visible").find(".training-type").text() == "Question") {
                                        if (actionInstance.customProperties[Constants.getisShowAnswerEveryQuestionIndex()].value == "Yes" && $("div.card-box:visible").find("input").parent("label").attr("disabled") !== "disabled") {
                                            $("#next").html(`Check ${Constants.getNextCaratIcon()}`).attr("id", "check");
                                        }
                                    }
                                }, Constants.setIntervalTimeFiveHundred());
                        }
                        $("#x").text((pagination + 1));

                    }
                } else {
                    /* If Incorrect */
                    let limit = $("#y").text();
                    pagination++;

                    if (pagination < limit) {
                        $("#next").prop("disabled", false).removeClass("disabled");
                        $("#back").prop("disabled", false).removeClass("disabled");
                        $("div.section-2 > .container:first > div.card-box:nth-child(" + pagination + ")").hide();
                        if ($("div.section-2 > .container:first > div.card-box").length <= pagination) {
                            createTrainingSection(pagination);
                        } else {
                            $("div.section-2 > .container:first > div.card-box:nth-child(" + (pagination + 1) + ")").show();
                            setTimeout(
                                function() {
                                    if ($("div.card-box:visible").find(".training-type").text() == "Question") {
                                        if (actionInstance.customProperties[Constants.getisShowAnswerEveryQuestionIndex()].value == "Yes" && $("div.card-box:visible").find("input").parent("label").attr("disabled") !== "disabled") {
                                            $("#next").html(`Check ${Constants.getNextCaratIcon()}`).attr("id", "check");
                                        }
                                    }
                                }, Constants.setIntervalTimeFiveHundred());
                        }
                        $("#x").text((pagination + 1));
                    } else {
                        /* Show Summary */
                        $("#next").prop("disabled", true).addClass("disabled");
                    }
                }
            } else {
                /* If Question is not answerable */
                let limit = $("#y").text();
                pagination++;
                if (pagination < limit) {
                    $("#next").prop("disabled", false).removeClass("disabled");
                    $("#back").prop("disabled", false).removeClass("disabled");

                    $("div.section-2 > .container:first > div.card-box:nth-child(" + pagination + ")").hide();
                    if ($("div.section-2 > .container:first > div.card-box").length <= pagination) {
                        createTrainingSection(pagination);
                    } else {
                        $("div.section-2 > .container:first > div.card-box:nth-child(" + (pagination + 1) + ")").show();
                        setTimeout(
                            function() {
                                if ($("div.card-box:visible").find(".training-type").text() == "Question") {
                                    if (actionInstance.customProperties[Constants.getisShowAnswerEveryQuestionIndex()].value == "Yes" && $("div.card-box:visible").find("input").parent("label").attr("disabled") !== "disabled") {
                                        $("#next").html(`Check ${Constants.getNextCaratIcon()}`).attr("id", "check");
                                    }
                                }
                            }, Constants.setIntervalTimeFiveHundred());
                    }
                    $("#x").text((pagination + 1));

                    $("div.section-2").find("div.card-box").each(function(inde, ele) {
                        if ($(ele).is(":visible")) {
                            summaryAnswerResp[inde] = true;
                            return false;
                        }
                    });
                } else {
                    /* Show Summary */
                    $("#next").prop("disabled", true).addClass("disabled");
                    loadSummaryView();
                }
            }
        } else {
            Localizer.getString("notePleaseChooseChoice").then(function(result) {
                UxUtils.setAppend($("div.section-2").find("div.card-box:visible").find(".option-sec:last"), `<p class="mt--32 text-danger choice-required-err"><font>${result}</font></p>`);
            });
        }

        if (pagination >= limit) {
            loadSummaryView();
        }
    } else {
        /* Not Question Type */
        pagination++;
        limit = $("#y").text();
        if (pagination < limit) {
            $("#next").prop("disabled", false).removeClass("disabled");
            $("#back").prop("disabled", false).removeClass("disabled");

            $("div.section-2 > .container:first > div.card-box:nth-child(" + pagination + ")").hide();
            if ($("div.section-2 > .container:first > div.card-box").length <= pagination) {
                createTrainingSection(pagination);
            } else {
                $("div.section-2 > .container:first > div.card-box:nth-child(" + (pagination + 1) + ")").show();
                setTimeout(
                    function() {
                        if ($("div.card-box:visible").find(".training-type").text() == "Question") {
                            if (actionInstance.customProperties[Constants.getisShowAnswerEveryQuestionIndex()].value == "Yes" && $("div.card-box:visible").find("input").parent("label").attr("disabled") !== "disabled") {
                                $("#next").html(`Check ${Constants.getNextCaratIcon()}`).attr("id", "check");
                            }
                        }
                    }, Constants.setIntervalTimeFiveHundred());
            }
            $("#x").text((pagination + 1));
        } else {
            /* Show Summary */
            $("#next").prop("disabled", true).addClass("disabled");
            loadSummaryView();
        }
        if (pagination >= limit) {
            loadSummaryView();
        }
    }
    console.log("row ", row);
    if ($("#x").text() == $("#y").text()) {
        $(".footer.section-2-footer .check-key").text(doneKey).append(`<span class="next-btn-sec"></span> ${Constants.getNextCaratIcon()}`);
        $(".footer.section-2-footer #next").text(doneKey).append(`<span class="next-btn-sec"></span> ${Constants.getNextCaratIcon()}`);
        $(".footer.section-2-footer #next").addClass("done-key");
        $(".footer.section-2-footer #check").text(doneKey).append(`<span class="next-btn-sec"></span> ${Constants.getNextCaratIcon()}`);
        $(".footer.section-2-footer #check").addClass("done-key");
        $(".footer.section-2-footer .check-key").removeClass(".check-key").addClass("done-key");
    }
});

/**
 * @event click on back button
 */
$(document).on("click", "#back", function() {
    let $countn = 0;
    if ($countn >= 1) {
        $("#next").after(UxUtils.getNextBtnSpan).find(".next-btn-sec").text(nextKey);
        $("#check").after(UxUtils.getNextBtnSpan).find(".next-btn-sec").text(nextKey);
        $countn++;
    }
    if ($("#next").hasClass("done-key")) {

        $("#next").removeClass("done-key");

        $("#next").text("");
        $("#next").append(`<span class="next-btn-sec"></span>${Constants.getNextCaratIcon()}`).find(".next-btn-sec").text(nextKey);
    }
    $("#next").removeClass("done-key");
    $("#next").removeClass("done-key");
    if ($(".error-msg").length > 0) {
        $(".error-msg").remove();
    }
    if ($("#check").length > 0) {
        $("#check").html(`Next ${Constants.getNextCaratIcon()}`).attr("id", "next");
    }
    if (pagination < 1) {
        $("#back").prop("disabled", true).addClass("disabled");
    } else {
        $("#back").prop("disabled", false).removeClass("disabled");
        $("#next").prop("disabled", false).removeClass("disabled");
        $("div.section-2 > .container:first > div.card-box:nth-child(" + (pagination + 1) + ")").hide();
        $("div.section-2 > .container:first > div.card-box:nth-child(" + pagination + ")").show();
        setTimeout(
            function() {
                if ($("div.card-box:visible").find(".training-type").text() == "Question") {
                    if (actionInstance.customProperties[Constants.getisShowAnswerEveryQuestionIndex()].value == "Yes" && $("div.card-box:visible").find("input").parent("label").attr("disabled") !== "disabled") {
                        $("#next").html(`Check ${Constants.getNextCaratIcon()}`).attr("id", "check");
                    }
                }
            }, Constants.setIntervalTimeFiveHundred());
        $("#x").text(pagination);
        pagination--;
    }
    if ($("#x").text() == $("#y").text()) {
        $(".footer.section-2-footer .check-key").text(doneKey).append(`<span class="next-btn-sec"></span> ${Constants.getNextCaratIcon()}`);
        $(".footer.section-2-footer #next").text(doneKey).append(`<span class="next-btn-sec"></span> ${Constants.getNextCaratIcon()}`);
        $(".footer.section-2-footer #next").addClass("done-key");
        $(".footer.section-2-footer #check").text(doneKey).append(`<span class="next-btn-sec"></span> ${Constants.getNextCaratIcon()}`);
        $(".footer.section-2-footer #check").addClass("done-key");
        $(".footer.section-2-footer .check-key").removeClass(".check-key").addClass("done-key");
    }
});

/**
 * @event Click to submit form
 */
$(document).on("click", ".submit-form", function() {
    let closeViewRequest = ActionHelper.closeView();
    ActionHelper
        .executeApi(closeViewRequest)
        .then(function(batchResponse) {
            console.info("BatchResponse: " + JSON.stringify(batchResponse));
        })
        .catch(function(error) {
            console.error("Error3: " + JSON.stringify(error));
        });
});

/**
 * @event Click to Show image lightbox
 */
$(document).on("click", '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox({
        alwaysShowClose: true
    });
});

// *********************************************** OTHER ACTION END ***********************************************

/**
 * @description Variable contains head section
 */
let headSection1 = UxUtils.getResponseHeader(trainingContentKey);

/**
 * @description Variable contains text Landing section
 */
let textSection1 = UxUtils.getResponseLandingSection();

/**
 * @description Variable contains Text Section View
 */
let textSection3 = UxUtils.getResponseTextSection();

/**
 * @description Variable contains Question Section View
 */
let questionSection1 = UxUtils.getResponseQuestionSection();

/**
 * @description Variable contains footer section
 */
Localizer.getString("start").then(function(result) {
    startKey = result;
    footerSection1 = UxUtils.getFooterLanding(startKey);
});

/**
 * @description Variable contains text view Training section
 */
let textSection2 = UxUtils.getResponseTextTrainingSection();

/**
 * @description Variable contains footer section
 */
Localizer.getString("next").then(function(result) {
    nextKey = result;
    Localizer.getString("previous").then(function(results) {
        previousKey = results;
        footerSection2 = UxUtils.getResponseTrainingSectionFooter(previousKey, nextKey);
    });
});

/**
 * @description Variable contains footer section
 */
footerSection3 = UxUtils.getSummarySectionFooter(closeKey);

/**
 * Variable contains Loader
 */
let loader = UxUtils.getLoaderArea();