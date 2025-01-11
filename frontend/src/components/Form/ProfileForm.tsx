import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProfileUpdateData } from '../../types/user';
import toast from 'react-hot-toast';
import { updateProfile } from '../../store/userSlice';
import { userProfileUpdate } from '../../api/Profile';

const ProfileForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null)
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<ProfileUpdateData>();

    const onSubmit = async (data: ProfileUpdateData) => {
        setLoading(true);
        try {
            console.log(data);
            const result = await userProfileUpdate(data);
            if (result?.success) {
                toast.success("Profile updated successfully");
            } else {
                toast.error("Profile updated failed");
            }

        } catch (error) {
            console.error(error)
            toast.error("Failed to update profile");
        }
        setLoading(false);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            // Validate file type and size
            if (!file.type.startsWith("image/")) {
                toast.error("Please upload a valid image file");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size should not exceed 5MB");
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result as string);
                setValue("avatar", file);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
            <div className="max-w-2xl w-full bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-6 text-zinc-950 text-center">Complete Your Profile</h2>

                {/* Profile Picture Section */}
                <div className="flex justify-center mb-6">

                    <div
                        className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer"
                        onClick={() => document.getElementById('imageInput')?.click()}
                    >

                        {preview ? (
                            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-full" />
                        ) : (
                            <span className="text-lg">Upload</span>
                        )}
                    </div>

                    <input
                        id='imageInput'
                        {...register("avatar")}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        hidden
                    />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            {...register("name")}
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                            {...register("address")}
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select
                            {...register("gender")}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                            {...register("bio", {
                                maxLength: {
                                    value: 500,
                                    message: "Bio cannot exceed 500 characters"
                                }
                            })}
                            rows={3}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Tell us about yourself..."
                        />
                        {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
                    </div>


                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                {...register("phoneNumber", {
                                    pattern: {
                                        value: /^\d{10}$/,
                                        message: "Please enter a valid 10-digit phone number"
                                    }
                                })}
                                type="tel"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.phoneNumber && (
                                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                            )}
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date</label>
                            <input
                                {...register("birthDate")}
                                type="date"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-zinc-950 text-white py-2 rounded-md hover:bg-zinc-900 transition duration-300 disabled:opacity-50"
                    >
                        {loading ? 'Updating Profile...' : 'Update Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileForm;
