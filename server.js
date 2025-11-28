const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public")); // serve index.html and other pages

// Admin credentials
const ADMIN = { username: "admin", password: "123456" };

// Default slots
let slots = {
  "Haircut": ["10:00 AM","11:00 AM","1:00 PM","4:00 PM"],
  "Facial": ["9:00 AM","12:00 PM","3:00 PM"],
  "Makeup": ["10:30 AM","2:00 PM","5:00 PM"],
  "Waxing": ["11:00 AM","1:30 PM","4:30 PM"],
  "Threading": ["9:30 AM","11:30 AM","2:30 PM"],
  "Bridal Makeup": ["9:00 AM","3:00 PM"],
  "Stretching Therapy": ["8:00 AM","10:00 AM","6:00 PM"],
  "Pain Relief Session": ["8:30 AM","12:30 PM","5:30 PM"]
};

// Read bookings from file
const BOOKINGS_FILE = "bookings.json";
function readBookings() {
  if (!fs.existsSync(BOOKINGS_FILE)) fs.writeFileSync(BOOKINGS_FILE, "[]");
  return JSON.parse(fs.readFileSync(BOOKINGS_FILE));
}
function saveBooking(b) {
  const all = readBookings();
  all.push(b);
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(all, null, 2));
}

// API Routes

// Admin login
app.post("/api/admin-login", (req,res)=>{
  const {username,password} = req.body;
  if(username===ADMIN.username && password===ADMIN.password) res.json({success:true});
  else res.json({success:false});
});

// Get bookings
app.get("/api/bookings", (req,res)=>{
  res.json(readBookings());
});

// Post booking
app.post("/api/bookings", (req,res)=>{
  saveBooking(req.body);
  res.json({success:true});
});

// Get slots
app.get("/api/slots", (req,res)=>{
  res.json(slots);
});

// Update slots
app.post("/api/update-slots", (req,res)=>{
  slots = req.body;
  res.json({success:true});
});

app.listen(port, ()=>console.log(`Server running at http://localhost:${port}`));
