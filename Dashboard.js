// Dashboard.js import React, { useEffect, useState } from "react"; import axios from "axios";

const Dashboard = () => { const [updates, setUpdates] = useState([]); const [student, setStudent] = useState(""); const [issue, setIssue] = useState("");

useEffect(() => { const fetchUpdates = async () => { try { const token = localStorage.getItem("token"); const res = await axios.get("http://localhost:5000/api/updates", { headers: { Authorization: token }, }); setUpdates(res.data); } catch (err) { console.error("Failed to fetch updates", err); } }; fetchUpdates(); }, []);

const handleComplaint = async () => { try { const token = localStorage.getItem("token"); await axios.post( "http://localhost:5000/api/complaints", { student, issue }, { headers: { Authorization: token } } ); alert("Complaint submitted"); setStudent(""); setIssue(""); } catch (err) { console.error("Error submitting complaint", err); } };

return ( <div className="p-6"> <h1 className="text-3xl font-bold text-center mb-6">Student Dashboard</h1> <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> <div className="bg-white p-4 rounded-xl shadow-md"> <h2 className="text-xl font-semibold">Hostel Updates</h2> {updates.map((update, i) => ( <p key={i} className="text-sm py-1">{update.message}</p> ))} </div> <div className="bg-white p-4 rounded-xl shadow-md"> <h2 className="text-xl font-semibold">Submit Complaint</h2> <input type="text" placeholder="Your Name" value={student} onChange={(e) => setStudent(e.target.value)} className="w-full p-2 mb-2 border rounded" /> <textarea placeholder="Describe your issue" value={issue} onChange={(e) => setIssue(e.target.value)} className="w-full p-2 mb-2 border rounded" /> <button
onClick={handleComplaint}
className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
> Submit </button> </div> </div> </div> ); };

export default Dashboard;

// AdminPanel.js import React, { useEffect, useState } from "react"; import axios from "axios";

const AdminPanel = () => { const [message, setMessage] = useState(""); const [complaints, setComplaints] = useState([]);

const postUpdate = async () => { try { const token = localStorage.getItem("token"); await axios.post( "http://localhost:5000/api/updates", { message }, { headers: { Authorization: token } } ); alert("Update posted"); setMessage(""); } catch (err) { console.error("Error posting update", err); } };

useEffect(() => { const fetchComplaints = async () => { try { const token = localStorage.getItem("token"); const res = await axios.get("http://localhost:5000/api/complaints", { headers: { Authorization: token }, }); setComplaints(res.data); } catch (err) { console.error("Error fetching complaints", err); } }; fetchComplaints(); }, []);

return ( <div className="p-6"> <h1 className="text-3xl font-bold text-center mb-6">Admin Panel</h1> <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> <div className="bg-white p-4 rounded-xl shadow-md"> <h2 className="text-xl font-semibold">Post Update</h2> <textarea placeholder="Enter hostel update message" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-2 mb-2 border rounded" /> <button
onClick={postUpdate}
className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
> Post </button> </div> <div className="bg-white p-4 rounded-xl shadow-md"> <h2 className="text-xl font-semibold">View Complaints</h2> {complaints.map((c, i) => ( <div key={i} className="border p-2 my-1 rounded"> <p className="font-bold">{c.student}</p> <p>{c.issue}</p> <p className="text-xs text-gray-500">Status: {c.status}</p> </div> ))} </div> </div> </div> ); };

export default AdminPanel;

  
