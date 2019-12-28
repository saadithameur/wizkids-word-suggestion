using backend.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SQLite;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;

namespace backend.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SuggestionController : ApiController
    {
        
        [Route("getSuggestions")]
        public async System.Threading.Tasks.Task<IHttpActionResult> getAllSuggestionAsync(String locale, String text)
        {
            //geting data from web service
            var client = new HttpClient();
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", ConfigurationManager.AppSettings["WebServiceToken"].ToString());
            var json = await client.GetStringAsync("https://services.lingapps.dk/misc/getPredictions?locale=" + locale + "&text=" + text);
            List<String> webServiceSuggestions = JsonConvert.DeserializeObject<List<String>>(json).ToList();

            //getting data from dextionary
            List<String> dictionarySuggestions = new List<string>();
            var path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Dictionary.db");
            SQLiteConnection con = new SQLiteConnection(@"Data Source="+path);
            con.Open();
            SQLiteCommand cmd = con.CreateCommand();
            cmd.CommandText = "SELECT Value FROM Words where Value like '%" + text + "%'";
            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    dictionarySuggestions.Add(reader.GetString(0));
                }
            }

            //returning result
            var result = new Suggestion { webServiceSuggestion = webServiceSuggestions, dictionnarySuggestion = dictionarySuggestions };
            return Json(result);
        }
    }

}
