const _ = require('lodash');

const template = {
    form: function (options, form) {
        let html = `<div>`;
        html += `<form action="${options.action}" method="${options.method}" id="${options.id}">`;
        // html += `<input type="hidden" value="1.0" name="jsonform">`;
        for (let i = 0; i < form.length; i++) {
            let required = form[i].required ? " required" : "";
            let disabled = form[i].disabled ? " disabled" : "";
            switch (form[i].type) {
                case 'text':
                    html += `<div class="form-group row">
                        <label class="col-12 col-sm-3 col-form-label text-sm-right mt-1" for="${form[i].id}">${form[i].label}</label>
                        <div class="col-12 col-sm-8 col-lg-6">
                            <input class="form-control" name="${form[i].id}" id="${form[i].id}" type="text" value="${form[i].value}"${required}${disabled}>
                        </div>
                    </div>`;
                    break;
                case 'number':
                    html += `<div class="form-group row">
                                <label class="col-12 col-sm-3 col-form-label text-sm-right mt-1" for="${form[i].id}">${form[i].label}</label>
                                <div class="col-12 col-sm-8 col-lg-6">
                                    <input class="form-control" name="${form[i].id}" id="${form[i].id}" type="number" value="${form[i].value}"${required}${disabled}>
                                </div>
                            </div>`;
                    break;
                case 'file':
                    let inputMultiple = form[i].upload.limit > 1 ? ' multiple' : '';
                    html += `<div class="form-group row">
                        <label class="col-12 col-sm-3 col-form-label text-sm-right mt-1" for="${form[i].id}">${form[i].label}</label>
                        <div class="col-12 col-sm-8 col-lg-6">
                            <div class="input-group">
                                <div class="custom-file">
                                    <input class="custom-file-input" data-upload="button" data-upload-limit="${form[i].upload.limit}" data-upload-url="${form[i].upload.url}" id="${form[i].id}" name="${form[i].id}" accept="${form[i].accept}" type="file"${inputMultiple}${required}>
                                    <label class="custom-file-label text-truncate" for="${form[i].id}">${form[i].label}</label>
                                </div>
                            </div>
                            <div class="input-group upload-result mt-3"></div>
                        </div>
                    </div>`;
                    break;
                case 'select':
                    let selectClass = form[i].multiple ? ' selectize' : '';
                    let selectMultiple = form[i].multiple ? ' multiple' : '';
                    let vals = {};
                    let selectOptions = {};
                    let selectOption = '';
                    let formOption = _.cloneDeep(form[i].option);
                    formOption.forEach(function (item) {
                        selectOptions[item.value] = item;
                    });
                    if (form[i].value) {
                        if (Array.isArray(form[i].value)) {
                            form[i].value.forEach(function (item) {
                                if (selectOptions[item]) {
                                    selectOptions[item].selected = true;
                                } else {
                                    vals[item] = { value: item, name: item, selected: true };
                                }
                            });
                        } else {
                            if (selectOptions[form[i].value]) {
                                selectOptions[form[i].value].selected = true;
                            } else {
                                vals[form[i].value] = { value: form[i].value, name: form[i].value, selected: true };
                            }
                        }
                    }
                    _.merge(selectOptions, vals);
                    for (const key in selectOptions) {
                        let optionSelected = selectOptions[key].selected ? ' selected' : '';
                        selectOption += `<option value="${selectOptions[key].value}"${optionSelected}>${selectOptions[key].name}</option>`;
                    }
                    html += `<div class="form-group row">
                        <label class="col-12 col-sm-3 col-form-label text-sm-right mt-1" for="${form[i].id}">${form[i].label}</label>
                        <div class="col-12 col-sm-8 col-lg-6">
                            <select class="form-control${selectClass}"${selectMultiple} name="${form[i].id}" id="${form[i].id}">${selectOption}</select>
                        </div>
                    </div>`;
                    break;
                case 'check':
                    let checked = form[i].checked ? ' checked' : '';
                    html += `<div class="form-group row">
                        <label class="col-12 col-sm-3 col-form-label text-sm-right" for="${form[i].id}">${form[i].label}</label>
                        <div class="col-12 col-sm-8 col-lg-6 pt-1">
                            <div class="switch-button switch-button-yesno">
                                <input type="checkbox" name="${form[i].id}" id="${form[i].id}"${checked}${disabled}><span><label for="${form[i].id}"></label></span>
                            </div>
                        </div>
                    </div>`;
                    break;
                case 'datetime':
                    html += `<div class="form-group row">
                                <label class="col-12 col-sm-3 col-form-label text-sm-right mt-1" for="${form[i].id}">${form[i].label}</label>
                                <div class="col-12 col-sm-8 col-lg-6">
                                    <input class="form-control datetimepicker" data-date-format="${form[i].format}" type="text" name="${form[i].id}" id="${form[i].id}" value="${form[i].value}"${required}${disabled}>
                                </div>
                            </div>`;
                    break;
                case 'html':
                    html += `<div class="form-group row">
                                <label class="col-12 col-sm-3 col-form-label text-sm-right" for="${form[i].id}">${form[i].label}</label>
                                <div class="col-12 col-sm-8 col-lg-6">
                                    ${form[i].html}
                                </div>
                            </div>`;
                    break;
                case 'hidden':
                    html += `<input type="hidden" name="${form[i].id}" id="${form[i].id}" value="${form[i].value}">`;
                    break;
                case 'submit':
                    html += `<div class="form-group row text-right">
                        <div class="col col-sm-10 col-lg-9 offset-sm-1 offset-lg-0">
                            <button type="submit" class="btn btn-space btn-primary btn-lg" type="submit">
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="display: none"></span>
                            ${form[i].submit}
                            </button>
                            <button type="button" class="btn btn-space btn-secondary btn-lg">${form[i].cancel}</button>
                        </div>
                    </div>`;
                    break;
                default:
                    break;
            }
        }
        html += `</form>`;
        html += `</div>`;
        html += `<div class="modal fade" id="${options.id}-success" tabindex="-1" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button class="close modal-close" type="button" data-dismiss="modal" aria-hidden="true"><span class="mdi mdi-close"></span></button>
                            </div>
                            <div class="modal-body">
                                <div class="text-center">
                                    <div class="text-success"><span class="modal-main-icon mdi mdi-check"></span></div>
                                    <h3>${options.success}</h3>
                                    <div class="mt-8">
                                        <button class="btn btn-secondary btn-space modal-close" type="button" onclick="location='${options.cancel_url}'">${options.cancel}</button>
                                        <button class="btn btn-success btn-space modal-close" type="button" onclick="location=location">${options.proceed}</button>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer"></div>
                        </div>
                    </div>
                </div>`;
        html += `<div class="modal fade" id="${options.id}-danger" tabindex="-1" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button class="close modal-close" type="button" data-dismiss="modal" aria-hidden="true"><span class="mdi mdi-close"></span></button>
                            </div>
                            <div class="modal-body">
                                <div class="text-center">
                                    <div class="text-danger"><span class="modal-main-icon mdi mdi-close-circle-o"></span></div>
                                    <h3>${options.fail}</h3>
                                    <div class="mt-8">
                                    <button class="btn btn-secondary btn-space modal-close" type="button" onclick="location='${options.cancel_url}'">${options.cancel}</button>
                                    <button class="btn btn-success btn-space modal-close" type="button" data-dismiss="modal">${options.proceed}</button>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer"></div>
                        </div>
                    </div>
                </div>`;
        return html;
    }
};

module.exports = template;
