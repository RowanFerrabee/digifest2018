// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

function loadMonitorData() {

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var jsonObj = JSON.parse(this.responseText);

      var counter = 0;
      var powerData = [0,0,0,0];
      for (var i in jsonObj) {
        powerData[counter] = jsonObj[i];
        counter += 1;
      }

      var ctx = document.getElementById("myBarChart");
      var myLineChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ["Kitchen Lights", "Oven", "Air Conditioning", "Clothes Dryer"],
          datasets: [{
            label: "W",
            backgroundColor: ['#007bff', '#dc3545', '#28a745', '#ffc107'],
            borderColor: "rgba(2,117,216,1)",
            data: powerData,
          }],
        },
        options: {
          scales: {
            xAxes: [{
              time: {
                unit: 'W'
              },
              gridLines: {
                display: false
              },
              ticks: {
                maxTicksLimit: 6
              }
            }],
            yAxes: [{
              ticks: {
                min: 0,
                max: 1000,
                maxTicksLimit: 5
              },
              gridLines: {
                display: true
              }
            }],
          },
          legend: {
            display: false
          },
          animation: false
        }
      });
      // -- Pie Chart Example
      var ctx = document.getElementById("myPieChart");
      var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ["Kitchen Lights", "Oven", "Air Conditioning", "Clothes Dryer"],
          datasets: [{
            data: powerData,
            backgroundColor: ['#007bff', '#dc3545', '#28a745', '#ffc107'],
          }],
        },
        options: {
          animation: false
        }
      });
    }
  };
  xhttp.open("GET", "read", true);
  xhttp.send();

  setTimeout(loadMonitorData, 300);
}
