const { createSelector } = require('../../../util/reselect');

const { ENABLE_SUBJECT_MODIFICATION_FOR_SINGLE_BOOK, ENABLE_SUBJECT_MODIFICATION_FOR_TOGGLED_BOOKS, CANCEL_SUBJECT_MODIFICATION,
    TOGGLE_SUBJECT_ADD_FOR_SUBJECT_MODIFICATION, TOGGLE_SUBJECT_REMOVE_FOR_SUBJECT_MODIFICATION }
    = require('../actions/actionNames');

const bookSubjectManagerInitialState = () => ({
    singleBookModify: null,
    selectedBooksModify: false,
    addingSubjects: {},
    removingSubjects: {}
});

function bookSubjectManagerReducer(state = bookSubjectManagerInitialState(), action = {}){
    switch (action.type){
        case ENABLE_SUBJECT_MODIFICATION_FOR_SINGLE_BOOK:
            return Object.assign({}, state, { singleBookModify: action._id });
        case ENABLE_SUBJECT_MODIFICATION_FOR_TOGGLED_BOOKS:
            return Object.assign({}, state, { selectedBooksModify: true });
        case CANCEL_SUBJECT_MODIFICATION:
            return Object.assign({}, state, { singleBookModify: null, selectedBooksModify: false });
        case TOGGLE_SUBJECT_ADD_FOR_SUBJECT_MODIFICATION:
            return Object.assign({}, state, { addingSubjects: { ...state.addingSubjects, [action._id]: !state.addingSubjects[action._id] } });
        case TOGGLE_SUBJECT_REMOVE_FOR_SUBJECT_MODIFICATION:
            return Object.assign({}, state, { removingSubjects: { ...state.removingSubjects, [action._id]: !state.removingSubjects[action._id] } });
    }
    return state;
}

const modifyingBooksSelector = createSelector(
    [state => state.booksSubjectsModifier.singleBookModify, state => state.booksSubjectsModifier.selectedBooksModify, state => state.books],
    (singleBookModify, selectedBooksModify, books) => {
        let modifyingBookIds = singleBookModify ? [singleBookModify] : (selectedBooksModify ? Object.keys(books.selectedBooks) : []);
        return modifyingBookIds.filter(_id => _id).map(_id => books.booksHash[_id]);
    }
);

const addingSubjectsSelector = createSelector(
    [state => state.booksSubjectsModifier.addingSubjects, state => state.subjects.list],
    (adding, subjects) => Object.keys(adding).filter(_id => adding[_id]).map(_id => subjects[_id])
);

const removingSubjectsSelector = createSelector(
    [state => state.booksSubjectsModifier.removingSubjects, state => state.subjects.list],
    (removing, subjects) => Object.keys(removing).filter(_id => removing[_id]).map(_id => subjects[_id])
);

const booksSubjectsModifierSelector = createSelector(
    [state => state.booksSubjectsModifier.addingSubjects, state => state.booksSubjectsModifier.removingSubjects,
        modifyingBooksSelector, addingSubjectsSelector, removingSubjectsSelector],
    (addingSubjectIds, removingSubjectIds, modifyingBooks, addingSubjects, removingSubjects) => ({
        addingSubjectIds,
        removingSubjectIds,
        modifyingBooks,
        addingSubjects,
        removingSubjects
    })
);

module.exports = { bookSubjectManagerReducer, booksSubjectsModifierSelector };