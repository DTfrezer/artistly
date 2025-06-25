'use client';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// ✅ Define the type for your form data
type ArtistFormData = {
  name: string;
  bio: string;
  category: string[];
  languages: string[];
  fee: string;
  location: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  bio: yup.string().required("Bio is required"),
  category: yup.array().min(1, "Select at least one category"),
  languages: yup.array().min(1, "Select at least one language"),
  fee: yup.string().required("Fee range is required"),
  location: yup.string().required("Location is required"),
});

const categories = ["Singer", "Dancer", "DJ", "Speaker"];
const languages = ["English", "Hindi", "Marathi", "Tamil"];
const feeRanges = ["₹5,000–₹10,000", "₹10,000–₹20,000", "₹20,000+"];

export default function OnboardPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ArtistFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      category: [],
      languages: [],
    },
  });

  const [imagePreview, setImagePreview] = useState("");

  const onSubmit = async (data: ArtistFormData) => {
    console.log("Submitting to Firebase:", data);

    try {
      await addDoc(collection(db, "artists"), data);
      alert("Artist submitted successfully to Firebase!");
      reset(); // ✅ clear form
      setImagePreview(""); // ✅ clear image preview
    } catch (error) {
      console.error("Error submitting artist:", error);
      alert("Submission failed.");
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🎙️ Artist Onboarding Form</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label>Name</label>
          <Input {...register("name")} />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        <div>
          <label>Bio</label>
          <Textarea {...register("bio")} />
          <p className="text-red-500 text-sm">{errors.bio?.message}</p>
        </div>

        <div>
          <label>Category (multi-select)</label>
          {categories.map((cat) => (
            <div key={cat}>
              <label>
                <input
                  type="checkbox"
                  value={cat}
                  {...register("category")}
                  className="mr-2"
                />
                {cat}
              </label>
            </div>
          ))}
          <p className="text-red-500 text-sm">{errors.category?.message}</p>
        </div>

        <div>
          <label>Languages Spoken</label>
          {languages.map((lang) => (
            <div key={lang}>
              <label>
                <input
                  type="checkbox"
                  value={lang}
                  {...register("languages")}
                  className="mr-2"
                />
                {lang}
              </label>
            </div>
          ))}
          <p className="text-red-500 text-sm">{errors.languages?.message}</p>
        </div>

        <div>
          <label>Fee Range</label>
          <select {...register("fee")} className="w-full border px-2 py-1 rounded">
            <option value="">Select Fee</option>
            {feeRanges.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-sm">{errors.fee?.message}</p>
        </div>

        <div>
          <label>Location</label>
          <Input {...register("location")} />
          <p className="text-red-500 text-sm">{errors.location?.message}</p>
        </div>

        <div>
          <label>Profile Image (optional)</label>
          <Input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setImagePreview(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 h-32 rounded" />
          )}
        </div>

        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>
    </main>
  );
}
