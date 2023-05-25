using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactCheesecakeOrdering.Data;
using System;

namespace ReactCheesecakeOrdering.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheesecakeController : ControllerBase
    {
        private string _connectionString;

        public CheesecakeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getorders")]
        public List<CheesecakeOrder> GetOrders()
        {
            var repo = new CheesecakeRepository(_connectionString);
            return repo.GetOrders();
        }

        [HttpPost]
        [Route("addorder")]
        public void AddOrder(CheesecakeOrder order)
        {
            var repo = new CheesecakeRepository(_connectionString);
            repo.AddOrder(order);
        }

        [HttpGet]
        [Route("getorderbyid")]
        public CheesecakeOrder GetOrderById(int id)
        {
            var repo = new CheesecakeRepository(_connectionString);
            return repo.GetOrderById(id);
        }
    }
}
