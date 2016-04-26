'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.setBookResultsSubjects = setBookResultsSubjects;
exports.stackAndGetTopLevelSubjects = stackAndGetTopLevelSubjects;
exports.allSubjectsSorted = allSubjectsSorted;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function setBookResultsSubjects(booksHash, subjectsHash) {
    var books = Object.keys(booksHash).map(function (_id) {
        return booksHash[_id];
    });
    books.forEach(function (b) {
        return b.subjectObjects = b.subjects.map(function (s) {
            return subjectsHash[s] || { name: '<subject not found>' };
        });
    });
    return books;
}

function stackAndGetTopLevelSubjects(subjectsHash) {
    var subjects = Object.keys(subjectsHash).map(function (_id) {
        return subjectsHash[_id];
    });
    subjects.forEach(function (s) {
        var _s$children;

        s.children = [];
        (_s$children = s.children).push.apply(_s$children, _toConsumableArray(subjects.filter(function (sc) {
            return new RegExp(',' + s._id + ',$').test(sc.path);
        })));
    });
    return subjects.filter(function (s) {
        return s.path == null;
    });
}

function allSubjectsSorted(subjectsHash) {
    var subjects = Object.keys(subjectsHash).map(function (_id) {
        return subjectsHash[_id];
    });
    return subjects.sort(function (_ref, _ref2) {
        var name1 = _ref.name;
        var name2 = _ref2.name;

        var name1After = name1.toLowerCase() > name2.toLowerCase(),
            bothEqual = name1.toLowerCase() === name2.toLowerCase();
        return bothEqual ? 0 : name1After ? 1 : -1;
    });
}