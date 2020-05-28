using Sieve.Attributes;
using System;

namespace CoronaVirusApp.Models
{
    public class CountryCoronaInfo
    {
        public string Country { get; set; }

        public CountryInfo CountryInfo { get; set; }

        [Sieve(CanSort = true, CanFilter = true)]
        public decimal? Cases { get; set; }

        [Sieve(CanSort = true, CanFilter = true)]
        public decimal? TodayCases { get; set; }

        [Sieve(CanSort = true, CanFilter = true)]
        public decimal? Deaths { get; set; }

        [Sieve(CanSort = true, CanFilter = true)]
        public decimal? TodayDeaths { get; set; }

        [Sieve(CanSort = true, CanFilter = true)]
        public decimal? Recovered { get; set; }

        [Sieve(CanSort = true, CanFilter = true)]
        public decimal? Active { get; set; }

        [Sieve(CanSort = true, CanFilter = true)]
        public decimal? Critical { get; set; }

        [Sieve(CanSort = true, CanFilter = true)]
        public decimal? CasesPerOneMillion { get; set; }

        [Sieve(CanSort = true, CanFilter = true)]
        public decimal? DeathsPerOneMillion { get; set; }
       
        public int Rank { get; set; }

        [Sieve(CanSort = true, CanFilter = true)]
        public decimal? PercentRecovered { 
            get { 
                var result = Math.Round((Recovered.GetValueOrDefault() / Cases.GetValueOrDefault()) * 100m, 2);
                return result;
            }
        }

        [Sieve(CanSort = true, CanFilter = true)]
        public decimal? PercentDied
        {
            get
            {
                var result = Math.Round((Deaths.GetValueOrDefault() / Cases.GetValueOrDefault()) * 100m, 2);
                return result;
            }
        }

        [Sieve(CanSort = true, CanFilter = true)]
        public decimal? PercentActive
        {
            get
            {
                var result = Math.Round((Active.GetValueOrDefault() / Cases.GetValueOrDefault()) * 100m, 2);
                return result;
            }
        }
    }
}
