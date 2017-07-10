# Lysis TypeScript classes generator

## Overview

This generator creates TypeScript classes to handle object provided by the API.

## Samples

### Base and extended classes

Example of base classes, the book base class, named `BookBase`:

```
export class BookBase {
  id: number;
  isbn: string;
  description: string;
  author: string;
  title: string;
  publicationDate: Date;

}
```

This class should not be modified, as it is overwritten during next generations.

Another class is automatically generated, inherited from the base class:

```
import { BookBase } from './BookBase';

export class Book implements BookBase {
}
```

This `Book` class inherits from `BookBase` and is not overwritten during further generations.

It is the perfect place to add customizations.

### Other classes dependencies

Reviews are performed on a book. So a review owns a `book` property:

```
import { Book } from './Book';

export class ReviewBase {
  id: number;
  rating: number;
  body: string;
  book: Book;
  author: string;
  publicationDate: Date;

  setBook(id: number): ReviewBase {
    this.book = new Book();
    this.book.id = id;
    this.book['@id'] = '/books/' + id;
    return this;
  }
}
```

The type of the `book` property is `Book`. It is automatically imported.

The `setBook` method is here to automatically populate the `book` property with a book object from the provided book id.

It is almost useful when creating a new review, before posting it.
The real value will overwrite this temporary book value when the backend `POST` response will be received.

Under the hood, the Restangular configuration module (available soon), transforms the `book['@id']` as the correct value.

### Index file

The index file is the one to include in the application controller, services, ... to use classes.

```
import { Book } from '../api/backend-classes';

export class MyComponent implements OnInit {
  private currentBook: Book;

  // [...]
}
```

## Use

### Prerequisites

If it is not already done, install api-lysis globally and as dev dependency:

```
npm install api-lysis -g
npm install api-lysis --save-dev
```

### Install this generator

Install this generator:

```
npm install lysis-typescript-classes-generator --save-dev
```

### Restangular configuration

Install the Restangular config. But how?

This will be available soon.

### Configuration

Configuration sample:

```
apis:
  http://localhost:8000:
    basePath: 'my-backend'
    hydraPrefix: 'hydra:'
    generators:
      lysis-typescript-classes-generator:
        dir: 'classes'
```

Class files are generated in `my-backend/classes`.

If `dir` is not set, the default value is `backend-classes`.


todo:

- force extended class overwrite (default false)
