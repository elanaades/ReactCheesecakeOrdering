using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactCheesecakeOrdering.Data
{
    public class CheesecakeRepository
    {
        private readonly string _connectionString;
        
        public CheesecakeRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<CheesecakeOrder> GetOrders()
        {
            using var context = new CheesecakeDataContext(_connectionString);
            return context.CheesecakeOrders.ToList();
        }
        public void AddOrder(CheesecakeOrder order)
        {
            using var context = new CheesecakeDataContext(_connectionString);
            context.CheesecakeOrders.Add(order);
            context.SaveChanges();
        }
        public CheesecakeOrder GetOrderById(int id)
        {
            using var context = new CheesecakeDataContext(_connectionString);
            return context.CheesecakeOrders.FirstOrDefault(o => o.Id == id);
        }
    }
}
