document.addEventListener('DOMContentLoaded', () => {
    // Pie Chart Implementation using Chart.js for all subjects
    const ctx1 = document.getElementById('attendanceChart1').getContext('2d');
    const attendanceChart1 = new Chart(ctx1, {
      type: 'pie',
      data: {
        labels: ['Attended', 'Missed'],
        datasets: [{
          label: 'Software Engineering CC2130',
          data: [25, 5],  // Classes Attended, Classes Missed
          backgroundColor: ['#27ae60', '#e74c3c'],
          borderColor: ['#27ae60', '#e74c3c'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw + ' classes';
              }
            }
          }
        }
      }
    });
  
    const ctx2 = document.getElementById('attendanceChart2').getContext('2d');
    const attendanceChart2 = new Chart(ctx2, {
      type: 'pie',
      data: {
        labels: ['Attended', 'Missed'],
        datasets: [{
          label: 'Data Structures DS2010',
          data: [30, 10], // Classes Attended, Classes Missed
          backgroundColor: ['#27ae60', '#e74c3c'],
          borderColor: ['#27ae60', '#e74c3c'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw + ' classes';
              }
            }
          }
        }
      }
    });
  
    const ctx3 = document.getElementById('attendanceChart3').getContext('2d');
    const attendanceChart3 = new Chart(ctx3, {
      type: 'pie',
      data: {
        labels: ['Attended', 'Missed'],
        datasets: [{
          label: 'Operating Systems OS2200',
          data: [30, 5],  // Classes Attended, Classes Missed
          backgroundColor: ['#27ae60', '#e74c3c'],
          borderColor: ['#27ae60', '#e74c3c'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw + ' classes';
              }
            }
          }
        }
      }
    });
  
    const ctx4 = document.getElementById('attendanceChart4').getContext('2d');
    const attendanceChart4 = new Chart(ctx4, {
      type: 'pie',
      data: {
        labels: ['Attended', 'Missed'],
        datasets: [{
          label: 'Database Management DB2040',
          data: [40, 5], // Classes Attended, Classes Missed
          backgroundColor: ['#27ae60', '#e74c3c'],
          borderColor: ['#27ae60', '#e74c3c'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw + ' classes';
              }
            }
          }
        }
      }
    });
  
    const ctx5 = document.getElementById('attendanceChart5').getContext('2d');
    const attendanceChart5 = new Chart(ctx5, {
      type: 'pie',
      data: {
        labels: ['Attended', 'Missed'],
        datasets: [{
          label: 'Web Development WD3100',
          data: [20, 5], // Classes Attended, Classes Missed
          backgroundColor: ['#27ae60', '#e74c3c'],
          borderColor: ['#27ae60', '#e74c3c'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw + ' classes';
              }
            }
          }
        }
      }
    });
  
    // Handling logout button functionality
    document.getElementById('logout-button').addEventListener('click', () => {
      firebase.auth().signOut().then(() => {
        window.location.href = "../index.html";  // Redirect to login page
      }).catch((error) => {
        console.error('Error signing out:', error);
      });
    });
  });
  