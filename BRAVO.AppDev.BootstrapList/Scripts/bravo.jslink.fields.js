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
// Fields Class
// **********************************************************************************
BRAVO.JSLink.Fields = {
    // Initialization method
    Init: function () {
        // Register the CSR override for this class
        SPClientTemplates.TemplateManager.RegisterTemplateOverrides(BRAVO.JSLink.Fields);
    }
};

// **********************************************************************************
// Class Methods
// **********************************************************************************
BRAVO.JSLink.Fields.Methods = {
    // Method to set the parent id value
    DefaultParentId: function (ctx, field) {
        // Add an onload event to it
        window.addEventListener("load", function () {
            // Hide the row
            var row = document.querySelector("div[data-field-name='ParentID']");
            if (row) { row.style.display = "none"; }
        });

        // Default the value
        ctx.CurrentFieldValue = BRAVO.Core.getQueryStringValue("ParentID");
        if (ctx.CurrentFieldValue && ctx.CurrentFieldValue != "") {
            // Hide the field
            return BRAVO.JSLink.hideField(ctx, false);
        }

        // Return the default html
        return BRAVO.JSLink.getFieldDefaultHtml(ctx, field);
    },
};

// **********************************************************************************
// Template Overrides
// **********************************************************************************
BRAVO.JSLink.Fields.Templates = {
    Fields: {
        ParentID: {
            DisplayForm: BRAVO.JSLink.hideField,
            EditForm: BRAVO.JSLink.hideField,
            NewForm: BRAVO.JSLink.Fields.Methods.DefaultParentId,
            View: BRAVO.JSLink.hideField
        }
    }
};

// Write the javascript to initialize the CSR override. This will ensure it's called when MDS is enabled.
document.write("<script type='text/javascript'>(function() { BRAVO.JSLink.Fields.Init(); })();</script>");
