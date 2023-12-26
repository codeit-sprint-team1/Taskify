"use strict";
exports.__esModule = true;
function Textarea(_a) {
    var label = _a.label, required = _a.required;
    return (React.createElement("div", null,
        React.createElement("div", { className: "font-medium mb-10pxr text-18pxr text-gray70 mobile:text-16pxr " },
            React.createElement("label", null, label),
            required && React.createElement("span", { className: "text-violet" }, "*")),
        React.createElement("div", { className: "mt-2.5" },
            React.createElement("textarea", { className: "selection:block w-full rounded-md border border-solid px-16pxr py-15pxr tablet:text-16pxr mobile:text-14pxr text-gray70 placeholder:text-gray40 focus:border-violet outline-0", maxLength: 200, placeholder: "200\uC790 \uC774\uB0B4\uB85C \uC791\uC131\uD574\uC8FC\uC138\uC694." }))));
}
exports["default"] = Textarea;
