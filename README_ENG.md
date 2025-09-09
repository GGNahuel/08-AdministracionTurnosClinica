<h1>Health center appointment manager</h1>
The objective of this project was apply and show my acquired knowledge and skills for web developing. 

It is designed as an application that **allows users to create and manage appointments, as well as handle data related to patients, healthcare professionals, and service areas**. Essential tools for any healthcare center, presented in a practical and user-friendly way.

It enables easy access to information through **customized searches and table views**. Information is recorded via **clear forms**, along with practical tools such as a calendar displaying scheduled appointments by day and time.

The page offers various security options. One of the most useful for daily use is data protection through **user session management**. That is, the data that can be added, modified, or deleted depends on the logged-in account.

**Index**
- [Features and use cases](#features-and-use-cases)
  - [About users...](#about-users)
  - [About data handling...](#about-data-handling)
  - [About the data...](#about-the-data)
  - [About views and pages...](#about-views-and-pages)
- [Technical features](#technical-features)
  - [Used technologies](#used-technologies)
- [Comments about the developing process](#comments-about-the-developing-process)

## Features and use cases
### About users...
  * There are three roles for registered users: Administrator, General, and Professional.
  * The Administrator can create, modify, or remove any data in the application database.
  * The **"General" role is intended for the responsible for scheduling appointments and registering patients**, with the option to modify them as well.
  * Users with the **"Professional" role** are designated for healthcare professionals, **allowing them to view and manage their appointments more directly**, as well as their personal data.
  * Any user, or even without logging in, can view the available data. However, modifying or creating new data depends on the role.
  * To streamline navigation, only the links accessible to the logged-in user are shown in the menu.

### About data handling...
  * Each type of data search has filters and custom searches for each category.
  * **The creation or modification of data includes validations** to prevent conflicts with existing entries and **other checks**, displaying error messages if any specific data could cause an issue.
  * **If there are errors, they will be displayed on the screen.**
  * Both appointment creation and modification display a calendar where you can select the date and time more easily, showing already booked appointments for the selected area and professional.
  * If an appointment is created by a professional, they can only schedule it for the areas in which they are registered. For modification, they can only adjust appointments assigned to them, and only for the mentioned areas.
  * When a service area or professional is removed, you can choose what to do with the associated appointments, including removing them as well.

### About the data...
  * The main data types are patients, professionals, service areas, consultation rooms, and appointments. **These are linked according to the database structure.**
  * The main section displays the day's appointments for each area, or for the areas in which a professional is registered if the logged-in user has the "Professional" role.
  * A healthcare professional can be registered in more than one service area if needed.
  * Consultation rooms can only have one assigned professional.
  * Patient data includes information on health insurance, which is automatically recorded when an insurance is assigned to an appointment.
  * Appointments can be classified based on payment status as: Paid, Documentation Pending, Owed, or To Reschedule.

### About views and pages...
  * It has different color themes which is assigned by the user preference in the browser (light and dark themes).
  * The structure and design of the pages are according to the screen size.

## Technical features
  * SQL relational database
  * Build of an Rest API
  * Client-Server architecture. The communication with the API is by HTTP requests
  * API with specific CORS protection
  * User sessions, registration, and roles with different permissions for both the API and the webpage
  * Encryption of user passwords by BCrypt password encoder
  * Generation and use of CSRF tokens to protect against potential database security threats
  * Validations on both backend and frontend
  * Custom exceptions and DTOs for improved error handling and communication with the frontend
  * SOLID principles applied
  * Reusable components
  * Table views, form registrations, and dynamic data searches
  * Responsive design
  * Development of unit tests

### Used technologies
  * HTML
  * CSS
  * TypeScript
  * React.js
  * Java
  * MySQL
  * Spring Boot
  * Spring Security

## Comments about the developing process
After completing a year-and-a-half web development course, I sought a project where I could fully apply the knowledge gained. I wanted a comprehensive application with a database, an intuitive interface, and an API that connects all components in a secure, scalable, and practical way.

With this in mind, I set out to design a tool that facilitates appointment scheduling for patients, optimizes professional and room assignments, and enhances efficiency in managing a clinic or healthcare center.

It’s worth noting that I had to dive deeper into many concepts not covered in the course. I invested time in researching, learning, and clearing up doubts through peers or web resources like official documentation, books, forums, multimedia resources, and even other courses.

For example, although I had experience in JavaScript and Java, this was my first project using TypeScript. Likewise, web security through Spring Security was challenging, implementing the necessary security measures for this project required much more depth than I had encountered in the course.

From the start, I aimed to keep the code organized, clean, and readable, as I plan to include it in my portfolio. While I intend to continue refining it and adding improvements, I wanted to publish a stable version that demonstrates my skills, allowing me to shift focus to other projects and prioritize my professional profile and job search.
