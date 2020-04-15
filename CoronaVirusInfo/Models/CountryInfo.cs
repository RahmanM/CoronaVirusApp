// Decompiled with JetBrains decompiler
// Type: CoronaVirusApp.Models.CountryInfo
// Assembly: CoronaVirusApp, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 85345770-ED5F-4212-BCB1-607D0DE49AE9
// Assembly location: C:\temp\CoronaVirusApp.dll

using System;

namespace CoronaVirusApp.Models
{
  public class CountryInfo
  {
    public long Id { get; set; }

    public double Lat { get; set; }

    public double Long { get; set; }

    public Uri Flag { get; set; }

    public string Iso3 { get; set; }

    public string Iso2 { get; set; }
  }
}
