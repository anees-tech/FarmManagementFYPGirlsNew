"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const UserCropForm = ({ userCrops = [], onSubmit, isEditing = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [availableCrops, setAvailableCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    area: "",
    plantingDate: "",
    harvestDate: "",
    season: "",
    waterLevel: "", //change 1
    status: "Planned",
    notes: "",
  });

  useEffect(() => {
    // Fetch available crops for dropdown
    const fetchAvailableCrops = async () => {
      try {
        const response = await axios.get(`${API_URL}/crops`);
        setAvailableCrops(response.data || []);
      } catch (error) {
        console.error("Error fetching available crops:", error);
        // For demo purposes, load from local data if API fails
        import("../../data/crops").then((module) => {
          setAvailableCrops(module.default);
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableCrops();

    // If editing, populate form with existing data
    if (isEditing && id) {
      const cropToEdit = userCrops.find((crop) => crop._id?.toString() === id);
      if (cropToEdit) {
        setFormData({
          name: cropToEdit.name || "",
          area: cropToEdit.area || "",
          plantingDate: cropToEdit.plantingDate || "",
          harvestDate: cropToEdit.harvestDate || "",
          season: cropToEdit.season || "",
          waterLevel: cropToEdit.waterLevel || "", //change 2
          status: cropToEdit.status || "Planned",
          notes: cropToEdit.notes || "",
        });
      }
    }
  }, [isEditing, id, userCrops]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isEditing) {
        // Update existing crop or editing crop
        await onSubmit(id, formData);
      } else {
        // Create new crop
        await onSubmit(formData);
      }
    } catch (err) {
      alert("Something went wrong while submitting!");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="form-container">
      <h2>{isEditing ? "Edit Crop" : "Add New Crop"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Crop Name</label>
          {isEditing ? (
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          ) : (
            <input
              type="text"
              id="name"
              value={formData.name}
              className="form-control"
              onChange={handleChange}
              name="name"
              required
            />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="area">Area</label>
          <input
            type="text"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="e.g., 5 acres"
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="plantingDate">Planting Date</label>
          <input
            type="date"
            id="plantingDate"
            name="plantingDate"
            value={formData.plantingDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="harvestDate">Expected Harvest Date</label>
          <input
            type="date"
            id="harvestDate"
            name="harvestDate"
            value={formData.harvestDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="season">Season</label>
          <select
            id="season"
            value={formData.season}
            name="season"
            onChange={handleChange}
            className="form-control"
          >
            <option value="Monson">Monson</option>
            <option value="Spring">Spring</option>
            <option value="Rabi">Rabi</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="waterLevel">waterLevel</label>
          <input
            type="text"
            id="waterLevel"
            name="waterLevel"
            value={formData.waterLevel}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="Planned">Planned</option>
            <option value="Growing">Growing</option>
            <option value="Harvested">Harvested</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="form-control"
            rows="4"
            placeholder="Add any notes about this crop..."
          ></textarea>
        </div>

        <div className="form-buttons">
          <button
            type="button"
            onClick={() => navigate("/dashboard/crops")}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn" disabled={submitting}>
            {submitting
              ? "Submitting..."
              : isEditing
              ? "Update Crop"
              : "Add Crop"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserCropForm;
