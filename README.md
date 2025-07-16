# 🧠 Graph Editor

A full-stack **Graph Editor** application that enables users to create, visualize, and manage graph structures through an interactive UI. Built with a robust modern stack and powered by `yFiles` for graph layout and visualization.

⚠️ **Important**: This project uses [yFiles](https://www.yworks.com/products/yfiles), which is a **commercial library**. A **valid paid license** is required to run the application. Without a license, the graph-related functionalities will not be available or will be limited to trial/demo capabilities.

## 🚀 Tech Stack

- **Backend**: [.NET Core Web API](https://dotnet.microsoft.com/)
- **Frontend**: [Angular](https://angular.io/)
- **Graph Library**: [yFiles](https://www.yworks.com/products/yfiles)
- **Database**: [MongoDB](https://www.mongodb.com/)

---

## ✨ Features

### Home page
A graph named "Main" will be loaded in the home page by default.

![Home Page](./ui-previews/home.png)

### 📋 Graph Menu

Select a graph from the menu to load it. 


![Graph Menu](./ui-previews/graphmenu1.png)
![Graph Menu](./ui-previews/graphmenu2.png) 
The name of the selected graph is updated in the top accordingly. 
![Graph Menu](./ui-previews/graphmenu3.png)

---

### 🧱 Create Graph

Click the "Create Graph" button and create a new graph from scratch, ready to customize with nodes and edges.

![Create Graph](./ui-previews/newgraph1.png)
![Create Graph](./ui-previews/newgraph2.png)
![Create Graph](./ui-previews/newgraph3.png)

---

### ➕ Add Node

Click the "Edit graph" button and add new nodes with custom labels and relationships (parent/child selection).

![Add Node](./ui-previews/addnode1.png)
![Add Node](./ui-previews/addnode2.png)
![Add Node](./ui-previews/addnode3.png)
![Add Node](./ui-previews/addnode4.png)

---

### ❌ Delete Node

Select the node you want to delete and press the delete key. Click the delete button to confirm deletion. 

![Delete Node](./ui-previews/deletenode1.png)
![Delete Node](./ui-previews/deletenode2.png)

---

### 🧭 Apply Layout

Automatically organize your graph by clicking the layout button, using smart layout algorithms via yFiles.

![Layout](./ui-previews/layout1.png)
![Layout](./ui-previews/layout2.png)

---

## 📦 Installation & Setup

### 1. Backend Setup (.NET Core)

```bash
cd API
dotnet restore
dotnet run
```
### 2. Frontend Setup (.NET Core)
```bash
cd Client
npm install
ng serve
```
### 3. MongoDB setup
Ensure MongoDB is running. Update the MongoDB connection URI in your backend configuration file as needed (e.g., appsettings.json).
