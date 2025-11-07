import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useApplyProject } from '../../api/client/project';
import { useLocation } from 'react-router-dom';
import { useApplyJob } from '../../api/client/job';
import { X, Upload, FileText, CheckCircle, ChevronDown } from 'lucide-react';

const schema = yup.object().shape({
    projectTitle: yup.string().required('Project title is required'),
    freelancerName: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    coverLetter: yup.string().min(50, 'Cover letter must be at least 50 characters').required('Cover letter is required'),
    proposedDeliverables: yup.string().required('Please list your proposed deliverables'),
    estimatedTime: yup.number().min(1, 'Time must be greater than 0').required('Estimated time is required'),
    timeUnit: yup.string().required('Time unit is required'),
    proposedBudget: yup.number().min(0, 'Budget cannot be negative').required('Proposed budget is required'),
    currency: yup.string().required('Currency is required'),
    paymentTerms: yup.string().required('Payment terms is required'),
    portfolioLinks: yup.string().url('Enter valid URL').required('Portfolio link is required'),
    additionalComments: yup.string(),
    acknowledgment: yup.boolean().oneOf([true], 'You must acknowledge the terms'),
    percentage: yup.string(),
    duration: yup.string(),
    CV: yup
        .mixed()
        .test('fileExists', 'Please upload your Resume', (value) => value?.length > 0)
        .test('fileType', 'Only PDF or DOCX allowed', (value) => {
            if (!value?.[0]) return false;
            return [
                'application/pdf',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ].includes(value[0].type);
        }),
});

const ProposalModal = ({ onClose, data, freelancerData }) => {
    const [fileName, setFileName] = useState('');
    const [sampleFiles, setSampleFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [step, setStep] = useState(1);
    const [milestonePayment, setMilestonePayment] = useState([])

    const { firstName, lastName, id: freelancerId, email } = freelancerData;
    const clientID = data[0]?.clientID;
    const projectID = data[0]?.id;
    const projectTitle = data[0]?.title;
    const pathName = useLocation().pathname;

    const addMilestonePayment = () => {
        const duration = watch("duration")
        const percentage = watch("percentage")
        setMilestonePayment([...milestonePayment, { percentage: percentage, duration: duration }])
        setValue("duration", "")
        setValue("percentage", "")
    }

    const removeEducation = (index) => {
        const updatedmilestone = milestonePayment.filter((_, i) => i !== index)
        setMilestonePayment(updatedmilestone)
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur',
        defaultValues: {
            projectTitle: projectTitle || '',
            freelancerName: firstName + " " + lastName,
            email: email,
            timeUnit: 'days',
            currency: 'USD',
            paymentTerms: 'fixed',
            percentage: "",
            duration: ""
        },
    });

    const { submitProposals, isPending } = useApplyProject();
    const { submitJob } = useApplyJob();
    const acknowledgment = watch('acknowledgment');
    const paymentTerms = watch('paymentTerms');

    const onSubmit = (formData) => {
        console.log('Form Data:', formData);
        const updateData = {
            ...formData,
            projectId: projectID,
            clientId: clientID,
            freelancerId: freelancerId,
            milestonePayment: milestonePayment
        };

        const formDataObj = new FormData();
        for (const key in updateData) {
            if (key === 'CV') {
                if (updateData.CV?.[0]) formDataObj.append('files', updateData.CV[0]);
            } else if (Array.isArray(updateData[key])) {
                formDataObj.append(key, JSON.stringify(updateData[key]));
            } else {
                formDataObj.append(key, updateData[key]);
            }
        }

        // sampleFiles.forEach((file) => {
        //     formDataObj.append('sampleFiles', file);
        // });

        if (pathName.includes('manage-jobs')) {
            submitJob(formDataObj);
            console.log('Submitted Proposal:', updateData);

        } else {
            submitProposals(formDataObj);
            console.log('Submitted Proposal:', updateData);
        }
        // onClose();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setValue('CV', Array.from(e.target.files));
        }
    };

    const handleSampleFiles = (e) => {
        const files = Array.from(e.target.files || []);
        setSampleFiles([...sampleFiles, ...files]);
    };

    const removeSampleFile = (index) => {
        setSampleFiles(sampleFiles.filter((_, i) => i !== index));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files?.[0]) {
            setFileName(files[0].name);
            setValue('CV', Array.from(files));
        }
    };

    const totalSteps = 5;
    const stepTitles = ['Project Details', 'Proposal Overview', 'Pricing', 'Experience', 'Confirmation'];

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="bg-gradient-to-r from-teal-50 to-indigo-50 px-6 sm:px-8 py-4 sm:py-6 border-b border-gray-100 flex justify-between items-start">
                    <div className="flex-1">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Submit Proposal</h1>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">Step {step} of {totalSteps}: {stepTitles[step - 1]}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white rounded-full transition-all duration-200 text-gray-500 hover:text-gray-900 flex-shrink-0"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-gray-200">
                    <div
                        className="h-full  bg-gradient-to-r from-[#44A4AD] via-[#2E7A81] to-[#1C4C50] transition-all duration-300"
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                    />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto flex-1">
                    <div className="p-6 sm:p-8">
                        <div className="space-y-6">
                            {/* STEP 1: Project & Freelancer Details */}
                            {step === 1 && (
                                <div className="space-y-6 animate-in fade-in">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Project Title <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            {...register('projectTitle')}
                                            disabled
                                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-gray-50 text-gray-600"
                                        />
                                        {errors.projectTitle && <p className="text-red-500 text-sm mt-2">{errors.projectTitle.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Freelancer / Company Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            {...register('freelancerName')}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#44A4AD] focus:border-transparent outline-none transition-all placeholder-gray-400"
                                            placeholder="Your name or company"
                                        />
                                        {errors.freelancerName && <p className="text-red-500 text-sm mt-2">{errors.freelancerName.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Contact Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            {...register('email')}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#44A4AD] focus:border-transparent outline-none transition-all placeholder-gray-400"
                                            placeholder="your@email.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: Proposal Overview */}
                            {step === 2 && (
                                <div className="space-y-6 animate-in fade-in">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Cover Letter <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            {...register('coverLetter')}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#44A4AD] focus:border-transparent outline-none transition-all placeholder-gray-400 resize-none"
                                            rows="5"
                                            placeholder="Explain your understanding of the project and your proposed approach..."
                                        />
                                        {errors.coverLetter && <p className="text-red-500 text-sm mt-2">{errors.coverLetter.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Proposed Deliverables <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            {...register('proposedDeliverables')}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#44A4AD] focus:border-transparent outline-none transition-all placeholder-gray-400 resize-none"
                                            rows="4"
                                            placeholder="List the items you commit to delivering (one per line)..."
                                        />
                                        {errors.proposedDeliverables && <p className="text-red-500 text-sm mt-2">{errors.proposedDeliverables.message}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Estimated Time <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                {...register('estimatedTime')}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#44A4AD] focus:border-transparent outline-none transition-all"
                                                placeholder="e.g., 15"
                                            />
                                            {errors.estimatedTime && <p className="text-red-500 text-sm mt-2">{errors.estimatedTime.message}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Time Unit <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                {...register('timeUnit')}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#44A4AD] focus:border-transparent outline-none transition-all appearance-none cursor-pointer bg-white"
                                            >
                                                <option value="hours">Hours</option>
                                                <option value="days">Days</option>
                                                <option value="weeks">Weeks</option>
                                                <option value="months">Months</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: Pricing Details */}
                            {step === 3 && (
                                <div className="space-y-6 animate-in fade-in">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Proposed Budget <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                {...register('proposedBudget')}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#44A4AD] focus:border-transparent outline-none transition-all"
                                                placeholder="0.00"
                                            />
                                            {errors.proposedBudget && <p className="text-red-500 text-sm mt-2">{errors.proposedBudget.message}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Currency <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                {...register('currency')}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#44A4AD] focus:border-transparent outline-none transition-all appearance-none cursor-pointer bg-white"
                                            >
                                                <option value="USD">USD</option>
                                                {/* <option value="EUR">EUR</option>
                                                <option value="GBP">GBP</option>
                                                <option value="PKR">PKR</option>
                                                <option value="AED">AED</option>  */}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-4">
                                            Payment Terms <span className="text-red-500">*</span>
                                        </label>
                                        <div className="space-y-3">
                                            {[
                                                { value: 'fixed', label: 'Fixed Price', desc: 'One-time payment for the entire project' },
                                                { value: 'milestone', label: 'Milestone Based', desc: 'Payment divided into project milestones' },
                                                { value: 'hourly', label: 'Hourly', desc: 'Payment based on hours worked' }
                                            ].map(option => (
                                                <label key={option.value} className="flex items-start gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-all">
                                                    <input
                                                        type="radio"
                                                        {...register('paymentTerms')}
                                                        value={option.value}
                                                        className="mt-1 w-4 h-4 text-blue-500 cursor-pointer"
                                                    />
                                                    <div>
                                                        <p className="font-medium text-gray-900">{option.label}</p>
                                                        <p className="text-xs text-gray-500">{option.desc}</p>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                        {paymentTerms === 'milestone' && (
                                            <div className="mt-3">
                                                <div>
                                                    <label className="block font-semibold text-lg mb-2">Add Milestone Payment</label>
                                                </div>
                                                <div>
                                                    <div className="space-y-3 border p-3 rounded-lg border-gray-300 mb-4">
                                                        <div className="flex flex-col sm:flex-row gap-3">
                                                            <input
                                                                type="text"
                                                                {...register('percentage')}
                                                                placeholder="Add Percentage"
                                                                // value={option.value || ""}
                                                                // onChange={(e) =>
                                                                //     setPercentage(e.target.value)
                                                                // }
                                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                            />
                                                            <input
                                                                type="text"
                                                                {...register('duration')}
                                                                placeholder="Add Duration"
                                                                // value={option.value || ""}
                                                                // onChange={(e) =>
                                                                //     setDuration(e.target.value)
                                                                // }
                                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={addMilestonePayment}
                                                                className="w-full sm:w-auto px-4 py-3 bg-[#01AEAD] text-white rounded hover:bg-cyan-600"
                                                            >
                                                                Add
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* {educationList.length > 0 && (
                                                        <div className="space-y-2 mb-4">
                                                            <h4 className="font-medium">Added Education:</h4>
                                                            {educationList.map((edu, index) => (
                                                                <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                                                                    <span>
                                                                        {edu.title} in {edu.major} from {edu.institution} ({edu.year})
                                                                    </span>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => removeEducation(index)}
                                                                        className="text-red-500 hover:text-red-700 text-sm"
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {errors.education && <p className="text-red-500 text-sm mt-2">{errors.education.message}</p>} */}
                                                </div>
                                                {milestonePayment.length > 0 && (
                                                    <>
                                                        {milestonePayment.map((item, index) => (
                                                            <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                                                                <span>
                                                                    {item.percentage} in {item.duration}
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeEducation(index)}
                                                                    className="text-red-500 hover:text-red-700 text-sm"
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </>
                                                )

                                                }
                                            </div>
                                        )}
                                        {errors.paymentTerms && <p className="text-red-500 text-sm mt-2">{errors.paymentTerms.message}</p>}
                                    </div>
                                </div>
                            )}

                            {/* STEP 4: Supporting Information */}
                            {step === 4 && (
                                <div className="space-y-6 animate-in fade-in">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Portfolio / Website Link <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="url"
                                            {...register('portfolioLinks')}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#44A4AD] focus:border-transparent outline-none transition-all placeholder-gray-400"
                                            placeholder="https://yourportfolio.com"
                                        />
                                        {errors.portfolioLinks && <p className="text-red-500 text-sm mt-2">{errors.portfolioLinks.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                                            Upload Proposals <span className="text-red-500">*</span>
                                        </label>
                                        <label
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            className={`relative flex flex-col items-center justify-center w-full px-6 py-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 ${isDragging
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                } ${fileName ? 'border-solid border-green-300 bg-green-50' : ''}`}
                                        >
                                            <input
                                                type="file"
                                                accept=".pdf,.docx"
                                                {...register('CV')}
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                {fileName ? (
                                                    <>
                                                        <CheckCircle className="w-10 h-10 text-green-500" />
                                                        <p className="text-sm font-semibold text-gray-900 text-center break-all">{fileName}</p>
                                                        <p className="text-xs text-gray-500">Click or drag to change</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Upload className="w-8 h-8 text-gray-400" />
                                                        <p className="text-sm font-semibold text-gray-900">Drag proposals here</p>
                                                        <p className="text-xs text-gray-500">or click to browse</p>
                                                        <p className="text-xs text-gray-400 mt-1">PDF or DOCX (max 5MB)</p>
                                                    </>
                                                )}
                                            </div>
                                        </label>
                                        {errors.CV && <p className="text-red-500 text-sm mt-2">{errors.CV.message}</p>}
                                    </div>

                                    {/* <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                                            Work Samples (Optional)
                                        </label>
                                        <label className="relative flex flex-col items-center justify-center w-full px-6 py-6 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-all">
                                            <input
                                                type="file"
                                                multiple
                                                {...register('workSamples')}
                                                onChange={handleSampleFiles}
                                                className="hidden"
                                            />
                                            <Upload className="w-6 h-6 text-gray-400 mb-2" />
                                            <p className="text-sm font-medium text-gray-900">Upload work samples</p>
                                            <p className="text-xs text-gray-500">or click to browse</p>
                                        </label>
                                        {sampleFiles.length > 0 && (
                                            <div className="mt-3 space-y-2">
                                                {sampleFiles.map((file, idx) => (
                                                    <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                                        <p className="text-sm text-gray-700 truncate">{file.name}</p>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeSampleFile(idx)}
                                                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div> */}

                                    {/* <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Additional Comments (Optional)
                                        </label>
                                        <textarea
                                            {...register('additionalComments')}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#44A4AD] focus:border-transparent outline-none transition-all placeholder-gray-400 resize-none"
                                            rows="3"
                                            placeholder="Any additional information you'd like to share..."
                                        />
                                    </div> */}
                                </div>
                            )}

                            {/* STEP 5: Confirmation */}
                            {step === 5 && (
                                <div className="space-y-6 animate-in fade-in">
                                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                                        <h3 className="font-semibold text-gray-900 mb-3">Proposal Summary</h3>
                                        <div className="space-y-2 text-sm text-gray-700">
                                            <p><span className="font-medium">Project:</span> {watch('projectTitle')}</p>
                                            <p><span className="font-medium">Budget:</span> {watch('proposedBudget')} {watch('currency')}</p>
                                            <p><span className="font-medium">Timeline:</span> {watch('estimatedTime')} {watch('timeUnit')}</p>
                                            <p><span className="font-medium">Payment:</span> {watch('paymentTerms')}</p>
                                        </div>
                                    </div>

                                    <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all">
                                        <input
                                            type="checkbox"
                                            {...register('acknowledgment')}
                                            className="mt-1 w-5 h-5 text-blue-500 rounded cursor-pointer"
                                        />
                                        <div>
                                            <p className="text-sm text-gray-900">
                                                I confirm that this proposal represents my original work and aligns with <span className="font-semibold">ICCD Talent Gate's guidelines</span>.
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">Please read our terms of service before submitting.</p>
                                        </div>
                                    </label>
                                    {errors.acknowledgment && <p className="text-red-500 text-sm">{errors.acknowledgment.message}</p>}

                                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                                        <p className="text-sm text-emerald-900">
                                            ✓ Your proposal is ready to submit. Make sure all information is accurate before proceeding.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="bg-gray-50 px-6 sm:px-8 py-4 border-t border-gray-100 flex gap-3">
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={() => setStep(step - 1)}
                            className="flex-1 px-4 py-3 border border-gray-200 text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200"
                        >
                            Back
                        </button>
                    )}
                    {step < totalSteps ? (
                        <button
                            type="button"
                            onClick={() => setStep(step + 1)}
                            className="flex-1 sm:flex-auto px-6 py-3  bg-gradient-to-r from-[#44A4AD] via-[#2E7A81] to-[#1C4C50] hover:from-[#2E7A81] hover:to-[#1C4C50] text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            type="submit"
                            onClick={handleSubmit(onSubmit)}
                            disabled={!acknowledgment || isPending}
                            className="flex-1 sm:flex-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg active:scale-95"
                        >
                            {isPending ? 'Submitting...' : 'Submit Proposal'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProposalModal;