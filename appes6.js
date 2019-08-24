class Course {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addCourseToList(course) {
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

    showAlert(message, className) {
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

    deleteCourse(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    
    }

}

// Local Storage Class
class Store {

    static getCourses() {
        let courses;
        if(localStorage.getItem('courses') === null) {
            courses = [];
        } else {
            courses = JSON.parse(localStorage.getItem('courses'));
        }
        return courses;
    }

    static displayCourses() {
        const courses = Store.getCourses();

        courses.forEach(function(course){
            const ui = new UI;

            // Add course to UI
            ui.addCourseToList(course);
        });

    }

    static addCourse(course) {
        const courses = Store.getCourses();

        courses.push(course);

        localStorage.setItem('courses', JSON.stringify(courses));
    }
    static removeCourse(isbn) {
        const courses = Store.getCourses();

        courses.forEach(function(course, index){
            if(course.isbn === isbn) {
                courses.splice(index, 1);
            }
        });

        localStorage.setItem('courses', JSON.stringify(courses));
    }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayCourses);

// Event Listeners for add course
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

        // add to LocalStorage
        Store.addCourse(course);

        // show success
        ui.showAlert('Course Added!', 'success');
    
        // Clear fields
        ui.clearFields();
    }


    e.preventDefault();
});

// Event Listner for delete
document.getElementById('course-list').addEventListener('click', function(e){
    
    // Instantiate UI
    const ui = new UI();

    // Delete course
    ui.deleteCourse(e.target)

    // remove from LocalStorege
    Store.removeCourse(e.target.parentElement.previousElementSibling.textContent);

    // show message
    ui.showAlert('Course Removed!', 'success');

    e.preventDefault();
});