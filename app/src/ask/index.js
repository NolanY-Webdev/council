'use strict';

var rust = require('rust'),
    Link = require('react-router').Link,
    _ = require('lodash');

var questionActions = require('question/actions');

module.exports = rust.class({
  getInitialState: function() {
    return {
      prompt: '',
      choices: [
        'Yes',
        'No',
        'Maybe'
      ]
    };
  },

  onInput: function(e) {
    var val = e.target.value;
    this.setState({prompt: val});
  },

  addChoice: function() {
    var choices = this.state.choices;
    choices.push('');
    this.setState({
      choices: choices
    });
  },

  removeChoice: function(i) {
    var choices = this.state.choices;
    this.state.choices.splice(i, 1);
    this.setState({
      choices: choices
    });
  },

  editChoice: function(i, e) {
    var choices = this.state.choices;
    choices[i] = e.target.value;
    this.setState({
      choices: choices
    });
  },

  onSubmit: function(e) {
    e.preventDefault();
    console.log('value', this.state.prompt);
    console.log('choices', this.state.choices);

    if (!this.state.prompt) {
      alert('need prompt');
      return;
    } else if (this.state.choices.length < 2) {
      alert('need at least 2 choices');
      return;
    }

    questionActions.ask({
      prompt: this.state.prompt,
      choices: this.state.choices
    });
  },

  render: function() {

    var ctx = this;

    return rust.o2([
      'div',

      [Link, {
        to: '/'
      }, 'Home'],

      ['h1', 'Ask'],

      [
        'form',
        {
          onSubmit: this.onSubmit
        },

        ['input', {
          style: {
            display: 'block'
          },
          value: this.state.prompt,
          onInput: this.onInput,
          onChange: this.onInput,
          placeholder: 'Prompt'
        }],

        ['br'],
        rust.list('choices', _.map(this.state.choices, function(c, i) {
          return [
            'div',
            ['button', {
              type: 'button',
              onClick: ctx.removeChoice.bind(ctx, i)
            }, 'x'],
            ['input', {
              value: c,
              onInput: ctx.editChoice.bind(ctx, i),
              onChange: ctx.editChoice.bind(ctx, i)
            }]
          ];
        })),

        ['br'],
        ['button', {
          style: {
            display: 'block'
          },
          type: 'button',
          onClick: this.addChoice
        }, 'Add'],

        ['br'],
        ['button', {
          style: {
            display: 'block'
          },
          type: 'submit',
          onClick: this.onSubmit
        }, 'Ask']

      ]
    ]);
  }
});
