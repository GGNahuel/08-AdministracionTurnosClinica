## [Español](#administrador-de-turnos-para-centro-de-salud) - [English](#health-center-appointment-manager)

<!-- > **Instrucciones de instalación:** Una vez descargado el proyecto en su ordenador ejecute los siguientes comandos desde la carpeta raíz, y luego acceder a http://localhost:5173/ en el navegador:
>
> **Installation guide:** After downloading the project files run de next commands in the root folder terminal, then go to this link in your browser http://localhost:5173/:
> * npm install
> * npm run dev -->

# Administrador de turnos para centro de salud
El objetivo de este proyecto fue poner en práctica y demostrar mis conocimientos y habilidades para el desarrollo web.

Está pensado como una aplicación que **permite crear y gestionar turnos. Además de manejar datos de, pacientes, profesionales de salud y areas de servicio**. Herramientas necesarias para cualquier centro de salud, dispuestas de una forma práctica y sencilla.

Permite acceder a la información de forma sencilla mediante **búsquedas personalizadas y visualizaciones en tablas.** La información se registra a través de **formularios claros**, o herramientas prácticas como un calendario en donde se muestran los turnos ya ocupados según el día y horario.

La página cuenta con varias opciones de seguridad. Una de ellas, de las más útiles en el uso diario que pueda tener, es la protección de datos utilizando la **sesión del usuario**. Es decir, según la cuenta que inicia sesión son los datos que se pueden agregar, modificar, o eliminar.

## Índice
- [Características generales y casos de uso](#características-generales-y-casos-de-uso)
    - [Acerca de los usuarios...](#acerca-de-los-usuarios)
    - [Acerca del manejo de datos...](#acerca-del-manejo-de-datos)
    - [Acerca de los datos...](#acerca-de-los-datos)
- [Características técnicas](#características-técnicas)
    - [Tecnologías aplicadas](#tecnologías-aplicadas)
- [Comentarios del proceso](#comentarios-del-proceso)

## Características generales y casos de uso

### Acerca de los usuarios...
  * Hay 3 roles para los usuarios que se registren: Administrador, General y Profesional.
  * El Administrador puede crear, modificar o dar de baja cualquier dato que este presente en la base de datos de la aplicación.
  * El **rol "General" es el que usaría quien este a cargo de registrar los turnos y pacientes**, contando también con la posibilidad de modificarlos
  * Los usuarios con **rol "Profesional"** están destinados a los profesionales de salud, **permitiéndoles visualizar y manejar sus turnos de forma más directa.** Así como sus propios datos.
  * Cualquier usuario, o incluso sin iniciar sesión, podrá visualizar los datos que quiera. Pero modificarlos, o crear nuevos, depende del rol.
  * Para que la navegación sea más práctica, solo aparecerán los enlaces en el menú a los que el usuario en sesión puede acceder.  

### Acerca del manejo de datos...
  * La búsqueda de cada tipo de dato cuenta con filtros y búsquedas personalizadas para cada uno.
  * **El registro o modificación de datos cuenta con verificaciones** que comprueban que no se sobreponga con otros, entre otras **validaciones**. Mostrando mensajes de error si algún dato en específico causaría este problema.
  * **En caso de que haya errores se mostrarán en pantalla.**
  * Tanto la creación como la modificación de turnos muestra un calendario en el que puedes seleccionar el horario y la fecha de forma más sencilla. A su vez que muestra los turnos ya ocupados para el área seleccionada y profesional.
  * Si quien crea un turno es un profesional, solo podrá hacerlo para las áreas en las que él se encuentre registrado. Y en cuánto a la modificación, 
  solo aquellos turnos que ya tenga asignados, y también solo para las áreas mencionadas.
  * Cuando se da de baja un area de servicio o profesional se puede elegir qué hacer con los turnos que estén asociados. Pudiendo darlos de baja también.

### Acerca de los datos...
  * Los tipo de datos principales de la página son: pacientes, profesionales, areas de servicio, consultorios, y turnos. **Estos se relacionan según cómo está pensada la base de datos.**
  * La sección principal muestra los turnos del día para cada área, o para las áreas en que un profesional esté registrado si el usuario en sesión tiene el rol "Profesional".
  * Un profesional de salud puede estar registrado en más de un área de servicio si se requiere.
  * Los consultorios solo pueden tener un profesional asignado.
  * Entre los datos de pacientes está el de obra social. Este dato se incluye automáticamente cuando se asigna uno en un turno.
  * Los turnos se pueden clasificar según su estado de abono, siendo: Pagado, Debe documentación, Debe, o A Reiterar.

## Características técnicas
  * Base de datos relacional SQL
  * Desarrollo de una API REST
  * Arquitectura cliente-servidor. Comunicación con la API a través de solicitudes HTTP
  * Api con protección CORS específica
  * Sesión de usuario, registro y roles con diferentes permisos. Tanto para la api como para la página
  * Encriptado de contraseñas de usuario mediante el codificador BCrypt
  * Generación y utilización de token CSRF para proteger ante posibles ataques de seguridad a la base de datos
  * Verificaciones y validaciones tanto en el back como en el front
  * Excepciones personalizadas y envío de DTOs para mejorar la comunicación de errores y manejarlos en el frontend
  * Aplicación de principios SOLID
  * Componentes reutilizables
  * Visualizaciones en tablas, registros en formularios, y búsqueda dinámica de datos
  * Diseño responsivo
  * Desarrollo de pruebas unitarias

  ### Tecnologías aplicadas
  * HTML
  * CSS
  * TypeScript
  * React.js
  * Java
  * MySQL
  * Spring Boot
  * Spring Security

## Comentarios del proceso
Luego de completar un curso de desarrollo web de más de un año y medio, buscaba un proyecto donde pudiera aplicar de forma integral los conocimientos adquiridos. Quería una aplicación completa, con base de datos, una interfaz intuitiva y una API que conectara todos los componentes de manera segura, escalable y práctica.

Con esto en mente, me propuse diseñar una herramienta que facilite la programación de citas para pacientes, optimice la asignación de profesionales y consultorios, y mejore la eficiencia en la gestión de una clínica o centro de salud.

Sin embargo es importante aclarar que tuve que profundizar, estudiar y poner en práctica muchos conceptos que no había visto en el cursado.Por lo que tuve que poner empeño en buscar información, entender y aclarar mis dudas a través de recursos de la web y compañeros. Como documentaciones oficiales, libros, foros, información multimedia e incluso tomar otros cursos. 

Por ejemplo, aunque tenía experiencia en JavaScript y Java, este fue mi primer proyecto usando TypeScript. Lo mismo con la seguridad web a través de Spring Security, fue todo un desafío comprender y poder aplicar las medidas de seguridad que requería un proyecto con estas características, fue un reto que requería mucha más profundidad de la que había visto en mi cursado.

Desde el principio busqué mantener el código lo más organizado posible, limpio y fácil de leer, ya que mi idea era incluirlo en mi portafolio. Aunque planeo seguir puliendo detalles y sumando mejoras, me propuse publicar una versión estable que demuestre mis habilidades para así poder darle seguimiento a otros proyectos y priorizar mi perfil profesional y búsqueda laboral.
___
<br>
<br>

# Health center appointment manager
The objective of this project was apply and show my acquired knowledge and skills for web developing. 

It is designed as an application that **allows users to create and manage turns, as well as handle data related to patients, healthcare professionals, and service areas**. Essential tools for any healthcare center, presented in a practical and user-friendly way.

It enables easy access to information through **customized searches and table views**. Information is recorded via **clear forms**, along with practical tools such as a calendar displaying scheduled appointments by day and time.

The page offers various security options. One of the most useful for daily use is data protection through **user session management**. That is, the data that can be added, modified, or deleted depends on the logged-in account.

## Index
- [Features and use cases](#features-and-use-cases)
  - [About users...](#about-users)
  - [About data handling...](#about-data-handling)
  - [About the data...](#about-the-data)
- [Technical features](#technical-features)
  - [Skills used](#technologies-used)
- [Comments about the developing process](#comments-about-the-developing-process)

## Features and use cases

### About users...
  * There are three roles for registered users: Administrator, General, and Professional.
  * The Administrator can create, modify, or remove any data in the application database.
  * The **"General" role is intended for those responsible for scheduling appointments and registering patients**, with the option to modify them as well.
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
  * The main section displays the day’s appointments for each area, or for the areas in which a professional is registered if the logged-in user has the "Professional" role.
  * A healthcare professional can be registered in more than one service area if needed.
  * Consultation rooms can only have one assigned professional.
  * Patient data includes information on health insurance, which is automatically recorded when an insurance is assigned to an appointment.
  * Appointments can be classified based on payment status as: Paid, Documentation Pending, Owed, or To Reschedule.

## Technical features
  * SQL relational database
  * Build of an API REST
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

### Technologies used
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
