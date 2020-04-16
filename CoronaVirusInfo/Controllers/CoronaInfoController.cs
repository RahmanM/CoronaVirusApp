using CoronaVirusApp.Helpers;
using CoronaVirusApp.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CoronaVirusApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CoronaInfoController : ControllerBase
    {
        [HttpGet]
        public async Task<IEnumerable<CountryCoronaInfo>> Get()
        {
            return await DataHelper.GetCountryInfoListAsync(await DataHelper.GetVirusInfoFromAPIAsync());
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
