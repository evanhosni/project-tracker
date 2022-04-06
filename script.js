// save reference to DOM elements
var timeDisplayEl = $("#time-display")
var projectDisplayEl = $("#project-display")
var projectModalEl = $("#project-modal")
var projectFormEl = $("#project-form")
var projectNameInputEl = $('#project-name-input');
var projectTypeInputEl = $('#project-type-input');
var hourlyRateInputEl = $('#hourly-rate-input');
var dueDateInputEl = $('#due-date-input');

// handle displaying time
displayTime()
function displayTime() {
    var currentTime = moment().format('MMM DD, YYYY [at] hh:mm:ss a')
    timeDisplayEl.text(currentTime)
}
setInterval(displayTime,1000)

// handle project form submission
projectFormEl.on('submit',handleProjectSubmission)
function handleProjectSubmission(e) {
    e.preventDefault()
    var projectName = projectNameInputEl.val().trim()
    var projectType = projectTypeInputEl.val()
    var hourlyRate = hourlyRateInputEl.val().trim()
    var dueDate = dueDateInputEl.val()

    console.log(projectName,projectType,hourlyRate,dueDate)

    displayProjectData(projectName,projectType,hourlyRate,dueDate)
}

// handle displaying project data on page
function displayProjectData(name, type, hourly, due) {
    var newRow = $('<tr>')

    var newName = $('<td>').text(name)
    var newType = $('<td>').text(type)
    var newHourly = $('<td>').text(hourly)
    var newDue = $('<td>').text(due)
    var daysLeft = moment(due).diff(moment(), 'days')
    var newDaysLeft = $('<td>').text(daysLeft)
    var newEarnings = $('<td>').text(calculateEarnings(hourly, daysLeft))

    var deleteBtn = $('<button>').addClass('delete').text('X')

    projectDisplayEl.append(newRow)
    newRow.append(
        newName,
        newType,
        newHourly,
        newDue,
        newDaysLeft,
        newEarnings,
        deleteBtn
    )

    projectModalEl.modal('hide')

}

// calculate potential earnings
function calculateEarnings(rate, days) {
    var total = rate * 8 * days
    return total
}

// handle deleting project
function deleteProject(e) {
    console.log(e.target)
    var buttonClicked = $(e.target)
    buttonClicked.parent('tr').remove()
}
projectDisplayEl.on('click','.delete',deleteProject)