[Español](#administrador-de-turnos-para-centro-de-salud) - [English](#health-center-turn-administrator)

# Administrador de turnos para centro de salud
El proyecto está pensado como una aplicación que **permite crear y gestionar turnos. Además de manejar datos de, pacientes, profesionales de salud y areas de servicio**. Herramientas necesarias para cualquier centro de salud, dispuestas de una forma práctica y sencilla.

Permite acceder a la información de forma sencilla a traves de **búsquedas personalizadas y visualizaciones en tablas.** La información se registra a traves de **formularios claros**, o herramientas prácticas como un calendario en donde se muestran los turnos ya ocupados según el día y horario.

La página cuenta con varias opciones de seguridad. Una de ellas, de las más útiles en el uso diario que pueda tener, es la protección de datos a traves de la **sesión del usuario**. Es decir, según la cuenta que inicia sesión son los datos que se pueden agregar, modificar, o eliminar.

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
  * Aplicación del MVC (modelo vista controlador) con un sistema monolítico
  * Api con protección CORS específica
  * Sesión de usuario, registro y roles con diferentes permisos. Tanto para la api como para la página
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

Sin embargo es importante aclarar que tuve que profundizar, estudiar y poner en práctica muchos conceptos que no había visto en el cursado.Por lo que tuve que poner empeño en buscar información, entender y aclarar mis dudas a traves de compañeros o recursos de la web. Como documentaciones oficiales, libros, foros, información multimedia e incluso tomar otros cursos. 

Por ejemplo, aunque tenía experiencia en JavaScript y Java, este fue mi primer proyecto usando TypeScript. Lo mismo con la seguridad web a traves de Spring Security, fue todo un desafío comprender y poder aplicar las medidas de seguridad que requería un proyecto con estas características, fue un reto que requería mucha más profundidad de la que había visto en mi cursado.

Desde el principio busqué mantener el código lo más organizado posible, limpio y fácil de leer, ya que mi idea era incluirlo en mi portafolio. Aunque planeo seguir puliendo detalles y sumando mejoras, me propuse publicar una versión estable que demuestre mis habilidades para así poder darle seguimiento a otros proyectos y priorizar mi perfil profesional y búsqueda laboral.
___
<br>
<br>
<br>

# Health center turn administrator