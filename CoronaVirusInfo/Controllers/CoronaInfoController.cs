using CoronaVirusApp.Helpers;
using CoronaVirusApp.Models;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;
using Sieve.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoronaVirusApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CoronaInfoController : ControllerBase
    {
        private readonly SieveProcessor _sieveProcessor;

        public CoronaInfoController(SieveProcessor sieveProcessor)
        {
            _sieveProcessor = sieveProcessor;
        }

        [HttpGet]
        public async Task<IEnumerable<CountryCoronaInfo>> Get()
        {
            return await DataHelper.GetCountryInfoListAsync(await DataHelper.GetVirusInfoFromAPIAsync());
        }

        [HttpGet("GetSorted")]
        public IEnumerable<CountryCoronaInfo> GetSorted([FromQuery] SieveModel sieveModel, bool filter=false)
        {
            var data = DataHelper.GetCountryInfoQueryableAsync();
            var result = _sieveProcessor.Apply(sieveModel, data);
            return DataHelper.GetRanked(result.ToList());
        }

        [HttpGet("{countryCode}")]
        public async Task<IEnumerable<CountryCoronaInfoWrapper>> Get([FromRoute] string countryCode)
        {
            return await DataHelper.GetCoronaInfoByCountryByDaysAsync(countryCode, 14);
        }

        [HttpGet("{CountryCode}/{days}")]
        public async Task<IEnumerable<CountryCoronaInfoWrapper>> Get([FromRoute] string countryCode, int days)
        {
            return await DataHelper.GetCoronaInfoByCountryByDaysAsync(countryCode, days);
        }

    }
}
