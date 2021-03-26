// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import "../common/utils/JqueryGlobal";
import "bootstrap/dist/js/bootstrap";
import "bootstrap-datepicker";
import "bootstrap-datetime-picker";
import "../common/utils/BootstrapLocaleFile";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css";
import "bootstrap-datetime-picker/css/bootstrap-datetimepicker.min.css";
import { Localizer, ActionHelper } from "../common/ActionSdkHelper";
import * as html2canvas from "html2canvas";
import { KeyboardUtils } from "../common/utils/KeyboardUtils";
import { UxUtils } from "../common/utils/UxUtils";
import { Utils } from "../common/utils/Utils";
import { Constants } from "../common/utils/Constants";
import "../../assets/css/style-custom";
import "../../assets/css/style-default";

let actionContext = null;
let actionInstance = null;
let actionSummary = null;
let actionDataRows = null;
let actionDataRowsLength = 0;
let responderDate = [];
let actionNonResponders = [];
let myUserId = "";
let score = 0;
let total = 0;
let answerIs = "";
let actionId = "";
let dataResponse = "";
let isCreator = "";
let changeDueDateKey = "";
let cancelKey = "";
let confirmKey = "";
let changeKey = "";
let closeKey = "";
let closeTrainingConfirmKey = "";
let deleteTrainingConfirmKey = "";
let downloadCSVKey = "";
let downloadKey = "";
let downloadImageKey = "";
let dueByKey = "";
let expiredOnKey = "";
let changeDueByKey = "";
let closeTrainingKey = "";
let deleteTrainingKey = "";
let correctKey = "";
let incorrectKey = "";
let questionKey = "";
let questionsKey = "";
let request = ActionHelper.getContextRequest();
let context = "";
let scoreKey = "";
let questionCount = 0;
let trainingContentKey = "";
let contentSection = "";
let theme = "";
let subscriberResponse = "";
let isGetResult = false;

loadDetailView(request);

/* Document get ready */
$(function() {
    OnPageLoad();
});

$(document).on("click", "a.dropdown-item ", function() {
    $("body").find("div.show").removeClass("show");
});

/*
 * Method for fetching localization strings
 */
async function getStringKeys() {
    Localizer.getString("dueBy").then(function(result) {
        dueByKey = result;
    });

    Localizer.getString("expiredOn").then(function(result) {
        expiredOnKey = result;
    });

    Localizer.getString("question").then(function(result) {
        questionKey = result;
    });

    Localizer.getString("questions").then(function(result) {
        questionsKey = result;
    });

    Localizer.getString("correct").then(function(result) {
        correctKey = result;
    });
    Localizer.getString("incorrect").then(function(result) {
        incorrectKey = result;
    });

    Localizer.getString("responders").then(function(result) {
        UxUtils.setText(".responder-key", result);
    });

    Localizer.getString("nonResponders").then(function(result) {
        UxUtils.setText(".non-responder-key", result);
    });

    Localizer.getString("changeDueBy").then(function(result) {
        changeDueByKey = result;
        UxUtils.setText(".change-due-by-key", changeDueByKey);
    });

    Localizer.getString("closeTraining").then(function(result) {
        closeTrainingKey = result;
        UxUtils.setText(".close-quiz-key", closeTrainingKey);
    });

    Localizer.getString("deleteTraining").then(function(result) {
        deleteTrainingKey = result;
        UxUtils.setText(".delete-quiz-key", deleteTrainingKey);
    });

    Localizer.getString("changeDueDate").then(function(result) {
        changeDueDateKey = result;
        UxUtils.setHtml(".change-due-date-key", changeDueDateKey);
    });

    Localizer.getString("close").then(function(result) {
        closeKey = result;
        UxUtils.setHtml(".close-key", closeKey);
    });

    Localizer.getString("cancel").then(function(result) {
        cancelKey = result;
        UxUtils.setHtml(".cancel-key", cancelKey);
    });

    Localizer.getString("confirm").then(function(result) {
        confirmKey = result;
        UxUtils.setHtml(".confirm-key", confirmKey);
    });

    Localizer.getString("change").then(function(result) {
        changeKey = result;
        UxUtils.setHtml(".change-key", changeKey);
    });

    Localizer.getString("closeTrainingConfirm").then(function(result) {
        closeTrainingConfirmKey = result;
        UxUtils.setHtml(".close-quiz-confirm-key", closeTrainingConfirmKey);
    });

    Localizer.getString("deleteTrainingConfirm").then(function(result) {
        deleteTrainingConfirmKey = result;
        UxUtils.setHtml(".close-quiz-confirm-key", deleteTrainingConfirmKey);
    });

    Localizer.getString("download").then(function(result) {
        downloadKey = result;
        UxUtils.setHtml("#download-key", downloadKey);
    });

    Localizer.getString("downloadImage").then(function(result) {
        downloadImageKey = result;
        UxUtils.setHtml("#download-image-key", downloadImageKey);
    });

    Localizer.getString("downloadCSV").then(function(result) {
        downloadCSVKey = result;
        UxUtils.setHtml("#download-csv-key", downloadCSVKey);
    });

    Localizer.getString("score", ":").then(function(result) {
        scoreKey = result;
    });

    Localizer.getString("trainingContent", ":").then(function(result) {
        trainingContentKey = result;
        UxUtils.setHtml(".training-content-key", result);
    });
}

/*
 * Method to get theme color
 * @param request object
 */
async function loadDetailView(request) {
    getStringKeys();
    dataResponse = await ActionHelper.executeApi(request);
    context = dataResponse.context;
    $("form.section-1").show();
    theme = "default"; // Remove this to enable theme based css
    $("link#theme").attr("href", "css/style-" + theme + ".css");
    theme = context.theme;
    ActionHelper.hideLoader();
}

/*
 * Method to create app body when page load
 */
function OnPageLoad() {
    ActionHelper.executeApi(request)
        .then(function(response) {
            console.info("GetContext - Response: " + JSON.stringify(response));
            actionContext = response.context;
            actionId = response.context.actionId;
            getDataRows(response.context.actionId);
        })
        .catch(function(error) {
            console.error("GetContext - Error: " + JSON.stringify(error));
        });
}

/*
 * Method to get data rows
 * @param actionId number
 */
function getDataRows(actionId) {
    let getActionRequest = ActionHelper.getActionRequest(actionId);
    let getSummaryRequest = ActionHelper.getDataRowSummary(actionId, true);
    let getDataRowsRequest = ActionHelper.requestDataRows(actionId);
    let batchRequest = ActionHelper.batchRequest([getActionRequest, getSummaryRequest, getDataRowsRequest]);
    ActionHelper.executeBatchApi(batchRequest).then(function(batchResponse) {
        console.info("BatchResponse: " + JSON.stringify(batchResponse));
        actionInstance = batchResponse.responses[0].action;
        actionSummary = batchResponse.responses[1].summary;
        actionDataRows = batchResponse.responses[2].dataRows;
        if (actionDataRows == null) {
            actionDataRowsLength = 0;
        } else {
            actionDataRowsLength = actionDataRows.length;
        }
        createBody();
    }).catch(function(error) {
        console.log("Console log: Error: " + JSON.stringify(error));
    });
}

/*
 * Method to create boady
 */
async function createBody() {
    await getUserprofile();
    let getSubscriptionCount = "";
    UxUtils.clearHtml("#root");
    /*  Head Section  */
    if (myUserId == dataResponse.context.userId && myUserId == actionInstance.creatorId) {
        isCreator = true;
    }
    isGetResult = false;
    head();
    if (isCreator === true) {
        if (actionInstance.status == "Closed") {
            $(".close-quiz-event").remove();
            $(".change-due-by-event").remove();
        }
        if (actionInstance.status == "Expired") {
            $(".change-due-by-event").remove();
        }
    }

    /*  Person Responded X of Y Responses  */
    getSubscriptionCount = ActionHelper.getSubscriptionMemberCount(actionContext.subscription);

    subscriberResponse = await ActionHelper.executeApi(getSubscriptionCount);

    if (isCreator == true) {
        let $pcard = $(UxUtils.divTemplate("progress-section", ""));
        let memberCount = subscriberResponse.memberCount;
        let participationPercentage = 0;

        participationPercentage = Math.round(
            (actionSummary.rowCreatorCount / memberCount) * 100
        );
        Localizer.getString("participation", participationPercentage).then(function(result) {
            UxUtils.setAppend($pcard, UxUtils.getParticipationProgress(result, participationPercentage));
        });
        Localizer.getString("xofyPeopleResponded", actionSummary.rowCount, memberCount).then(function(result) {
            UxUtils.setAppend($pcard, UxUtils.getTotalPeopleRespondedString(result));
        });
        UxUtils.setAppend("#root", $pcard);
    }
    let responderDateLength = Object.keys(responderDate).length;
    if (responderDateLength > 0) {
        if (myUserId == dataResponse.context.userId && myUserId == actionInstance.creatorId) {
            createCreatorQuestionView(myUserId);
        } else if (myUserId == dataResponse.context.userId && myUserId != actionInstance.creatorId) {
            let isResponded = false;
            responderDate.forEach((responder) => {
                if (responder.value2 == myUserId) {
                    createQuestionView(myUserId, true);
                    isResponded = true;
                }
            });

            if (isResponded == false) {
                actionNonResponders.forEach((nonresponders) => {
                    if (nonresponders.value2 == myUserId) {
                        let name = nonresponders.label;
                        let matches = name.match(/\b(\w)/g); // [D,P,R]
                        let initials = matches.join("").substring(0, 2); // DPR
                        Localizer.getString("youYetRespond").then(function(result) {
                            UxUtils.setAppend("div#root div:first", UxUtils.getInitials(nonresponders.value2, initials, result));
                            UxUtils.setAppend("div#root div:first", UxUtils.breakline());
                            UxUtils.setAfter("div#" + nonresponders.value2, UxUtils.breakline());
                        });
                    }
                });
            }
        } else {
            responderDate.forEach((responder) => {
                if (responder.value2 == myUserId) {
                    createResponderQuestionView(myUserId, responder);
                }
            });
        }
    } else {
        actionNonResponders.forEach((nonresponders) => {
            if (nonresponders.value2 == myUserId) {
                if (myUserId == dataResponse.context.userId && myUserId == actionInstance.creatorId) {
                    createCreatorQuestionView(myUserId);
                } else {
                    let name = nonresponders.label;
                    let matches = name.match(/\b(\w)/g); // [D,P,R]
                    let initials = matches.join("").substring(0, 2); // DPR
                    Localizer.getString("youYetRespond").then(function(result) {
                        UxUtils.setAppend("#root div:first", UxUtils.getInitials(nonresponders.value2, initials, result));
                        UxUtils.setAppend("#root div:first", UxUtils.breakline());
                        UxUtils.setAfter("div#" + nonresponders.value2, UxUtils.breakline());
                    });
                }
            }
        });
    }

    if (isCreator == true) {
        if (context.hostClientType == "web" || context.hostClientType == "desktop") {
            footerDownload();
        }
    } else {
        footerClose();
    }
    return true;
}

/**
 * @description Method for footer for return back to landing page
 */
function footerClose() {
    UxUtils.setAppend("#root", UxUtils.getFooterCloseArea(closeKey));
}

/**
 * @description Method for footer with download button
 */
function footerDownload() {
    UxUtils.setAppend("#root", UxUtils.getFooterDownloadButton(downloadKey, downloadImageKey, downloadCSVKey));
}

/**
 * @description Method for creating head section for title, progress bar, dueby
 */
function head() {
    let title = actionInstance.displayName;
    let description = actionInstance.customProperties[0]["value"];
    let options = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
    let expiryTime = new Date(actionInstance.expiryTime);
    let dueby = expiryTime.toLocaleDateString(context.locale, options);
    let $card = $(UxUtils.divTemplate("", ""));
    let $titleDiv = "";
    let $titleSec = "";
    let $creatorButtons = "";
    if (isCreator === true) {
        $titleDiv = $(UxUtils.divTemplate("d-table mb--4", ""));
        $titleSec = $(UxUtils.getQuizTitle(title));
        if(isGetResult === false){
            $creatorButtons = $(UxUtils.creatorQuizDateManageSection(changeDueByKey, closeTrainingKey, deleteTrainingKey));
        }
    } else {
        $titleSec = $(UxUtils.getQuizTitleResponders(title));
    }
    let $descriptionSec = $(UxUtils.getQuizDescription(description));
    let currentTimestamp = new Date().getTime();
    let $dateSec = $(UxUtils.getResponderQuizDate(actionInstance.expiryTime, currentTimestamp, dueByKey, expiredOnKey, dueby));
    if (isCreator === true) {
        UxUtils.setAppend($titleDiv, $titleSec);
        UxUtils.setAppend($titleDiv, $creatorButtons);
        UxUtils.setAppend($card, $titleDiv);
    } else {
        UxUtils.setAppend($card, $titleSec);
    }
    UxUtils.setAppend($card, $descriptionSec);
    UxUtils.setAppend($card, $dateSec);
    UxUtils.setAppend("#root", $card);

    if (actionInstance.dataTables[0].attachments.length > 0 && (actionInstance.dataTables[0].attachments[0].id != null || actionInstance.dataTables[0].attachments[0].id != "")) {
        let req = ActionHelper.getAttachmentInfo(actionId, actionInstance.dataTables[0].attachments[0].id);
        ActionHelper.executeApi(req).then(function(response) {
                UxUtils.setPrepend("#root div:first", UxUtils.getQuizBannerImageWithLoader(response.attachmentInfo.downloadUrl));
                Utils.getClassFromDimension(response.attachmentInfo.downloadUrl, ".quiz-template-image");
            })
            .catch(function(error) {
                console.error("AttachmentAction - Error: " + JSON.stringify(error));
            });
    }
}

/*
 * Method to get user profile
 */
async function getUserprofile() {
    let memberIds = [];
    responderDate = [];
    actionNonResponders = [];
    if (actionDataRowsLength > 0) {
        for (let i = 0; i < actionDataRowsLength; i++) {
            memberIds.push(actionDataRows[i].creatorId);
            let requestResponders = ActionHelper.getSusbscriptionMembers(actionContext.subscription, [actionDataRows[i].creatorId]);
            let responseResponders = await ActionHelper.executeApi(requestResponders);
            let perUserProfile = responseResponders.members;
            responderDate.push({
                label: perUserProfile[0].displayName,
                value: new Date(actionDataRows[i].updateTime).toDateString(),
                value2: perUserProfile[0].id,
            });
        }
    }

    myUserId = actionContext.userId;
    let requestNonResponders = ActionHelper.getSubscriptionNonParticipants(actionContext.actionId, actionContext.subscription.id);
    let responseNonResponders = await ActionHelper.executeApi(requestNonResponders);
    let tempresponse = responseNonResponders.nonParticipants;
    if (tempresponse != null) {
        for (let i = 0; i < tempresponse.length; i++) {
            actionNonResponders.push({
                label: tempresponse[i].displayName,
                value2: tempresponse[i].id,
            });
        }
    }
}

/*
 * Method to get respponders list
 */
function getResponders() {
    UxUtils.clearHtml("table#responder-table tbody");
    for (let itr = 0; itr < responderDate.length; itr++) {
        let name = "";
        name = responderDate[itr].label;
        let options = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
        let respondDate = new Date(responderDate[itr].value);
        let date = respondDate.toLocaleDateString(context.locale, options);
        let matches = responderDate[itr].label.match(/\b(\w)/g); // [D,P,R]
        let initials = matches.join("").substring(0, 2); // DPR
        let correctAnswer = Utils.isJson(actionInstance.customProperties[Constants.getCorrectAnswerIndex()].value) ? JSON.parse(actionInstance.customProperties[Constants.getCorrectAnswerIndex()].value) : actionInstance.customProperties[Constants.getCorrectAnswerIndex()].value;
        if (correctAnswer.length > 0) {
            let score = scoreCalculate(responderDate[itr].value2);
            UxUtils.setAppend($(".tabs-content:first").find("table#responder-table tbody"), UxUtils.getResponderScoreWithDate(responderDate[itr].value2, initials, name, date, scoreKey, score));
        } else {
            UxUtils.setAppend($(".tabs-content:first").find("table#responder-table tbody"), UxUtils.getResponderWithDate(responderDate[itr].value2, initials, name, date, scoreKey, score));
        }
    }
}

/**
 * @description Calculate the score
 * @param userId String Identifier
 */
function scoreCalculate(userId) {
    let total = 0;
    let score = 0;
    actionInstance.dataTables.forEach((dataTable) => {
        dataTable.dataColumns.forEach((question) => {
            if (question.valueType == "SingleOption" || question.valueType == "MultiOption") {
                total++;
            }
        });

        /* Correct Answer */
        let correctResponse = JSON.parse(
            actionInstance.customProperties[Constants.getCorrectAnswerIndex()].value
        );
        for (let i = 0; i < actionDataRowsLength; i++) {
            if (actionDataRows[i].creatorId == userId) {
                for (let c = 0; c < correctResponse.length; c++) {
                    let correctAnsString = "";
                    let userAnsString = "";
                    if (Array.isArray(correctResponse[c])) {
                        if (correctResponse[c].length > 1) {
                            correctAnsString = correctResponse[c].join(",");
                        } else {
                            correctAnsString = correctResponse[c][0];
                        }
                    } else {
                        correctAnsString = correctResponse[c];
                    }

                    if (Utils.isJson(actionDataRows[i].columnValues[c + 1])) {
                        let responderAnsArr = JSON.parse(actionDataRows[i].columnValues[c + 1]);
                        if (responderAnsArr != null) {
                            if (responderAnsArr.length > 1) {
                                userAnsString = responderAnsArr.join(",");
                            } else {
                                userAnsString = responderAnsArr[0];
                            }
                        } else {
                            userAnsString = "";
                        }
                    } else {
                        userAnsString = actionDataRows[i].columnValues[c + 1];
                    }

                    if (correctAnsString == userAnsString) {
                        score++;
                    }

                }
            }
        }
    });
    let scoreIs = (score / total) * 100;
    if (scoreIs % 1 != 0) {
        scoreIs = scoreIs.toFixed(2);
    }
    return scoreIs;
}

/*
 * Method to get non responders list
 */
function getNonresponders() {
    UxUtils.clearHtml("table#non-responder-table tbody");
    for (let itr = 0; itr < actionNonResponders.length; itr++) {
        let name = "";
        name = actionNonResponders[itr].label;
        let matches = actionNonResponders[itr].label.match(/\b(\w)/g); // [D,P,R]
        let initials = matches.join("").substring(0, 2); // DPR
        UxUtils.setAppend($(".tabs-content:first").find("table#non-responder-table tbody"), UxUtils.getNonRespondersInitials(initials, name));
    }
}

/*
 * Event to get result based on userId
 */
$(document).on("click", ".getresult", function() {
    let userId = $(this).attr("id");
    UxUtils.clearHtml("#root");
    isGetResult = true;
    head();
    UxUtils.setAppend("#root", $(".question-content").clone());

    createQuestionView(userId, false);
    footer(userId);
});

/*
 * Method to create responder question view
 * @param userId string identifier
 * @param responder object
 */
function createResponderQuestionView(userId, responder) {
    UxUtils.clearHtml("div#root > div.question-content");
    answerIs = "";
    total = 0;
    score = 0;

    let name = responder.label;
    let matches = name.match(/\b(\w)/g); // [D,P,R]
    let initials = matches.join("").substring(0, 2); // DPR
    let $youSection = UxUtils.getRespondersInitials(myUserId, initials, name, responder.value);
    UxUtils.setAppend("#root", $youSection);

    actionInstance.dataTables.forEach((dataTable) => {
        dataTable.dataColumns.forEach((question, ind) => {
            answerIs = "";
            let count = ind + 1;

            let $cardDiv = $(UxUtils.divTemplate("card-blank", ""));
            let $formGroup = $(UxUtils.divTemplate("form-group", ""));
            let $row = $(UxUtils.divTemplate("row", ""));
            let $hoverBtn = $(UxUtils.divTemplate("hover-btn", ""));
            UxUtils.setAppend($cardDiv, $formGroup);
            UxUtils.setAppend($formGroup, $row);
            if (question.name.indexOf("photo") >= 0) {
                /* Photo Section */
                let $col9 = $(UxUtils.divTemplate("col-9", ""));
                let content = "";
                UxUtils.setAppend($formGroup, $row);
                UxUtils.setAppend($row, $col9);
                Localizer.getString("photo").then(function(result) {
                    content = UxUtils.contentSection(count, result, question.displayName);
                    UxUtils.setAppend($col9, content);
                });

                let dname = Utils.isJson(question.options[0].displayName) ? JSON.parse(question.options[0].displayName) : question.options[0].displayName;
                let attachment = Utils.isJson(dname.attachmentId) ? JSON.parse(dname.attachmentId) : dname.attachmentId;
                if (attachment != undefined) {
                    let attachmentImg = "";
                    $.each(attachment, function(ind, att) {
                        attachmentImg = att;
                        return false;
                    });

                    let req = ActionHelper.getAttachmentInfo(attachmentImg);
                    let filesAmount = Object.keys(attachment).length;
                    let $col3 = UxUtils.divTemplate("col-3", "");
                    let $imgThumbnail = UxUtils.divTemplate("img-thumbnail", "");
                    ActionHelper.setAttachmentPreview(req, question.name, filesAmount, $imgThumbnail, $col3, "photo");
                    UxUtils.setAppend($row, $col3);
                }
                UxUtils.setAppend($formGroup, $row);
                UxUtils.setAppend($cardDiv, $formGroup);
                UxUtils.setAppend("#root", $cardDiv);
                UxUtils.setAppend("#root", UxUtils.breakline());
            } else if (question.name.indexOf("document") >= 0) {
                /* Document Section */
                let $col9 = $(UxUtils.divTemplate("col-9", ""));
                let content = "";
                UxUtils.setAppend($formGroup, $row);
                UxUtils.setAppend($row, $col9);
                Localizer.getString("document").then(function(result) {
                    content = contentSection(count, result, question.displayName);
                    UxUtils.setAppend($col9, content);
                });

                let dname = Utils.isJson(question.options[0].displayName) ? JSON.parse(question.options[0].displayName) : question.options[0].displayName;
                let attachment = Utils.isJson(dname.attachmentId) ? JSON.parse(dname.attachmentId) : dname.attachmentId;
                if (attachment != undefined) {
                    let attachmentImg = "";
                    $.each(attachment, function(ind, att) {
                        attachmentImg = att;
                        return false;
                    });
                    let req = ActionHelper.getAttachmentInfo(attachmentImg);
                    let filesAmount = Object.keys(attachment).length;
                    let $col3 = $(UxUtils.divTemplate("col-3", ""));
                    let $imgThumbnail = $(UxUtils.divTemplate("img-thumbnail", ""));
                    ActionHelper.setAttachmentPreview(req, question.name, filesAmount, $imgThumbnail, $col3, "document");
                    UxUtils.setAppend($row, $col3);
                }
                UxUtils.setAppend($formGroup, $row);
                UxUtils.setAppend($cardDiv, $formGroup);
                UxUtils.setAppend("#root", $cardDiv);
                UxUtils.setAppend("#root", UxUtils.breakline());
            } else if (question.name.indexOf("video") >= 0) {
                /* Video Section */
                let $col9 = $(UxUtils.divTemplate("col-9", ""));
                let content = "";
                UxUtils.setAppend($formGroup, $row);
                UxUtils.setAppend($row, $col9);
                Localizer.getString("video").then(function(result) {
                    content = contentSection(count, result, question.displayName);
                    UxUtils.setAppend($col9, content);
                });
                let dname = Utils.isJson(question.options[0].displayName) ? JSON.parse(question.options[0].displayName) : question.options[0].displayName;
                let attachment = Utils.isJson(dname.attachmentId) ? JSON.parse(dname.attachmentId) : dname.attachmentId;
                if (attachment != undefined) {
                    let attachmentImg = "";
                    $.each(attachment, function(ind, att) {
                        attachmentImg = att;
                        return false;
                    });
                    let req = ActionHelper.getAttachmentInfo(attachmentImg);
                    let $col3 = $(UxUtils.divTemplate("col-3", ""));
                    let $imgThumbnail = $(UxUtils.divTemplate("img-thumbnail", ""));
                    ActionHelper.setAttachmentPreview(req, question.name, 1, $imgThumbnail, $col3, "video");
                    UxUtils.setAppend($row, $col3);
                }

                UxUtils.setAppend($formGroup, $row);
                UxUtils.setAppend($cardDiv, $formGroup);
                UxUtils.setAppend("#root", $cardDiv);
                UxUtils.setAppend("#root", UxUtils.breakline());
            } else {
                if (question.options.length > 1) {
                    /* Question Section */
                    let $rowdDiv = $(UxUtils.divTemplate("row", ""));
                    let $qDiv = $(UxUtils.divTemplate("col-sm-12", ""));
                    let $dflex = $(UxUtils.divTemplate("d-table", ""));
                    UxUtils.setAppend($cardDiv, $rowdDiv);
                    UxUtils.setAppend($rowdDiv, $qDiv);
                    let $questionHeading = $(UxUtils.divTemplate("mb0", ""));
                    UxUtils.setAppend($questionHeading, UxUtils.getQuestionTileWithCounter(count, question.displayName));
                    UxUtils.setAppend($cardDiv, $dflex);
                    UxUtils.setAppend($dflex, $questionHeading);
                    UxUtils.setAppend($dflex, UxUtils.questionIdentifierSection(question.name));
                    question.options.forEach((option) => {
                        /* User Responded */
                        let userResponse = [];
                        let userResponseAnswer = "";

                        for (let i = 0; i < actionDataRowsLength; i++) {
                            if (actionDataRows[i].creatorId == userId) {
                                userResponse = actionDataRows[i].columnValues;
                                let userResponseLength = Object.keys(userResponse).length;

                                for (let j = 1; j <= userResponseLength; j++) {
                                    if (Utils.isJson(userResponse[j])) {
                                        let userResponseAns = JSON.parse(userResponse[j]);
                                        if (userResponseAns != null) {
                                            let userResponseAnsLen = userResponseAns.length;
                                            if (userResponseAnsLen > 1) {
                                                for (let k = 0; k < userResponseAnsLen; k++) {
                                                    if (userResponseAns[k] == option.name) {
                                                        userResponseAnswer = userResponseAns[k];
                                                    } else {
                                                        continue;
                                                    }
                                                }
                                            } else {
                                                userResponseAnswer = userResponseAns;
                                            }
                                        }
                                    } else {
                                        if (userResponse[j] == option.name) {
                                            userResponseAnswer = userResponse[j];
                                        }
                                    }
                                }
                            }
                        }
                        /* Correct Answer */
                        let correctResponse = JSON.parse(
                            actionInstance.customProperties[Constants.getCorrectAnswerIndex()].value
                        );
                        let correctResponseLength = Object.keys(correctResponse).length;
                        let correctAnswer = "";
                        for (let j = 0; j < correctResponseLength; j++) {

                            let correctResponseAns = correctResponse[j];
                            let correctResponseAnsLen = correctResponseAns.length;
                            for (let k = 0; k < correctResponseAnsLen; k++) {
                                if (correctResponseAns[k] == option.name) {
                                    correctAnswer = correctResponseAns[k];
                                }
                            }
                        }

                        if (question.options.length > 1) {
                            let $radioOption = getOptions(
                                option.displayName,
                                question.name,
                                option.name,
                                userResponseAnswer,
                                correctAnswer,
                            );
                            UxUtils.setAppend($cardDiv, $radioOption);
                            let res = "";
                            if (answerIs.toLowerCase() == "correct") {
                                res = correctKey;
                            } else {
                                res = incorrectKey;
                            }
                            UxUtils.setHtml($cardDiv.find("#status-" + question.name), UxUtils.getQuestionCorrectIncorrectSection(answerIs, res));
                        }
                    });

                    if (answerIs == Constants.getCorrectString()) {
                        score++;
                    }
                    UxUtils.setAppend("#root", $cardDiv);
                } else {
                    /* Text Section */
                    let $textSection = "";
                    let $clearfix = $(UxUtils.divTemplate("clearfix", ""));
                    UxUtils.setAppend($formGroup, $hoverBtn);
                    Localizer.getString("video").then(function() {
                        $textSection = $(UxUtils.contentSection(count, "Text", question.displayName));
                        UxUtils.setAppend($hoverBtn, $textSection);
                    });
                    UxUtils.setAppend($formGroup, $clearfix);
                    let $descriptionSection = UxUtils.createParagraphBox(question.displayName, "mb0 text-description text-justify", "");
                    UxUtils.setAppend($cardDiv, $descriptionSection);
                }
                UxUtils.setAppend("#root", $cardDiv);
                UxUtils.setAppend("#root", UxUtils.breakline());
            }
        });
    });
    UxUtils.setAppend("#root", UxUtils.divTemplate("ht-100", ""));
}

/*
 * Method to create creator questions view
 * @param userId string identifier
 */
function createCreatorQuestionView(userId) {
    UxUtils.clearHtml("div#root > div.question-content");
    answerIs = "";
    total = 0;
    score = 0;
    let $youSection = "";
    Localizer.getString("aggregrateResult").then(function(result) {
        $youSection = UxUtils.getYouAsIntial(result, userId);
        UxUtils.setAppend("#root div:first", $youSection);
    });

    let tid = setInterval(() => {
        /* Correct Answer */
        let correctResponse = JSON.parse(
            actionInstance.customProperties[Constants.getCorrectAnswerIndex()].value
        );
        if ($(".aggregrate-section").length > 0) {
            UxUtils.setAppend("#root", contentSection);
            let qCounter = 0;
            actionInstance.dataTables.forEach((dataTable) => {
                let scoreArray = {};
                dataTable.dataColumns.forEach((data, qindex) => {
                    if (data.valueType == "LargeText") {
                        /* Call Text Section 1 */
                        $("#question-msg").hide();
                        UxUtils.setAppend($(".training-contents:first").parents("div.card-box"), UxUtils.trainingTitle(data.displayName));
                    } else if (data.valueType == "SingleOption" || data.valueType == "MultiOption") {
                        answerIs = "";
                        let $quesContDiv = $(UxUtils.divTemplate("question-content disabled2", "content-" + data.name, ""));
                        let $mtDiv = $(UxUtils.divTemplate("mt--16", ""));
                        let $dflexDiv = $(UxUtils.divTemplate("d-table mb--4", ""));
                        UxUtils.setAppend($quesContDiv, $mtDiv);
                        UxUtils.setAppend("#root", $quesContDiv);
                        let count = qCounter + 1;
                        UxUtils.setAppend($dflexDiv, UxUtils.getQuestionNumberContainer(questionKey, count));
                        UxUtils.setAppend($dflexDiv, UxUtils.labelTemplate("float-right font-12 bold", "status-" + data.name));
                        UxUtils.setAppend($mtDiv, $dflexDiv);
                        let $blankQDiv = $(UxUtils.divTemplate("", ""));
                        UxUtils.setAppend($mtDiv, $blankQDiv);
                        UxUtils.setAppend($blankQDiv, UxUtils.getQuestionTitleContainer(data.displayName));
                        let questionAttachmentId = data.attachments.length > 0 ? data.attachments[0].id : "";
                        if (questionAttachmentId != "") {
                            let req = ActionHelper.getAttachmentInfo(actionId, questionAttachmentId);
                            ActionHelper.executeApi(req).then(function(response) {
                                    console.info("Attachment - Response: " + JSON.stringify(response));
                                    UxUtils.setPrepend($blankQDiv, UxUtils.quizTemplateImageWithLoader(response.attachmentInfo.downloadUrl));
                                    Utils.getClassFromDimension(response.attachmentInfo.downloadUrl, `#content-${data.name} img.question-image`);
                                })
                                .catch(function(error) {
                                    console.error("AttachmentAction - Error: " + JSON.stringify(error));
                                });
                        }
                        scoreArray[data.name] = 0;

                        /* check for correct answer for each users */
                        for (let i = 0; i < actionDataRowsLength; i++) {
                            for (let c = 0; c < correctResponse.length; c++) {
                                let correctAnsString = "";
                                let userAnsString = "";
                                if (Array.isArray(correctResponse[c])) {
                                    if (correctResponse[c].length > 1) {
                                        correctAnsString = correctResponse[c].join(",");
                                    } else {
                                        correctAnsString = correctResponse[c][0];
                                    }
                                } else {
                                    correctAnsString = correctResponse[c];
                                }

                                if (Utils.isJson(actionDataRows[i].columnValues[count])) {
                                    let responderAnsArr = JSON.parse(actionDataRows[i].columnValues[count]);
                                    if (responderAnsArr != null) {
                                        if (responderAnsArr.length > 1) {
                                            userAnsString = responderAnsArr.join(",");
                                        } else {
                                            userAnsString = responderAnsArr[0];
                                        }
                                    } else {
                                        userAnsString = "";
                                    }
                                } else {
                                    userAnsString = actionDataRows[i].columnValues[count];
                                }
                                if (correctAnsString == userAnsString) {
                                    scoreArray[data.name] = scoreArray[data.name] + 1;
                                }

                            }
                        }

                        let isRadio = true;
                        if (JSON.parse(actionInstance.customProperties[Constants.getCorrectAnswerIndex()].value)[qCounter] != undefined && JSON.parse(actionInstance.customProperties[Constants.getCorrectAnswerIndex()].value)[qCounter].length > 1) {
                            isRadio = false;
                        }

                        data.options.forEach((option) => {
                            /* User Responded */
                            let $cardDiv = $(UxUtils.divTemplate("card-box card-bg card-border mb--8", ""));
                            let userResponse = [];
                            let userResponseAnswer = "";
                            for (let i = 0; i < actionDataRowsLength; i++) {
                                userResponse = actionDataRows[i].columnValues;
                                let userResponseLength = Object.keys(userResponse).length;
                                let userResArr = [];
                                for (let j = 1; j <= userResponseLength; j++) {
                                    if (Utils.isJson(userResponse[j])) {
                                        let userResponseAns = JSON.parse(userResponse[j]);
                                        if (userResponseAns != null) {
                                            let userResponseAnsLen = userResponseAns.length;
                                            if (userResponseAnsLen > 1) {
                                                for (let k = 0; k < userResponseAnsLen; k++) {
                                                    if (userResponseAns[k] == option.name) {
                                                        userResponseAnswer = userResponseAns[k];
                                                        userResArr.push(userResponseAnswer);
                                                    }
                                                }
                                            } else {
                                                if (userResponseAns[0] == option.name) {
                                                    userResponseAnswer = userResponseAns[0];
                                                    userResArr.push(userResponseAnswer);
                                                }
                                            }
                                        }
                                    } else {
                                        if (userResponse[j] == option.name) {
                                            userResponseAnswer = userResponse[j];
                                            userResArr.push(userResponseAnswer);
                                        }
                                    }
                                }
                            }

                            /* Correct Answer */
                            let correctResponse = JSON.parse(
                                actionInstance.customProperties[Constants.getCorrectAnswerIndex()].value
                            );

                            let correctResponseLength = Object.keys(correctResponse).length;
                            let optName = option.displayName;
                            let attachmentId = option.attachments.length > 0 ? option.attachments[0].id : "";
                            let optId = option.name;
                            let $radioOption = "";
                            let result = "";
                            for (let j = 0; j < correctResponseLength; j++) {
                                let correctResponseAns = correctResponse[j];
                                if (correctResponseAns.includes(option.name)) {
                                    result = "correct";
                                }
                            }
                            if (isRadio) {
                                $radioOption = getRadioOptionsCreator(
                                    optName,
                                    optId,
                                    qindex,
                                    result,
                                    attachmentId
                                );
                                UxUtils.setAppend($cardDiv, $radioOption);
                            } else {
                                let $checkOption = getCheckOptionsCreator(
                                    optName,
                                    optId,
                                    qindex,
                                    result,
                                    attachmentId
                                );
                                UxUtils.setAppend($cardDiv, $checkOption);
                            }
                            UxUtils.setAppend($quesContDiv, $cardDiv);
                        });
                        qCounter++;

                        if (actionDataRowsLength == 0) {
                            let aggregrateQuestionScore = 0;
                            UxUtils.setHtml($dflexDiv.find("#status-" + data.name), UxUtils.getAggregrateScoreContainer(aggregrateQuestionScore, correctKey));
                        } else {
                            let aggregrateQuestionScore = ((scoreArray[data.name] * 100) / actionDataRowsLength);
                            if (aggregrateQuestionScore % 1 != 0) {
                                aggregrateQuestionScore = aggregrateQuestionScore.toFixed(2);
                            }
                            UxUtils.setHtml($dflexDiv.find("#status-" + data.name), UxUtils.getAggregrateScoreContainer(aggregrateQuestionScore, correctKey));
                        }
                    }
                });
            });
            if (qCounter > 0) {
                let localeQuest = "";
                if (qCounter > 1) {
                    localeQuest = questionsKey;
                } else {
                    localeQuest = questionKey;
                }
                Localizer.getString("totalQuestionTraining", qCounter, localeQuest).then(function(result) {
                    UxUtils.setAppend($(".training-contents:first").parents("div.card-box"), UxUtils.getContentTitleSection(result));
                });
            }
            clearInterval(tid);
        }
    }, Constants.setIntervalTimeHundred());
}

/*
 * Method to create question view
 * @param userId string identifier
 */
function createQuestionView(userId, isLanding) {
    total = 0;
    score = 0;
    if (isLanding == true) {
        UxUtils.setAppend("div#root div:first", contentSection);
    } else {
        UxUtils.clearHtml("div#root > div.question-content");
        UxUtils.setAppend("div#root > div.question-content", contentSection);
    }
    let resQuestCount = 0;
    actionInstance.dataTables.forEach((dataTable) => {
        let qcount = 0;
        dataTable.dataColumns.forEach((question) => {
            if (question.valueType == "LargeText") {
                /* Call Text Section 1 */
                $("#question-msg").hide();
                UxUtils.setAppend($(".training-contents:first").parents("div.card-box"), UxUtils.contentTitle(question.displayName));
            } else if (question.valueType == "SingleOption" || question.valueType == "MultiOption") {
                answerIs = "";
                let $questionDiv = $(UxUtils.divTemplate("question-content disabled2", `content-${question.name}`));
                let $mtDiv = $(UxUtils.divTemplate("mt--16", ""));
                let $dtableDiv = $(UxUtils.divTemplate("d-table mb--4", ""));
                let questionAttachmentId = question.attachments != "" ? question.attachments[0].id : "";
                UxUtils.setAppend($questionDiv, $mtDiv);
                UxUtils.setAppend($mtDiv, $dtableDiv);
                qcount++;
                UxUtils.setAppend($dtableDiv, UxUtils.getQuestionNumberContainer(questionKey, qcount));
                UxUtils.setAppend($dtableDiv, UxUtils.labelTemplate("float-right font-12 bold", `status-${question.name}`));

                let $blankQDiv = $(UxUtils.divTemplate("", ""));
                UxUtils.setAppend($mtDiv, $blankQDiv);
                UxUtils.setAppend($blankQDiv, UxUtils.getQuestionTitleContainer(question.displayName));

                if (questionAttachmentId.length > 0) {
                    let req = ActionHelper.getAttachmentInfo(actionId, questionAttachmentId);
                    ActionHelper.executeApi(req).then(function(response) {
                            console.info("Attachment - Response: " + JSON.stringify(response));
                            UxUtils.setPrepend($blankQDiv, UxUtils.getQuestionImageWithLoader(response.attachmentInfo.downloadUrl));
                            Utils.getClassFromDimension(response.attachmentInfo.downloadUrl, `#content-${question.name} img.question-image`);
                        })
                        .catch(function(error) {
                            console.error("AttachmentAction - Error: " + JSON.stringify(error));
                        });
                }

                let $blankDiv = $(UxUtils.divTemplate("", ""));
                UxUtils.setAppend($mtDiv, $blankDiv);
                let optAnsArr = [];
                question.options.forEach((option, optind) => {
                    /* User Responded */
                    let userResponse = [];
                    let userResponseAnswer = "";
                    for (let i = 0; i < actionDataRowsLength; i++) {
                        if (actionDataRows[i].creatorId == userId) {
                            userResponse = actionDataRows[i].columnValues;
                            let userResponseLength = Object.keys(userResponse).length;
                            for (let j = 1; j <= userResponseLength; j++) {
                                if (Utils.isJson(userResponse[j]) == true) {
                                    let userResponseAns = JSON.parse(userResponse[j]);
                                    if (userResponseAns != null) {
                                        let userResponseAnsLen = userResponseAns.length;
                                        if (userResponseAnsLen > 1) {
                                            for (let k = 0; k < userResponseAnsLen; k++) {
                                                if (userResponseAns[k] == option.name) {
                                                    userResponseAnswer = userResponseAns[k];
                                                } else {
                                                    continue;
                                                }
                                            }
                                        } else {
                                            if (userResponseAns[0] == option.name) {
                                                userResponseAnswer = userResponseAns[0];
                                            }
                                        }
                                    }
                                } else {
                                    if (userResponse[j] == option.name) {
                                        userResponseAnswer = userResponse[j];
                                    }
                                }
                            }
                        }
                    }
                    /* Correct Answer */
                    let correctResponse = JSON.parse(
                        actionInstance.customProperties[Constants.getCorrectAnswerIndex()].value
                    );
                    let correctResponseLength = Object.keys(correctResponse).length;
                    let correctAnswer = "";
                    for (let j = 0; j < correctResponseLength; j++) {
                        let correctResponseAns = correctResponse[j];
                        let correctResponseAnsLen = correctResponseAns.length;
                        for (let k = 0; k < correctResponseAnsLen; k++) {
                            if (correctResponseAns[k] == option.name) {
                                correctAnswer = correctResponseAns[k];
                            }
                        }
                    }

                    let optName = option.displayName;
                    let optAttachmentId = "";
                    if (option.attachments != 0) {
                        optAttachmentId = option.attachments[0].id;
                    }
                    if (question.valueType == "SingleOption") {
                        let $radioOption = getRadioOptions(
                            optName,
                            question.name,
                            option.name,
                            userResponseAnswer,
                            correctAnswer,
                            optAttachmentId
                        );
                        UxUtils.setAppend($blankDiv, $radioOption);
                    } else {
                        let $checkOption = getCheckOptions(
                            optName,
                            question.name,
                            option.name,
                            userResponseAnswer,
                            correctAnswer,
                            optAttachmentId
                        );
                        UxUtils.setAppend($blankDiv, $checkOption);
                    }
                    if (answerIs.toLowerCase() == "correct") {
                        optAnsArr[optind] = answerIs;
                    } else if (answerIs.toLowerCase() == "incorrect") {
                        optAnsArr[optind] = "incorrect";
                    }

                    if (answerIs.toLowerCase() == "correct") {
                        Localizer.getString(answerIs.toLowerCase()).then(function(result) {
                            UxUtils.setHtml($questionDiv.find("#status-" + question.name), `<span class="semi-bold text-success">${result}</span>`);
                        });
                    } else {
                        Localizer.getString(answerIs.toLowerCase()).then(function(result) {
                            UxUtils.setHtml($questionDiv.find("#status-" + question.name), `<span class="semi-bold text-danger">${result}</span>`);
                        });
                    }
                });

                if (optAnsArr.includes("incorrect") != true) {
                    score++;
                }
                UxUtils.setAppend("div#root", $questionDiv);
                questionCount++;
                resQuestCount++;
                total++;
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
                UxUtils.setAppend($(".training-contents").parents("div.card-box"), UxUtils.getContentTitleSection(result));
            });
        }
    });

    let scorePercentage = (score / total) * Constants.getPrecentageHundred();
    if (scorePercentage % 1 != 0) {
        scorePercentage = scorePercentage.toFixed(2);
    }
    if (questionCount > 0) {
        Localizer.getString("score", ":").then(function(result) {
            if (isLanding == true) {
                UxUtils.setAfter("#root .date-text", UxUtils.getScoreContainer(result, scorePercentage));
            } else {
                UxUtils.setAfter("#root > div.progress-section", UxUtils.getScoreContainer(result, scorePercentage));
            }
        });
    }
}

/**
 * @desc Method for Question view based on user id
 * @param text String contains correct and incorrect message
 * @param name String contains option name
 * @param id String contains option id
 * @param userResponse String contains user response data
 * @param correctAnswer String contains correct answer
 * @param attachmentId String contains attachment id of option
 */
function getRadioOptions(text, name, id, userResponse, correctAnswer, attachmentId) {
    let $oDiv = $(UxUtils.divTemplate("", ""));
    /*  If answer is correct  and answered */
    if ($.trim(userResponse) == $.trim(id) && $.trim(correctAnswer) == $.trim(id)) {
        UxUtils.setAppend($oDiv, UxUtils.getRadioInnerResponderQuestionSuccess(id, text));
        if (answerIs == "") {
            answerIs = Constants.getCorrectString();
        }
    } else if (($.trim(userResponse) == $.trim(id) && $.trim(correctAnswer) != $.trim(userResponse))) {
        /* If User Response is correct and answered incorrect */
        UxUtils.setAppend($oDiv, UxUtils.getRadioInnerResponderQuestionCorrect(id, text));
        answerIs = Constants.getIncorrectString();
    } else if (($.trim(userResponse) != $.trim(id) && $.trim(correctAnswer) == $.trim(id))) {
        /* If User Response is incorrect and not answered */
        UxUtils.setAppend($oDiv, UxUtils.getRadioInnerResponderQuestionCorrect2(id, text));
        answerIs = Constants.getIncorrectString();
    } else {
        UxUtils.setAppend($oDiv, UxUtils.getRadioInnerResponderQuestionNormal(id, text));
    }

    if (attachmentId.length > 0) {
        let req = ActionHelper.getAttachmentInfo(actionId, attachmentId);
        $oDiv.find("label.custom-radio").attr("id", attachmentId);
        ActionHelper.executeApi(req).then(function(response) {
                console.info("Attachment - Response: " + JSON.stringify(response));
                UxUtils.setPrepend($oDiv.find("label.custom-radio#" + attachmentId), UxUtils.getOptionImage(response.attachmentInfo.downloadUrl));
                Utils.getClassFromDimension(response.attachmentInfo.downloadUrl, `#${attachmentId} img.opt-image`);
            })
            .catch(function(error) {
                console.error("AttachmentAction - Error: " + JSON.stringify(error));
            });
    }
    return $oDiv;
}

/**
 * @desc Method for Question view Checkbox based on user id
 * @param text String contains correct and incorrect message
 * @param name String contains option name
 * @param id String contains option id
 * @param userResponse String contains user response data
 * @param correctAnswer String contains correct answer
 * @param attachmentId String contains attachment id of option
 */
function getCheckOptions(text, name, id, userResponse, correctAnswer, attachmentId) {
    let $oDiv = $(UxUtils.divTemplate("", ""));
    /*  If answer is correct  and answered */
    if ($.trim(userResponse) == $.trim(id) && $.trim(correctAnswer) == $.trim(id)) {
        UxUtils.setAppend($oDiv, UxUtils.getCheckboxForInnerResponderQuestionSuccess(id, text));
        if (answerIs == "") {
            answerIs = Constants.getCorrectString();
        }
    } else if (($.trim(userResponse) == $.trim(id) && $.trim(correctAnswer) != $.trim(userResponse))) {
        /* If User Response is correct and answered incorrect */
        UxUtils.setAppend($oDiv, UxUtils.getCheckboxForInnerResponderQuestionCorrect(id, text));
        answerIs = Constants.getIncorrectString();
    } else if (($.trim(userResponse) != $.trim(id) && $.trim(correctAnswer) == $.trim(id))) {
        /* If User Response is incorrect and not answered */
        UxUtils.setAppend($oDiv, UxUtils.getCheckboxForInnerResponderQuestionCorrect2(id, text));
        answerIs = Constants.getIncorrectString();
    } else {
        UxUtils.setAppend($oDiv, UxUtils.getCheckboxForInnerResponderQuestionNormal(id, text));
    }

    if (attachmentId.length > 0) {
        let req = ActionHelper.getAttachmentInfo(actionId, attachmentId);
        $oDiv.find("label.custom-check").attr("id", attachmentId);
        ActionHelper.executeApi(req).then(function(response) {
                console.info("Attachment - Response: " + JSON.stringify(response));
                UxUtils.setPrepend($oDiv.find("label.custom-check#" + attachmentId), UxUtils.getOptionImage(response.attachmentInfo.downloadUrl));
                Utils.getClassFromDimension(response.attachmentInfo.downloadUrl, `#${attachmentId} img.opt-image`);
            })
            .catch(function(error) {
                console.error("AttachmentAction - Error: " + JSON.stringify(error));
            });
    }
    return $oDiv;
}

/*
 * Method to create options view
 * @param text string contains correct or incorrect text
 * @param name string
 * @param id string
 * @param userResponse Array contains user responded answer for a question
 * @param correctAnswer Array contains correct answer of a question
 * @param isText String for identify the response is question type or other
 */
function getOptions(text, name, id, userResponse, correctAnswer, isText = "") {
    if (isText == true) {
        // This is for text block
        return true;
    }
    let $oDiv = UxUtils.divTemplate("form-group", "");

    /*  If answer is correct  and answered */
    if (userResponse == id && correctAnswer == id) {
        UxUtils.setAppend($oDiv, UxUtils.getSuccessOptionSection(text));
        if (answerIs == "") {
            answerIs = Constants.getCorrectString();
        }
    } else if (userResponse != id && correctAnswer == id) {
        /* If User Response is incorrect and not answered */
        UxUtils.setAppend($oDiv, UxUtils.getNormalCorrectOptionSection(text));
    } else if (userResponse == id && correctAnswer != id) {
        /* If User Response is incorrect and answered */
        UxUtils.setAppend($oDiv, UxUtils.getDangerOptionSection(text));
        answerIs = Constants.getIncorrectString();
    } else {
        UxUtils.setAppend($oDiv, UxUtils.getNormalOptionSection(text));
    }
    return $oDiv;
}

/*
 * Method to create footer
 * @param userId String identifier
 */
function footer(userId) {
    Localizer.getString("back").then(function(result) {
        UxUtils.setAfter("#root div.question-content:last", UxUtils.getSummaryViewResponderSummaryFooter(userId, result));
    });
}

/*
 * Method to create footer
 */
function footer1() {
    Localizer.getString("back").then(function(result) {
        UxUtils.setAppend("#root > div.card-box", UxUtils.getSummaryViewTabFooter(result));
    });
}

/**
 * @description Method contains section to date change of training
 */
function changeDateSection() {
    UxUtils.setPrepend("#root div:first", UxUtils.getChangeDateSection(changeDueDateKey, cancelKey, changeKey));
}

/**
 * @description Method contains section to close training
 */
function closeTrainingSection() {
    UxUtils.setPrepend("#root div:first", UxUtils.getCloseTrainingSection(closeTrainingKey, closeTrainingConfirmKey, cancelKey, confirmKey));
}

/**
 * @description Method contains section to delete training
 */
function deleteTrainingSection() {
    UxUtils.setPrepend("#root div:first", UxUtils.deleteTrainingSection(deleteTrainingKey, deleteTrainingConfirmKey, cancelKey, confirmKey));
}

/*
 * Method to create responder and non-responder page
 */
function create_responder_nonresponders() {
    if (actionInstance.customProperties[2].value == "Only me") {
        if (actionContext.userId == actionInstance.creatorId) {
            $("#root").html("");
            if ($(".tabs-content:visible").length <= 0) {
                let $card1 = $(UxUtils.divTemplate("card-box", ""));
                let tabs = $(".tabs-content").clone();
                UxUtils.setAppend($card1, tabs.clone());
                UxUtils.setAppend($("#root"), $card1);
                footer1();
            }
            /*  Add Responders  */
            getResponders();

            /*  Add Non-reponders  */
            getNonresponders();
        } else {
            // console.info("Visible to sender only");
        }
    } else {
        $("#root").html("");
        if ($(".tabs-content:visible").length <= 0) {
            let $card1 = $(UxUtils.divTemplate("card-box", ""));
            let tabs = $(".tabs-content").clone();
            UxUtils.setAppend($card1, tabs.clone());
            UxUtils.setAppend($("#root"), $card1);
            footer1();
        }

        // Add Responders
        getResponders();

        // Add Non-reponders
        getNonresponders();
    }
    let memberCount = subscriberResponse.memberCount;
    Localizer.getString("xofyPeopleResponded", actionSummary.rowCount, memberCount).then(function(result) {
        UxUtils.setPrepend("#root", UxUtils.getTotalPeopleRespondedStringRespondersSection(result));
    });
}

/**
 * @description Method for Question view based on user id
 * @param text String contains correct and incorrect message
 * @param name String contains option name
 * @param id String contains option id
 * @param userResponse String contains user response data
 * @param correctAnswer String contains correct answer
 * @param attachmentId String contains attachment id of option
 */
function getRadioOptionsCreator(text, optId, ind, result, attachmentId) {
    let $oDiv = $(UxUtils.divTemplate("form-group", ""));
    /*  If answer is correct  and answered */
    if (result == "correct") {
        UxUtils.setAppend($oDiv, UxUtils.getCorrectRadiobox(optId, ind, text));
    } else {
        UxUtils.setAppend($oDiv, UxUtils.getRadioboxSimple(optId, ind, text));
    }
    if (attachmentId != "" && attachmentId.length > 0) {
        let req = ActionHelper.getAttachmentInfo(actionId, attachmentId);
        ActionHelper.executeApi(req).then(function(response) {
                console.info("Attachment - Response: " + JSON.stringify(response));
                UxUtils.setPrepend($oDiv.find("label.custom-radio"), UxUtils.getOptionImageWithLoader(response.attachmentInfo.downloadUrl));
                Utils.getClassFromDimension(response.attachmentInfo.downloadUrl, `#${optId} .opt-image`);
            })
            .catch(function(error) {
                console.error("AttachmentAction - Error: " + JSON.stringify(error));
            });
    }
    return $oDiv;
}

/**
 * @description Method for Question view based on user id
 * @param text String contains correct and incorrect message
 * @param name String contains option name
 * @param id String contains option id
 * @param userResponse String contains user response data
 * @param correctAnswer String contains correct answer
 * @param attachmentId String contains attachment id of option
 */
function getCheckOptionsCreator(text, optId, ind, result, attachmentId) {
    let $oDiv = $(UxUtils.divTemplate("", ""));
    /*  If answer is correct  and answered */
    if (result == "correct") {
        UxUtils.setAppend($oDiv, UxUtils.getCorrectCheckbox(optId, ind, text));
    } else {
        UxUtils.setAppend($oDiv, UxUtils.getCheckboxSimple(optId, ind, text));
    }
    if (attachmentId != "" && attachmentId.length > 0) {
        let req = ActionHelper.getAttachmentInfo(actionId, attachmentId);
        ActionHelper.executeApi(req).then(function(response) {
            console.info("Attachment - Response: " + JSON.stringify(response));
            UxUtils.setPrepend($oDiv.find("label.custom-check"), UxUtils.getOptionImageWithLoader(response.attachmentInfo.downloadUrl));
            Utils.getClassFromDimension(response.attachmentInfo.downloadUrl, `#${optId} .opt-image`);
        }).catch(function(error) {
            console.error("AttachmentAction - Error: " + JSON.stringify(error));
        });
    }
    return $oDiv;
}

/*
 * Event to click on back button and recreate landing page
 */
$(document).on("click", ".back", function() {
    createBody();
});

/*
 * Event to click on back button and back to responder and non responder tab page
 */
$(document).on("click", ".back1", function() {
    create_responder_nonresponders();
});

/**
 * @event Change event for expiry date and time
 */
$(document).on("change", `input[name="expiry_time"], input[name="expiry_date"]`, function() {
    $("#change-quiz-date").removeClass("disabled");
});
/**
 * @event Keydown event for download image in png
 */
KeyboardUtils.keydownClick(document, "#closeKey");

/**
 * @event Click Event for back to responder and non responder page
 */
$(document).on("click", "#closeKey", function() {
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

$(document).on("click", "#change-quiz-date", function() {
    let getExpiryDate = $(`input[name="expiry_date"]`).datepicker("getDate");
    let getExpiryDateData = getExpiryDate.toString().split(" ");
    getExpiryDateData[4] = $(`input[name="expiry_time"]`).val() + ":00";
    let end = new Date(getExpiryDateData.join(" "));
    actionInstance.expiryTime = new Date(end).getTime();
    actionInstance.customProperties[1].value = end;
    ActionHelper.updateActionInstance(actionInstance);
});

/**
 * @event Keydown event for download image in png
 */
KeyboardUtils.keydownClick(document, "#downloadImage");

/**
 * @event Click event for download image in png
 */
$(document).on({
    click: function() {
        let bodyContainerDiv = document.getElementById("root");
        let backgroundColorOfResultsImage = theme;
        $(".footer").hide();
        html2canvas(bodyContainerDiv, {
            width: bodyContainerDiv.scrollWidth,
            height: bodyContainerDiv.scrollHeight,
            backgroundColor: backgroundColorOfResultsImage,
            useCORS: true,
        }).then((canvas) => {
            let fileName = "training";
            let base64Image = canvas.toDataURL("image/png");
            if (window.navigator.msSaveBlob) {
                window.navigator.msSaveBlob(canvas.msToBlob(), fileName);
            } else {
                let data = base64Image;
                if (data && fileName) {
                    let a = document.createElement("a");
                    a.href = data;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            }
            $(".footer").show();
        });
    }
}, "#downloadImage");

/**
 * @event Keydown event for download CSV
 */
KeyboardUtils.keydownClick(document, "#downloadCSV");

/**
 * @event Click event for download CSV
 */
$(document).on({
    click: function() {
        ActionHelper.downloadCSV(actionId, "training");
    }
}, "#downloadCSV");

/**
 * @event Keydown event to show change due by date
 */
KeyboardUtils.keydownClick(document, ".change-due-by-event");

/**
 * @event Click event to show change due by date
 */
$(document).on({
    click: function(e) {
        e.preventDefault();
        $(".change-date").remove();
        $(".close-quiz").remove();
        $(".delete-quiz").remove();
        changeDateSection();
        let currentTime = new Date(actionInstance.expiryTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }).toLowerCase();
        let setDate = new Date(actionInstance.expiryTime);
        $(".form_date").attr({ "data-date": setDate });
        let langObj = Utils.getLocaleForCalendar(context.locale);
        let lang = langObj.lang;
        $(".form_time").datetimepicker({
            format: "HH:ii",
            pickDate: "false",
            autoclose: 1,
            startView: 1,
            maxView: 1,
            useCurrent: false,
            minView: 0,
            forceParse: 0,
            todayHighlight: 1,
            todayBtn: 1,
            language: lang,
            meridiem: ""
        });
        $(".form_time input").val(currentTime);
        let dateInput = $(`input[name="expiry_date"]`);
        let container = "";
        if ($(".bootstrap-iso form").length > 0) {
            container = $(".bootstrap-iso form").parent();
        } else {
            container = "body";
        }
        let options = {
            "container": container,
            todayHighlight: true,
            autoclose: true,
            orientation: "top",
            language: lang
        };
        dateInput.datepicker(options);
        dateInput.datepicker("setDate", setDate);
        dateInput.datepicker().on("show", function() {
            let $calendarSelector = $(".datepicker.datepicker-dropdown.dropdown-menu");
            $calendarSelector.find(".prev").empty();
            $calendarSelector.find(".next").empty();
        });
        return false;
    }
}, ".change-due-by-event");

/**
 * @event Click event to close change, close and delete quiz confirm section
 */
$(document).on("click", ".cancel-question-delete", function() {
    $(".change-date").remove();
    $(".close-quiz").remove();
    $(".delete-quiz").remove();
});

/**
 * @event Click event for delete quiz
 */
$(document).on("click", "#delete-quiz", function() {
    ActionHelper.deleteActionInstance(actionId);
});

/**
 * @event Click event for change quiz expiry date
 */
$(document).on("click", "#change-quiz-question", function() {
    ActionHelper.closeActionInstance(actionId, actionInstance.version);
});

/**
 * @event Keydown event to show delete quiz
 */
KeyboardUtils.keydownClick(document, ".delete-quiz-event");

/**
 * @event Click event to show delete quiz
 */
$(document).on({
    click: function(e) {
        e.preventDefault();
        $(".change-date").remove();
        $(".close-quiz").remove();
        $(".delete-quiz").remove();
        deleteTrainingSection();
        return false;
    }
}, ".delete-quiz-event");

/**
 * @event Keydown event to show close quiz
 */
KeyboardUtils.keydownClick(document, ".close-quiz-event");

/**
 * @event Click event to show close quiz
 */
$(document).on({
    click: function(e) {
        e.preventDefault();
        $(".change-date").remove();
        $(".close-quiz").remove();
        $(".delete-quiz").remove();
        closeTrainingSection();
        return false;
    }
}, ".close-quiz-event");

/**
 * @event Keydown event to show change due by date
 */
KeyboardUtils.keydownClick(document, ".change-due-by-event");

/**
 * @event Click event to show change due by date
 */
$(document).on({
    click: function(e) {
        e.preventDefault();
        $(".change-date").remove();
        $(".close-quiz").remove();
        $(".delete-quiz").remove();
        changeDateSection();
        let currentTime = new Date(actionInstance.expiryTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }).toLowerCase();
        let setDate = new Date(actionInstance.expiryTime);
        $(".form_date input").val(setDate);
        $(".form_date").attr({ "data-date": setDate });
        let langObj = Utils.getLocaleForCalendar(context.locale);
        let lang = langObj.lang;
        $(".form_time").datetimepicker({
            format: "HH:ii",
            pickDate: "false",
            autoclose: 1,
            startView: 1,
            maxView: 1,
            useCurrent: false,
            minView: 0,
            forceParse: 0,
            todayHighlight: 1,
            todayBtn: 1,
            language: lang,
            meridiem: ""
        });
        $(".form_time input").val(currentTime);
        let dateInput = $(`input[name="expiry_date"]`);
        let container = "";
        if ($(".bootstrap-iso form").length > 0) {
            container = $(".bootstrap-iso form").parent();
        } else {
            container = "body";
        }
        let options = {
            "container": container,
            todayHighlight: true,
            autoclose: true,
            orientation: "top",
            language: lang
        };
        dateInput.datepicker(options);
        dateInput.datepicker("setDate", setDate);
        dateInput.datepicker().on("show", function() {
            let $calendarSelector = $(".datepicker.datepicker-dropdown.dropdown-menu");
            $calendarSelector.find(".prev").empty();
            $calendarSelector.find(".next").empty();
        });
        return false;
    }
}, ".change-due-by-event");

/*
 * Event to show responders and non responders page
 */
$(document).on("click", "#show-responders", function() {
    create_responder_nonresponders();
});

/**
 * Variable contains text section for media file
 */
Localizer.getString("trainingContent").then(function(result) {
    trainingContentKey = result;
    contentSection = UxUtils.getTrainingContentContainer(trainingContentKey);
});

/**
 * @event Keydown event for show responders list
 */
KeyboardUtils.keydownClick(document, "span#show-responders, a#nav-profile-tab , a#nav-home-tab");

/**
 * @event Keydown event for back button
 */
KeyboardUtils.keydownClick(document, ".back");

/**
 * @event Keydown event for back button of responders result view
 */
KeyboardUtils.keydownClick(document, ".back1");

/**
 * @event Keydown event for result view of responders
 */
KeyboardUtils.keydownClick(document, ".getresult");