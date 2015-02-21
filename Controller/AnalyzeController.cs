using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Umbraco.Web.WebApi;

namespace Franchise_Umbraco.Controllers.API
{
    public class AnalyzeController : UmbracoAuthorizedApiController
    {
        public IEnumerable<Node> GetAllNodes()
        {
            var contentService = Services.ContentService;
            var root = contentService.GetRootContent().First();
            IEnumerable<Node> active = from item in contentService.GetDescendants(root)
                                       select new Node
                                       {
                                           Id = item.Id,
                                           Name = item.Name,
                                           CreateDate = item.CreateDate.ToString(),
                                           Status = item.Status.ToString()
                                       };
            IEnumerable<Node> trashed = from item in contentService.GetContentInRecycleBin()
                                        select new Node
                                        {
                                            Id = item.Id,
                                            Name = item.Name,
                                            CreateDate = item.CreateDate.ToString(),
                                            Status = item.Status.ToString()
                                        };

            IEnumerable<Node> nodes = active.Concat(trashed);
            return nodes;
        }

    }

    public class Node
    {
        [JsonProperty("Id")]
        public int Id { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("createDate")]
        public string CreateDate { get; set; }
        [JsonProperty("status")]
        public string Status { get; set; }
    }
}
