// Decompiled with JetBrains decompiler
// Type: CoronaVirusApp.Models.CountryCoronaInfo
// Assembly: CoronaVirusApp, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 85345770-ED5F-4212-BCB1-607D0DE49AE9
// Assembly location: C:\temp\CoronaVirusApp.dll

namespace CoronaVirusApp.Models
{
  public class CountryCoronaInfo
  {
    public string Country { get; set; }

    public CountryInfo CountryInfo { get; set; }

    public long? Cases { get; set; }

    public long? TodayCases { get; set; }

    public long? Deaths { get; set; }

    public long? TodayDeaths { get; set; }

    public long? Recovered { get; set; }

    public long? Active { get; set; }

    public long? Critical { get; set; }

    public long? CasesPerOneMillion { get; set; }

    public long? DeathsPerOneMillion { get; set; }

    public int Rank { get; set; }
  }
}
