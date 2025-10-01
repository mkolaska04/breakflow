import React, { useState } from 'react';

type BodyDataFormProps = {
  onFormSubmit: (data: any) => void;
};

export default function BodyDataForm({ onFormSubmit }: BodyDataFormProps) {
  const [formData, setFormData] = useState({
    gender: '',
    height: '',
    weight: '',
    age: '',
  });

  

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.gender) {
      newErrors.gender = 'Please select a gender';
    }
    if (!formData.height || Number(formData.height) <= 0 || Number(formData.height) > 300) {
      newErrors.height = 'Please enter a valid height';
    }
    if (!formData.weight || Number(formData.weight) <= 0 || Number(formData.weight) > 500) {
      newErrors.weight = 'Please enter a valid weight';
    }
    if (!formData.age || Number(formData.age) <= 0 || Number(formData.age) > 150) {
      newErrors.age = 'Please enter a valid age';
    }
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onFormSubmit(formData);
    }
  };

  return (
    <div className="p-4 bg-[var(--bg-surface)] rounded-lg shadow-md max-w-4xl my-8 mx-4 md:mx-auto mb-4">
      <h2 className="text-2xl font-bold mb-4 text-[var(--theme-secondary)]">
        Fill to calculate your statistics
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col md:flex-row md:space-x-4 md:space-y-0">
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)]">Gender</label>
          <div className="flex items-center">
            <input type="radio" id="male" name="gender" value="male" onChange={handleChange} className="mr-2" />
            <label htmlFor="male" className="ml-2">Male</label>
          </div>
          <div className="flex items-center">
            <input type="radio" id="female" name="gender" value="female" onChange={handleChange} className="mr-2" />
            <label htmlFor="female" className="ml-2">Female</label>
          </div>
          {errors.gender && <div className="text-red-500 text-sm mt-1">{errors.gender}</div>}
        </div>

        <div>
          <label htmlFor="height" className="block text-sm font-medium text-[var(--text-primary)]">Height (cm)</label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-[var(--bg-primary)] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-[var(--text-primary)]"
            placeholder="Enter your height in cm"
          />
          {errors.height && <div className="text-red-500 text-sm mt-1">{errors.height}</div>}
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-[var(--text-primary)]">Weight (kg)</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-[var(--bg-primary)] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-[var(--text-primary)]"
            placeholder="Enter your weight in kg"
          />
          {errors.weight && <div className="text-red-500 text-sm mt-1">{errors.weight}</div>}
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-[var(--text-primary)]">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-[var(--bg-primary)] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-[var(--text-primary)]"
            placeholder="Enter your age"
          />
          {errors.age && <div className="text-red-500 text-sm mt-1">{errors.age}</div>}
        </div>

        <button
          type="submit"
          className="h-10 px-4 py-2 bg-[var(--theme-primary)] text-white rounded-md shadow-sm hover:bg-[var(--theme-primary-dark)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 self-start"
        >
          Submit
        </button>
      </form>
    </div>
  );
}


