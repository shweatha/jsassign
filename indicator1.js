var fs = require('fs');
var content = [];
var cont = [];
var file1 = [];
var arg;
//var sums=0;
var asia = [];
var file2 = [];
var asiasearch;
//var sum = 0;

var asian = ["China", "India", "Indonesia", "Pakistan", "Bangladesh", "Russia", "Japan", "Iran", "Turkey", "Thailand", "Myanmar", "SouthKorea", "Iraq", "SaudiArabia", "Uzbekistan", "Malaysia", "Nepal", "Afghanistan", "Yemen", "NorthKorea", "Taiwan", "Syria", "SriLanka", "Kazakhstan", "Cambodia", "Azerbaijan", "United Arab Emirates", "Tajikistan", "Israel", "Hong Kong", " Jordan", "Singapore", "Turkmenistan", "Lebanon", "Kuwait", "Georgia", "Mongolia", "Armenia", "Qatar", "Bahrain", "Timor-Leste", "Bhutan", "Brunei", "Maldives"];
var yr=[1960,1970,1980,1990,2000,2010,2014];
var header = [];
var ns = fs.createReadStream('Indicators.csv', 'utf-8');
ns.on('data', function(test) {
    var lines = test.toString().split("\n");
    for (var i = 0; i < lines.length; i++) {
        content.push(lines[i].toString());
    }
});

ns.on("end", function() {
    function search(arg) {
        for (var i = 0; i < asian.length; i++) {
            if (arg === asian[i]) {

                return true;
            }
        }
    }
    header = content[0].split(",");
    var indexOfCountry=header.indexOf("CountryName");
    var indexOfIndicator=header.indexOf("IndicatorName");
    for (var i = 1, len = content.length; i < len - 1; i++) {
        var obj = {};

        var line = content[i].split(",");

        if (line[indexOfCountry] === "India" && (line[indexOfIndicator] === "Urban population (% of total)" || line[indexOfIndicator] === "Rural population (% of total population)")) {
            for (var j = 0; j < header.length; j++) {
                obj[header[j]] = line[j];
            }
            cont.push(obj);
        }
    }
    for (var i = 1, len = content.length; i < len - 1; i++) {
        var contasia = {};

        var line = content[i].split(",");
        asiasearch = search(line[indexOfCountry]);
        if (asiasearch) {
            if (line[indexOfIndicator] === "Urban population" || line[indexOfIndicator] === "Rural population") {
                for (var j = 0; j < header.length; j++) {
                    contasia[header[j]] = line[j];
                }

                asia.push(contasia);
            }
        }
    }

for(var i=0;i<yr.length;i++)
{var sum1=0;
var sum2=0;
  for (var j = 0; j < asia.length; j++)
  {

    if (asia[j].Year == yr[i])  {
    //  var b={};
      if(asia[j].IndicatorName === "Rural population")
        {
          sum1 = parseInt(sum1) + parseInt(asia[j].Value);
        }
        if(asia[j].IndicatorName === "Urban population")
        {
          sum2 = parseInt(sum2) + parseInt(asia[j].Value);
        }

    }

    }


    file2.push({"Year":yr[i],"Ruralvalue":sum1,"Urbanvalue":sum2});
}
  for (var i = 0; i < cont.length; i++) {

        file1.push({
            'IndicatorName': cont[i].IndicatorName,
            'Year': cont[i].Year,
            'value': cont[i].Value
        });

    }
    var json_convert = JSON.stringify(file1);
    fs.appendFile('data3.json', json_convert);
    console.log("done1");
    var json_con = JSON.stringify(file2);
    fs.appendFile('data4.json', json_con);
    console.log("done2");


});
