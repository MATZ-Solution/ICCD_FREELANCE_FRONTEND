import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SquarePen } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { useEditClientProfile } from '../../../api/client/clients';
import { memo } from 'react';

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    about: yup.string().required('About is required'),
});

const AboutModal = ({ onClose }) => {
    const user = useSelector(state => state.user.userDetails)
    console.log("user: ", user)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: user?.name || '',
            about: user?.about || '',
        },
    });

    const [image, setImage] = useState(null);
    const [delFileKey, setDelFileKey] = useState(null)
    console.log("image: ", image)

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setDelFileKey(user?.fileKey)
            const imageUrl = URL.createObjectURL(file);  // creates preview
            setImage({ imageUrl: imageUrl, imageFile: file });  // update image state
        }
    };
    const { editClientProfile, isSuccess, isPending, isError, error } = useEditClientProfile()
    const onSubmit = (data) => {
        const updateData = { ...data, userId: user?.id, files: image?.imageFile, fileKey: delFileKey }
        const formData = new FormData()
        for (const key in updateData) {
            if (key === 'files') {
                formData.append("files", updateData.files);
            }
            else {
                formData.append(key, updateData[key])
            }
        }
        editClientProfile(formData)
        onClose()
    };

    return (
        <div className="w-full flex fixed z-70 inset-0 sm:p-5 sm:items-center sm:justify-center lg:p-10">
            <div className="absolute inset-0 bg-black/50 z-0"></div>
            <div className="z-10 bg-white rounded-xl p-6 w-full max-w-md shadow-lg space-y-4">
                <h2 className="text-xl font-semibold text-center">Update Profile</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className='relative flex justify-center'>
                        <div className='relative'>
                            <img src={image ? image?.imageUrl : user?.userImg ? user?.userImg : ''} className=' bg-gray-200 w-20 h-20 rounded-full' />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                id="fileInput"
                            />
                            {/* Edit Icon Button */}
                            <label htmlFor="fileInput" className="absolute -top-2 -right-6  p-1 rounded-full shadow cursor-pointer">
                                <Pencil size={18} className="text-black" />
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            {...register('name')}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">About</label>
                        <textarea
                            type="text"
                            {...register('about')}
                            className="w-full h-32 border rounded px-3 py-2"
                            placeholder="Enter about details"
                        />
                        {errors.about && <p className="text-red-500 text-sm">{errors.about.message}</p>}
                    </div>
                    <div className="flex justify-between space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-1/2 bg-gray-300 hover:bg-gray-400 text-black py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="cursor-pointer w-1/2 bg-[#01AEAD] hover:bg-[#05929c] text-white py-2 rounded"
                        >
                            Submit
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default memo(AboutModal);
