using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PASAROperations.Controllers
{
    public class SmeltPlanController : Controller
    {
        //
        // GET: /SmeltPlan/
        Models.PASAROperationEntities smeltplansdb = new Models.PASAROperationEntities();

        //public ActionResult Print()
        //{
        //    var vm = ExportPDF();

        //    this.ViewData.Model = vm;

        //    return View("Print", vm);
        //}

        //public ActionResult Print()
        //{
        //    //var vm;

        //    ////    this.ViewData.Model = vm;

        //    using (StringWriter stringWriter = new StringWriter())
        //    {
        //        ViewEngineResult viewResult = ViewEngines.Engines.FindView(this.ControllerContext, "Print", null);

        //        ViewContext viewContext = new ViewContext(this.ControllerContext, viewResult.View, this.ViewData, this.TempData, stringWriter);

        //        viewResult.View.Render(viewContext, stringWriter);

        public ActionResult SmelterPlan()
        {
            return View();
        }

        public PartialViewResult smeltplan_tabs(string partialview_name)
        {
            return PartialView(partialview_name);
        }

        public JsonResult load_defaults()
        {
            var def = (from d in smeltplansdb.VWSPP_DefaultValues
                       select d);

            return Json(def, JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_actual_params(DateTime date)
        {
            var actual = (from p in smeltplansdb.VWSPP_AdditionalKPI
                          where p.TransactionDate == date
                          select p);

            return Json(actual, JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_target_params(DateTime date)
        {
            var actual = (from p in smeltplansdb.VWSPP_AdditionalKPI_Targets
                          where p.TransactionDate == date
                          select p);

            return Json(actual, JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_actual_data(DateTime date)
        {
            var actual = (from g in smeltplansdb.VWSPP_GraphSource
                          where g.TransactionDate == date orderby g.TimeSeries
                          select g);
            return Json(actual, JsonRequestBehavior.AllowGet);
        }

        public void Save_ProdDate(DateTime date)
        {
            smeltplansdb.SPP_PRODPLAN_SP(date);
            smeltplansdb.SaveChanges();
        }

        public int getProdId(DateTime date)
        {
            int prodid = smeltplansdb.SmelPlan_Prod.FirstOrDefault(a => a.SmelPlan_Prod_date == date).SmelPlan_Prod_Id;
            return prodid;
        }

        public int checkEmpty(DateTime date)
        {
            int prodid = smeltplansdb.SmelPlan_Prod.Count(a => a.SmelPlan_Prod_date == date);

            return prodid;
        }

        public void Save_Num_ProdPlan(List<ProdPlan_Num_Objs> items_numeric)
        {
            int prodid;
            int timeseriesid;
            int paramid;
            double numval;

            for (int i = 0; i < items_numeric.Count; i++)
            {
                prodid = items_numeric[i].prodid;
                timeseriesid = items_numeric[i].timeseriesid;
                paramid = items_numeric[i].paramid;
                numval = items_numeric[i].numval;

                smeltplansdb.SPP_PARAM_NUMERIC_SP(prodid, timeseriesid, paramid, numval);
                smeltplansdb.SaveChanges();
            }
        }

        public class ProdPlan_Num_Objs
        {
            public int prodid { get; set; }
            public int timeseriesid { get; set; }
            public int paramid { get; set; }
            public double numval { get; set; }
        }

        public void Delete_ProdPlan_NumFSF(int prodid)
        {
            smeltplansdb.Database.ExecuteSqlCommand("DELETE FROM [SmelPlan_TimeSeries_NumVal] WHERE SmelPlan_Prod_Id = @p0", prodid);
            smeltplansdb.SaveChanges();
        }

        public void Save_Str_ProdPlan(List<ProdPlan_Str_Objs> items_str)
        {
            int prodid;
            int timeseriesid;
            int paramid;
            string strval;

            for (int i = 0; i < items_str.Count; i++)
            {
                prodid = items_str[i].prodid;
                timeseriesid = items_str[i].timeseriesid;
                paramid = items_str[i].paramid;
                strval = items_str[i].strval;

                smeltplansdb.SPP_PARAM_STR_SP(prodid, timeseriesid, paramid, strval);
                smeltplansdb.SaveChanges();
            }
        }

        public class ProdPlan_Str_Objs
        {
            public int prodid { get; set; }
            public int timeseriesid { get; set; }
            public int paramid { get; set; }
            public string strval { get; set; }
        }

        public void Delete_ProdPlan_StrCF(int prodid)
        {
            smeltplansdb.Database.ExecuteSqlCommand("DELETE FROM [SmelPlan_TimeSeries_StrVal] WHERE SmelPlan_Prod_Id = @p0 AND (SmelPlan_Param_Id = 9 OR SmelPlan_Param_Id = 10 OR SmelPlan_Param_Id = 11 OR SmelPlan_Param_Id = 12 OR SmelPlan_Param_Id = 23 OR SmelPlan_Param_Id = 24)", prodid);
            smeltplansdb.SaveChanges();
        }

        public void Delete_ProdPlan_StrAF(int prodid)
        {
            smeltplansdb.Database.ExecuteSqlCommand("DELETE FROM [SmelPlan_TimeSeries_StrVal] WHERE SmelPlan_Prod_Id = @p0 AND (SmelPlan_Param_Id = 14 OR SmelPlan_Param_Id = 15)", prodid);
            smeltplansdb.SaveChanges();
        }

        public void Save_Num_ProdControl(int prodid, int paramid, int numval)
        {

        }

        public JsonResult Load_ProdPlan_NumVal(int prodid)
        {
            var plan = (from p in smeltplansdb.VWSPP_TimeSeries_NumVal
                        where p.SmelPlan_Prod_Id == prodid
                        select p);

            return Json(plan, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Load_ProdPlan_StrVal(int prodid)
        {
            var plan = (from p in smeltplansdb.VWSPP_TimeSeries_StrVal
                        where p.SmelPlan_Prod_Id == prodid
                        select p);

            return Json(plan, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Load_ProdPlan_Numeric(int prodid)
        {

            var numeric = (from n in smeltplansdb.VWSPP_NumericValues
                           where n.SmelPlan_Prod_Id == prodid
                           select n);

            return Json(numeric, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Load_AFParams_Actual(DateTime date)
        {
            var numeric = (from n in smeltplansdb.VWSPP_NumericValues
                           where n.SmelPlan_Prod_date == date && (n.SmelPlan_Param_Id > 39 && n.SmelPlan_Param_Id < 43)
                           select n);

            return Json(numeric, JsonRequestBehavior.AllowGet);
        }

        public void Save_AFParams_actual(List<AFParams> items) {
            int prodid;
            int paramid;
            double numval;

            for (int i = 0; i < items.Count; i++)
            {
                prodid = items[i].prodid;
                paramid = items[i].paramid;
                numval = items[i].numval;

                smeltplansdb.SPP_HEADER_NUMERIC_SP(prodid, paramid, numval);
                smeltplansdb.SaveChanges();
            }
        }

        public class AFParams {
            public int prodid { get; set; }
            public int paramid { get; set; }
            public double numval { get; set; }
        }

        public JsonResult Load_ProdPlan_String(int prodid)
        {

            var numeric = (from n in smeltplansdb.VWSPP_StringValues
                           where n.SmelPlan_Prod_Id == prodid
                           select n);

            return Json(numeric, JsonRequestBehavior.AllowGet);
        }

        public void Save_Header_Num(List<Header_Num> items_fsf)
        {
            int prodid;
            int paramid;
            double numval;

            for (int i = 0; i < items_fsf.Count; i++)
            {
                prodid = items_fsf[i].prodid;
                paramid = items_fsf[i].paramid;
                numval = items_fsf[i].numval;

                smeltplansdb.SPP_HEADER_NUMERIC_SP(prodid, paramid, numval);
                smeltplansdb.SaveChanges();
            }
        }

        public class Header_Num
        {
            public int prodid { get; set; }
            public int paramid { get; set; }
            public double numval { get; set; }
        }

        public void Save_Remarks_Str(int prodid, string remarks)
        {
            smeltplansdb.SPP_HEADER_NONNUMERIC_SP(prodid, 8, remarks);
            smeltplansdb.SaveChanges();
        }

        public void Save_BlisterCycle(int prodid, double blist)
        {
            smeltplansdb.SPP_HEADER_NUMERIC_SP(prodid, 13, blist);
            smeltplansdb.SaveChanges();
        }

        public void Save_Targets(List<SPP_Targets> items_tgt)
        {
            int prodid;
            int paramid;
            double numval;

            for (int i = 0; i < items_tgt.Count; i++)
            {
                prodid = items_tgt[i].prodid;
                paramid = items_tgt[i].paramid;
                numval = items_tgt[i].numval;

                smeltplansdb.SPP_HEADER_NUMERIC_SP(prodid, paramid, numval);
                smeltplansdb.SaveChanges();
            }
        }

        public class SPP_Targets
        {
            public int prodid { get; set; }
            public int paramid { get; set; }
            public double numval { get; set; }
        }

        public void Save_Defaults(List<SPP_Defaults> items)
        {
            int paramid;
            double numval;

            for (int i = 0; i < items.Count; i++)
            {
                paramid = items[i].paramid;
                numval = items[i].numval;

                smeltplansdb.SPP_DEFAULT_NUMERIC_SP(paramid, numval);
                smeltplansdb.SaveChanges();
            }
        }

        public class SPP_Defaults {
            public int paramid { get; set; }
            public double numval { get; set; }
        }
    }
}