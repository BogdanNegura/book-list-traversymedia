// Book Constructor
function Course(title, author, isbn) {
    this.title = title;
    this.author = author;
    this .isbn = isbn;
}

// UI Constructor
function UI() {}

UI.prototype.addCourseToList = function(course) {
    const list = document.getElementById('course-list');
    // create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
        <td>${course.title}</td>
        <td>${course.author}</td>
        <td>${course.isbn}</td>
        <td><a href="#" class="delete">X<a></td>
    `;
    list.appendChild(row);
}

// Show Error
UI.prototype.showAlert = function(message, className) {
    // create div
    const div = document.createElement('div');
    // add classes
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    // get form
    const form = document.querySelector('#course-form');
    // insert alert
    container.insertBefore(div, form);

    // Timeout after 3s
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}

// Clear fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

}



// Event Listeners
document.getElementById('course-form').addEventListener('submit', 
function(e){
    // Get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value

    // Instantiate course
    const course = new Course(title, author, isbn);

    // Instantiate UI
    const ui = new UI();
    // Validate
    if(title === '' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add course to list
        ui.addCourseToList(course);

        // show success
        ui.showAlert('Course Added!', 'success');
    
        // Clear fields
        ui.clearFields();
    }


    e.preventDefault();
})