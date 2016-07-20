"use strict";

// Global Variable
var _currentItem = null;
var _items = null;
var _list = null;

// Wait for the core library to be loaded and initialize the dashboard
BRAVO.Core.loadDependencies(function () {
    var filter = "ParentID eq null&$select=ID,Title,BSChoice,BSNote,BSText,BSUser/ID,BSUser/Title&$expand=BSUser&$orderBy=Title";

    // Update the panel visibility
    updatePanelVisibility("panelItemInfo", false);
    updatePanelVisibility("panelSummary", true);

    // Get the list
    new BRAVO.Core.ListAsync("Bootstrap List").done(function (list) {
        // Ensure it exists
        if (list.exists) {
            // Save the list
            _list = list;

            // Query the list
            _list.getItemsByFilter(filter.replace(/{{ID}}/, "gt 0")).done(function (items) {
                items = items.exists ? items.results : [];

                // Update the nav panel
                updateNavPanel(items);

                // Populate the form main panel
                renderSummaryTable(items);
            });
        }
        else {
            // Redirect the user to the configuration page
            document.location.href = "Admin.aspx";
        }
    });
});

// Method to add a nav item
function addNavItem(view, item) {
    // Ensure the view and item exist
    if (view && item) {
        // Append the item to the view
        view.innerHTML += '<a href="#" class="list-group-item" onclick="javascript:updateItemPanel(this);" data-item-id="' + item.ID + '">' + item.Title + '</a>';
    }
}

// Method to return the item value
function getItemValue(item, field) {
    // See if the value is a string
    if (typeof (item[field]) === "string") {
        // Set the value
        return item[field];
    }

    // It's a user field, so we will assume the property value.
    // Note - We will probably have to use the metadata type if we add other field types that have an object as a value.
    return item[field].Title;
}

// Method to render the items to the summary table
function renderSummaryTable(items) {
    var fieldsToDisplay = ["Title", "BSChoice", "BSNote", "BSUser", "BSText"];

    // Clear the items
    _items = [];

    // Get the summary data
    var tbl = document.querySelector("#tblSummary tbody");
    if (tbl) {
        var row = "";

        // Parse the items
        for (var i = 0; i < items.length; i++) {
            // Append the item
            _items[items[i].ID] = items[i];

            // Render the edit/delete buttons
            row = '<tr data-my-item="' + (items[i].BSUser.ID == _spPageContextInfo.userId ? 1 : 0) + '">' +
                // Edit Button
                '<td><a class="btn btn-xs btn-info" role="button" href="javascript:void();" ' +
                'onclick="BRAVO.ModalDialog.open(\'Edit Item\', \'../lists/bootstrap/editform.aspx?ID=' +
                items[i].ID + '\', null, null, BRAVO.ModalDialog.refreshOnSuccess);">Edit</a>' +
                // View Button
                '&nbsp;&nbsp;<a class="btn btn-xs btn-info" role="button" href="javascript:void();" ' +
                'data-item-id="' + items[i].ID + '" onclick="javascript:updateItemPanel(this);">View</a>' +
                // Delete Button
                '</td>' +
                // Fields
                renderColumns(items[i], fieldsToDisplay);

            // Append the row to the table
            tbl.innerHTML += row + "</tr>";
        }
    }
}

// Method to render table columns
function renderColumns(item, fieldsToDisplay) {
    var columns = "";

    // Parse the fields to display
    for (var i = 0; i < fieldsToDisplay.length; i++) {
        // Append the value
        columns += "<td>" + getItemValue(item, fieldsToDisplay[i]) + "</td>";
    }

    // Return the columns
    return columns;
}

// Method to show the summary table
function showSummaryTable(link) {
    var mainTitle = link.querySelector("h4").innerText;
    var showMyItemsFl = mainTitle == "My Items";

    // Update the panel visibility
    updatePanelVisibility("panelChildInfo", false);
    updatePanelVisibility("panelDocInfo", false);
    updatePanelVisibility("panelItemInfo", false);
    updatePanelVisibility("panelSummary", true);

    // Update the main title
    document.querySelector("#mainTitle").innerText = mainTitle;

    // Parse the items
    var rows = document.querySelectorAll("#panelSummary tbody > tr");
    for (var i = 0; i < rows.length; i++) {
        // See if we are only showing my items
        if (showMyItemsFl) {
            // Show/Hide this row
            rows[i].style.display = rows[i].getAttribute("data-my-item") == "1" ? "" : "none";
        }
        else {
            // Show this row
            rows[i].style.display = "";
        }
    }
}

// Method to update the child panel
function updateChildPanel() {
    // Get the button
    var btn = document.querySelector("#btnNewChild");
    if (btn) {
        // Update the onclick event
        btn.setAttribute("onclick", "BRAVO.ModalDialog.open('New Item', '../lists/bootstrap/newform.aspx?Form=Child&ParentID=" +
            _currentItem.ID + "', null, null, BRAVO.ModalDialog.refreshOnSuccess);");
    }

    // Get the child items
    var childItems = document.querySelector("#tblChild > tbody");
    if (childItems) {
        var fieldsToDisplay = ["Title", "ChildChoice", "ChildText", "ChildNote"];

        // Clear them
        childItems.innerHTML = "";

        // Query the list for the child items
        _list.getItemsByFilter("ParentID eq " + _currentItem.ID).done(function (items) {
            // Parse the items
            for (var i = 0; i < items.results.length; i++) {
                var item = items.results[i];

                // Append the row to the table
                childItems.innerHTML += "<tr>" +
                    // Edit Button
                    '<td><a class="btn btn-xs btn-info" role="button" href="javascript:void();" ' +
                    'onclick="BRAVO.ModalDialog.open(\'Edit Item\', \'../lists/bootstrap/editform.aspx?Form=Child&ID=' +
                    item.ID + '\', null, null, BRAVO.ModalDialog.refreshOnSuccess);">Edit</a>' +
                    // View Button
                    '&nbsp;&nbsp;<a class="btn btn-xs btn-info" role="button" href="javascript:void();" ' +
                    'onclick="BRAVO.ModalDialog.open(\'' + item.Title + '\', \'../lists/bootstrap/dispform.aspx?Form=Child&ID=' +
                    item.ID + '\');">View</a>' +
                    // Delete Button
                    '</td>' +
                    // Fields
                    renderColumns(item, fieldsToDisplay) +
                    "</tr>";
            }
        });
    }
}

// Method to update the document information panel
function updateDocInfoPanel() {
    // Get the button
    var btn = document.querySelector("#btnUploadFile");
    if (btn) {
        // Update the onclick event
        btn.setAttribute("onclick", "uploadFile();");
    }

    // Get the child items
    var childItems = document.querySelector("#tblDocInfo > tbody");
    if (childItems) {
        // Clear them
        childItems.innerHTML = "";

        // Get the item
        _list.getItemById(_currentItem.ID).done(function (item) {
            // Set the current item
            _currentItem = item;

            // Query the list for the child items
            _currentItem.get_AttachmentFiles().done(function (files) {
                // Parse the items
                for (var i = 0; i < files.results.length; i++) {
                    var file = files.results[i];

                    // Append the row to the table
                    childItems.innerHTML += "<tr>" +
                        // File Link
                        '<td><a class="btn btn-xs btn-info" role="button" href="' + file.ServerRelativeUrl + '">' + file.FileName + '</a></td>' +
                        // Delete Button
                        '<td></td>' +
                        '</tr>';
                }
            });
        });
    }
}

// Method to update the item panel
function updateItemPanel(link) {
    var fieldsToDisplay = ["Title", "BSChoice", "BSNote", "BSText", "BSUser"];

    // Update the panel visibility
    updatePanelVisibility("panelChildInfo", true);
    updatePanelVisibility("panelDocInfo", true);
    updatePanelVisibility("panelItemInfo", true);
    updatePanelVisibility("panelSummary", false);

    // Get the item
    var item = _items[link.getAttribute("data-item-id")];

    // Update the main title
    document.querySelector("#mainTitle").innerText = item.Title;

    // See if we have already rendered this item
    if (_currentItem && _currentItem.ID == item.ID) { return; }

    // Set the current item
    _currentItem = item;

    // Update the child panel
    updateChildPanel();

    // Update the document info panel
    updateDocInfoPanel();

    // Parse the fields to display
    for (var i = 0; i < fieldsToDisplay.length; i++) {
        // Find the column for this field
        var col = document.querySelector("td[data-fieldname='" + fieldsToDisplay[i] + "']");
        if (col) {
            // Set the field value
            col.innerText = getItemValue(item, fieldsToDisplay[i]);
        }
    }
}

// Method to update the panel visibility
function updatePanelVisibility(panelId, showFl) {
    // Get the panel
    var panel = document.querySelector("#" + panelId);
    if (panel) {
        panel.style.display = showFl ? "" : "none";
    }
}

// Method to update the navigation panel
function updateNavPanel(items) {
    var myItemsCount = 0;

    // Get the nav items
    var allItems = document.querySelector("#allItems");
    var myItems = document.querySelector("#myItems");

    // Parse the items
    for (var i = 0; i < items.length; i++) {
        var item = items[i];

        // See if this item is assigned to the current user
        if (item.BSUser.ID == _spPageContextInfo.userId) {
            // Increment my items count
            myItemsCount++;

            // Add this item
            addNavItem(myItems, item);
        }

        // Add this item to the all items view
        addNavItem(allItems, item);
    }

    // Update the my items count
    document.querySelector("#myItemsCount").innerText = myItemsCount;

    // Update the all items count
    document.querySelector("#allItemsCount").innerText = items.length;
}

// Method to upload a file
function uploadFile() {
    // Display the form
    BRAVO.ModalDialog.openHtml("Upload File",
        "<div>" +
        "<input id='file' class='ms-fileinput' type='file' size='56' /><br />" +
        "<button type='button' onclick=\"BRAVO.ModalDialog.close(SP.UI.DialogResult.OK, document.querySelector('#file'));\">Upload</button>" +
        "<button type='button' onclick=\"BRAVO.ModalDialog.close();\">Cancel</button>" +
        "</div>",
        false, null, function (dialogResult, file) {
            // See if the file exists and the 'OK' button was clicked
            if (file && dialogResult == SP.UI.DialogResult.OK) {
                // Add this file to the attachments
                _currentItem.addAttachmentFile(file).done(function () {
                    // Refresh the document information
                    updateDocInfoPanel();
                });
            }
        }
    );
}
