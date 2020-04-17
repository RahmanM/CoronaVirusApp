
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
