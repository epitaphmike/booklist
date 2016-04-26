'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _booklistMenubarBooksMenuBar = require('./booklist-menubar/booksMenuBar');

var _booklistMenubarBooksMenuBar2 = _interopRequireDefault(_booklistMenubarBooksMenuBar);

var _bookSubjectSetterDesktop = require('./bookSubjectSetter-desktop');

var _bookSubjectSetterDesktop2 = _interopRequireDefault(_bookSubjectSetterDesktop);

var _subjectEditSubjectEditModal = require('./subject-edit/subjectEditModal');

var _subjectEditSubjectEditModal2 = _interopRequireDefault(_subjectEditSubjectEditModal);

var _rootComponentsBootstrapButton = require('root-components/bootstrapButton');

var _rootComponentsBootstrapButton2 = _interopRequireDefault(_rootComponentsBootstrapButton);

var Modal = ReactBootstrap.Modal;

var BookViewListDesktop = (function (_React$Component) {
    _inherits(BookViewListDesktop, _React$Component);

    function BookViewListDesktop(props) {
        _classCallCheck(this, BookViewListDesktop);

        _get(Object.getPrototypeOf(BookViewListDesktop.prototype), 'constructor', this).call(this);

        this.state = { booksSubjectsModalShown: false, editSubjectsFor: [], subjectsAdding: [], subjectsRemoving: [], editingSubject: null };
    }

    _createClass(BookViewListDesktop, [{
        key: 'render',
        value: function render() {
            var _this = this;

            var editSubjectsPacket = this.props.subjects.editSubjectsPacket;
            return React.createElement(
                'div',
                null,
                React.createElement(_booklistMenubarBooksMenuBar2['default'], {
                    selectedBooksCount: this.props.books.selectedBooksCount,
                    allSubjects: this.props.subjects.list
                }),
                this.props.books.list.length ? React.createElement(
                    'div',
                    { style: { paddingLeft: 15, paddingRight: 15, paddingBottom: 15 } },
                    React.createElement(
                        'table',
                        { className: 'table table-striped' },
                        React.createElement(
                            'thead',
                            null,
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'th',
                                    null,
                                    '    '
                                ),
                                React.createElement('th', null),
                                React.createElement(
                                    'th',
                                    null,
                                    'Title'
                                ),
                                React.createElement(
                                    'th',
                                    null,
                                    'Author'
                                ),
                                React.createElement(
                                    'th',
                                    null,
                                    'Genres'
                                ),
                                React.createElement(
                                    'th',
                                    null,
                                    'ISBN'
                                ),
                                React.createElement(
                                    'th',
                                    null,
                                    'Published'
                                ),
                                React.createElement(
                                    'th',
                                    null,
                                    'Pages'
                                )
                            )
                        ),
                        React.createElement(
                            'tbody',
                            null,
                            this.props.subjects.loaded ? this.props.books.list.map(function (book) {
                                return React.createElement(
                                    'tr',
                                    { key: book._id },
                                    React.createElement(
                                        'td',
                                        null,
                                        React.createElement('input', { type: 'checkbox', onClick: function () {
                                                return _this.props.toggleSelectBook(book._id);
                                            }, checked: _this.props.books.selectedBooks[book._id] })
                                    ),
                                    React.createElement(
                                        'td',
                                        null,
                                        React.createElement('img', { src: book.smallImage })
                                    ),
                                    React.createElement(
                                        'td',
                                        null,
                                        book.title
                                    ),
                                    React.createElement(
                                        'td',
                                        null,
                                        book.author
                                    ),
                                    React.createElement(
                                        'td',
                                        null,
                                        book.subjectObjects.map(function (s) {
                                            return React.createElement(
                                                'div',
                                                { key: s._id },
                                                React.createElement(
                                                    'span',
                                                    { className: 'label label-default' },
                                                    s.name
                                                )
                                            );
                                        }),
                                        React.createElement(
                                            'div',
                                            { style: { marginTop: 5 } },
                                            React.createElement(
                                                'button',
                                                { className: 'btn btn-default btn-xs', onClick: function () {
                                                        return _this.props.enableSubjectModificationSingleBook(book._id);
                                                    } },
                                                'Modify'
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'td',
                                        null,
                                        book.isbn
                                    ),
                                    React.createElement(
                                        'td',
                                        null,
                                        book.publicationDate
                                    ),
                                    React.createElement(
                                        'td',
                                        null,
                                        book.pages
                                    )
                                );
                            }) : null
                        )
                    )
                ) : this.props.loading ? React.createElement(
                    'div',
                    { className: 'alert alert-warning' },
                    'No books found'
                ) : null,
                React.createElement(_bookSubjectSetterDesktop2['default'], { subjects: this.props.subjects }),
                React.createElement(_subjectEditSubjectEditModal2['default'], {
                    editSubjectsPacket: this.props.subjects.editSubjectsPacket,
                    subjects: this.props.subjects.list })
            );
        }
    }]);

    return BookViewListDesktop;
})(React.Component);

exports['default'] = BookViewListDesktop;
module.exports = exports['default'];