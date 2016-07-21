#Bootstrap List Example

##Overview
The overall goal of this example is to show how to customize a list and provide a simple dashboard utilizing Bootstrap in a SharePoint Hosted app. This example demonstrates how little code is required for the customizations.

##Configuration
The Bravo App Template allows the developer to set the architecture of the app in separate configuration files. Below is an overview of this example's configuration.
###List
```javascript
    // **********************************************************************************
    // List Configuration
    // **********************************************************************************

    var _listInfo = [];
    _listInfo[BRAVO.App.WebTypes.App] = [
        // Bootstrap List
        {
            /* Creating content types is not required. Seeing if we can set this easily. */
            /* Doesn't seem needed, since we take full control of the form. */
            ContentTypes: [
                {
                    Data: {
                        JSLink: "~site/Scripts/bravo.jslink.form.js",
                        Name: "Item",
                    },
                    ViewFields: ["ParentID", "Title", "BSChoice", "BSText", "BSUser", "BSNote"]
                },
                {
                    Data: {
                        JSLink: "~site/Scripts/bravo.jslink.form.js",
                        Name: "ChildItem",
                    },
                    ViewFields: ["ParentID", "Title", "ChildChoice", "ChildText", "ChildNote"]
                }
            ],
            Data: {
                BaseTemplate: 100,
                Description: "This is a prototype for using bootstrap in list forms/views.",
                Title: "Bootstrap List"
            },
            UrlName: "bootstrap",
            Fields: [
                /* Core Fields */
                '<Field ID="{AA3AF8EA-2D8D-4345-8BD9-6017205F0112}" Name="ParentID" StaticName="ParentID" DisplayName="Parent ID" Type="Integer" JSLink="~site/Scripts/bravo.jslink.fields.js" />',

                /* Main Fields */
                '<Field ID="{AA3AF8EA-2D8D-4345-8BD9-6017205F0212}" Name="BSChoice" StaticName="BSChoice" DisplayName="Choice" Type="Choice"><CHOICES><CHOICE>1</CHOICE><CHOICE>2</CHOICE><CHOICE>3</CHOICE></CHOICES></Field>',
                '<Field ID="{AA3AF8EA-2D8D-4345-8BD9-6017205F1212}" Name="BSNote" StaticName="BSNote" DisplayName="Note" Type="Note" />',
                '<Field ID="{AA3AF8EA-2D8D-4345-8BD9-6017205F2212}" Name="BSText" StaticName="BSText" DisplayName="Text" Type="Text" />',
                '<Field ID="{AA3AF8EA-2D8D-4345-8BD9-6017205F3212}" Name="BSUser" StaticName="BSUser" DisplayName="User" Type="User" />',

                /* Child Fields */
                '<Field ID="{AA3AF8EA-2D8D-4345-8BD9-6017207F0212}" Name="ChildChoice" StaticName="ChildChoice" DisplayName="Choice" Type="Choice"><CHOICES><CHOICE>1</CHOICE><CHOICE>2</CHOICE><CHOICE>3</CHOICE></CHOICES></Field>',
                '<Field ID="{AA3AF8EA-2D8D-4345-8BD9-6017207F1212}" Name="ChildNote" StaticName="ChildNote" DisplayName="Note" Type="Note" />',
                '<Field ID="{AA3AF8EA-2D8D-4345-8BD9-6017207F2212}" Name="ChildText" StaticName="ChildText" DisplayName="Text" Type="Text" />',
            ],
            Views: [
                {
                    Data: {
                        Title: "All Items"
                    },
                    ViewFields: ["Title", "BSChoice", "BSNote", "BSText", "BSUser"]
                }
            ]
        }
    ];
```
###Custom Form Template
In this example, we are using Client-Side Rendering (CSR) to customize the list forms. The JSLink properties are set in the configuration of the list, as shown in the previous section. Since we are fully overriding the forms, we need to override the template names. I'm using the on list created event to update the webparts.
```javascript
    // The list created event.
    // web - The web containing the list.
    // list - The new list.
    // listInfo - The list information.
    var onList_Created = function (web, list, listInfo, setTemplateName) {
        // Take full control of the list form
        setTemplateName(web, web.ServerRelativeUrl + "/lists/bootstrap", "CSRListForm");
    };
```
####Form Customizations
We will customize the form by overriding the view template.
```javascript
// **********************************************************************************
// Template Overrides
// **********************************************************************************
BRAVO.JSLink.BootStrap.Templates = {
    View: BRAVO.JSLink.BootStrap.Methods.RenderForm
};
```
The render form method will use the JSLink class of the Bravo Core library to create the html markup.
```javascript
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
```
####Field Customizations
The ParentId field is a number field, used for creating child items. We will override this field in the form and view(s).
```javascript
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
```
The new form will set the value and hide it, otherwise display it.
```javascript
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
```
####New Form
The forms are not styled outside the 3rd party plugins. I wanted to demonstrate what you get without styling.
![New Form](https://github.com/gunjandatta/Bootstrap-List-Example/blob/master/BRAVO.AppDev.BootstrapList/Documentation/newItemForm.png)
###Auto Installation
The app landing page is the dashboard. If the list doesn't exist, the page will redirect to the admin page and install/configure the app. On successfull install, the page will redirect to the dashboard. The code below shows the initialization event of the configuration file.
```javascript
    // The event called after the app panel is initialized.
    // source - The active web/site source.
    // panel - The validation panel.
    var onInit = function (source, panel) {
        // See if the app is installed
        if (_app.isInstalled() == false) {
            // Install the app
            _app.install().done(function () {
                // See if the app is installed
                if (_app.isInstalled() == true) {
                    // Redirect to the dashboard page
                    document.location.href = "Dashboard.aspx";
                }
            });
        }
    };
```
##Dashboard
![Dashboard](https://github.com/gunjandatta/Bootstrap-List-Example/blob/master/BRAVO.AppDev.BootstrapList/Documentation/dashboard.png)
The dashboard has shows a list of the items. The navigation panel allows the user to view all items or just the ones assigned to him/her. Clicking on an item will display the item's information.

##Item View
![Item Dashboard](https://github.com/gunjandatta/Bootstrap-List-Example/blob/master/BRAVO.AppDev.BootstrapList/Documentation/itemDashboard.png)
The item dashboard allows the user to add sub-items for the selected item, and displays the attachments in a simple list view.
