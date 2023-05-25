using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace ReactCheesecakeOrdering.Data
{
    public class CheesecakeDataContext : DbContext
    {
        private string _connectionString;

        public CheesecakeDataContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public DbSet<CheesecakeOrder> CheesecakeOrders { get; set; }

    }
}
