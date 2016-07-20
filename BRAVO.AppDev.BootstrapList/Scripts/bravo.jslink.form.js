"use strict";

// **********************************************************************************
// Namespace
// **********************************************************************************
Type.registerNamespace("BRAVO");

// **********************************************************************************
// Global Variables
// **********************************************************************************
BRAVO.JSLink = BRAVO.JSLink || {};

// **********************************************************************************
// Class
// **********************************************************************************
BRAVO.JSLink.BootStrap = {
    // Initialization method
    Init: function () {
        // Register the CSR override for this class
        SPClientTemplates.TemplateManager.RegisterTemplateOverrides(BRAVO.JSLink.BootStrap);
    }
};

// **********************************************************************************
// Class Methods
// **********************************************************************************
BRAVO.JSLink.BootStrap.Methods = {
    // Render Form
    RenderForm: function (ctx) {
        var formHtml = "";

        // Hide the ribbon
        var ribbon = document.querySelector("#s4-ribbonrow");
        if (ribbon) { ribbon.style.display = "none"; }

        // Load bootstrap
        BRAVO.JSLink.addScript(_spPageContextInfo.webAbsoluteUrl + "/scripts/jquery-1.9.1.min.js");
        BRAVO.JSLink.addScript(_spPageContextInfo.webAbsoluteUrl + "/scripts/bootstrap.min.js");
        BRAVO.JSLink.addStyle(_spPageContextInfo.webAbsoluteUrl + "/content/bootstrap.min.css");

        // Define the bootstrap classes
        var cssButtons = {
            Button: "col-md-2",
            Form: "container",
            Row: "row"
        };
        var cssForm = {
            Field: "col-md-4",
            FieldDescription: "col-md-4",
            FieldLabel: "col-md-4",
            FieldRequired: "required",
            Form: "container",
            Row: "row"
        };

        // Determine the form to generate
        switch (BRAVO.Core.getQueryStringValue("Form")) {
            case "Child":
                formHtml = BRAVO.JSLink.renderForm(ctx, ["ParentID", "Title", "ChildChoice", "ChildText", "ChildNote"], cssForm);
                break;
            default:
                formHtml = BRAVO.JSLink.renderForm(ctx, ["ParentID", "Title", "BSChoice", "BSText", "BSUser", "BSNote"], cssForm);
                break;
        }

        // Generate the form
        return formHtml + BRAVO.JSLink.renderFormButtons(ctx, cssButtons);
    }
};

// **********************************************************************************
// Template Overrides
// **********************************************************************************
BRAVO.JSLink.BootStrap.Templates = {
    View: BRAVO.JSLink.BootStrap.Methods.RenderForm
};

// Write the javascript to initialize the CSR override. This will ensure it's called when MDS is enabled.
document.write("<script type='text/javascript'>(function() { BRAVO.JSLink.BootStrap.Init(); })();</script>");
