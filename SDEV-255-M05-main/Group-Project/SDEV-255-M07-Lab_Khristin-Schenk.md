`SDEV-255-M07-Lab_Khristin-Schenk.md`

Khristin Schenk
May 5th, 2024
SDEV-255

## Drafts on Codepen

- M07 Draft One: https://codepen.io/Khristin-Schenk/pen/NWmZgKM/d6a212fe8dd94cc18856cb1151fbaaa6

- M07 Draft Two: https://codepen.io/Khristin-Schenk/pen/ZEZdyGZ/88449bf3e14d7d861ff63b2312e2b940
  

---

## Published Sites (Drafts)

- Website Version #1: https://kschenk10-ivy-tech.github.io/SDEV_255_Final_Project_Group7/#

---

# M05 Lab - Final Project Design, Links, and Backend

- https://ivylearn.ivytech.edu/courses/1240002/assignments/19739634?module_item_id=47815387

- https://kschenk10-ivy-tech.github.io/SDEV_255_Final_Project_Group7/

---

# M06 Lab - Routing and Modeling Data: 

- https://ivylearn.ivytech.edu/courses/1240002/assignments/19739662?module_item_id=47815458

- https://github.com/kschenk10-ivy-tech/SDEV-255-M06-Lab


---

# M07 Lab: Implementing a Login System

> Objective: *Create a login system in order for users and teachers to login.*

- Make sure to separate authorization features based on who the user is

- Make sure that the CRUD functions are secured by only allowing teachers to create, update, and destroy courses.


# Code:

## DRAFT ONE

```html
<div class="md:w-1/2 px-4 mb-8 md:mb-0">
 <div class="bg-white rounded-lg shadow-md p-6">
  <h3 class="text-xl font-semibold text-gray-800 mb-4">For Students</h3>
  <form onsubmit="return loginUser('student')">
   <input type="email" placeholder="Email" name="email" required class="input-style">
   <input type="password" placeholder="Password" name="password" required class="input-style">
   <input type="submit" value="Log In" class="block w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md text-center">
  </form>
 </div>
</div>
<div class="md:w-1/2 px-4">
 <div class="bg-white rounded-lg shadow-md p-6">
  <h3 class="text-xl font-semibold text-gray-800 mb-4">For Teachers/Staff</h3>
  <form onsubmit="return loginUser('teacher')">
   <input type="email" placeholder="Email" name="email" required class="input-style">
   <input type="password" placeholder="Password" name="password" required class="input-style">
   <input type="submit" value="Log In" class="block w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md text-center">
  </form>
 </div>
</div>
```


```css
.input-style {
 width: 100%;
 padding: 8px;
 margin: 10px 0;
 display: inline-block;
 border: 1px solid #ccc;
 border-radius: 4px;
 box-sizing: border-box;
}
```


```javascript
function loginUser(role) {
 const email = event.target.email.value;
 const password = event.target.password.value;

 // Placeholder validation: In real application, validate against the database
 if (
  email === "teacher@example.com" &&
  password === "password123" &&
  role === "teacher"
 ) {
  window.location.href = "./teacherDashboard.html"; // Redirect to teacher's dashboard
 } else if (
  email === "student@example.com" &&
  password === "password123" &&
  role === "student"
 ) {
  window.location.href = "./studentDashboard.html"; // Redirect to student's dashboard
 } else {
  alert("Invalid credentials or role!");
 }
 return false; // Prevent form submission for demonstration purposes
}

```