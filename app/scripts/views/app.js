/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/todo'
], function ($, _, Backbone, JST, TodoView) {
    'use strict';

    var AppView = Backbone.View.extend({
        el: '#todoapp',

        template: JST['app/scripts/templates/app.ejs'],

        events: {
            'keypress #new-todo': 'createOnEnter'
        },

        initialize: function() {
            if (!this.collection) {
                console.error('no collection passed to AppView');
            }
            this.listenTo(this.collection, 'add', this.addTodoView);
            this.listenTo(this.collection, 'all', this.updateView);
        },

        render: function() {
            this.$el.html(this.template());
            this.updateView();
            return this;
        },

        updateView: function() {
            if (this.collection.length === 0) {
                this.$('#main').hide();
            } else {
                this.$('#main').show();
            }
        },

        createOnEnter: function(e) {
            if (e.which === window.ENTER_KEY) {
                var $input = $('#new-todo');
                var val = $input.val();
                if (val.trim()) {
                    this.collection.create({title: $input.val()});
                }
                $input.val('');
            }
        },

        addTodoView: function(todo) {
            var view = new TodoView({model: todo});
            this.$('#todo-list').append(view.render().el);
        }
    });

    return AppView;
});