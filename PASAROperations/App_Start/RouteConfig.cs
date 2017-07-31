using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace PASAROperations
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

           // routes.MapRoute(
           //    name: "AFLogsheet",
           //    url: "AnodeFurnace/{action}/{id}",
           //    defaults: new { controller = "AnodeFurnace", action = "Index", id = UrlParameter.Optional }
           //);


            routes.MapRoute(
               name: "Default",
               url: "{controller}/{action}/{id}",
               defaults: new { controller = "Operations", action = "Index", id = UrlParameter.Optional }
           );


            routes.MapRoute(
                name: "CFLogsheet",
                url: "{controller}/{action}/{id}/{sdate}/{edate}/{cycid}",
                defaults: new { controller = "Operations", action = "Index", id = UrlParameter.Optional, sdate = UrlParameter.Optional, edate = UrlParameter.Optional, cycid = UrlParameter.Optional }
            );

            //NewAF
            routes.MapRoute(
             name: "AFLogsheet",
             url: "AnodeFurnace/{action}/{id}/{sdate}/{edate}/{aflotid}",
             defaults: new { controller = "AnodeFurnace", action = "Index", id = UrlParameter.Optional }
         );

      

        }
    }
}