using Sieve.Attributes;

namespace CoronaVirusApp.Models
{
    public class CountryCoronaInfo
    {
        public string Country { get; set; }

        public CountryInfo CountryInfo { get; set; }

        [Sieve(CanSort = true, CanFilter = true)]
        public long? Cases { get; set; }

        [Sieve(CanSort = true, CanFilter = true)]
        public long? TodayCases { get; set; }

        [Sieve(CanSort = true, CanFilter = true)]
        public long? Deaths { get; set; }

        [Sieve(CanSort = true, CanFilter = true)]
        public long? TodayDeaths { get; set; }

        [Sieve(CanSort = true, CanFilter = true)]
        public long? Recovered { get; set; }

        [Sieve(CanSort = true, CanFilter = true)]
        public long? Active { get; set; }

        [Sieve(CanSort = true, CanFilter = true)]
        public long? Critical { get; set; }

        [Sieve(CanSort = true, CanFilter = true)]
        public long? CasesPerOneMillion { get; set; }

        [Sieve(CanSort = true, CanFilter = true)]
        public long? DeathsPerOneMillion { get; set; }

        
        public int Rank { get; set; }
    }
}
