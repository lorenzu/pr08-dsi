## Introducción 
En esta práctica aprenderemos los principios SOLID:

Los principios SOLID son un conjunto de cinco principios de diseño de software que se utilizan para crear sistemas más mantenibles, escalables y flexibles. Fueron propuestos por Robert C. Martin en la década de 2000. Cada letra de SOLID representa un principio específico:

S - Principio de responsabilidad única (Single Responsibility Principle): Una clase debe tener una sola razón para cambiar, es decir, debe tener una única responsabilidad.

O - Principio de abierto/cerrado (Open/Closed Principle): Las entidades de software (clases, módulos, funciones, etc.) deben estar abiertas para su extensión pero cerradas para su modificación.

L - Principio de sustitución de Liskov (Liskov Substitution Principle): Los objetos de un programa deben ser reemplazables por instancias de sus subtipos sin afectar a la corrección del programa.

I - Principio de segregación de la interfaz (Interface Segregation Principle): Un cliente no debe depender de interfaces que no utilice. Es mejor tener interfaces más específicas que una interfaz general.

D - Principio de inversión de dependencias (Dependency Inversion Principle): Las dependencias deben ser hacia abstracciones, no hacia implementaciones concretas. Los módulos de alto nivel no deben depender de los módulos de bajo nivel, ambos deben depender de abstracciones.

Estos principios proporcionan pautas útiles para diseñar sistemas de software más robustos, flexibles y fáciles de mantener.

## Ejercicio 1
```
/**
 * Represents an item with a name.
 */
export interface Item {
  name: string;
}

/**
 * Represents a box that can contain items of type T.
 * @template T - The type of items the box can contain.
 */
export class Box<T extends Item> {
  private items: T[] = [];

  /**
   * Adds an item to the box.
   * @param item - The item to add to the box.
   */
  addItem(item: T): void {
      this.items.push(item);
  }

  /**
   * Removes an item from the box.
   * @param item - The item to remove from the box.
   */
  removeItem(item: T): void {
      const index = this.items.findIndex((i) => i.name === item.name);
      if (index !== -1) {
          this.items.splice(index, 1);
      }
  }

  /**
   * Lists all items in the box.
   */
  listItems(): void {
      console.log("Items in the box:");
      this.items.forEach((item) => {
          console.log(item.name);
      });
  }

  /**
   * Searches for an item in the box by name.
   * @param itemName - The name of the item to search for.
   * @returns The item if found, otherwise undefined.
   */
  searchItem(itemName: string): T | undefined {
      return this.items.find((item) => item.name === itemName);
  }
}

/**
 * Represents a furniture item.
 * @implements Item
 */
export class Furniture implements Item {
  /**
   * Creates a new furniture item with the specified name.
   * @param name - The name of the furniture item.
   */
  constructor(public name: string) {}
}

/**
 * Represents an electronic item.
 * @implements Item
 */
export class Electronic implements Item {
  /**
   * Creates a new electronic item with the specified name.
   * @param name - The name of the electronic item.
   */
  constructor(public name: string) {}
}

// Example usage
const box = new Box<Furniture>();
const chair = new Furniture("Chair");
const table = new Furniture("Table");

box.addItem(chair);
box.addItem(table);

box.listItems(); // Output: Chair, Table

const foundItem = box.searchItem("Chair");
if (foundItem) {
  console.log("Found:", foundItem.name); // Output: Found: Chair
} else {
  console.log("Item not found");
}

```
## Análisis del Código y Principios SOLID

Este código implementa un sistema simple de gestión de cajas que pueden contener diferentes tipos de elementos. A continuación se explica su funcionamiento:

## Interfaz `Item`

- Define una estructura básica para un elemento que tiene un atributo `name` de tipo `string`.

## Clase `Box<T>`

- Representa una caja que puede contener elementos de cualquier tipo que implemente la interfaz `Item`.
- Está parametrizada por el tipo `T`, lo que permite especificar el tipo de elementos que puede contener la caja.
- **Métodos principales:**
  - `addItem(item: T): void`: Agrega un elemento a la caja.
  - `removeItem(item: T): void`: Elimina un elemento de la caja.
  - `listItems(): void`: Muestra en la consola todos los elementos de la caja.
  - `searchItem(itemName: string): T | undefined`: Busca un elemento en la caja por su nombre y lo devuelve si se encuentra, de lo contrario, devuelve `undefined`.

## Clases `Furniture` y `Electronic`

- Implementan la interfaz `Item`, lo que significa que deben tener un atributo `name` de tipo `string`.
- `Furniture` representa un artículo de mueble y `Electronic` representa un artículo electrónico.
- Ambos tienen un constructor que recibe el nombre del artículo como parámetro.

## Ejemplo de uso

1. Se crea una instancia de `Box` que contendrá elementos de tipo `Furniture`.
2. Se crean dos muebles (`chair` y `table`) utilizando la clase `Furniture`.
3. Se agregan los muebles a la caja utilizando el método `addItem`.
4. Se muestra el contenido de la caja utilizando el método `listItems`.
5. Se busca un artículo específico en la caja utilizando el método `searchItem`.

En cuanto a los principios SOLID, este código respeta principalmente el principio de SRP (Single Responsibility Principle) al separar las responsabilidades de cada clase e interfaz. Cada clase tiene una responsabilidad única y bien definida: `Box` maneja la lógica relacionada con la caja y sus elementos, mientras que `Furniture` y `Electronic` representan tipos específicos de elementos. Además, la clase `Box` es extensible y flexible gracias al uso de la parametrización de tipos, lo que permite agregar diferentes tipos de elementos sin modificar su implementación interna.

### 1. Principio de Responsabilidad Única (SRP):
   - Cada clase tiene una única responsabilidad bien definida:
     - La interfaz `Item` define la estructura básica de un artículo.
     - La clase `Box` se encarga de la gestión de los elementos dentro de la caja.
     - Las clases `Furniture` y `Electronic` representan diferentes tipos de elementos y definen sus propiedades.

### 2. Principio de Abierto/Cerrado (OCP):
   - El diseño permite la extensión sin necesidad de modificar el código existente:
     - Se pueden agregar nuevos tipos de elementos implementando la interfaz `Item` y utilizando esos nuevos tipos en la clase `Box`.

### 3. Principio de Sustitución de Liskov (LSP):
   - La clase `Box` opera sobre cualquier tipo de elemento que implemente la interfaz `Item`, garantizando que se puedan usar diferentes tipos de elementos de manera intercambiable sin afectar el comportamiento de la caja.

### 4. Principio de Segregación de Interfaces (ISP):
   - La interfaz `Item` es simple y tiene una sola responsabilidad: definir la propiedad `name`, sin contener funcionalidades adicionales.
   - La clase `Box` utiliza la interfaz `Item` para trabajar con elementos de manera genérica, sin depender de funcionalidades específicas de los tipos de elementos.

El diseño del código respeta los principios SOLID al tener clases y responsabilidades bien definidas, permitiendo la extensión fácilmente y evitando acoplamiento innecesario entre componentes. Además, el código es claro y legible, facilitando su mantenimiento y comprensión.

## Ejercicio 2
```
/**
 * Represents an invoice.
 */
export interface Invoice {
  /**
   * Generates the invoice content.
   * @returns The generated invoice content.
   */
  generate(): string;
}

/**
 * Represents a PDF invoice.
 * @implements Invoice
 */
export class PDFInvoice implements Invoice {
  /**
   * Creates a new PDF invoice with the specified data.
   * @param data - The data for the PDF invoice.
   */
  constructor(private data: any) {}

  /**
   * Generates the PDF invoice content.
   * @returns The generated PDF invoice content.
   */
  generate(): string {
      let pdfContent = `=== Factura ===\n`;
      for (const key in this.data) {
          pdfContent += `${key}: ${this.data[key]}\n`;
      }
      pdfContent += `================\n`;
      return pdfContent;
  }
}

/**
 * Represents an HTML invoice.
 * @implements Invoice
 */
export class HTMLInvoice implements Invoice {
  /**
   * Creates a new HTML invoice with the specified data.
   * @param data - The data for the HTML invoice.
   */
  constructor(private data: any) {}

  /**
   * Generates the HTML invoice content.
   * @returns The generated HTML invoice content.
   */
  generate(): string {
      let htmlContent = `<h1>Factura</h1>`;
      htmlContent += `<ul>`;
      for (const key in this.data) {
          htmlContent += `<li><b>${key}:</b> ${this.data[key]}</li>`;
      }
      htmlContent += `</ul>`;
      return htmlContent;
  }
}

/**
 * Generates invoices in different formats.
 */
export class InvoiceGenerator {
  /**
   * Generates an invoice in the specified format.
   * @param format - The format of the invoice (e.g., 'pdf', 'html').
   * @param data - The data for the invoice.
   * @returns An instance of the generated invoice.
   * @throws Error if the specified format is not supported.
   */
  generateInvoice(format: string, data: any): Invoice {
      switch (format.toLowerCase()) {
          case 'pdf':
              return new PDFInvoice(data);
          case 'html':
              return new HTMLInvoice(data);
          default:
              throw new Error(`Formato de factura no soportado: ${format}`);
      }
  }
}

// Example usage
const invoiceData = {
  numero: '001',
  fecha: '2024-03-03',
  cliente: 'Empresa ABC',
  total: 1000
};

const invoiceGenerator = new InvoiceGenerator();
const pdfInvoice = invoiceGenerator.generateInvoice('pdf', invoiceData);
const htmlInvoice = invoiceGenerator.generateInvoice('html', invoiceData);

console.log(pdfInvoice.generate()); // Salida: Factura en formato PDF
console.log(htmlInvoice.generate()); // Salida: Factura en formato HTML


```

Este código implementa un sistema para generar facturas en diferentes formatos, como PDF y HTML. Aquí está su funcionamiento:

### Interfaz Invoice
- Define una estructura básica para una factura con un método `generate()` que debe ser implementado por las clases concretas.

### Clases PDFInvoice y HTMLInvoice
- Ambas clases implementan la interfaz `Invoice`.
- `PDFInvoice` representa una factura en formato PDF.
  - Tiene un constructor que recibe los datos de la factura.
  - El método `generate()` genera el contenido de la factura en formato PDF utilizando los datos proporcionados.
- `HTMLInvoice` representa una factura en formato HTML.
  - Tiene un constructor similar a `PDFInvoice`.
  - El método `generate()` genera el contenido de la factura en formato HTML.

### Clase InvoiceGenerator
- Esta clase se encarga de generar facturas en diferentes formatos.
- Tiene un método `generateInvoice(format, data)` que recibe el formato deseado de la factura y los datos de la factura.
- Utiliza un switch para determinar el tipo de factura a generar (PDF o HTML) y devuelve una instancia correspondiente.
- Lanza un error si se especifica un formato no compatible.

### Ejemplo de uso
- Se definen los datos de la factura en un objeto `invoiceData`.
- Se crea una instancia de `InvoiceGenerator`.
- Se genera una factura en formato PDF utilizando el método `generateInvoice('pdf', invoiceData)`.
- Se genera una factura en formato HTML utilizando el método `generateInvoice('html', invoiceData)`.
- Se imprime el contenido de ambas facturas utilizando el método `generate()`.

Este código permite generar facturas en diferentes formatos de manera flexible y extensible, siguiendo el principio de responsabilidad única y permitiendo la fácil incorporación de nuevos formatos de factura en el futuro.

## Ejercicio 3
### Pregunta
Teniendo en cuenta el código fuente propuesto más abajo, indique si se está violando alguno de los principios SOLID y justifique su respuesta. En tal caso, ¿podría proporcionar un mejor diseño e implementación que sí que cumpla con dichos principios?
```
import * as fs from 'fs';

class FileManager {
  constructor(private filePath: string) {
  }

  // Reads file
  public readFile(): string {
    try {
      const content: string = fs.readFileSync(this.filePath, 'utf-8');
      return content;
    } catch (error) {
      console.error('Error al leer el archivo:', error.message);
      return '';
    }
  }

  // Writes file
  public writeFile(data: string): void {
    try {
      fs.writeFileSync(this.filePath, data, 'utf-8');
      console.log('Archivo escrito exitosamente.');
    } catch (error) {
      console.error('Error al escribir en el archivo:', error.message);
    }
  }
}

// Client code
const fileManager = new FileManager('example.txt');

// Reading content
const currentContent = fileManager.readFile();
console.log('Current content:', currentContent);

// Writing content
const newData = 'This is new content to be written into the file.'
fileManager.writeFile(newData);

// Updating content
const updatedContent = fileManager.readFile();
console.log('Updated content:', updatedContent);
```
### Respuesta
En el código proporcionado, se está violando el Principio de Responsabilidad Única (Single Responsibility Principle, SRP) de SOLID. Este principio establece que una clase debe tener una única razón para cambiar, es decir, una única responsabilidad.

En la clase FileManager, se están combinando dos responsabilidades diferentes: la lectura y la escritura de archivos. Esto viola el SRP porque la clase tiene más de una razón para cambiar: cambiar la lógica de lectura o la lógica de escritura. Esto puede dificultar el mantenimiento y la escalabilidad del código a medida que el sistema crece y cambia.

Una mejor solución sería separar estas dos responsabilidades en clases distintas, cada una con su propia responsabilidad.

```
import * as fs from 'fs';

export interface Reader {
    read(filePath: string): string;
}

export interface Writer {
    write(filePath: string, data: string): void;
}

export class FileReader implements Reader {
    read(filePath: string): string {
        try {
            return fs.readFileSync(filePath, 'utf-8');
        } catch (error) {
            console.error('Error al leer el archivo:', error.message);
            return '';
        }
    }
}

export class FileWriter implements Writer {
    write(filePath: string, data: string): void {
        try {
            fs.writeFileSync(filePath, data, 'utf-8');
            console.log('Archivo escrito exitosamente.');
        } catch (error) {
            console.error('Error al escribir en el archivo:', error.message);
        }
    }
}

// Client code
const fileReader = new FileReader();
const fileWriter = new FileWriter();

// Reading content
const currentContent = fileReader.read('example.txt');
console.log('Current content:', currentContent);

// Writing content
const newData = 'This is new content to be written into the file.';
fileWriter.write('example.txt', newData);

// Updating content
const updatedContent = fileReader.read('example.txt');
console.log('Updated content:', updatedContent);

```

## Ejercicio 4
### Pregunta
Teniendo en cuenta el código fuente propuesto más abajo, indique si se está violando alguno de los principios SOLID y justifique su respuesta. En tal caso, ¿podría proporcionar un mejor diseño e implementación que sí que cumpla con dichos principios?
```
interface PrintableScannable {
  print(): void
  scan(): void
}

class Printer implements PrintableScannable {
  print(): void {
    console.log('Printing...')
  }

  scan(): void { }
}

class Scanner implements PrintableScannable {
  print(): void { }

  scan(): void {
    console.log('Scanning...')
  }

class PrinterScanner implements PrintableScannable {
  print(): void {
    console.log('Printing...')
  }

  scan(): void {
    console.log('Scanning...')
  }
}

// Client code
const printer = new Printer();
// Printing
printer.print();

const scanner = new Scanner();
// Scanning
scanner.scan();

const printerScanner = new PrinterScanner();
// Printing
printerScanner.print();
// Scanning
printerScanner.scan();

```

### Respuesta
En el código proporcionado, se está violando el Principio de Responsabilidad Única (Single Responsibility Principle, SRP) de SOLID. Este principio establece que una clase debe tener una única razón para cambiar, es decir, una única responsabilidad.

En este caso, la interfaz PrintableScannable y las clases Printer, Scanner y PrinterScanner violan el SRP porque están combinando responsabilidades de impresión y escaneo en una sola interfaz y/o clase. Esto puede conducir a problemas de mantenimiento y escalabilidad, ya que cualquier cambio en la lógica de impresión o escaneo podría afectar a todas las clases relacionadas.

Una mejor solución sería separar las responsabilidades de impresión y escaneo en clases separadas, cada una cumpliendo con su propia responsabilidad. 

```
interface Printable {
  print(): void;
}

interface Scannable {
  scan(): void;
}

class Printer implements Printable {
  print(): void {
      console.log('Printing...');
  }
}

class Scanner implements Scannable {
  scan(): void {
      console.log('Scanning...');
  }
}

// Client code
const printer = new Printer();
// Printing
printer.print();

const scanner = new Scanner();
// Scanning
scanner.scan();

```

## Ejercicio 5 
### Pregunta
Teniendo en cuenta el código fuente propuesto más abajo, indique si se está violando alguno de los principios SOLID y justifique su respuesta. En tal caso, ¿podría proporcionar un mejor diseño e implementación que sí que cumpla con dichos principios?
```
// Class that allows notifications by email to be sent
class EmailService {
  notify(message: string): void {
    console.log(`Sending notification by email: ${message}`);
  }
}

// Class that allows notifications by SMS to be sent
class ShortMessageService {
  notify(message: string): void {
    console.log(`Sending notification by SMS: ${message}`);
  }
}

// Class that makes use of different types of services to perform notifications
class Notifier {
  constructor(private notificationService: EmailService | ShortMessageService) {
  }

  sendNotification(message: string): void {
    this.notificationService.notify(message);
  }
}

// Client code
const emailNotifier = new Notifier(new EmailService());
emailNotifier.sendNotification('Hello World!');

const shortMessageNotifier = new Notifier(new ShortMessageService());
shortMessageNotifier.sendNotification('Hello World!');
```

### Respuesta
En el código proporcionado, se está violando el Principio de Sustitución de Liskov (Liskov Substitution Principle, LSP) de SOLID. El LSP establece que las clases derivadas deben poder ser sustituidas por sus clases base sin alterar el correcto funcionamiento del programa.

En este caso, la clase Notifier tiene un constructor que acepta tanto EmailService como ShortMessageService. Sin embargo, estas dos clases no son intercambiables ya que tienen diferentes comportamientos y responsabilidades (EmailService envía notificaciones por correo electrónico y ShortMessageService por SMS). Por lo tanto, el Notifier no puede considerarse válido para ambas clases, ya que espera un comportamiento único pero recibe dos comportamientos diferentes.

Una mejor solución sería definir una interfaz común para todos los servicios de notificación y hacer que ambas clases (EmailService y ShortMessageService) implementen esa interfaz. Luego, Notifier debería depender de esta interfaz en lugar de clases concretas.

```
/**
 * Represents a service responsible for sending notifications.
 */
export interface NotificationService {
  /**
   * Sends a notification with the given message.
   * @param message - The message of the notification.
   */
  notify(message: string): void;
}

/**
 * Represents a notification service that sends notifications via email.
 * @implements NotificationService
 */
export class EmailService implements NotificationService {
  /**
   * Sends a notification via email with the given message.
   * @param message - The message of the notification.
   */
  notify(message: string): void {
      console.log(`Sending notification by email: ${message}`);
  }
}

/**
 * Represents a notification service that sends notifications via SMS.
 * @implements NotificationService
 */
export class ShortMessageService implements NotificationService {
  /**
   * Sends a notification via SMS with the given message.
   * @param message - The message of the notification.
   */
  notify(message: string): void {
      console.log(`Sending notification by SMS: ${message}`);
  }
}

/**
 * Represents a notifier that uses a specific notification service to send notifications.
 */
export class Notifier {
  /**
   * Creates a new notifier with the specified notification service.
   * @param notificationService - The notification service to use.
   */
  constructor(private notificationService: NotificationService) {}

  /**
   * Sends a notification with the given message using the assigned notification service.
   * @param message - The message of the notification.
   */
  sendNotification(message: string): void {
      this.notificationService.notify(message);
  }
}

// Client code
const emailNotifier = new Notifier(new EmailService());
emailNotifier.sendNotification('Hello World!');

const shortMessageNotifier = new Notifier(new ShortMessageService());
shortMessageNotifier.sendNotification('Hello World!');

```
## Conclusión

Utilizar los principios SOLID en el desarrollo de software es fundamental para mejorar la calidad, mantenibilidad y escalabilidad de nuestros proyectos. Al aplicar estos principios, podemos lograr código más limpio, modular y fácil de entender. Esto nos permite adaptarnos mejor a los cambios, reducir la duplicación de código y minimizar los errores. En resumen, comprender y aplicar los principios SOLID nos ayuda a escribir software de mayor calidad y a ser desarrolladores más eficientes y efectivos.