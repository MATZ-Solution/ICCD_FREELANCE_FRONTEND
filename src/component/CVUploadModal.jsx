import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useApplyProject } from '../../api/client/project';

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    experience: yup
        .number()
        .typeError('Must be a number')
        .min(0, 'Cannot be negative')
        .required('Experience is required'),
    files: yup
        .mixed()
        .test('fileExists', 'Please upload your CV', (value) => value?.length > 0)
        .test('fileType', 'Only PDF or DOCX allowed', (value) => {
            if (!value?.[0]) return false;
            return ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(
                value[0].type
            );
        }),
});

const CVUploadModal = ({ onClose, data, freelancerData }) => {
    const {firstName, lastName} = freelancerData
    const clientID = data[0]?.clientID
    const projectID = data[0]?.id
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues:{
            name: firstName + " " +lastName
        }
    });
    const { submitProposals, isSuccess, isPending, isError, error } = useApplyProject()

    const onSubmit = (data) => {
        const updateData = {...data, projectId: projectID, clientId: clientID}
        const formData = new FormData()
        for (const key in updateData) {
            if (key === 'files') {
                formData.append("files", updateData.files[0]);
            }
            else if (Array.isArray(updateData[key])) {
                formData.append(key, JSON.stringify(updateData[key]));
            }
            else {
                formData.append(key, updateData[key])
            }
        }
        submitProposals(formData)
        onClose()
    };

    return (
        <div className="w-full flex fixed z-20 inset-0 sm:p-5 sm:items-center sm:justify-center lg:p-10">
            <div className="absolute inset-0 bg-black/50 z-0"></div>
            <div className="z-10 bg-white rounded-xl p-6 w-full max-w-md shadow-lg space-y-4">
                <h2 className="text-xl font-semibold text-center">Upload Your CV</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

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
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            {...register('email')}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Experience (years)</label>
                        <input
                            type="number"
                            {...register('experience')}
                            className="w-full border rounded px-3 py-2"
                            placeholder="0"
                        />
                        {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Upload CV (PDF or DOCX)</label>
                        <input
                            type="file"
                            accept=".pdf,.docx"
                            {...register('files')}
                            className="w-full"
                        />
                        {errors.files && <p className="text-red-500 text-sm">{errors.files.message}</p>}
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

export default CVUploadModal;
