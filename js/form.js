class Form {
    constructor(checklist, counter, comments) {
        this.checklist = checklist;
        this.counter = counter;
        this.comments = comments;
    }

    set checklistValue(checklist) {
        this.checklist = checklist;
    }
    set counterValue(counter) {
        this.counter = counter;
    }
    set commentsValue(comments) {
        this.comments = comments;
    }
}