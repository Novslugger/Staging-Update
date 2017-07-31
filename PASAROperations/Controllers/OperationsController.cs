using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System.Data.Linq.SqlClient;
using System.IO;


namespace PASAROperations.Controllers
{
    public class OperationsController : Controller
    {
        //Models.DEV_KPIEntities db = new Models.DEV_KPIEntities();
        Models.PASAROperationEntities cfdb = new Models.PASAROperationEntities();
        Models.CFDB_Model cfdb_model = new Models.CFDB_Model()
        {
            myConverter = new Models.Converter()
        };

        public ActionResult Index()
        {
            string uname = Environment.UserName;
            ViewBag.uname = uname;
            return View();
        }

        public ActionResult NewCycle()
        {


            var results = (from c in cfdb.VWCycleRecents select c).ToList();

            return View(results);
        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]

        public ActionResult NewCycle_Partial(int ConvIdparam)
        {
            var result_cf = (from c in cfdb.VWCycleRecents
                             where c.ConverterId == ConvIdparam
                             select c).First();

            DateTime cycle_endtime = result_cf.Cycle_End_Time ?? DateTime.Now;

            ViewBag.CycleId = result_cf.CycleId;
            ViewBag.CycleNum = result_cf.CycleNumber + 1;
            ViewBag.CampaignNum = result_cf.CampaignNumber;
            ViewBag.Converter = result_cf.ConverterName;


            ViewBag.CycleEndDate = cycle_endtime.AddMinutes(1).ToString("MMM-dd-yyyy hh:mm tt");

            ViewBag.ConverterId = result_cf.ConverterId;
            ViewBag.CampaignId = result_cf.CampaignId;


            return PartialView("_CycleSelect");
        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]

        public ActionResult NewTuyere_Partial(int cycid)
        {
            var tuyere_numlist = (from tl in cfdb.TuyereNumbers select tl);

            var tuyere_statlist = (from ts in cfdb.TuyereStates select ts);

            var tuyerenumlist = new SelectList(tuyere_numlist, "TuyereNumberId", "Tuyere_Number", 1);
            var tuyerestatlist = new SelectList(tuyere_statlist, "TuyereStateId", "Tuyere_State", "Blocked");

            ViewBag.tuyerecycid = cycid;

            ViewBag.tuyerenumlist = tuyerenumlist;
            ViewBag.tuyerestatlist = tuyerestatlist;


            return PartialView("_ChangeTuyere");
        }

        public void Change_Tuyere(int cycid, int tuy_num, int tuy_statid, int tuy_measurement)
        {
            //stored proc tuyere

            cfdb.Tuyere_Change(cycid, tuy_num, tuy_statid, tuy_measurement);

            cfdb.SaveChanges();
        }


        public void EmployeeShift_Assign(DateTime shiftdate, int shiftid, int supervisorid,
            int skimmer1id, int skimmer2id, int skimmer3id, int skimmer4id, int skimmer5id, int skimmer6id, int operatorid, bool supervisor_bool, bool skimmer1_bool, bool skimmer2_bool, bool skimmer3_bool, bool skimmer4_bool, bool skimmer5_bool, bool skimmer6_bool, bool operator_bool)
        {

            //Supervisor

            if (supervisor_bool == false)
            {
                cfdb.Employee_Shift_Change(shiftdate, shiftid, 1, supervisorid);
                cfdb.SaveChanges();
            }

            //Skimmer1
            if (skimmer1_bool == false)
            {
                cfdb.Employee_Shift_Change(shiftdate, shiftid, 2, skimmer1id);
                cfdb.SaveChanges();
            }

            //Skimmer2
            if (skimmer2_bool == false)
            {
                cfdb.Employee_Shift_Change(shiftdate, shiftid, 3, skimmer2id);
                cfdb.SaveChanges();
            }

            //Operator
            if (operator_bool == false)
            {
                cfdb.Employee_Shift_Change(shiftdate, shiftid, 4, operatorid);
                cfdb.SaveChanges();
            }

            //Skimmer3
            if (skimmer3_bool == false)
            {
                cfdb.Employee_Shift_Change(shiftdate, shiftid, 5, skimmer3id);
                cfdb.SaveChanges();
            }

            //Skimmer4
            if (skimmer4_bool == false)
            {
                cfdb.Employee_Shift_Change(shiftdate, shiftid, 6, skimmer4id);
                cfdb.SaveChanges();
            }

            //Skimmer5
            if (skimmer5_bool == false)
            {
                cfdb.Employee_Shift_Change(shiftdate, shiftid, 7, skimmer5id);
                cfdb.SaveChanges();
            }

            //Skimmer6
            if (skimmer6_bool == false)
            {
                cfdb.Employee_Shift_Change(shiftdate, shiftid, 8, skimmer6id);
                cfdb.SaveChanges();
            }
        }


        public JsonResult Populate_Tuyere(int cycid)
        {
            var result = (from t in cfdb.VWTuyeres where t.CycleId == cycid select t).ToList();

            return Json(result, JsonRequestBehavior.AllowGet);
        }



        public ActionResult NewCampaign()
        {
            var results = (from c in cfdb.VWConverterCamps select c).ToList();

            var campaignum = (cfdb.Campaigns.Select(u1 => u1.CampaignNumber).Max());

            ViewData["CampaignNumber"] = campaignum;

            return View(results);
        }


        public JsonResult AddCycle(int cyclenum_param, int convid_param, DateTime cycstartdate_param, int campid_param)
        {
            // Models.Cycle cycleadd = new Models.Cycle();
            //cycleadd.CycleNumber = cyclenum_param;
            //cycleadd.ConverterId = convid_param;
            //cycleadd.Cycle_Start_Time = cycstartdate_param;
            //cycleadd.Cycle_End_Time = null;
            //cycleadd.CycleStatId = 1; // on-going
            //cycleadd.CycleSulfur = 0;          
            //cycleadd.CampaignId = campid_param;
            //cycleadd.ActiveStatus = true;     
            //cfdb.Cycles.Add(cycleadd);

            var defaultsilicaformulaid = (from sd in cfdb.DefaultSilicaFormulas select sd).First();

            // cycleadd.SilicaFormulaId = defaultsilicaformulaid.SilicaFormulaId;

            cfdb.CF_ADD_CYCLE(convid_param, campid_param, 0, defaultsilicaformulaid.SilicaFormulaId);

            cfdb.SaveChanges();

            var currentcycleid = (from c in cfdb.SP_IDENTITY_VAL_TBL("Cycle") select c).First();



            int? new_cycle_id = currentcycleid.identityval;

            return Json(new_cycle_id, JsonRequestBehavior.AllowGet);

        }



        public ActionResult CampaignSelector()
        {

            return View();

        }


        public JsonResult ViewCampaign()
        {
            var result = (from c in cfdb.Campaigns select new { c.CampaignId, c.CampaignNumber }).ToList();

            return Json(result, JsonRequestBehavior.AllowGet);
        }


        public void EditConverter(int paramcampid, int paramconverterid)
        {
            //UPDATE
            var conveter_row = cfdb.Converters.Where(c => c.ConverterId == paramconverterid).First();

            conveter_row.CampaignId = paramcampid;

            cfdb.SaveChanges();

        }

        public void EditSulfur(int actcodeid, int cycid, float sulfurval)
        {
            if (actcodeid == 58)
            {
                //UPDATE
                var cyc_row = cfdb.Cycles.Where(c => c.CycleId == cycid).First();

                cyc_row.CycleSulfur = sulfurval;

                cfdb.SaveChanges();

            }
            else { }

        }


        public JsonResult AddCampaign(int campaign_num)
        {
            Models.Campaign campaignadd = new Models.Campaign();

            campaignadd.CampaignNumber = campaign_num;

            cfdb.Campaigns.Add(campaignadd);

            cfdb.SaveChanges();

            var campaignum_max = (cfdb.Campaigns.Select(u1 => u1.CampaignNumber).Max());

            return Json(new { campmax = campaignum_max }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult EmployeeShift()
        {

            var type_shift = (from ts in cfdb.TypeShifts select ts);

            var Shift_type = (from st in cfdb.ShiftScheds select st);

            var Supervisor = (from sup in cfdb.VWSupervisors orderby sup.Fullname ascending select sup);
            var Skimmer = (from skm in cfdb.VWSkimmers orderby skm.Fullname ascending select skm);

            var Operator = (from opt in cfdb.VWOperators orderby opt.Fullname ascending select opt);


            var TypeShiftlist = new SelectList(type_shift, "TypeShiftId", "TypeShiftName", 1);

            var Shift_typelist = new SelectList(Shift_type, "ShiftSchedId", "ShiftName", 1);
            var Supervisorlist = new SelectList(Supervisor, "CompanyId", "Fullname", 1842);
            var Skimmerlist = new SelectList(Skimmer, "CompanyId", "Fullname", 864);
            var Operatorlist = new SelectList(Operator, "CompanyId", "Fullname", 358);


            ViewBag.TypeShiftlist = TypeShiftlist;
            ViewBag.ShiftTypeList = Shift_typelist;
            ViewBag.SupervisorList = Supervisorlist;
            ViewBag.SkimmerList = Skimmerlist;
            ViewBag.OperatorList = Operatorlist;


            return View();
        }

        public ActionResult SilicaRequired()
        {
            var process_engr = (from pe in cfdb.VWProcesses select pe);

            var changelog_fesilica = (from clfesi in cfdb.VWChangeLogs select clfesi);

            var fesilica = (from fesi in cfdb.SilicaFormulas select fesi);

            var fesilica_default = (from fesi_d in cfdb.DefaultSilicaFormulas select fesi_d).First();

            SelectList fesilica_list = new SelectList(fesilica, "SilicaFormulaId", "IronSilicaRatio", fesilica_default.SilicaFormulaId);
            ViewData["fesilicalist"] = fesilica_list;


            var process_engr_list = new SelectList(process_engr, "CompanyId", "Fullname", 758);

            ViewBag.process_engr_list = process_engr_list;


            //Matte Grade
            var check_current = (from mg in cfdb.VWCF_MatteGrade orderby mg.rownum descending select mg).Count();
            if (check_current > 0)
            {
                var current = (from mg in cfdb.VWCF_MatteGrade orderby mg.rownum descending select mg).First();
                var matte_grade_select = (from mg in cfdb.VWCF_MatteGrade where mg.rownum < current.rownum orderby mg.rownum descending select mg).Take(5);

                SelectList mg_list = new SelectList(matte_grade_select, "MatteGrade", "MatteGrade");
                ViewData["mattegradelist"] = mg_list;
            }
            else
            {
                var list = new SelectList(new[] { new { ID = "0", Name = "no data" }, }, "ID", "Name", 1);
                ViewData["mattegradelist"] = list;
            }


            return View();
        }

        //CF partial Activty
        //public ActionResult load_cfmg_popup(int cycid_)
        //{

        //    var current = (from mg in cfdb.VWCF_MatteGrade orderby mg.SilicaFormulaVariableId descending select mg).First();
        //    var matte_grade_select = (from mg in cfdb.VWCF_MatteGrade where mg.SilicaFormulaVariableId < current.SilicaFormulaVariableId orderby mg.SilicaFormulaVariableId descending select mg).Take(5);


        //    return PartialView("_CFaddmg", matte_grade_select);
        //}


        public PartialViewResult cfpopup_partial(int actid, int cycid)
        {
            //@ViewBag.DateTimeNow = DateTime.Now;

            cfdb.CF_GetMatteGradeSP(actid, cycid);
            var matte_grade_select = (from mg in cfdb.VWCF_MatteGrade select mg).Take(5);


            ViewBag.timestamp = matte_grade_select;
            ViewBag.MatteGrade = matte_grade_select;



            return PartialView("_CFaddmg", matte_grade_select);


        }
        //end

        // FSFE 
        public ActionResult FSFELogsheet()
        {
            FSF_Manpower_data();

            return View();

        }

        public PartialViewResult fsfe_tabs(string partialview_name)
        {

            FSF_Manpower_data();
            return PartialView(partialview_name);
        }

        //Crew Man Power and Defaults
        public void FSF_Manpower_data()
        {
            var fsfe_emplist_result = (from fsfe_emp in cfdb.VWFSFE_Employee orderby fsfe_emp.Lastname ascending select fsfe_emp);
            var fsf_crew_result = (from fsf_crew in cfdb.FSF_Crew select fsf_crew);

            var FSFEEmpList = new SelectList(fsfe_emplist_result, "CompanyId", "Fullname");
            var FSFCrewList = new SelectList(fsf_crew_result, "CrewId", "CrewName");

            ViewBag.FSFEEmpList = FSFEEmpList;
            ViewBag.FSFCrewList = FSFCrewList;

        }

        public ActionResult CFLogsheet(int id, string sdate, string edate, string cycid)
        {
            var cvlist = new SelectList(new[]{
            new {id = "CV1", Name = "CV 1"},
            new {id = "CV2", Name = "CV 2"},
            new {id = "CV3", Name = "CV 3"},
            new {id = "CV4", Name = "CV 4"},
            new {id = "All", Name = "All"}
            }, "ID", "Name", cycid);

            // var selected = cvlist.Where(x => x.Value == "CV2").First();
            // selected.Selected = true;

            //cvlist.SelectedValue;

            ViewData["CVList"] = cvlist;


            var results = (from c in cfdb.VWCycleDetails where c.CycleId == id select c).First();



            //DateTime cycle_endtime = result_cf.Cycle_End_Time ?? DateTime.Now;

            ViewBag.cycleselectsdate = sdate;
            ViewBag.cycleselectedate = edate;
            ViewBag.cycleselectcycid = cycid;

            ViewBag.CFlogsheet_CycId = results.CycleId;

            ViewBag.CFlogsheet_CycNum = results.CycleNumber;
            ViewBag.CFlogsheet_CFNum = results.ConverterId;
            ViewBag.CFlogsheet_StartTime = results.Cycle_Start_Time.ToString("dd-MMM-yy hh:mm tt");

            ViewBag.CFlogsheet_CycStatId = results.CycleStatId;
            ViewBag.CFlogsheet_CycleSulfur = results.CycleSulfur.ToString("0.00");

            var fesilica = (from fesi in cfdb.SilicaFormulas select fesi);

            var fesilica_cycdefault = (from fesi_d in cfdb.Cycles where fesi_d.CycleId == id select fesi_d).First();

            SelectList fesilica_CFlist = new SelectList(fesilica, "SilicaFormulaId", "IronSilicaRatio", fesilica_cycdefault.SilicaFormulaId);
            ViewData["fesilica_CFlist"] = fesilica_CFlist;



            if (results.Cycle_End_Time == null)
            {
                ViewBag.CFlogsheet_EndTime = '-';
            }
            else
            {
                DateTime cycle_endtime = results.Cycle_End_Time ?? DateTime.Now;
                ViewBag.CFlogsheet_EndTime = cycle_endtime.ToString("dd-MMM-yy hh:mm tt");
            }

            ViewBag.CFlogsheet_CycStatus = results.CycleStatusName;

            return View();
        }

        public JsonResult CFCycleSelector(string cyclenum, DateTime startdate, DateTime enddate)
        {
            ////storedproc - PI
            //var cycles = (from p in db.SP_PI_CFCYLE(cyclenum, startdate, enddate)
            //              select new {p.tag, p.time, p.value});

            //storedproc
            var cycles = (from cyc in cfdb.CYCLE_SELECTOR(cyclenum, startdate, enddate) select cyc);


            return Json(cycles, JsonRequestBehavior.AllowGet);
        }

        public JsonResult EditCycleStat(int cycid, int statid)
        {

            cfdb.CYCLE_EDIT_CYCLESTAT(cycid, statid);

            cfdb.SaveChanges();

            var result = (from cyc in cfdb.VWCycleDetails where cyc.CycleId == cycid select cyc).ToList();


            return Json(result, JsonRequestBehavior.AllowGet);

        }

        public JsonResult EmployeeShiftSched7to7(DateTime shiftdate_param)
        {

            var empshift_result = (from empshift7to7 in cfdb.EMPLOYEE_7TO7_SHIFT(shiftdate_param)
                                   select empshift7to7);

            return Json(empshift_result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult EmployeeShiftSched3Shift(DateTime shiftdate_param)
        {

            var empshift_result = (from empshift3shift in cfdb.EMPLOYEE_3SHIFT(shiftdate_param)
                                   select empshift3shift);

            return Json(empshift_result, JsonRequestBehavior.AllowGet);
        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]

        public ActionResult AddStage_Partial(int cycid_param)
        {
            var cycstage_result = (from cycstage in cfdb.CYCLE_STAGE_CHANGE(cycid_param) select cycstage).ToList();


            return PartialView("_AddStage", cycstage_result);
        }

        public void AddCFStage(int cycid_param, int stageid_param)
        {
            Models.CycleStage cycle_stage = new Models.CycleStage();

            cycle_stage.CycleId = cycid_param;
            cycle_stage.StageId = stageid_param;
            cycle_stage.ActiveStatus = true;

            cfdb.CycleStages.Add(cycle_stage);

            cfdb.SaveChanges();

        }


        public void EditCycleStage(int cycstageid_param, int trueorfalse)
        {
            bool activstat = true;

            if (trueorfalse == 1)
            {
                activstat = true;
            }
            else if (trueorfalse == 0)
            {
                activstat = false;
            }


            var cycle_stage = cfdb.CycleStages.Where(c => c.CycleStageId == cycstageid_param).First();

            cycle_stage.ActiveStatus = activstat;

            cfdb.SaveChanges();

        }

        public JsonResult Cycle_ActiveStage(int cycid_param)
        {
            var result = (from ac in cfdb.VWCycleActiveStages orderby ac.StageId where ac.CycleId == cycid_param select ac).ToList();

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]

        public ActionResult AddActivity_Partial(int cycleid_actparam, int stageid_actparam)
        {
            var lastactperstage = (from act in cfdb.CYCLE_PERSTAGE_DATERANGE(cycleid_actparam, stageid_actparam) select act).First();

            ViewBag.StageName = lastactperstage.StageName;

            if (lastactperstage.EndDateTime == null)
            {
                ViewBag.LastActEndDateTime = lastactperstage.StartDateTime;
            }
            else
            {
                ViewBag.LastActEndDateTime = lastactperstage.EndDateTime;
            }


            ViewBag.AddStageId = stageid_actparam;
            ViewBag.CycleNum = lastactperstage.CycleNumber;

            var activitycode_result = (from actcode in cfdb.ActivityCodes orderby actcode.ActivityDesc ascending select actcode).ToList();

            return PartialView("_AddActivity", activitycode_result);
        }


        //[OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]

        //public ActionResult InsertMidActivity_Partial(int cycleid_actparam, int stageid_actparam)
        //{
        //    var lastactperstage = (from act in cfdb.CYCLE_PERSTAGE_DATERANGE(cycleid_actparam, stageid_actparam) select act).First();

        //    ViewBag.StageName = lastactperstage.StageName;
        //    ViewBag.LastActEndDateTime = lastactperstage.EndDateTime;
        //    ViewBag.AddStageId = stageid_actparam;

        //    var activitycode_result = (from actcode in cfdb.ActivityCodes select actcode).ToList();

        //    return PartialView("_InsertMidActivity", activitycode_result);
        //}


        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]

        public ActionResult InsertMidActivity_Partial(int cycleid_actparam, int actid)
        {
            var editact = (from act in cfdb.VWActivitySequences where act.ActivityId == actid select act).First();

            var editact_dur = (from act_edit in cfdb.CYCLE_PERACTIVITY_DATERANGE(cycleid_actparam, actid) select act_edit).First();

            var act_profile = (from act_prof in cfdb.ActivityCodes where act_prof.ActivityCodeId == editact.ActivityCodeId select act_prof).First();

            ViewBag.ActCodeId_IMAct = editact.ActivityCodeId;

            ViewBag.StageName_IMAct = editact.StageName;
            ViewBag.StageId_IMAct = editact.StageId;


            DateTime act_endplusonemin = editact_dur.EndDateTime ?? DateTime.Now;

            ViewBag.CycleNumber_IMAct = editact.CycleNumber;


            ViewBag.StartDate_EditAct = editact_dur.EndDateTime;
            ViewBag.EndDate_EditAct = editact_dur.EndDateTime;

            var activitycode_result = (from actcode in cfdb.ActivityCodes orderby actcode.ActivityDesc ascending select actcode).ToList();

            return PartialView("_InsertMidActivity", activitycode_result);
        }


        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]

        public ActionResult EditActivity_Partial(int cycleid_actparam, int actid)
        {
            var editact = (from act in cfdb.VWActivitySequences where act.ActivityId == actid select act).First();

            var editact_dur = (from act_edit in cfdb.CYCLE_PERACTIVITY_DATERANGE(cycleid_actparam, actid) select act_edit).First();

            var act_profile = (from act_prof in cfdb.ActivityCodes where act_prof.ActivityCodeId == editact.ActivityCodeId select act_prof).First();

            ViewBag.ActCodeId_EditAct = editact.ActivityCodeId;

            ViewBag.StageName_EditAct = editact.StageName;
            ViewBag.StageId_EditAct = editact.StageId;


            ViewBag.CycleNumber_EditAct = editact.CycleNumber;

            ViewBag.ActCode_EditAct = editact.ActivityCodeName;
            ViewBag.ActCodeDesc_EditAct = editact.ActivityDesc;

            ViewBag.FSFECharge_EditAct = editact.FSFE_Quantity.ToString("0.00");
            ViewBag.CFCharge_EditAct = editact.CF_Quantity.ToString("0.00");
            ViewBag.AFCharge_EditAct = editact.AF_Quantity.ToString("0.00");
            ViewBag.Duration_EditAct = editact.ActDuration;
            ViewBag.Comments_EditAct = editact.ActComment;



            ViewBag.FSFEvalid_EditAct = act_profile.FSFE_Charge;
            ViewBag.CFvalid_EditAct = act_profile.CF_Charge;
            ViewBag.AFvalid_EditAct = act_profile.AF_Charge;


            ViewBag.StartDate_EditAct = editact_dur.StartDateTime;
            ViewBag.EndDate_EditAct = editact_dur.EndDateTime;

            var activitycode_result = (from actcode in cfdb.ActivityCodes orderby actcode.ActivityDesc ascending select actcode).ToList();

            return PartialView("_EditActivity", activitycode_result);
        }

        public bool reversetrue(bool reverseme)
        {

            bool thereverse;

            thereverse = reverseme ? false : true;

            return thereverse;
        }





        public JsonResult ActivityperStage(int cycleid_actparam, int stageid_actparam)
        {
            //storedproc
            var Activity = (from cfact in cfdb.CYCLE_ACTIVITY_PERSTAGE(cycleid_actparam, stageid_actparam) select cfact);


            return Json(Activity, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ActivityperStage_Employee(int cycleid_actparam, int stageid_actparam)
        {

            var emplist = (from elist in cfdb.VWEmployeeAssignStageDetails where elist.CycleId == cycleid_actparam && elist.StageId == stageid_actparam select elist);


            return Json(emplist, JsonRequestBehavior.AllowGet);
        }


        public JsonResult ActivityperStageDateRange(int cycleid_actparam, int stageid_actparam)
        {
            //storedproc
            var Activity = (from cfact in cfdb.CYCLE_PERSTAGE_DATERANGE(cycleid_actparam, stageid_actparam) select cfact).First();


            return Json(Activity, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ActivityCode_Intellisense(string actcode_param)
        {

            var ActCode_i = (from cfactcode in cfdb.ActivityCodes where cfactcode.ActivityCodeName == actcode_param select new { cfactcode.ActivityDesc, cfactcode.ActivityCodeId, cfactcode.FSFE_Charge, cfactcode.CF_Charge, cfactcode.AF_Charge }).First();



            return Json(ActCode_i, JsonRequestBehavior.AllowGet);
        }


        public void TypeShift_Assign(DateTime shiftdate, int shift_supervisorid,
           int shift_skimmer1id, int shift_skimmer2id, int shift_skimmer3id, int shift_skimmer4id,
           int shift_skimmer5id, int shift_skimmer6id, int shift_operatorid)
        {

            //Supervisor
            cfdb.Employee_TypeShift_Change(1, shiftdate, shift_supervisorid);
            cfdb.SaveChanges();

            //Skimmer1
            cfdb.Employee_TypeShift_Change(2, shiftdate, shift_skimmer1id);
            cfdb.SaveChanges();

            //Skimmer2
            cfdb.Employee_TypeShift_Change(3, shiftdate, shift_skimmer2id);
            cfdb.SaveChanges();

            //Operator
            cfdb.Employee_TypeShift_Change(4, shiftdate, shift_operatorid);
            cfdb.SaveChanges();

            //Skimmer3
            cfdb.Employee_TypeShift_Change(5, shiftdate, shift_skimmer3id);
            cfdb.SaveChanges();

            //Skimmer4
            cfdb.Employee_TypeShift_Change(6, shiftdate, shift_skimmer4id);
            cfdb.SaveChanges();

            //Skimmer5
            cfdb.Employee_TypeShift_Change(7, shiftdate, shift_skimmer5id);
            cfdb.SaveChanges();

            //Skimmer6
            cfdb.Employee_TypeShift_Change(8, shiftdate, shift_skimmer6id);
            cfdb.SaveChanges();


        }

        public JsonResult Populate_AvailableShift(DateTime shiftdate)
        {
            var result = (from s in cfdb.VWTeamTypeShifts
                          where s.TeamShiftDate == shiftdate
                          orderby s.ShiftSchedId ascending
                          select
                              new { s.ShiftSchedId, s.ShiftName, s.TypeShiftName, s.TypeShiftId }
                              ).ToList();

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Populate_CrewShift(int crewid)
        {
            var result = (from fcrew in cfdb.VWFSF_DefaultCrew//VWFSF_DefaultCrew
                          where fcrew.CrewId == crewid
                          orderby fcrew.FSFE_Role_Type_Id ascending
                          select fcrew
                              ).ToList();

            return Json(result, JsonRequestBehavior.AllowGet);
        }



        public JsonResult AssignResponsible_Shift(DateTime shiftdate, int shift_type)
        {
            var result = (from tts in cfdb.TeamTypeShifts
                          where tts.TeamShiftDate == shiftdate && tts.TypeShiftId == shift_type
                          orderby
                          tts.EmployeeRoleId ascending
                          select
                              new { tts.TeamTypeShiftId, tts.EmployeeRoleId, tts.TeamShiftDate, tts.TypeShiftId }
                              ).ToList();

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Select_Cycle_Ongoing(int cycid)
        {
            var result = (from cyc_ongoing in cfdb.Activities where cyc_ongoing.CycleId == cycid && cyc_ongoing.ActivityStatus == true && cyc_ongoing.ActivityMode == 2 select cyc_ongoing).Count();

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Cycle_WithStage(int cycid)
        {
            var result = (from cyclestage in cfdb.CycleStages
                          where
                              cyclestage.CycleId == cycid && cyclestage.ActiveStatus == true
                          select cyclestage).Count();

            return Json(result, JsonRequestBehavior.AllowGet);
        }



        public JsonResult Select_AirFlow(string start_date, string end_date, string blowername)
        {
            var result = (from aflow in cfdb.PI_InstrumentData_PERCF_DEFINED(end_date, start_date, blowername) select aflow);

            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public void Insert_Activity(int cycleid, int actcodeid, float actdur, float fsfe_qty, float cf_qty,
        float af_qty, string act_comment, int stageid, int actmodeid, float sulfurval)
        {

            //stored proc tuyere

            cfdb.INSERT_ACTIVITY(cycleid, actcodeid, actdur, fsfe_qty, cf_qty, af_qty, act_comment, stageid, actmodeid);

            cfdb.SaveChanges();

            EditSulfur(actcodeid, cycleid, sulfurval);

        }

        public void Deactive_Activity(int actid)
        {

            var act_val = cfdb.Activities.Where(act => act.ActivityId == actid).First();

            act_val.ActivityStatus = false;
            act_val.ActSequence = 0;
            act_val.StageId = 8;

            cfdb.SaveChanges();
        }

        public void EditActivity(int actid, int actcodeid, float actdur, float fsfe_qty, float cf_qty,
        float af_qty, string act_comment, int actmodeid, float sulfurval)
        {
            //UPDATE
            var edit_act = cfdb.Activities.Where(act => act.ActivityId == actid).First();

            edit_act.ActivityCodeId = actcodeid;
            edit_act.ActDuration = actdur;
            edit_act.FSFE_Quantity = fsfe_qty;
            edit_act.CF_Quantity = cf_qty;
            edit_act.AF_Quantity = af_qty;
            edit_act.ActComment = act_comment;
            edit_act.ActivityMode = actmodeid;

            cfdb.SaveChanges();

            EditSulfur(actcodeid, edit_act.CycleId, sulfurval);

        }

        public void Insert_Middle_Activity(int prev_actid, int cycleid, int actcodeid, float actdur, float fsfe_qty, float cf_qty,
            float af_qty, string act_comment, int stageid, int actmodeid, float sulfurval)
        {

            cfdb.INSERT_MIDDLE_ACTIVITY(prev_actid, cycleid, actcodeid, actdur, fsfe_qty, cf_qty, af_qty, act_comment, stageid, actmodeid);

            EditSulfur(actcodeid, cycleid, sulfurval);

            cfdb.SaveChanges();

        }

        public ActionResult CFCycles()
        {

            var camps = (from camp in cfdb.Campaigns select camp).ToList();

            var results1 = (from c in cfdb.VWCycleRecents where c.ConverterId == 1 select c).First();
            var results2 = (from c in cfdb.VWCycleRecents where c.ConverterId == 2 select c).First();
            var results3 = (from c in cfdb.VWCycleRecents where c.ConverterId == 3 select c).First();
            var results4 = (from c in cfdb.VWCycleRecents where c.ConverterId == 4 select c).First();

            ViewBag.Camp1 = results1.CampaignId;
            ViewBag.Camp2 = results2.CampaignId;
            ViewBag.Camp3 = results3.CampaignId;
            ViewBag.Camp4 = results4.CampaignId;

            SelectList camp_list = new SelectList(camps, "CampaignId", "CampaignNumber");
            ViewData["camp_list"] = camp_list;


            return View("CFCycles");
        }


        public JsonResult CycleList(int cfnum, int campid)
        {

            //var cyclelistpercf = (from cfcyc in cfdb.VWCycleDetails
            //                      orderby cfcyc.CycleId descending
            //                      where cfcyc.ConverterId == cfnum select cfcyc);

            var cyclelistpercf = (from cfcyc in cfdb.VWCycleDetails
                                  where cfcyc.ConverterId == cfnum && cfcyc.CampaignId == campid
                                  select cfcyc);


            return Json(cyclelistpercf, JsonRequestBehavior.AllowGet);
        }

        public void AddFeSilica(double fesilica_val, string reason, int changeby, int changetypeid)
        {
            //storedproc
            cfdb.INSERT_FESILICA(fesilica_val, reason, changeby, changetypeid);

            cfdb.SaveChanges();

        }

        public JsonResult fesilica_value_exist(double fesilica_val)
        {
            var result = (from sf in cfdb.SilicaFormulas where sf.IronSilicaRatio == fesilica_val select sf).Count();

            return Json(result, JsonRequestBehavior.AllowGet);
        }



        public JsonResult Changelog_Fesilica()
        {
            var result = (from cl in cfdb.VWChangeLogs orderby cl.ChangelogId descending select cl);

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SetDefault_Tbl()
        {
            var result = (from sdefault in cfdb.VWChangelogSetDefaults select sdefault);
            return Json(result, JsonRequestBehavior.AllowGet);
        }


        public void SetDefaultFeSilica(int fesilicaid, string reason, int changeby, int changetypeid)
        {
            cfdb.SETDEFAULT_FESILICA(fesilicaid, reason, changeby, changetypeid);
            cfdb.SaveChanges();
        }

        public JsonResult SilicaFormulaEdit_tbl()
        {
            var result1 = (from sfedit in cfdb.SilicaFormulas select new { sfedit.SilicaFormulaId, sfedit.IronSilicaRatio });
            return Json(result1, JsonRequestBehavior.AllowGet);
        }

        public void EditFeSilica(int fesilicaid, float fesilica, string reason, int changeby, int changetypeid)
        {
            cfdb.UPDATE_FESILICA(fesilicaid, fesilica, reason, changeby, changetypeid);
            cfdb.SaveChanges();
        }

        public JsonResult SilicaReqd_tbl(int cycid, int stageid)
        {
            var result1 = (from srqd in cfdb.CYCLE_SILICAREQUIRED(cycid, stageid) select srqd);
            return Json(result1, JsonRequestBehavior.AllowGet);
        }

        public void EditCycle_SilicaRatio(int cycid, int fesilica_id)
        {
            //UPDATE
            var cycle_row = cfdb.Cycles.Where(c => c.CycleId == cycid).First();

            cycle_row.SilicaFormulaId = fesilica_id;

            cfdb.SaveChanges();
        }

        public void Change_MatteGrade_Multiple(int actid, float mattegrade)
        {
            cfdb.MatteGrade_Change(actid, mattegrade);
            cfdb.SaveChanges();
        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]

        public ActionResult Change_StartDate_Partial(int cycid)
        {

            var cycleselect = (from cselect in cfdb.VWCycleDetails where cselect.CycleId == cycid select cselect).First();

            ViewBag.csdate_start_time = cycleselect.Cycle_Start_Time;

            return PartialView("_EditStartDate");

        }


        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]

        public ActionResult Change_AssignEmployeeStage_Partial(int cycleid, int stageid)
        {
            SelectList sup_list;
            SelectList opt_list;
            SelectList skim_list;


            var opt_id = (from optid in cfdb.VWEmployeeAssignStageDetails where optid.CycleId == cycleid && optid.StageId == stageid && optid.EmployeeRoleStageId == 2 select new { optid.EmployeeId }).FirstOrDefault();
            var skim_id = (from skimid in cfdb.VWEmployeeAssignStageDetails where skimid.CycleId == cycleid && skimid.StageId == stageid && skimid.EmployeeRoleStageId == 3 select new { skimid.EmployeeId }).FirstOrDefault();
            var sup_id = (from supid in cfdb.VWEmployeeAssignStageDetails where supid.CycleId == cycleid && supid.StageId == stageid && supid.EmployeeRoleStageId == 1 select supid).FirstOrDefault();

            //var suplist = (from slist in cfdb.CYCLE_STAGE_ASSIGN_DATA(cycleid, stageid, "sup") select slist);
            //var optlist = (from olist in cfdb.CYCLE_STAGE_ASSIGN_DATA(cycleid, stageid, "opt") select olist);
            //var skimlist = (from sklist in cfdb.CYCLE_STAGE_ASSIGN_DATA(cycleid, stageid, "skim") select sklist);

            var suplist = (from slist in cfdb.VWSupervisors orderby slist.Lastname select slist);
            var optlist = (from olist in cfdb.VWOperators orderby olist.Lastname select olist);
            var skimlist = (from sklist in cfdb.VWSkimmers orderby sklist.Lastname select sklist);



            if (sup_id == null)
            {

                sup_list = new SelectList(suplist, "CompanyId", "Fullname");
            }
            else
            {

                sup_list = new SelectList(suplist, "CompanyId", "Fullname", sup_id.EmployeeId);

            }


            if (opt_id == null)
            {
                opt_list = new SelectList(optlist, "CompanyId", "Fullname");
            }
            else
            {
                opt_list = new SelectList(optlist, "CompanyId", "Fullname", opt_id.EmployeeId);
            }

            if (skim_id == null)
            {
                skim_list = new SelectList(skimlist, "CompanyId", "Fullname");
            }
            else
            {
                skim_list = new SelectList(skimlist, "CompanyId", "Fullname", skim_id.EmployeeId);
            }





            //var changelog_fesilica = (from clfesi in cfdb.VWChangeLogs select clfesi);

            //var fesilica = (from fesi in cfdb.SilicaFormulas select fesi);

            //var fesilica_default = (from fesi_d in cfdb.DefaultSilicaFormulas select fesi_d).First();

            //SelectList fesilica_list = new SelectList(fesilica, "SilicaFormulaId", "IronSilicaRatio", fesilica_default.SilicaFormulaId);
            //ViewData["fesilicalist"] = fesilica_list;


            //var process_engr_list = new SelectList(process_engr, "CompanyId", "Fullname", 758);

            //ViewBag.process_engr_list = process_engr_list;

            ViewBag.sup_list = sup_list;
            ViewBag.opt_list = opt_list;
            ViewBag.skim_list = skim_list;


            return PartialView("_ChangeEmployeeStage");


        }

        public JsonResult ChangeStartDate_tbl(int cycid)
        {
            var result1 = (from csdate in cfdb.CYCLE_CHANGESTARTDATE_DATA(cycid) select csdate);
            return Json(result1, JsonRequestBehavior.AllowGet);
        }

        public void change_cycle_starttime(int cycid, DateTime starttime)
        {
            var cycle_select = cfdb.Cycles.Where(c => c.CycleId == cycid).First();

            cycle_select.Cycle_Start_Time = starttime;

            cfdb.SaveChanges();
        }

        public JsonResult Change_EmployeeStage_Assign(int cycid, int stageid, int supid,
            int opid, int skimid)
        {
            cfdb.CHANGE_ASSIGNEMPLOYEE_STAGE(cycid, stageid, supid, 1);
            cfdb.CHANGE_ASSIGNEMPLOYEE_STAGE(cycid, stageid, opid, 2);
            cfdb.CHANGE_ASSIGNEMPLOYEE_STAGE(cycid, stageid, skimid, 3);

            cfdb.SaveChanges();

            var new_assignemployee = (from new_assign in cfdb.VWEmployeeAssignStageDetails
                                      where
                                      new_assign.CycleId == cycid && new_assign.StageId == stageid
                                      select new_assign);
            return Json(new_assignemployee, JsonRequestBehavior.AllowGet);
        }


        public JsonResult Select_FSFE_Date(DateTime fsfe_prod_date, int fsfe_stage_id)
        {
            var prodid = cfdb.FSFE_PRODID_CHANGE(fsfe_prod_date, fsfe_stage_id);

            cfdb.SaveChanges();


            return Json(prodid, JsonRequestBehavior.AllowGet);
        }
        //
        public ActionResult Select_ManPower(int fsfeprodid)
        {
            var result = (from fc in cfdb.VWFSFE_OnboardCrew where fc.FSFE_Prod_Id == fsfeprodid select new { fc.FSFE_Role_Type_Id, fc.FSFE_Onboard_Employee_Id, fc.AddlEmpAId, fc.AddlEmpBId, fc.CrewId }).ToList();

            return Json(result, JsonRequestBehavior.AllowGet);
        }
        //Crew Defaults
        public ActionResult Select_CrewManPower(int fsfeprodid)
        {
            var fcrw = (from crw in cfdb.FSF_AssignCrew where crw.FSFE_Prod_Id == fsfeprodid select crw).FirstOrDefault();

            return Json(new { crew_id = fcrw.CrewId }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult Select_KPI(int fsfeprodid)
        {
            var result = (from kv in cfdb.FSFE_KPI_Val where kv.FSFE_Prod_Id == fsfeprodid select new { kv.FSFE_Param_Id, kv.FSFE_KPI_Comment }).ToList();

            return Json(result, JsonRequestBehavior.AllowGet);
        }


        //public void Assign_ManPower(int fsfeprodid, int crewid, int emp1, int emp2, int emp3, int emp4, int emp5, int emp6, int emp7, int emp8, int emp9, int emp10, int emp11, int emp12, int emp13, int emp14, int emp15)
        //{

        //    cfdb.FSFE_MANPOWER_ASSIGN(fsfeprodid, emp1, emp2, emp3, emp4, emp5, emp6, emp7, emp8, emp9, emp10, emp11, emp12, emp13, emp14, emp15);

        //    cfdb.FSF_CREWLOT_Change(fsfeprodid, crewid);

        //    cfdb.SaveChanges();
        //}
        //
        public void Delete_Crew(int prodid)
        {
            cfdb.Database.ExecuteSqlCommand("DELETE FROM FSFE_OnboardCrew WHERE FSFE_Prod_Id = @p0", prodid);
            cfdb.SaveChanges();
        }

        //
        public void Save_ShiftAssign(DateTime date, int shiftid)
        {
            cfdb.FSFE_PRODID_CHANGE(date, shiftid);
            cfdb.SaveChanges();
        }

        public int getProdId(DateTime date, int shiftid, int crewid)
        {
            int shiftassignid = cfdb.FSFE_Prod.First(a => a.FSFE_Prod_Date == date && a.FSFE_Prod_Shift == shiftid).FSFE_Prod_Id;

            cfdb.FSFE_CREWASSIGN_SP(shiftassignid, crewid);
            cfdb.SaveChanges();

            return shiftassignid;
        }

        public void Assign_ManPower(List<FSF_ManPower> items)
        {
            var mp = items;

            int shiftassignid;
            int roletypeid;
            int empid;

            string crew_AddlEmpidA;
            string crew_AddlEmpidB;

            for (int i = 0; i < mp.Count; i++)
            {
                int tempa;
                int tempb;

                shiftassignid = mp[i].shiftassignid;
                roletypeid = mp[i].roletypeid;
                empid = mp[i].empid;

                crew_AddlEmpidA = mp[i].empaid;
                crew_AddlEmpidB = mp[i].empbid;

                if (crew_AddlEmpidA == null)
                    tempa = 0;
                else
                    tempa = Int32.Parse(crew_AddlEmpidA);

                if (crew_AddlEmpidB == null)
                    tempb = 0;
                else
                    tempb = Int32.Parse(crew_AddlEmpidB);

                cfdb.FSFE_ManPower_Change(shiftassignid, empid, roletypeid, tempa, tempb);
                cfdb.SaveChanges();
            }


        }

        //public void Assign_ManPower(List<FSF_ManPower> items)
        //{
        //    var mp = items;
        //    int shiftassignid;
        //    int roletypeid;
        //    int empid;

        //    for (int i = 0; i < mp.Count; i++)
        //    {
        //        shiftassignid = mp[i].shiftassignid;
        //        roletypeid = mp[i].roletypeid;
        //        empid = mp[i].empid;

        //        cfdb.SFP_MANPOWER_SP(shiftassignid, roletypeid, empid);
        //        cfdb.SaveChanges();
        //    }


        //}

        public class FSF_ManPower
        {
            public int shiftassignid { get; set; }
            public int roletypeid { get; set; }
            public int empid { get; set; }
            public string empaid { get; set; }
            public string empbid { get; set; }
        }

        //assigning crew defaults
        //public void Assign_CrewDefault(int crewid, int emp1, int emp2, int emp3, int emp4, int emp5, int emp6, int emp7, int emp8, int emp9, int emp10, int emp11, int emp12, int emp13, int emp14, int emp15)
        // //public void Assign_CrewDefault(int crewid,int empid)
        // {

        //     cfdb.FSF_CREWDEFAULT_ASSIGN(crewid, emp1, emp2, emp3, emp4, emp5, emp6, emp7, emp8, emp9, emp10, emp11, emp12, emp13, emp14, emp15);
        //     //cfdb.FSF_CREWDEFAULT_ASSIGN(crewid,empid);

        //     cfdb.SaveChanges();
        // }
        //public void Assign_CrewDefault(int crewid, int emp1, int emp2, int emp3, int emp4, int emp5, int emp6, int emp7, int emp8, int emp9, int emp10, int emp11, int emp12, int emp13, int emp14, int emp15)
        //{

        //    cfdb.FSF_CREWDEFAULT_ASSIGN(crewid, emp1, emp2, emp3, emp4, emp5, emp6, emp7, emp8, emp9, emp10, emp11, emp12, emp13, emp14, emp15);

        //    cfdb.SaveChanges();
        //}

        //Crew Default
        public void Assign_CrewDefault(List<Default_Crew> items)
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

                cfdb.FSF_CREWDEFAULT_SP(crewid, roletypeid, empid);
                cfdb.SaveChanges();
            }
        }

        public class Default_Crew
        {
            public int crewid { get; set; }
            public int roletypeid { get; set; }
            public int empid { get; set; }
        }

        //
        public void Save_Equipment_Issues(List<Equip_Issues> items)
        {
            var issues = items;

            int paramid;
            int prodid;
            DateTime paramdate;
            string paramval;

            for (int i = 0; i < issues.Count; i++)
            {
                paramid = items[i].paramid;
                prodid = items[i].prodid;
                paramdate = items[i].paramdate;
                paramval = items[i].paramval;

                cfdb.FSFE_INSERT_EquipmentIssues(paramid, prodid, paramdate, paramval);
                cfdb.SaveChanges();
            }
        }

        public class Equip_Issues
        {
            public int paramid { get; set; }
            public int prodid { get; set; }
            public DateTime paramdate { get; set; }
            public string paramval { get; set; }
        }

        public int getIssuesProdId(DateTime date, int shiftid)
        {
            int shiftassignid = cfdb.FSFE_Prod.First(a => a.FSFE_Prod_Date == date && a.FSFE_Prod_Shift == shiftid).FSFE_Prod_Id;



            return shiftassignid;
        }





        public void Assign_KPI(int fsfeprodid, string kpi_comments2, string kpi_comments3, string kpi_comments4, string kpi_comments5)
        {

            cfdb.FSFE_KPI_ASSIGN(fsfeprodid, kpi_comments2, kpi_comments3, kpi_comments4, kpi_comments5);

            cfdb.SaveChanges();
        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult NewRegular_Partial()
        {
            var fsfeemplist = (from fe in cfdb.VWFSFE_Employee select fe);

            var fsfe_emplist = new SelectList(fsfeemplist, "CompanyId", "Fullname");

            ViewBag.fsfe_emplist = fsfe_emplist;

            return PartialView("_RegularCrew");
        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult NewFPattern_Partial()
        {

            return PartialView("_FPattern");
        }

        //Fii Partial
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult NewFII_Partial()
        {
            //var fii_spotlist = (from fii in cfdb.FSFE_Param where fii.FSFE_ParamGroupId == 8 select fii);
            var fii_spotlist = (from fii in cfdb.FSFE_Param
                                where
                                    fii.FSFE_Param_Id == 138 ||
                                    fii.FSFE_Param_Id == 140 ||
                                    fii.FSFE_Param_Id == 469 ||
                                    fii.FSFE_Param_Id == 194 ||
                                    fii.FSFE_Param_Id == 195 ||
                                    fii.FSFE_Param_Id == 196 ||
                                    fii.FSFE_Param_Id == 197 ||
                                    fii.FSFE_Param_Id == 198 ||
                                    fii.FSFE_Param_Id == 470 ||
                                    fii.FSFE_Param_Id == 471 ||
                                    fii.FSFE_Param_Id == 472 ||
                                    fii.FSFE_Param_Id == 473 ||
                                    fii.FSFE_Param_Id == 474 ||
                                    fii.FSFE_Param_Id == 475 ||
                                    fii.FSFE_Param_Id == 476 ||
                                    fii.FSFE_Param_Id == 477 ||
                                    fii.FSFE_Param_Id == 478 ||
                                    fii.FSFE_Param_Id == 479 ||
                                    fii.FSFE_Param_Id == 480 ||
                                    fii.FSFE_Param_Id == 481 ||
                                    fii.FSFE_Param_Id == 482

                                select fii);

            var fsfe_fii_spotlist = new SelectList(fii_spotlist, "FSFE_Param_Id", "FSFE_Param_Name");

            ViewBag.fsfe_fii_spotlist = fsfe_fii_spotlist;

            return PartialView("_FSFE_FII");
        }
        //Dustline Inspections Partial
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult NewDustline_Inspections_Partial()
        {
            @ViewBag.DateTimeNow = DateTime.Now;

            //var dustline_arealist = (from dustline_inspect in cfdb.FSFE_Param where dustline_inspect.FSFE_Param_Id == 176 || 
            //                             dustline_inspect.FSFE_Param_Id == 179 || dustline_inspect.FSFE_Param_Id == 182 ||
            //                             dustline_inspect.FSFE_Param_Id == 185 || dustline_inspect.FSFE_Param_Id == 188 ||
            //                             dustline_inspect.FSFE_Param_Id == 191 select dustline_inspect);

            var dustline_arealist = (from dustline_inspect in cfdb.FSFE_Param
                                     where dustline_inspect.FSFE_Param_Id == 176 || dustline_inspect.FSFE_Param_Id == 468 ||
                                         dustline_inspect.FSFE_Param_Id == 191
                                     select dustline_inspect);

            var fsfe_dustline_arealist = new SelectList(dustline_arealist, "FSFE_Param_Id", "FSFE_Param_Name");

            ViewBag.fsfe_dustline_arealist = fsfe_dustline_arealist;

            return PartialView("_FSFE_Dustline_Inspect_form");
        }


        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult EditRegularCrew_Partial(int regcrew_id)
        {
            var regcrew = (from rcrew in cfdb.FSFE_RegularCrew where rcrew.FSFE_RegularCrew_Id == regcrew_id select rcrew).First();
            var fsfeemplist = (from fe in cfdb.VWFSFE_Employee select fe);


            var fsfe_emplist = new SelectList(fsfeemplist, "CompanyId", "Fullname", regcrew.FSFE_RegularCrew_Employee_Id);

            ViewBag.RegcrewId = regcrew.FSFE_RegularCrew_Id;
            ViewBag.SpecialAct = regcrew.FSFE_RegularCrew_Special_Activity;
            ViewBag.fsfe_emplist = fsfe_emplist;

            return PartialView("_EditRegularCrew");
        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult EditMtapper_Partial(int mtapperid)
        {
            var mtapper = (from mtap in cfdb.FSFE_MatteTapperCrew where mtap.FSFE_MatteTapperId == mtapperid select mtap).First();
            var fsfeemplist = (from fe in cfdb.VWFSFE_Employee select fe);

            var fsfe_emplist = new SelectList(fsfeemplist, "CompanyId", "Fullname", mtapper.Matte_Tapper_EmpId);

            ViewBag.MtapperId = mtapper.FSFE_MatteTapperId;
            ViewBag.MtapperNum = mtapper.Tapper_Number;
            ViewBag.fsfe_emplist = fsfe_emplist;

            return PartialView("_EditMatteTapper");
        }




        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult MatteTapper_Partial()
        {
            var fsfeemplist = (from fe in cfdb.VWFSFE_Employee select fe);

            var fsfe_emplist = new SelectList(fsfeemplist, "CompanyId", "Fullname");

            ViewBag.fsfe_emplist = fsfe_emplist;

            return PartialView("_MatteTapper");
        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult MatteTapping_Partial()
        {

            ViewBag.MatteTappingDate_Today = DateTime.Today;

            ViewBag.Start_MatteTapping = DateTime.Now;

            ViewBag.End_MatteTapping = DateTime.Now.AddMinutes(1);

            return PartialView("_MatteTapping");
        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult SlagTapping_Partial()
        {

            ViewBag.SlagTappingDate_Today = DateTime.Today;
            ViewBag.Start_SlagTapping = DateTime.Now;
            ViewBag.End_SlagTapping = DateTime.Now.AddMinutes(1);

            return PartialView("_SlagTapping");
        }



        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult SPOTapping()
        {
            ViewBag.MatteTappingDate_Today = DateTime.Today;
            ViewBag.MatteTappingDate_Now = DateTime.Now;

            return PartialView("_SPOTapper");
        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult EditSPOTapping(int spotapid)
        {

            var spotapping = (from stap in cfdb.VWFSFE_SPOTap_MatteSlag where stap.FSFE_MatteSlagId == spotapid select stap).First();

            ViewBag.FSFEMatteSlagId = spotapping.FSFE_MatteSlagId;

            ViewBag.MatteSlagDate = spotapping.MatteSlagDate;

            ViewBag.H1 = spotapping.H1;
            ViewBag.H2 = spotapping.H2;

            ViewBag.Scumlvl = spotapping.ScumLevel;
            ViewBag.Temperature = spotapping.Temperature;
            ViewBag.Mattelvl = spotapping.MatteLevel;
            ViewBag.Slaglvl = spotapping.SlagLevel;
            ViewBag.SPO_Comment = spotapping.SPOTap_Comment;


            return PartialView("_EditSPOTapper");
        }
        //Edit matte tapping
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult EditMatteTapping_Partial(int mtappingid)
        {
            var mtapping = (from mtap in cfdb.VWFSFE_MatteTapping where mtap.FSFE_MatteTapId == mtappingid select mtap).First();

            ViewBag.MtappingId = mtapping.FSFE_MatteTapId;

            ViewBag.TappingCalledDate_Edit = mtapping.FSFE_Matte_CalledDate;

            ViewBag.TappingStartDate_Edit = mtapping.FSFE_Matte_StartDate;
            ViewBag.TappingEndDate_Edit = mtapping.FSFE_Matte_EndDate;

            ViewBag.Launder1 = mtapping.FSFE_Launder1;
            ViewBag.Launder2 = mtapping.FSFE_Launder2;

            //slag blow
            ViewBag.MatteSlagBlow = mtapping.FSFE_Matte_SlagBlow;

            //cf no
            ViewBag.MatteCFNo = mtapping.FSFE_Matte_CFNo;

            ViewBag.Mtapper1 = mtapping.Mtapper1;
            ViewBag.Mtapper2 = mtapping.Mtapper2;

            ViewBag.MatteTemp = mtapping.MatteTemp;
            ViewBag.MatteVol = mtapping.MatteVolume;

            return PartialView("_EditMatteTapping");
        }

        //edit slag tapping
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult EditSlagTapping_Partial(int stappingid)
        {
            var stapping = (from stap in cfdb.VWFSFE_SlagTapping where stap.SlagTapId == stappingid select stap).First();

            ViewBag.SlagTapId = stapping.SlagTapId;

            ViewBag.StappingReadyDate_Edit = stapping.SlagTap_ReadyTime;

            ViewBag.SlagTappingStartDate_Edit = stapping.SlagTap_StartTime;
            ViewBag.SlagTappingEndDate_Edit = stapping.SlagTap_EndTime;


            ViewBag.SlagTemp = stapping.SlagTemperature;
            //ViewBag.LaddlePit = stapping.LaddlePitNo;

            ViewBag.launder1 = stapping.Launder1;
            ViewBag.launder2 = stapping.Launder2;

            ViewBag.slagtender1 = stapping.Slag_Tender1;
            ViewBag.slagtender2 = stapping.Slag_Tender2;
            ViewBag.SlogPotNo = stapping.SlagPotNo;

            //stapping.Slag_Tender1 = slagtender1;
            //stapping.Slag_Tender2 = slagtender2;

            return PartialView("_EditSlagTapping");
        }


        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult EditFPattern_Partial(int fpatternid)
        {
            var fpattern = (from fpat in cfdb.VWFSFE_FPATTERN_FII where fpat.FSFE_FPatternFII_Id == fpatternid select fpat).First();

            ViewBag.FPatternId = fpattern.FSFE_FPatternFII_Id;
            ViewBag.FPatternRemarks = fpattern.Remark;
            ViewBag.FPatternImagePath = fpattern.ImagePath;



            return PartialView("_EditFPattern");
        }


        public JsonResult FSFE_Load_RegularCrew(int fsfe_ProdId)
        {

            var load_regcrew = (from regcrew in cfdb.VWFSFE_RegularCrew where regcrew.FSFE_Prod_Id == fsfe_ProdId orderby regcrew.FSFE_RegularCrew_Id select regcrew);

            return Json(load_regcrew, JsonRequestBehavior.AllowGet);
        }

        //Dustline Inspections Edit
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public ActionResult EditDustline_Inspection_Partial(int dustlineinspectid)
        {
            var dustlineinspect = (from dinsp in cfdb.VWFSFE_DustlineInspection_Data where dinsp.FSFE_DustlineInspection_Id == dustlineinspectid select dinsp).First();

            ViewBag.dustlineinspect_areas = dustlineinspect.FSFE_Param_Name;
            ViewBag.dustlineinspectId = dustlineinspect.FSFE_DustlineInspection_Id;
            ViewBag.dustlineinspectRemarks = dustlineinspect.Remark;
            ViewBag.dustlineinspectImagePath = dustlineinspect.ImagePath;
            ViewBag.dustlineinspectArea = dustlineinspect.FSFE_Param_Name;
            ViewBag.DateTime = DateTime.Now;


            var dustline_arealist = (from dustline_inspect in cfdb.FSFE_Param
                                     where dustline_inspect.FSFE_Param_Id == 176 || dustline_inspect.FSFE_Param_Id == 468 ||
                                         dustline_inspect.FSFE_Param_Id == 191
                                     select dustline_inspect);

            var fsfe_dustline_arealist = new SelectList(dustline_arealist, "FSFE_Param_Id", "FSFE_Param_Name", dustlineinspect.FSFE_ParamId);

            ViewBag.fsfe_dustline_arealist = fsfe_dustline_arealist;


            return PartialView("_EditDustlineInspection");
        }
        //load regular crew

        //Tapping controller
        public JsonResult FSFE_Load_MatteTapping(int fsfe_ProdId)
        {

            var load_mtapping = (from mtap in cfdb.VWFSFE_MatteTapping where mtap.FSFE_Prod_Id == fsfe_ProdId orderby mtap.FSFE_MatteTapId select mtap);

            return Json(load_mtapping, JsonRequestBehavior.AllowGet);
        }

        public JsonResult FSFE_Load_SlagTapping(int fsfe_ProdId)
        {

            var load_stapping = (from stap in cfdb.VWFSFE_SlagTapping where stap.FSFE_ProdId == fsfe_ProdId orderby stap.SlagTapId select stap);

            return Json(load_stapping, JsonRequestBehavior.AllowGet);
        }

        public JsonResult FSFE_Load_SPOTap(int fsfe_ProdId)
        {

            var load_spotap = (from spotap in cfdb.VWFSFE_SPOTap_MatteSlag
                               where
                                   spotap.FSFE_ProdId == fsfe_ProdId
                               orderby spotap.FSFE_MatteSlagId
                               select spotap);

            return Json(load_spotap, JsonRequestBehavior.AllowGet);
        }


        public JsonResult FSFE_Load_MatteTapper(int fsfe_ProdId)
        {

            var load_mtapper = (from mtapper in cfdb.VWFSFE_MatteTapper where mtapper.FSFE_ProdId == fsfe_ProdId orderby mtapper.Tapper_Number select mtapper);

            return Json(load_mtapper, JsonRequestBehavior.AllowGet);
        }


        public void Add_FSFE_RegCrew(int fsfe_prodid, int empid, string special_act)
        {
            //INSERT

            Models.FSFE_RegularCrew regcrew = new Models.FSFE_RegularCrew();

            regcrew.FSFE_Prod_Id = fsfe_prodid;
            regcrew.FSFE_RegularCrew_Employee_Id = empid;
            regcrew.FSFE_RegularCrew_Special_Activity = special_act;

            cfdb.FSFE_RegularCrew.Add(regcrew);

            cfdb.SaveChanges();

        }

        public void Edit_FSFE_RegCrew(int reg_crewid, int empid, string special_act)
        {
            //UPDATE

            var regcrew = cfdb.FSFE_RegularCrew.Where(rc => rc.FSFE_RegularCrew_Id == reg_crewid).First();

            regcrew.FSFE_RegularCrew_Employee_Id = empid;
            regcrew.FSFE_RegularCrew_Special_Activity = special_act;

            cfdb.SaveChanges();

        }

        public JsonResult Edit_FSFE_Mtapper(int mtapper_id, int empid, int tappernum, int fsfe_prodid)
        {
            //UPDATE
            int i;

            var result = (from mtapper_c in cfdb.FSFE_MatteTapperCrew
                          where
                              mtapper_c.FSFE_ProdId == fsfe_prodid && mtapper_c.Tapper_Number == tappernum &&
                              mtapper_c.Matte_Tapper_EmpId == mtapper_id
                          select mtapper_c).Count();

            if (result == 0)
            {
                //UPDATE

                var mtapper = cfdb.FSFE_MatteTapperCrew.Where(mt => mt.FSFE_MatteTapperId == mtapper_id).First();

                mtapper.Matte_Tapper_EmpId = empid;
                mtapper.Tapper_Number = tappernum;

                cfdb.SaveChanges();

                i = 0;
            }
            else { i = 1; }

            return Json(i, JsonRequestBehavior.AllowGet);

        }

        public void Delete_FSFE_RegCrew(int fsfe_regcrewid)
        {
            //Delete

            var regcrew = cfdb.FSFE_RegularCrew.Where(rcrew => rcrew.FSFE_RegularCrew_Id == fsfe_regcrewid).First();

            cfdb.FSFE_RegularCrew.Remove(regcrew);

            cfdb.SaveChanges();

        }

        public JsonResult Add_FSFE_Mtapper(int fsfe_prodid, int tapper_num, int empid)
        {
            //INSERT
            int i;

            var result = (from mtapper_c in cfdb.FSFE_MatteTapperCrew
                          where
                              mtapper_c.FSFE_ProdId == fsfe_prodid && mtapper_c.Tapper_Number == tapper_num
                          select mtapper_c).Count();

            if (result == 0)
            {
                Models.FSFE_MatteTapperCrew mtapper = new Models.FSFE_MatteTapperCrew();

                mtapper.FSFE_ProdId = fsfe_prodid;
                mtapper.Tapper_Number = tapper_num;
                mtapper.Matte_Tapper_EmpId = empid;

                cfdb.FSFE_MatteTapperCrew.Add(mtapper);

                cfdb.SaveChanges();

                i = 0;
            }
            else { i = 1; }

            return Json(i, JsonRequestBehavior.AllowGet);
        }


        public void Delete_FSFE_Mtapper(int fsfe_mtapperid)
        {
            //Delete
            var mtapper = cfdb.FSFE_MatteTapperCrew.Where(mtap => mtap.FSFE_MatteTapperId == fsfe_mtapperid).First();
            cfdb.FSFE_MatteTapperCrew.Remove(mtapper);
            cfdb.SaveChanges();
        }

        public void Delete_FSFE_Mtapping(int fsfe_mtappingid)
        {
            //Delete
            var mtapping = cfdb.FSFE_Matte_Tapping.Where(mtap =>
                mtap.FSFE_MatteTapId == fsfe_mtappingid).First();

            cfdb.FSFE_Matte_Tapping.Remove(mtapping);

            cfdb.SaveChanges();
        }

        public void Delete_FSFE_Stapping(int fsfe_stappingid)
        {
            //Delete
            var stapping = cfdb.FSFE_SlagTap.Where(stap =>
                stap.SlagTapId == fsfe_stappingid).First();

            cfdb.FSFE_SlagTap.Remove(stapping);

            cfdb.SaveChanges();
        }


        public void Delete_FSFE_FPattern(int fpattern_id)
        {
            //Delete
            var fpattern = cfdb.FSFE_FPatternFII_Val.Where(fpat =>
                fpat.FSFE_FPatternFII_Id == fpattern_id).First();

            cfdb.FSFE_FPatternFII_Val.Remove(fpattern);

            cfdb.SaveChanges();
        }
        //Delete Dustline Inspections
        public void Delete_FSFE_Dustline_Inspections(int dustlineinspect_id)
        {
            //Delete
            var dustlineinspect = cfdb.FSFE_DustlineInspection_Val.Where(dins =>
                dins.FSFE_DustlineInspection_Id == dustlineinspect_id).First();

            cfdb.FSFE_DustlineInspection_Val.Remove(dustlineinspect);

            cfdb.SaveChanges();
        }



        public void Delete_FSFE_SPOTap(int spotapid)
        {
            //Delete
            var spotap = cfdb.FSFE_SPOTap_MatteSlag.Where(stap =>
                stap.FSFE_MatteSlagId == spotapid).First();

            cfdb.FSFE_SPOTap_MatteSlag.Remove(spotap);

            cfdb.SaveChanges();
        }
        //Slag Tapping
        public JsonResult Select_Slag_Tender(int fsfe_prodid, int slagtender1, int slagtender2)
        {
            object stapping = null;
            switch (slagtender1)
            {
                case 1:
                    stapping = (from stap in cfdb.VWFSFE_OnboardCrew
                                where stap.FSFE_Prod_Id == fsfe_prodid && (stap.FSFE_Role_Type_Id == 10 || stap.FSFE_Role_Type_Id == 11)
                                //&& 
                                //(stap.FSFE_Role_Type_Id == slagtender1 || stap.FSFE_Role_Type_Id == slagtender2)
                                select new { stap.Fullname, stap.FSFE_Role_Type_Id, stap.FSFE_Role_Type_Name, stap.FSFE_Onboard_Employee_Id });
                    break;
                case 2:
                    stapping = (from stap in cfdb.VWFSFE_OnboardCrew
                                where stap.FSFE_Prod_Id == fsfe_prodid && (stap.FSFE_Role_Type_Id == 11 || stap.FSFE_Role_Type_Id == 12)
                                //&& 
                                //(stap.FSFE_Role_Type_Id == slagtender1 || stap.FSFE_Role_Type_Id == slagtender2)
                                select stap);
                    break;
                case 3:
                    stapping = (from stap in cfdb.VWFSFE_OnboardCrew
                                where stap.FSFE_Prod_Id == fsfe_prodid && stap.FSFE_Role_Type_Id == 12
                                //&& 
                                //(stap.FSFE_Role_Type_Id == slagtender1 || stap.FSFE_Role_Type_Id == slagtender2)
                                select stap);
                    break;

            }


            //var stapping = (from stap in cfdb.VWFSFE_OnboardCrew
            //                where stap.FSFE_Prod_Id == fsfe_prodid &&
            //                    stap.FSFE_Role_Type_Id == roletypeid
            //                select stap);

            return Json(stapping, JsonRequestBehavior.AllowGet);

        }

        //public JsonResult Select_Slag_Tender(int fsfe_prodid, int launder1, int launder2)
        //{

        //    var stapping = (from stap in cfdb.VWFSFE_SlagTapping
        //                    where stap.FSFE_ProdId == fsfe_prodid &&
        //                        (stap.Tapper_Number == launder1 || stap.Tapper_Number == launder2)
        //                    select stap);

        //    return Json(stapping, JsonRequestBehavior.AllowGet);

        //}




        //Matte Tapping Assign
        public JsonResult Select_Launder_Tapper(int fsfe_prodid, int launder1, int launder2)
        {

            //var mtapping = (from mtap in cfdb.VWFSFE_MatteTapper
            //                where mtap.FSFE_ProdId == fsfe_prodid &&
            //                    (mtap.Tapper_Number == launder1 || mtap.Tapper_Number == launder2)
            //                select mtap);
            object mtapping = null;
            switch (launder1)
            {
                case 1:
                    mtapping = (from stap in cfdb.VWFSFE_OnboardCrew
                                where stap.FSFE_Prod_Id == fsfe_prodid && (stap.FSFE_Role_Type_Id == 6 || stap.FSFE_Role_Type_Id == 7)
                                //&& 
                                //(stap.FSFE_Role_Type_Id == slagtender1 || stap.FSFE_Role_Type_Id == slagtender2)
                                select new { stap.Fullname, stap.FSFE_Role_Type_Id, stap.FSFE_Role_Type_Name, stap.FSFE_Onboard_Employee_Id });
                    break;
                case 2:
                    mtapping = (from stap in cfdb.VWFSFE_OnboardCrew
                                where stap.FSFE_Prod_Id == fsfe_prodid && (stap.FSFE_Role_Type_Id == 7 || stap.FSFE_Role_Type_Id == 8)
                                //&& 
                                //(stap.FSFE_Role_Type_Id == slagtender1 || stap.FSFE_Role_Type_Id == slagtender2)
                                select stap);
                    break;
                case 3:
                    mtapping = (from stap in cfdb.VWFSFE_OnboardCrew
                                where stap.FSFE_Prod_Id == fsfe_prodid && (stap.FSFE_Role_Type_Id == 8 || stap.FSFE_Role_Type_Id == 9)
                                //&& 
                                //(stap.FSFE_Role_Type_Id == slagtender1 || stap.FSFE_Role_Type_Id == slagtender2)
                                select stap);
                    break;
                case 4:
                    mtapping = (from stap in cfdb.VWFSFE_OnboardCrew
                                where stap.FSFE_Prod_Id == fsfe_prodid && stap.FSFE_Role_Type_Id == 9
                                //&& 
                                //(stap.FSFE_Role_Type_Id == slagtender1 || stap.FSFE_Role_Type_Id == slagtender2)
                                select stap);
                    break;


            }
            return Json(mtapping, JsonRequestBehavior.AllowGet);

        }

        public void Add_Mtapping(int fsfe_prodid, DateTime tapping_called, DateTime tapping_startdate,
            DateTime tapping_enddate, int launder1, int launder2, float MatteTemp, float MatteVol, int MatteSlagBlow, int MatteCFNo)
        {
            //INSERT

            var result = (from mtapper_c in cfdb.FSFE_Matte_Tapping
                          where
                              mtapper_c.FSFE_Prod_Id == fsfe_prodid && mtapper_c.FSFE_Matte_CalledDate == tapping_called && mtapper_c.FSFE_Matte_StartDate == tapping_startdate
                              && mtapper_c.FSFE_Matte_EndDate == tapping_enddate && mtapper_c.FSFE_Launder1 == launder1 && mtapper_c.FSFE_Launder2 == launder2 && mtapper_c.FSFE_Matte_Temp == MatteTemp
                              && mtapper_c.FSFE_Matte_Volume == MatteVol && mtapper_c.FSFE_Matte_SlagBlow == MatteSlagBlow && mtapper_c.FSFE_Matte_CFNo == MatteCFNo
                          select mtapper_c).Count();

            if (result == 0)
            {
                Models.FSFE_Matte_Tapping mtapping = new Models.FSFE_Matte_Tapping();

                mtapping.FSFE_Prod_Id = fsfe_prodid;
                mtapping.FSFE_Matte_CalledDate = tapping_called;
                mtapping.FSFE_Matte_StartDate = tapping_startdate;
                mtapping.FSFE_Matte_EndDate = tapping_enddate;
                mtapping.FSFE_Launder1 = launder1;
                mtapping.FSFE_Launder2 = launder2;
                mtapping.FSFE_Matte_Temp = MatteTemp;
                mtapping.FSFE_Matte_Volume = MatteVol;
                mtapping.FSFE_Matte_CFNo = MatteCFNo;
                mtapping.FSFE_Matte_SlagBlow = MatteSlagBlow;

                cfdb.FSFE_Matte_Tapping.Add(mtapping);

                cfdb.SaveChanges();

            }
            else
            {
                var update_ = cfdb.FSFE_Matte_Tapping.Where(mtapper_c => mtapper_c.FSFE_Prod_Id == fsfe_prodid && mtapper_c.FSFE_Matte_CalledDate == tapping_called
                    && mtapper_c.FSFE_Matte_StartDate == tapping_startdate && mtapper_c.FSFE_Matte_EndDate == tapping_enddate && mtapper_c.FSFE_Launder1 == launder1
                    && mtapper_c.FSFE_Launder2 == launder2 && mtapper_c.FSFE_Matte_Temp == MatteTemp && mtapper_c.FSFE_Matte_Volume == MatteVol && mtapper_c.FSFE_Matte_SlagBlow == MatteSlagBlow
                    && mtapper_c.FSFE_Matte_CFNo == MatteCFNo).First();

                update_.FSFE_Prod_Id = fsfe_prodid;
                update_.FSFE_Matte_CalledDate = tapping_called;
                update_.FSFE_Matte_StartDate = tapping_startdate;
                update_.FSFE_Matte_EndDate = tapping_enddate;
                update_.FSFE_Launder1 = launder1;
                update_.FSFE_Launder2 = launder2;
                update_.FSFE_Matte_Temp = MatteTemp;
                update_.FSFE_Matte_Volume = MatteVol;
                update_.FSFE_Matte_CFNo = MatteCFNo;
                update_.FSFE_Matte_SlagBlow = MatteSlagBlow;

                cfdb.SaveChanges();
            }

        }

        public void Add_Stapping(int fsfe_prodid, DateTime stapping_readytime, DateTime stapping_startdate,
          DateTime stapping_enddate, int launder1, int launder2, Nullable<int> slagpotno, int slagtender1, int slagtender2)
        {
            var result = (from stapper_c in cfdb.FSFE_SlagTap
                          where
                              stapper_c.FSFE_ProdId == fsfe_prodid && stapper_c.SlagTap_ReadyTime == stapping_readytime && stapper_c.SlagTap_StartTime == stapping_startdate
                              && stapper_c.SlagTap_EndTime == stapping_enddate && stapper_c.Launder1 == launder1 && stapper_c.Launder2 == launder2 && stapper_c.SlagPotNo == slagpotno
                              && stapper_c.Slag_Tender1 == slagtender1 && stapper_c.Slag_Tender2 == slagtender2
                          select stapper_c).Count();

            if (result == 0)
            {
                //INSERT

                Models.FSFE_SlagTap stapping = new Models.FSFE_SlagTap();

                stapping.FSFE_ProdId = fsfe_prodid;
                stapping.SlagTap_ReadyTime = stapping_readytime;
                stapping.SlagTap_StartTime = stapping_startdate;
                stapping.SlagTap_EndTime = stapping_enddate;
                stapping.Launder1 = launder1;
                stapping.Launder2 = launder2;
                stapping.SlagPotNo = slagpotno;
                stapping.Slag_Tender1 = slagtender1;
                stapping.Slag_Tender2 = slagtender2;

                cfdb.FSFE_SlagTap.Add(stapping);

                cfdb.SaveChanges();
            }
            else
            {

                var update_ = cfdb.FSFE_SlagTap.Where(stapper_c => stapper_c.FSFE_ProdId == fsfe_prodid && stapper_c.SlagTap_ReadyTime == stapping_readytime && stapper_c.SlagTap_StartTime == stapping_startdate
                              && stapper_c.SlagTap_EndTime == stapping_enddate && stapper_c.Launder1 == launder1 && stapper_c.Launder2 == launder2 && stapper_c.SlagPotNo == slagpotno
                              && stapper_c.Slag_Tender1 == slagtender1 && stapper_c.Slag_Tender2 == slagtender2).First();

                update_.FSFE_ProdId = fsfe_prodid;
                update_.SlagTap_ReadyTime = stapping_readytime;
                update_.SlagTap_StartTime = stapping_startdate;
                update_.SlagTap_EndTime = stapping_enddate;
                update_.Launder1 = launder1;
                update_.Launder2 = launder2;
                update_.SlagPotNo = slagpotno;
                update_.Slag_Tender1 = slagtender1;
                update_.Slag_Tender2 = slagtender2;
                cfdb.SaveChanges();


            }
        }

        public void Edit_Mtapping(int fsfe_matte_tapid, DateTime tapping_called, DateTime tapping_startdate,
            DateTime tapping_enddate, int launder1, int launder2, float Matte_Temp, float matte_vol, int MatteSlagBlow, int MatteCFNo)
        {
            //UPDATE
            var mtapping = cfdb.FSFE_Matte_Tapping.Where(mt => mt.FSFE_MatteTapId == fsfe_matte_tapid).First();

            mtapping.FSFE_Matte_CalledDate = tapping_called;

            mtapping.FSFE_Matte_StartDate = tapping_startdate;
            mtapping.FSFE_Matte_EndDate = tapping_enddate;

            mtapping.FSFE_Launder1 = launder1;
            mtapping.FSFE_Launder2 = launder2;

            mtapping.FSFE_Matte_Temp = Matte_Temp;
            mtapping.FSFE_Matte_Volume = matte_vol;

            //slag blow
            mtapping.FSFE_Matte_SlagBlow = MatteSlagBlow;

            //cf no
            mtapping.FSFE_Matte_CFNo = MatteCFNo;

            mtapping.FSFE_Matte_CalledDate = tapping_called;

            cfdb.SaveChanges();

        }

        public void Edit_Stapping(int fsfe_slagtapid, DateTime stapping_readytime, DateTime stapping_startdate,
            DateTime stapping_enddate, int launder1, int launder2, Nullable<int> slogpotno, int slagtender1, int slagtender2)
        {
            //UPDATE
            var stapping = cfdb.FSFE_SlagTap.Where(st => st.SlagTapId == fsfe_slagtapid).First();

            stapping.SlagTap_StartTime = stapping_startdate;
            stapping.SlagTap_EndTime = stapping_enddate;

            stapping.Launder1 = launder1;
            stapping.Launder2 = launder2;
            stapping.SlagPotNo = slogpotno;
            stapping.Slag_Tender1 = slagtender1;
            stapping.Slag_Tender2 = slagtender2;

            //stapping.LaddlePitNo = laddlepitnum;

            //stapping.SlagTemperature = slag_temp;

            stapping.SlagTap_ReadyTime = stapping_readytime;

            cfdb.SaveChanges();

        }

        public void Add_FSFE_SPOTap(int fsfe_prodid, DateTime matteslagdate,
            float h1, float h2, float scum_lvl, float slag_temp, string spotap_comment)
        {
            //INSERT

            Models.FSFE_SPOTap_MatteSlag spotap = new Models.FSFE_SPOTap_MatteSlag();

            spotap.FSFE_ProdId = fsfe_prodid;
            spotap.MatteSlagDate = matteslagdate;
            spotap.H1 = h1;
            spotap.H2 = h2;

            spotap.ScumLevel = scum_lvl;
            spotap.SPOTap_Comment = spotap_comment;
            spotap.Temperature = slag_temp;

            cfdb.FSFE_SPOTap_MatteSlag.Add(spotap);

            cfdb.SaveChanges();
        }

        public void Edit_FSFE_SPOTap(int fsfe_spotap_matteslag, DateTime matteslagdate,
            float h1, float h2, float scum_lvl, float slag_temp, string spotap_comment)
        {
            //UPDATE
            var spotap = cfdb.FSFE_SPOTap_MatteSlag.Where(st => st.FSFE_MatteSlagId == fsfe_spotap_matteslag).First();

            spotap.MatteSlagDate = matteslagdate;
            spotap.H1 = h1;
            spotap.H2 = h2;

            spotap.ScumLevel = scum_lvl;
            spotap.Temperature = slag_temp;
            spotap.SPOTap_Comment = spotap_comment;

            cfdb.SaveChanges();

        }

        public JsonResult FSFE_Load_Checklist(int fsfe_ProdId, int fsfe_paramgroupid)
        {

            var fsfe_checklist = (from clist in cfdb.FSFE_Checklist_Val
                                  where
                                      clist.FSFE_Prod_Id == fsfe_ProdId && clist.FSFE_ParamGroupId == fsfe_paramgroupid
                                  orderby clist.FSFE_Param_Id
                                  select new { clist.FSFE_Param_Id });

            return Json(fsfe_checklist, JsonRequestBehavior.AllowGet);
        }

        public void FSFE_Load_Checklist_Save(int fsfe_ProdId, int fsfe_paramgroupid, string fsfe_params)
        {
            //storedproc

            cfdb.FSFE_CHECKLIST_ASSIGN(fsfe_ProdId, fsfe_paramgroupid, fsfe_params);

            cfdb.SaveChanges();

        }

        public void Add_FSFE_Highlights(int fsfe_prodid, string highl, string turnover)
        {
            //INSERT

            cfdb.FSFE_HLIGHT_ASSIGN(fsfe_prodid, highl, turnover);

            cfdb.SaveChanges();

        }

        public JsonResult FSFE_Load_Highlights(int fsfe_ProdId)
        {

            var fsfe_hlight = (from hlight in cfdb.FSFE_KPI_Val
                               where
                                   hlight.FSFE_Prod_Id == fsfe_ProdId && (hlight.FSFE_Param_Id == 135 || hlight.FSFE_Param_Id == 136)
                               orderby hlight.FSFE_Param_Id
                               select new { hlight.FSFE_KPI_Val_Id, hlight.FSFE_Param_Id, hlight.FSFE_KPI_Comment });

            return Json(fsfe_hlight, JsonRequestBehavior.AllowGet);
        }
        //Flame Pattern (fpattern)
        public JsonResult FSFE_Load_Fpattern(int fsfe_ProdId)
        {

            var f_pattern = (from vwfpattern in cfdb.VWFSFE_FPATTERN_FII
                             where
                                 vwfpattern.FSFE_ProdId == fsfe_ProdId && vwfpattern.FSFE_ParamId == 137
                             orderby vwfpattern.FSFE_FPatternFII_Id
                             select vwfpattern);

            return Json(f_pattern, JsonRequestBehavior.AllowGet);
        }
        ////FII Load
        //public JsonResult FSFE_Load_FII(int fsfe_ProdId)
        //{

        //    var fsfe_FII = (from f_fii in cfdb.FSFE_SELECT_FII(fsfe_ProdId)
        //                    select f_fii);

        //    return Json(fsfe_FII, JsonRequestBehavior.AllowGet);
        //}


        // new FII Load
        public JsonResult FSFE_Load_FII(int fsfe_ProdId)
        {

            var fsfe_FII = (from f_fii in cfdb.FSFE_SELECT_FII(fsfe_ProdId)
                            where
                                  f_fii.FSFE_Param_Id == 138 ||
                                    f_fii.FSFE_Param_Id == 140 ||
                                    f_fii.FSFE_Param_Id == 469 ||
                                    f_fii.FSFE_Param_Id == 194 ||
                                    f_fii.FSFE_Param_Id == 195 ||
                                    f_fii.FSFE_Param_Id == 196 ||
                                    f_fii.FSFE_Param_Id == 197 ||
                                    f_fii.FSFE_Param_Id == 198 ||
                                    f_fii.FSFE_Param_Id == 470 ||
                                    f_fii.FSFE_Param_Id == 471 ||
                                    f_fii.FSFE_Param_Id == 472 ||
                                    f_fii.FSFE_Param_Id == 473 ||
                                    f_fii.FSFE_Param_Id == 474 ||
                                    f_fii.FSFE_Param_Id == 475 ||
                                    f_fii.FSFE_Param_Id == 476 ||
                                    f_fii.FSFE_Param_Id == 477 ||
                                    f_fii.FSFE_Param_Id == 478 ||
                                    f_fii.FSFE_Param_Id == 479 ||
                                    f_fii.FSFE_Param_Id == 480 ||
                                    f_fii.FSFE_Param_Id == 481 ||
                                    f_fii.FSFE_Param_Id == 482
                            select f_fii);

            return Json(fsfe_FII, JsonRequestBehavior.AllowGet);
        }
        //End

        //FII Label
        public JsonResult FSFE_Load_FII_label(int fsfe_ProdId)
        {
            //phase 2 additonal
            var fsfe_FII_manpowe_scre = (from f_fii_ms in cfdb.VWFSFE_OnboardCrew where f_fii_ms.FSFE_Prod_Id == fsfe_ProdId select f_fii_ms);

            var fsfe_FII_label = (from f_fii_lbl in cfdb.VWFSFE_ASSIGNSHIFT where f_fii_lbl.FSFE_Prod_Id == fsfe_ProdId select f_fii_lbl);

            return Json(fsfe_FII_label, JsonRequestBehavior.AllowGet);
        }

        //public void FileUpload(HttpPostedFileBase file)
        //{
        //    if (file != null)
        //    {
        //        string pic = System.IO.Path.GetFileName(file.FileName);
        //        string path = System.IO.Path.Combine(
        //                               Server.MapPath("~/images/profile"), pic);
        //      //   file is uploaded
        //        file.SaveAs(path);

        //        // save the image path path to the database or you can send image 
        //        // directly to database
        //       //  in-case if you want to store byte[] ie. for DB
        //        using (MemoryStream ms = new MemoryStream())
        //        {
        //            file.InputStream.CopyTo(ms);
        //            byte[] array = ms.GetBuffer();
        //        }

        //    }

        //}

        //Equipment Issues
        public JsonResult FSFE_Load_Equipment_Issues(int fsfe_ProdId)
        {

            var fsfe_Equipment_Issues = (from f_ei in cfdb.VWFSFE_EquipmentIssues
                                         where f_ei.FSFE_Prod_Id == fsfe_ProdId
                                         select f_ei);

            return Json(fsfe_Equipment_Issues, JsonRequestBehavior.AllowGet);
        }

        //Dustline Inspections
        public JsonResult FSFE_Load_Dustline_Inspect(int fsfe_ProdId)
        {
            //var dustline_inspect = (from vwdinspect in cfdb.VWFSFE_DustlineInspection_Data
            //                 where
            //                     vwdinspect.FSFE_ProdId == fsfe_ProdId && vwdinspect.FSFE_ParamId == 137
            //                        orderby vwdinspect.FSFE_DustlineInspection_Id
            //                        select vwdinspect);

            //return Json(dustline_inspect, JsonRequestBehavior.AllowGet);

            var dustline_inspect = (from vwdinspect in cfdb.VWFSFE_DustlineInspection_Data
                                    where
                                        vwdinspect.FSFE_ProdId == fsfe_ProdId
                                    orderby vwdinspect.FSFE_DustlineInspection_Id
                                    select vwdinspect);

            return Json(dustline_inspect, JsonRequestBehavior.AllowGet);

            //var fsfe_Dustline_Inspect = (from vwdinspect in cfdb.VWFSFE_DustlineInspection_Data
            //                             where vwdinspect.FSFE_ProdId == fsfe_ProdId
            //                                select vwdinspect);

            //return Json(fsfe_Dustline_Inspect, JsonRequestBehavior.AllowGet);

        }





        public void Delete_DSI(int dsi_id)
        {
            //Delete
            var dsi = cfdb.FSFE_DustlineInspection_Val.Where(d =>
                d.FSFE_DustlineInspection_Id == dsi_id).First();

            cfdb.FSFE_DustlineInspection_Val.Remove(dsi);

            cfdb.SaveChanges();
        }


        public JsonResult CycStageCount(int cycid)
        {

            var stagecount = (from c in cfdb.CycleStages where c.CycleId == cycid && c.ActiveStatus == true select c).Count();

            return Json(stagecount, JsonRequestBehavior.AllowGet);

        }



        //public int? empid { get; set; }

        //public int? crew_AddlEmpidA { get; set; }

        //public int? crew_AddlEmpidB { get; set; }




        //    return Json(target, JsonRequestBehavior.AllowGet);
        //}


        //public double MatteTemp { get; set; }

        //public double matte_temp { get; set; }

        //    return Json(target, JsonRequestBehavior.AllowGet);
        //}

        public int? empid { get; set; }

        public int? crew_AddlEmpidA { get; set; }

        public int? crew_AddlEmpidB { get; set; }


        public JsonResult FSFE_Targets_Group(string groupname)
        {
            var target = (from t in cfdb.FSFE_ParamGroup
                          where (t.id >= 23 && t.id <= 31)
                          select new { t.id, t.FSFE_Param });

            return Json(target, JsonRequestBehavior.AllowGet);
        }

        public JsonResult FSFE_Targets_tbl_names()
        {
            var target = (from t in cfdb.FSFE_Param
                          where (t.FSFE_ParamGroupId >= 23 && t.FSFE_ParamGroupId <= 33) || t.FSFE_ParamGroupId == 37 || t.FSFE_ParamGroupId == 39 || t.FSFE_ParamGroupId == 40
                          orderby t.FSFE_ParamGroupId ascending
                          select new { t.FSFE_Param_Id, t.FSFE_Param_Name, t.FSFE_ParamGroupId, t.FSFE_Param_Type_Id });

            return Json(target, JsonRequestBehavior.AllowGet);
        }

        public JsonResult FSFE_Targets_tbl_data()
        {
            var target = (from t in cfdb.VWFSFE_Targets_Data
                          select new { t.FSFE_ParamId, t.FSFE_Param_Name, t.FSFE_Target_NumValue, t.FSFE_Target_ValueTypeId, t.FSFE_ParamGroupId, t.FSFE_ParamGroup });

            return Json(target, JsonRequestBehavior.AllowGet);
        }

        public void Save_FSFETargets(List<FSFETargets> items)
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

                cfdb.FSFE_NUM_TARGETVAL_SP(paramid, group, numval);
                cfdb.SaveChanges();
            }
        }

        public class FSFETargets
        {
            public int paramid { get; set; }
            public int group { get; set; }
            public decimal numval { get; set; }
        }

        public ActionResult FSFE_Targets()
        {
            return View();
        }

        public ActionResult FSFE_Comments()
        {
            return View();
        }

        public JsonResult Load_FSFE_Comments(DateTime date)
        {
            var FSFE = (from com in cfdb.VWFSFE_Comments_Data
                        where com.FSFE_DTime == date
                        select com);
            return Json(FSFE, JsonRequestBehavior.AllowGet);
        }

        public void Delete_FSFE_Comments(DateTime date)
        {
            cfdb.Database.ExecuteSqlCommand("DELETE FROM [FSFE_Comments_Data] WHERE FSFE_DTime = @p0", date);
            cfdb.SaveChanges();
        }

        public void Save_FSFE_Comments(List<FSFE_Comment> items)
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

                cfdb.FSFE_COMMENTS_STRVAL_SP(paramid, date, strval);
                cfdb.SaveChanges();
            }
        }

        public class FSFE_Comment
        {
            public DateTime date { get; set; }
            public int paramid { get; set; }
            public string strval { get; set; }
        }

        public JsonResult Load_FSFE_BuildUp_Daily(DateTime date)
        {
            var daily = (from d in cfdb.VWFSFE_Buildup_Daily
                         where d.FSFE_Date == date
                         select d);
            return Json(daily, JsonRequestBehavior.AllowGet);
        }

        public void Save_Buildup_Daily(List<FSFE_Buildup_Daily> items)
        {
            var daily = items;
            int paramid;
            DateTime date;
            int numval;

            for (int i = 0; i < daily.Count; i++)
            {
                paramid = daily[i].paramid;
                date = daily[i].date;
                numval = daily[i].numval;

                cfdb.FSFE_BUILDUP_DAILY_NUM_SP(paramid, date, numval);
                cfdb.SaveChanges();
            }
        }

        public class FSFE_Buildup_Daily
        {
            public int paramid { get; set; }
            public DateTime date { get; set; }
            public int numval { get; set; }
        }

        public JsonResult Load_FSFE_BuildUp_Shift(int prodid)
        {
            var Shift = (from d in cfdb.VWFSFE_Buildup_Shift
                         where d.FSFE_Prod_Id == prodid
                         select d);
            return Json(Shift, JsonRequestBehavior.AllowGet);
        }

        public void Save_Buildup_Shift(List<FSFE_Buildup_Shift> items_shift)
        {
            var Shift = items_shift;
            int paramid;
            int prodid;
            int numval;

            for (int i = 0; i < Shift.Count; i++)
            {
                paramid = Shift[i].paramid;
                prodid = Shift[i].prodid;
                numval = Shift[i].numval;

                cfdb.FSFE_BUILDUP_SHIFT_NUM_SP(paramid, prodid, numval);
                cfdb.SaveChanges();
            }
        }

        public class FSFE_Buildup_Shift
        {
            public int paramid { get; set; }
            public int prodid { get; set; }
            public int numval { get; set; }
        }

        public JsonResult FSF_getProdId(DateTime date, int shiftid)
        {
            //int prodid = cfdb.FSFE_Prod.First(a => a.FSFE_Prod_Date == date && a.FSFE_Prod_Shift == shiftid).FSFE_Prod_Id;
            var prodid = cfdb.FSFE_PRODID_CHANGE(date, shiftid);

            return Json(prodid, JsonRequestBehavior.AllowGet);
        }

        public JsonResult save_mtapper_crew(int fsfe_prodid, int launder, int mtapperid)
        {
            //INSERT
            int i;

            var result = (from mtapper_c in cfdb.FSFE_MatteTapperCrew
                          where
                              mtapper_c.FSFE_ProdId == fsfe_prodid && mtapper_c.Tapper_Number == launder
                          select mtapper_c).Count();

            if (result == 0 && mtapperid != 0)
            {
                Models.FSFE_MatteTapperCrew mtapper = new Models.FSFE_MatteTapperCrew();

                mtapper.FSFE_ProdId = fsfe_prodid;
                mtapper.Tapper_Number = launder;
                mtapper.Matte_Tapper_EmpId = mtapperid;

                cfdb.FSFE_MatteTapperCrew.Add(mtapper);

                cfdb.SaveChanges();

                i = 0;
            }
            else
            {

                var update_crew = cfdb.FSFE_MatteTapperCrew.Where(c => c.FSFE_ProdId == fsfe_prodid && c.Tapper_Number == launder).First();

                update_crew.Matte_Tapper_EmpId = mtapperid;

                cfdb.SaveChanges();

                i = 1;
            }

            return Json(i, JsonRequestBehavior.AllowGet);
        }

        public JsonResult load_fsfe_dustline_inspectime(int fsfe_ProdId, int dustlineinspectId)
        {
            //var dustline_inspect = (from vwdinspect in cfdb.VWFSFE_DustlineInspection_Data
            //                 where
            //                     vwdinspect.FSFE_ProdId == fsfe_ProdId && vwdinspect.FSFE_ParamId == 137
            //                        orderby vwdinspect.FSFE_DustlineInspection_Id
            //                        select vwdinspect);

            //return Json(dustline_inspect, JsonRequestBehavior.AllowGet);

            var dustline_inspect = (from vwdinspect in cfdb.VWFSFE_DustlineInspection_Data
                                    where
                                        vwdinspect.FSFE_ProdId == fsfe_ProdId && vwdinspect.FSFE_DustlineInspection_Id == dustlineinspectId
                                    orderby vwdinspect.FSFE_DustlineInspection_Id
                                    select vwdinspect);

            return Json(dustline_inspect, JsonRequestBehavior.AllowGet);

            //var fsfe_Dustline_Inspect = (from vwdinspect in cfdb.VWFSFE_DustlineInspection_Data
            //                             where vwdinspect.FSFE_ProdId == fsfe_ProdId
            //                                select vwdinspect);

            //return Json(fsfe_Dustline_Inspect, JsonRequestBehavior.AllowGet);

        }



    }


}
