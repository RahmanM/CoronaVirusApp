// Decompiled with JetBrains decompiler
// Type: CoronaVirusApp.Controllers.CoronaInfoController
// Assembly: CoronaVirusApp, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 85345770-ED5F-4212-BCB1-607D0DE49AE9
// Assembly location: C:\temp\CoronaVirusApp.dll

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
