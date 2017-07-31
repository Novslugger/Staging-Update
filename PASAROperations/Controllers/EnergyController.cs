using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PASAROperations.Controllers
{
    public class EnergyController : Controller
    {
        //
        // GET: /Energy/
        Models.PASAROperationEntities operationdb = new Models.PASAROperationEntities();

        public ActionResult Energy()
        {
            return View();
        }
        public ActionResult _DailyMQ()
        {
            return View();
        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult Energy_Partial()
        {
            @ViewBag.DDate = DateTime.Now;

            return PartialView("_AddDailyMQ");
        }

        public JsonResult Load_ParamNames() {
            var en = (from e in operationdb.Energy_Param
                      where e.Energy_ParamGroup1Id == 8
                      select new { e.Energy_ParamName });
            return Json(en, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DailyMG_data(string date)
        {
            var d_mg = (from d in operationdb.VWEnergy_Numeric_MG_Val
                        orderby d.Energy_MGDate descending
                        where d.MonthYear == date
                        select d);

            return Json(d_mg, JsonRequestBehavior.AllowGet);
        }

        public void New_DailyMG(int value, DateTime date)
        {
            operationdb.Energy_MG_NUMERIC_SP(64, value, date);
            operationdb.SaveChanges();
        }

        public void Save_DailyMG(List<DailyMG_Obj> items)
        {
            var mg = items;
            int paramid;
            string num_val;
            DateTime date;

            for (int i = 0; i < mg.Count; i++)
            {
                num_val = mg[i].value;
                paramid = mg[i].paramid;
                date = mg[i].date;

                if (num_val != null)
                {
                    operationdb.Energy_MG_NUMERIC_SP(paramid, Double.Parse(num_val), date);
                }
                operationdb.SaveChanges();
            }
        }

        public class DailyMG_Obj
        {
            public int paramid { get; set; }
            public string value { get; set; }
            public DateTime date { get; set; }
        }

        public void Delete_DMG(DateTime date)
        {
            operationdb.Database.ExecuteSqlCommand("DELETE FROM [Energy_MG_Val] WHERE Energy_MGDate = @p0", date);

            //var entry1 = operationdb.Energy_MG_Val.Where(a => a.Energy_MGDate == date).First();
            //operationdb.Energy_MG_Val.Remove(entry1);
            //operationdb.SaveChanges();

            //var entry2 = operationdb.Energy_MG_Val.Where(a => a.Energy_MGDate == date).First();
            //operationdb.Energy_MG_Val.Remove(entry2);
            operationdb.SaveChanges();

        }

        public JsonResult Energy_tbl_names()
        {
            var en_names = (from en in operationdb.Energy_Param
                            where en.Energy_ParamValid == true
                            select new { en.Energy_ParamId, en.Energy_ParamGroup1Id, en.Energy_ParamName });

            return Json(en_names, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Energy_tbl_data(bool active)
        {
            var energy_data = (from ene in operationdb.VWEnergy_Numeric_Val
                               where ene.Energy_NumVal_Active == active
                               select ene);

            return Json(energy_data, JsonRequestBehavior.AllowGet);
        }

        public void Save_energy_data(List<Energy_Obj> items)
        {
            var energy_data = items;
            int paramid;
            string num_val;

            for (int i = 0; i < energy_data.Count; i++)
            {
                paramid = energy_data[i].paramid;
                num_val = energy_data[i].num_val;

                if (num_val != null)
                {
                    operationdb.Energy_PARAM_NUMERIC_SP(paramid, Double.Parse(num_val));
                }
                operationdb.SaveChanges();
            }
        }

        public class Energy_Obj
        {
            public int paramid { get; set; }
            public string num_val { get; set; }
        }

        public PartialViewResult energy_tabs(string partialview_name)
        {

            return PartialView(partialview_name);
        }
    }
}
