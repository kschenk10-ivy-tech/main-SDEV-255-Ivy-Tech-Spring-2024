# Courses Data Model

The Courses and Teachers data models represented as tables and a diagram, followed by an outline of the API endpoints in a table format.

```mermaid
erDiagram
    COURSES ||--o{ TEACHERS_COURSES : "has many"
    TEACHERS ||--o{ TEACHERS_COURSES : "teaches"
    COURSES {
        int id PK "Unique course ID"
        string name "Course Name"
        string description "Course Description"
        string subject "Subject Area"
        int credits "Number of Credits"
    }
    TEACHERS {
        int id PK "Unique teacher ID"
        string name "Teacher Name"
        string email "Email Address"
        string department "Department"
    }
    TEACHERS_COURSES {
        int course_id FK "Course ID"
        int teacher_id FK "Teacher ID"
    }
```


#### Diagram (Mermaid)
```mermaid
classDiagram
    class Course {
      +String id (PK)
      +String name
      +String description
      +String subjectArea
      +Integer credits
    }
```


#### Table (Markdown)
| Field         | Data Type | Description                             | Constraint    |
|---------------|-----------|-----------------------------------------|---------------|
| id            | String    | Unique identifier for the course        | Primary Key   |
| name          | String    | The name of the course                  | Required      |
| description   | String    | A detailed description of the course    | Required      |
| subjectArea   | String    | The subject area the course pertains to | Required      |
| credits       | Integer   | Number of credits the course is worth   | Required      |

### Teachers Data Model

#### Diagram (Mermaid)
```mermaid
classDiagram
    class Teacher {
      +String id (PK)
      +String name
    }
```
*Note:* Attribute names in the class diagram have been simplified to `id` and `name` for clarity and consistency.

#### Table (Markdown)
| Field | Data Type | Description                            | Constraint    |
|-------|-----------|----------------------------------------|---------------|
| id    | String    | Unique identifier for the teacher      | Primary Key   |
| name  | String    | Full name of the teacher               | Required      |

### Task 2: Build Backend API

#### API Endpoints Table (Markdown)

##### Courses API

| Method | Endpoint            | Description                            |
|--------|---------------------|----------------------------------------|
| POST   | `/courses`          | Create a new course                    |
| GET    | `/courses`          | Retrieve all courses                   |
| GET    | `/courses/:id`      | Retrieve details of a specific course  |
| PUT    | `/courses/:id`      | Update a specific course               |
| DELETE | `/courses/:id`      | Delete a specific course               |

##### Teachers API

| Method | Endpoint          | Description                |
|--------|-------------------|----------------------------|
| POST   | `/teachers`       | Register a new teacher     |
| POST   | `/auth/login`     | Authenticate a teacher     |
