/*
 * This file is part of Report Portal.
 *
 * Report Portal is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Report Portal is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Report Portal.  If not, see <http://www.gnu.org/licenses/>.
 */
define(function (require, exports, module) {
    'use strict';

    var Util = require('util');
    var $ = require('jquery');
    var Backbone = require('backbone');
    var Epoxy = require('backbone-epoxy');
    var App = require('app');
    var ModalEditDashboard = require('modals/modalEditDashboard');
    var Localization = require('localization');

    var config = App.getInstance();

    var DashboardListItemView = Epoxy.View.extend({
        className: 'dashboard-list-item-view',
        template: 'tpl-dashboard-list-item',

        events: {
            'click [data-js-edit]': 'onClickEdit',
        },

        bindings: {
            '[data-js-name]': 'text: name',
            '[data-js-share-icon]': 'classes: {hide: not(isMy)}, attr: {title: sharedTitle}',
            '[data-js-global-icon]': 'classes: {hide: isMy}, attr: {title: sharedTitle}',
            '[data-js-icon-description]': 'text: sharedTitle',
            '[data-js-shared-container]': 'classes: {hide: not(isShared)}',
            '[data-js-edit]': 'classes: {hide: not(isMy)}',
            '[data-js-remove]': 'classes: {hide: not(isMy)}',
        },

        initialize: function(options) {
            this.render();
        },
        render: function() {
            this.$el.html(Util.templates(this.template, {}));
        },
        onClickEdit: function() {
            var self = this;
            (new ModalEditDashboard({
                dashboardCollection: this.model.collection,
                dashboardModel: this.model,
                mode: 'edit',
            })).show().done(function(newModel) {
                self.model.set(newModel.toJSON());
            })
        },

        destroy: function () {
            this.undelegateEvents();
            this.stopListening();
            this.unbind();
            delete this;
        },
    });


    return DashboardListItemView;
});
