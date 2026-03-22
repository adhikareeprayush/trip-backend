import { Booking } from "../models/bookings.model.js";

// Get all bookings
export const getBookigs = async (req, res) => {
  try {
    const bookings = await Booking.find();

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bookings",
    });
  }
};

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      numberOfPeople,
      totalPrice,
      bookingDate,
    } = req.body;

    if (
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !numberOfPeople ||
      !totalPrice
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBooking = new Booking({
      customerName,
      customerEmail,
      customerPhone,
      numberOfPeople,
      totalPrice,
      bookingDate,
      status: "pending",
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({
      message: "Error creating booking",
    });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (
      status !== "pending" &&
      status !== "confirmed" &&
      status !== "cancelled"
    ) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({
      message: "Error updating booking status",
    });
  }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await booking.remove();
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting booking",
    });
  }
};
