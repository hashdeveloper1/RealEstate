/**
 * Auto-save functionality for form views in Odoo 16
 */
odoo.define('app_one.autosave_form', function (require) {
    'use strict';

    var FormController = require('web.FormController');
    var session = require('web.session');

    // Overriding the FormController to include autosave
    FormController.include({
        init: function (parent, model, renderer, params) {
            this._super.apply(this, arguments);
            this._autosave_interval = null;
        },

        _onAutosave: function () {
            var self = this;
            if (this.hasChangesToSave()) {
                this.saveRecord(this.handle, {
                    stayInEdit: true,
                    reload: false
                }).then(function () {
                    console.log('Autosaved successfully!');
                }).catch(function (error) {
                    console.error('Autosave failed:', error);
                });
            }
        },

        start: function () {
            var self = this;
            this._super.apply(this, arguments);

            // Clear any existing autosave interval to prevent duplication
            if (this._autosave_interval) {
                clearInterval(this._autosave_interval);
            }

            // Set autosave to trigger every 1 second
            this._autosave_interval = setInterval(function () {
                self._onAutosave();
            }, 1000);  // Interval set to 1 second
        },

        destroy: function () {
            if (this._autosave_interval) {
                clearInterval(this._autosave_interval);
            }
            this._super.apply(this, arguments);
        },
    });
});
