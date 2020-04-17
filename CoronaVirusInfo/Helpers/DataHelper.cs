// Decompiled with JetBrains decompiler
// Type: CoronaVirusApp.Helpers.DataHelper
// Assembly: CoronaVirusApp, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 85345770-ED5F-4212-BCB1-607D0DE49AE9
// Assembly location: C:\temp\CoronaVirusApp.dll

using CoronaVirusApp.Data.Entities;
using CoronaVirusApp.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace CoronaVirusApp.Helpers
{
    public class DataHelper
    {
        private const string API_Base_URL = "https://corona.lmao.ninja/v2";

        public static string GetVirusInfoFromAPI()
        {
            string content = RestClientExtensions.Get(new RestClient(API_Base_URL), new RestRequest("countries", (DataFormat)0)).Content;
            return content;
        }

        public static async Task<string> GetVirusInfoFromAPIAsync()
        {
            string info = (await new RestClient(API_Base_URL).ExecuteAsync<string>(new RestRequest("countries", (DataFormat)0), new CancellationToken())).Content;
            await SaveVirusInfoAsync(info);
            return info;
        }

        public static async Task SaveVirusInfoAsync(string virusInfo)
        {
            CoronaContext context = new CoronaContext();
            context.Database.EnsureCreated();
            CoronaVirusSummary coronaVirusSummary = await context.CoronaVirusSummaries.SingleOrDefaultAsync(x => x.Date == DateTime.Today, new CancellationToken());
            if (coronaVirusSummary == null)
            {
                context.CoronaVirusSummaries.Add(new CoronaVirusSummary()
                {
                    Date = DateTime.Today,
                    VirusInfo = virusInfo
                });
                int num = await context.SaveChangesAsync(new CancellationToken());
            }
            else
            {
                coronaVirusSummary.VirusInfo = virusInfo;
                int num = await context.SaveChangesAsync(new CancellationToken());
            }
        }

        public static void SaveVirusInfo(string virusInfo)
        {
            CoronaContext coronaContext = new CoronaContext();
            coronaContext.Database.EnsureCreated();
            CoronaVirusSummary coronaVirusSummary = coronaContext.CoronaVirusSummaries.SingleOrDefault(x => x.Date == DateTime.Today);
            if (coronaVirusSummary == null)
            {
                coronaContext.CoronaVirusSummaries.Add(new CoronaVirusSummary()
                {
                    Date = DateTime.Today,
                    VirusInfo = virusInfo
                });
                coronaContext.SaveChanges();
            }
            else
            {
                coronaVirusSummary.VirusInfo = virusInfo;
                coronaContext.SaveChanges();
            }
        }

        public static CountryCoronaInfo GetTodaysCoronaInfoByCountry(string countryCode)
        {
            CountryCoronaInfo countryCoronaInfo = new CountryCoronaInfo();
            using (CoronaContext coronaContext = new CoronaContext())
            {
                CoronaVirusSummary coronaVirusSummary = coronaContext.CoronaVirusSummaries.FirstOrDefault(f => f.Date == DateTime.Today);
                if (coronaVirusSummary != null)
                {
                    return ((IEnumerable<CountryCoronaInfo>)JsonConvert.DeserializeObject<List<CountryCoronaInfo>>(coronaVirusSummary.VirusInfo)).SingleOrDefault(c => c.CountryInfo.Iso2 == countryCode);

                }
            }
            return null;
        }

        public static async Task<List<CountryCoronaInfo>> GetTodaysCoronaInfoAllCountries()
        {
            using (CoronaContext context = new CoronaContext())
            {
                CoronaVirusSummary coronaVirusSummary = await context.CoronaVirusSummaries.FirstOrDefaultAsync(f => f.Date == DateTime.Today, new CancellationToken());
                if (coronaVirusSummary != null)
                    return await DataHelper.GetCountryInfoListAsync(coronaVirusSummary.VirusInfo);
            }
            return null;
        }

        public static async Task<List<CountryCoronaInfo>> GetCountryInfoListAsync(string infoJson)
        {
            return string.IsNullOrWhiteSpace(infoJson) ? null : await Task.Run(() =>
           {
               List<CountryCoronaInfo> countryCoronaInfoList = new List<CountryCoronaInfo>();
               List<CountryCoronaInfo> list = (JsonConvert.DeserializeObject<List<CountryCoronaInfo>>(infoJson)).OrderByDescending(s => s.Cases.GetValueOrDefault()).ToList();
               int num = 0;
               foreach (var countryCoronaInfo in list)
               {
                   ++num;
                   countryCoronaInfo.Rank = num;
                   countryCoronaInfoList.Add(countryCoronaInfo);
               }
               return countryCoronaInfoList;
           });
        }

        public static IQueryable<CountryCoronaInfo> GetCountryInfoQueryableAsync()
        {
            var infoJson = GetVirusInfoFromAPI();

            var list =
                JsonConvert.DeserializeObject<List<CountryCoronaInfo>>(infoJson);

            return list.AsQueryable();
        }

        public static IEnumerable<CountryCoronaInfo> GetRanked(List<CountryCoronaInfo> countryInfo)
        {
            List<CountryCoronaInfo> countryCoronaInfoList = new List<CountryCoronaInfo>();

            int num = 0;
            foreach (var countryCoronaInfo in countryInfo)
            {
                ++num;
                countryCoronaInfo.Rank = num;
                countryCoronaInfoList.Add(countryCoronaInfo);
            }
            return countryCoronaInfoList;
        }

        public static async Task<List<CountryCoronaInfoWrapper>> GetCoronaInfoByCountryByDaysAsync(string countryCode, int numberOfDays)
        {
            return await Task.Run(() =>
           {
               List<CountryCoronaInfoWrapper> source = new List<CountryCoronaInfoWrapper>();
               if (!string.IsNullOrWhiteSpace(countryCode))
               {
                   using (CoronaContext coronaContext = new CoronaContext())
                   {
                       List<CoronaVirusSummary> list = coronaContext.CoronaVirusSummaries.OrderByDescending(o => o.Date).Take(numberOfDays).ToList();
                       if (list.Count > 0)
                       {
                           foreach (CoronaVirusSummary coronaVirusSummary in list)
                           {
                               CountryCoronaInfo countryCoronaInfo = ((IEnumerable<CountryCoronaInfo>)JsonConvert.DeserializeObject<List<CountryCoronaInfo>>(coronaVirusSummary.VirusInfo)).SingleOrDefault(c => c.CountryInfo.Iso2 == countryCode);
                               if (countryCoronaInfo != null)
                               {
                                   CountryCoronaInfoWrapper coronaInfoWrapper = new CountryCoronaInfoWrapper()
                                   {
                                       CountryCoronaInfo = countryCoronaInfo,
                                       Date = coronaVirusSummary.Date.ToString("dd/MM/yy")
                                   };
                                   source.Add(coronaInfoWrapper);
                               }
                           }
                       }
                   }
               }
               return source.OrderBy(x => x.Date).ToList();
           });
        }
    }
}
