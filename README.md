# Evitra

- A Fully functional Event Management Web Application

## Overview:

- Evitra is a fully functional Event Management Web Application using the MERN Stack. The application will support custom authentication, dynamic event operations, A search and filter system for browsing events efficiently, and an intuitive interface designed for ease of use and performance.

## 🌐 [Live Url](https://evitra-client.vercel.app/)

# 🔧 Run the Project Locally

1️⃣ **Clone the Repository**:

```sh
  https://github.com/mohaiminul375/evitra
  cd evitra
```

2️⃣ **Install Dependencies**:

```sh
npm install
```

4️⃣ **Set Up Environment Variables**: Create a `.env.local` file in the root directory and add the necessary environment variables. (**Important!**)

5️⃣ **Run the Application**:

```sh
npm run dev -- --host
```

6️⃣ **Access the Site**: Open your browser and go to http://localhost:3000.

## 🚀 Features

## 👤 For Default User

### 1. Custom Authentication

- User must log in for operation using custom JWT authentication and password bcrypt

### 2. Home Page

- After login, user is redirected to the Home Page
- Theme toggle (Light,Dark) apply all over website

### 3. Create an Event(Private Route)

- User can create an Event submit some data and it will save Data base

### 4.All Event(Private Route)

- Users can view all listed events with `Descending order` dynamic filtering by date range and real-time search functionality for quick and efficient browsing.
- Pagination for better user Experience

### 5.MY Events Page(Private Route)

- On this page, users can see the events they've added and have the option to edit or delete their own events.
- User can see participants list of his each event

### 5.Join Event

- User can Join event through press join button and join an event only once.
- if event already expired user can't join
- User can cancel event join

### 6.Joined Event

- User can See all event he has sent and interest event list in card formate

### 7.Update Profile

- User can update their profile only name and image
### 8.Error & Loading

- Meaning full Error page and loading spinner when need

# 🔐 Access Info

- Default Email: mohaiminul375@gmail.com
- Password: 340698

## 🛠️ Technologies Used

- **Frontend**: Next.js, Typescript, HTML, Tailwind CSS, Shadcn UI.
- **Backend**: Node.js, Express.js, Mongoose.
- **Authentication**: Custom Auth with Jwt.
- **Hosting**: Vercel (frontend and backend both), cloudinary for Image.

# 🛠️ npm and Packages

- `Next.js(15.3.4)`
- `React(18.3.1)`
- `Typescript`
- `Shadcn UI`
- `React hook form`
- `tanstack query`
- `axios`
- `lottie files`
- `react hot toast`
- `react confirm alert`
- `react loading and spinner`
- `react-image-uploading`
- `cloudinary`
- `react-icon`
- `react date picker`

# 🖥️ Server Side

- [Evitra Server Repository](https://github.com/mohaiminul375/evitra-server)
