using System.Web;
using System.Web.Optimization;

namespace CustomizacaoBootstrap3
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/scripts").Include(
                        "~/js/scripts.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/js/jquery.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/js/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                        "~/js/bootstrap.js"));

            bundles.Add(new StyleBundle("~/css/styles").Include(
                        "~/css/style.css"));
        }
    }
}
