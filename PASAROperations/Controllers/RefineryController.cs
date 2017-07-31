using PASAROperations.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PASAROperations.Controllers
{
    public class RefineryController : Controller
    {
        //
        // GET: /Refinerycontroller/

        Models.PASAROperationEntities operationdb = new Models.PASAROperationEntities();

        public ActionResult RefineryTimelogs()
        {
            var ref_emp = (from crp in operationdb.REFTH_EmployeeRow select crp);
            SelectList emp_List = new SelectList(ref_emp, "REFTH_EmployeeRowId", "REFTH_RowNo");
            ViewData["emp_List"] = emp_List;
            return View();
        }
        public PartialViewResult RefineryCrewDefaults()
        {
            return PartialView();
        }
        public PartialViewResult Refinery_MachineDowntime_Monitoring()
        {
            @ViewBag.RefDowntime = DateTime.Now;
            return PartialView();
        }
        public PartialViewResult RefineryProd()
        {
            return PartialView();
        }
        public PartialViewResult Refinery_Prod_Activity()
        {
            var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
            SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo");
            ViewData["blocklist"] = blocks;
            ViewBag.timenow = DateTime.Now;
            return PartialView();
        }


        //----------------------------partial events---------------------------//
        public PartialViewResult refinerytimelog_tabs(string partialview_name)
        {

            if (partialview_name == "Refinery_manpower_electrolysis" || partialview_name == "Refinery_crew_electrolysis")
            {

                var roletype_result2 = (from rt in operationdb.REFTH_RoleType
                                        where rt.REFTH_RoleGroupId == 2
                                        orderby rt.REFTH_RoleTypeId ascending
                                        select rt).ToList();

                return PartialView(partialview_name, roletype_result2);

            }
            else
            {
                var roletype_result1 = (from rt in operationdb.REFTH_RoleType
                                        where rt.REFTH_RoleGroupId == 1
                                        orderby rt.REFTH_RoleTypeId ascending
                                        select rt).ToList();

                var ref_crop = (from crp in operationdb.REFTH_BlockPairs select crp);
                SelectList block_List = new SelectList(ref_crop, "REFTH_BlockPairId", "REFTH_BlockPair");
                ViewData["blockpairlist"] = block_List;
                var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
                SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo");
                ViewData["blocklist"] = blocks;
                ViewBag.timenow = DateTime.Now;
                return PartialView(partialview_name, roletype_result1);
            }

        }

        public PartialViewResult load_refinery_add_activity()
        {

            @ViewBag.RefStartTime = DateTime.Now;

            return PartialView("Refinery_Add_Activity");
        }


        //public PartialViewResult load_refaddmachine()
        //{
        //    return PartialView("Refinery_machine_add");
        //}

        public PartialViewResult load_refinery_add_csmlog()
        {

            @ViewBag.RefStartTime = DateTime.Now;

            return PartialView("Refinery_Add_CSMlog");
        }
        public PartialViewResult load_refinery_add_crop()
        {
            var ref_crop = (from crp in operationdb.REFTH_BlockPairs select crp);
            SelectList block_List = new SelectList(ref_crop, "REFTH_BlockPairId", "REFTH_BlockPair");
            ViewData["blockpairlist"] = block_List;
            @ViewBag.RefStartTime = DateTime.Now;

            return PartialView("Refinery_cropshorts_add");
        }

        public ActionResult edit_cropshorts_data(int actid)
        {
            var editact = (from act in operationdb.VWREFTH_CROPS where act.REFTH_CropId == actid select act).First();

            ViewBag.starttime = editact.REFTH_DateStart == null ? default(DateTime) : editact.REFTH_DateStart;
            ViewBag.endtime = editact.REFTH_DateEnd == null ? default(DateTime) : editact.REFTH_DateEnd;
            ViewBag.REFTH_CropNo = editact.REFTH_CropNo;
            ViewBag.cropid = editact.REFTH_CropId;
            ViewBag.REFTH_ElapsedKAH = editact.REFTH_ElapsedKAH;


            var ref_crop = (from crp in operationdb.REFTH_BlockPairs select crp);
            SelectList block_List = new SelectList(ref_crop, "REFTH_BlockPairId", "REFTH_BlockPair", editact.REFTH_BlockPairId);
            ViewData["blockpairlist"] = block_List;


            return PartialView("Refinery_cropshorts_edit");

        }
        public PartialViewResult load_partial_ADDnewdowntime()
        {
            //machine code
            var ref_machinelist = (from machlist in operationdb.REFTH_Machines orderby machlist.REFTH_MachineDesc descending select machlist);
            SelectList machine_list = new SelectList(ref_machinelist, "REFTH_MachineId", "REFTH_MachineDesc");
            ViewData["machine_list"] = machine_list;
            //reason code/trouble
            var ref_reasoncode = (from reslist in operationdb.REFTH_MDReasonCodes orderby reslist.REFTH_MDReasonCode select reslist);
            SelectList reason_list = new SelectList(ref_reasoncode, "REFTH_MDReasonId", "REFTH_MDReasonCode");
            ViewData["reason_list"] = reason_list;
            //dt time/date

            var ref_resplist = (from resplist in operationdb.REFTH_MDResponsible select resplist);
            SelectList responsible_list = new SelectList(ref_resplist, "REFTH_ResponsibleId", "REFTH_ResponsibleDesc");
            ViewData["responsible_list"] = responsible_list;

            @ViewBag.RefDowntime = DateTime.Now;
            return PartialView("Refinery_AddDowntime");
        }
        public PartialViewResult load_partial_ADDnewreason()
        {
            @ViewBag.RefDowntime = DateTime.Now;
            return PartialView("Refinery_DowntimeReasons");
        }

        public ActionResult edit_ref_downtimerecord(int action_id)
        {
            var edit_downtime = (from dt in operationdb.VWREFTH_MachineDowntime where dt.REFTH_MachineDowntimeId == action_id select dt).First();
            ViewBag.hide_mid = edit_downtime.REFTH_MachineDowntimeId;
            ViewBag.ref_curdt = edit_downtime.REFTH_MDDate == null ? default(DateTime) : edit_downtime.REFTH_MDDate;
            //ViewBag.ref_machid = edit_downtime.REFTH_MDMachineId;
            ViewBag.ref_machcode = edit_downtime.REFTH_MachineCode;
            ViewBag.ref_stopt = edit_downtime.REFTH_MDStartTime == null ? default(DateTime) : edit_downtime.REFTH_MDStartTime;
            ViewBag.ref_startt = edit_downtime.REFTH_MDEndTime == null ? default(DateTime) : edit_downtime.REFTH_MDEndTime;
            var ref_dtmin1 = edit_downtime.REFTH_MDDowntimeMin;
            ViewBag.ref_rem = edit_downtime.REFTH_MDRemarks;
            //var ref_res = edit_downtime.REFTH_ResponsibleId;
            ViewBag.ref_dtmin = Math.Round(Convert.ToDecimal(ref_dtmin1), 2);
            ViewBag.ref_codedesc = edit_downtime.REFTH_MDReasonDesc;
            int mcode = edit_downtime.REFTH_MDMachineId;
            //machine code
            var ref_machinelist = (from machlist in operationdb.REFTH_Machines select machlist);
            SelectList machine_lists = new SelectList(ref_machinelist, "REFTH_MachineId", "REFTH_MachineDesc", edit_downtime.REFTH_MDMachineId);
            ViewData["machine_lists"] = machine_lists;
            if (mcode == 4)
            {
                mcode = 3;
            }
            var ref_reasonlist = (from mdm in operationdb.REFTH_MDReasonCodes where mdm.REFTH_MachineId == mcode select mdm);
            SelectList ref_reasonlist1 = new SelectList(ref_reasonlist, "REFTH_MDReasonId", "REFTH_MDReasonCode", edit_downtime.REFTH_MDReasonId);
            ViewData["ref_reasonlist1"] = ref_reasonlist1;


            return PartialView("Refinery_Downtime_Edit");

        }
        public JsonResult edit_resp_dt(int dt_id_1)
        {
            var editresp = (from resplist in operationdb.VWREFTH_MachineDowntimeResponsible where resplist.REFTH_MachineDowntimeId == dt_id_1 select resplist);
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(editresp, JsonRequestBehavior.AllowGet);
        }
        public PartialViewResult refinerytimelog_tabs_shorts(string partialview_name)
        {
            return PartialView(partialview_name);
        }
        public PartialViewResult load_popup_rppeditdate(int key_id, string monthyear)
        {
            var ref_ppm_counter = (from crp in operationdb.VWREFTH_ProdPlanMonth where (crp.REFTH_BlockNo1 == key_id || crp.REFTH_BlockNo2 == key_id) && (crp.MonthYear == monthyear) select crp).Count();
            if (ref_ppm_counter > 0)
            {
                var ref_ppm = (from crp in operationdb.VWREFTH_ProdPlanMonth where (crp.REFTH_BlockNo1 == key_id || crp.REFTH_BlockNo2 == key_id) && (crp.MonthYear == monthyear) select crp).First();
                ViewBag.RefStartTime = ref_ppm.REFTH_DateStart == null ? default(DateTime) : ref_ppm.REFTH_DateStart;
                return PartialView("Refinery_ProdplanMonthEditDate");
            }
            else
            {
                ViewBag.RefStartTime = DateTime.Now;
                return PartialView("Refinery_ProdplanMonthEditDate");
            }
        }

        public ActionResult edit_prodact_data(int actid)
        {
            var editact = (from act in operationdb.VWREFTH_ProductionData where act.REFTH_PPId == actid select act).First();

            ViewBag.starttime = editact.REFTH_ProductionStartDate == null ? default(DateTime) : editact.REFTH_ProductionStartDate;
            ViewBag.endtime = editact.REFTH_ProductionEndDate == null ? default(DateTime) : editact.REFTH_ProductionEndDate;
            ViewBag.REFTH_BlockId = editact.REFTH_BlockId;
            ViewBag.REFTH_PPcodeId = editact.REFTH_PPcodeId;
            ViewBag.REFTH_ActCode = editact.REFTH_ActCode;
            ViewBag.REFTH_PPId = editact.REFTH_PPId;
            ViewBag.REFTH_Remarks = editact.REFTH_Remarks;

            var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
            SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo", editact.REFTH_BlockId);
            ViewData["blockpairlist"] = blocks;

            var activitycode_result = (from rp in operationdb.REFTH_PP_Actcode orderby rp.REFTH_ActCodeDesc ascending select rp).ToList();
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return PartialView("Refinery_prodact_edit", activitycode_result);
        }

        public PartialViewResult add_prodact_data()
        {
            var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
            SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo");
            ViewData["blockpairlist"] = blocks;
            @ViewBag.RefStartTime = DateTime.Now;

            var activitycode_result = (from rp in operationdb.REFTH_PP_Actcode orderby rp.REFTH_ActCodeDesc ascending select rp).ToList();
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return PartialView("Refinery_prodact_add", activitycode_result);
        }
        public ActionResult edit_prodact_direct_data_(int key_id, DateTime sdate, Nullable<int> thisblock)
        {
            if (thisblock > 0)
            {
                var arr1 = (from act in operationdb.VWREFTH_ProductionData
                            where act.REFTH_ProductionStartDate.Year == sdate.Year && act.REFTH_ProductionStartDate.Month == sdate.Month &&
                 act.REFTH_ProductionStartDate.Day == sdate.Day && act.REFTH_BlockId == thisblock
                            select act);
                int i = 0;
                foreach (var item in arr1)
                {
                    if (i == key_id)
                    {
                        var myid = item.REFTH_PPId;
                        var editact = (from act in operationdb.VWREFTH_ProductionData where act.REFTH_PPId == myid select act).First();

                        ViewBag.starttime = editact.REFTH_ProductionStartDate == null ? default(DateTime) : editact.REFTH_ProductionStartDate;
                        ViewBag.endtime = editact.REFTH_ProductionEndDate == null ? default(DateTime) : editact.REFTH_ProductionEndDate;
                        ViewBag.REFTH_BlockId = editact.REFTH_BlockId;
                        ViewBag.REFTH_PPcodeId = editact.REFTH_PPcodeId;
                        ViewBag.REFTH_ActCode = editact.REFTH_ActCode;
                        ViewBag.REFTH_PPId = editact.REFTH_PPId;
                        ViewBag.REFTH_Remarks = editact.REFTH_Remarks;

                        var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
                        SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo", editact.REFTH_BlockId);
                        ViewData["blockpairlist"] = blocks;
                    }
                    i++;
                }
                var activitycode_result = (from rp in operationdb.REFTH_PP_Actcode orderby rp.REFTH_ActCodeDesc ascending select rp).ToList();
                operationdb.Configuration.ProxyCreationEnabled = false;
                operationdb.Configuration.LazyLoadingEnabled = false;
                return PartialView("Refinery_prodact_edit", activitycode_result);
            }
            else
            {
                var arr2 = (from act in operationdb.VWREFTH_ProductionData
                            where act.REFTH_ProductionStartDate.Year == sdate.Year && act.REFTH_ProductionStartDate.Month == sdate.Month &&
                 act.REFTH_ProductionStartDate.Day == sdate.Day
                            select act);
                int i = 0;
                foreach (var item in arr2)
                {
                    if (i == key_id)
                    {
                        var myid = item.REFTH_PPId;
                        var editact = (from act in operationdb.VWREFTH_ProductionData where act.REFTH_PPId == myid select act).First();

                        ViewBag.starttime = editact.REFTH_ProductionStartDate == null ? default(DateTime) : editact.REFTH_ProductionStartDate;
                        ViewBag.endtime = editact.REFTH_ProductionEndDate == null ? default(DateTime) : editact.REFTH_ProductionEndDate;
                        ViewBag.REFTH_BlockId = editact.REFTH_BlockId;
                        ViewBag.REFTH_PPcodeId = editact.REFTH_PPcodeId;
                        ViewBag.REFTH_ActCode = editact.REFTH_ActCode;
                        ViewBag.REFTH_PPId = editact.REFTH_PPId;
                        ViewBag.REFTH_Remarks = editact.REFTH_Remarks;

                        var ref_block = (from bl in operationdb.REFTH_Blocks select bl);
                        SelectList blocks = new SelectList(ref_block, "REFTH_BlockId", "REFTH_BlockNo", editact.REFTH_BlockId);
                        ViewData["blockpairlist"] = blocks;
                    }
                    i++;
                }
                var activitycode_result = (from rp in operationdb.REFTH_PP_Actcode orderby rp.REFTH_ActCodeDesc ascending select rp).ToList();
                operationdb.Configuration.ProxyCreationEnabled = false;
                operationdb.Configuration.LazyLoadingEnabled = false;
                return PartialView("Refinery_prodact_edit", activitycode_result);
            }
        }


        //-----------------------load_data events----------------------------------//

        public JsonResult load_ref_employee(int deptid)
        {

            var emp_result1 = (from er in operationdb.VWREFTH_Employee where er.DepartmentId == deptid orderby er.Fullname ascending select new { EmployeeId = er.EmployeeId, Fullname = er.Fullname });

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(emp_result1, JsonRequestBehavior.AllowGet);

        }

        public JsonResult load_ref_shorts_row(int row_emp)
        {

            var select_rows = (from bl in operationdb.VWREF_ActiveBlocks where bl.REFTH_RowId == row_emp select bl);

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;

            return Json(select_rows, JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_ref_manpower_data(DateTime proddate, int shiftId, int rolegroup)
        {
            var select_val = (from rm in operationdb.VWREFTH_Manpower where rm.REFTH_ProductionDate == proddate && rm.REFTH_ShiftId == shiftId && rm.REFTH_RoleGroup_Id == rolegroup select rm);

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;

            return Json(select_val, JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_crew_select()
        {
            var select_val = (from cs in operationdb.REFTH_Crew select cs);

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;

            return Json(select_val, JsonRequestBehavior.AllowGet);

        }

        public JsonResult load_ref_default_manpower(int default_crew)
        {
            var select_default = (from rm in operationdb.VWREFTH_DefaultCrew where rm.REFTH_CrewId == default_crew select rm);

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;

            return Json(select_default, JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_ref_crewlist_manpower(int default_crew)
        {
            var select_val = (from rm in operationdb.VWREFTH_DefaultCrew where rm.REFTH_CrewId == default_crew select rm);

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;

            return Json(select_val, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ref_load_shorts_employeerow()
        {
            var query_row = (from qr in operationdb.VWREFTH_EmployeeRow select qr);

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;

            return Json(query_row, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ref_shorts_load_data(DateTime proddate, int shiftId, int row_emp)
        {
            var query_row = (from qr in operationdb.VWREFTH_Shorts where qr.REFTH_ProductionDate == proddate && qr.REFTH_ShiftId == shiftId && qr.REFTH_RowNo == row_emp select qr);

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;

            return Json(query_row, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ref_shorts_Crop_load_data(DateTime proddate, int shiftId, int row_emp)
        {
            var query_row = (from qr in operationdb.VWREFTH_Shorts_Crop where qr.REFTH_ProductionDate == proddate && qr.REFTH_ShiftId == shiftId && qr.REFTH_RowNo == row_emp select qr);

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;

            return Json(query_row, JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_data_ref_crop(string date)
        {
            var query_crop = from crp in operationdb.VWREFTH_CROPS where crp.MonthYear == date orderby crp.REFTH_CropId descending select crp;
            return Json(query_crop, JsonRequestBehavior.AllowGet);

        }
        public JsonResult load_data_ref_crop_nofilter()
        {
            var query_crop = from crp in operationdb.VWREFTH_CROPS orderby crp.REFTH_DateStart ascending select crp;
            return Json(query_crop, JsonRequestBehavior.AllowGet);

        }
        public JsonResult load_data_ref_crop_sdate(DateTime sdate, int blockid, string monthyear)
        {
            var query_crop = from crp in operationdb.VWREFTH_CROPS
                             where crp.REFTH_DateStart.Year == sdate.Year && crp.REFTH_DateStart.Month == sdate.Month
                             && crp.REFTH_DateStart.Day == sdate.Day && crp.REFTH_BlockPairId == blockid && crp.MonthYear == monthyear
                             orderby crp.REFTH_CropId descending
                             select crp;
            return Json(query_crop, JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_data_ref_crop_block(int blockid, string monthyear)
        {
            var query_crop = from crp in operationdb.VWREFTH_CROPS
                             where crp.REFTH_BlockPairId == blockid && crp.MonthYear == monthyear
                             orderby crp.REFTH_CropId descending
                             select crp;
            return Json(query_crop, JsonRequestBehavior.AllowGet);
        }
        //Machine Downtime Monitoring
        public JsonResult load_allMDMonitoring()
        {
            var machine_downtime_data = (from mdm in operationdb.VWREFTH_MachineDowntime orderby mdm.REFTH_MachineDowntimeId descending select mdm);
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(machine_downtime_data, JsonRequestBehavior.AllowGet);

        }


        public JsonResult load_allMachineDowntimeFilter(DateTime dt_date)
        {

            var machine_downtime_data = from mdm in operationdb.VWREFTH_MachineDowntime where mdm.REFTH_MDDate.Year == dt_date.Year && mdm.REFTH_MDDate.Month == dt_date.Month && mdm.REFTH_MDDate.Day == dt_date.Day orderby mdm.REFTH_MachineDowntimeId descending select mdm;
            return Json(machine_downtime_data, JsonRequestBehavior.AllowGet);

        }
        public JsonResult ref_loadallreason_dt()
        {

            var ref_reasonlist = from mdm in operationdb.REFTH_MDReasonCodes select mdm;
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(ref_reasonlist, JsonRequestBehavior.AllowGet);

        }

        public JsonResult load_block_prod_plan_month()
        {
            var query_crop = from crp in operationdb.REFTH_Blocks orderby crp.REFTH_BlockId select crp;
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(query_crop, JsonRequestBehavior.AllowGet);
        }
        public JsonResult load_data_prod_plan_month(string monthyear)
        {
            var query_crop = from crp in operationdb.VWREFTH_ProdPlanMonth where crp.MonthYear == monthyear orderby crp.REFTH_BlockPairId select crp;
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(query_crop, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Refinery_ActivityCode(string actcode_param)
        {

            var ActCode_i = (from rp in operationdb.REFTH_PP_Actcode where rp.REFTH_ActCode == actcode_param select new { rp.REFTH_ActCodeDesc, rp.REFTH_PPcodeId, rp.REFTH_ActCode, rp.REFTH_Style_Color }).FirstOrDefault();

            return Json(ActCode_i, JsonRequestBehavior.AllowGet);
        }
        public JsonResult load_data_prod_act()
        {
            var query_crop = from crp in operationdb.VWREFTH_ProductionData orderby crp.REFTH_PPId descending select crp;
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(query_crop, JsonRequestBehavior.AllowGet);
        }
        public JsonResult load_data_prod_act_bydate(DateTime date_val, string monthyear, int block_val)
        {
            var query_crop = from crp in operationdb.VWREFTH_ProductionData
                             where crp.REFTH_ProductionStartDate.Year == date_val.Year &&
                                 crp.REFTH_ProductionStartDate.Month == date_val.Month && crp.REFTH_ProductionStartDate.Day == date_val.Day
                                 && crp.MonthYear == monthyear && crp.REFTH_BlockId == block_val
                             orderby crp.REFTH_PPId descending
                             select crp;
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(query_crop, JsonRequestBehavior.AllowGet);
        }
        public JsonResult load_data_prod_act_byblock(int block_val, string monthyear)
        {
            var query_crop = from crp in operationdb.VWREFTH_ProductionData
                             where crp.REFTH_BlockId == block_val && crp.MonthYear == monthyear
                             orderby crp.REFTH_PPId descending
                             select crp;
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(query_crop, JsonRequestBehavior.AllowGet);
        }
        public JsonResult load_data_prod_act_bymonthyear(string monthyear)
        {
            var query_crop = from crp in operationdb.VWREFTH_ProductionData
                             where crp.MonthYear == monthyear
                             orderby crp.REFTH_PPId descending
                             select crp;
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(query_crop, JsonRequestBehavior.AllowGet);
        }


        //plan data 
        public JsonResult get_productionplan_graphdata(DateTime select_date)
        {
            var qry = from gp in operationdb.VWREFTH_ProductionData
                      where
                          gp.REFTH_ProductionStartDate.Year == select_date.Year && gp.REFTH_ProductionStartDate.Month == select_date.Month
                          && gp.REFTH_ProductionStartDate.Day == select_date.Day
                      select gp;

            return Json(qry, JsonRequestBehavior.AllowGet);
        }

        //plan data
        public JsonResult get_productionplan_graphdatablock(DateTime select_date, int thisblock)
        {
            var qry = from gp in operationdb.VWREFTH_ProductionData
                      where
                          gp.REFTH_ProductionStartDate.Year == select_date.Year && gp.REFTH_ProductionStartDate.Month == select_date.Month &&
                          gp.REFTH_ProductionStartDate.Day == select_date.Day && gp.REFTH_BlockId == thisblock
                      select gp;

            return Json(qry, JsonRequestBehavior.AllowGet);
        }

        //Actual data
        public JsonResult get_productionplan_graphdata_Actual(DateTime select_date)
        {
            var qry = from gp in operationdb.VWREFTH_Production_Actual_Data
                      where
                          gp.REFTH_ProductionStartDate.Year == select_date.Year && gp.REFTH_ProductionStartDate.Month == select_date.Month
                          && gp.REFTH_ProductionStartDate.Day == select_date.Day
                      select gp;

            return Json(qry, JsonRequestBehavior.AllowGet);
        }

        //Actual Data
        public JsonResult get_productionplan_graphdatablock_Actual(DateTime select_date, int thisblock)
        {
            var qry = from gp in operationdb.VWREFTH_Production_Actual_Data
                      where
                          gp.REFTH_ProductionStartDate.Year == select_date.Year && gp.REFTH_ProductionStartDate.Month == select_date.Month &&
                          gp.REFTH_ProductionStartDate.Day == select_date.Day && gp.REFTH_BlockId == thisblock
                      select gp;

            return Json(qry, JsonRequestBehavior.AllowGet);
        }

        public JsonResult get_productionplan_dataweek(string thisdate)
        {
            var qry = from gp in operationdb.VWREFTH_ProductionData where gp.MonthYear == thisdate select gp;

            return Json(qry, JsonRequestBehavior.AllowGet);
        }

        //------------------------data manipulation events(save,update,delete)------------------------------//

        public class manpower_ref
        {

            public DateTime proddate { get; set; }
            public int shiftId { get; set; }
            public int roletypeId { get; set; }
            public int empId { get; set; }
            public int roleGroupId { get; set; }
            public int crew_default { get; set; }

        }

        public void save_ref_manpower(List<manpower_ref> items)
        {
            var i = items;
            DateTime proddate;
            int shiftId;
            int roletypeId;
            int empId;
            int roleGroupId;
            int crew_default;

            for (int x = 0; x < i.Count; x++)
            {
                proddate = i[x].proddate;
                shiftId = i[x].shiftId;
                roletypeId = i[x].roletypeId;
                empId = i[x].empId;
                roleGroupId = i[x].roleGroupId;
                crew_default = i[x].crew_default;

                operationdb.REFTH_MANPOWER_SP(proddate, shiftId, roletypeId, empId, roleGroupId, crew_default);
                operationdb.SaveChanges();
            }
        }

        public class default_manpower_ref
        {
            public int cd_roleGroupId { get; set; }
            public int cd_roletypeId { get; set; }
            public int cd_default_crew { get; set; }
            public int cd_empId { get; set; }
        }

        public void save_ref_default_manpower(List<default_manpower_ref> items)
        {
            var i = items;
            int cd_roleGroupId;
            int cd_roletypeId;
            int cd_default_crew;
            int cd_empId;

            for (int x = 0; x < i.Count; x++)
            {
                cd_roleGroupId = i[x].cd_roleGroupId;
                cd_roletypeId = i[x].cd_roletypeId;
                cd_default_crew = i[x].cd_default_crew;
                cd_empId = i[x].cd_empId;

                operationdb.REFTH_CREWDEFAULT_SP(cd_default_crew, cd_roletypeId, cd_empId, cd_roleGroupId);
                operationdb.SaveChanges();
            }
        }


        public class ref_shorts_var
        {
            public DateTime prodate { get; set; }
            public int shiftno { get; set; }
            public int passno { get; set; }
            public int blockId { get; set; }
            public int row_emp { get; set; }
            public int cellno { get; set; }
            public Nullable<int> short_count { get; set; }

        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public void save_ref_shorts(List<ref_shorts_var> items)
        {
            var sh = items;
            DateTime prodate;
            int shiftno;
            int passno;
            int blockId;
            int row_emp;
            int cellno;
            Nullable<int> short_count;

            for (int s = 0; s < sh.Count; s++)
            {
                prodate = sh[s].prodate;
                shiftno = sh[s].shiftno;
                passno = sh[s].passno;
                blockId = sh[s].blockId;
                row_emp = sh[s].row_emp;
                cellno = sh[s].cellno;
                short_count = sh[s].short_count;

                //save shorts
                operationdb.REFTH_SHORTS_SP(prodate, shiftno, passno, blockId, row_emp, cellno, short_count);
                //operationdb.SaveChanges();

                //save shortscrops
                //operationdb.REFTH_SHORTSCROP_SP(prodate, shiftno, blockId, row_emp, short_count);
                //operationdb.SaveChanges();

                if (short_count == null)
                {
                    //Delete
                    var shorts_del = operationdb.REFTH_Shorts.Where(a => a.REFTH_ProductionDate == prodate && a.REFTH_ShiftId == shiftno && a.REFTH_PassNo == passno
                        && a.REFTH_BlockId == blockId && a.REFTH_RowNo == row_emp && a.REFTH_CellNo == cellno).First();

                    operationdb.REFTH_Shorts.Remove(shorts_del);
                    //operationdb.SaveChanges();
                }
            }

            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            operationdb.SaveChanges();
        }


        public class ref_shorts_crop_var
        {
            public DateTime pdate { get; set; }
            public int shiftn { get; set; }
            public int blockno { get; set; }
            public int row_id { get; set; }
            public Nullable<int> short_crop { get; set; }
        }

        public void save_ref_shortsCrop(List<ref_shorts_crop_var> items)
        {

            var sc = items;
            DateTime pdate;
            int shiftn;
            int blockno;
            int row_id;
            Nullable<int> short_crop;

            for (int t = 0; t < sc.Count; t++)
            {
                pdate = sc[t].pdate;
                shiftn = sc[t].shiftn;
                blockno = sc[t].blockno;
                row_id = sc[t].row_id;
                short_crop = sc[t].short_crop;

                operationdb.REFTH_SHORTSCROP_SP(pdate, shiftn, blockno, row_id, short_crop);
                operationdb.SaveChanges();

                if (short_crop == null)
                {
                    //Delete
                    var shorts_del = operationdb.REFTH_Shorts_Crop.Where(a => a.REFTH_ProductionDate == pdate && a.REFTH_ShiftId == shiftn
                        && a.REFTH_BlockId == blockno && a.REFTH_RowNo == row_id).First();

                    operationdb.REFTH_Shorts_Crop.Remove(shorts_del);
                    operationdb.SaveChanges();

                }

            }

        }

        public void add_ref_crop(int blockid, int cropid, DateTime start_date, Nullable<DateTime> end_date, Nullable<decimal> elapsedKAH_crop, Nullable<int> crop)
        {
            operationdb.REFTH_CROPS_SP(blockid, cropid, start_date, end_date, elapsedKAH_crop, crop);
            operationdb.SaveChanges();

        }
        public void edit_ref_crop(int blockid, int cropid, DateTime start_date, Nullable<DateTime> end_date, Nullable<decimal> elapsedKAH_crop, int crop)
        {
            operationdb.REFTH_CROPS_SP(blockid, cropid, start_date, end_date, elapsedKAH_crop, crop);
            operationdb.SaveChanges();
        }
        public void delete_cropshorts_data(int actid)
        {
            //Delete
            var crop_del = operationdb.REFTH_Crops.Where(a => a.REFTH_CropId == actid).First();
            operationdb.REFTH_Crops.Remove(crop_del);
            operationdb.SaveChanges();
        }

        //mddate,machineid,reasonid,startTime,endTime,mddowntimemin,mdremarks,mdresponsibility
        //public void ref_savedowntime(DateTime current_dt, int ref_mid, int ref_resid, DateTime stop_dt, DateTime start_dt, int ref_dtmin, string ref_rem, string ref_resp)
        //{
        //    operationdb.REFTH_MachineDowntime_SP(current_dt, ref_mid, ref_resid, stop_dt, start_dt, ref_dtmin, ref_rem, ref_resp);
        //    operationdb.SaveChanges();

        //}
        public JsonResult edited_ref_downtimerecord(int ref_hide_id, DateTime editcurrent_dt, int ref_machineid, int ref_cnumid, DateTime edittstop_dt, DateTime edittstart_dt, Decimal ref_dtminsid, string ref_remarksid, int ref_respid)
        {

            var resp_del = operationdb.REFTH_MachineDowntimeResponsible.Where(a => a.REFTH_MachineDowntimeId == ref_hide_id).First();
            operationdb.REFTH_MachineDowntimeResponsible.Remove(resp_del);

            var ret_edit=operationdb.REFTH_MachineDowntime_SP(ref_hide_id, editcurrent_dt, ref_machineid, ref_cnumid, edittstop_dt, edittstart_dt, ref_dtminsid, ref_remarksid, ref_respid);
            return Json(ret_edit, JsonRequestBehavior.AllowGet);

        }
        public void delete_downtime_data(int action_id)
        {
            //Delete
            var dt_del = operationdb.REFTH_MachineDowntime.Where(a => a.REFTH_MachineDowntimeId == action_id).First();
            operationdb.REFTH_MachineDowntime.Remove(dt_del);

            var resps_del = operationdb.Database.ExecuteSqlCommand("Delete from dbo.REFTH_MachineDowntimeResponsible where REFTH_MachineDowntimeId = " + action_id + "");
            operationdb.SaveChanges();
        }

        public JsonResult ref_ifExistCode(string reason_code)
        {

            var rscode = (from mdm in operationdb.REFTH_MDReasonCodes where mdm.REFTH_MDReasonCode == reason_code select mdm).Count();
            if (rscode > 0)
            {
                var rscode1 = (from mdm in operationdb.REFTH_MDReasonCodes where mdm.REFTH_MDReasonCode == reason_code select mdm).First();
                operationdb.Configuration.ProxyCreationEnabled = false;
                operationdb.Configuration.LazyLoadingEnabled = false;
                return Json(rscode1, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var rscode1 = (from mdm in operationdb.REFTH_MDReasonCodes where mdm.REFTH_MDReasonCode == reason_code select mdm);
                operationdb.Configuration.ProxyCreationEnabled = false;
                operationdb.Configuration.LazyLoadingEnabled = false;
                return Json(rscode1, JsonRequestBehavior.AllowGet);
            }
        }
        //public void ref_savereason(string ref_rcode, string ref_rcodedesc, Nullable<int> rid)
        //{
        //    operationdb.REFTH_MDReasonCodes_SP(ref_rcode, ref_rcodedesc, rid);
        //    operationdb.SaveChanges();

        //}
        //New
        public JsonResult ref_loadallreason_dtime(int mid_)
        {
            if (mid_ == 4)
            {
                mid_ = 3;
            }
            var ref_reasonlist = from mdm in operationdb.VWREFTH_ReasonCode_Resposible where mdm.REFTH_MachineId == mid_ select mdm;
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(ref_reasonlist, JsonRequestBehavior.AllowGet);

        }

        public ActionResult edit_ref_downtimereason(int actionid_)
        {
            var edit_resdowntime = (from dt in operationdb.REFTH_MDReasonCodes where dt.REFTH_MDReasonId == actionid_ select dt).First();
            ViewBag.ref_mdreasoncode = edit_resdowntime.REFTH_MDReasonCode;
            ViewBag.ref_mdreasondesc = edit_resdowntime.REFTH_MDReasonDesc;
            ViewBag.ref_mdreasonid = edit_resdowntime.REFTH_MDReasonId;
            ViewBag.ref_mdmachineid = edit_resdowntime.REFTH_MachineId;
            var edit_responsibleid = edit_resdowntime.REFTH_ResponsibleId;

            var edit_responslist = (from resplist in operationdb.REFTH_MDResponsible select resplist);
            SelectList respons_list = new SelectList(edit_responslist, "REFTH_ResponsibleId", "REFTH_ResponsibleDesc", edit_responsibleid);
            ViewData["respons_list"] = respons_list;

            return PartialView("Refinery_Edit_Reason");

        }
        public JsonResult trigger_select(int mid_)
        {
            if (mid_ == 4)
            {
                mid_ = 3;
            }
            var ref_reasoncode = (from reslist in operationdb.VWREFTH_Max_MCode where reslist.REFTH_MachineId == mid_ orderby reslist.REFTH_MDReasonCode ascending select reslist);
            SelectList reason_list = new SelectList(ref_reasoncode, "REFTH_MDReasonId", "REFTH_MDReasonCode", ref_reasoncode);
            ViewData["reason_list"] = reason_list;

            return Json(ref_reasoncode, JsonRequestBehavior.AllowGet);

        }
        public JsonResult ref_loadallreason_dtime_def()
        {

            var ref_reasonlist = from mdm in operationdb.VWREFTH_ReasonCode_Resposible select mdm;
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(ref_reasonlist, JsonRequestBehavior.AllowGet);

        }
        public JsonResult trigger_machinecode_select(int mid_code)
        {

            var ref_reasonlist_desc = from mdm in operationdb.REFTH_Machines where mdm.REFTH_MachineId == mid_code select mdm;
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(ref_reasonlist_desc, JsonRequestBehavior.AllowGet);

        }
        public JsonResult trans_codeto_label(int ids)
        {

            var code_trans_label = from mdm in operationdb.VWREFTH_ReasonCode_Resposible where mdm.REFTH_MDReasonId == ids select mdm;
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(code_trans_label, JsonRequestBehavior.AllowGet);


        }
        public class table_savedowntime
        {

            public int mid_ { get; set; }
            public int resp_id1 { get; set; }
        }
        public void ref_tablesavedowntime(List<table_savedowntime> container)
        {
            var cont_lng = container;
            int mid_;
            int resp_id1;


            for (int i = 0; i < cont_lng.Count; i++)
            {
                mid_ = cont_lng[i].mid_;
                resp_id1 = cont_lng[i].resp_id1;

                operationdb.REFTH_MachineDowntimeResp_SP(mid_, resp_id1);
                operationdb.SaveChanges();
            }
        }

        public JsonResult ref_savedowntime(int mdid, DateTime current_dt, int ref_mid, int ref_resid, DateTime stop_dt, DateTime start_dt, Decimal mins_val, string ref_rem, int resp_id)
        {
            var ret = operationdb.REFTH_MachineDowntime_SP(mdid, current_dt, ref_mid, ref_resid, stop_dt, start_dt, mins_val, ref_rem, resp_id);
            return Json(ret, JsonRequestBehavior.AllowGet);
        }
        public void ref_edit_new_reason_(string edit_code, string edit_desc, int edit_codeid, int edit_machid, int edit_respid)
        {
            operationdb.REFTH_MDReasonCodes_SP(edit_code, edit_desc, edit_codeid, edit_machid, edit_respid);
            operationdb.SaveChanges();
        }
        public JsonResult trigger_machinecode_select_edit(int mid_code)
        {

            var ref_reasonlist_desc = from mdm in operationdb.REFTH_MDReasonCodes where mdm.REFTH_MDReasonId == mid_code select mdm;
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(ref_reasonlist_desc, JsonRequestBehavior.AllowGet);

        }
        public PartialViewResult AddTreason_Select()
        {
            var ref_tmachinelist = (from machlist in operationdb.REFTH_Machines select machlist);
            SelectList machine_lists = new SelectList(ref_tmachinelist, "REFTH_MachineId", "REFTH_MachineDesc");
            ViewData["machine_lists"] = machine_lists;
            var ref_tresplist = (from resplist in operationdb.REFTH_MDResponsible select resplist);
            SelectList resp_lists = new SelectList(ref_tresplist, "REFTH_ResponsibleId", "REFTH_ResponsibleDesc");
            ViewData["resp_lists"] = resp_lists;
            return PartialView("Refinery_AddNewTrouble");
        }
        public JsonResult trigger_troublemcode_select(int mid_)
        {

            var ref_tmcodelist = from mdm in operationdb.REFTH_Machines where mdm.REFTH_MachineId == mid_ select mdm;
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(ref_tmcodelist, JsonRequestBehavior.AllowGet);

        }

        public void add_ref_prodact(Nullable<int> ref_id, int blockid, int REFTH_PP_Actcode_Id, DateTime start_date, DateTime end_date, string ref_prodact_note)
        {
            operationdb.REFTH_PROD_DAILY_SP(ref_id, blockid, REFTH_PP_Actcode_Id, start_date, end_date, ref_prodact_note);
            operationdb.SaveChanges();

        }
        public void delete_prodact_data(int actid)
        {
            //Delete
            var prodact_del = operationdb.REFTH_PP_Daily.Where(a => a.REFTH_PPId == actid).First();
            operationdb.REFTH_PP_Daily.Remove(prodact_del);
            operationdb.SaveChanges();
        }

        public void edit_ref_prodact(Nullable<int> ref_id, int blockid, int REFTH_PP_Actcode_Id, DateTime start_date, DateTime end_date, string ref_prodact_note)
        {
            var edit_act = operationdb.REFTH_PP_Daily.Where(a => a.REFTH_PPId == ref_id).First();
            edit_act.REFTH_BlockId = blockid;
            edit_act.REFTH_PPcodeId = REFTH_PP_Actcode_Id;
            edit_act.REFTH_ProductionStartDate = start_date;
            edit_act.REFTH_ProductionEndDate = end_date;
            edit_act.REFTH_Remarks = ref_prodact_note;

            operationdb.SaveChanges();
        }
        public JsonResult trigger_getMaxCode_select(int tmid_)
        {
            if (tmid_ == 4)
            {
                tmid_ = 3;
            }
            var tmid_max = (from mdm in operationdb.REFTH_MDReasonCodes where mdm.REFTH_MachineId == tmid_ orderby mdm.REFTH_MDReasonId descending select mdm).First();
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(tmid_max, JsonRequestBehavior.AllowGet);
        }
        public void partial_savenewtrouble(string maxCODE, string newCODEDESC, int selMID, int tresponid)
        {
            operationdb.Database.ExecuteSqlCommand("insert into REFTH_MDReasonCodes values('" + maxCODE + "','" + newCODEDESC + "','" + selMID + "','" + tresponid + "')");
            operationdb.SaveChanges();
            //operationdb.REFTH_MDReasonCodes_SP(maxCODE, newCODEDESC, resid, selMID);
            //operationdb.SaveChanges();
        }
        public JsonResult additional_resp(int aresp_id)
        {

            var ref_trcodelist = from mdm in operationdb.REFTH_MDResponsible where mdm.REFTH_ResponsibleId == aresp_id select mdm;
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(ref_trcodelist, JsonRequestBehavior.AllowGet);

        }
        public PartialViewResult AddResponsible_Select()
        {
            return PartialView("Refinery_AddNewResponsible");
        }
        public JsonResult LoadResponsibleList()
        {
            var ref_responsible = from mdm in operationdb.REFTH_MDResponsible select mdm;
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(ref_responsible, JsonRequestBehavior.AllowGet);
        }
        public string AddNewResponsible(string new_resid)
        {
            var ret = "";
            var cnt_existres = (from mdm in operationdb.REFTH_MDResponsible where mdm.REFTH_ResponsibleDesc == new_resid select mdm).Count();
            if (cnt_existres > 0)
            {
                ret = "Responsible already exist!";
            }
            else
            {
                operationdb.Database.ExecuteSqlCommand("Insert into REFTH_MDResponsible values('" + new_resid + "')");
                ret = new_resid + ',' + "Successfuly save!";
            }
            return (ret);
        }
        public JsonResult EditResponsible(int edit_resid)
        {
            var edit_responsible = from mdm in operationdb.REFTH_MDResponsible where mdm.REFTH_ResponsibleId == edit_resid select mdm;
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(edit_responsible, JsonRequestBehavior.AllowGet);
        }
        public string EditNewResponsible(int res_id, string res_desc)
        {
            var ret = "";
            if (res_desc == "")
            {
                ret = "Textfield is empty!, Invalid";

            }
            else
            {
                operationdb.Database.ExecuteSqlCommand("Update REFTH_MDResponsible Set REFTH_ResponsibleDesc='" + res_desc + "' where REFTH_ResponsibleId='" + res_id + "'");
                ret = "Responsible has been updated!";
            }
            return (ret);
        }
        public JsonResult selectlist_autochange(int getid_)
        {
            var get_autores = from mdm in operationdb.VWREFTH_ReasonCode_Resposible where mdm.REFTH_MDReasonId == getid_ select mdm;
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(get_autores, JsonRequestBehavior.AllowGet);
        }
        public void ref_savedowntime_resp(int mid_, int resp_id_1)
        {
            operationdb.REFTH_MachineDowntimeResp_SP(mid_, resp_id_1);
            operationdb.SaveChanges();
        }
        public JsonResult append_responsible()
        {

            var query_row = (from qr in operationdb.VWREFTH_MachineDowntimeResponsible select qr);
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(query_row, JsonRequestBehavior.AllowGet);
        }
        public JsonResult append_responsible_edit()
        {
            var query_row = (from qr in operationdb.REFTH_MDResponsible select qr);
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(query_row, JsonRequestBehavior.AllowGet);
        }
        //default saving without additional responsible/EDIT
        public class ref_tablesavedowntime_edit
        {

            public int mid_1 { get; set; }
            public int resp_id_1 { get; set; }
        }
        public void ref_tablesavedowntime_edt(List<ref_tablesavedowntime_edit> container)
        {
            var cont_lng1 = container;
            int mid_1;
            int resp_id_1;


            for (int i = 0; i < cont_lng1.Count; i++)
            {
                mid_1 = cont_lng1[i].mid_1;
                resp_id_1 = cont_lng1[i].resp_id_1;

                operationdb.REFTH_MachineDowntimeResp_SP(mid_1, resp_id_1);
                operationdb.SaveChanges();
            }
        }
        //add responsible during edit/EDIT
        public class ref_tablesavedowntime_edt_add
        {

            public int mid_1 { get; set; }
            public int resp_id_1 { get; set; }
        }
        public void ref_tablesavedowntime_edt_adding(List<ref_tablesavedowntime_edt_add> container)
        {
            var cont_lng1 = container;
            int mid_1;
            int resp_id_1;


            for (int i = 0; i < cont_lng1.Count; i++)
            {
                mid_1 = cont_lng1[i].mid_1;
                resp_id_1 = cont_lng1[i].resp_id_1;

                operationdb.REFTH_MachineDowntimeResp_SP(mid_1, resp_id_1);
                operationdb.SaveChanges();
            }
        }
        public void delete_resp_edit(int resp_id, int ref_hide_id)
        {
            //Delete selected MachineDowntimeResponsible
            var resps_del = operationdb.REFTH_MachineDowntimeResponsible.Where(a => a.REFTH_ResponsibleId == resp_id && a.REFTH_MachineDowntimeId == ref_hide_id).First();
            operationdb.REFTH_MachineDowntimeResponsible.Remove(resps_del);
            operationdb.SaveChanges();
        }
        public JsonResult append_responsible_edit_add()
        {
            var query_row = (from qr in operationdb.REFTH_MDResponsible select qr);
            operationdb.Configuration.ProxyCreationEnabled = false;
            operationdb.Configuration.LazyLoadingEnabled = false;
            return Json(query_row, JsonRequestBehavior.AllowGet);
        }
    }
}
