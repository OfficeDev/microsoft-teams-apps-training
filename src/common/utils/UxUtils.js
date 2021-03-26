// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
    Constants
} from "./Constants";

export class UxUtils {

    /**
     * @Method to get Landing Section content
     * @param uploadCoverImageKey string contains cover image label key
     * @param trainingTitleKey string contains cover title label key
     * @param trainingDescriptionOptionalKey string contains description label key
     * @param coverImageKey string contains cover image label key
     * @param clearKey string contains cover clear button label key
     * @param settingText string contains setting button label
     * @param nextKey string contains button label
     */
    static getLandingContainer(uploadCoverImageKey, trainingTitleKey, trainingDescriptionOptionalKey, coverImageKey, clearKey, settingText, nextKey) {
        return `<div class="section-1" style="display:none">
            <div class="container">
                <div id="root" class="">
                    <div class="form-group mb--16">
                        <input type="Text" placeholder="${trainingTitleKey}" class="in-t input-title form-control training-title-key" id="training-title" />
                    </div>
                    <div class="form-group mb--16">
                        <textarea placeholder="${trainingDescriptionOptionalKey}" class="font-12 in-t form-control training-description-optional-key" maxlength="${Constants.getInputMaxLength()}" id="training-description"></textarea>
                    </div>
                    <div class="form-group mb0">
                        <label class="pull-left cover-image-label font-12 semi-bold mb--8 app-black-color ">${coverImageKey}</label>
                        <label class="quiz-clear font-12 semi-bold mb--8 cursor-pointer pull-right theme-color training-clear clear-key" style="display:none" tabindex="0" role="input">${clearKey}</label>
                        <div class="clearfix"></div>
                        <div class="relative" tabindex="0" role="image">
                            ${Constants.getLoaderCover("cover-image-loader")}
                            <!-- hide this div after img added -->
                            <div class="photo-box card card-bg card-border max-min-220 upvj cursor-pointer" >
                                <span class="tap-upload-label upload-cover-image-key">${uploadCoverImageKey}</span>
                            </div>
                            <!-- show this div after img added -->
                            <div class="training-updated-img quiz-updated-img max-min-220 card-bg card-border updated-img bdr-none bg-none fixed-ar fixed-ar-16-9 relative text-center" style="display:none">
                                <img src="" id="training-img-preview" class=" training-updated-img quiz-updated-img card-bg card-border heightfit" >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer section-1-footer"  style="display:none">
            <div class="footer-padd bt">
                <div class="container ">
                    <div class="row">
                        <div class="col-9 d-table">
                            <div class="d-table-cell">
                                <a class="theme-color cursor-pointer show-setting" id="hide1">
                                    <span class="cursor-pointer" tabindex="0" role="button" data-id="hide1">
                                        ${Constants.getCogIcon()}
                                        <span id="due"> ${settingText}</span>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div class="col-3 text-right"><button type="button" class="btn btn-primary btn-sm pull-right next-key" id="next1" tabindex="0" role="button" data-id="next1"> ${nextKey}</button></div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method to get training content area
     * @param backKey string contains back label key
     * @param submitKey string contains submit button label key
     * @param addContentKey string contains add content button label key
     */
    static getTrainingContentArea(backKey, submitKey, addContentKey) {
        return `<div class="section-2" style="display:none">
            <div class="container">
                <div id="root" class="">
                    <div class="training-card-section">
                        <div class="quiz-updated-img max-min-220 bdr-none bg-none cover-img mb--16 text-center" style="display:none;">
                            <img src="" id="training-title-image" style="" class="quiz-updated-img card-bg card-border" style="display:none;">
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <h4 class="mb--8 text-break" id="training-title-content"></h4>
                                <p class="text-justify font-12 text-break mb--16" id="training-description-content"></p>
                            </div>
                        </div>
                        <input type="file" name="quiz_image" class="in-t form-control d-none" id="cover-image" accept="image/*" src="images/px-img.png">
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-12 content-menu">
                        <div class="dropdown">
                            <button type="button" class="btn btn-primary btn-sm dropdown-toggle dd-btn" id="add-content" data-toggle="dropdown"  tabindex="0" role="button" data-id="add-content">
                                <span class="span1 add-content-label">
                                    ${addContentKey}
                                </span>
                                <span class="span2">
                                    ${Constants.getDownCaratIcon()}
                                </span>
                            </button>
                            <div class="dropdown-menu">
                                <a class="cursur-pointer" tabindex="0" role="button" data-id="add-text" id="add-text">${Constants.getTextIcon()} <span class="text-label">Text</span></a>
                                <a class="cursur-pointer" tabindex="0" role="button" data-id="add-photo" id="add-photo">${Constants.getImageIcon()} <span class="photo-label">Image</span></a>
                                <a class="cursur-pointer" tabindex="0" role="button" data-id="add-document" id="add-document">${Constants.getDocumentIcon()} <span class="document-label">Document</span></a>
                                <a class="cursur-pointer" tabindex="0" role="button" data-id="add-video" id="add-video">${Constants.getVideoIcon()} <span class="video-label">Video</span></a>
                                <a class="cursur-pointer" tabindex="0" role="button" data-id="add-questions" id="add-questions">${Constants.getQuestionIcon()} <span class="quiz-label">Quiz</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer section-2-footer" style="display:none">
            <div class="footer-padd bt">
                <div class="container ">
                    <div class="">
                        <div class="row">
                            <div class="col-9">
                                <div class="d-table">
                                    <a>
                                        <span tabindex="0" role="button" data-id="back" class="cursor-pointer" id="back">
                                            ${Constants.getRightCaratIcon()} <span class="back-key">${backKey}</span>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-3 text-right">
                                <button type="button" class="btn btn-primary btn-sm pull-right submit-key" id="submit" tabindex="0" role="button" data-id="submit"> ${submitKey}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method to get HTML form to add Question
     * @param questionKey sting contains question label key
     * @param questionTitleKey sting contains question title label key
     * @param checkMeKey sting contains checkbox label key
     */
    static getQuestionArea(questionKey, questionTitleKey, checkMeKey, enterTheChioceKey, addMoreOptions) {
        return `<div class="question-section">
            <div class="container question-container" id="question1">
                <div class="card-box card-border card-bg">
                    <div class="form-group-question">
                        <div>
                            <span class="question-number font-12 bold input-group-text mb--8 input-tpt pl-0 strong cursor-pointer">${UxUtils.getQuestionNumber(questionKey, 1)}</span>
                            <span class="input-group-text remove-question remove-option-q input-tpt cursor-pointer" aria-hidden="true" tabindex="0" role="button">
                                ${Constants.getTrashIcon()}
                            </span>
                        </div>
                        <div class="question-preview min-max-132 updated-img" style="display:none">
                            <img src="" class="question-preview-image" style="display:none" />
                        </div>
                        <div class="input-group mb--16 input-group-tpt-q">
                            <div class="input-group-append cursor-pointer">
                                ${Constants.getUploadQuestionImageIcon()}
                                <input type="file" name="question_image" class="d-none" accept="image/*" id="question-image-1"/>
                            </div>
                            <input type="text" class="form-control in-t pl--32" placeholder="${questionTitleKey}" aria-label="${questionTitleKey}" aria-describedby="basic-addon2" id="question-title" maxlength="5000">
                        </div>
                    </div>
                    <div class="d-flex-ques">
                        <div class="ext-flex"></div>
                        <div class="form-group-opt mb--8" id="options">
                            <div class="choice-outer">
                                <div class="option-div">
                                    <div class="row">
                                        <div class="col-12 radio-outer">
                                            <div class="option-preview min-max-132 updated-img" style="display:none">
                                                <img src="" class="option-preview-image" style="display:none" />
                                            </div>
                                            <div class="input-group input-group-tpt mb--8 ">
                                                <div class="input-group-append left cursor-pointer">
                                                    ${Constants.getUploadOptionImageIcon()}
                                                    <input type="file" name="option_image" class="d-none" accept="image/*" id="option-image-1"/>
                                                </div>
                                                <input type="text" class="form-control in-t opt-cls pl--32" placeholder="${enterTheChioceKey}" aria-label="${enterTheChioceKey}" aria-describedby="basic-addon2" id="option1" maxlength="1000" >
                                                <div class="input-group-append  input-tpt trash-ic cursor-pointer remove-option-href" tabindex="0" role="checkbox">
                                                    <span class="remove-option">
                                                        ${Constants.getTrashIcon()}
                                                    </span>
                                                </div>
                                                <div class="input-group-append check-opt check-me-title"  title="${checkMeKey}" tabindex="0" role="checkbox">
                                                    <span class="input-group-text input-tpt cursor-pointer">
                                                        ${Constants.getDefaultTickIcon()}
                                                    </span>
                                                </div>
                                                <div class="text-right text-success">
                                                    <p class="checked-status"> </p>
                                                    <input type="checkbox" class="form-check-input d-none" id="check1" value="yes">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="option-div">
                                    <div class="row">
                                        <div class="col-12 radio-outer">
                                            <div class="option-preview min-max-132 updated-img" style="display:none">
                                                <img src="" class="option-preview-image" style="display:none" />
                                            </div>
                                            <div class="input-group input-group-tpt mb--8">
                                                <div class="input-group-append left cursor-pointer">
                                                    ${Constants.getUploadOptionImageIcon()}
                                                    <input type="file" name="option_image" class="d-none" accept="image/*" id="option-image-2"/>
                                                </div>
                                                <input type="text" class="form-control in-t opt-cls pl--32" placeholder="${enterTheChioceKey}" aria-label="${enterTheChioceKey}" aria-describedby="basic-addon2" id="option2" maxlength="1000">
                                                <div class="input-group-append input-tpt trash-ic cursor-pointer" tabindex="0" role="button">
                                                    <span class="remove-option">
                                                        ${Constants.getTrashIcon()}
                                                    </span>
                                                </div>
                                                <div class="input-group-append check-opt check-me-title" title="${checkMeKey}"  tabindex="0" role="checkbox">
                                                    <span class="input-group-text input-tpt cursor-pointer">
                                                        ${Constants.getDefaultTickIcon()}
                                                    </span>
                                                </div>
                                                <div class="text-right text-success">
                                                    <p class="checked-status"> </p>
                                                    <input type="checkbox" class="form-check-input d-none" value="yes" id="check2">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span class="max-option-err-box text-danger font-12"></span>
                                <div class="">
                                    <button type="button" class="teams-link add-options">
                                        ${Constants.getPlusIcon()} ${addMoreOptions}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method to get Question button HTML
     */
    static getAddQuestionButton(addQuestionLabel) {
        return `<div class="container question_button">
            <div class="form-group">
                <button type="button" class="btn btn-primary btn-sm" id="add-questions-same-section">
                    ${Constants.getPlusIcon()} <span class="add-question-label">${addQuestionLabel}</span></button>
            </div>
            <div class="discardContent"></div>
        </div>`;
    }

    /**
     * @Method to get Question section Footer area
     */
    static getQuestionAreaFooter(doneKey) {
        return `<div class="footer question-footer" >
            <div class="footer-padd bt">
                <div class="container ">
                    <div class="row">
                        <div class="col-9 d-table">
                            <a class=" cursur-pointer" id="back-question">
                                <span tabindex="0" role="button" data-id="back-question">
                                    ${Constants.getRightCaratIcon()} <span class="back-key"></span>
                                </span>
                            </a>
                        </div>
                        <div class="col-3 text-right">
                            <button type="button" class="btn btn-primary btn-sm pull-right done-label" id="question-done"  tabindex="0" role="button" data-id="question-done"> ${doneKey}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method to get Option HTML Area
     * @param checkMeKey string contains checkbox checked key
     */
    static getOptionArea(checkMeKey) {
        return `<div style="display: none;" id="option-section">
            <div class="option-div">
                <div class="row">
                    <div class="col-12 radio-outer">
                        <div class="option-preview min-max-132 updated-img" style="display:none">
                            <img src="" class="option-preview-image" style="display:none" />
                        </div>
                        <div class="input-group input-group-tpt mb--8">
                            <div class="input-group-append left cursor-pointer">
                                ${Constants.getUploadOptionImageIcon()}
                                <input type="file" name="option_image" class="d-none" accept="image/*" id="option-image-1"/>
                            </div>
                            <input type="text" class="form-control in-t opt-cls pl--32" placeholder="Enter your choice" aria-label="Recipient's username" aria-describedby="basic-addon2" id="option-1" maxlength="1000">
                            <div class="input-group-append input-tpt trash-ic cursor-pointer remove-option-href" tabindex="0" role="button">
                                <span class="remove-option">
                                    ${Constants.getTrashIcon()}
                                </span>
                            </div>
                            <div class="input-group-append check-opt check-me-title" title="${checkMeKey}"  tabindex="0" role="checkbox">
                                <span class="input-group-text input-tpt cursor-pointer">
                                    ${Constants.getDefaultTickIcon()}
                                </span>
                            </div>
                            <div class="text-right text-success">
                                <p class="checked-status"> </p>
                                <input type="checkbox" class="form-check-input d-none" value="yes" id="check2">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method to get Text section HTML Form
     */
    static getTextContentArea(addTitlePlaceholder, addTextDescriptionPlaceholder) {
        return `<div class="text-section">
            <div class="container">
                <div id="row" class="row">
                    <div class="col-sm-12 mb--16">
                        <input type="url" class="form-control in-t semi-bold" name="text_title" id="training-text" value="" placeholder="${addTitlePlaceholder}">
                    </div>
                    <div class="col-sm-12">
                        <textarea class="font-12 in-t form-control text-label-placeholder" maxlength="${Constants.getInputMaxLength()}" rows="8" id="training-text-description" placeholder="${addTextDescriptionPlaceholder}"></textarea>
                    </div>
                    <div class="col-sm-12 discardContent"></div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method to get Text Section Edit Area
     * @param counter string contains div counter
     * @param displayName string contains div Title
     * @param description string contains div Title Description
     * @param loaderClass string contains Load more Class
     * @param loaderCss string contains Load More Css
     * @param loaderButton string contains Load More button
     */
    static getEditTextContainer(counter, displayName, description, loaderClass, loaderCss, loaderButton) {
        return `<div class="card-box card-bg card-border training-card-section section-div text-section-div" data-id="text-section-${counter}" id="section-${counter}">
            <div class="d-table mb--4 pre-none">
                <label class="font-14 semi-bold text-break"><span class="type">${displayName}</span></label>
                <label class="float-right result-status" id="status-1">
                    <button type="button" class="close remove-text" data-dismiss="alert">
                        <span class="" aria-hidden="true">
                            ${Constants.getTrashIcon()}
                        </span>
                        <span class="sr-only">Close</span>
                    </button>
                </label>
                <div class="clearfix"></div>
            </div>
            <p class="mb0 text-description-preview text-justify font-12 text-break ${loaderClass}" style="${loaderCss}">${description}</p>
            ${loaderButton}
            <textarea class="textarea-text d-none" >${displayName}</textarea>
            <textarea class="textarea-text-description d-none">${description}</textarea>
        </div>`;
    }

    /**
     * @Method to get Text Footer Area
     */
    static getTextContentFooter(doneKey) {
        return `<div class="footer text-footer" >
            <div class="footer-padd bt">
                <div class="container ">
                    <div class="row">
                        <div class="col-9 d-table">
                            <a class="cursor-pointer" id="back-text">
                                <span tabindex="0" role="button" data-id="back-text">
                                    ${Constants.getRightCaratIcon()} <span class="back-key"></span>
                                </span>
                            </a>
                        </div>
                        <div class="col-3 text-right">
                            <button type="button" class="btn btn-primary btn-sm pull-right done-label" id="text-done"  tabindex="0" role="button" data-id="text-done"> ${doneKey}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method to get Add image HTML
     * @param  addTitlePlaceholderKey sting contains title placeholder key
     * @param  addDescriptionPlaceholderKey sting contains description placeholder key
     * @param  uploadImageLabelKey sting contains Image Label key
     */
    static getImageContentArea(addTitlePlaceholderKey, addDescriptionPlaceholderKey, uploadImageLabelKey) {
        return `<div class="text-section">
            <div class="container">
                <div id="root" class="">
                    <div class="">
                        <div class="form-group mb--16">
                            <input type="url" class="form-control in-t semi-bold" name="image_text_title" id="image-training-text" value="" placeholder="${addTitlePlaceholderKey}">
                        </div>
                        <div class="form-group mb--16">
                            <span class="float-right"><a class="upvj cursor-pointer change-link theme-color mb--4 d-block font-12 semi-bold" tabindex="0" role="image" style="display:none!important">Edit</a></span>
                            <div class="clearfix"></div>
                            <div class="relative">
                                <div class="clearfix"></div>
                                ${Constants.getLoaderCover("show-image-loader")}
                                <div class="photo-box card cursor-pointer card-bg card-border max-min-220 upvj" tabindex="0" role="image">
                                    <span class="tap-upload-photo-label">${uploadImageLabelKey}</span>
                                </div>
                                <!-- show this div after img added -->
                                <div class="updated-img update-carasoul card card-bg card-border max-min-220" style="display:none">
                                </div>
                            </div>
                        </div>
                        <div class="form-group mb0">
                            <textarea class="font-12 in-t form-control desc-content-about-placeholder" maxlength="${Constants.getInputMaxLength()}" id="photo-description" placeholder="${addDescriptionPlaceholderKey}"></textarea>
                            <textarea class="d-none" id="photo-attachments" ></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 discardContent"></div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method to get Image Footer Area
     */
    static getImageContentFooter(doneKey) {
        return `<div class="footer text-footer" >
            <div class="footer-padd bt">
                <div class="container ">
                    <div class="row">
                        <div class="col-9 d-table">
                            <a>
                                <span tabindex="0" role="button" data-id="back-photo" class="cursor-pointer" id="back-photo">
                                    ${Constants.getRightCaratIcon()} <span class="back-key"></span>
                                </span>
                            </a>
                        </div>
                        <div class="col-3 text-right"> <button type="button" tabindex="0" role="button" data-id="photo-done" class="btn btn-primary btn-sm pull-right done-label" id="photo-done"> ${doneKey}</button></div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method to get Video Form Section
     */
    static getVideoContentArea(addTitlePlaceholderKey, addDescriptionPlaceholderKey, uploadVideoLabelKey) {
        return `<div class="text-section" >
            <div class="container">
                <div id="root" class="">
                    <div class="">
                        <div class="form-group mb--16">
                            <input type="url" class="form-control in-t semi-bold" name="video_text_title" id="video-training-text" value="" placeholder="${addTitlePlaceholderKey}">
                        </div>
                        <div class="form-group mb--16">
                            <span class="float-right"><a class="upvj cursor-pointer change-link theme-color edit-key font-12 semi-bold mb--4" style="display:none">Edit</a></span>
                            <div class="clearfix"></div>
                            <div class="relative">
                                ${Constants.getLoaderCover("video-loader")}
                                <div class="video-box card card-bg card-border max-min-220 upvj cursor-pointer"  tabindex="0" role="image">
                                    <span class="tap-upload-video-label">${uploadVideoLabelKey}</span>
                                </div>
                                <div class="updated-video card card-bg card-border max-min-220 upvj" style="display:none">
                                    <div class="embed-responsive embed-responsive-21by9">
                                        <video controls class="video video-section-preview">
                                        </video>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group mb0">
                            <textarea class="font-12 in-t form-control desc-content-about-placeholder" maxlength="${Constants.getInputMaxLength()}" id="video-description" placeholder="${addDescriptionPlaceholderKey}"></textarea>
                            <textarea class="d-none" id="video-attachments" ></textarea>
                        </div>
                        <div class="form-group">
                            <div class="discardContent"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method to get Video Form Section Footer Area
     */
    static getVideoContentFooter(doneKey) {
        return `<div class="footer text-footer" >
            <div class="footer-padd bt">
                <div class="container ">
                    <div class="row">
                        <div class="col-9 d-table">
                            <a>
                                <span tabindex="0" role="button" data-id="back-video" class="cursor-pointer" id="back-video">
                                    ${Constants.getRightCaratIcon()} <span class="back-key"></span>
                                </span>
                            </a>
                        </div>
                        <div class="col-3 text-right"> <button type="button" class="btn btn-primary btn-sm pull-right done-label" tabindex="0" role="button" data-id="video-done" id="video-done"> ${doneKey}</button></div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method to get Document Form Section Area
     */
    static getDocumentContentArea(addTitlePlaceholder, addDescriptionPlaceholder, uploadFileLabel) {
        return `<div class="text-section" >
            <div class="container">
                <div id="root" class="">
                    <div class="">
                        <div class="form-group mb--16">
                            <input type="url" class="form-control in-t semi-bold" name="text_doc_title" id="doc-training-text" value="" placeholder="${addTitlePlaceholder}">
                        </div>
                        <div class="form-group mb--16">
                            <span class="float-right mb--4"><a class="upvj cursor-pointer change-doc-link theme-color font-12 semi-bold" tabindex="0" role="doc" style="display:none">Edit</a></span>
                            <div class="clearfix"></div>
                            <div class="relative">
                                ${Constants.getLoaderCover("show-document-loader")}
                                <!-- hide this div afte img added -->
                                <div class="doc-box card card-bg card-border max-min-220 upvj cursor-pointer" tabindex="0" role="doc">
                                    <span class="tap-upload-files-label">${uploadFileLabel}</span>
                                </div>
                                <!-- show this div afte img added -->
                                <div class="doc-name"></div>
                            </div>
                        </div>
                        <div class="form-group mb0">
                            <textarea class="in-t form-control desc-content-about-placeholder font-12" maxlength="${Constants.getInputMaxLength()}" id="document-description" placeholder="${addDescriptionPlaceholder}"></textarea>
                            <textarea id="document-attachment" class="d-none"></textarea>
                        </div>
                        <div class="form-group">
                            <div class="discardContent"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method to get Document Form Footer Section Area
     */
    static getDocumentContentFooter(doneKey) {
        return `<div class="footer text-footer" >
            <div class="footer-padd bt">
                <div class="container ">
                    <div class="row">
                        <div class="col-9 d-table">
                            <a>
                                <span tabindex="0" role="button" data-id="back-photo" class=" cursor-pointer" id="back-photo">
                                    ${Constants.getRightCaratIcon()} <span class="back-key"></span>
                                </span>
                            </a>
                        </div>
                        <div class="col-3 text-right">
                            <button type="button" class="btn btn-primary btn-sm pull-right done-label" id="document-done"  tabindex="0" role="button" data-id="document-done"> ${doneKey}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method to get Setting Section
     * @param dueByKey string contains dueBy label key
     * @param resultVisibleToKey string contains resultVisibleTo label key
     * @param everyoneKey string contains everyone label key
     * @param onlyMeKey string contains onlyMe label key
     * @param showCorrectAnswerKey string contains showCorrectAnswer label key
     * @param answerCannotChangeKey string contains answerCannotChange label key
     * @param allowMultipleAttemptKey string contains allowMultipleAttempt label key
     * @param assigneeTakeMultipleTraining string contains assigneeTakeMultipleTraining label key
     */
    static getSettingContentArea(dueByKey, resultVisibleToKey, everyoneKey, onlyMeKey, showCorrectAnswerKey, answerCannotChangeKey, allowMultipleAttemptKey, assigneeTakeMultipleTraining) {
        return `<div style="display:none" id="setting">
            <div class="container setting-section">
                <div class="row">
                    <div class="col-sm-12">
                        <label class="mb--8"><strong class="due-by-key bold">${dueByKey}</strong></label>
                    </div>
                    <div class="clearfix"></div>
                    <div class="col-6 pr--4">
                        <div class="input-group date form_date" data-date="1979-09-16T05:25:07Z" data-date-format="M dd, yyyy" data-link-field="dtp_input1" tabindex="0" role="input">
                            <input class="form-control in-t" size="16" name="expiry_date" type="text" value="" tabindex="-1" readonly>
                        </div>
                    </div>
                    <div class="col-6 pl--4">
                        <div class="input-group date form_time" data-date="" data-date-format="hh:ii" data-link-field="dtp_input3" data-link-format="hh:ii" tabindex="0" role="input">
                            <input class="form-control in-t" name="expiry_time" size="16" type="text" value="" tabindex="-1" readonly>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="d-none">
                        <div class="col-12">
                            <label><strong class="result-visible-key">${resultVisibleToKey}</strong></label>
                        </div>
                        <div class="clearfix"></div>
                        <div class="col-1"></div>
                        <div class="col-11">
                            <div class="custom-radio-outer">
                                <label class="custom-radio">
                                    <input type="radio" name="visible_to" class="visible-to" value="Everyone" checked>
                                    <span class="radio-block"></span> <span class="everyone-key">${everyoneKey}</span>
                                </label>
                            </div>
                            <div class="custom-radio-outer">
                                <label class="custom-radio">
                                    <input type="radio" name="visible_to" class="visible-to" value="Only me"><span
                                        class="radio-block"></span> <span class="onlyme-key">${onlyMeKey}</span>
                                </label>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="col-12 mt--24">
                        <div class="input-group form-check custom-check-outer" tabindex="0" role="checkbox">
                            <label class="custom-check form-check-label">
                                <input type="checkbox" name="show_correctAnswer" id="show-correct-answer" value="Yes" tabindex="-1"/>
                                <span class="checkmark"></span>
                                <span class="show-correct-key setting-label">${showCorrectAnswerKey}</span><br>
                            </label><br>
                            <span class="answer-cannot-change-key sub-text font-12 mt--4 d-block">${answerCannotChangeKey}</span>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="col-12 mt--24">
                        <div class="input-group  form-check custom-check-outer" tabindex="0" role="checkbox">
                            <label class="custom-check form-check-label">
                                <input type="checkbox" name="allow_multiple_attempt" id="allow-multiple-attempt" value="Yes" checked="" tabindex="-1">
                                <span class="checkmark"></span>
                                <span class="allow-multiple-attempt setting-label">${allowMultipleAttemptKey}Allow Multiple attempts</span><br>
                            </label>
                            <br>
                            <span class="allow-multiple-change-key sub-text font-12 mt--4 d-block">${assigneeTakeMultipleTraining}</span>
                        </div>
                    </div><br>
                    <div class="clearfix"></div><br>
                    <div class="col-12 mt--32">
                        <small class="invalid-date-error"></small>
                    </div>
                </div>
                <div class="footer">
                    <div class="footer-padd bt">
                        <div class="container ">
                            <div class="row">
                                <div class="col-9">
                                    <div class="d-table">
                                        <a>
                                            <span tabindex="0" class="cursor-pointer" role="button" data-id="back" id="back">
                                                ${Constants.getRightCaratIcon()} <span class="back-key"></span>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                                <div class="col-3">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method to get Loader Content
     */
    static getLoaderContentArea() {
        return `<div class="loader-overlay">
                    <div class="loader-outer">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>`;
    }

    /**
     * @Method to get Discard Content
     */
    static getDiscardContentArea(areYouSureKey, cancelKey, discardKey) {
        return `<div class="d-flex-alert mt--32">
            <div class="pr--8">
                <label class="confirm-box text-danger"> ${areYouSureKey} </label>
            </div>
            <div class=" pl--8 text-right">
                <button type="button" class="btn btn-primary-outline btn-sm cancel cancel-question-delete mr--8">${cancelKey}</button>
                <button type="button" class="btn btn-primary btn-sm discard-success">${discardKey}</button>
            </div>
        </div>`;
    }

    /**
     * @Method to get Confirm Box Content
     */
    static getTextConfirmBox(dataId, okKey, closeKey, confirmDeleteMsgKey) {
        return `<div class="confirm-box mt--16">
            <div class="d-flex-alert mb--8">
                <div class="pr--8">
                    <label class="confirm-box text-danger"> ${confirmDeleteMsgKey} </label>
                </div>
                <div class=" pl--8 text-right">
                    <button class="btn btn-primary btn-sm pull-right" data-id="${dataId}" id="confirm-delete-text">${okKey}</button>
                    <button class="btn btn-primary-outline btn-sm pull-right mr--8" id="cancel-confirm">${closeKey}</button>
                </div>
        </div>`;
    }

    /**
     * @Method to get Confirm Box to Delete  Question
     */
    static getDeleteQuestionConfirmBox(dataId, okKey, closeKey, areYouSureKey) {
        return `<div class="confirm-box mt--16">
            <div class="d-flex-alert mb--8">
                <div class="pr--8">
                    <label class="confirm-box text-danger"> ${areYouSureKey} </label>
                </div>
                <div class=" pl--8 text-right">
                    <button class="btn btn-primary pull-right" data-id="${dataId}" id="delete-question">${okKey}</button>
                    <button class="btn btn-primary-outline pull-right mr--8" id="cancel-confirm">${closeKey}</button>
                </div>
        </div>`;
    }

    /**
     * @Method to get Question No. Key
     */
    static getQuestionNumber(questionKey, questionCounter) {
        return `<span class="question-key">${questionKey}</span>&nbsp;#&nbsp;${questionCounter}`;
    }

    /**
     * @Method to get Question remove error
     */
    static getAtLeastOneQuestionError(result) {
        return `<div class="alert alert-danger error-msg">${result}</div>`;
    }

    /**
     * @Method to get Text Container area
     */
    static getAddTextContainer(textData) {
        return `<div class="card-box card-bg card-border training-card-section section-div text-section-div">
            <div class="d-table mb--8 pre-none">
                <label class="font-16 semi-bold text-break"><span class="type">Text</span></label>
                <label class="float-right result-status" id="status-1">
                    <button type="button" class="close remove-text" data-dismiss="alert">
                        <span class="" aria-hidden="true">
                            ${Constants.getTrashIcon()}
                        </span>
                        <span class="sr-only">Close</span>
                    </button>
                </label>
                <div class="clearfix"></div>
            </div>
            <p class="text-break mb0 mt--8 text-description-preview text-justify font-12">${textData}</p>
            <textarea class="textarea-text d-none" ></textarea>
            <textarea class="textarea-text-description d-none"></textarea>
        </div>`;
    }

    /**
     * @Method to get Text Container Edit Area
     * @param displayName string contains title
     * @param description string contains title decsription
     */
    static getAddTextContainerEdit(displayName, description) {
        return `<div class="card-box card-bg card-border training-card-section section-div text-section-div">
            <div class="d-table mb--8 pre-none">
                <label class="font-16 semi-bold text-break"><span class="type">${displayName}</span></label>
                <label class="float-right result-status" id="status-1">
                    <button type="button" class="close remove-text" data-dismiss="alert">
                        <span class="" aria-hidden="true">
                            ${Constants.getTrashIcon()}
                        </span>
                        <span class="sr-only">Close</span>
                    </button>
                </label>
                <div class="clearfix"></div>
            </div>
            <p class="mb0 text-description-preview text-justify font-12 text-break ">${description}</p>
            <textarea class="textarea-text d-none" >${displayName}</textarea>
            <textarea class="textarea-text-description d-none">${description}</textarea>
        </div>`;
    }

    /**
     * @Method to get required alert box
     * @param requiredKey string contains required text
     */
    static getRequiredError(requiredKey) {
        return `<label class="label-alert d-block mb--4">${requiredKey}</label>`;
    }

    /**
     * @Method to get Image Section Form
     */
    static getAddImageSection(textNumber, textData) {
        return `<div class="card-box card-bg card-border training-card-section section-div photo-section-div">
            <div class="form-group">
                <div class="row">
                    <div class="col-12">
                        <div class="hover-btn">
                            <div class="d-table mb--8 pre-none">
                                <label class="font-16 semi-bold text-break"><span class="type">Image</span></label>
                                <label class="float-right result-status" id="status-1">
                                    <button type="button" class="close remove-text" data-dismiss="alert">
                                        <span aria-hidden="true" class="input-group-text remove-image-section input-tpt cursor-pointer">
                                            ${Constants.getTrashIcon()}
                                        </span>
                                        <span class="sr-only">Close</span>
                                    </button>
                                </label>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="img-thumbnail-new updated-img card card-bg card-border max-min-220">
                            <img class="d-block w-100" id="image-sec-${textNumber}">
                        </div>
                    </div>
                    <div class="col-12">
                        <p class="photo-description-preview text-justify font-12 text-break mt--16">${textData}</p>
                    </div>
                </div>
            </div>
            <textarea class="textarea-photo-title d-none" >${textData}</textarea>
            <textarea class="textarea-photo-description d-none" >${textData}</textarea>
            <textarea class="textarea-photo-attachments d-none" ></textarea>
            <input type="file" id="upload-photo" name="upload_photo[]" class="in-t form-control d-none" accept="image/*" src="images/px-img.png" multiple>
        </div>`;
    }

    /**
     * @Method to get HTML Image Edit Section
     * @param  counter string contains section Id
     * @param  imageTitle string contains image Title
     * @param  imageDescription string contains Image Description
     * @param  imageAttachments string contains Image Attachments
     */
    static getEditImageSection(counter, imageTitle, imageDescription, imageAttachments, loaderClass, loaderCss, loaderButton) {
        return `<div class="card-box card-bg card-border training-card-section section-div photo-section-div" data-id="text-section-${counter}" id="section-${counter}">
            <div class="form-group">
                <div class="row">
                    <div class="col-12">
                        <div class="hover-btn">
                            <div class="d-table mb--8 pre-none">
                                <label class="font-16 semi-bold text-break"><span class="type">${imageTitle}</span></label>
                                <label class="float-right result-status" id="status-1">
                                    <button type="button" class="close remove-text" data-dismiss="alert">
                                        <span aria-hidden="true" class="input-group-text remove-image-section input-tpt cursor-pointer">
                                            ${Constants.getTrashIcon()}
                                        </span>
                                        <span class="sr-only">Close</span>
                                    </button>
                                </label>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="edit-carasoul-here updated-img card card-bg card-border max-min-220">
                        </div>
                    </div>
                    <div class="col-12">
                        <p class="photo-description-preview text-justify font-12 text-break ${loaderClass}" style="${loaderCss}">${imageDescription}</p>
                        ${loaderButton}
                    </div>
                </div>
            </div>
            <textarea class="textarea-photo-title d-none" >${imageTitle}</textarea>
            <textarea class="textarea-photo-description d-none" >${imageDescription}</textarea>
            <textarea class="textarea-photo-attachments d-none" >${imageAttachments}</textarea>
            <input type="file" id="upload-photo" name="upload_photo[]" class="in-t form-control d-none" accept="image/*" src="images/px-img.png" multiple>
        </div>`;
    }

    /**
     * @Method to get Image carasoul view
     * @param carousalIndicator string contains carasoul Id
     * @param uniqueId string contains carasoul Id
     */
    static getCarousalSliders(carousalIndicator, uniqueId) {
        return `<div id="${uniqueId}" class='carousel slide' data-ride='carousel'>${carousalIndicator}</div>`;
    }

    static getAddVideoSection(textNumber, textData) {
        return `<div class="card-box card-bg card-border training-card-section section-div video-section-div">
            <div class="form-group">
                <div class="hover-btn">
                    <div class="d-table mb--8 pre-none">
                        <label class="font-16 semi-bold text-break"><span class="type">Video</span></label>
                        <label class="float-right result-status" id="status-1">
                            <button type="button" class="close remove-text" data-dismiss="alert">
                                <span aria-hidden="true">
                                    ${Constants.getTrashIcon()}
                                </span>
                                <span class="sr-only">Close</span>
                            </button>
                        </label>
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="row">
                    <div class="col-12">
                        <div class="embed-responsive embed-responsive-21by9">
                            <video controls class="video" id="video-sec-${textNumber}">
                            </video>
                        </div>
                    </div>
                    <div class="col-12">
                        <p class="mt--16 font-12 video-description-preview text-justify text-break">${textData}</p>
                    </div>
                </div>
            </div>
            <textarea class="textarea-video d-none">${textData}</textarea>
            <textarea class="textarea-video-description d-none">${textData}</textarea>
            <textarea class="textarea-video-attachments d-none" ></textarea>
            <input type="file" id="upload-video" accept=".mp4,.webm,.ogg,.ogv" src="images/px-img.png" class="d-none">
        </div>`;
    }

    /**
     *  @Method to get HTML Video Edit Section
     * @param  counter string contains Section Id
     * @param  videoTitle string contains Video Title
     * @param  videoDescription string contains Video Description
     * @param  videoAttachment string contains Video Attachment
     * @param  videoDownloadURL string contains VideoURL
     */
    static getEditVideoSection(counter, videoTitle, videoDescription, videoAttachment, videoDownloadURL, loaderClass, loaderCss, loaderButton) {
        return `<div class="card-box card-bg card-border training-card-section section-div video-section-div" data-id="text-section-${counter}" id="section-${counter}">
                <div class="form-group">
                    <div class="hover-btn">
                        <div class="d-table mb--8 pre-none">
                            <label class="font-16 semi-bold text-break">${videoTitle}<span class="type"></span></label>
                            <label class="float-right result-status" id="status-1">
                                <button type="button" class="close remove-text" data-dismiss="alert">
                                    <span aria-hidden="true">
                                        ${Constants.getTrashIcon()}
                                    </span>
                                    <span class="sr-only">Close</span>
                                </button>
                            </label>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="row">
                        <div class="col-12">
                            <div class="embed-responsive embed-responsive-21by9">
                                <video src="${videoDownloadURL}" controls class="video" id="video-sec-${counter}">
                                </video>
                            </div>
                        </div>
                        <div class="col-12">
                            <p class="mt--16 font-12 video-description-preview text-justify text-break ${loaderClass}" style="${loaderCss}">${videoDescription}</p>
                            ${loaderButton}
                        </div>
                    </div>
                </div>
                <textarea class="textarea-video d-none">${videoTitle}</textarea>
                <textarea class="textarea-video-description d-none">${videoDescription}</textarea>
                <textarea class="textarea-video-attachments d-none" >${videoAttachment}</textarea>
            </div>`;
    }

    /**
     * @Method to add get Attachment TextArea
     */
    static getAttachmentTextarea() {
        return `<textarea id="attachment-id" class="d-none"></textarea>`;
    }

    /**
     * @Method to get Add Download Section
     * @param {*} textNumber
     * @param {*} textData
     */
    static getAddDownloadSection(textNumber, textData) {
        return `<div class="card-box card-bg card-border training-card-section section-div document-section-div">
            <div class="form-group">
                <div class="hover-btn">
                    <div class="d-table mb--8 pre-none">
                        <label class="font-16 semi-bold text-break"><span class="type"> Document</span></label>
                        <label class="float-right result-status" id="status-1">
                            <button type="button" class="close remove-text" data-dismiss="alert">
                                <span aria-hidden="true">
                                    ${Constants.getTrashIcon()}
                                </span>
                                <span class="sr-only">Close</span>
                            </button>
                        </label>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="row">
                <div class="col-12">
                    <p class="mt--16 font-12 document-description-preview text-break text-justify">${textData}</p>
                </div>
                <div class="col-12" style="display:none;">
                    <div class="img-thumbnail">
                        <img id="image-sec-${textNumber}">
                    </div>
                </div>
            </div>
            <textarea class="textarea-document" style="display:none">${textData}</textarea>
            <textarea class="textarea-document-description" style="display:none;">${textData}</textarea>
            <textarea class="textarea-document-attachment" style="display:none;"></textarea>
            <input type="file" id="upload-document" accept=".xlsx,.xls,.doc,.docx,.ppt,.pptx,.txt,.pdf" src="images/px-img.png" style="width:100%; height: 180px; display:none">
        </div>`;
    }

    /**
     * @Method contains Document Edit Section
     * @param  counter string contains Document Section Id
     * @param  documentTitle string contains Document Title
     * @param  documentDescription string contains Document Description
     * @param  documentAtachment string contains Attachment json string
     * @param  fileTypeIcon string contains File Icon
     */
    static getEditDownloadSection(counter, documentTitle, documentDescription, documentAtachment, fileTypeIcon = "", loaderClass, loaderCss, loaderButton) {
        return `<div class="card-box card-bg card-border training-card-section section-div document-section-div" data-id="text-section-${counter}" id="section-${counter}">
            <div class="form-group">
                <div class="hover-btn">
                    <div class="d-table mb--8 pre-none">
                        <label class="font-16 semi-bold text-break">${documentTitle}<span class="type"></span></label>
                        <label class="float-right result-status" id="status-1">
                            <button type="button" class="close remove-text" data-dismiss="alert">
                                <span aria-hidden="true">
                                    ${Constants.getTrashIcon()}
                                </span>
                                <span class="sr-only">Close</span>
                            </button>
                        </label>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="row">
                <div class="col-12 doc-name">
                    <p class="mb0 doc-name">${fileTypeIcon}&nbsp;<span class="semi-bold teams-link a-link font-14">${JSON.parse(documentAtachment).name}</span></p>
                </div>
                <div class="col-12">
                    <p class="mt--16 font-12 document-description-preview text-break text-justify ${loaderClass}" style="${loaderCss}">${documentDescription}</p>
                    ${loaderButton}
                </div>
                <div class="col-12" style="display:none;">
                    <div class="img-thumbnail">
                        <img id="image-sec-${counter}">
                    </div>
                </div>
            </div>
            <textarea class="textarea-document" style="display:none">${documentTitle}</textarea>
            <textarea class="textarea-document-description" style="display:none;">${documentDescription}</textarea>
            <textarea class="textarea-document-attachment" style="display:none;">${documentAtachment}</textarea>
            <input type="file" id="upload-document" accept=".xlsx,.xls,.doc,.docx,.ppt,.pptx,.txt,.pdf" src="images/px-img.png" style="width:100%; height: 180px; display:none">
        </div>`;
    }

    /**
     * @Method to get Carasoul Images
     * @param count string contains image counter
     * @param count string contains image src
     */
    static getCarousalImages(resultLocale, count, galeryId) {
        return `<div class="carousel-item ${count == 0 ? "active" : ""}">
                <a href="${resultLocale}" data-toggle="lightbox" data-gallery="gallery${galeryId}" data-type="image" class="parent d-flex justify-content-center">
                    <img src="${resultLocale}" alt="${count + 1} slide">
                </a>
            </div>`;
    }

    /**
     *
     */
    static getCarousalLiSection(uniqueCarouselId, count) {
        return `<li data-target="#carouselExampleIndicators${uniqueCarouselId}" data-slide-to="${count}" class="${count == 0 ? "active": ""}"></li>`;
    }

    /**
     * @Method to get Carasoul Pagination
     * @param uniqueId sting contains counter Id
     */
    static getCarousalPagination(uniqueId) {
        return `<a class="carousel-control-prev" href="#carouselExampleIndicators${uniqueId}" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators${uniqueId}" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>`;
    }

    /**
     * @Method contains Container Error
     */
    static getAtLeastOneContainerError(atleastOneContentKey) {
        return `<div class="text-danger error-msg at-least-one-content-key mt--32">${atleastOneContentKey}</div>`;
    }

    /**
     * @Method contains responders initial name
     * @param responderId string contains responder Id
     * @param initials string contains initial name value
     * @param name string contains name value
     * @param date string contains date value
     */
    static getRespondersContainerData(responderId, initials, name, date) {
        return `<tr id="${responderId}" class="getresult cursor-pointer" tabindex="0" role="button">
            <td>
                <div class="d-flex">
                    <div class="avtar">
                        ${initials}
                    </div>
                    <div class="avtar-txt">${name}</div>
                </div>
            </td>
            <td  class="text-right date-txt">
                ${date}
                ${Constants.getLeftCaratIcon()}
                <p class="semi-bold pr--8">Score: 0%</p>
            </td>
        </tr>`;
    }

    /**
     * @Method Contains responder footer area
     * @param userId string contains User Id
     * @param resultLocale string contains icon value
     */
    static getSummaryViewResponderSummaryFooter(userId, resultLocale) {
        return `<div class="footer">
            <div class="footer-padd bt">
                <div class="container ">
                    <div class="row">
                        <div class="col-9 d-table">
                            <a userid-data="${userId}" id="hide2">
                                <span class="cursor-pointer back1"  tabindex="0" role="button">
                                    ${Constants.getRightCaratIcon()}
                                    <span class="back-key">
                                        ${resultLocale}
                                    </span>
                                </span>
                            </a>
                        </div>
                        <div class="col-3"></div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method contains Summary Tab Footer View
     * @param resultLocale string contains icon value
     */
    static getSummaryViewTabFooter(resultLocale) {
        return `<div class="footer">
            <div class="footer-padd bt">
                <div class="container ">
                    <div class="row"><div class="col-9 d-table">
                        <a id="hide2">
                            <span class="cursor-pointer back" tabindex="0" role="button">
                                ${Constants.getRightCaratIcon()}
                                <span class="back-key">
                                    ${resultLocale}
                                </span>
                            </span>
                        </a>
                    </div>
                        <div class="col-3"></div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method contains quiz Tile section in responder view
     * @param title string contains quiz title
     */
    static getQuizTitleResponders(title) {
        return `<h4 class="mb--8 text-break">${title}</h4>`;
    }

    /**
     * @Method contains quiz Tile section
     * @param title string contains quiz title
     */
    static getQuizTitle(title) {
        return `<label class="font-12"><h4>${title}</h4></label>`;
    }

    /**
     * @Method contains quiz description section
     * @param description string contains quiz description
     */
    static getQuizDescription(description) {
        return `<p class="mb--8 text-justify text-break font-12">${description}</p>`;
    }

    /**
     * @Method contains initals section area
     * @param nonresponderId string contains nonresponders identifiers
     * @param initials string non repsonders initials
     * @param resultLocale string contains localization result string
     */
    static getInitials(nonresponderId, initials, resultLocale) {
        return `<div class="d-flex cursor-pointer" id="${nonresponderId}">
            <div class="avtar">
                ${initials}
            </div>
            <div class="avtar-txt">${resultLocale}</div>
        </div>`;
    }

    /**
     * @Method getNonRespondersInitials contains initals section area
     * @param initials string non repsonders initials
     * @param name string contains non responders name
     */
    static getNonRespondersInitials(initials, name) {
        return `<tr>
            <td>
                <div class="d-flex">
                    <div class="avtar">
                        ${initials}
                    </div>
                    <div class="avtar-txt">${name}</div>
                </div>
            </td>
        </tr>`;
    }

    /**
     * @Method contains total people responded area in summary view
     * @param xofy string total number of responders out of total members in the group
     */
    static getTotalPeopleRespondedString(xofy) {
        return `<p class="date-color cursor-pointer mb--24">
            <span id="show-responders" class="under-line" tabindex="0" role="button">${xofy}</span>
        </p>`;
    }

    /**
     * @Method contains total people responded area in summary view at responder and nonresponders section
     * @param xofy string total number of responders out of total members in the group
     */
    static getTotalPeopleRespondedStringRespondersSection(xofy) {
        return `<div class="row">
            <div class="col-12">
                <p class="font-12 semi-bold mb--4">${xofy}</p>
            </div>
        </div>`;
    }

    /**
     * @Method contains Participation progress bar
     * @param resultLocale String contains Localization of participation string
     * @param participationPercentage Float contains participation percentage
     */
    static getParticipationProgress(resultLocale, participationPercentage) {
        return `<label class="mb--4">
                <strong>${resultLocale} </strong>
            </label>
            <div class="progress mb-2">
                <div class="progress-bar bg-primary" role="progressbar" style="width:${participationPercentage}%" aria-valuenow="${participationPercentage}" aria-valuemin="0" aria-valuemax="100">
            </div>
        </div>`;
    }

    /**
     * @Method contains quiz template image
     * @param downloadUrl String contains image url
     * @param attachments Object contains attachment data
     */
    static loadQuizTemplateImage(downloadUrl, attachments) {
        $("#quiz-img-preview, #quiz-title-image").attr("src", downloadUrl);
        $(".photo-box").hide();
        $(".quiz-updated-img").show();
        $(".quiz-updated-img").show();
        $("#quiz-title-image").show();
        $(".quiz-updated-img").show();
        $(".quiz-clear").show();
        $("#cover-image").after(this.createQuizTextarea(attachments));
    }

    /**
     * @Method contains question image section
     * @param questionSelector String selector
     * @param questionImage String selector
     * @param url String contains image url
     * @param attachmentData Object contains attachment data
     */
    static loadQuestionImage(questionSelector, questionImage, url, attachmentData) {
        $(questionSelector).find(".question-preview").show();
        $(questionSelector).find(".question-preview-image").show();
        $(questionSelector).find(".question-preview-image").attr("src", url);
        $(questionImage).after(this.createQuestionTextarea(attachmentData));
    }

    /**
     * @Method contains option image section
     * @param questionSelector String selector
     * @param optionCounter String contians option number as identifiers
     * @param url String contains image url
     * @param attachmentData Object contains attachment data
     */
    static loadOptionImage(questionSelector, optionCounter, url, attachmentData) {
        $(questionSelector).find("#option" + optionCounter).parents("div.col-12").find(".option-preview").show();
        $(questionSelector).find("#option" + optionCounter).parents("div.col-12").find(".option-preview-image").show();
        $(questionSelector).find("#option" + optionCounter).parents("div.col-12").find(".option-preview-image").attr("src", url);
        $(questionSelector).find("input[type='file']#option-image-" + optionCounter).after(`<textarea id="option-attachment-set" class="d-none">${JSON.stringify(attachmentData)}</textarea>`);
    }

    /**
     * Method to get remove Image loader from image section
     * @param selector object html on which remove image
     */
    static removeImageLoader(selector) {
        let tid = setInterval(() => {
            if ($(selector).hasClass("heightfit") || $(selector).hasClass("widthfit") || $(selector).hasClass("smallfit")) {
                $(selector).parent("div").find(".loader-cover").addClass("d-none");
                clearInterval(tid);
            }
        }, Constants.setIntervalTimeHundred());
    }

    /**
     * Method to get remove Image loader from image section
     * @param selector object html on which remove image
     */
    static removeImageLoaderCreationView(selector) {
        let tid = setInterval(() => {
            if ($(selector).hasClass("heightfit") || $(selector).hasClass("widthfit") || $(selector).hasClass("smallfit")) {
                $(".loader-cover").addClass("d-none");
                clearInterval(tid);
            }
        }, Constants.setIntervalTimeHundred());
    }

    /**
     * @Method contains responders quiz date
     * @param expiryTime string contains quiz expiry time
     * @param currentTimestamp string contains current date timestamp
     * @param dueByKey string contains Localization of due by string
     * @param expiredOnKey string contains Localization of expired on string
     * @param dueby string contains due by date
     */
    static getResponderQuizDate(expiryTime, currentTimestamp, dueByKey, expiredOnKey, dueby) {
        return `<p class="date-text mb--16 font-12">${expiryTime > currentTimestamp ? dueByKey + " " : expiredOnKey + " "} ${dueby}</p>`;
    }

    /**
     * @Method contains creator view quiz date section marked under ...
     * @param changeDueByKey string contains Localization of change quiz date
     * @param closeTrainingKey string contains Localization of close quiz
     * @param deleteTrainingKey string contains Localization of delete quiz
     */
    static creatorQuizDateManageSection(changeDueByKey, closeTrainingKey, deleteTrainingKey) {
        return `<label class="float-right font-12 bold" id="status-1"><span class="semi-bold">
                <div class="threedots dropdown">
                    <button type="button" class="btn btn-tpt btn-plain dropdown-toggle" data-toggle="dropdown" tabindex="0" role="button">
                        <svg role="presentation" focusable="false" viewBox="8 8 16 16" class=""><g class="ui-icon__filled"><circle cx="22" cy="16" r="2"></circle><circle cx="16" cy="16" r="2"></circle><circle cx="10" cy="16" r="2"></circle></g><g class="ui-icon__outline cw"><circle cx="22" cy="16" r="1.5"></circle><circle cx="16" cy="16" r="1.5"></circle><circle cx="10" cy="16" r="1.5"></circle></g></svg>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item change-due-by-event" tabindex="0" role="button">
                            ${Constants.getChangeDueDateIcon()}
                            <span class="change-due-by-key">${changeDueByKey}</span>
                        </a>
                        <a class="dropdown-item close-quiz-event" tabindex="0" role="button">
                            ${Constants.getCloseQuizDateIcon()}
                            <span class="close-quiz-key">${closeTrainingKey}</span>
                        </a>
                        <a class="dropdown-item delete-quiz-event" tabindex="0" role="button">
                            ${Constants.getDeleteQuizIcon()}
                            <span class="delete-quiz-key">${deleteTrainingKey}</span>
                        </a>
                    </div>
                </div>
            </span></label>`;
    }

    /**
     * @Method to get change date section in summary view
     * @param changeDueDateKey string Localization for change due date string
     * @param cancelKey string Localization for cancel string
     * @param changeKey string Localization for change string
     */
    static getChangeDateSection(changeDueDateKey, cancelKey, changeKey) {
        return `<div class="change-date">
            <div class="card-box card-bg card-border">
                <div class="row">
                    <div class="col-sm-12">
                        <h4 class="mb--8"><strong class="due-by-key bold change-due-date-key">${changeDueDateKey}</strong></h4>
                    </div>
                    ${this.clearFix()}
                    <div class="col-6 pr--4">
                        <div class="input-group date form_date" data-date="1979-09-16T05:25:07Z" data-date-format="M dd, yyyy" data-link-field="dtp_input1">
                            <input class="form-control in-t" size="16" name="expiry_date" type="text" value="" readonly>
                        </div>
                    </div>
                    <div class="col-6 pl--4">
                        <div class="input-group date form_time" data-date="" data-date-format="hh:ii" data-link-field="dtp_input3" data-link-format="hh:ii">
                            <input class="form-control in-t" name="expiry_time" size="16" type="text" value="" readonly>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="d-flex-alert mt--16 mb--8">
                            <div class="pl--8 text-right">
                                <button type="button" class="btn btn-primary-outline btn-sm cancel-question-delete mr--8 cancel-key">${cancelKey}</button><button type="button" class="btn btn-primary btn-sm disabled change-key" id="change-quiz-date">${changeKey}</button>
                            </div>
                        </div>
                    </div>
                    ${this.clearFix()}
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method to get close quiz section in summary view
     * @param closeTrainingKey string Localization for close quiz string
     * @param closeTrainingConfirmKey string Localization for close quiz confirmation string
     * @param cancelKey string Localization for cancel string
     * @param confirmKey string Localization for confirm string
     */
    static getCloseTrainingSection(closeTrainingKey, closeTrainingConfirmKey, cancelKey, confirmKey) {
        return `<div class="close-quiz">
            <div class="card-box card-bg card-border">
                <div class="row">
                    <div class="col-sm-12">
                        <h4 class="mb--8"><strong class="due-by-key bold close-quiz-key">${closeTrainingKey}</strong></h4>
                    </div>
                    ${this.clearFix()}
                    <div class="col-12">
                        <label class="confirm-box text-danger close-quiz-confirm-key">${closeTrainingConfirmKey}</label>
                        <div class="d-flex-alert mt--16 mb--8">
                            <div class=" pl--8 text-right">
                                <button type="button" class="btn btn-primary-outline btn-sm cancel-question-delete mr--8 cancel-key">${cancelKey}</button>
                                <button type="button" class="btn btn-primary btn-sm confirm-key" id="change-quiz-question">${confirmKey}</button>
                            </div>
                        </div>
                    </div>
                    ${this.clearFix()}
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method contains delete quiz section
     * @param deleteTrainingKey string Localization for delete quiz string
     * @param deleteTrainingConfirmKey string Localization for delete quiz confirmation string
     * @param cancelKey string Localization for cancel string
     * @param confirmKey string Localization for confirm string
     */
    static deleteTrainingSection(deleteTrainingKey, deleteTrainingConfirmKey, cancelKey, confirmKey) {
        return `<div class="delete-quiz">
            <div class="card-box card-bg card-border">
                <div class="row">
                    <div class="col-sm-12">
                        <h4 class="mb--8"><strong class="due-by-key bold delete-quiz-key">${deleteTrainingKey}</strong></h4>
                    </div>
                    ${this.clearFix()}
                    <div class="col-12">
                        <label class="confirm-box text-danger delete-quiz-confirm-key">${deleteTrainingConfirmKey} </label>
                        <div class="d-flex-alert mt--16 mb--8">
                            <div class="pl--8 text-right">
                                <button type="button" class="btn btn-primary-outline btn-sm cancel-question-delete mr--8 cancel-key">${cancelKey}</button><button type="button" class="btn btn-primary btn-sm confirm-key" id="delete-quiz">${confirmKey}</button>
                            </div>
                        </div>
                    </div>
                    ${this.clearFix()}
                </div>
            </div>
        </div>`;
    }

    /**
     * @method for break line
     */
    static breakline() {
        return `<hr class="small">`;
    }

    /**
     * @method for clear fix div
     */
    static clearFix() {
        return `<div class="clearfix"></div>`;
    }

    /**
     * @Method to get download button footer area in summary view
     * @param downloadKey string Localization for download string
     * @param downloadImageKey string Localization for download image string
     * @param downloadCSVKey string Localization for downloa csv string
     */
    static getFooterDownloadButton(downloadKey, downloadImageKey, downloadCSVKey) {
        return `<div class="footer">
            <div class="footer-padd bt">
                <div class="container">
                    <div class="row">
                        <div class="col-12 text-right">
                            <div class="dropdown btn-group">
                                <button type="button" class="btn btn-primary  dd-btn" id="downloadImage"  data-toggle="dropdown" data-bind="enable: !noResults()">
                                    <span class="span1 add-content-label" id="download-key">${downloadKey}</span>
                                </button>
                                <button type="button" class="btn btn-primary   dropdown-toggle dd-btn" data-toggle="dropdown" aria-expanded="false">
                                        <span class="span2">
                                        <svg role="presentation" fill="#fff" width="16" height="16" focusable="false" viewBox="8 5 16 16" ><path class="ui-icon__outline cw" d="M16.38 20.85l7-7a.485.485 0 0 0 0-.7.485.485 0 0 0-.7 0l-6.65 6.64-6.65-6.64a.485.485 0 0 0-.7 0 .485.485 0 0 0 0 .7l7 7c.1.1.21.15.35.15.14 0 .25-.05.35-.15z"></path><path class="ui-icon__filled" d="M16.74 21.21l7-7c.19-.19.29-.43.29-.71 0-.14-.03-.26-.08-.38-.06-.12-.13-.23-.22-.32s-.2-.17-.32-.22a.995.995 0 0 0-.38-.08c-.13 0-.26.02-.39.07a.85.85 0 0 0-.32.21l-6.29 6.3-6.29-6.3a.988.988 0 0 0-.32-.21 1.036 1.036 0 0 0-.77.01c-.12.06-.23.13-.32.22s-.17.2-.22.32c-.05.12-.08.24-.08.38 0 .28.1.52.29.71l7 7c.19.19.43.29.71.29.28 0 .52-.1.71-.29z"></path></svg>
                                    </span>
                                </button>
                                <ul class="dropdown-menu" style="top:22px">
                                    <li class="cursor-pointer" id="downloadImage">
                                    <a id="add-text" tabindex="0" role="button">
                                        <span class="text-label" id="download-image-key">${downloadImageKey}</span></a>
                                    </li>
                                    <li class="cursor-pointer" id="downloadCSV">
                                        <a id="add-photo" tabindex="0" role="button">
                                            <span class="photo-label" id="download-csv-key">${downloadCSVKey}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method to get close button footer area in summary view
     * @param closeKey string containe close button localization string
     */
    static getFooterCloseArea(closeKey) {
        return `<div class="footer">
            <div class="footer-padd bt">
                <div class="container">
                    <div class="row">
                        <div class="col-12 text-right">
                            <button type="button" class="btn btn-primary btn-sm pull-right close-key" id="closeKey"> ${closeKey}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @Method contains question number area in detail view
     * @param questionKey string localization of question string
     * @param count Integer contains question numner
     */
    static getQuestionNumberContainerResponder(questionKey, count) {
        return `<strong class="question-title semi-bold"><span  class="question-number">${questionKey} # ${count}</span></strong></label> </strong>`;
    }

    /**
     * @Method contains question number area
     * @param questionKey string localization of question string
     * @param count Integer contains question numner
     */
    static getQuestionNumberContainer(questionKey, count) {
        return `<label class="font-12">
                    <strong class="question-title semi-bold">
                        <span  class="question-number font-12 bold">${questionKey} # ${count}</span>
                    </strong>
                </label>`;
    }

    /**
     * @Method contains radio
     * @param optId string contains option id
     * @param ind string contains index number
     * @param text string contains text for radiobox
     */
    static getRadioboxSimple(optId, ind, text) {
        return `<div class="radio-section custom-radio-outer " id="${optId}" columnid="${ind}">
                    <label class="custom-radio d-block font-12 cursor-pointer ">
                        <span class="radio-block"></span>
                        <div class="pr--32 check-in-div font-12">${text}</div>
                    </label>
                </div>`;
    }

    /**
     * @Method contains radio with correct response
     * @param optId string contains option id
     * @param ind string contains index number
     * @param text string contains text for radiobox
     */
    static getCorrectRadiobox(optId, ind, text) {
        return `<div class="radio-section custom-radio-outer " id="${optId}" columnid="${ind}">
                    <label class="custom-radio d-block font-12 cursor-pointer ">
                        <span class="radio-block"></span>
                        <div class="pr--32 check-in-div font-12">${text} &nbsp;
                            <i class="success">
                                ${Constants.getTickIcon()}
                            </i>
                        </div>
                    </label>
                </div>`;
    }

    /**
     * @Method contains checbox area
     * @param optId string contains option id
     * @param ind string contains index number
     * @param text string contains text for radiobox
     */
    static getCheckboxSimple(optId, ind, text) {
        return `<div class="radio-section custom-check-outer " id="${optId}" columnid="${ind}">
                    <label class="custom-check d-block font-12 cursor-pointer ">
                        <span class="checkmark"></span>
                        <div class="pr--32 check-in-div font-12">${text}</div>
                    </label>
                </div>`;
    }

    /**
     * @Method contains checkbox with correct response
     * @param optId string contains option id
     * @param ind string contains index number
     * @param text string contains text for radiobox
     */
    static getCorrectCheckbox(optId, ind, text) {
        return `<div class="radio-section custom-check-outer " id="${optId}" columnid="${ind}">
            <label class="custom-check d-block font-12 cursor-pointer ">
                <span class="checkmark"></span>
                <div class="pr--32 check-in-div font-12">${text} &nbsp;
                    <i class="success">
                        ${Constants.getSuccessTickIcon()}
                    </i>
                </div>
            </label>
        </div>`;
    }

    /**
     * @Method contains question Image with loader
     * @param imageUrl string contains image url
     */
    static getQuestionImageWithLoader(imageUrl) {
        return `<div class="option-image-section relative cover-img min-max-132 mb--4">
                ${Constants.getLoaderCover("d-table")}
            <img src="${imageUrl} " class="question-image img-responsive"  crossorigin="anonymous">
        </div>`;
    }

    /**
     * @Method contains option Image with loader
     * @param imageUrl string contains image url
     */
    static getOptionImageWithLoader(imageUrl) {
        return `<div class="option-image-section relative cover-img min-max-132 mb--4">
            ${Constants.getLoaderCover("d-table")}
            <img src="${imageUrl}" class="opt-image img-responsive" crossorigin="anonymous">
        </div>`;
    }

    /**
     * @Method contains option Image with loader
     * @param imageUrl string contains image url
     */
    static getOptionImage(imageUrl) {
        return `<div class="option-image-section relative cover-img min-max-132 mb--4">
            <img src="${imageUrl}" class="opt-image img-responsive" crossorigin="anonymous">
        </div>`;
    }

    /**
     * @Method contains quiz image template
     * @param imageUrl string contains image url
     */
    static quizTemplateImageWithLoader(imageUrl) {
        return `<div class="bg-none bdr-none quiz-updated-img relative cover-img min-max-132 mb--8">
            ${Constants.getLoaderCover("d-table")}
            <img src="${imageUrl} " class="question-image img-responsive"  crossorigin="anonymous">
        </div>`;
    }

    /**
     * @Method contains score area in response view
     * @param resultLocale string contains localization for result string
     * @param scoreIs Float in two decimal place
     */
    static getScoreResponseView(resultLocale, scoreIs) {
        return `<label>
            <strong class="semi-bold">${resultLocale} </strong>${scoreIs}%
        </label>`;
    }

    /**
     * @Method contains correct answer area
     * @param correctKey String contains localization of correct string
     */
    static getCorrectArea(correctKey) {
        return `<span class="text-success semi-bold">${correctKey}</span>`;
    }

    /**
     * @Method contains incorrect answer area
     * @param incorrectKey String contains localization of incorrect string
     */
    static getIncorrectArea(incorrectKey) {
        return `<span class="text-danger semi-bold">${incorrectKey}</span>`;
    }

    /**
     * @Method contains quiz banner image with loader
     * @param url string contains image url
     */
    static getQuizBannerImageWithLoader(url) {
        return `<div class="quiz-updated-img relative max-min-220 card-bg card-border cover-img upvj cursor-pointer mb--16 bg-none bdr-none text-center">
            ${Constants.getLoaderCover("d-table")}
            <img src="${url}" class="image-responsive quiz-template-image" crossorigin="anonymous">
        </div>`;
    }

    /**
     * @Method for footer section  of Landing response view
     */
    static getFooterLanding(startKey) {
        return `<div class="footer section-1-footer">
                    <div class="footer-padd bt">
                        <div class="container ">
                            <div class="row">
                                <div class="col-4"> </div>
                                <div class="col-4 text-center"> </div>
                                <div class="col-4 text-right"> <button type="button" class="btn btn-primary btn-sm pull-right" id="start"> ${startKey}</button></div>
                            </div>
                        </div>
                    </div>
                </div>`;
    }

    /**
     * @Method for response view landing page
     */
    static getResponseLandingSection() {
        return `<div class="desc-box"><P class="font-16 semi-bold mt--16 mb0 text-description text-break"> GK training text </P></div>`;
    }

    /**
     * @Method for response Header view
     */
    static getResponseHeader(trainingContentKey) {
        return `<div class="container"
        ><div class="d-none quiz-updated-img max-min-220 card-bg bdr-none bg-none card-border cover-img  mb--16 updated-img relative carousel-single-img" id="response-cover-img">
            ${Constants.getLoaderCover("d-table")}
            <img src="" id="quiz-title-image" style="" class="quiz-updated-img card-bg card-border heightfit d-none" >
            <input type="file" name="quiz_image" class="d-none" id="cover-image" accept="image/*" src="images/px-img.png">
        </div>
        <div class="row">
            <div class="col-12">
                <h4 class="mb--8 text-break" id="section1-training-title"> GK Questions on India for Class 2 </h4>
                <p class ="text-justify font-12 text-break" id="section1-training-description"> Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry 's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>

            </div>
            <div class="col-12 mt--16" id="multiple-attempt">
                <div class="semi-bold font-12" id="allow-multiple-attempt"></div>
            </div>
            <div class="clearfix"></div>
                <div class="col-12">
                        <div class="card-box card-bg card-border mt--16">
                            <h4 class="font-16 bold">${trainingContentKey}</h4>
                            <div id="desc-section"></div>
                            <P class="font-16 semi-bold mt--16" id="question-msg"></P>
                        </div>
                </div>


        </div></div>`;
    }

    /**
     * @Method for response text Section view
     */
    static getResponseTextSection() {
        return `<div class="desc-box"><p class="font-16 semi-bold mt--16 mb0 text-description text-break"> GK training text </p></div>`;
    }

    /**
     * @Method for response Question Section view
     */
    static getResponseQuestionSection() {
        return `<div class="desc-box question-box-sec"><p class="font-16 semi-bold mt--16 text-description text-break"> GK training text </p></div>`;
    }

    /**
     * @Method for response text view Training Section
     */
    static getResponseTextTrainingSection() {
        return `<div class="card-box card-blank ">
                    <label class="cover-image-label font-16 semi-bold mb--8 text-break" id="text-description">Text Title</label>
                    <div class="question-sec-card-box updated-img update-carasoul card card-bg card-border max-min-220 d-none"></div>
                    <p class="text-justify font-12 text-break mt--8 text-content-section">Text Description</p>
                </div>`;
    }

    static getDiv() {
        return `<div class="question-sec-card-box updated-img update-carasoul card card-bg card-border max-min-220"></div>`;
    }

    /**
     * @Method for response text view Training Section
     */
    static getResponseTrainingSectionFooter(previousKey, nextKey) {
        return `<div class="footer section-2-footer">
                            <div class="footer-padd bt">
                                <div class="container ">
                                    <div class="row">
                                        <div class="col-5"> <button type="button" class="tpt-btn" id="back"> <svg role="presentation" focusable="false" viewBox="8 8 16 16" class="back-btn">
                                <path class="ui-icon__outline gr" d="M16.38 20.85l7-7a.485.485 0 0 0 0-.7.485.485 0 0 0-.7 0l-6.65 6.64-6.65-6.64a.485.485 0 0 0-.7 0 .485.485 0 0 0 0 .7l7 7c.1.1.21.15.35.15.14 0 .25-.05.35-.15z">
                                </path>
                                <path class="ui-icon__filled" d="M16.74 21.21l7-7c.19-.19.29-.43.29-.71 0-.14-.03-.26-.08-.38-.06-.12-.13-.23-.22-.32s-.2-.17-.32-.22a.995.995 0 0 0-.38-.08c-.13 0-.26.02-.39.07a.85.85 0 0 0-.32.21l-6.29 6.3-6.29-6.3a.988.988 0 0 0-.32-.21 1.036 1.036 0 0 0-.77.01c-.12.06-.23.13-.32.22s-.17.2-.22.32c-.05.12-.08.24-.08.38 0 .28.1.52.29.71l7 7c.19.19.43.29.71.29.28 0 .52-.1.71-.29z">
                                </path>
                            </svg>
                            <span class="prev-key">${previousKey}</span></button></div>
                                        <div class="col-2 pl-0 pr-0 text-center" id="xofy"> <span id="x">1</span> of <span id="y">4</span></div>
                                        <div class="col-5 text-right"> <button type="button" class="tpt-btn pull-right" id="next"> <span class="check-key next-btn-sec">${nextKey}</span>
                            <svg role="presentation" focusable="false" viewBox="8 8 16 16 " class="next-btn">
                                <path class="ui-icon__outline gr" d="M16.38 20.85l7-7a.485.485 0 0 0 0-.7.485.485 0 0 0-.7 0l-6.65 6.64-6.65-6.64a.485.485 0 0 0-.7 0 .485.485 0 0 0 0 .7l7 7c.1.1.21.15.35.15.14 0 .25-.05.35-.15z"></path>
                                <path class="ui-icon__filled" d="M16.74 21.21l7-7c.19-.19.29-.43.29-.71 0-.14-.03-.26-.08-.38-.06-.12-.13-.23-.22-.32s-.2-.17-.32-.22a.995.995 0 0 0-.38-.08c-.13 0-.26.02-.39.07a.85.85 0 0 0-.32.21l-6.29 6.3-6.29-6.3a.988.988 0 0 0-.32-.21 1.036 1.036 0 0 0-.77.01c-.12.06-.23.13-.32.22s-.17.2-.22.32c-.05.12-.08.24-.08.38 0 .28.1.52.29.71l7 7c.19.19.43.29.71.29.28 0 .52-.1.71-.29z"></path>
                            </svg></button></div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
    }

    /**
     * @Method for response text view Training Section
     */
    static getSummarySectionFooter(closeKey) {
        return `<div class="footer section-3-footer">
                    <div class="footer-padd bt">
                        <div class="container ">
                            <div class="row">
                            <div class="col-12 text-right"> <button type="button" class="btn btn-primary btn-sm pull-right submit-form" id="submit"> ${closeKey}</button></div>
                            </div>
                        </div>
                    </div>
                </div>`;
    }

    /**
     * @Method for response text view Training Section
     */
    static getCarouselSection() {
        return `<a class="carousel-control-prev" href="#carouselExampleIndicators asdfasdf" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators asdfasdfasdf" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>`;
    }

    /**
     * @Method contains responders response date with score
     * @param responderId string contains responder id identifier
     * @param initials string contains initals of responders
     * @param name string contains name of responders
     * @param date string contains date of response
     * @param scoreKey string contains localization of score
     * @param score Float two decimal score
     */
    static getResponderScoreWithDate(responderId, initials, name, date, scoreKey, score) {
        return `<tr id="${responderId}" class="getresult cursor-pointer" tabindex="0" rol="button">
            <td>
                <div class="d-flex ">
                    <div class="avtar">
                        ${initials}
                    </div>
                    <div class="avtar-txt">${name}</div>
                </div>
            </td>
            <td  class="text-right date-text">
                ${date}
                ${Constants.getLeftCaratIcon()}
                <p class="semi-bold pr--8">${scoreKey} ${score}%</p>
            </td>
        </tr>`;
    }

    /**
     * @Method contains responders response date with score
     * @param responderId string contains responder id identifier
     * @param initials string contains initals of responders
     * @param name string contains name of responders
     * @param date string contains date of response
     */
    static getResponderWithDate(responderId, initials, name, date) {
        return `<tr id="${responderId}" class="getresult cursor-pointer" tabindex="0" rol="button">
            <td>
                <div class="d-flex ">
                    <div class="avtar">
                        ${initials}
                    </div>
                    <div class="avtar-txt">${name}</div>
                </div>
            </td>
            <td  class="text-right date-text">
                ${date}
                ${Constants.getLeftCaratIcon()}
            </td>
        </tr>`;
    }

    /**
     * @Method contains aggregrate score area
     * @param aggregrateQuestionScore Float contains score with two decimal
     * @param correctKey string contains localization of correct string
     */
    static getAggregrateScoreContainer(aggregrateQuestionScore, correctKey) {
        return `<span class="semi-bold">${aggregrateQuestionScore}% ${correctKey}</span>`;
    }

    /**
     * @Method contains question title area
     * @param displayName string question title
     */
    static getQuestionTitleContainer(displayName) {
        return `<div class="semi-bold font-16 mb--16">${displayName}</div>`;
    }

    /**
     * @Method for radiobox if answer is incorrect and user answered it
     * @param id string identifire
     * @param text string contains checkbox text
     */
    static getRadioInnerResponderQuestionCorrect(id, text) {
        return `<div class="card-box card-bg card-border alert-danger mb--8">
                <div class="radio-section custom-radio-outer" id="${id}">
                    <label class="custom-radio d-block selected font-14">
                        <span class="radio-block selected"></span>
                        <div class="pr--32 check-in-div font-12">
                        ${text}
                        </div>
                    </label>
                </div>
            </div>`;
    }

    /**
     * @Method for radio if user answered is incorrect
     * @param id string identifier
     * @param text string contains checkbox text
     */
    static getRadioInnerResponderQuestionCorrect2(id, text) {
        return `<div class="card-box card-bg card-border mb--8">
            <div class="radio-section custom-radio-outer" id="${id}">
                <label class="custom-radio d-block selected font-14">
                    <span class="radio-block"></span>
                    <div class="pr--32 check-in-div font-12">${text} &nbsp;
                        <i class="success-with-img">
                            ${Constants.getTickIcon()}
                        </i>
                    </div>
                </label>
            </div>
        </div>`;
    }

    /**
     * @Method for radio if answer is incorrect and not responded by user
     * @param id string identifire
     * @param text string contains checkbox text
     */
    static getRadioInnerResponderQuestionNormal(id, text) {
        return `<div class="card-box card-bg card-border mb--8">
            <div class=" radio-section custom-radio-outer " id="${id}" columnid="3 ">
                <label class="custom-radio d-block font-14">
                    <span class="radio-block"></span><div class="pr--32 check-in-div font-12">${text}</div>
                </label>
            </div>
        </div>`;
    }

    /**
     * @Method for checkbox if answer is correct and responded by user
     * @param id string identifier
     * @param text string contains checkbox text
     */
    static getCheckboxForInnerResponderQuestionSuccess(id, text) {
        return `<div class="card-box card-bg card-border alert-success mb--8">
            <div class="radio-section custom-check-outer" id="${id} " columnid="3 ">
                <label class="custom-check d-block font-14">
                    <span class="checkmark selected "></span>
                    <div class="pr--32 check-in-div font-12">${text}&nbsp;
                        <i class="success-with-img">
                            ${Constants.getTickIcon()}
                        </i>
                    </div>
                </label>
            </div>
        </div>`;
    }

    /**
     * @Method for checkbox if answer is incorrect and responded by user
     * @param id string identifire
     * @param text string contains checkbox text
     */
    static getCheckboxForInnerResponderQuestionCorrect(id, text) {
        return `<div class="card-box card-bg card-border alert-danger mb--8">
            <div class="radio-section custom-check-outer" id="${id}">
                <label class="custom-check d-block selected font-14">
                    <span class="checkmark selected"></span>
                    <div class="pr--32 check-in-div font-12">
                    ${text}
                    </div>
                </label>
            </div>
        </div>`;
    }

    /**
     * @Method for checkbox if answer is incorrect and no responded by user
     * @param id string identifire
     * @param text string contains checkbox text
     */
    static getCheckboxForInnerResponderQuestionNormal(id, text) {
        return `<div class="card-box card-bg card-border mb--8 ">
            <div class=" radio-section custom-check-outer " id="${id}" columnid="3 ">
                <label class="custom-check d-block font-14">
                    <span class="checkmark"></span>
                    <div class="pr--32 check-in-div font-12">${text}</div>
                </label>
            </div>
        </div>`;
    }

    /**
     * @Method for checkbox if answer is incorrect and no responded by user
     * @param id string identifire
     * @param text string contains checkbox text
     */
    static getCheckboxForInnerResponderQuestionCorrect2(id, text) {
        return `<div class="card-box card-bg card-border mb--8">
            <div class="radio-section custom-check-outer" id="${id}">
                <label class="custom-check d-block selected font-14">
                    <span class="checkmark"></span>
                    <div class="pr--32 check-in-div font-12">${text} &nbsp;
                        <i class="success-with-img">
                            ${Constants.getTickIcon()}
                        </i>
                        </div>
                </label>
            </div>
        </div>`;
    }

    /**
     * @Method for radiobox if answer is correct and user answered it
     * @param id string identifier
     * @param text string contains checkbox text
     */
    static getRadioInnerResponderQuestionSuccess(id, text) {
        return `<div class="card-box card-bg card-border alert-success mb--8">
            <div class="radio-section custom-radio-outer" id="${id} " columnid="3 ">
                <label class="custom-radio d-block font-14">
                    <span class="radio-block selected "></span>
                    <div class="pr--32 check-in-div font-12">${text}  &nbsp;
                        <i class="success-with-img">
                            ${Constants.getTickIcon()}
                        </i>
                    </div>
                </label>
            </div>
        </div>`;
    }

    /**
     * @Method contains score container section
     * @param resultLocale string Localization for score string
     * @param scorePercentage Float value contain score with two decimal
     */
    static getScoreContainer(resultLocale, scorePercentage) {
        return `<div class="d-flex"><p class="semi-bold pr--8">${resultLocale} ${scorePercentage}%</p></div>`;
    }

    /**
     * @Method contains training content container
     * @param trainingContentKey string Localization for Training content heading
     */
    static getTrainingContentContainer(trainingContentKey) {
        return `<div class="card-box card-border card-bg mt--16">
            <h4 class="font-16 bold training-contents training-content-key">${trainingContentKey}</h4>
        </div>`;
    }

    /**
     * @Method contains Responders Initials in response view launch section
     * @param result string Localization for aggregrate result label
     * @param userId string Identifier of user
     */
    static getYouAsIntial(result, userId) {
        return `<div class="card-blank"></div>
        ${this.breakline()}
        <div class="d-flex aggregrate-section" data-attr="home" id="${userId}">
            <p class="semi-bold font-14">${result}</p>
        </div>${this.breakline()}`;
    }

    /**
     * @Method contains training template image in response view launch section
     */
    static trainingTemplateImageSection() {
        return `<div class="quiz-updated-img max-min-220 card-bg card-border cover-img upvj cursor-pointer mb--16 bg-none bdr-none">
            <img src="" class="image-responsive training-template-image">
        </div>`;
    }

    /**
     * @Method contains training template title in response view launch section
     * @Param trainingName contains training title
     */
    static trainingTitle(displayName) {
        return `<p class="mt--16 font-16 semi-bold text-break">${displayName}</p>`;
    }

    /**
     * @Method contains training content title in response view launch section
     * @Param trainingName contains training title
     */
    static contentTitle(displayName) {
        return `<p class="mt--16 font-16 semi-bold">${displayName}</p>`;
    }

    /**
     * @Method to get Options
     * @param optionsInputs string contains options input
     * @param imagePreview string contains image
     * @param optionValue string contains option value
     * @param questionOptionId string contains option id
     * @param ifCorrectCheck string contains checkbox icon
     * @param hideImage sting contain value to hide image section if image empty
     */
    static getOptionValue(optionsInputs, imagePreview, optionValue, questionOptionId, ifCorrectCheck, hideImage, optionCount) {
        return `<div class="option-div qna-option radio-outer card-box card-bg card-border mb--8">
                    <div class="radio-section custom-radio-outer" id="${questionOptionId}" columnid="${optionCount}">
                        <label class="custom-radio d-block font-14 selector-inp">
                            <div class="option-image-section cover-img min-max-132 mb--4 ${hideImage}">
                                ${imagePreview}
                            </div>
                            <span class="radio-block"></span>
                            <div class="pr--32 check-in-div">${optionValue} ${ifCorrectCheck}</div>
                        </label>
                    </div>
                    ${optionsInputs}
                </div>`;
    }

    /**
     * @Method contains question section to view
     * @param questionNo string contains Question Section Id
     * @param optionChecked string contains Checked option inputs
     * @param questionImage string contains Image
     * @param hideQuestionImage string contains Hide image value
     * @param questionText string contains quesiton text
     * @param optionText string contains options values
     * @param questionInput string contains Question Input values
     * @param questionImagearray string contains question images attachments
     * @param optionAttachments string contains option images attachments
     * @param correctInputs sting contains correct input checkbox values
     */
    static getQuestionSection(questionKey, questionNo, optionChecked, questionImage, hideQuestionImage, questionText, optionText, questionInput, questionImagearray, optionAttachments, correctInputs = "") {
        return `<div class="card-box-question card-box card-border card-bg training-card-section section-div question-section-div"  data-id="${questionNo}" id="question${questionNo}">
            ${optionChecked}
            <div id="quest-text-${questionNo}" class="d-none">${correctInputs}</div>
            <div class="d-table mb--4 pre-none">
                <label class="font-12">
                    <strong class="question-number-title bold">
                        <label class="font-12">
                            <span class="question-number">${questionKey} # </span><span class="counter">${questionNo}</span>
                        </label>
                    </strong>
                </label>
                <label class="float-right result-status" id="status-1">
                </label>
                <button type="button" class="close remove-text" data-dismiss="alert">
                    <span aria-hidden="true">
                        ${Constants.getTrashIcon()}
                    </span>
                    <span class="sr-only">Close</span>
                </button>
            </div>
            <div>
                <div class="quiz-updated-img bg-none bdr-none cover-img min-max-132 mb--4 ${hideQuestionImage}">
                    <p><span id="question_image">${questionImage}</span></p>
                </div>
                <div class="semi-bold font-16 mb--16 question-title">
                    <p><label class="text-justify"><strong class="question">${questionText}</strong></label></p>
                </div>
            </div>
            <div class="option-sec">
                ${optionText}
            </div>
            <div class="input_section">
                ${questionInput}
                <textarea class="question-image d-none">${questionImagearray}</textarea>
                ${optionAttachments}
            </div>
        </div>`;
    }

    /**
     * @Method to get error div when remove option
     * @param errorText string contains error text
     */
    static getOptionError(errorText) {
        return `<div class="mt--8 mb--8 text-danger error-msg">${errorText}</div>`;
    }

    /**
     * @Method contains correct option error section
     * @param errorText string contains error text
     */
    static checkCorrectOptionError(errorText) {
        return `<div class="clearfix"></div>
                <label class="label-alert d-block option-required-err text-left pull-left mt--8 mb--16"><font>${errorText}</font></label>
                <div class="clearfix"></div>`;
    }

    /**
     * @Method contains response view launch section
     *
     */
    static getThemeSection() {
        return `<div class="row"><div class="col-12"><div id="root"></div></div></div>`;
    }

    /**
     * @Method contains Body Card section
     *
     */
    static getBodyCardSection() {
        return `<div class="card"></div>`;
    }

    /**
     * @Method contains Body Span section
     *
     */
    static getBodySpanSection() {
        return `<div class="col-sm-12"></div>`;
    }

    /**
     * @Method contains training expired title
     * @param trainingExpired string contains training Expired text
     */
    static getTrainingExpiredTitle(trainingExpired) {
        return `<div class="form-group">${trainingExpired}</div>`;
    }

    /**
     * @Method contains Multiple attempt string section
     * @param result string contains multiple attempt section text
     */
    static getMultipleAttemptSection(result) {
        return `<div><b> ${result} </b></div`;
    }

    /**
     * @Method contains loader spinner section
     *
     */
    static getLoaderSpinner() {
        return `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`;
    }

    /**
     * @Method contains radio button section
     * @param text string contains Radio Button text
     * @param name contains Radio Button name
     * @param id string identifire
     */
    static getRadioButtonSection(text, name, id) {
        return `<div class="option-sec">
                    <div class="card-box card-bg card-border mb--8" tabindex="0" role="checkbox">
                        <div class="radio-section custom-radio-outer" id="${id}" columnId="${name}">
                            <label class="custom-radio d-block font-12 cursor-pointer selector-inp">
                                <input type="radio" name="${name}" id="${id}" tabindex="-1">
                                <span class="radio-block"></span>  <div class="pr--32 check-in-div">${text}</div>
                            </label>
                        </div>
                    </div>
                </div>`;
    }

    /**
     * @Method contains CheckBox button section
     * @param text string contains Checkbox Button text
     * @param name contains Checkbox Button name
     * @param id string identifire
     */
    static getCheckboxButtonSection(text, name, id) {
        return `<div class="option-sec" tabindex="0" role="checkbox">
        <div class="card-box card-bg card-border mb--8">
            <div class="radio-section custom-check-outer selector-inp" id="${id}" columnId="${name}">
                <label class="custom-check form-check-label d-block font-12">
                    <input type="checkbox" class="radio-block" name="${name}" id="${id}" tabindex="-1">
                        <span class="checkmark"></span> <div class="pr--32 check-in-div">${text}</div>
                </label>
            </div>
        </div>
    </div>`;
    }

    /**
     * @Method contains question card-box section
     */
    static getQuestionCardBoxSection() {
        return `<div class="card-box card-blank card-box-question"></div>`;
    }

    /**
     * @Method contains question heading section
     * @param questionNumber contains question counter
     * @param questiondisplayName contains question display name text
     */
    static getQuestionHeadingSection(questionKey, questionNumber, questiondisplayName) {
        return `<div class="d-table mb--4 pre-none">
                        <label class="font-12">
                            <strong class="question-number-title bold" id="question-number-title">
                                <label class="font-12">
                                    <span class="training-type question-number">${questionKey}</span>&nbsp;#&nbsp;
                                    <span class="">${questionNumber}</span>
                                </label>
                            </strong>
                        </label>
                        <label class="float-right result-status" id="status-1"></label>
                        <div class="clearfix"></div>
                    </div>
                    <div class="quiz-updated-img cover-img min-max-132 mb--8 bg-none bdr-none" style="display:none" id="question-image">
                    </div>
                    <div class="semi-bold font-16 mb--16 question-title"><p class="">${questiondisplayName}</p></div>`;
    }

    /**
     * @Method contains question heading section
     * @param trainingSummary string contains training summary text
     */
    static getTrainingSummaryViewSection(trainingSummary) {
        return `<div class="section-3"><div class="container"><label><strong>${trainingSummary}</strong></label></div></div>`;
    }

    /**
     * @Method contains Response View carousel section
     */

    static getResponseViewCarouselSection(uniqueCarouselId) {
        return `<div id="carouselExampleIndicators${uniqueCarouselId}" class="carousel slide" data-ride="carousel"></div>`;

    }

    /**
     * @Method contains Response View carousel ol section
     */
    static getCarouselOlSection() {
        return `<ol class="carousel-indicators"></ol>`;
    }

    /**
     * @Method contains Response View carousel Inner section
     */
    static getCarouselInnerSection() {
        return `<div class="carousel-inner"></div>`;
    }

    /**
     * @Method contains Response View Training Document section
     * @param url contains Document url
     * @param documentName string contains Document name
     */
    static getTrainingDocumentSection(url, documentName) {
        return `<p class="doc-name">${Constants.getDocumentIcon()} <a href="${url}" class="font-14 semi-bold teams-link a-link" download>${documentName}</a></p>`;
    }

    /**
     * @Method contains contains Response View Training Video section
     * @param url contains Video url
     * @param videoName string contains video name
     */
    static getTrainingVideoSection(videoName, url) {
        return `<div class="embed-responsive embed-responsive-4by3"><video controls="" playsinline class="video" id="${videoName}" src="${url}"></video></div>`;

    }

    /**
     * @Method contains contains Response View Quiz Option Images Section
     * @param videoName contains quiz option image url
     */
    static getQuizOptionImage(imgSource, galleryId, count = "0", className = "", boxId = "") {
        return `<div class="option-image-section cover-img min-max-132 mb--4" id="quiz-ans-image">
                    <a href="${imgSource}" data-toggle="lightbox" data-gallery="gallery${galleryId}" data-type="image" tabindex="-1">
                        <img class="${className}" src="${imgSource}" id="${boxId}" alt="${count + 1} slide">
                    </a>
                </div>`;

    }

    /**
     * @Method contains contains Response View Training section
     */
    static getTrainingSection() {
        return `<div class="section-2"><div class="container"></div></div>`;

    }

    /**
     * @Method contains Response View Next Button Span
     */
    static getNextBtnSpan() {
        return `<span class="next-btn-sec"></span>`;

    }

    /**
     * @Method to get Maximum image upload error
     */
    static getMaxImageAlert(errorText) {
        return `<span class="text-danger error-msg float-right"> ${errorText}</span><div class="clearfix"></div>`;
    }

    /**
     * @Method to get content limit
     * @param errorText string contains error text
     */
    static getContentLimitExceed(errorText) {
        return `<div class="mt--32 text-danger content-limit-exceed">${errorText}</div>`;
    }

    /**
     * @Method to create div with class
     * @param classData string contains html class value
     * @param icData string contains html id value
     */
    static divTemplate(classData, idData = "") {
        if (idData == "") {
            return `<div class="${classData}"></div>`;
        } else {
            return `<div class="${classData}" id="${idData}"></div>`;
        }
    }

    /**
     * @Method to create div with class
     * @param classData string contains html class value
     * @param icData string contains html id value
     */
    static labelTemplate(classData, idData = "") {
        if (idData == "") {
            return `<label class="${classData}"></label>`;
        } else {
            return `<label class="${classData}" id="${idData}"></label>`;
        }
    }

    /**
     * @Method to clear html
     * @param selector string contains html identifier selector
     */
    static clearHtml(selector) {
        return $(selector).empty();
    }

    /**
     * @Method to get responders inital with date
     * @param myUserId string Identifier contains user name
     * @param initials string contains user initals
     * @param name string name contains user name
     * @param respondeDate Date contains respond date
     */
    static getRespondersInitials(myUserId, initials, name, respondeDate) {
        return `<table class="table" cellspacing="0" id="responder-table">
            <tbody>
                <tr id="${myUserId}" class="getresult cursor-pointer">
                    <td>
                        <div class="d-flex ">
                            <div class="avtar">
                                ${initials}
                            </div>
                            <div class="avtar-txt">${name}</div>
                        </div>
                    </td>
                    <td class="text-right avtar-txt">
                        ${respondeDate}
                        ${Constants.getLeftCaratIcon()}
                    </td>
                </tr>
            </tbody>
        </table>`;
    }

    /**
     * @Method to get content title with counter
     * @param count Integer content number
     * @param resultLocale string contains localization string
     * @param displayName string name contains user name
     */
    static contentSection(count, resultLocale, displayName) {
        return `<label class="mb0"><strong><span class="counter">${count}</span>.
            <span class="training-type">${resultLocale}</span></strong>
        </label>
        <span class="float-right result"></span>
        <p class="mb0 text-description text-justify">${displayName}</p>`;
    }

    /**
     * @Method to get question title for result view
     * @param count Integer content number
     * @param displayName string name contains question title
     */
    static getQuestionTileWithCounter(count, displayName) {
        return `"<strong>${count}. ${displayName}</strong>`;
    }

    /**
     * @Method to get question identifier label
     * @param id string for unique label identification
     */
    static questionIdentifierSection(id) {
        return `<label class="float-right mb0" id="status-${id}"></label>`;
    }

    /**
     * @Method to get correc or incorrct section
     * @param answerIs string for correct or incorrect identificaiton
     * @param resultLocale string for correct and incorrect locale
     */
    static getQuestionCorrectIncorrectSection(answerIs, resultLocale) {
        return `<span class="${answerIs.toLowerCase() == "correct" ? "text-success" : "text-danger"}">${resultLocale}</span>`;
    }

    /**
     * @Method to get content title at result view
     * @param resultLocale string for content
     */
    static getContentTitleSection(resultLocale) {
        return `<P class="font-16 semi-bold mt--16 text-break" id="question-msg">${resultLocale}</P>`;
    }

    /**
     * @Method to set html block inside the html selector
     * @param selector object html
     * @param content string for content
     */
    static setHtml(selector, content) {
        $(selector).html(content);
    }

    /**
     * @Method to set text inside the html selector
     * @param selector object html
     * @param content string for content
     */
    static setText(selector, content) {
        $(selector).text(content);
    }

    /**
     * @Method to set html block after the html selector
     * @param selector object html
     * @param content string for content
     */
    static setAfter(selector, content) {
        $(selector).after(content);
    }

    /**
     * @Method to set html block before the html selector
     * @param selector object html
     * @param content string for content
     */
    static setBefore(selector, content) {
        $(selector).before(content);
    }

    /**
     * @Method to set html block append the html selector
     * @param selector object html
     * @param content string for content
     */
    static setAppend(selector, content) {
        $(selector).append(content);
    }

    /**
     * @Method to set html block prepend the html selector
     * @param selector object html
     * @param content string for content
     */
    static setPrepend(selector, content) {
        $(selector).prepend(content);
    }

    /**
     * @Method to get option section with success tickmark for correct selected option
     * @param text string for option text
     */
    static getSuccessOptionSection(text) {
        return `<div class="form-group alert alert-success">
            <p class="mb0"> ${text} ${Constants.getSuccessTickIcon()} </p>
        </div>`;
    }

    /**
     * @Method to get option section with normal tickmark for correct but not selected option
     * @param text string for option text
     */
    static getNormalCorrectOptionSection(text) {
        return `<div class="form-group alert alert-normal"><p class="mb0"> ${text} ${Constants.getSuccessTickIcon()}</p></div>`;
    }

    /**
     * @Method to get option section with danger for incorrect
     * @param text string for option text
     */
    static getDangerOptionSection(text) {
        return `<div class="alert alert-danger"><p class="mb0"> ${text} <i class="fa fa-pull-right fa-close"></i></p></div>`;
    }

    /**
     * @Method to get option section with normal block
     * @param text string for option text
     */
    static getNormalOptionSection(text) {
        return `<div class="alert alert-danger"><p class="mb0"> ${text} <i class="fa fa-pull-right fa-close"></i></p></div>`;
    }

    /**
     * Method to get remove Image loader from image section
     * @param selector object html on which remove image
     */
    static removeImageLoaderText(selector) {
        let tid = setInterval(() => {
            $(selector).parent("div").find(".loader-cover").addClass("d-none");
            clearInterval(tid);
        }, Constants.setIntervalTimeHundred());
    }

    /**
     * @Method to get Loader Area
     */
    static getLoaderArea() {
        return `<div class="loader-cover">
                    <div class="loader-outer">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>`;
    }

    /**
     * @Method contains single image carousel
     * @param imageUrl string contains image url
     */
    static getSingleImageCarousel(imgSource, galleryId, count = "0", className = "", boxId = "") {
        return `<div class="max-min-220 updated-img fixed-ar relative carousel-single-img">
            <a href="${imgSource}" data-toggle="lightbox" data-gallery="gallery${galleryId}" data-type="image">
                <img class="${className}" src="${imgSource}" id="${boxId}" alt="${count + 1} slide">
            </a></div>`;
    }

    static getImageModalPopUp(uniqueCarouselId, carasoulSliderImagesHtml) {
        return `<div class="modal fade" id="model${uniqueCarouselId}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div id="carouselExampleIndicatorModel${uniqueCarouselId}" class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                    ${carasoulSliderImagesHtml}
                                </div>
                                <a class="carousel-control-prev" href="#carouselExampleIndicatorModel${uniqueCarouselId}" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#carouselExampleIndicatorModel${uniqueCarouselId}" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    /**
     * @Method contains textarea content
     * @param name string  contains name value
     * @param className string  contains Class value
     * @param id string  contains id value
     * @param value string  contains name value
     * @param style string  contains style value
     */
    static createTextArea(name, className, id, value, style = "") {
        return `<textarea name="${name}" class="${className} ${style}" id="${id}">${value}</textarea>`;
    }

    /**
     * @Method contains Input content
     * @param inputType string  contains input type value
     * @param className string  contains Class value
     * @param id string  contains id value
     * @param value string  contains name value
     * @param isChecked string contains checked value
     */
    static createInputBox(inputType, className, id, value, isChecked = "") {
        return `<input type="${inputType}" class="${className}" id="${id}" value="${value}" ${isChecked}>`;
    }

    /**
     * @Method contains Input content
     * @param imgSource string  contains image path value
     * @param className string  contains image path value
     * @param count string  contains counter value
     */
    static createImageLightBox(imgSource, galleryId, count = "0", className = "", boxId = "") {
        return `<a href="${imgSource}" data-toggle="lightbox" data-gallery="gallery${galleryId}" data-type="image" tabindex="-1">
            <img class="${className}" src="${imgSource}" id="${boxId}" alt="${count + 1} slide">
        </a>`;
    }

    /**
     * @Method contains Input content
     * @param textValue string  contains text value
     * @param className string  contains class name value
     * @param count string  contains id value
     */
    static createParagraphBox(textValue, className = "", boxId = "") {
        return `<p class="${className}" id="${boxId}">${textValue}</p>`;
    }

    /**
     * @Method contains Input content
     * @param textValue string  contains text value
     * @param className string  contains class name value
     * @param boxId string  contains Id value
     */
    static createSpanBox(textValue, className, boxId) {
        return `<span class="${className}" id="${boxId}">${textValue}</span>`;
    }

    /**
     * @Method contains Input content
     * @param textValue string  contains text value
     * @param className string  contains class name value
     * @param boxId string  contains Id value
     */
    static createLabelBox(textValue, className, boxId) {
        return `<label class="${className}" id="${boxId}">${textValue}</label>`;
    }

    /**
     * @Method contains Input content
     * @param textValue string  contains text value
     * @param className string  contains class name value
     * @param boxId string  contains Id value
     */
    static createLabelWithFontBox(textValue, className, fontClass, boxId) {
        return `<label class="${className}" id="${boxId}"><font class="${fontClass}">${textValue}</font></label>`;
    }

    /**
     * @Method contains button content
     * @param textValue string  contains text value
     * @param className string  contains class name value
     * @param boxId string  contains Id value
     * @param attribute string  contains button attributes
     */
    static createButtonBox(textValue, className, boxId, attribute) {
        return `<button class="${className}" id="${boxId}" ${attribute}>${textValue}</button>`;
    }

    /**
     * @Method contains image content
     * @param textValue string  contains text value
     * @param className string  contains class name value
     * @param boxId string  contains Id value
     */
    static createImageBox(imgSource, className, boxId) {
        return `<img src="${imgSource}" class="${className}" id="${boxId}">`;
    }

}