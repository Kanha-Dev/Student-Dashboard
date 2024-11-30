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
// Function to fetch attendance data for a student and subject
// Function to fetch attendance data for a student and subject
async function fetchAttendance(studentId, subjectId) {
  const attendanceApiUrl = `http://localhost:3000/api/attendance/${studentId}/${subjectId}`;
  const subjectApiUrl = `http://localhost:3000/api/subject/${subjectId}`;

  try {
    // Fetch attendance data
    const attendanceResponse = await fetch(attendanceApiUrl);
    if (!attendanceResponse.ok) {
      throw new Error(`Failed to fetch attendance data! Status: ${attendanceResponse.status}`);
    }
    const attendanceData = await attendanceResponse.json();
    console.log(attendanceData);
    const attendance = attendanceData.attendance;
    const presentCount = attendance.present_count || 0;
    const absentCount = attendance.absent_count || 0;
    const totalClasses = presentCount + absentCount;
    const percentage = totalClasses ? ((presentCount / totalClasses) * 100).toFixed(2) : "0.00";

    // Fetch subject name
    const subjectResponse = await fetch(subjectApiUrl);
    if (!subjectResponse.ok) {
      throw new Error(`Failed to fetch subject name! Status: ${subjectResponse.status}`);
    }
    const subjectData = await subjectResponse.json();
    const subjectName = subjectData.subject_name;

    console.log(`Attendance Data for Subject ID: ${subjectId}`);
    console.log(attendanceData);
    console.log(`Subject Name: ${subjectName}`);

    // Render attendance data dynamically
    const accordionContainer = document.querySelector('.accordion');
    const accordionItem = `
      <div class="accordion-item">
        <details class="accordion-header">
          <summary>
            ${subjectId} : ${subjectName} <span class="accordion-icon">v</span>
          </summary>
          <div class="accordion-content">
            <div class="attendance-info">
              <p><strong>Total Classes:</strong> ${totalClasses}</p>
              <p><strong>Classes Attended:</strong> ${presentCount}</p>
              <p><strong>Classes Missed:</strong> ${absentCount}</p>
              <p><strong>Attendance Percentage:</strong> ${percentage}%</p>
            </div>
            <div class="pie-chart">
              <canvas id="attendanceChart${subjectId}"></canvas>
            </div>
          </div>
        </details>
      </div>
    `;
    accordionContainer.innerHTML += accordionItem;

    // Wait for the DOM to update before rendering the chart
    requestAnimationFrame(() => {
      const ctx = document.getElementById(`attendanceChart${subjectId}`).getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Attended', 'Missed'],
          datasets: [{
            data: [presentCount, absentCount],
            backgroundColor: ['#4caf50', '#f44336'],
          }],
        },
        options: {
          responsive: true,
        },
      });
    });

  } catch (error) {
    console.error("Error:", error);
  }
}

// Example: Fetch attendance for multiple subjects
const studentId = localStorage.getItem('sid');
const subjectIds = ["2130", "2131", "2132"]; // Replace with actual subject IDs

document.addEventListener("DOMContentLoaded", () => {
  updateUserDetails();
  subjectIds.forEach(subjectId => fetchAttendance(studentId, subjectId));
});



// Replace with the actual registration number of the user (could be dynamically set)
const regNumber = "arjun.mehta@example.com";

// Function to fetch and update user details
async function updateUserDetails() {
    try {
        const response = await fetch(`http://localhost:3000/api/student/${regNumber}`);
        if (!response.ok) throw new Error("Failed to fetch student data");

        const data = await response.json();

        

        // Update DOM elements
         // Update DOM elements only if they haven't been updated before
        const nameElement = document.getElementById("nameheading");
        nameElement.textContent = "Welcome back, " + data.sname + "!" || "N/A";
        document.querySelector('.user-name').textContent = data.sname || "N/A";
        document.querySelector('.user-reg').textContent = data.sid || "N/A";

        // Store sid in local storage for use in other files
        if (data.sid) {
            localStorage.setItem('sid', data.sid);
            console.log(`SID ${data.sid} stored in local storage.`);
        } else {
            console.warn("SID is missing in the response data.");
        }
    } catch (error) {
        console.error("Error updating user details:", error);
    }
}


// Initialize attendance display on page load
window.addEventListener("DOMContentLoaded", initAttendance);
