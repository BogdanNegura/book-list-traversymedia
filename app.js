// Book Constructor
function Course(title, author, isbn) {
    this.title = title;
    this.author = author;
    this .isbn = isbn;
}

// UI Constructor
function UI() {}



// Event Listeners
document.getElementById('course-form').addEventListener('submit',function(e){
    console.log('test');

    e.preventDefault();
})