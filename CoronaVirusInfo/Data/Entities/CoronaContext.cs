
using Microsoft.EntityFrameworkCore;

namespace CoronaVirusApp.Data.Entities
{
    public class CoronaContext : DbContext
  {
    public DbSet<CoronaVirusSummary> CoronaVirusSummaries { get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder options)
        //{
        //  SqliteDbContextOptionsBuilderExtensions.UseSqlite(options, "Data Source=CoronaVirusInfo.db", null);
        //}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseSqlite(@"Data Source=CoronaVirusInfo.db;");
        }
    }
}
