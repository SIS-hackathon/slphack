Copyright and license Code and documentation copyright 2016 The Center to Promote Healtcare Access, Inc., DBA Social Interest Solutions. 

Code released under the MIT license. Documents released under Creative Commons license.

<b>slpapp project was developed for the E.A.T School Lunch UX Challange.</b>

This application uses an open source technology stack consisting of the following components...

Web-Browser Front-End
- HTML/CSS
- Foundation
- Javascript
- jQuery
- jQuery Validation Library
- HandlebarsJS

Back-End Python Stack
- Web Server supporting WSGI
- Python
- Flask
- Jinja

To this configuration any back-end database repository can be added- either SQL (mySQL) or noSQL (such as CouchDB or MongoDB).
Our implementation is agnostic to the backend database, as a JSON data object is generated which can be sent or exported to any data repository (SQL or noSQL).

The main Web application components are the following html pages, javascript file, and Flask Web Server URL handler code:

- slp_getstarted0.html (launch page)<br>
- slpmenus0.html (menu component of launch page)<br>
- slpapplication.html (main container page for the application file containing the 4 sub-container html include files which follow below)<br>
- slpform.html (contains or the html comprising the SLP application form and associated help html which is dynamically displayed to user based on context)<br>
- slpmenus.html (menu components of application page)<br>
- header.html (a list of supporting .css and .js libraries used by the application)<br>
- footer.html (html container for footer info)<br>

- slpformlogic.js contains the form navigation logic for the application ( the is file located in the /static/js/sis directory). This javascript file utilizes the previously listed open-source libraries, such a jQuery, jQuery Validation, Foundation, and HandlebarsJS, to provide
the dynamic presentation effects associated with the presentation of the User Interface. While a single html form is utilized, additional User Interface effects
are used to present form questions is serial fashion and to dynamically create form fields associated with the household characteristics as defined by the end user.
As required, all html form fields can have data validation rules assigned to them. This is possible even for dynamically created form fields.

Finally, the slpformlogic.js file collects all the form data provided by the user, generates an application summary screen, and readies the data into a JSON object which can
be sent to a back-end data repository using AJAX or some other data interface option.

- slphack.py (main Flask python file providing URL handlers for the Web server)


