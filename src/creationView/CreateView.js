// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import "../common/utils/JqueryGlobal";
import "bootstrap/dist/js/bootstrap";
import "bootstrap-datepicker";
import "bootstrap-datetime-picker";
import "../common/utils/BootstrapLocaleFile";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css";
import "bootstrap-datetime-picker/css/bootstrap-datetimepicker.min.css";
import "ekko-lightbox/dist/ekko-lightbox.js";
import "ekko-lightbox/dist/ekko-lightbox.css";
import {
    Localizer,
    ActionHelper
} from "../common/ActionSdkHelper";
import {
    UxUtils
} from "../common/utils/UxUtils";
import {
    Utils
} from "../common/utils/Utils";
import {
    Constants
} from "../common/utils/Constants";
import {
    KeyboardUtils
} from "../common/utils/KeyboardUtils";
import "../../assets/css/style-custom";
import "../../assets/css/style-default";

let questions = new Array();
let settingText = "";
let opt = "";
let request;
let lastSession = null;
let checkMeKey = "";
let nextKey = "";
let backKey = "";
let requiredKey = "";
let dueByKey = "";
let submitKey = "";
let resultVisibleToKey = "";
let correctAnswerKey = "";
let everyoneKey = "";
let onlyMeKey = "";
let showCorrectAnswerKey = "";
let answerCannotChangeKey = "";
let questionTitleKey = "";
let questionKey = "";
let clearKey = "";
let atleastOneContentKey = "";
let allowMultipleAttemptKey = "";
let uploadCoverImageKey = "";
let coverImageKey = "";
let trainingTitleKey = "";
let assigneeTakeMultipleTraining = "";
let trainingDescriptionOptionalKey = "";
let addContentKey = "";
let okKey = "";
let closeKey = "";
let saveAttachmentData = [];
let addTitlePlaceholderKey = "";
let addDescriptionPlaceholderKey = "";
let addTextDescriptionPlaceholderKey = "";
let uploadImageLabelKey = "";
let uploadFileLabelKey = "";
let uploadVideoLabelKey = "";
let correctChoiceKey = "";
let invalidFileFormatKey = "";
let atleastOneErrorKey = "";
let buttonCounter = 0;
let loadMoreKey = "";
let loadLessKey = "";
let enterTheChoiceKey = "";
let addMoreOptionsKey = "";
let addQuestionsKey = "";
let doneKey = "";
let confirmDeleteMsgKey = "";
let confirmDeleteContentMsgKey = "";
let cancelKey = "";
let discardKey = "";
let questionLeftBlankKey = "";
let invalidFileSizeMsgKey = "";

let weekKey = "";
let hourKey = "";
let hoursKey = "";
let minuteKey = "";
let minutesKey = "";
let daysKey = "";
let context = "";
let questionIsRequiredKey = "";

/***********************************  Manage Questions *********************************/

/**
 * @event to load more load less text description
 * onClick Load more text
 *
 */
$(document).on("click", ".moreless-button", function() {
    $(".more-text").slideToggle();
    if ($(this).text() == loadMoreKey) {
        UxUtils.setText(this, loadLessKey);
        $(this).parent().find(".show-text").css({
            "-webkit-line-clamp": ""
        });
    } else {
        UxUtils.setText(this, loadMoreKey);
        $(this).parent().find(".show-text").css({
            "-webkit-line-clamp": Constants.webkitLineClampCssCount()
        });
    }
});

/**
 * @event to increase textarea height
 */
$(document).on("input", "#training-text-description", function() {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
});

/**
 * @event Focusin to show trash on focusin at input
 */
$(document).on("focusin", `.option-div, .input-group-append, .input-group, .input-group input[type="text"], .input-tpt, .input-tpt .remove-option`, function() {
    $(this).parents("div.row").find(".remove-option").show();
});

/**
 * @event Focusout to hide trash on focusout at input
 */
$(document).on("focusout", `.option-div, .input-tpt, .input-tpt .remove-option, .check-me-title, .input-group input[type="text"]`, function() {
    $(this).parents("div.row").find(".remove-option").hide();
});

/**
 * @event to switch to Question Section and hide Summary Section
 */
$(document).on("click", "#add-questions", function() {
    getStringKeys();
    let textNumber = parseInt($("div.training-card-section.section-div").length);
    $("form.sec1").find("div.content-limit-exceed").remove();
    if (textNumber == 30) {
        Localizer.getString("contentLimitExceed").then(function(result) {
            UxUtils.setAfter($("form.sec1 div.section-2 div.container:last"), UxUtils.getContentLimitExceed(result));
        });
        return true;
    }
    $(".error-msg").remove();
    $(".section-2").hide();
    $(".section-2-footer").hide();

    if ($("form.sec1 > div.question-section").length > 0) {
        $("form.sec1 > div.question-section").remove();
        $("form.sec1 > .question_button").remove();
        $("form.sec1 > div.question-footer").remove();
    }
    questionsSection = UxUtils.getQuestionArea(questionKey, questionTitleKey, checkMeKey, enterTheChoiceKey, addMoreOptionsKey);
    addQuestionButton = UxUtils.getAddQuestionButton(addQuestionsKey);
    questionFooter = UxUtils.getQuestionAreaFooter(doneKey);

    UxUtils.setAppend("form.sec1", questionsSection);
    UxUtils.setAppend("form.sec1", addQuestionButton);
    UxUtils.setAppend("form.sec1", questionFooter);

    let questionCounter = 0;
    $("div.question-section-div:visible").each(function(index, elem) {
        questionCounter = index + 1;
        $(elem)
            .find("span.question-number")
            .text(questionKey + "# " + questionCounter);
        $(elem).attr({
            id: "question" + questionCounter
        });
    });

});

/**
 * @event to add question to same section when new question added
 */
$(document).on("click", "#add-questions-same-section", function() {
    $("form.sec1").find("div.content-limit-exceed").remove();
    let questionDivLength = parseInt($("div.question-section").length);
    let contentDivLength = parseInt($("div.training-card-section.section-div").length);
    let textNumber = questionDivLength + contentDivLength;
    if (textNumber == 30) {
        Localizer.getString("contentLimitExceed").then(function(result) {
            UxUtils.setAfter($("form.sec1").find("div.question_button"), UxUtils.getContentLimitExceed(result));
        });
        return true;
    }
    let questionCounter;
    questionsSection = UxUtils.getQuestionArea(questionKey, questionTitleKey, checkMeKey, enterTheChoiceKey, addMoreOptionsKey);
    UxUtils.setAppend("form.sec1", questionsSection);
    $("form > .question_button").remove();
    $("div.question-container:visible").each(function(index, element) {
        questionCounter = index + 1;
        UxUtils.setHtml($(element).find("span.question-number"), UxUtils.getQuestionNumber(questionKey, questionCounter));
        $(element).attr({
            id: "question" + questionCounter
        });
    });
    addQuestionButton = UxUtils.getAddQuestionButton(addQuestionsKey);
    UxUtils.setAppend("form.sec1", addQuestionButton);
    /* Focus to last question input */
    $("#question" + questionCounter + " #question-title").focus();
    return false;
});

/**
 * @event to remove image from question section
 */
$(document).on("click", ".remove-image-section", function() {
    let dataId = $(this).parents(".question-container").attr("id");
    $("div.question-section").find("div.error-msg").remove();
    if ($("div.question-container:visible").length > 1) {
        let confirmBox = UxUtils.getDeleteQuestionConfirmBox(dataId, okKey, closeKey, confirmDeleteMsgKey);
        UxUtils.setAfter($(this).parents("div.question-container").find("div.d-flex"), confirmBox);
    } else {
        Localizer.getString("atleastOneQuestion").then(function(result) {
            UxUtils.setPrepend($(this).parents("div.card-box:visible"), UxUtils.getAtLeastOneQuestionError(result));
        });
    }
});

/**
 * @Event to cancel the confirm box for delete question
 */
$(document).on("click", "#cancel-confirm", function() {
    $(this).parents("div.card-box-alert").removeClass("card-box-alert").addClass("card-box");
    $(this).parents(".confirm-box").remove();
});

/**
 * @event Click for cancel button on confirm box of question deletion
 */
$(document).on("click", ".cancel-question-delete", function() {
    $(this).parents(".question-container").find(".add-options").show();
    $(this).parents("div.card-box-alert").removeClass("card-box-alert").addClass("card-box");
    $(this).parents(".confirm-box").remove();
});

/**
 * @Event to delete question when click on confirm area ok button
 */
$(document).on("click", "#delete-question", function() {
    let element = $(this).attr("data-id");
    $("#" + element).parents("div.question-section").remove();
    let questionCounter;
    $("div.question-section").find("div.error-msg").remove();

    $("div.question-container:visible").each(function(index, elem) {
        questionCounter = index + 1;
        $(elem).find("span.question-number").text(questionKey + "&nbsp;#&nbsp;" + questionCounter);
        $(elem).attr({
            id: "question" + questionCounter
        });
    });
});

/**
 * @Event to remove option
 */

$(document).on("click", ".remove-option", function() {
    $("div.question-section").find("div.error-msg").remove();

    $(this).parents(".question-container").find(".max-option-err-box").hide();
    $(this).parents("div.question-container").find("button.add-options").show();

    if ($(this).parents("div.question-container").find("div.option-div").length > 2) {
        let selector = $(this).closest("div.container");
        $(this).parents("div.option-div").remove();
        $(selector)
            .find(`div.option-div div.input-group input[type="text"]`)
            .each(function(index, elem) {
                let counter = index + 1;
                Localizer.getString("enterTheChoice").then(function(result) {
                    enterTheChoiceKey = result;
                    $(elem).attr({
                        placeholder: result
                    });
                });
                $(elem).attr({
                    id: "option" + counter
                });
                $(elem)
                    .parents(".option-div")
                    .find("input.form-check-input")
                    .attr({
                        id: "check" + counter
                    });
            });

    } else {
        Localizer.getString("twoOptionError").then(function(result) {
            UxUtils.setAppend("div.card-box:visible", UxUtils.getOptionError(result));
        });
    }
});

/**
 * @Event to submit question on click done button
 */
$(document).on("click", "#question-done", function() {
    $("form.sec1").find("div.content-limit-exceed").remove();
    /* Validate */
    let errorText = "";
    $(`input[type="text"]`).removeClass("danger");
    $("label.label-alert").remove();
    $("div.error-msg").remove();
    $("div.card-box-alert").removeClass("card-box-alert").addClass("card-box");
    $(".question-container:visible").each(function(qind, quest) {
        let isChecked = false;
        $(quest).find("#options").find(`input[type="checkbox"]`).each(function(optind, opt) {
            if ($(opt).prop("checked") == true) {
                isChecked = true;
            }
        });

        if (isChecked != true) {
            // let questionId = $(quest).attr("id");
            UxUtils.setAfter($(quest).find("div.d-flex-ques"), UxUtils.checkCorrectOptionError(correctChoiceKey));
            $(quest)
                .find("div.card-box")
                .removeClass("card-box")
                .addClass("card-box-alert");
            errorText += "Option check required";
            $([document.documentElement, document.body]).animate({
                scrollTop: $(".option-required-err:last").offset().top - 200
            }, 1000);
        }
    });

    $("form")
        .find(`input[type="text"]`)
        .each(function() {
            let element = $(this);
            if (element.val() == "") {
                if (element.attr("id").startsWith("question-title")) {
                    if ($(element).parents("div.form-group-question").find("img.question-preview-image").attr("src") != "") {
                        // Do nothing
                    } else {
                        if ($(this).find("div.card-box").length > 0) {
                            $(this).parents("div.card-box").removeClass("card-box").addClass("card-box-alert");
                        }
                        $(element).addClass("danger");
                        $(".question-blank-key").text(questionLeftBlankKey);
                        UxUtils.setAfter($(element).parents("div.form-group-question").find(".question-number").parent("div"), UxUtils.createLabelWithFontBox(questionLeftBlankKey, "label-alert d-block mb--4", "question-blank-key", ""));
                        errorText += UxUtils.createParagraphBox(questionLeftBlankKey, "", "");
                        $(element).addClass("danger");
                    }
                } else if (element.attr("id").startsWith("option")) {
                    if ($(element).parents("div.radio-outer").find("img.option-preview-image").attr("src") != "") {
                        // Do nothing
                    } else {
                        if ($(this).find("div.card-box").length > 0) {
                            $(this).parents("div.card-box").removeClass("card-box").addClass("card-box-alert");
                        }
                        $(this).addClass("danger");
                        UxUtils.setPrepend($(this).parents("div.col-12").parents("div.option-div"), UxUtils.createLabelWithFontBox(requiredKey, "label-alert d-block mb--4", "required-key", ""));
                        errorText += UxUtils.createParagraphBox(requiredKey, "", "");
                    }
                }
            }
        });

    if ($.trim(errorText).length <= 0) {
        let questionCount = $("form").find("div.container.question-container").length;
        $("div.question-container").each(function(i, e) {
            let j = $("div.question-section-div").length + 1;
            let textNumber = parseInt($("div.question-section-div").length) + 1;
            /*  Get selected Answer */
            let correct = [];
            let optionChecked = "";
            let optionText = "";
            let optionAttachments = "";

            /* Looping for options */
            $(e)
                .find("div.option-div")
                .each(function(index, elem) {
                    let count = index + 1;
                    let optionsInputs = UxUtils.createInputBox("hidden", "all_options", `option${count}`, $(elem).find("#option" + count).val());
                    let ifCorrectCheck = "";
                    let styleOptionImage = "d-none";
                    let imagePreview = ($(elem).find("div.option-preview:visible").html()) ? $(elem).find("div.option-preview:visible").html() : "";
                    let optionValue = ($(elem).find("#option" + count).val()) ? $(elem).find("#option" + count).val() : "&nbsp;";
                    let questionOptionId = `question${j}option${count}`;

                    if ($(elem).find("div.option-preview:visible").html()) {
                        styleOptionImage = "";
                    }

                    if (
                        $(e)
                        .find("#check" + count)
                        .is(":checked")
                    ) {
                        ifCorrectCheck = Constants.getCheckedTickIcon();
                        optionChecked += UxUtils.createInputBox("checkbox", "d-none quest-answer", "", "", "checked");
                        // if it is checked
                        correct.push(questionOptionId);
                    }
                    optionText += UxUtils.getOptionValue(optionsInputs, imagePreview, optionValue, questionOptionId, ifCorrectCheck, styleOptionImage, count);

                    let optionFile = ($(elem).find("textarea#option-attachment-set").val()) ? $(elem).find("textarea#option-attachment-set").val() : "";
                    if (optionFile) {
                        optionAttachments += UxUtils.createTextArea("", `d-none option-image${count}`, "", optionFile);
                    }
                });
            let questionInput = UxUtils.createInputBox("hidden", `question${j}`, "", $(e).find("#question-title").val());
            let questionInputs = $(e).find("div.card-box").clone();
            let questionText = ($(e).find("#question-title").val() != "") ? $(e).find("#question-title").val() : "";
            let questionImage = $(e).find("div.question-preview").html();
            let hideQuestionImage = "d-none";
            if ($(e).find("img.question-preview-image").attr("src") != "") {
                $(e).find("img.question-preview-image").addClass("image-responsive question-template-image smallfit");
                hideQuestionImage = "";
            }
            let questionImagearray = ($(e).find("textarea#question-attachment-set").val()) ? $(e).find("textarea#question-attachment-set").val() : "";
            UxUtils.setAfter("div#root div.training-card-section:last", UxUtils.getQuestionSection(questionKey, j, optionChecked, questionImage, hideQuestionImage, questionText, optionText, questionInput, questionImagearray, optionAttachments));
            UxUtils.setHtml("#quest-text-" + textNumber, questionInputs);
        });

        /* Create Question Section Here */
        for (let j = 1; j <= questionCount; j++) {

            $("form.sec1 div.section-2:visible div.container div#root div.training-card-section").each(function(index, obj) {
                $(this).attr({
                    "data-id": "text-section-" + index
                });
                $(this).attr({
                    "id": "section-" + index
                });
                if (!($(obj).hasClass("question-section-div"))) {
                    $(this).find("span.counter").text(index);
                }
            });
        }

        $(".question-section").hide();
        $(".question-footer").hide();
        $(".question_button").hide();

        $(".section-2").show();
        $(".section-2-footer").show();

    } else {
        $(".required-key").text(requiredKey);
        $("#submit").prop("disabled", false);
        return;
    }
});

/****************************  Manage Questions Ends ***************************/

/***********************************  Add Text *********************************/

/**
 * @Event to show setting section
 */
$(document).on("click", ".show-setting", function() {
    $(".section-1").hide();
    $(".section-1-footer").hide();
    $("form #setting").show();
});

/**
 * @Event to get on back button at content area
 */
$(document).on("click", "#back-text, #back-photo, #back-video, #back-document, #back-question", function() {
    let discardContent = UxUtils.getDiscardContentArea(confirmDeleteContentMsgKey, cancelKey, discardKey);
    UxUtils.setHtml("div.discardContent", discardContent);
});

/**
 * @Event to Cancel Confirmation if don't want to discard content
 */
$(document).on("click", ".cancel", function() {
    UxUtils.setHtml("div.discardContent", " ");
});

/**
 * If discard All changes and Go back to previous step
 */
$(document).on("click", ".discard-success", function() {
    UxUtils.setHtml("div.discardContent", " ");
    $(".section-2").show();
    $(".section-2-footer").show();
    $(".text-section").hide();
    $(".text-footer").hide();
    if (!$(".question-section").is(":visible")) {
        $("form.sec1 div.section-2 div#root div.training-card-section:last").remove();
    }
    $(".question-section").hide();
    $(".add_question_button").hide();
    $(".question-footer").hide();
    $(".question_button").hide();
});

/**
 * @Event to add text when click on content area button
 */
$(document).on("click", "#add-text", function() {
    getStringKeys();
    $(".error-msg").remove();
    $("#submit").attr("disabled", false);
    $(".loader-overlay").remove();
    $("form.sec1").find("div.content-limit-exceed").remove();
    let textNumber = parseInt($("div.training-card-section.section-div").length);
    if (textNumber == 30) {
        Localizer.getString("contentLimitExceed").then(function(result) {
            UxUtils.setAfter("form.sec1 div.section-2 div.container:last", UxUtils.getContentLimitExceed(result));
        });
        return true;
    }

    let textData = "";

    $(".section-2").hide();
    $(".section-2-footer").hide();

    if ($("form.sec1 > div.text-section").length > 0) {
        $("form.sec1 > div.text-section").remove();
        $("form.sec1 > div.text-footer").remove();
    }

    addTextSection = UxUtils.getTextContentArea(addTitlePlaceholderKey, addTextDescriptionPlaceholderKey);
    addTextFooter = UxUtils.getTextContentFooter(doneKey);

    UxUtils.setAppend("form.sec1", addTextSection);
    UxUtils.setAppend("form.sec1", addTextFooter);
    UxUtils.setText($(".back-key"), backKey);
    UxUtils.setAfter($("form.sec1 div.section-2 div#root div.training-card-section:last"), UxUtils.getAddTextContainer(textData));
});

/**
 * @Event to submit text when click on done button
 */
$(document).on("click", "#text-done", function() {
    let textNumber = parseInt($("div.training-card-section").length) - 1;
    $("textarea").removeClass("danger");
    $("label.label-alert").remove();

    if ($("input#training-text").val().length <= 0 || $("textarea#training-text-description").val().length <= 0) {

        if ($("textarea#training-text-description").val().length <= 0) {
            UxUtils.setBefore("textarea#training-text-description", UxUtils.getRequiredError(requiredKey));
            $("textarea#training-text-description").focus();
            $("textarea#training-text-description").addClass("danger");
        } else {
            $("textarea#training-text-description").removeClass("danger");
        }

        if ($("input#training-text").val().length <= 0) {
            UxUtils.setBefore("input#training-text", UxUtils.getRequiredError(requiredKey));
            $("input#training-text").focus();
            $("input#training-text").addClass("danger");
        } else {
            $("input#training-text").removeClass("danger");
        }

    } else {

        let textTrainingTitle = $("input#training-text").val();
        let textTrainingDesc = $("textarea#training-text-description").val();
        $(".text-section").hide();
        $(".text-footer").hide();

        $(".section-2").show();
        $(".section-2-footer").show();

        $("form.sec1 div.section-2:visible div#root div.training-card-section").each(function(index) {
            if (!$(this).hasClass("question-section-div")) {
                $(this).attr({
                    "data-id": "text-section-" + index
                });
                $(this).attr({
                    "id": "section-" + index
                });
                $(this).find("span.counter").text(index);
            }
        });

        $("#section-" + textNumber).find(".textarea-text").val(textTrainingTitle);
        $("#section-" + textNumber).find(".type").text(textTrainingTitle);

        $("#section-" + textNumber).find(".text-description-preview").text(textTrainingDesc);
        $("#section-" + textNumber).find(".textarea-text-description").val(textTrainingDesc);
        if (textTrainingDesc && (textTrainingDesc.split(/\r\n|\r|\n/).length > 2 || textTrainingDesc.length > 180)) {
            $("#section-" + textNumber).find(".text-description-preview").addClass("show-text");
            $("#section-" + textNumber).find(".text-description-preview").css({
                "-webkit-line-clamp": `${Constants.webkitLineClampCssCount()}`
            });
            UxUtils.setAfter($("#section-" + textNumber).find(".text-description-preview"), Constants.getLoadMoreLink(loadMoreKey));
        }

    }
});

/**
 * @Event to show photo section when click on add content button
 */
$(document).on("click", "#add-photo", function() {
    getStringKeys();
    $("form.sec1").find("div.content-limit-exceed").remove();
    let textData = "";
    let textNumber = parseInt($("div.training-card-section").length);
    if (textNumber > 29) {
        Localizer.getString("contentLimitExceed").then(function(result) {
            UxUtils.setAfter("form.sec1 div.section-2 div.container:last", UxUtils.getContentLimitExceed(result));
        });
        return true;
    }
    $(".error-msg").remove();
    $("#submit").attr("disabled", false);
    $(".loader-overlay").remove();

    $(".section-2").hide();
    $(".section-2-footer").hide();

    if ($("form.sec1 > div.text-section").length > 0) {
        $("form.sec1 > div.text-section").remove();
        $("form.sec1 > div.text-footer").remove();
    }

    addPhotoSection = UxUtils.getImageContentArea(addTitlePlaceholderKey, addDescriptionPlaceholderKey, uploadImageLabelKey);
    addPhotoFooter = UxUtils.getImageContentFooter(doneKey);
    UxUtils.setAfter("form.sec1 div.section-2 div#root div.training-card-section:last", UxUtils.getAddImageSection(textNumber, textData));
    UxUtils.setAppend("form.sec1", addPhotoSection);
    UxUtils.setAppend("form.sec1", addPhotoFooter);
    UxUtils.setText($(".back-key"), backKey);
});

/**
 * @Event to submit photo
 */
$(document).on("click", "#photo-done", function() {
    let textNumber = parseInt($("div.training-card-section").length) - 1;
    $(`input[type="file"]#upload-photo`).removeClass("danger");
    $("label.label-alert").remove();
    if ($("#photo-attachments").val() == "" || $("#image-training-text").val().length <= 0) {
        if ($("#photo-attachments").val() == "") {
            UxUtils.setBefore(".change-link", UxUtils.getRequiredError(requiredKey));
            $(`input[type="file"]#upload-photo`).focus();
            $(`input[type="file"]#upload-photo`).addClass("danger");
        } else {
            $(".change-link").find(`.label-alert .d-block`).remove();
        }
        if ($("#image-training-text").val().length <= 0) {
            UxUtils.setBefore("#image-training-text", UxUtils.getRequiredError(requiredKey));
            $("#image-training-text").focus();
            $("#image-training-text").addClass("danger");
        } else {
            $("#image-training-text").removeClass("danger");
        }
    } else {
        let photoTitle = $("input#image-training-text").val();
        let photoDesc = $("textarea#photo-description").val();
        let photoAttachments = $("textarea#photo-attachments").val();
        let carasoulImage = $(".update-carasoul").html();
        $(".text-section").hide();
        $(".text-footer").hide();
        $(".section-2").show();
        $(".section-2-footer").show();
        $("form.sec1 div.section-2:visible div#root div.training-card-section").each(function(index, obj) {
            if (!($(obj).hasClass("question-section-div"))) {
                $(this).attr({
                    "data-id": "text-section-" + index
                });
                $(this).attr({
                    "id": "section-" + index
                });
                $(this).find("span.counter").text(index);
            }
        });
        if ($(".update-carasoul").hasClass("carousel-single-img")) {
            $("#section-" + textNumber).find(".img-thumbnail-new").addClass("carousel-single-img");
        }
        $("#section-" + textNumber).find("span.type").text(photoTitle);
        $("#section-" + textNumber).find(".textarea-photo-title").val(photoTitle);
        $("#section-" + textNumber).find(".textarea-photo-description").val(photoDesc);
        $("#section-" + textNumber).find(".photo-description-preview").text(photoDesc);
        UxUtils.setHtml($("#section-" + textNumber).find(".img-thumbnail-new"), carasoulImage);
        if (photoDesc.length < 1) {
            $("#section-" + textNumber).find(".photo-description-preview").parent(".col-12").addClass("d-none");
        }
        if (photoDesc && (photoDesc.split(/\r\n|\r|\n/).length > 2 || photoDesc.length > 180)) {
            $("#section-" + textNumber).find(".photo-description-preview").addClass("show-text");
            $("#section-" + textNumber).find(".photo-description-preview").css({
                "-webkit-line-clamp": Constants.webkitLineClampCssCount()
            });
            UxUtils.setAfter($("#section-" + textNumber).find(".photo-description-preview"), Constants.getLoadMoreLink(loadMoreKey));
        }
        $("#section-" + textNumber).find("textarea.textarea-photo-attachments").val(photoAttachments);

        $("#submit").attr("disabled", false);
        $(".loader-overlay").remove();

    }
});

/**
 * @Event to show video section
 */
$(document).on("click", "#add-video", function() {
    getStringKeys();
    let textNumber = parseInt($("div.training-card-section").length);
    $("form.sec1").find("div.content-limit-exceed").remove();
    if (textNumber > 29) {
        Localizer.getString("contentLimitExceed").then(function(result) {
            UxUtils.setAfter("form.sec1 div.section-2 div.container:last", UxUtils.getContentLimitExceed(result));
        });
        return true;
    }

    let textData = "";
    $(".error-msg").remove();
    $("#submit").attr("disabled", false);
    $(".loader-overlay").remove();

    $(".section-2").hide();
    $(".section-2-footer").hide();

    if ($("form.sec1 > div.text-section").length > 0) {
        $("form.sec1 > div.text-section").remove();
        $("form.sec1 > div.text-footer").remove();
    }
    addVideoSection = UxUtils.getVideoContentArea(addTitlePlaceholderKey, addDescriptionPlaceholderKey, uploadVideoLabelKey);
    addVideoFooter = UxUtils.getVideoContentFooter(doneKey);
    UxUtils.setAppend("form.sec1", addVideoSection);
    UxUtils.setAppend("form.sec1", addVideoFooter);
    UxUtils.setText($(".back-key"), backKey);
    UxUtils.setAfter("form.sec1 div.section-2 div#root div.training-card-section:last", UxUtils.getAddVideoSection(textNumber, textData));
});

/**
 * @Event to submit video
 */
$(document).on("click", "#video-done", function() {
    let textNumber = parseInt($("div.training-card-section").length) - 1;
    let videoTitle = $("input#video-training-text").val();
    let videoDesc = $("textarea#video-description").val();
    let videoAttachment = $("textarea#video-attachments").val();
    $("textarea").removeClass("danger");
    $("label.label-alert").remove();

    if ($(`input[type="file"]#upload-video`).val().length <= 0 || $("#video-training-text").val().length <= 0) {
        if ($(`input[type="file"]#upload-video`).val().length <= 0) {
            UxUtils.setBefore("div.video-box", UxUtils.getRequiredError(requiredKey));
            $("div.video-box").focus().addClass("danger");
        }

        if ($("#video-training-text").val().length <= 0) {
            UxUtils.setBefore("#video-training-text", UxUtils.getRequiredError(requiredKey));
            $("#video-training-text").focus();
            $("#video-training-text").addClass("danger");
        } else {
            $("#video-training-text").removeClass("danger");
        }
    } else {
        $(".label-alert").remove();
        $(".text-section").hide();
        $(".text-footer").hide();
        $(".section-2").show();
        $(".section-2-footer").show();
        $("form.sec1 div.section-2:visible div#root div.training-card-section").each(function(index, obj) {
            if (!$(obj).hasClass("question-section-div")) {
                $(this).attr({
                    "data-id": "text-section-" + index
                });
                $(this).attr({
                    "id": "section-" + index
                });
                $(this).find("span.counter").text(index);
            }
        });
        let fileInput = document.getElementById("upload-video");
        let fileUrl = window.URL.createObjectURL(fileInput.files[0]);
        $("#section-" + textNumber).find("span.type").text(videoTitle);
        $("#section-" + textNumber).find("#video-sec-" + textNumber).attr("src", fileUrl);
        $("#section-" + textNumber).find("textarea.textarea-video").val(videoTitle);
        $("#section-" + textNumber).find("textarea.textarea-video-description").val(videoDesc);
        $("#section-" + textNumber).find(".video-description-preview").text(videoDesc);
        if (videoDesc.length < 1) {
            $("#section-" + textNumber).find(".video-description-preview").parent(".col-12").addClass("d-none");
        }
        if (videoDesc && (videoDesc.split(/\r\n|\r|\n/).length > 2 || videoDesc.length > 180)) {
            $("#section-" + textNumber).find(".video-description-preview").addClass("show-text");
            $("#section-" + textNumber).find(".video-description-preview").css({
                "-webkit-line-clamp": Constants.webkitLineClampCssCount()
            });
            UxUtils.setAfter($("#section-" + textNumber).find(".video-description-preview"), Constants.getLoadMoreLink(loadMoreKey));
        }
        $("#section-" + textNumber).find(".textarea-video-attachments").val(videoAttachment);
        UxUtils.setAfter($("#section-" + textNumber).find("textarea:last"), UxUtils.getAttachmentTextarea());
    }
});

/**
 * Even to shwo document upload section
 */
$(document).on("click", "#add-document", function() {
    getStringKeys();
    let textNumber = parseInt($("div.training-card-section").length);
    $("form.sec1").find("div.content-limit-exceed").remove();
    if (textNumber > 29) {
        Localizer.getString("contentLimitExceed").then(function(result) {
            UxUtils.setAfter("form.sec1 div.section-2 div.container:last", UxUtils.getContentLimitExceed(result));
        });
        return true;
    }
    let textData = "";
    $(".error-msg").remove();
    $("#submit").attr("disabled", false);
    $(".loader-overlay").remove();
    $(".section-2").hide();
    $(".section-2-footer").hide();
    if ($("form.sec1 > div.text-section").length > 0) {
        $("form.sec1 > div.text-section").remove();
        $("form.sec1 > div.text-footer").remove();
    }
    UxUtils.setAfter("form.sec1 div.section-2 div#root div.training-card-section:last", UxUtils.getAddDownloadSection(textNumber, textData));
    addDocumentSection = UxUtils.getDocumentContentArea(addTitlePlaceholderKey, addDescriptionPlaceholderKey, uploadFileLabelKey);
    addDocumentFooter = UxUtils.getDocumentContentFooter(doneKey);
    UxUtils.setAppend("form.sec1", addDocumentSection);
    UxUtils.setAppend("form.sec1", addDocumentFooter);
    UxUtils.setText($(".back-key"), backKey);
});

/**
 * @Event to submit the document area
 */
$(document).on("click", "#document-done", function() {
            let textNumber = parseInt($("div.training-card-section").length) - 1;
            let docTitle = $("#doc-training-text").val();
            let docDescription = $("#document-description").val();
            $("textarea").removeClass("danger");
            $("label.label-alert").remove();
            if ($("div.doc-name").text().trim().length <= 0 || $("#doc-training-text").val().length <= 0) {
                if ($("div.doc-name").text().trim().length <= 0) {
                    UxUtils.setBefore("div.doc-box", UxUtils.getRequiredError(requiredKey));
                } else {
                    $("div.doc-box").parents().find("label.label-alert").remove();
                }
                if ($("#doc-training-text").val().length <= 0) {
                    UxUtils.setBefore("#doc-training-text", UxUtils.getRequiredError(requiredKey));
                    $("#doc-training-text").focus();
                    $("#doc-training-text").addClass("danger");
                } else {
                    $("#doc-training-text").removeClass("danger");
                }
            } else {
                $(".text-section").hide();
                $(".text-footer").hide();
                $(".section-2").show();
                $(".section-2-footer").show();
                $("form.sec1 div.section-2:visible div#root div.training-card-section").each(function(index, obj) {
                    if (!($(obj).hasClass("question-section-div"))) {
                        $(this).attr({
                            "data-id": "text-section-" + index
                        });
                        $(this).attr({
                            "id": "section-" + index
                        });
                        $(this).find("span.counter").text(index);
                    }
                });
                $("#section-" + textNumber).find("span.type").text(docTitle);
                $("#section-" + textNumber).find("textarea.textarea-document").val(docTitle);
                $("#section-" + textNumber).find(".document-description-preview").text(docDescription);
                $("#section-" + textNumber).find("textarea.textarea-document-description").val(docDescription);

                if (docDescription.length < 1) {
                    $("#section-" + textNumber).find(".document-description-preview").addClass("d-none");
                }

                if (docDescription && (docDescription.split(/\r\n|\r|\n/).length > 2 || docDescription.length > 180)) {
                    $("#section-" + textNumber).find(".document-description-preview").addClass("show-text");
                    $("#section-" + textNumber).find(".document-description-preview").css({
                        "-webkit-line-clamp": Constants.webkitLineClampCssCount()
                    });
                    UxUtils.setAfter($("#section-" + textNumber).find(".document-description-preview"), Constants.getLoadMoreLink(loadMoreKey));
                }
                $("#section-" + textNumber).find("textarea.textarea-document-attachment").val($("#document-attachment").val());
                $("#section-" + textNumber).find("#image-sec-" + textNumber).attr("src", "images/doc.png");
                let docfilesize = Utils.getFileSize($(`input[type="file"]#upload-document`)[0].files[0].size);
                let fileTypeIcon = "";
                UxUtils.setHtml("div.doc-box", Constants.getDocumentIcon());
                fileTypeIcon = Constants.getDocumentIcon();
                UxUtils.setBefore($("#section-" + textNumber).find("#image-sec-" + textNumber).parents("div.row").find("p.document-description-preview"), UxUtils.createParagraphBox(`${fileTypeIcon} ${UxUtils.createSpanBox(`${$(`input[type="file"]#upload-document`)[0].files[0].name} (${docfilesize})`, "semi-bold teams-link a-link font-14", "")}`,"mb0 doc-name" ,""));
    }
});

/**
 * @Event to submit photo
 */
$(document).on("change", "#upload-photo", function() {
    if ($(this).val()) {
        $(".text-danger.error-msg").remove();
        $("#photo-done").addClass("disabled");
        UxUtils.setAppend("#photo-done", Constants.getDisabledLoader());
        if ($(this)[0].files.length > 1) {
            if (imagesPreview(this, ".update-carasoul")) {
                if($(".update-carasoul").hasClass("carousel-single-img")) {
                    $(".update-carasoul").removeClass("carousel-single-img");
                }
                $(".text-section .photo-box").hide();
                $(".text-section .change-link").show();
                $(".text-section .update-carasoul").show();
                $(".text-section .label-alert").remove();
            }
        } else {
            let uniqueCarouselId = Constants.getUniqueId();
            let className = "prev-single-image" + uniqueCarouselId;
            let response = readURL(this, `.${className}`);
            if (response) {
                $(".show-image-loader").show();
                $(".text-section .photo-box").hide();
                $(".text-section .change-link").show();
                $(".text-section .label-alert").remove();

                let input = this;
                let reader = new FileReader();
                reader.onload = function(event) {
                    UxUtils.setHtml(".text-section .update-carasoul" , UxUtils.createImageLightBox(event.target.result,uniqueCarouselId , "",`smallfit`));
                };
                $(".update-carasoul").addClass("carousel-single-img");
                reader.readAsDataURL(input.files[0]);

                $(".text-section .update-carasoul").show();
                $(".show-image-loader").hide();
                let fileData = this;
                let coverImage = fileData.files[0];
                let attachment = ActionHelper.attachmentUpload(coverImage, coverImage["type"]);
                let attachmentRequest = {};
                attachmentRequest = ActionHelper.requestAttachmentUploadDraft(attachment);
                ActionHelper.executeApi(attachmentRequest)
                    .then(function(response) {
                        let attachmentData = [{
                            "name": fileData.files[0].name,
                            "type": "Image",
                            "id": response.attachmentId
                        }];
                        $("#photo-done").removeClass("disabled");
                        $("#photo-done").find(Constants.getDisabledLoaderClass()).remove();
                        $("#photo-attachments").val(JSON.stringify(attachmentData));
                    })
                    .catch(function(error) {
                        console.log("GetContext - Error2: " + JSON.stringify(error));
                    });

            } else {

                // $(".show-image-loader").hide();
                // $(".text-section .photo-box").show();
                // $(".text-section .change-link").hide();
                $("#photo-done").removeClass("disabled");
                $("#photo-done").find(Constants.getDisabledLoaderClass()).remove();
                UxUtils.setBefore("div.text-section:visible div.relative" , UxUtils.getMaxImageAlert(invalidFileFormatKey));
            }

        }
    }
});

/**
 * Method to show image preview
 * @param input object contain the input element data
 * @param placeToInsertImagePreview object contains html element where image preview will be showed
 */
let imagesPreview = function(input, placeToInsertImagePreview) {
    $("div.text-section:visible div.relative").parent().find(`span.text-danger.float-right`).remove();
    if (input.files) {
        let filesAmount = input.files.length;
        if (filesAmount > 10) {
            $("#photo-done").removeClass("disabled");
            $("#photo-done").find(Constants.getDisabledLoaderClass()).remove();
            Localizer.getString("maximum_images_allowed").then(function(result) {
                UxUtils.setBefore("div.text-section:visible div.relative" , UxUtils.getMaxImageAlert(result));
            });
            return false;
        }

        let returnArr = new Array();
        for (let i = 0; i < filesAmount; i++) {
            let isSuccess = true;
            let fileTypes = ["jpg", "jpeg", "png", "gif", "webp", "jfif"];
            if (input.files && input.files[i]) {
                let extension = input.files[i].name.split(".").pop().toLowerCase();
                isSuccess = fileTypes.indexOf(extension) > -1;
                returnArr.push(isSuccess);
            }
        }

        if($.inArray(false, returnArr) != -1) {
            $("#photo-done").removeClass("disabled");
            $("#photo-done").find(Constants.getDisabledLoaderClass()).remove();
            UxUtils.setBefore("div.text-section:visible div.relative" , UxUtils.getMaxImageAlert(invalidFileFormatKey));
            return false;
        } else {
            let uniqueCarouselId = Constants.getUniqueId();
            $(".update-carasoul").html("");
            let $carousel = $(UxUtils.getResponseViewCarouselSection(uniqueCarouselId));
            let $olSection = $(UxUtils.getCarouselOlSection());
            let $carouselInner = $(UxUtils.getCarouselInnerSection());
            UxUtils.setAppend($carousel, $olSection);
            UxUtils.setAppend($carousel, $carouselInner);
            let attachmentRequest = "";
            let count = 0;
            let newPhotos = new Array();
            let photoUploadCounter = 0;
            for (let i = 0; i < filesAmount; i++) {
                let reader = new FileReader();
                let $liList = $(UxUtils.getCarousalLiSection(uniqueCarouselId, i));
                UxUtils.setAppend($olSection , $liList);
                reader.onload = function(event) {
                    let $imgDiv = $(UxUtils.getCarousalImages(event.target.result, count, uniqueCarouselId));
                    UxUtils.setAppend($carouselInner ,$imgDiv);
                    count++;
                };
                reader.readAsDataURL(input.files[i]);
                let fileData = input.files[i];
                let attachment = ActionHelper.attachmentUpload(fileData, fileData["type"]);
                attachmentRequest = ActionHelper.requestAttachmentUploadDraft(attachment);
                ActionHelper.executeApi(attachmentRequest)
                    .then(function(response) {
                        let filesize = input.files[i].size / Constants.getKbConvertConst();
                        let attachmentData = {
                            "name": input.files[i].name + " ( " + Math.round(filesize) + " Kb)",
                            "type": "Image",
                            "id": response.attachmentId
                        };
                        newPhotos.push(attachmentData);
                        $(input).parents(".text-section").find("textarea.textarea-photo-attachments").val(JSON.stringify(newPhotos));
                        $("div.text-section").find("textarea#photo-attachments").val(JSON.stringify(newPhotos));
                        photoUploadCounter++;
                    });
            }
            let tid = setInterval(() => {
                if (photoUploadCounter == filesAmount) {
                    $("#photo-done").removeClass("disabled");
                    $("#photo-done").find(Constants.getDisabledLoaderClass()).remove();
                    clearInterval(tid);
                }
            }, Constants.setIntervalTimeHundred());
            UxUtils.setAppend($carousel , UxUtils.getCarousalPagination(uniqueCarouselId));
            UxUtils.setAppend(placeToInsertImagePreview,$carousel);
            let modelId = `model${uniqueCarouselId}`;
            $(placeToInsertImagePreview).attr({
                "data-toggle": "modal",
                "data-target": modelId
            });
            $(".carousel").carousel();
            return true;
        }
    }
    return false;
};

/**
 * @event to show previous carousel slide
 */
$(document).on("click", ".carousel-control-prev", function() {
    $(this).parents(".carousel").carousel("prev");
});

/**
 * @event to show next carousel slide
 */
$(document).on("click", ".carousel-control-next", function() {
    $(this).parents(".carousel").carousel("next");
});

/**
 * @event to show video upload section
 */
$(document).on("change", "#upload-video", function() {
    if (!$(this).val()) {
        return false;
    }
    let fileInput = $(this)[0];
    $(".video-box").parents(".text-section").find(".text-danger").remove();
    let videoSize = Constants.getVideoUploadingSize();
    let videoFormate = ["video/webm", "video/mp4", "video/avi", "video/ogv", "video/ogg"];
    if (fileInput.files.length > 0) {
        let inputVideoSize = fileInput.files[0].size;
        let sizeOf1MB = 1048576;
        if ((inputVideoSize / sizeOf1MB) > videoSize) {
            UxUtils.setBefore($(".video-box").parent(".relative") , UxUtils.getMaxImageAlert(invalidFileSizeMsgKey));
            return false;
        }
        if ($.inArray(fileInput.files[0].type, videoFormate) == -1) {
            UxUtils.setBefore($(".video-box").parent(".relative") , UxUtils.getMaxImageAlert(invalidFileFormatKey));
            return false;
        }
        $("button#video-done").addClass("disabled");
        UxUtils.setAppend("#video-done" , Constants.getDisabledLoader());
        let fileUrl = window.URL.createObjectURL(fileInput.files[0]);
        let fileData = fileInput.files[0];
        let attachment = ActionHelper.attachmentUpload(fileData, fileData["type"]);
        let attachmentRequest = ActionHelper.requestAttachmentUploadDraft(attachment);
        ActionHelper.executeApi(attachmentRequest)
            .then(function(response) {
                let newResponse = {
                    "name": fileInput.files[0].name,
                    "type": "Video",
                    "id": response.attachmentId
                };
                $("div.text-section").find("textarea#video-attachments").val(JSON.stringify(newResponse));
                $("button#video-done").removeClass("disabled");
                $("#video-done").find(Constants.getDisabledLoaderClass()).remove();
            });
        $(".updated-video").show();
        $(".change-link").show();
        $(".video-box").hide();
        $(".video-section-preview").last().attr("src", fileUrl);
        $(".video-section-preview").parents("div.relative").find(".label-alert").remove();
    }
});

/**
 * @event when upload document uploadedd
 */
$(document).on("change", "#upload-document", function() {

    let fileTypes = ["pdf", "docx", "doc", "txt", "xls", "xlsx", "odt", "pptx", "ppt","rtf"];
    let isSuccess = "";
    // If file is blank then return back
    if (!$(this).val()) {
        return false;
    }

    if ($(this)[0].files[0].name != undefined || $(this)[0].files[0].name != null) {
        $(".doc-name").html("");
    }
    $(".text-danger.error-msg").remove();
    $("#document-done").addClass("disabled");
    UxUtils.setAppend("#document-done" , Constants.getDisabledLoader());

    // Convert File size in Kb
    let input = $(this)[0];
    let filesize = Utils.getFileSize(input.files[0].size);
    let filename = input.files[0].name;
    let extension = input.files[0].name.split(".").pop().toLowerCase();
    isSuccess = fileTypes.indexOf(extension) > -1;
    if(isSuccess) {
        let fileData = input.files[0];
        let fileTypeIcon = "";
        fileTypeIcon = Constants.getDocumentIcon();
        $("a.change-doc-link").show();
        let attachment = ActionHelper.attachmentUpload(fileData, fileData["type"]);
        let attachmentRequest = ActionHelper.requestAttachmentUploadDraft(attachment);
        ActionHelper.executeApi(attachmentRequest)
            .then(function(response) {
                let newResponse = {
                    "name": filename + " (" + filesize + ")",
                    "type": "Document",
                    "id": response.attachmentId
                };
                $("textarea#document-attachment").val(JSON.stringify(newResponse));
                $("#document-done").removeClass("disabled");
                $("#document-done").find(Constants.getDisabledLoaderClass()).remove();
            });
        $(".doc-box").addClass("d-none");
        UxUtils.setAppend(".doc-name" , `${fileTypeIcon}&nbsp; <a class="a-link">${$(this)[0].files[0].name} (${filesize})</a>`);
    } else {
        $(".doc-box").removeClass("d-none");
        $("a.change-doc-link").hide();
        $("#document-done").removeClass("disabled");
        UxUtils.setBefore(".doc-box" , UxUtils.getMaxImageAlert(invalidFileFormatKey));
    }
});

/**
 * @event to remove the text from preview section
 */
$(document).on("click", ".remove-text", function() {
    let dataId = $(this).parents(".card-box").attr("data-id");
    let confirmBox = UxUtils.getTextConfirmBox(dataId, okKey , closeKey , confirmDeleteMsgKey);
    if (!$(this).parents("div.card-box").find("div.confirm-box").is(":visible")) {
        if ($(this).parents(".card-box").hasClass("question-section-div")) {
            UxUtils.setAfter($(this).parents("div.card-box").find(".input_section") , confirmBox);
        } else if ($(this).parents(".card-box").hasClass("text-section-div")) {
            UxUtils.setAfter($(this).parents("div.card-box").find("textarea:last") , confirmBox);
        } else {
            UxUtils.setAfter($(this).parents("div.card-box").find(".row:last") , confirmBox);
        }
    }
});

/**
 * @event when click on confirm delete section
 */
$(document).on("click", "#confirm-delete-text", function() {
    let eve = $(this).attr("data-id");
    $(`div.card-box[data-id="${eve}"]`).remove();
    $("form.sec1 div.section-2:visible div#root div.training-card-section").each(function(index, obj) {
        if (!($(obj).hasClass("question-section-div"))) {
            $(this).find("span.counter").text(index);
        }
        $(this).attr("data-id", "text-section-" + index);
        $(this).attr("id", "section-" + index);
        if ($(this).find("div.question-inputs").length > 0) {
            $(this).find("div.question-inputs").attr("id", "quest-text-" + index);
        }
    });
});

/**
 * @Event to get Local string and check contains argument to append or not
 */
$(document).on("click", "#next", function() {
    /* Validate */
    let errorText = "";
    let questionNumber = 0;
    $("form").find(`input[type="text"]`).each(function() {
        let element = $(this);
        if (element.val() == "") {
            if (element.attr("id").startsWith("question-title")) {
                if (questionNumber != element.parents("div.form-group").find("span.question-number").text()) {
                    questionNumber = element.parents("div.form-group").find("span.question-number").text();
                    errorText += "<h6><u>" + questionKey + questionNumber + "</u> </h6>";
                }
                errorText += `<p>${questionIsRequiredKey}</p>`;
            } else if (element.attr("id").startsWith("option")) {
                if (questionNumber != element.parents("div.card").find("span.question-number").text()) {
                    questionNumber = element
                        .parents("div.card")
                        .find("span.question-number")
                        .text();
                    errorText += "<h6><u>" + questionKey+" "+ questionNumber + "</u> </h6>";
                }
                errorText += "<p>Blank option not allowed for " + element.attr("placeholder") + ".</p>";
            }
        }
    });

    if ($.trim(errorText).length <= 0) {
        $(".section-1").hide();
        UxUtils.setAppend("form"  , $("#setting").clone());
        $("form #setting").show();
    } else {

        UxUtils.setHtml($("#exampleModalCenter").find("#exampleModalLongTitle") , UxUtils.createImageBox("images/error.png","","") + " Error!");
        UxUtils.setHtml($("#exampleModalCenter").find(".modal-body") , errorText);
        UxUtils.setHtml($("#exampleModalCenter").find(".modal-footer") , UxUtils.createButtonBox(closeKey , "btn btn-outline-secondary btn-sm" , `data-dismiss="modal"`));

        $("#exampleModalCenter").find("#save-changes").hide();
        $("#exampleModalCenter").modal("show");
    }
});

$(document).on("change", "div.question-container input.form-check-input", function() {
    if ($(this).prop("checked") == true) {
        if ($(this).parents(".card-box-alert").find(".label-alert").length > 1) {
            $(this).parents(".card-box-alert").find(".label-alert.correct-choice-error").remove();
        } else if ($(this).parents(".card-box-alert").find(".label-alert").length == 1) {
            $(this).parents(".card-box-alert").find(".label-alert.correct-choice-error").remove();
            $(this).parents("div.card-box-alert").removeClass("card-box-alert").addClass("card-box");
        }
    }
});
/********************************  Add Text Ends *************************************/

/***********************************  Submit Training *********************************/
/**
 * @Event to submit form
 */
$(document).on("click", "#submit", function() {
    $("#submit").prop("disabled", true);
    UxUtils.setBefore(".body-outer" , loader);
    submitForm();
});

/**
 * Method to fetch localization sting
 */
async function getStringKeys() {
    Localizer.getString("quizTitle").then(function(result) {
        $("#quiz-title").attr({
            "placeholder": result
        });
    });

    Localizer.getString("quizDescription").then(function(result) {
        $("#quiz-description").attr({
            "placeholder": result
        });
    });

    Localizer.getString("enterTheQuestion").then(function(result) {
        $("#question-title").attr({
            "placeholder": result
        });
        questionTitleKey = result;
    });

    Localizer.getString("dueIn", " 1 week ", "").then(function(result) {
        settingText = result;
        $("#due").text(settingText);
    });

    Localizer.getString("checkMe").then(function(result) {
        checkMeKey = result;
        $(".check-me").text(checkMeKey);
        $(".check-me-title").attr({
            "title": checkMeKey
        });
    });

    Localizer.getString("next").then(function(result) {
        nextKey = result;
        $(".next-key").text(nextKey);
    });

    Localizer.getString("back").then(function(result) {
        backKey = result;
        $(".back-key").text(backKey);
    });

    Localizer.getString("required").then(function(result) {
        requiredKey = result;
        $(".required-key").text(requiredKey);
    });

    Localizer.getString("dueBy").then(function(result) {
        dueByKey = result;
        $(".due-by-key").text(dueByKey);
    });

    Localizer.getString("resultVisibleTo").then(function(result) {
        resultVisibleToKey = result;
        $(".result-visible-key").text(resultVisibleToKey);
    });

    Localizer.getString("correctAnswerSetting", ", ").then(function(result) {
        correctAnswerKey = result;
    });

    Localizer.getString("everyone", ", ").then(function(result) {
        everyoneKey = result;
        $(".everyone-key").text(everyoneKey);
    });

    Localizer.getString("onlyMe", ", ").then(function(result) {
        onlyMeKey = result;
        $(".onlyme-key").text(onlyMeKey);
    });

    Localizer.getString("showCorrectAnswer").then(function(result) {
        showCorrectAnswerKey = result;
        $(".show-correct-key").text(showCorrectAnswerKey);
    });

    Localizer.getString("allowMultipleAttemptKey").then(function(result) {
        allowMultipleAttemptKey = result;
        $(".allow-multiple-attempt").text(allowMultipleAttemptKey);
    });

    Localizer.getString("assigneeTakeMultipleTraining").then(function(result) {
        assigneeTakeMultipleTraining = result;
        $(".allow-multiple-change-key").text(assigneeTakeMultipleTraining);
    });

    Localizer.getString("answerCannotChange").then(function(result) {
        answerCannotChangeKey = result;
        $(".answer-cannot-change-key").text(answerCannotChangeKey);
    });

    Localizer.getString("training_title").then(function(result) {
        $("#training-title").attr("placeholder", result);
    });

    Localizer.getString("training_description").then(function(result) {
        $("#training-description").attr("placeholder", result);
    });

    Localizer.getString("coverImage").then(function(result) {
        $(".cover-image-label").text(result);
        coverImageKey = result;
    });

    Localizer.getString("tapUploadImage").then(function(result) {
        $(".tap-upload-label").text(result);
        uploadImageLabelKey = result;
    });

    Localizer.getString("tapUploadFile").then(function(result) {
        $(".tap-upload-files-label").text(result);
        uploadFileLabelKey = result;
    });

    Localizer.getString("tapUploadVideo").then(function(result) {
        $(".tap-upload-video-label").text(result);
        uploadVideoLabelKey = result;
    });

    Localizer.getString("dueBy").then(function(result) {
        $(".due-by-label").text(result);
    });

    Localizer.getString("addContent").then(function(result) {
        $(".add-content-label").text(result);
        addContentKey = result;
    });

    Localizer.getString("photo").then(function(result) {
        $(".photo-label").text(result);
    });

    Localizer.getString("video").then(function(result) {
        $(".video-label").text(result);
    });

    Localizer.getString("document").then(function(result) {
        $(".document-label").text(result);
    });

    Localizer.getString("text").then(function(result) {
        $(".text-label").text(result);
        $(".text-label-placeholder").text(result);
    });

    Localizer.getString("quiz").then(function(result) {
        $(".quiz-label").text(result);
    });

    Localizer.getString("done").then(function(result) {
        $(".done-label").text(result);
    });

    Localizer.getString("tapUploadPhoto").then(function(result) {
        uploadImageLabelKey = result;
        $(".tap-upload-photo-label").text(result);
    });

    Localizer.getString("uploadPhoto").then(function(result) {
        $(".upload-photo-label").text(result);
    });

    Localizer.getString("descriptionContentAbout").then(function(result) {
        $(".desc-content-about-placeholder").attr("placeholder", result);
    });

    Localizer.getString("addQuestions").then(function(result) {
        $(".add-question-label").text(result);
    });

    Localizer.getString("close").then(function(result) {
        closeKey = result;
    });

    Localizer.getString("ok").then(function(result) {
        okKey = result;
    });

    Localizer.getString("uploadCoverImage").then(function(result) {
        uploadCoverImageKey = result;
        $(".upload-cover-image-key").text(uploadCoverImageKey);
    });

    Localizer.getString("trainingDescriptionOptional").then(function(result) {
        trainingDescriptionOptionalKey = result;
        $(".training-description-optional-key").attr({ "placeholder": trainingDescriptionOptionalKey });
    });

    Localizer.getString("trainingTitle").then(function(result) {
        trainingTitleKey = result;
        $(".training-title-key").attr({ "placeholder": trainingTitleKey });
    });

    Localizer.getString("clear").then(function(result) {
        clearKey = result;
        $(".clear-key").text(clearKey);
    });

    Localizer.getString("submit").then(function(result) {
        submitKey = result;
        $(".submit-key").text(submitKey);
    });

    Localizer.getString("question").then(function(result) {
        questionKey = result;
        $(".question-key").text(questionKey);
    });

    Localizer.getString("atleastOneContent").then(function(result) {
        atleastOneContentKey = result;
        $(".at-least-one-content-key").text(atleastOneContentKey);
    });

    Localizer.getString("addTitlePlaceholder").then(function(result) {
        addTitlePlaceholderKey = result;
        $("#image-training-text").attr({ "placeholder": result });
    });

    Localizer.getString("addDescriptionPlaceholder").then(function(result) {
        addDescriptionPlaceholderKey = result;
    });

    Localizer.getString("correctChoice").then(function(result) {
        correctChoiceKey = result;
    });

    Localizer.getString("invalidFileFormat").then(function(result) {
        invalidFileFormatKey = result;
    });

    Localizer.getString("invalidFileSize").then(function(result) {
        invalidFileSizeMsgKey = result;
    });

    Localizer.getString("atleastOneQuestion").then(function(result) {
        atleastOneErrorKey = result;
    });

    Localizer.getString("addTextDescriptionPlaceholder").then(function(result) {
        addTextDescriptionPlaceholderKey = result;
    });

    Localizer.getString("loadMore").then(function(result) {
        loadMoreKey = result;
    });

    Localizer.getString("loadLess").then(function(result) {
        loadLessKey = result;
    });

    Localizer.getString("enterTheChoice").then(function(result) {
        enterTheChoiceKey = result;
    });

    Localizer.getString("addMoreOptions").then(function(result) {
        addMoreOptionsKey = result;
    });

    Localizer.getString("addQuestions").then(function(result) {
        addQuestionsKey = result;
    });

    Localizer.getString("done").then(function(result) {
        doneKey = result;
    });

    Localizer.getString("confirmDeleteMsg").then(function(result) {
        confirmDeleteMsgKey = result;
    });

    Localizer.getString("confirmDeleteContentMsg").then(function(result) {
        confirmDeleteContentMsgKey = result;
    });

    Localizer.getString("cancel").then(function(result) {
        cancelKey = result;
    });

    Localizer.getString("discard").then(function(result) {
        discardKey = result;
    });

    Localizer.getString("nWeek", " ").then(function(result) {
        weekKey = result;
    });

    Localizer.getString("hours").then(function(result) {
        hoursKey = result;
    });

    Localizer.getString("hour").then(function(result) {
        hourKey = result;
    });

    Localizer.getString("minutes").then(function(result) {
        minutesKey = result;
    });

    Localizer.getString("minute").then(function(result) {
        minuteKey = result;
    });

    Localizer.getString("days").then(function(result) {
        daysKey = result;
    });

    Localizer.getString("questionLeftBlank").then(function(result) {
        questionLeftBlankKey = result;
    });

    Localizer.getString("questionIsRequired").then(function(result) {
        questionIsRequiredKey = result;
    });
}

/**
 * Method to submit form
 */
function submitForm() {
    $("form.sec1").find("div.text-danger.error-msg.at-least-one-content-key").remove();
    getStringKeys();
    ActionHelper
        .executeApi(request)
        .then(function(response) {
            console.info("GetContext - Response: " + JSON.stringify(response));
            if ($(".section-2").find("div.card-box:visible").length > 0) {
                createAction(response.context.actionPackageId);
            } else {
                $("#submit").attr("disabled", false);
                $(".loader-overlay").remove();
                UxUtils.setAfter(".section-2" , UxUtils.getAtLeastOneContainerError(atleastOneContentKey));
            }
        });
}

/**
 * Method to get question json
 */
function getQuestionSet() {
    questions = new Array();
    $("form div.section-2 #root").find(".section-div").each(function(index, elem) {
        if ($(elem).hasClass("question-section-div") == true) {

            /* Get Questions */
            let optionType = ActionHelper.getColumnType("singleselect");
            // let questionId = $(elem).data("id");
            let questionId = $(elem).find("span.counter").text();
            let option = [];
            $(elem).find("div.qna-option").each(function(ind) {
                let count = ind + 1;
                let optId = "question" + questionId + "option" + count;
                let optTitle = $(elem).find("input#option" + count).val();
                let optionAttachment = ($(elem).find("textarea.option-image" + count).val()) ? [JSON.parse($(elem).find("textarea.option-image" + count).val())] : [];
                if ($(elem).find("input.quest-answer:checked").length > 1) {
                    optionType = ActionHelper.getColumnType("multiselect");
                } else {
                    optionType = ActionHelper.getColumnType("singleselect");
                }
                option.push({
                    name: optId,
                    displayName: optTitle,
                    attachments: optionAttachment
                });
            });
            let questionAttachment = ($(elem).find("textarea.question-image").val()) ? [JSON.parse($(elem).find("textarea.question-image").val())] : [];
            let val = {
                name: questionId.toString(),
                displayName: $(elem).find("input.question" + questionId).val(),
                valueType: optionType,
                allowNullValue: false,
                options: option,
                attachments: questionAttachment,
            };
            questions.push(val);
        } else if ($(elem).hasClass("text-section-div") == true) {
            /*  Get Text  */
            let optionType = ActionHelper.getColumnType("largetext");
            let option = [];
            let optId = index; // $(elem).find("span.counter").text();
            let optTitle = $(elem).find("textarea.textarea-text").val();
            let optDescription = $(elem).find("textarea.textarea-text-description").val();
            option.push({
                name: optId,
                displayName: optDescription
            });
            let val = {
                name: "text-" + optId.toString(),
                displayName: optTitle,
                description: optDescription,
                valueType: optionType,
                allowNullValue: false,
                options: option,
                attachments: [],
            };
            questions.push(val);
        } else if ($(elem).hasClass("photo-section-div") == true) {
            /* Photo */
            let optionType = ActionHelper.getColumnType("largetext");
            let option = [];
            let optId = index; // $(elem).find("span.counter").text();
            let optTitle = $(elem).find("textarea.textarea-photo-title").val();
            let optDesc = $(elem).find("textarea.textarea-photo-description").val();
            let optAttachments = ($(elem).find("textarea.textarea-photo-attachments").val()) ? JSON.parse($(elem).find("textarea.textarea-photo-attachments").val()) : [];
            option.push({
                name: optId,
                displayName: optDesc
            });
            let val = {
                name: "photo-" + optId.toString(),
                displayName: optTitle,
                description: optDesc,
                valueType: optionType,
                allowNullValue: false,
                options: option,
                attachments: optAttachments
            };
            questions.push(val);
        } else if ($(elem).hasClass("document-section-div") == true) {
            /* Document */
            let optionType = ActionHelper.getColumnType("largetext");
            let option = [];
            let optId = index; // $(elem).find("span.counter").text();
            let optTitle = $(elem).find("textarea.textarea-document").val();
            let optDesc = $(elem).find("textarea.textarea-document-description").val();
            let optAttach = [JSON.parse($(elem).find("textarea.textarea-document-attachment").val())];
            option.push({
                name: optId,
                displayName: optDesc
            });

            let val = {
                name: "document-" + optId.toString(),
                displayName: optTitle,
                description: optDesc,
                valueType: optionType,
                allowNullValue: false,
                options: option,
                attachments: optAttach
            };
            questions.push(val);
        } else if ($(elem).hasClass("video-section-div") == true) {
            /* Video */
            let optionType = ActionHelper.getColumnType("largetext");
            let option = [];
            let optId = index; // $(elem).find("span.counter").text();
            let optTitle = $(elem).find("textarea.textarea-video").val();
            let optDesc = $(elem).find("textarea.textarea-video-description").val();
            let optAttachment = [JSON.parse($(elem).find("textarea.textarea-video-attachments").val())];
            option.push({
                name: optId,
                displayName: optDesc
            });

            let val = {
                name: "video-" + optId.toString(),
                displayName: optTitle,
                description: optDesc,
                valueType: optionType,
                allowNullValue: false,
                options: option,
                attachments: optAttachment
            };
            questions.push(val);
        }
    });
    return questions;
}

/**
 * Method to get correct answer from the training quiz
 */
function getCorrectAnswer() {
    let correctOption = [];

    $("form div.section-2 #root").find(".section-div").each(function(index, elem) {
        let correct = [];
        let questionId = $(elem).find("span.counter").text();
        if ($(elem).hasClass("question-section-div") == true) {
            $(elem).find("div.option-div").each(function(ind) {
                let count = ind + 1;
                let questionId = $(elem).data("id");
                if ($(elem).find("#quest-text-" + questionId + " #check" + count).is(":checked")) {
                    let optId = "question" + questionId + "option" + count;
                    // if it is checked
                    correct.push(optId);
                }
            });
        } else {
            let optId = "question" + questionId;
            correct.push(optId);
        }
        correctOption[questionId - 1] = correct;
    });

    let property = {
        name: "Question Answers",
        type: "LargeText",
        value: JSON.stringify(correctOption),
    };

    return property;
}

/**
 * Method to create action creates json for store form data
 * @param actionPackageId string identifier contains package id
 */
function createAction(actionPackageId) {
    let trainingTitle = $("#training-title").val();
    let trainingDescription = $("#training-description").val();
    let trainingExpireDate = $(`input[name="expiry_date"]`).datepicker("getDate");
    let trainingExpireTime = $(`input[name="expiry_time"]`).val();
    let getExpiryDateData = trainingExpireDate.toString().split(" ");
    getExpiryDateData[4] = trainingExpireTime + ":00";
    let expiryDate = new Date(getExpiryDateData.join(" "));

    let resultVisible = $(`input[name="visible_to"]:checked`).val();
    let showCorrectAnswer = $("#show-correct-answer").is(":checked") ? "Yes" : "No";
    let allowMultipleAttempt = $("#allow-multiple-attempt").is(":checked") ? "Yes" : "No";
    let questionsSet = getQuestionSet();
    let getcorrectanswers = getCorrectAnswer();
    let properties = [];
    properties.push({
        name: "Training Description",
        type: "LargeText",
        value: trainingDescription,
    }, {
        name: "Training Expire Date Time",
        type: "DateTime",
        value: new Date(trainingExpireDate + " " + trainingExpireTime),
    }, {
        name: "Result Visible",
        type: "Text",
        value: resultVisible,
    }, {
        name: "Show Correct Answer",
        type: "Text",
        value: showCorrectAnswer,
    }, {
        name: "Attachment Id",
        type: "Text",
        value: "",
    }, {
        name: "Allow Multiple Attempt",
        type: "Text",
        value: allowMultipleAttempt,
    });
    properties.push(getcorrectanswers);
    properties.push({
        name: "Locale",
        valueType: ActionHelper.actionPropertyValueType(),
        value: context.locale,
    });
    let action = {
        id: Utils.generateGUID(),
        actionPackageId: actionPackageId,
        version: 1,
        displayName: trainingTitle,
        description: trainingDescription,
        expiryTime: new Date(expiryDate).getTime(),
        customProperties: properties,
        dataTables: [{
            name: "TrainingDataSet",
            itemsVisibility: ActionHelper.visibility(),
            rowsVisibility: resultVisible == "Everyone" ? ActionHelper.visibility() : ActionHelper.visibility(),
            itemsEditable: false,
            canUserAddMultipleItems: false,
            dataColumns: questionsSet,
            attachments: ($("#training-attachment-id").val()) ? [JSON.parse($("#training-attachment-id").val())] : []
        }],
    };
    let request = ActionHelper.createAction(action);
    ActionHelper
        .executeApi(request)
        .then(function(response) {
            console.info("CreateAction - Response: " + JSON.stringify(response));
        })
        .catch(function(error) {
            console.error("CreateAction - Error: " + JSON.stringify(error));
        });
}

/***********************************  Submit Training Ends *******************************/

/**
 * @event when document load is ready
 */
$(function() {
    request = ActionHelper.getContextRequest();
    getStringKeys();
    loadCreationView(request);
    $(".training-clear").attr({
        "style": "display:none;"
    });
});

/**
 * Method to get theme color and localization
 */
async function loadCreationView(request) {
    getStringKeys();
    let response = await ActionHelper.executeApi(request);
    context = response.context;
    let langObj = Utils.getLocaleForCalendar(context.locale);
    ActionHelper.executeApi(request).then(function(res) {
        response = res;
        context = response.context;
        lastSession = context.lastSessionData;
        let theme = context.theme;
        let formSection = UxUtils.getLandingContainer(uploadCoverImageKey, trainingTitleKey, trainingDescriptionOptionalKey, coverImageKey, clearKey, settingText, nextKey);
        $("link#theme").attr("href", "css/style-" + theme + ".css");
        UxUtils.setAppend("form.sec1" , formSection);
        UxUtils.setAppend("form.sec1" , settingSection);
        UxUtils.setAppend("form.sec1" , trainingSectionView);
        UxUtils.setAfter("form.sec1" , optionSection);
        opt = $("div#option-section .option-div").clone();
        let weekDate = new Date(new Date().setDate(new Date().getDate() + 7))
            .toISOString()
            .split("T")[0];

        let weekMonth = new Date(weekDate).toLocaleString("default", {
            month: "short"
        });

        let setDate = "";
        let weekD = new Date(weekDate).getDate();
        let weekYear = new Date(weekDate).getFullYear();
        let weekDateFormat = weekMonth + " " + weekD + ", " + weekYear;
        let currentTime = (("0" + new Date().getHours()).substr(-2)) + ":" + (("0" + new Date().getMinutes()).substr(-2));

        /* If Edit back the quiz */
        if (lastSession != null) {

            let expiryTime = lastSession.action.expiryTime;
            setDate = new Date(expiryTime);
            currentTime = new Date(expiryTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }).toLowerCase();

            /* Quiz Section */
            $("#quiz-title").val(lastSession.action.displayName);
            $("#quiz-description").val(lastSession.action.customProperties[0].value);

            /* Due Setting String */
            let end = new Date(setDate + " " + currentTime);
            let start = new Date();
            // let days = calc_date_diff(start, end);
            let days = Utils.calcDateDiff(start, end, weekKey, hoursKey, hourKey, minutesKey, minuteKey, daysKey);
            let correctAnswer = lastSession.action.customProperties[3].value == "Yes" ? correctAnswerKey : "";
            if (lastSession.action.customProperties[2].value == "Yes") {
                $("#allow-multiple-attempt").prop("checked", true);
            } else {
                $("#allow-multiple-attempt").prop("checked", false);
            }
            getStringKeys();
            Localizer.getString("dueIn", days, correctAnswer).then(function(result) {
                settingText = result;
                $("div.section-1-footer").find("span#due").append(settingText);
            });

            if (lastSession.action.customProperties[3].value == "Yes") {
                $("#show-correct-answer").prop("checked", true);
            } else {
                $("#show-correct-answer").prop("checked", false);
            }

        } else {
            getStringKeys();
            $("form.sec1").show();
            $(".section-1").show();
            $(".section-1-footer").show();

            let todayDate = new Date();
            //Change it so that it is 7 days ago.
            let weekAgoDate = todayDate.getDate() + 7;
            setDate = new Date(todayDate.setDate(weekAgoDate));
            currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }).toLowerCase();

        }

        $(".form_date").attr({ "data-date": setDate });
        $(".form_date input").val(weekDateFormat);
        $(".form_date").attr({
            "data-date": setDate
        });
        let lang = langObj.lang;
        $(".form_time").datetimepicker({
            weekStart: 1,
            format: "HH:ii",
            pickDate: "false",
            autoclose: true,
            startView: 1,
            maxView: 1,
            useCurrent: false,
            minView: 0,
            forceParse: 0,
            todayHighlight: 1,
            todayBtn: 1,
            meridiem: "",
            language: lang

        });
        $(".form_time input").val(currentTime);
        if (lastSession != null) {
            $(".sec1").show();
            $(".section-1").hide();
            $(".section-1-footer").hide();
            $(".section-2").show();
            $("div.section-2-footer").show();

            $("#training-title").val(lastSession.action.displayName);
            $("#training-description").val(lastSession.action.customProperties[0].value);
            $("#training-title-content").text(lastSession.action.displayName);
            $("#training-description-content").text(lastSession.action.customProperties[0].value);

            /* Check if image upload for training */
            if (lastSession.action.dataTables[0].attachments.length > 0) {
                UxUtils.setAppend($("div.section-2").find("div.training-card-section") , UxUtils.createTextArea("", "", "training-attachment-id", JSON.stringify(lastSession.action.dataTables[0].attachments[0]), "d-none"));
                let req2 = ActionHelper.getAttachmentInfoDraft(lastSession.action.dataTables[0].attachments[0].id);
                saveAttachmentData.push(lastSession.action.dataTables[0].attachments[0]);
                ActionHelper.executeApi(req2)
                    .then(function(response) {
                        $("#training-title-image").attr("src", `${response.attachmentInfo.downloadUrl}`);
                        $("#training-title-image").addClass("heightfit");
                        $("#training-title-image").parent().show();
                        $("#training-img-preview").attr("src", `${response.attachmentInfo.downloadUrl}`);

                        let uniqueCarouselId = Constants.getUniqueId();
                        UxUtils.setHtml($("#training-img-preview").parent() , UxUtils.createImageLightBox(response.attachmentInfo.downloadUrl,uniqueCarouselId,0,"training-updated-img quiz-updated-img card-bg card-border","training-img-preview"));
                        $("#training-img-preview").parent().show();
                        UxUtils.setHtml("#training-title-image" , UxUtils.createImageLightBox(response.attachmentInfo.downloadUrl,(uniqueCarouselId+2),0,"training-updated-img quiz-updated-img card-bg card-border","training-title-image"));

                        Utils.getClassFromDimension(response.attachmentInfo.downloadUrl , "#training-title-image");
                        Utils.getClassFromDimension(response.attachmentInfo.downloadUrl , "#training-img-preview");

                        $(".section-1").find(".training-updated-img").show();
                        $(".section-1").find(".photo-box").hide();
                        $(".section-2").find(".img-thumbnail").show();
                        $(".section-2").find("#training-title-image").show();
                        $(".training-clear").show();
                    })
                    .catch(function(error) {
                        console.error("AttachmentAction - Error: sasasa" + JSON.stringify(error));
                    });
                UxUtils.setAfter("#cover-image" , UxUtils.createTextArea("training_title", "training-title d-none", "", $("#training-title").val()));
                UxUtils.setAfter("#cover-image" , UxUtils.createTextArea("training_description", "training-description d-none", "", $("#training-description").val()));
            }

            /* Create Text and Question summary */
            lastSession.action.dataTables.forEach((dataTable) => {
                let countQuestionno = 1;
                let countQuestion = 0;
                dataTable.dataColumns.forEach((data, ind) => {
                    let counter = ind + 1;
                    if (data.valueType == "LargeText") {
                        /* Call Text Section 1 */
                        if (data.name.indexOf("photo") >= 0) {
                            let uniqueCarouselId = Constants.getUniqueId();
                            let photoDesc = data.options[0].displayName;
                            let loaderClass = "";
                            let loaderCss = "";
                            let loaderButton = "";
                            if (photoDesc && (photoDesc.split(/\r\n|\r|\n/).length > 2 || photoDesc.length > 180)) {
                                loaderClass = "show-text";
                                loaderCss = Constants.getLoadMoreCss();
                                loaderButton = Constants.getLoadMoreLink(loadMoreKey);
                            }
                            let photoSec = UxUtils.getEditImageSection(counter, data.displayName, photoDesc, JSON.stringify(data.attachments), loaderClass, loaderCss, loaderButton);
                            UxUtils.setAppend("div.section-2 div#root" , photoSec);
                            if (photoDesc && (photoDesc.split(/\r\n|\r|\n/).length > 2 || photoDesc.length > 180)) {
                                $("#section-" + counter).find(".photo-description-preview").addClass("show-text");
                                $("#section-" + counter).find(".photo-description-preview").css({ "-webkit-line-clamp": Constants.webkitLineClampCssCount() });
                                UxUtils.setAfter($("#section-" + counter).find(".photo-description-preview") , Constants.getLoadMoreLink(loadMoreKey));
                            }

                            let $carousel = $(UxUtils.getResponseViewCarouselSection(uniqueCarouselId));
                            let $olSection = $(UxUtils.getCarouselOlSection());
                            let $carouselInner = $(UxUtils.getCarouselInnerSection());
                            UxUtils.setAppend($carousel , $olSection);
                            UxUtils.setAppend($carousel , $carouselInner);
                            if (data.attachments.length > 1) {
                                data.attachments.forEach((respData, indx) => {
                                    let $liList = $(UxUtils.getCarousalLiSection(uniqueCarouselId, indx));
                                    UxUtils.setAppend($olSection , $liList);
                                    let getImagedata = ActionHelper.getAttachmentInfoDraft(respData.id);
                                    ActionHelper.executeApi(getImagedata)
                                        .then(function(response) {
                                            let $imgDiv = $(UxUtils.getCarousalImages(response.attachmentInfo.downloadUrl, indx ,uniqueCarouselId));
                                            UxUtils.setAppend($carouselInner , $imgDiv);
                                            console.info("Attachment - Response: " + JSON.stringify(response));
                                        })
                                        .catch(function(error) {
                                            console.error("AttachmentAction - Error: " + JSON.stringify(error));
                                        });
                                });
                                UxUtils.setAppend($carousel , UxUtils.getCarousalPagination(uniqueCarouselId));
                                UxUtils.setAppend($("#section-" + counter).find(".edit-carasoul-here") , $carousel);
                                $(".carousel").carousel();
                            } else {
                                let getImagedata = ActionHelper.getAttachmentInfoDraft(data.attachments[0].id);
                                ActionHelper.executeApi(getImagedata)
                                    .then(function(response) {
                                        UxUtils.setAppend($("#section-" + counter).find(".edit-carasoul-here") , UxUtils.createImageLightBox(response.attachmentInfo.downloadUrl,uniqueCarouselId));
                                        console.info("Attachment - Response: " + JSON.stringify(response));
                                    })
                                    .catch(function(error) {
                                        console.error("AttachmentAction - Error: " + JSON.stringify(error));
                                    });
                            }
                        } else if (data.name.indexOf("document") >= 0) {
                            let docDesc = data.options[0].displayName;
                            let loaderClass = "";
                            let loaderCss = "";
                            let loaderButton = "";
                            if (docDesc && (docDesc.split(/\r\n|\r|\n/).length > 2 || docDesc.length > 180)) {
                                loaderClass = "show-text";
                                loaderCss = `-webkit-line-clamp : ${Constants.webkitLineClampCssCount()}`;
                                loaderButton = Constants.getLoadMoreLink(loadMoreKey);
                            }
                            let documentSection = UxUtils.getEditDownloadSection(counter, data.displayName, data.options[0].displayName, JSON.stringify(data.attachments[0]), Constants.getDocumentIcon(), loaderClass, loaderCss, loaderButton);
                            UxUtils.setAppend("div.section-2 div#root" , documentSection);
                            let dname = Utils.isJson(data.options[0].displayName) ? JSON.parse(data.options[0].displayName) : data.options[0].displayName;
                            let attachment = Utils.isJson(dname.attachmentId) ? JSON.parse(dname.attachmentId) : dname.attachmentId;
                            if (attachment != undefined) {
                                $("#section-" + counter + " textarea#textarea-document").val(attachment);
                            }

                        } else if (data.name.indexOf("video") >= 0) {
                            let videoId = data.attachments[0].id;
                            let req = ActionHelper.getAttachmentInfoDraft(videoId);
                            let videoDesc = data.options[0].displayName;
                            let videoDownloadURL = "";
                            let loaderClass = "";
                            let loaderCss = "";
                            let loaderButton = "";
                            if (videoDesc && (videoDesc.split(/\r\n|\r|\n/).length > 2 || videoDesc.length > 180)) {
                                loaderClass = "show-text";
                                loaderCss = `-webkit-line-clamp : ${Constants.webkitLineClampCssCount()}`;
                                loaderButton = Constants.getLoadMoreLink(loadMoreKey);
                            }
                            let videoSection = UxUtils.getEditVideoSection(counter, data.displayName, data.options[0].displayName, JSON.stringify(data.attachments[0]), "", loaderClass, loaderCss, loaderButton);
                            ActionHelper.executeApi(req)
                                .then(function(response) {
                                    console.info("Attachment - Response: videourl" + JSON.stringify(response));
                                    videoDownloadURL += response.attachmentInfo.downloadUrl;
                                    $(`#section-${counter}`).find(`#video-sec-${counter}`).attr("src", videoDownloadURL);
                                })
                                .catch(function(error) {
                                    console.error("AttachmentAction - Error: videourl" + JSON.stringify(error));
                                });
                            UxUtils.setAppend("div.section-2 div#root" , videoSection);
                        } else {
                            /* text */
                            let textDesc = data.options[0].displayName;
                            let loaderClass = "";
                            let loaderCss = "";
                            let loaderButton = "";
                            if (textDesc && (textDesc.split(/\r\n|\r|\n/).length > 2 || textDesc.length > 180)) {
                                loaderClass = "show-text";
                                loaderCss = `-webkit-line-clamp : ${Constants.webkitLineClampCssCount()}`;
                                loaderButton = Constants.getLoadMoreLink(loadMoreKey);
                            }
                            let textSection = UxUtils.getEditTextContainer(counter, data.displayName, textDesc, loaderClass, loaderCss, loaderButton);
                            UxUtils.setAppend("div.section-2 div#root" , textSection);
                        }

                    } else if (data.valueType == "SingleOption" || data.valueType == "MultiOption") {

                        /* Call Question Section 1 */
                        let correct = new Array();
                        // let correctOpt = "";
                        let optionText = "";
                        let correctInputs = "";
                        let questionInput = UxUtils.createInputBox("hidden", `question${countQuestionno}`, "", data.displayName, "");
                        let questionImagearray = "";
                        if (data.attachments.length > 0) {
                            questionImagearray = data.attachments[0];
                            let req = ActionHelper.getAttachmentInfoDraft(questionImagearray.id);
                            ActionHelper.executeApi(req)
                                .then(function(response) {
                                    $(".section-2").find(`#${data.attachments[0].id}`).attr("src", response.attachmentInfo.downloadUrl);
                                    $(`img#${data.attachments[0].id}`).parent().attr({"href": response.attachmentInfo.downloadUrl});
                                    Utils.getClassFromDimension(response.attachmentInfo.downloadUrl , `img#${data.attachments[0].id}`);
                                })
                                .catch(function(error) {
                                    console.error("AttachmentAction - Error: question image" + JSON.stringify(error));
                                });
                        }
                        if (questionImagearray) {
                            questionImagearray = JSON.stringify(questionImagearray);
                        }
                        let imageQuestionURL = "";
                        let optionChecked = "";
                        let optionAttachments = "";
                        data.options.forEach((opt, inde) => {
                            let count = inde + 1;
                            let quesAnsArr = $.parseJSON(lastSession.action.customProperties[Constants.getCorrectAnswerIndex()].value);
                            let imageArray = "";
                            let imageURL = "";
                            let styleOptionImage = "d-none";
                            $(`.opt-image${count}`).parent().find("loader-cover").show();
                            if (opt.attachments.length > 0) {
                                styleOptionImage = "";
                                imageArray = opt.attachments[0];
                                let req = ActionHelper.getAttachmentInfoDraft(imageArray.id);
                                ActionHelper.executeApi(req)
                                    .then(function(response) {
                                        console.info("Attachment - Response: option url" + JSON.stringify(response));
                                        imageURL += response.attachmentInfo.downloadUrl;
                                        $(`.opt-image${count}`).attr("src", response.attachmentInfo.downloadUrl);
                                        $(`.opt-image${count}`).parent().attr("href", response.attachmentInfo.downloadUrl);
                                        $(`.opt-image${count}`).parent().find("loader-cover").hide();

                                        Utils.getClassFromDimension(response.attachmentInfo.downloadUrl , `.opt-image${count}`);

                                    })
                                    .catch(function(error) {
                                        console.error("AttachmentAction - Error: option url" + JSON.stringify(error));
                                    });
                            }
                            if (imageArray) {
                                optionAttachments += UxUtils.createTextArea("", `d-none option-image${count}`, "", JSON.stringify(imageArray));
                            }

                            let ifCorrectCheck = "";
                            let questionOptionId = `question${countQuestionno}option${count}`;
                            if ($.inArray(opt.name, quesAnsArr[countQuestion]) != -1) {
                                correctInputs += UxUtils.createInputBox("checkbox", "", `check${count}`, "", "checked");
                                optionChecked += UxUtils.createInputBox("checkbox", "d-none quest-answer", "", "", "checked");

                                // if it is checked
                                correct.push(questionOptionId);
                                // correctOpt += UxUtils.createParagraphBox(opt.displayName, "mb0", "");
                                ifCorrectCheck = Constants.getCheckedTickIcon();
                            }
                            let optionsInputs = UxUtils.createInputBox("hidden", "all_options", `option${count}`, opt.displayName);
                            let imagePreview = UxUtils.createImageLightBox(imageURL, "question" + countQuestionno , count , `opt-image opt-image${count} img-responsive`);
                            let optionValue = (opt.displayName) ? opt.displayName : "&nbsp;";
                            optionText += UxUtils.getOptionValue(optionsInputs, imagePreview, optionValue, questionOptionId, ifCorrectCheck, styleOptionImage, count);

                        });

                        let questionImage = "";
                        let hideQuestionImage = "d-none";
                        if (data.attachments.length > 0) {
                            hideQuestionImage = "";
                            questionImage = UxUtils.createImageLightBox(imageQuestionURL, "question" + countQuestionno ,countQuestionno, `question-preview-image` , data.attachments[0].id);
                        }
                        let questSection1 = UxUtils.getQuestionSection(questionKey, countQuestionno, optionChecked, questionImage, hideQuestionImage, data.displayName, optionText, questionInput, questionImagearray, optionAttachments, correctInputs);
                        UxUtils.setAppend("div.section-2 div#root" , questSection1);
                        countQuestion++;
                        countQuestionno++;
                    }
                });
            });
        } else {
            getStringKeys();
        }
        let dateInput = $(`input[name="expiry_date"]`);
        let container = $(".bootstrap-iso form").length > 0 ? $(".bootstrap-iso form").parent() : "body";
        let options = {
            container: container,
            autoclose: true,
            orientation: "top",
            todayHighlight: true,
            language: lang
        };
        dateInput.datepicker(options);
        dateInput.datepicker("setDate", setDate);
        dateInput.datepicker().on("show", function () {
            let $calendarSelector = $(".datepicker.datepicker-dropdown.dropdown-menu");
            $calendarSelector.find(".prev").empty();
            $calendarSelector.find(".next").empty();
        });
        ActionHelper.hideLoader();
    });
}
/***********************************  Other Actions *******************************/

/**
 * @event to back button
 */
$(document).on("click", "#back", function() {
    $(".section-2").hide();
    $(".section-2-footer").hide();
    $("#setting").hide();
    $(".section-1").show();
    $(".section-1-footer").show();
    $(".error-msg").remove();
    $("#due").text(settingText);
});

/**
 * @event to back button click from setting page
 */
$(document).on("click", "#back-setting", function() {
    $(".error-msg").remove();
    $(".section-1").show();
    $(".section-1-footer").show();
    $("form #setting").hide();
    $("#due").text(settingText);
});

/**
 * @event to next button
 */
$(document).on("click", "#next1", function() {
    $(".error-msg").remove();
    $(`input[type="text"]`).removeClass("danger");
    $("label.label-alert").remove();
    $("div.card-box-alert").removeClass("card-box-alert").addClass("card-box");

    $("form > .section-1")
        .find(`input[type="text"]`)
        .each(function() {
            let element = $(this);
            if (element.val() == "") {
                element.parents("div.card-box")
                    .removeClass("card-box")
                    .addClass("card-box-alert");

                if (element.attr("id") == "training-title") {
                    $("#training-title").addClass("danger");
                    UxUtils.setBefore("#training-title" , UxUtils.getRequiredError(requiredKey));
                }
            } else {

                let trainingTitle = $("#training-title").val();
                let trainingDesc = $("#training-description").val();
                $(".section-1").hide();
                $("div.section-1-footer").hide();

                $(".section-2").show();
                $("div.section-2-footer").show();

                $("#training-title-content").text(trainingTitle);
                if (trainingDesc) {
                    $("#training-description-content").text(trainingDesc);
                }

                if ($(".training-title").length > 0) {
                    $(".training-title").val(trainingTitle);
                } else {
                    UxUtils.setAfter("#cover-image" , UxUtils.createTextArea("training_title", "training-title", "", trainingTitle, "d-none"));
                }
                if ($(".training-description").length > 0) {
                    $(".training-description").val(trainingDesc);
                } else {
                    UxUtils.setAfter("#cover-image" ,UxUtils.createTextArea("training_description", "training-description", "", trainingDesc, "d-none"));
                }
            }
        });

    let imageCounter = $(".training-card-section").find(`input[type="file"]`).get(0).files.length;
    if (imageCounter > 0) {
        UxUtils.setBefore(".body-outer" , loader);
        $(".loader-overlay").remove();
    } else {
        $("#training-title-content").parents("div.col-9").addClass("col-12").removeClass("col-9");
        $("#training-title-content").parents("div.row").find("div.col-3").hide();
    }
});

/**
 * @event when training cover image changes
 */
$(document).on("change", "#cover-image", function() {
    $(".error-msg").remove();
    if ($(this).val()) {
        let urlResponse = readURL(this, "#training-img-preview, #training-title-image", "next1");
        if (urlResponse == true) {
            $("div.cover-image-loader").show();
            // Create Light Box Slider
            let input = this;
            let reader = new FileReader();
            reader.onload = function(event) {
                let uniqueCarouselId = Constants.getUniqueId();
                UxUtils.setHtml($("#training-img-preview").parents("div.training-updated-img") , UxUtils.createImageLightBox(event.target.result,uniqueCarouselId,0,`training-updated-img quiz-updated-img card-bg card-border`,"training-img-preview"));
                UxUtils.setHtml($("#training-title-image").parents("div.quiz-updated-img") , UxUtils.createImageLightBox(event.target.result,(uniqueCarouselId+2),0,`training-updated-img quiz-updated-img card-bg card-border` , "training-title-image"));
                Utils.getClassFromDimension(event.target.result, "#training-title-image");
                Utils.getClassFromDimension(event.target.result,"#training-img-preview");
                $("#training-img-preview").parents("div.training-updated-img").show();
            };
            reader.readAsDataURL(input.files[0]);
            $(".photo-box").hide();
            $(".training-updated-img").show();
            $("#training-title-image").parents("div.quiz-updated-img").show();
            $(".training-clear").show();
            if (!$("#next1").hasClass("disabled")) {
                $("#next1").addClass("disabled");
                UxUtils.setPrepend("#next1" , UxUtils.getLoaderSpinner());
            }
            /* Perform image upload for quiz template */
            let fileData = this;
            if ($(fileData).val() != "") {
                let coverImage = fileData.files[0];
                let attachment = ActionHelper.attachmentUpload(coverImage, coverImage["type"]);
                let attachmentRequest = {};
                attachmentRequest = ActionHelper.requestAttachmentUploadDraft(attachment);
                ActionHelper.executeApi(attachmentRequest)
                    .then(function(response) {
                        let attachmentData = {
                            "name": "training-banner",
                            "type": "Image",
                            "id": response.attachmentId
                        };
                        saveAttachmentData.push(attachmentData);
                        $("#next1").removeClass("disabled");
                        $("#next1").find(`span.spinner-border.spinner-border-sm`).remove();
                        if($("#training-attachment-id").length > 0) {
                            $("#training-attachment-id").val(JSON.stringify(attachmentData));
                        } else {
                            UxUtils.setAppend($("div.section-2").find("div.training-card-section") , UxUtils.createTextArea(" ", " ", "training-attachment-id", JSON.stringify(attachmentData), "d-none"));
                        }
                    })
                    .catch(function(error) {
                        console.log("GetContext - Error2: " + JSON.stringify(error));
                    });
            }

        } else {

            $(".photo-box").show();
            $(".img-thumbnail").hide();
            $(".training-updated-img").hide();
            $("#training-title-image").hide();
            $(".training-clear").hide();
            UxUtils.setBefore($(".cover-image-loader").parent() , UxUtils.getMaxImageAlert(invalidFileFormatKey));
        }
    }
});

/**
 * @event when click on clear button on training section
 */
$(document).on("click", ".training-clear", function() {
    $(".error-msg").remove();
    $("div.section-1 .photo-box").show();
    $("div.section-1 .training-updated-img").hide();
    $("div.section-1 .training-clear").hide();
    $("#training-img-preview").attr("src", "");
    $("#training-title-image").parents("div.quiz-updated-img").hide();
    $("#training-attachment-id").remove();
    $("div#section-0 #cover-image").val("");
    $("div#section-0 .img-thumbnail").hide();
    $("div#section-0 .img-thumbnail").parents(".rows").addClass("col-12").removeClass("col-9");
});

/**
 * @event when click on class then open hidden file
 */
$(document).on("click", ".upvj", function(event) {
    event.preventDefault();
    if ($(this).parents("div.section-1").length > 0) {
        $(".section-2").find("div.training-card-section:first").find(`input[type="file"]`).click();
    } else {
        $(".section-2").find("div.training-card-section:last").find(`input[type="file"]`).click();
    }
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
            if ($(this).attr("role") == "input") {
                $(this).find("input").focus();
            }
            if ($(this).attr("role") == "checkbox") {
                $(this).find("input[type=checkbox]").click();
            }
            if ($(this).attr("role") == "button") {
                if ($(this).data("id") == "back" && $(this).hasClass("disabled")) {
                    return false;
                }
                $("#" + $(this).data("id")).click();
            }
            if ($(this).attr("role") == "input") {
                $(".quiz-clear:visible").click();
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
 * @event Keydown and Click when question cover image changes
 */
$(document).on({
    keydown: function(e) {
        let key = e.which;
        if (key === 13 || key === 32) {
            e.preventDefault();
            $(this).click();
            return false;
        }
    },
    click: function(e) {
        e.preventDefault();
        $(this).parents(".input-group").find(`input[type="file"]`).click();
        return false;
    }
}, ".question-image, .option-image");

$(document).on("click", `[data-toggle="lightbox"]`, function(event) {
    event.preventDefault();
    $(this).ekkoLightbox({
        alwaysShowClose: true
    });
});

/**
 * @event Change when question cover image changes
 */
$(document).on("change", `input[name="question_image"]`, function() {
    // $(".invalid-file-question").remove();
    $(this).parents("div.form-group-question").find("span.text-danger.error-msg").remove();
    if($(this).val()) {
        let urlReturn = readURL(this, $(this).parents("div.form-group-question").find(".question-preview-image"));
        if (urlReturn == true) {
            if (!$("#question-done").hasClass("disabled")) {
                $("#question-done").addClass("disabled");
                UxUtils.setAppend("#question-done" , Constants.getDisabledLoader());
            }
            buttonCounter++;
            $("#question-done").attr({"data-count" : buttonCounter});
            let input = this;
            let reader = new FileReader();
            reader.onload = function(event) {
                let uniqueCarouselId = Constants.getUniqueId();
                let questionId = "question" + uniqueCarouselId;
                $(input).parents("div.question-container").attr({"data-id": questionId});
                UxUtils.setHtml($(input).parents("div.form-group-question").find(".question-preview") , UxUtils.createImageLightBox(event.target.result,questionId,"0",`question-preview-image`,questionId));
                Utils.getClassFromDimension(event.target.result,`#${questionId}`);
            };
            reader.readAsDataURL(input.files[0]);
            $(this).parents("div.form-group-question").find(".question-preview").show();
            $(".remove-option").hide();

            /* Perform image upload for question image */
            let fileData = this;
            if ($(fileData).val() != "") {
                let coverImage = fileData.files[0];
                let attachment = ActionHelper.attachmentUpload(coverImage, coverImage["type"]);
                let attachmentRequest = ActionHelper.requestAttachmentUploadDraft(attachment);
                let imgIndex = $(this).attr("id");
                ActionHelper.executeApi(attachmentRequest)
                .then(function(response) {
                    let attachmentData = {
                        "name": "question-banner-" + imgIndex,
                        type: "Image",
                        id: response.attachmentId
                    };
                    let selector = $(this).parents(".question-container").attr("id");
                    if ($("#" + selector).find("#question-attachment-set").length > 0) {
                        $("#" + selector).find("#question-attachment-set").val(JSON.stringify(attachmentData));
                    } else {
                        // $("#question-attachment-set").
                        UxUtils.setAfter(fileData , UxUtils.createTextArea("", "d-none", "question-attachment-set", JSON.stringify(attachmentData)));
                    }
                    buttonCounter--;
                    if(buttonCounter == 0) {
                        $("#question-done").removeClass("disabled");
                        $("#question-done").find(Constants.getDisabledLoaderClass()).remove();
                    }
                })
                .catch(function(error) {
                    console.log("GetContext - Error3: " + JSON.stringify(error));
                });
            }
        } else {
            $(".question-preview-image").attr("src", "");
            $(".question-preview").hide();
            UxUtils.setBefore($(this).parents(".form-group-question").find(".question-preview") , UxUtils.getMaxImageAlert(invalidFileFormatKey));
            $(this).parents("div.input-group-append").find("#question-attachment-id").remove();
            $(this).parents("div.input-group-append").find("#question-attachment-set").remove();
        }
    }
});

/**
 * @event Change when option cover image changes
 */
$(document).on("change", `input[name="option_image"]`, function() {
    $(this).parents("div.option-div").find("span.text-danger.error-msg").remove();
    let urlReturn = readURL(this, $(this).parents("div.row").find(".option-preview-image"));
    $(this).parents("div.row").find(".option-preview-image").show();
    $(this).parents("div.row").find("div.option-preview").show();
    if (urlReturn == true) {
        buttonCounter++;
        $("#question-done").attr({"data-count" : buttonCounter});
        if (!$("#question-done").hasClass("disabled")) {
            $("#question-done").addClass("disabled");
            UxUtils.setAppend("#question-done" , Constants.getDisabledLoader());
        }
        let fileData = this;
        $(".remove-option").hide();
        if ($(fileData).val() != "") {
            let coverImage = fileData.files[0];
            let attachment = ActionHelper.attachmentUpload(coverImage, coverImage["type"]);
            let attachmentRequest = ActionHelper.requestAttachmentUploadDraft(attachment);
            let imgIndex = $(this).attr("id");
            let optionClass = Constants.getUniqueId();
            let input = this;
            let reader = new FileReader();
            reader.onload = function(event) {
                let questionId = $(input).parents("div.question-container").data("id");
                UxUtils.setHtml($(input).parents("div.row").find(".option-preview") , UxUtils.createImageLightBox(event.target.result,questionId, 0 , `option-preview-image ${optionClass}`));
                Utils.getClassFromDimension(event.target.result,`.${optionClass}`);
            };
            reader.readAsDataURL(input.files[0]);
            ActionHelper.executeApi(attachmentRequest)
                .then(function(response) {
                    let attachmentData = {
                        "name": "option-banner-" + imgIndex,
                        type: "Image",
                        id: response.attachmentId
                    };
                    let selector = $(this).parents(".row");
                    if ($(selector).find("textarea#option-attachment-set").length > 0) {
                        $(selector).find("textarea#option-attachment-set").val(JSON.stringify(attachmentData));
                    } else {
                        UxUtils.setAfter(fileData , UxUtils.createTextArea("", "d-none", "option-attachment-set", JSON.stringify(attachmentData)));
                    }
                    buttonCounter--;
                    if(buttonCounter == 0) {
                        $("#question-done").removeClass("disabled");
                        $("#question-done").find(Constants.getDisabledLoaderClass()).remove();
                    }
                })
                .catch(function(error) {
                    console.log("GetContext - Error4: " + JSON.stringify(error));
                });
        }
    } else {
        $(this).parents("div.option-div").find(".option-preview-image").attr("src", "");
        $(this).parents("div.option-div").find(".option-preview").hide();
        UxUtils.setPrepend($(this).parents("div.option-div") , UxUtils.getMaxImageAlert(invalidFileFormatKey));
        $(this).parents("div.option-div").find("#question-attachment-id").remove();
        $(this).parents("div.option-div").find("#question-attachment-set").remove();
    }
});

/**
 * @event Keydown event for correct answer inputs
 */
KeyboardUtils.keydownClick(document, ".check-me-title , .clear-key");

/**
 * @event Click event for correct answer inputs
 */
$(document).on({
    click: function(e) {
        e.preventDefault();
        if ($(this).parents("div.col-12").find(`input[type="checkbox"]`).prop("checked") == false) {
            $(this).parents("div.col-12").find(`input[type="checkbox"]`).prop("checked", true);
            $(this).addClass("checked-112");
        } else {
            $(this).parents("div.col-12").find(`input[type="checkbox"]`).prop("checked", false);
            $(this).removeClass("checked-112");
        }
        return false;
    }
}, ".check-me-title");

/**
 * @event Keydown event for remove options
 */
KeyboardUtils.removeOptionKeydownClick(document, ".remove-option-href");

/**
 * @event Keydown and Click for remove the Question from the section-2
 */
KeyboardUtils.keydownClick(document, ".remove-question");

/**
 * @event Click for remove the Question from the section-2
 */
$(document).on({
    click: function() {
        $(this).parents(".question-container").find(".confirm-box").remove();
        $(this).parents(".question-container").find(".question-required-err").remove();
        let dataId = $(this).parents(".question-container").attr("id");
        if ($("div.question-container:visible").length > 1) {
            UxUtils.setAfter($(this).parents(".question-container").find(".form-group-opt") , UxUtils.getDeleteQuestionConfirmBox(dataId, okKey, closeKey, confirmDeleteMsgKey));
            $([document.documentElement, document.body]).animate({
                scrollTop: $(this).parents(".question-container").find(".confirm-box").offset().top - 200
            }, 1000);

            $(this).parents(".question-container").find(".confirm-box #delete-question").focus();

            $(document).on("click", "#delete-question", function() {
                $(this).parents("div.question-container").remove();
                let questionCounter;
                $("div.question-container:visible").each(function(index, elem) {
                    questionCounter = index + 1;
                    $(elem).find("span.question-number").text(questionKey+" # " + questionCounter);
                    $(elem).find(`input[name="question_image"]`).attr({
                        id: "question-image-" + questionCounter
                    });
                    $(elem).attr({
                        id: "question" + questionCounter
                    });
                });
            });
        } else {
            UxUtils.setAfter($(this).parents("div.question-container").find("div.d-flex-ques") , UxUtils.createLabelWithFontBox(atleastOneErrorKey, "text-danger d-block question-required-err" , "mb--16 mt--16 d-block" ,""));
        }
    }
}, ".remove-question");

/**
 * @event Keydown to add the Option under question
 */
KeyboardUtils.keydownClick(document, ".add-options");

/**
 * @event Click to add the Option under question
 */
$(document).on({
    click: function(e) {
        e.preventDefault();
        $(this).parents(".question-container").find(".max-option-err-box").hide();
        if ($(this).parents("div#options").find(`div.option-div input[type="text"][id^=option]`).length >= 10) {
            $(this).parents(".question-container").find(".add-options").hide();
            Localizer.getString("maximumTenOptions").then(function(result) {
                $(".max-option-err-box").text(result);
                $(this).parents(".question-container").find(".max-option-err-box").show();
            });
            $(this).parents(".question-container").find(".max-option-err-box").show();
            return false;
        }
        UxUtils.setAfter($(this).parents(".container").find("div.option-div:last") , opt.clone());

        let selector = $(this).parents("div.container");
        let counter = 0;
        $(selector)
            .find(`div.option-div div.input-group input[type="text"]`)
            .each(function(index, elem) {
                counter = index + 1;
                Localizer.getString("enterTheChoice").then(function(result) {
                    enterTheChoiceKey = result;
                    $(elem).attr({ placeholder: result });
                });

                $(elem).attr({
                    id: "option" + counter
                });
                $(elem)
                    .parents(".option-div")
                    .find(`input[type="file"]`)
                    .attr({
                        id: "option-image-" + counter
                    });
                $(elem)
                    .parents(".option-div")
                    .find("input.form-check-input")
                    .attr({
                        id: "check" + counter
                    });
            });
        $(".check-me").text(checkMeKey);
        $(".check-me-title").attr({
            "title": checkMeKey
        });
        $(this).parents(".container").find("div.option-div:last").find("input#option" + counter).focus();
        return false;
    }
}, ".add-options");

/***********************************  Other Actions Ends ****************/

/***********************************  Settings **************************/

/**
 * @event when change on setting inputs
 */
$(document).on("change", `input[name="expiry_date"], input[name="expiry_time"], .visible-to, #show-correct-answer`, function() {
    $(".invalid-date-err").remove();
    let getExpiryDate = $(`input[name="expiry_date"]`).datepicker("getDate");
    let getExpiryDateData = getExpiryDate.toString().split(" ");
    getExpiryDateData[4] = $(`input[name="expiry_time"]`).val() + ":00";
    let end = new Date(getExpiryDateData.join(" "));
    $(".text-danger").parent("div.col-12").remove();
    $("#back").removeClass("disabled");

    let start = new Date();
    let days = Utils.calcDateDiff(start, end, weekKey, hoursKey, hourKey, minutesKey, minuteKey, daysKey);
    $(this).parents("div.row").find(".error-msg").remove();
    if (days == undefined) {
        let $errSec = $(UxUtils.createParagraphBox("", "text-danger error-msg"));
        Localizer.getString("alert_invalid_date_time").then(function(result) {
            UxUtils.setAppend($errSec , result);
        });
        UxUtils.setPrepend("small.invalid-date-error" , $errSec);
        $("#back-setting").parents("a.cursur-pointer").addClass("disabled");
        $("#back").addClass("disabled");
        $("#back").find("span[tabindex=0]").addClass("disabled");
    } else {
        $("#back").removeClass("disabled");
        $("#back").find("span[tabindex=0]").removeClass("disabled");
        $("#back-setting").parents("a.cursur-pointer").removeClass("disabled");
        let correctAnswer = $("#show-correct-answer:eq(0)").is(":checked") == true ? correctAnswerKey : "";
        Localizer.getString("dueIn", days, correctAnswer).then(function(result) {
            settingText = result;
            $("span#due").text(settingText);
        });
    }
});

/********************************  Settings Ends ***********************/

/***********************************  Methods ***************************/

/**
 * Method to get base64 data of file
 * @param input object html file type input element
 * @param elem object html elem where preview need to show
 */
function readURL(input, elem) {
    let fileTypes = ["jpg", "jpeg", "png", "gif", "webp", "jfif"];
    let isSuccess = false;
    $(elem).removeClass("heightfit");
    $(elem).removeClass("widthfit");
    $(elem).removeClass("smallfit");
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        let extension = input.files[0].name.split(".").pop().toLowerCase();
        isSuccess = fileTypes.indexOf(extension) > -1;
        if (isSuccess) {
            reader.onload = function(e) {
                let image = new Image();
                image.src = e.target.result;

                image.onload = function() {
                    let imgWidth = this.width;
                    let imgHeight = this.height;
                    let divWidth = $(elem).width();
                    let divHeight = $(elem).height();
                    $(elem).attr("src", this.src);
                    let classSelector = "";
                    if (imgHeight > divHeight) {
                        /* height is greater than width */
                        classSelector = "heightfit";
                    } else if (imgWidth > divWidth) {
                        /* width is greater than height */
                        classSelector = "widthfit";
                    } else {
                        /* small image */
                        classSelector = "smallfit";
                    }
                    $(elem).addClass(classSelector);
                    let tid = setInterval(() => {
                        if ($(elem).hasClass(classSelector)) {
                            $(".loader-cover").hide();
                            clearInterval(tid);
                        }
                    }, Constants.setIntervalTimeHundred());
                };
            };
        } else {
            return false;
        }
        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
    return true;
}

/***********************************  Methods Ends ***************************/

/*  HTML Sections  */

/**
 * Variable contains training section
 */
let trainingSectionView = UxUtils.getTrainingContentArea(backKey, submitKey, addContentKey);

/**
 * Variable contains question section
 */
let questionsSection = UxUtils.getQuestionArea(questionKey, questionTitleKey, checkMeKey , enterTheChoiceKey , addMoreOptionsKey);

/**
 * Variable contains add button section
 */
let addQuestionButton = UxUtils.getAddQuestionButton(addQuestionsKey);

/**
 * Variable contains question footer
 */
let questionFooter = UxUtils.getQuestionAreaFooter(doneKey);

/**
 * Variable contains option section
 */
let optionSection = UxUtils.getOptionArea(checkMeKey);

/**
 * Variable contains text section
 */
let addTextSection = UxUtils.getTextContentArea(addTitlePlaceholderKey);

/**
 * Variable contains text footer section
 */
let addTextFooter = UxUtils.getTextContentFooter();

/**
 * Variable contains photo section
 */
let addPhotoSection = UxUtils.getImageContentArea(addTitlePlaceholderKey, addDescriptionPlaceholderKey, uploadImageLabelKey);

/**
 * Variable contains photo footer section
 */
let addPhotoFooter = UxUtils.getImageContentFooter();

/**
 * Variable contains video section
 */
let addVideoSection = UxUtils.getVideoContentArea(addTitlePlaceholderKey, addDescriptionPlaceholderKey, uploadVideoLabelKey);

/**
 * Variable contains video footer section
 */
let addVideoFooter = UxUtils.getVideoContentFooter();

/**
 * Variable contains document section
 */
let addDocumentSection = UxUtils.getDocumentContentArea(addTitlePlaceholderKey, addDescriptionPlaceholderKey, uploadFileLabelKey);

/**
 * Variable contains document footer section
 */
let addDocumentFooter = UxUtils.getDocumentContentFooter();

/**
 * Variable contains setting section
 */
let settingSection = UxUtils.getSettingContentArea(dueByKey, resultVisibleToKey, everyoneKey, onlyMeKey, showCorrectAnswerKey, answerCannotChangeKey, allowMultipleAttemptKey, assigneeTakeMultipleTraining);

/**
 * Variable contains Loader
 */
let loader = UxUtils.getLoaderContentArea();
/***********************************  HTML Section Ends***************************/