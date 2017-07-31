using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PASAROperations.Controllers
{
    public class MBFController : Controller
    {
        //
        // GET: /MBFcontroller/

        Models.PASAROperationEntities operationdb = new Models.PASAROperationEntities();

        public ActionResult MBFlogsheet()
        {
            return View();
        }



        public JsonResult load_mbf_actual_tables()
        {

            var select_rows = (from lc in operationdb.MBF_ParamGroup select lc);

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;

            return Json(select_rows, JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_mbf_actual_params()
        {

            var select_rows = (from ac in operationdb.VWMBF_Params where ac.MBF_ParamGroup2Id == 1 orderby ac.MBF_ParamGroupId, ac.MBF_ParamGroup3Id select ac);

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;

            return Json(select_rows, JsonRequestBehavior.AllowGet);
        }


        public JsonResult load_mbf_forecast_tables()
        {

            var select_rows = (from lc in operationdb.MBF_ParamGroup select lc);

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;

            return Json(select_rows, JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_mbf_forecast_params()
        {

            var select_rows = (from lc in operationdb.VWMBF_Params where lc.MBF_ParamGroup2Id == 2 orderby lc.MBF_ParamGroupId, lc.MBF_ParamGroup3Id select lc);

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;

            return Json(select_rows, JsonRequestBehavior.AllowGet);
        }


        public PartialViewResult mbf_tabs(string partialview_name)
        {
            return PartialView(partialview_name);
        }

        public void Save_MBF_val(List<MBFval> items)
        {
            var target_items = items;
            DateTime date;
            int paramid;
            int valtype;
            decimal numval;

            for (int i = 0; i < target_items.Count; i++)
            {
                date = target_items[i].date;
                paramid = target_items[i].paramid;
                valtype = target_items[i].valtype;
                numval = target_items[i].numval;

                operationdb.MBF_PARAM_NUMERIC_SP(paramid, valtype, date, numval);
                operationdb.SaveChanges();
            }
        }

        public class MBFval
        {
            public DateTime date { get; set; }
            public int paramid { get; set; }
            public int valtype { get; set; }
            public decimal numval { get; set; }
        }

        public JsonResult load_mbf_data(string date)
        {

            var select_rows = (from lc in operationdb.VWMBF_NumVal where lc.MonthYear == date select lc);

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;

            return Json(select_rows, JsonRequestBehavior.AllowGet);
        }


    }
}
