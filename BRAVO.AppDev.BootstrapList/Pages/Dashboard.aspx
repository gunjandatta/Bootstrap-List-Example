<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="../Scripts/bravo.min.js"></script>
    <script type="text/javascript" src="../Scripts/bootstrap.min.js"></script>
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/bootstrap.min.css" />
    <link rel="Stylesheet" type="text/css" href="../Content/dashboard.css" />

    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/dashboard.js"></script>

    <!-- Ensure the page can be displayed in an app part -->
    <WebPartPages:AllowFraming runat="server" />
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div class="container-fluid">
        <div class="jumbotron">
            <h1>Bootstrap Dashboard</h1>
        </div>
        <div class="row">
            <!-- Sidebar Menu -->
            <div class="col-sm-3 col-md-2">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <input class="form-control" type="text" placeholder="Search... [In Dev]" />
                    </div>
                    <div class="panel-body">
                        <div id="myItems" class="list-group">
                            <a href="#" class="list-group-item list-group-item-info" onclick="javascript:showSummaryTable(this);">
                                <span id="myItemsCount" class="badge">0</span>
                                <h4 class="list-group-item-heading">My Items</h4>
                            </a>
                        </div>
                    </div>
                    <div class="panel-body">
                        <div id="allItems" class="list-group">
                            <a href="#" class="list-group-item list-group-item-info" onclick="javascript:showSummaryTable(this);">
                                <span id="allItemsCount" class="badge">0</span>
                                <h4 class="list-group-item-heading">All Items</h4>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Main Panel -->
            <div class="col-sm-9 col-md-10 main">
                <!-- Item Title -->
                <h1 id="mainTitle" class="page-header">All Items</h1>
                <!-- Item Panel -->
                <div class="row">
                    <!-- Summary Table -->
                    <div class="col-sm-12 col-md-12" id="panelSummary">
                        <div class="table-responsive">
                            <table class="table table-hover" id="tblSummary">
                                <thead>
                                    <tr>
                                        <th><a class="btn btn-xs btn-primary" role="button" href="javascript:void();" onclick="BRAVO.ModalDialog.open('New Item', '../lists/bootstrap/newform.aspx', null, null, BRAVO.ModalDialog.refreshOnSuccess);">+ New</a></th>
                                        <th>Title</th>
                                        <th>Choice</th>
                                        <th>Text</th>
                                        <th>User</th>
                                        <th>Note</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- Item Information -->
                    <div class="col-sm-12 col-md-12" id="panelItemInfo">
                        <div class="table-responsive" id="tblItemInfo">
                            <table class="table">
                                <tr>
                                    <td>Title: </td>
                                    <td data-fieldname="Title" data-type="Value"></td>
                                    <td>Choice: </td>
                                    <td data-fieldname="BSChoice" data-type="Value"></td>
                                </tr>
                                <tr>
                                    <td>Text: </td>
                                    <td data-fieldname="BSText" data-type="Value"></td>
                                    <td>User: </td>
                                    <td data-fieldname="BSUser" data-type="Value"></td>
                                </tr>
                                <tr>
                                    <td>Notes: </td>
                                    <td data-fieldname="BSNote" data-type="Value"></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <!-- Child Panel -->
                    <div class="col-sm-4 col-md-5" id="panelChildInfo" style="display:none;">
                        <!-- Child Title -->
                        <h3 class="page-header">Child Items:</h3>

                        <!-- Child Table -->
                        <div class="table-responsive">
                            <table class="table table-hover" id="tblChild">
                                <thead>
                                    <tr>
                                        <th><a id="btnNewChild" class="btn btn-xs btn-primary" role="button" href="javascript:void();">+ New</a></th>
                                        <th>Title</th>
                                        <th>Choice</th>
                                        <th>Text</th>
                                        <th>Note</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- Document Info Panel -->
                    <div class="col-sm-4 col-md-5" id="panelDocInfo" style="display:none;">
                        <!-- Document Info Title -->
                        <h3 class="page-header">Document Information:</h3>

                        <!-- Document Info Table -->
                        <div class="table-responsive">
                            <table class="table table-hover" id="tblDocInfo">
                                <thead>
                                    <tr>
                                        <th>Filename</th>
                                        <th><a id="btnUploadFile" class="btn btn-xs btn-primary" role="button" href="javascript:void();">+ Upload</a></th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
