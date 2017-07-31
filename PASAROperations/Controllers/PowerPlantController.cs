using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PASAROperations.Controllers
{
    public class PowerPlantController : Controller
    {
        //
        // GET: /PowerPlant/

        Models.PASAROperationEntities operationdb = new Models.PASAROperationEntities();

        public ActionResult BoilerWaterAnalysis()
        {
            return View();
        }

        public JsonResult WaterAnalysis_tbl_names(int reportType)
        {
            var pp_names = (from pp in operationdb.PowerPlant_Param
                            where pp.PowerPlant_ParamReportType == reportType
                            select new { pp.PowerPlant_ParamId, pp.PowerPlant_ParamGroupId, pp.PowerPlant_ParamName, pp.PowerPlant_ParamStandard });

            return Json(pp_names, JsonRequestBehavior.AllowGet);
        }

        public JsonResult WaterAnalysis_tbl_data(DateTime date, int reportType)
        {
            var pp_data = (from pp in operationdb.PowerPlant_Param_Num_Val
                           join ppp in operationdb.PowerPlant_Param on pp.PowerPlant_ParamId equals ppp.PowerPlant_ParamId
                           join prt in operationdb.PowerPlant_ReportType on ppp.PowerPlant_ParamReportType equals prt.PowerPlant_TypeId
                           where pp.PowerPlant_Date == date && prt.PowerPlant_TypeId == reportType
                           select new { pp.PowerPlant_ParamId, pp.PowerPlant_NumVal });

            return Json(pp_data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CoolingWaterAnalysis()
        {
            return View();
        }

        public void Save_PowerPlant_data(List<PowerPlant_Obj> items)
        {
            var powerplant_data = items;
            int paramid;
            string num_val;
            DateTime date;

            for (int i = 0; i < powerplant_data.Count; i++)
            {
                paramid = powerplant_data[i].paramid;
                num_val = powerplant_data[i].num_val;
                date = powerplant_data[i].date;

                if (num_val != null)
                {
                    operationdb.POWERPLANT_PARAM_NUMERIC_SP(paramid, date, Double.Parse(num_val));
                }
                operationdb.SaveChanges();
            }
        }

        public class PowerPlant_Obj
        {
            public int paramid { get; set; }
            public string num_val { get; set; }
            public DateTime date { get; set; }
        }
    }
}
