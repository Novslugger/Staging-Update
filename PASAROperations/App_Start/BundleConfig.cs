using System.Web;
using System.Web.Optimization;

namespace PASAROperations
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js", "~/Scripts/Refinery.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquerylatest").Include(
                    "~/Scripts/jquery-ui-1.10.2.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr*"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/kirtscript").Include(
                        "~/Scripts/improvemysite*", "~/Scripts/jquery.sortElements.js","~/Scripts/MBFscript.js",
                        "~/Scripts/date.js", "~/Scripts/AFLogsheet.js",
                        "~/Scripts/SFPLogsheet.js",
                        "~/Scripts/select2.min.js",
                        "~/Scripts/canvasjs.*","~/Scripts/pace.js",
                        "~/Scripts/jquery.multiselect.*"
                        ));

            //bundles.Add(new ScriptBundle("~/bundles/jsPDF").Include("~/Scripts/jsPDF-1.2.60/dist/jspdf.*").IncludeDirectory("~/Scripts/jsPDF-1.2.60/plugins", "*.js", true));
            
            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css",
                        "~/Content/select2.css",
                        "~/Content/themes/base/jquery.multiselect*"));
        }
    }
}
