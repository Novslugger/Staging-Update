using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Data.SqlTypes;


namespace PASAROperations.Controllers
{
    public class FileUploadController : ApiController
    {
        Models.PASAROperationEntities cfdb = new Models.PASAROperationEntities();

        [System.Web.Http.HttpPost]
        public void UploadFile(int fsfe_prodid, int fsfe_paramid, string fsfe_remarks, string fsfe_mode)
        {

            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                var httpPostedFile = HttpContext.Current.Request.Files["UploadedImage"];
                string fileExtension = System.IO.Path.GetExtension(httpPostedFile.FileName);


                if (httpPostedFile != null)
                {
                    if (fileExtension == ".jpg" || fileExtension == ".JPG" || fileExtension == ".png" || fileExtension == ".PNG")
                    {

                        string folderpath = System.IO.Path.Combine(HttpContext.Current.Server.MapPath("~/OperationPicture/" + fsfe_mode + "/" + fsfe_prodid));
                        DirectoryInfo di = Directory.CreateDirectory(folderpath);


                        var filename_ = (from fname in cfdb.FSFE_FPATTERN_FII_IMAGES(fsfe_prodid, fsfe_paramid, fsfe_remarks, fsfe_mode, fileExtension) select fname).First();

                        cfdb.SaveChanges();

                        string filename = filename_.ToString();
                        string path = System.IO.Path.Combine(folderpath, filename);
                        httpPostedFile.SaveAs(path);
                    }
                }
            }
            else
            {
                cfdb.FSFE_FPATTERN_FII_IMAGES(fsfe_prodid, fsfe_paramid, fsfe_remarks, "no-image", "");
                cfdb.SaveChanges();
            }
        }

        [System.Web.Http.HttpPost]
        public void EditUploadFile(int fsfe_prodid, int fsfe_fpatternid, string fsfe_remarks, string fsfe_mode)
        {

            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {

                var httpPostedFile = HttpContext.Current.Request.Files["UploadedImageEdit"];
                string fileExtension = System.IO.Path.GetExtension(httpPostedFile.FileName);


                if (httpPostedFile != null)
                {
                    if (fileExtension == ".jpg" || fileExtension == ".JPG" || fileExtension == ".png" || fileExtension == ".PNG")
                    {

                        string folderpath = System.IO.Path.Combine(HttpContext.Current.Server.MapPath("~/OperationPicture/FPattern/" + fsfe_prodid));
                        DirectoryInfo di = Directory.CreateDirectory(folderpath);


                        var filename_ = (from fname in cfdb.FSFE_FPATTERN_EDIT_FII_IMAGES(fsfe_fpatternid, fsfe_remarks, fsfe_mode, fileExtension) select fname).First();

                        cfdb.SaveChanges();

                        string filename = filename_.ToString();
                        string path = System.IO.Path.Combine(folderpath, filename);
                        httpPostedFile.SaveAs(path);
                    }
                }

            }
            else
            {
                cfdb.FSFE_FPATTERN_EDIT_FII_IMAGES(fsfe_fpatternid, fsfe_remarks, fsfe_mode, "");
                cfdb.SaveChanges();
            }
        }
        [System.Web.Http.HttpPost]
        public void UploadFileFII(int fsfe_prod_id, int fsfe_paramid, string fsfe_remarks, string fsfe_mode)
        {

            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                var httpPostedFile = HttpContext.Current.Request.Files["UploadedImage"];
                string fileExtension = System.IO.Path.GetExtension(httpPostedFile.FileName);


                if (httpPostedFile != null)
                {
                    if (fileExtension == ".jpg" || fileExtension == ".JPG" || fileExtension == ".png" || fileExtension == ".PNG")
                    {
                        string folderpath = System.IO.Path.Combine(HttpContext.Current.Server.MapPath("~/OperationPicture/" + fsfe_mode + "/" + fsfe_prod_id));
                        DirectoryInfo di = Directory.CreateDirectory(folderpath);


                        var filename_ = (from fname in cfdb.FSFE_FII_IMAGES(fsfe_prod_id, fsfe_paramid, fsfe_remarks, fsfe_mode, fileExtension) select fname).First();

                        cfdb.SaveChanges();

                        string filename = filename_.ToString();
                        string path = System.IO.Path.Combine(folderpath, filename);
                        httpPostedFile.SaveAs(path);
                    }
                }
            }
            else
            {
                cfdb.FSFE_FII_IMAGES(fsfe_prod_id, fsfe_paramid, fsfe_remarks, "no-image", "");
                cfdb.SaveChanges();
            }
        }
        //Dustline Inspection
        [System.Web.Http.HttpPost]
        public void DSIUpload(int fsfe_prod_id, string fsfe_inspectiontime, int fsfe_paramid, string fsfe_remarks, string fsfe_mode)
        {

            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                var httpPostedFile = HttpContext.Current.Request.Files["UploadedImage"];
                string fsfe_file_ext = System.IO.Path.GetExtension(httpPostedFile.FileName);


                if (httpPostedFile != null)
                {
                    if (fsfe_file_ext == ".jpg" || fsfe_file_ext == ".JPG" || fsfe_file_ext == ".png" || fsfe_file_ext == ".PNG")
                    {
                        string folderpath = System.IO.Path.Combine(HttpContext.Current.Server.MapPath("~/OperationPicture/" + fsfe_mode + "/" + fsfe_prod_id));
                        DirectoryInfo di = Directory.CreateDirectory(folderpath);


                        var filename_ = (from fname in cfdb.FSFE_DSI_IMAGES(fsfe_prod_id, fsfe_inspectiontime, fsfe_paramid, fsfe_remarks, fsfe_mode, fsfe_file_ext) select fname).Last();

                        cfdb.SaveChanges();

                        string filename = filename_.ToString();
                        string path = System.IO.Path.Combine(folderpath, filename);
                        httpPostedFile.SaveAs(path);
                    }
                }
            }
            else
            {
                cfdb.FSFE_DSI_IMAGES(fsfe_prod_id, fsfe_inspectiontime, fsfe_paramid, fsfe_remarks, "no-image", "");
                cfdb.SaveChanges();
            }
        }

    }
}
