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

    // Add course to list
    ui.addCourseToList(course);

    // Clear fields
    ui.clearFields();

    e.preventDefault();
})