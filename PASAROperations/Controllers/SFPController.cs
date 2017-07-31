using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PASAROperations.Controllers
{
    public class SFPController : Controller
    {

        Models.PASAROperationEntities cfdb = new Models.PASAROperationEntities();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SFPLogsheet()
        {
            return View();
        }

        public JsonResult Location_List(string term)
        {
            var sfpm = (from loc in cfdb.SFP_Param_Locations
                        where loc.SFP_Location_StatusId == 0 || loc.SFP_LocationId == 136
                        orderby loc.SFP_LocationId ascending
                        select loc);

            SelectList location_list = new SelectList(sfpm, "SFP_LocationId", "SFP_LocationName");

            var result = location_list.Where(s => s.Text.ToLower().Contains(term.ToLower())).Select(w => w).ToList();

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        //public JsonResult Group_list(int DataId)
        //{
        //    var grp = (from g in cfdb.SFP_Val_Group
        //               where g.SFP_Val_GroupId
        //               select g);

        //    return Json(grp, JsonRequestBehavior.AllowGet);
        //}

        public SelectList Pot_list()
        {
            var pot = (from p in cfdb.SFP_Param_Pots
                       where p.SFP_Active == 0
                       orderby p.SFP_PotId ascending
                       select p);
            SelectList pot_list = new SelectList(pot, "SFP_PotId", "SFP_PotId");

            return pot_list;
        }

        public SelectList Pot_list_edit(int DataId)
        {
            var pot = cfdb.FN_SFP_MONITOR_POTS(DataId);
            SelectList pot_list = new SelectList(pot, "PotNo", "PotNo");

            return pot_list;
        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult SFP_Partial()
        {
            @ViewBag.SFP_DDate = DateTime.Now;
            @ViewBag.SFP_ADate = DateTime.Now;

            ViewData["pot_list"] = Pot_list();
            //ViewData["location_list"] = Location_List();

            return PartialView("_AddSFPEntryCF");
        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult SFP_Partial_CF()
        {
            @ViewBag.SFP_DDate = DateTime.Now;
            @ViewBag.SFP_ADate = DateTime.Now;

            ViewData["pot_list"] = Pot_list();
            //ViewData["location_list"] = Location_List();

            return PartialView("_AddSFPEntryCF");
        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult SFP_Partial_FSF()
        {
            @ViewBag.SFP_DDate = DateTime.Now;
            @ViewBag.SFP_ADate = DateTime.Now;

            ViewData["pot_list"] = Pot_list();
            //ViewData["location_list"] = Location_List();

            return PartialView("_AddSFPEntryFSF");
        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult EditSFP_Partial_c(int DataId)
        {
            @ViewBag.DateTimeNow = DateTime.Now;
            @ViewBag.dataid = DataId;
            ViewData["pot_list"] = Pot_list_edit(DataId);
            //ViewData["group_list"] = Group_list();

            var sfp_ = (from sfp in cfdb.VWSFP_Pots_Data
                        where sfp.SFP_DataId == DataId
                        select sfp).First();

            string potstatus = "";

            if (sfp_.Pot_Status == 2)
                potstatus = "checked";

            ViewBag.location = sfp_.SFP_PrevLocationName;
            ViewBag.dtime = sfp_.SFP_DTime;
            ViewBag.pot = sfp_.SFP_PotId;
            ViewBag.ctime = sfp_.SFP_CoolTime;
            ViewBag.etime = sfp_.SFP_ExpectedDTime;
            ViewBag.atime = sfp_.SFP_ActualDTime;
            ViewBag.btime = sfp_.SFP_ForBreakingDTime;
            ViewBag.temp = sfp_.SFP_DumpTemp;
            ViewBag.remarks = sfp_.SFP_Remark;
            ViewBag.potstatus = potstatus;
            ViewBag.group = (from g in cfdb.SFP_Val_Group
                             where g.SFP_Val_GroupId == sfp_.SFP_Val_GroupId
                             select g.SFP_Val_GroupDesc).First(); ;
            ViewBag.bktime = sfp_.SFP_ForBreakingDTime != null ? sfp_.SFP_ForBreakingDTime : DateTime.Now;


            return PartialView("_EditSFPEntry_c");
        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult EditSFP_Partial(int DataId)
        {
            @ViewBag.DateTimeNow = DateTime.Now;
            @ViewBag.dataid = DataId;
            ViewData["pot_list"] = Pot_list_edit(DataId);
            //ViewData["group_list"] = Group_list();

            var sfp_ = (from sfp in cfdb.VWSFP_Pots_Data
                        where sfp.SFP_DataId == DataId
                        select sfp).First();

            string potstatus = "";

            if (sfp_.Pot_Status == 2)
                potstatus = "checked";

            ViewBag.location = sfp_.SFP_PrevLocationName;
            ViewBag.dtime = sfp_.SFP_DTime;
            ViewBag.pot = sfp_.SFP_PotId;
            ViewBag.ctime = sfp_.SFP_CoolTime;
            ViewBag.etime = sfp_.SFP_ExpectedDTime;
            ViewBag.btime = sfp_.SFP_ForBreakingDTime;
            ViewBag.temp = sfp_.SFP_DumpTemp;
            ViewBag.remarks = sfp_.SFP_Remark;
            ViewBag.potstatus = potstatus;
            ViewBag.group = (from g in cfdb.SFP_Val_Group
                             where g.SFP_Val_GroupId == sfp_.SFP_Val_GroupId
                             select g.SFP_Val_GroupDesc).First();
            ViewBag.bktime = sfp_.SFP_ForBreakingDTime != null ? sfp_.SFP_ForBreakingDTime : DateTime.Now;

            return PartialView("_EditSFPEntry");
        }

        public void Delete_SFP(int sfpid)
        {
            var sfp_ = cfdb.SFP_Pots_Data.Where(a => a.SFP_DataId == sfpid).First();
            var locid_ = sfp_.SFP_PrevLocationId;
            var potno_ = sfp_.SFP_PotId;

            var location = cfdb.SFP_Param_Locations.Where(l => l.SFP_LocationId == locid_).First();
            var pot = cfdb.SFP_Param_Pots.Where(p => p.SFP_PotId == potno_).First();

            location.SFP_Location_StatusId = 0;
            pot.SFP_Active = 0;

            cfdb.SFP_Pots_Data.Remove(sfp_);
            cfdb.SaveChanges();
        }

        public void Delete_SFP_completed(int sfpid)
        {
            var sfp_ = cfdb.SFP_Pots_Data.Where(a => a.SFP_DataId == sfpid).First();
            cfdb.SFP_Pots_Data.Remove(sfp_);
            cfdb.SaveChanges();
        }

        public ActionResult SFPActive()
        {
            return View();
        }
        public ActionResult SFPComplete()
        {
            return View();
        }
        public ActionResult _SFPMonitor()
        {
            return View();
        }

        public JsonResult countSummary(int furnace)
        {
            var datenow = DateTime.Now;
            var cool = (from cp in cfdb.VWSFP_Pots_Data
                        where cp.Pot_Status == 1 && cp.SFP_ActualDTime == null && cp.SFP_Val_GroupId == furnace && cp.SFP_ExpectedDTime > datenow
                        orderby cp.SFP_DataId ascending
                        select cp).Count();
            var ovr = (from cp in cfdb.VWSFP_Pots_Data
                       where cp.Pot_Status == 1 && cp.SFP_ActualDTime == null && cp.SFP_Val_GroupId == furnace && cp.SFP_ExpectedDTime < datenow
                       orderby cp.SFP_DataId ascending
                       select cp).Count();
            var empty = (from cp in cfdb.VWSFP_Monitor_Pots
                         where cp.SFP_Active == 0
                         select cp).Count();
            var forbreak = (from cp in cfdb.VWSFP_Pots_Data
                            where cp.Pot_Status == 2 && cp.SFP_Val_GroupId == furnace && cp.SFP_ActualDTime == null
                            orderby cp.SFP_DataId ascending
                            select cp).Count();
            int[] arr = { cool, ovr, empty, forbreak };

            return Json(arr, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SFP_Active_Data(int furnace)
        {
            var sfp_ = (from sfp in cfdb.VWSFP_Pots_Data
                        where sfp.SFP_ActualDTime == null && sfp.SFP_Val_GroupId == furnace
                        orderby sfp.SFP_DTime ascending
                        select sfp);
            return Json(sfp_, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SFP_Completed_Data(int furnace)
        {
            var sfp_ = (from sfp in cfdb.VWSFP_Pots_Data
                        where sfp.SFP_ActualDTime != null && sfp.SFP_Val_GroupId == furnace
                        orderby sfp.SFP_DTime descending
                        select sfp);
            return Json(sfp_, JsonRequestBehavior.AllowGet);
        }

        public void Add_SFP(string locationname, int potno, DateTime dtime, int cooltime, DateTime expdtime, string actualdtime, string dtemp, string remarks, int group, bool isForBreaking, string forbreakingtime)
        {
            var locationid = cfdb.SFP_Param_Locations.Where(c => c.SFP_LocationName == locationname).Select(c => c.SFP_LocationId).First();

            var loc = cfdb.SFP_Param_Locations.Where(a => a.SFP_LocationId == locationid).First();
            var pot = cfdb.SFP_Param_Pots.Where(b => b.SFP_PotId == potno).First();
            var actdtime = new DateTime(2000, 1, 1);
            var bktime = new DateTime(2000, 1, 1);

            if (forbreakingtime != "")
                bktime = Convert.ToDateTime(forbreakingtime);

            if (actualdtime != "")
            {
                actdtime = Convert.ToDateTime(actualdtime);
                loc.SFP_Location_StatusId = 0;
                pot.SFP_Active = 0;
            }
            else
            {
                loc.SFP_Location_StatusId = 1;
                pot.SFP_Active = 1;
            }

            if (isForBreaking)
                pot.SFP_Active = 2;

            cfdb.SFP_POTS_DATA_SP(locationid, dtime, potno, cooltime, expdtime, actdtime, dtemp, remarks, group, bktime);
            cfdb.SaveChanges();
        }

        public void Edit_SFP(int dataid, string locationname, int potno, DateTime dtime, int cooltime, DateTime expdtime, string actualdtime, string dtemp, string remarks, bool isForBreaking, string forbreakingtime)
        {
            var sfp_ = cfdb.SFP_Pots_Data.Where(a => a.SFP_DataId == dataid).First();
            var locationid = cfdb.SFP_Param_Locations.Where(c => c.SFP_LocationName == locationname).Select(c => c.SFP_LocationId).First();
            var initiallocationid = cfdb.SFP_Param_Locations.Where(b => b.SFP_LocationId == sfp_.SFP_PrevLocationId).First();

            var loc = cfdb.SFP_Param_Locations.Where(a => a.SFP_LocationId == locationid).First();
            var pot = cfdb.SFP_Param_Pots.Where(b => b.SFP_PotId == potno).First();
            var actdtime = new DateTime(2000, 1, 1);
            var bktime = new DateTime(2000, 1, 1);

            if (forbreakingtime != "")
                bktime = Convert.ToDateTime(forbreakingtime);

            if (locationid != 136)
            {
                initiallocationid.SFP_Location_StatusId = 0;
                sfp_.SFP_PrevLocationId = locationid;
            }

            if (actualdtime != "")
            {
                actdtime = Convert.ToDateTime(actualdtime);
                loc.SFP_Location_StatusId = 0;
                pot.SFP_Active = 0;
            }
            else if (actualdtime != "" && locationid == 136)
            {
                actdtime = Convert.ToDateTime(actualdtime);
                initiallocationid.SFP_Location_StatusId = 0;
            }
            else if (actualdtime == "" && locationid == 136)
            {
                initiallocationid.SFP_Location_StatusId = 0;
            }
            else
            {
                initiallocationid.SFP_Location_StatusId = 1;
                //loc.SFP_Location_StatusId = 1;
                pot.SFP_Active = 1;
            }

            if (actdtime == new DateTime(2000, 1, 1))
            {
                sfp_.SFP_ActualDTime = null;
            }
            else
            {
                sfp_.SFP_ActualDTime = actdtime;
            }

            if (bktime == new DateTime(2000, 1, 1))
            {
                sfp_.SFP_ForBreakingDTime = null;
            }
            else
            {
                sfp_.SFP_ForBreakingDTime = bktime;
            }

            if (isForBreaking)
                pot.SFP_Active = 2;

            sfp_.SFP_LocationId = locationid;
            sfp_.SFP_PotId = potno;
            sfp_.SFP_DTime = dtime;
            sfp_.SFP_CoolTime = cooltime;
            sfp_.SFP_ExpectedDTime = expdtime;

            sfp_.SFP_DumpTemp = dtemp;
            sfp_.SFP_Remark = remarks;



            //cfdb.SFP_DATA_SP(locationid, dtime, potno, cooltime, expdtime, actdtime, dtemp, remarks);

            cfdb.SaveChanges();
        }

        public JsonResult SFP_Monitor_Location()
        {
            var sfpm = (from loc in cfdb.VWSFP_Monitor_Locations
                        orderby loc.LocationId ascending
                        where loc.LocationId < 136 || loc.LocationId > 136
                        select loc);
            return Json(sfpm, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SFP_Monitor_Pot()
        {
            var sfpm = (from loc in cfdb.VWSFP_Monitor_Pots
                        orderby loc.PotNo ascending
                        select loc);
            return Json(sfpm, JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult sfp_tabs(string partialview_name)
        {
            return PartialView(partialview_name);
        }

        public JsonResult Summary_hourly(DateTime date, int furnace)
        {
            var hr = (from hrly in cfdb.FN_SFP_MONITOR_SUMMARY(date, furnace)
                      select hrly);

            return Json(hr, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SFP_Consumables()
        {
            return View();
        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult SFP_Partial_Consumable(int GroupId)
        {
            @ViewBag.SFP_Group = GroupId;
            @ViewBag.SFP_DDATE = DateTime.Now;
            var con = (from c in cfdb.SFP_Param
                       where c.SFP_ParamGroupId == GroupId
                       select c);

            SelectList con_list = new SelectList(con, "SFP_ParamId", "SFP_Paramname");

            ViewData["con_list"] = con_list;

            return PartialView("_AddSFPConsumable");
        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult EditSFP_Partial_Consumable(int DataId)
        {
            @ViewBag.dataid = DataId;
            //ViewData["group_list"] = Group_list();

            var sfp_ = (from sfp in cfdb.VWSFP_Consumables_Data
                        where sfp.SFP_Consummable_ValId == DataId
                        select sfp).First();

            ViewBag.DateNow = sfp_.SFP_Date;
            ViewBag.Group = sfp_.SFP_ParamGroupId;
            ViewBag.Shift = sfp_.SFP_ShiftId;
            ViewBag.Param = sfp_.SFP_ParamName;
            ViewBag.ParamId = sfp_.SFP_ParamId;
            ViewBag.NumVal = sfp_.SFP_NumVal;

            return PartialView("_EditSFPConsumable");
        }

        public SelectList Consumable_list()
        {
            var pot = (from p in cfdb.SFP_Param_Pots
                       where p.SFP_Active == 1
                       orderby p.SFP_PotId ascending
                       select p);
            SelectList pot_list = new SelectList(pot, "SFP_PotId", "SFP_PotId");

            return pot_list;
        }

        public void Save_SFPConsumables(List<Consumables> items)
        {
            var cons = items;
            DateTime date;
            int shift;
            int paramid;
            decimal numval;

            for (int i = 0; i < cons.Count(); i++)
            {
                date = cons[i].date;
                shift = cons[i].shift;
                paramid = cons[i].paramid;
                numval = cons[i].numval;

                cfdb.SFP_CONSUMABLE_NUMVAL_SP(shift, paramid, date, numval);
                cfdb.SaveChanges();
            }


        }

        public class Consumables
        {
            public DateTime date { get; set; }
            public int shift { get; set; }
            public int paramid { get; set; }
            public decimal numval { get; set; }
        }

        public JsonResult Consumables_Data(int gr, string date)
        {

            var con = (from c in cfdb.VWSFP_Consumables_Data
                       where c.SFP_ParamGroupId == gr && c.MonthYear == date
                       orderby c.SFP_Date descending
                       select c);

            return Json(con, JsonRequestBehavior.AllowGet);

        }

        public JsonResult Consumables_Params(int groupid)
        {
            var param = (from p in cfdb.SFP_Param
                         where p.SFP_ParamGroupId == groupid
                         select new { p.SFP_ParamName, p.SFP_ParamId });

            return Json(param, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SFP_Targets()
        {
            return View();
        }

        public JsonResult SFP_Targets_Group(string groupname)
        {
            var target = (from t in cfdb.SFP_ParamGroup1
                          where (t.SFP_ParamGroupId >= 23 && t.SFP_ParamGroupId <= 33) || t.SFP_ParamGroupId == 37 || t.SFP_ParamGroupId == 39 || t.SFP_ParamGroupId == 40
                          select new { t.SFP_ParamGroupId, t.SFP_ParamGroup1Name });

            return Json(target, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SFP_Targets_tbl_names()
        {
            var target = (from t in cfdb.SFP_Param
                          where (t.SFP_ParamGroupId >= 23 && t.SFP_ParamGroupId <= 33) || t.SFP_ParamGroupId == 37 || t.SFP_ParamGroupId == 39 || t.SFP_ParamGroupId == 40
                          orderby t.SFP_ParamGroupId ascending
                          select new { t.SFP_ParamId, t.SFP_ParamName, t.SFP_ParamGroupId, t.SFP_Param_TypeId });

            return Json(target, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SFP_Targets_tbl_data()
        {
            var target = (from t in cfdb.VWSFP_Targets_Data
                          select new { t.SFP_ParamId, t.SFP_ParamName, t.SFP_Target_NumValue, t.SFP_Target_ValueTypeId, t.SFP_ParamGroupId, t.SFP_ParamGroup1Name });

            return Json(target, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SFP_Forecast_tbl_data(string date)
        {
            var forecast = (from f in cfdb.VWSFP_Forecast_Data
                            where f.MonthYear == date
                            select f);

            return Json(forecast, JsonRequestBehavior.AllowGet);
        }

        public void Save_SFPTargets(List<SFPTargets> items)
        {
            var target_items = items;
            int paramid;
            int group;
            decimal numval;

            for (int i = 0; i < target_items.Count; i++)
            {
                paramid = target_items[i].paramid;
                group = target_items[i].group;
                numval = target_items[i].numval;

                cfdb.SFP_NUM_TARGETVAL_SP(paramid, group, numval);
                cfdb.SaveChanges();
            }
        }

        public class SFPTargets
        {
            public int paramid { get; set; }
            public int group { get; set; }
            public decimal numval { get; set; }
        }

        public void Save_SFPForecast(List<SFPForecast> items)
        {
            var target_items = items;
            DateTime date;
            int paramid;
            int group;
            decimal numval;

            for (int i = 0; i < target_items.Count; i++)
            {
                date = target_items[i].date;
                paramid = target_items[i].paramid;
                group = target_items[i].group;
                numval = target_items[i].numval;

                cfdb.SFP_NUM_FORECASTVAL_SP(paramid, group, date, numval);
                cfdb.SaveChanges();
            }
        }

        public class SFPForecast
        {
            public DateTime date { get; set; }
            public int paramid { get; set; }
            public int group { get; set; }
            public decimal numval { get; set; }
        }

        public ActionResult SFP_OldSFP()
        {
            return View();
        }

        public JsonResult SFP_OldSFP_data(string date)
        {
            var forecast = (from f in cfdb.VWSFP_OldSFP_Data
                            where f.MonthYear == date
                            select f);

            return Json(forecast, JsonRequestBehavior.AllowGet);
        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult OldSFP_Partial()
        {
            @ViewBag.SFP_DDate = DateTime.Now;

            ViewData["weigher_list"] = Weigher_list();
            ViewData["material_list"] = Material_list();

            return PartialView("_AddOldSFPEntry");
        }

        public SelectList Weigher_list()
        {
            var weigh = (from w in cfdb.VWSFP_OldSFP_Weighers
                         select w);

            SelectList weigher_list = new SelectList(weigh, "SFP_ParamId", "SFP_ParamName");

            return weigher_list;
        }

        public SelectList Material_list()
        {
            var material = (from m in cfdb.VWSFP_OldSFP_Materials
                            select m);

            SelectList material_list = new SelectList(material, "SFP_ParamId", "SFP_ParamName");

            return material_list;
        }

        public void Add_OldSFP(DateTime date, int weigherid, int materialid)
        {
            cfdb.SFP_OLDSFP_SP(date, weigherid, materialid);
            cfdb.SaveChanges();
        }

        public JsonResult OldSFP_Data(DateTime date, int weigherid)
        {
            var val = (from m in cfdb.VWSFP_OldSFP_Data
                       where m.SFP_Date <= date && m.WeigherId == weigherid
                       group m by true into mn
                       select new { max = mn.Max(a => a.MaterialId) });

            return Json(val, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SFP_Buckets()
        {
            return View();
        }

        public JsonResult SFP_Buckets_Params()
        {
            var buckets = (from b in cfdb.SFP_Param
                           where b.SFP_ParamGroupId == 35
                           select new { b.SFP_ParamName, b.SFP_ParamId, b.SFP_ParamGroupId });
            return Json(buckets, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Buckets_Data(string date)
        {
            var buckets = (from b in cfdb.VWSFP_Buckets_Data
                           where b.MonthYear == date
                           orderby b.SFP_DTime descending
                           select b);

            return Json(buckets, JsonRequestBehavior.AllowGet);
        }

        public SelectList Bucket_list()
        {
            var bucket = (from b in cfdb.VWSFP_Buckets
                          select b);

            SelectList bucket_list = new SelectList(bucket, "SFP_ParamId", "SFP_ParamName");

            return bucket_list;
        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult SFPBuckets_Partial()
        {
            @ViewBag.SFP_DDate = DateTime.Now;

            ViewData["bucket_list"] = Bucket_list();

            return PartialView("_AddSFPBucketsEntry");
        }

        public void Save_Buckets(List<Buckets> items)
        {
            var buckets = items;
            DateTime date;
            int paramid;
            int numval;

            for (int i = 0; i < buckets.Count; i++)
            {
                date = buckets[i].date;
                paramid = buckets[i].paramid;
                numval = buckets[i].numval;

                cfdb.SFP_BUCKETS_NUMVAL_SP(paramid, date, numval);
                cfdb.SaveChanges();
            }
        }

        public void Delete_Buckets(DateTime date)
        {
            cfdb.SFP_DELETE_BUCKETS_SP(date);
            cfdb.SaveChanges();
        }

        public class Buckets
        {
            public DateTime date { get; set; }
            public int paramid { get; set; }
            public int numval { get; set; }
        }

        public SelectList Crew_list(int roletypeid)
        {
            var crew_ddl = (from c in cfdb.VWSFP_EmployeePerRole
                            where c.SFP_RoleTypeId == roletypeid
                            select c);

            SelectList crew_list = new SelectList(crew_ddl, "SFP_EmployeeId", "FullName");

            return crew_list;
        }

        public SelectList Crew_list_temp() 
        {
            var crew = (from c in cfdb.VWSFP_EmployeePerRole
                        orderby c.FullName ascending
                        select new { c.SFP_EmployeeId, c.FullName }).Distinct();

            SelectList crew_list = new SelectList(crew, "SFP_EmployeeId", "FullName");

            return crew_list;
        }

        public SelectList Crew_Default_list()
        {
            var crew = (from c in cfdb.SFP_Crew
                        select c);

            SelectList crew_list = new SelectList(crew, "SFP_CrewId", "SFP_CrewName");

            return crew_list;
        }

        public ActionResult SFP_Crew()
        {
            ViewData["crew_list"] = Crew_Default_list();
            ViewData["cre_list"] = Crew_list(1);
            ViewData["cymgr_list"] = Crew_list(2);
            ViewData["dewmgr_list"] = Crew_list(3);
            ViewData["cyopr_list"] = Crew_list(4);
            ViewData["tcopr_list"] = Crew_list(5);
            ViewData["crushopr_list"] = Crew_list(6);
            ViewData["millopr_list"] = Crew_list(7);
            ViewData["fltopr_list"] = Crew_list(8);
            ViewData["dewa_list"] = Crew_list(9);
            ViewData["dewb_list"] = Crew_list(10);
            ViewData["dewc_list"] = Crew_list(11);
            ViewData["gcopr_list"] = Crew_list(12);
            ViewData["oldsfp_list"] = Crew_list(16);
            ViewData["itdopr_list"] = Crew_list_temp();

            return View();
        }

        public PartialViewResult sfp_tabs_crew(string partialview_name)
        {
            ViewData["crew_list"] = Crew_Default_list();
            ViewData["cre_list"] = Crew_list(1);
            ViewData["cymgr_list"] = Crew_list(2);
            ViewData["dewmgr_list"] = Crew_list(3);
            ViewData["cyopr_list"] = Crew_list(4);
            ViewData["tcopr_list"] = Crew_list(5);
            ViewData["crushopr_list"] = Crew_list(6);
            ViewData["millopr_list"] = Crew_list(7);
            ViewData["fltopr_list"] = Crew_list(8);
            ViewData["dewa_list"] = Crew_list(9);
            ViewData["dewb_list"] = Crew_list(10);
            ViewData["dewc_list"] = Crew_list(11);
            ViewData["gcopr_list"] = Crew_list(12);
            ViewData["oldsfp_list"] = Crew_list(16);
            ViewData["itdopr_list"] = Crew_list_temp();

            return PartialView(partialview_name);
        }

        public JsonResult Load_CrewDefault(int crewid)
        {
            var crew = (from c in cfdb.SFP_Default_Crew
                        where c.SFP_CrewId == crewid
                        select new { c.SFP_CrewId, c.SFP_EmpId, c.SFP_Role_Type_Id });

            return Json(crew, JsonRequestBehavior.AllowGet);
        }

        public void Save_CrewDefault(List<Default_Crew> items)
        {
            var crew = items;
            int crewid;
            int roletypeid;
            int empid;

            for (int i = 0; i < crew.Count; i++)
            {
                crewid = crew[i].crewid;
                roletypeid = crew[i].roletypeid;
                empid = crew[i].empid;

                cfdb.SFP_CREWDEFAULT_SP(crewid, roletypeid, empid);
                cfdb.SaveChanges();
            }
        }

        public class Default_Crew
        {
            public int crewid { get; set; }
            public int roletypeid { get; set; }
            public int empid { get; set; }
        }

        public void Save_ShiftAssign(DateTime date, int shiftid, int crewid)
        {
            cfdb.SFP_SHIFTASSIGN_SP(date, shiftid, crewid);
            cfdb.SaveChanges();
        }

        public int getShiftAssignId(DateTime date, int shiftid, int crewid)
        {
            int shiftassignid = cfdb.SFP_Shift_AssignCrew.First(a => a.SFP_ProdDate == date && a.SFP_Shift_Id == shiftid && a.SFP_CrewId == crewid).SFP_Shift_AssignCrewId;

            return shiftassignid;
        }

        public void Save_SFP_ManPower(List<SFP_ManPower> items)
        {
            var mp = items;
            int shiftassignid;
            int roletypeid;
            int empid;

            for (int i = 0; i < mp.Count; i++) {
                shiftassignid = mp[i].shiftassignid;
                roletypeid = mp[i].roletypeid;
                empid = mp[i].empid;

                cfdb.SFP_MANPOWER_SP(shiftassignid, roletypeid, empid);
                cfdb.SaveChanges();
            }

            
        }
            
        public void Delete_Crew(int prodid) {
            cfdb.Database.ExecuteSqlCommand("DELETE FROM [SFP_Manpower] WHERE SFP_Shift_AssignCrewId = @p0", prodid);
            cfdb.SaveChanges();
        }

        public class SFP_ManPower
        {
            public int shiftassignid { get; set; }
            public int roletypeid { get; set; }
            public int empid { get; set; }
        }

        public JsonResult Load_SFP_ManPower(DateTime date, int shiftid)
        {
            var mp = (from m in cfdb.VWSFP_Manpower
                      where m.SFP_ProdDate == date && m.SFP_Shift_Id == shiftid
                      select m);

            return Json(mp, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SFP_Comments()
        {
            return View();
        }

        public JsonResult Load_SFP_Comments(DateTime date)
        {
            var SFP = (from com in cfdb.VWSFP_Comments_Data
                        where com.SFP_DTime == date
                        select com);
            return Json(SFP, JsonRequestBehavior.AllowGet);
        }

        public void Delete_SFP_Comments(DateTime date)
        {
            cfdb.Database.ExecuteSqlCommand("DELETE FROM [SFP_Comments_Data] WHERE SFP_DTime = @p0", date);
            cfdb.SaveChanges();
        }

        public void Delete_SFP_DPMComments(DateTime date, int shiftid)
        {
            cfdb.Database.ExecuteSqlCommand("DELETE FROM [SFP_Shift_DPMComment_Values] WHERE SFP_ProdDate = @p0 AND SFP_Shift_Id = @p1", date, shiftid);
            cfdb.SaveChanges();
        }

        public void Save_SFP_Comments(List<SFP_Comment> items)
        {
            var com = items;
            DateTime date;
            int paramid;
            string strval;

            for (int i = 0; i < com.Count; i++)
            {
                date = com[i].date;
                paramid = com[i].paramid;
                strval = com[i].strval;

                cfdb.SFP_COMMENTS_STRVAL_SP(paramid, date, strval);
                cfdb.SaveChanges();
            }
        }

        public class SFP_Comment
        {
            public DateTime date { get; set; }
            public int paramid { get; set; }
            public string strval { get; set; }
        }

        public JsonResult Load_SFP_DPMComments(DateTime date, int shiftid)
        {
            var SFP = (from com in cfdb.VWSFP_DPMComments
                       where com.SFP_ProdDate == date && com.SFP_Shift_Id == shiftid
                       select com);
            return Json(SFP, JsonRequestBehavior.AllowGet);
        }

        public void Save_SFP_DPMComments(List<SFP_DPMComment> items)
        {
            var com = items;
            DateTime date;
            int shiftid;
            int paramid;
            string strval;

            for (int i = 0; i < com.Count; i++)
            {
                date = com[i].date;
                shiftid = com[i].shiftid;
                paramid = com[i].paramid;
                strval = com[i].strval;

                cfdb.SFP_SHIFTDPMCOMMENTS_SP(paramid, date, shiftid, strval);
                cfdb.SaveChanges();
            }
        }

        public class SFP_DPMComment
        {
            public DateTime date { get; set; }
            public int shiftid { get; set; }
            public int paramid { get; set; }
            public string strval { get; set; }
        }
    }
}
