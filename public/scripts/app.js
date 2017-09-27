"use strict";

console.log("App.js is running");

// JSX - JavaScript XML
// if statements 
// terantry operators 
// logical and operator
//only render the subtitle and p tag if subtitle exist - logical and operator 
// render new p tag - if options.length > 0 "Here are you options

var app = {
    title: "Indecision",
    subtitle: "High-tech support for your big decisions",
    options: []
};

var onFormSubmit = function onFormSubmit(e) {
    e.preventDefault();

    var option = e.target.elements.option.value;

    if (option) {
        app.options.push(option);
        e.target.elements.option.value = "";
        renderView();
    }
};

var removeAll = function removeAll() {
    app.options = [];
    renderView();
};

var onMakeDecision = function onMakeDecision() {
    var randomNum = Math.floor(Math.random() * app.options.length);
    var option = app.options[randomNum];
    alert(option);
};

var appRoot = document.getElementById("app");

var numbers = [55, 75, 101, 1000];

var renderView = function renderView() {
    var template = React.createElement(
        "div",
        null,
        React.createElement(
            "h1",
            null,
            " ",
            app.title,
            " "
        ),
        app.subtitle && React.createElement(
            "p",
            null,
            " ",
            app.subtitle
        ),
        React.createElement(
            "p",
            null,
            app.options && app.options.length > 0 ? "Here are your options" : "No options",
            " "
        ),
        React.createElement(
            "p",
            null,
            app.options.length
        ),
        React.createElement(
            "button",
            { disabled: app.options.length === 0, onClick: onMakeDecision },
            "What should I do?"
        ),
        React.createElement(
            "button",
            { onClick: removeAll },
            "Remove Options"
        ),
        numbers.map(function (number) {
            return React.createElement(
                "p",
                { key: number },
                " ",
                number * 2
            );
        }),
        React.createElement(
            "ol",
            null,
            app.options.map(function (option) {
                return React.createElement(
                    "li",
                    { key: option },
                    " ",
                    option,
                    " "
                );
            })
        ),
        React.createElement(
            "form",
            { onSubmit: onFormSubmit },
            React.createElement("input", { type: "text", name: "option" }),
            React.createElement(
                "button",
                null,
                "Add Option"
            )
        )
    );
    ReactDOM.render(template, appRoot);
};

renderView();
