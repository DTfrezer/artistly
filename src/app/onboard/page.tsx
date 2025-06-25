'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';

// ✅ Validation schema
const schema = yup.object({
  name: yup.string().required('Name is required'),
  bio: yup.string().required('Bio is required'),
  category: yup
    .array()
    .of(yup.string().required())
    .min(1, 'Select at least one category')
    .required('Category is required'),
  languages: yup
    .array()
    .of(yup.string().required())
    .min(1, 'Select at least one language')
    .required('Languages are required'),
  fee: yup.string().required('Fee range is required'),
  location: yup.string().required('Location is required'),
});

type ArtistFormData = yup.Asserts<typeof schema>;

const categories = ['Singer', 'Dancer', 'DJ', 'Speaker'];
const languages = ['English', 'Hindi', 'Marathi', 'Tamil'];
const feeRanges = ['₹5,000–₹10,000', '₹10,000–₹20,000', '₹20,000+'];

export default function OnboardPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ArtistFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      bio: '',
      category: [],
      languages: [],
      fee: '',
      location: '',
    },
  });

  const [imagePreview, setImagePreview] = useState<string>('');

  const onSubmit: SubmitHandler<ArtistFormData> = async (data) => {
    try {
      await addDoc(collection(db, 'artists'), data);
      alert('Artist submitted successfully to Firebase!');
      reset();
      setImagePreview('');
    } catch (error) {
      console.error(error);
      alert('Submission failed.');
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🎙️ Artist Onboarding Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <label>Name</label>
          <Input {...register('name')} />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        {/* Bio */}
        <div>
          <label>Bio</label>
          <Textarea {...register('bio')} />
          <p className="text-red-500 text-sm">{errors.bio?.message}</p>
        </div>

        {/* Category */}
        <div>
          <label>Category (multi-select)</label>
          {categories.map((cat) => (
            <label key={cat} className="block">
              <input
                type="checkbox"
                value={cat}
                {...register('category')}
                className="mr-2"
              />
              {cat}
            </label>
          ))}
          <p className="text-red-500 text-sm">{errors.category?.message}</p>
        </div>

        {/* Languages */}
        <div>
          <label>Languages Spoken</label>
          {languages.map((lang) => (
            <label key={lang} className="block">
              <input
                type="checkbox"
                value={lang}
                {...register('languages')}
                className="mr-2"
              />
              {lang}
            </label>
          ))}
          <p className="text-red-500 text-sm">{errors.languages?.message}</p>
        </div>

        {/* Fee */}
        <div>
          <label>Fee Range</label>
          <select {...register('fee')} className="w-full border px-2 py-1 rounded">
            <option value="">Select Fee</option>
            {feeRanges.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-sm">{errors.fee?.message}</p>
        </div>

        {/* Location */}
        <div>
          <label>Location</label>
          <Input {...register('location')} />
          <p className="text-red-500 text-sm">{errors.location?.message}</p>
        </div>

        {/* Profile Image Upload */}
        <div>
          <label>Profile Image (optional)</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setImagePreview(reader.result as string);
                reader.readAsDataURL(file);
              }
            }}
          />
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="Preview"
              width={128}
              height={128}
              className="object-cover rounded mt-2"
            />
          )}
        </div>

        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>
    </main>
  );
}
