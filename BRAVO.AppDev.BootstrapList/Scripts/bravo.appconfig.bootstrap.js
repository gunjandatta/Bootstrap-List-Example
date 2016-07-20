﻿"use strict";

// Global variables
var BRAVO = BRAVO || {};
BRAVO.AppConfig = BRAVO.AppConfig || [];

// **********************************************************************************
// Bravo App Configuration File
// This configuration file represents the architecture of the app. The 'App' class
// creates an instance of the app from each configuration file.
// **********************************************************************************
BRAVO.AppConfig.push(function () {
    // **********************************************************************************
    // App Information
    // **********************************************************************************

    var _app = null;
    var _appDescription = "This is will create the bootstrap list.";
    var _appTitle = "Bootstrap List";

    // **********************************************************************************
    // Content Type Configuration
    // **********************************************************************************

    var _contentTypeInfo = [];
    /* Example:
    _contentTypeInfo[BRAVO.App.WebTypes.Host] = [
        {
            Data: {
                Description: "My custom content type.",
                Group: "Bravo",
                Name: "My Custom Content Type"
            },
            FieldRefs: ["Internal Field Name"]
        }
    ]; */

    // **********************************************************************************
    // Custom Action Configuration
    // **********************************************************************************

    var _customActionInfo = [];
    /* Example:
    _customActionInfo[BRAVO.App.WebTypes.Host] = [
        { IsScript: false, Location: "Microsoft.SharePoint.StandardMenu", Name: "NameOfAction", Title: "Name of the Action", Url: "~site/Style Library/bravo/pages/nameOfTheFile.aspx", Description: "Description of the action." },
        { IsScript: true, UseScriptBlock: false, Name: "NameOfJSFile", Title: "Name of the JS File", FileUrl: "~site/Style Library/bravo/js/nameOfTheFile.js", Description: "Description of the JS file." },
        { IsScript: false, Name: "NameOfCSSFile", Title: "Name of the CSS File", FileUrl: "~site/Style Library/bravo/css/nameOfTheFile.css", Description: "Description of the CSS file." }
    ]; */

    // **********************************************************************************
    // Field Configuration
    // **********************************************************************************

    var _fieldInfo = [];
    /* Example:
    _fieldInfo[BRAVO.App.WebTypes.Host] = [
        '<Field ID="{AA3AF8EA-2D8D-4345-8BD9-6017205F6212}" Name="TestValue" StaticName="TestValue" DisplayName="Value" Type="Text" />'
    ]; */

    // **********************************************************************************
    // File Configuration
    // **********************************************************************************

    var _fileInfo = [];
    /* Example:
    _fileInfo[BRAVO.App.WebTypes.Host] = [
        { Path: "/Content/bravo.css", SubFolder: "css" },
        { Path: "/Scripts/bravo.min.js", SubFolder: "js" },
    ]; */

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

    // **********************************************************************************
    // Master Page Gallery Configuration
    // **********************************************************************************

    var _mpgInfo = [];
    /* Example:
    _mpgInfo[BRAVO.App.WebTypes.Site] = [
        { Path: "/Pages/MasterPage.aspx", SubFolder: "Pages", Type: BRAVO.App.MPGTypes.MasterPage, Properties: { MasterPageDescription: "Description of the masterpage.", Title: "My Custom MasterPage" } },
        { Path: "/Pages/PageTemplate.aspx", SubFolder: "Pages", Type: BRAVO.App.MPGTypes.PageLayout, Properties: { MasterPageDescription: "Description of the page layout", Title: "My Custom Template" } },
    ]; */

    // **********************************************************************************
    // Ribbon Configuration
    // **********************************************************************************

    var _ribbonInfo = [];
    /* Example:
    _ribbonInfo[BRAVO.App.WebTypes.Host] = [
        {
            Location: "CommandUI.Ribbon",
            Name: "BravoExampleRibbonIcon",
            Title: "Bravo - Example Ribbon Icon",
            CommandUIExtension: '\
                <CommandUIExtension xmlns="http://schemas.microsoft.com/sharepoint/">\
                <CommandUIDefinitions>\
                    <CommandUIDefinition Location="[Location of the example button].Controls._children">\
                        <Button Id="Bravo.Example.Button" \
                            Alt="Example" \
                            Command="BravoButtonCommand" \
                            Description="Description of the button." \
                            Image16by16="_layouts/15/images/placeholder16x16.png" \
                            Image32by32="_layouts/15/images/placeholder32x32.png" \
                            LabelText="Custom Button" \
                            Sequence="100" \
                            TemplateAlias="o1" />\
                    </CommandUIDefinition>\
                </CommandUIDefinitions>\
                <CommandUIHandlers>\
                    <CommandUIHandler Command="BravoButtonCommand" CommandAction="javascript:alert(\'Test\');" />\
                </CommandUIHandlers>\
            </CommandUIExtension>'
        }
    ]; */

    // **********************************************************************************
    // Private Methods
    // **********************************************************************************

    // **********************************************************************************
    // Events and Initialization Methods
    // **********************************************************************************

    // Method to initialize the app.
    // panel - The app panel.
    // (Optional) app - The app instance.
    var initApp = function (panel, app) {
        // Create a new instance of the app
        _app = app || new BRAVO.App();

        // Link the app configuration
        _app.APP_DESCRIPTION = _appDescription;
        _app.APP_TITLE = _appTitle;
        _app.CONTENT_TYPE_INFO = _contentTypeInfo;
        _app.CUSTOM_ACTION_INFO = _customActionInfo;
        _app.FIELD_INFO = _fieldInfo;
        _app.FILE_INFO = _fileInfo;
        _app.LIST_INFO = _listInfo;
        _app.MPG_INFO = _mpgInfo;
        _app.RIBBON_INFO = _ribbonInfo;

        // Link the events
        _app.onClick_Install = onClick_Install;
        _app.onClick_Refresh = onClick_Refresh;
        _app.onClick_Uninstall = onClick_Uninstall;
        _app.onClick_Upgrade = onClick_Upgrade;
        _app.onFile_Copied = onFile_Copied;
        _app.onInit = onInit;
        _app.onInit_InstallRequired = onInit_InstallRequired;
        _app.onList_Configured = onList_Configured;
        _app.onList_Created = onList_Created;
        _app.onValidate = onValidate;

        // Initialize the app
        _app.init(panel);

        // Return the app instance
        return _app;
    };

    // The install button click event.
    // source - The active web/site source.
    // panel - The validation panel.
    var onClick_Install = function (source, panel) { };

    // The refresh button click event.
    // source - The active web/site source.
    // panel - The validation panel.
    var onClick_Refresh = function (source, panel) { };

    // The uninstall button click event.
    // source - The active web/site source.
    // panel - The validation panel.
    var onClick_Uninstall = function (source, panel) { };

    // The upgrade button click event.
    // source - The active web/site source.
    // panel - The validation panel.
    var onClick_Upgrade = function (source, panel) { };

    // The file copied click event.
    // file - The copied file.
    // folder - The folder containing the folder.
    // list - The list containing the file.
    // web - The web containing the file.
    var onFile_Copied = function (file, folder, list, web) { };

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

    // The install required event.
    // source - The active web/site source.
    var onInit_InstallRequired = function (source) { };

    // The list configured event.
    // web - The web containing the list.
    // list - The new list.
    // listInfo - The list information.
    var onList_Configured = function (web, list, listInfo, setTemplateName) { };

    // The list created event.
    // web - The web containing the list.
    // list - The new list.
    // listInfo - The list information.
    var onList_Created = function (web, list, listInfo, setTemplateName) {
        // Take full control of the list form
        setTemplateName(web, web.ServerRelativeUrl + "/lists/bootstrap", "CSRListForm");
    };

    // The validation event.
    // source - The active web/site source.
    // panel - The validation panel.
    var onValidate = function (source, panel) { };

    // **********************************************************************************
    // Public Interface
    // **********************************************************************************
    return {
        description: _appDescription,
        initApp: initApp,
        title: _appTitle
    };
}());
