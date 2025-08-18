import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useApplyProject } from '../../api/client/project';
import { useLocation } from 'react-router-dom';
import { useApplyJob } from '../../api/client/job';
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

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

const ProposalModal = ({ onClose, data, freelancerData }) => {
    console.log("freelancerData: ", freelancerData)
    const { firstName, lastName, id: freelancerId, email } = freelancerData
    const clientID = data[0]?.clientID
    const projectID = data[0]?.id
    const pathName = useLocation().pathname
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: firstName + " " + lastName,
            email: email
        }
    });
    const { submitProposals, isSuccess, isPending, isError, error } = useApplyProject()
    const { submitJob } = useApplyJob()

    const onSubmit = (data) => {
        const updateData = { ...data, projectId: projectID, clientId: clientID, freelancerId: freelancerId }
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
        // submitProposals(formData)
        if (pathName.includes('manage-jobs')) {
            submitJob(formData)
        } else {
            submitProposals(formData)
        }
        onClose()
    };

    return (
        <div className="fixed top-0 flex items-center justify-center z-40  bg-black/50 w-full h-[100vh]">
            <div className="bg-white w-[35rem] h-full sm:h-auto sm:rounded-3xl">
                <div className="bg-[#F8F8F8] px-6 py-3 rounded-t-3xl flex justify-between">
                    <h1 className="font-semibold">Add Details</h1>
                    <CloseOutlinedIcon className="cursor-pointer"
                    onClick={onClose}
                    />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-3 px-6 mt-3">
                        <h1 className="font-semibold">Name</h1>
                        <input
                            type="text"
                            {...register('name')}
                            className="w-full h-12 border-[2px] border-[#D9D9D9] rounded-lg p-2 shadow-lg "
                            placeholder="Enter your name"
                        ></input>
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div className="flex flex-col gap-3 px-6 mt-3">
                        <h1 className="font-semibold">Email</h1>
                        <input
                            type="email"
                            {...register('email')}
                            className="w-full h-12 border-[2px] border-[#D9D9D9] rounded-lg p-2 shadow-lg "
                            placeholder="Enter your email"
                        ></input>
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div className="flex flex-col gap-3 px-6 mt-3">
                        <h1 className="font-semibold">Experience</h1>
                        <input
                            type="number"
                            {...register('experience')}
                            className="w-full h-12 border-[2px] border-[#D9D9D9] rounded-lg p-2 shadow-lg "
                            placeholder="0"
                        ></input>
                        {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
                    </div>
                    <div className="flex flex-col gap-3 px-6 p-3">
                        <h1 className="font-semibold">Upload CV</h1>
                        <input
                            accept=".pdf,.docx"
                            {...register('files')} type='file' className="flex flex-col gap-3 text-center rounded-lg items-center justify-center border-[2px] border-dashed border-[#D9D9D9] px-3 py-5"
                            placeholder='Click or drag file to this area to upload'
                        >
                            {/* <Image src={file} alt='dra files'/> */}
                            {/* <p className="flex font-semibold">
                                Click or drag file to this area to upload
                            </p> */}
                        </input>
                        {errors.files && <p className="text-red-500 text-sm">{errors.files.message}</p>}
                    </div>
                    <div className="flex gap-2 justify-end p-4">
                        <button className="text-black font-semibold border[#D9D9D9] border-[1px] rounded-full pl-6 pr-6 pt-2 pb-2 "
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button className=" bg-[#01AEAD] hover:bg-[#05929c] rounded-full pl-6 pr-6 pt-2 pb-2 text-white"
                            type="submit"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProposalModal;

// old cv modal
{/* <div className="w-full flex fixed z-20 inset-0 sm:p-5 sm:items-center sm:justify-center lg:p-10">
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
</div> */}
