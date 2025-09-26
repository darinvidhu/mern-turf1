import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf"; // <-- import jspdf
import "./BookingForm.css";

export default function BookingForm() {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  const calculateAmount = (start, end) => {
    if (!start || !end) return setAmount(0);
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const duration = (eh * 60 + em - (sh * 60 + sm)) / 60;
    setAmount(duration > 0 ? duration * 1000 : 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !startTime || !endTime || !name || !phone || !email) {
      alert("Please fill all fields correctly.");
      return;
    }
    if (amount <= 0) {
      alert("End time must be after start time.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/bookings", {
        name,
        phone,
        email,
        date,
        startTime,
        endTime,
        amount,
      });

      if (res.status === 201) {
        setConfirmed(true);
        setBookingId(res.data._id);
      }
    } catch (err) {
      alert("Booking failed. Try again later.");
      console.log(err);
    }
  };

  // Download confirmation as PDF
const downloadConfirmationPDF = () => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("VIDHU TURFS", 105, 20, { align: "center" });

  // Contact & Address below header
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Contact: +91 9876543210", 105, 30, { align: "center" });
  doc.text("Address: 12, Kamarajar Street, Madurai, Tamil Nadu", 105, 37, { align: "center" });

  // Subheading
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("Booking Confirmation", 105, 50, { align: "center" });
  doc.line(20, 53, 190, 53); // horizontal line

  // Booking details
  doc.setFontSize(12);
  doc.text(`Name: ${name}`, 20, 65);
  doc.text(`Email: ${email}`, 20, 75);
  doc.text(`Phone: ${phone}`, 20, 85);
  doc.text(`Date: ${date}`, 20, 95);
  doc.text(`Time: ${startTime} - ${endTime}`, 20, 105);
  doc.text(`Amount: ₹${amount}`, 20, 115);

  // Footer
  doc.setFontSize(10);
  doc.text("Thank you for booking with VIDHU TURFS!", 105, 130, { align: "center" });

  // Save PDF
  doc.save("VIDHU_TURFS_Booking.pdf");
};



  const resetForm = () => {
    setDate("");
    setStartTime("");
    setEndTime("");
    setName("");
    setPhone("");
    setEmail("");
    setAmount(0);
    setConfirmed(false);
    setBookingId(null);
  };

  const cancelBooking = async () => {
    if (!bookingId) return alert("No booking to cancel.");
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);
      alert("Booking cancelled successfully.");
      resetForm();
    } catch (err) {
      alert("Failed to cancel booking.");
      console.log(err);
    }
  };

  return (
    <div className="booking-container">
      <h1 className="title">Vidhu Turfs Booking</h1>

      {!confirmed ? (
        <form className="booking-form" onSubmit={handleSubmit}>
          {/* Form inputs remain same */}
          <label>
            Select Date
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <label>
            Start Time
            <input
              type="time"
              min="09:00"
              max="21:00"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
                calculateAmount(e.target.value, endTime);
              }}
              required
            />
          </label>
          <label>
            End Time
            <input
              type="time"
              min="09:00"
              max="21:00"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
                calculateAmount(startTime, e.target.value);
              }}
              required
            />
          </label>
          <div className="amount-display">Amount: ₹{amount}</div>
          <label>
            Full Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Mobile Number
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="confirm-btn">
            Confirm Booking
          </button>
        </form>
      ) : (
        <div className="confirmation">
  <h2>Booking Confirmed ✅</h2>
  <p>
    <strong>{name}</strong>, your booking on <strong>{date}</strong>{" "}
    from <strong>{startTime}</strong> to <strong>{endTime}</strong> is
    confirmed.
  </p>
  <p>Total Amount: <strong>₹{amount}</strong></p>
  <p>You can pay in person at the venue.</p>

  <div className="confirmation-buttons">
    <button className="btn download" onClick={downloadConfirmationPDF}>
      Download PDF
    </button>
    <button className="btn book-again" onClick={resetForm}>
      Book Again
    </button>
  </div>
</div>

      )}
    </div>
  );
}
