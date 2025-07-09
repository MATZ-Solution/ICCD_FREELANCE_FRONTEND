import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentIcon from '@mui/icons-material/Payment';
import LockIcon from '@mui/icons-material/Lock';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DoneIcon from '@mui/icons-material/Done';
import figmathumbnail from '../../assets/client_dashboard/blog1.png';

// 1. Yup validation schema
const paymentSchema = yup.object().shape({
    cardNumber: yup
        .string()
        .required('Card number zaroori hai')
        .matches(/^\d{16}$/, '16-digit number dalain'),
    expiry: yup
        .string()
        .required('Expiry date zaroori hai')
        .matches(/^(0[1-9]|1[0-2]) \/ ([0-9]{2})$/, 'Format 05 / 25 hona chahiye'),
    securityCode: yup
        .string()
        .required('Security code zaroori hai')
        .matches(/^\d{3}$/, '3-digit code hona chahiye'),
    cardholderName: yup
        .string()
        .min(3, "Name must be at least 3 characters")
        .required("Cardholder's name zaroori hai"),
    displayName: yup
        .string()
        .max(30, 'Max 30 characters'),
    saveCard: yup.boolean(),
});

const Payment = () => {
    // 2. React Hook Form init
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(paymentSchema),
    });

    // accordion refs & state
    const [method, setMethod] = useState('card');
    const cardRef = useRef(null);
    const paypalRef = useRef(null);
    const [cardHeight, setCardHeight] = useState('0px');
    const [paypalHeight, setPaypalHeight] = useState('0px');

    // useEffect(() => {
    //     if (method === 'card') {
    //         setCardHeight(`${cardRef.current.scrollHeight}px`);
    //     } else {
    //         setCardHeight('0px');
    //     }
    // }, [
    //     method,
    //     // Jab bhi errors change hon, dobara height nikaal lo
    //     Object.keys(errors).length
    // ]);

    useEffect(() => {
        // card panel
        setCardHeight(
            method === 'card'
                ? `${cardRef.current.scrollHeight}px`
                : '0px'
        );
        // paypal panel
        setPaypalHeight(
            method === 'paypal'
                ? `${paypalRef.current.scrollHeight}px`
                : '0px'
        );
    }, [method, Object.keys(errors).length]);

    // form submit handler
    const onSubmit = data => {
        console.log('Payment data:', data);
        // API call integration here
    };

    // PayPal redirect handler
    const handlePaypal = () => {
        // redirect logic
        window.location.href = '/api/paypal';
    };

    return (
        <div className="flex flex-col md:flex-row justify-center gap-10 lg:gap-20 py-4">
            {/* left section */}
            <div className="flex flex-col gap-5 w-full md:w-3/5 lg:w-2/3">
                <div className="w-full border border-gray-200">
                    <div className="bg-gray-50 border-b border-gray-300 px-3 py-2">
                        <h2 className="text-lg font-semibold text-gray-800">Payment Options</h2>
                    </div>

                    {/* Card Option */}
                    <div className="border-b border-gray-300 overflow-hidden">
                        <button
                            onClick={() => setMethod('card')}
                            className="w-full flex justify-between items-center px-4 py-3 bg-white cursor-pointer"
                        >
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="card"
                                    checked={method === 'card'}
                                    onChange={() => setMethod('card')}
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <span className="pl-2 text-lg text-gray-800">Credit & Debit Cards</span>
                            </label>
                            {method === 'card' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </button>
                        <div
                            ref={cardRef}
                            style={{ maxHeight: cardHeight }}
                            className="bg-gray-100 transition-all duration-300 overflow-hidden"
                        >
                            {/* 3. Form wrapper with id */}
                            <form
                                id="paymentForm"
                                onSubmit={handleSubmit(onSubmit)}
                                className="bg-gray-50 p-8 space-y-4"
                            >
                                {/* Card number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 text-start">Card number</label>
                                    <div className="relative">
                                        <CreditCardIcon className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            {...register('cardNumber')}
                                            placeholder="1234 5678 9012 3456"
                                            inputMode="numeric"           // numeric keypad mobile pe
                                            pattern="[0-9]*"              // validation hint
                                            onInput={e => {
                                                // non-digits hata do
                                                e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')
                                            }}
                                            className={`w-full rounded-lg pl-12 py-3 text-sm ${errors.cardNumber ? 'border border-red-500 focus:outline-red-500'
                                                : 'border border-gray-400 focus:outline-blue-500'
                                                }`}
                                        />
                                        <LockIcon className="absolute right-3 top-3 text-gray-400" />
                                    </div>
                                    {errors.cardNumber && (
                                        <p className="mt-1 text-sm text-start text-red-500">{errors.cardNumber.message}</p>
                                    )}
                                </div>

                                {/* Expiry & Security */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-start block text-sm font-medium text-gray-700 mb-1">Expiry date</label>
                                        <input
                                            {...register('expiry')}
                                            placeholder="MM / YY"
                                            inputMode="numeric"
                                            pattern="\d{2} \/ \d{2}"
                                            maxLength={7}
                                            onInput={e => {
                                                // sirf digits aur slash
                                                let v = e.currentTarget.value.replace(/[^\d]/g, '')
                                                if (v.length > 2) v = v.slice(0, 2) + ' / ' + v.slice(2, 4)
                                                e.currentTarget.value = v
                                            }}
                                            className={`w-full rounded-lg px-4 py-3 text-sm ${errors.expiry ? 'border border-red-500 focus:outline-red-500'
                                                : 'border border-gray-400 focus:outline-blue-500'
                                                }`}
                                        />
                                        {errors.expiry && <p className="text-start mt-1 text-sm text-red-500">{errors.expiry.message}</p>}
                                    </div>
                                    <div>
                                        <label className="text-start block text-sm font-medium text-gray-700 mb-1">
                                            Security code <span title="What's this?">?</span>
                                        </label>
                                        <input
                                            {...register('securityCode')}
                                            placeholder="123"
                                            pattern="\d{3}"
                                            maxLength={3}
                                            onInput={e => {
                                                e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')
                                            }}
                                            className={`w-full rounded-lg px-4 py-3 text-sm ${errors.securityCode ? 'border border-red-500 focus:outline-red-500'
                                                : 'border border-gray-400 focus:outline-blue-500'
                                                }`}
                                        />
                                        {errors.securityCode && (
                                            <p className="text-start mt-1 text-sm text-red-500">{errors.securityCode.message}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Cardholder */}
                                <div>
                                    <label className="text-start block text-sm font-medium text-gray-700 mb-1">Cardholder's name</label>
                                    <input
                                        {...register('cardholderName',)}
                                        placeholder="As written on card"
                                        minLength={3}
                                        className={`w-full rounded-lg px-4 py-3 text-sm ${errors.cardholderName ? 'border border-red-500 focus:outline-red-500'
                                            : 'border border-gray-400 focus:outline-blue-500'
                                            }`}
                                    />
                                    {errors.cardholderName && (
                                        <p className="text-start mt-1 text-sm text-red-500">{errors.cardholderName.message}</p>
                                    )}
                                </div>

                                {/* Display name & save */}
                                <div>
                                    <label className="text-start block text-sm font-medium text-gray-700 mb-1">
                                        Card display name <span>(Optional)</span>
                                    </label>
                                    <input
                                        {...register('displayName')}
                                        placeholder="e.g. Marketing card…"
                                        inputMode="text"
                                        pattern="[A-Za-z\s]+"
                                        minLength={3}
                                        onInput={e => {
                                            // sirf letters aur spaces
                                            e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s]/g, '')
                                        }}
                                        className={`w-full rounded-lg px-4 py-3 text-sm ${errors.displayName ? 'border border-red-500 focus:outline-red-500'
                                            : 'border border-gray-400 focus:outline-blue-500'
                                            }`}
                                    />
                                    <div className="text-right text-xs text-gray-500">
                                        {/* you can show dynamic char count here */}
                                    </div>
                                    {errors.displayName && (
                                        <p className="text-start mt-1 text-sm text-red-500">{errors.displayName.message}</p>
                                    )}
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        {...register('saveCard')}
                                        className="form-checkbox h-4 w-4 text-blue-600"
                                    />
                                    <label className="ml-2 text-sm">Save this card for future payments</label>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* PayPal Option */}
                    <div className="border-b border-gray-300">
                        <button
                            onClick={() => setMethod('paypal')}
                            className="w-full flex justify-between items-center px-4 py-3 bg-white cursor-pointer"
                        >
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="paypal"
                                    checked={method === 'paypal'}
                                    onChange={() => setMethod('paypal')}
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <span className="pl-2 text-lg text-gray-800">PayPal</span>
                            </label>
                            {method === 'paypal' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </button>
                        <div
                            ref={paypalRef}
                            style={{ maxHeight: paypalHeight }}
                            className="transition-all duration-300 bg-gray-50 text-gray-700"
                        >
                            <div className='text-lg py-4'> Redirect to PayPal for payment.</div>
                        </div>
                    </div>
                </div>

                {/* Billing Info */}
                <div className="w-full border border-gray-200">
                    <div className='bg-gray-50 border-b border-gray-300 px-3 py-2'>
                        <h2 className="text-start text-lg text-gray-800 font-semibold">Billing Information</h2>
                    </div>
                    <div className='p-6'>
                        <div className='flex justify-between gap-2 items-center space-y-1'>
                            <p className='text-base text-start'>Your invoice will be issued according to the details listed here.</p>
                            <button className='shrink-0 text-base border px-3 py-1 cursor-pointer hover:bg-gray-50'>Add details</button>
                        </div>
                        <div>
                            <p className='text-base text-start font-semibold'>butt1997</p>
                            <p className='text-base text-start'>Pakistan</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* right summary */}
            <div className="w-full md:w-2/5 lg:w-1/3">
                <div className='border border-gray-200 bg-gray-50 py-3 px-5'>
                    <div className="flex gap-5 items-center mb-3">
                        <img src={figmathumbnail} alt="Figma thumbnail" className="w-32 h-16 object-cover rounded" />
                        <div className="">
                            <p className="text-xs text-gray-800 text-start font-medium">I will create figma ui ux design website mockup and figma website design</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className='text-sm font-semibold text-gray-800'>Single page</span>
                            <span className='text-sm font-semibold text-gray-800'>PKR 2,979.41</span>
                        </div>
                        <ul className="text-start text-sm space-y-1 text-gray-700">
                            <li><DoneIcon fontSize="small" /> 1 page</li>
                            <li><DoneIcon fontSize="small" /> Responsive design</li>
                            <li><DoneIcon fontSize="small" /> Source file</li>
                            <li><DoneIcon fontSize="small" /> Unlimited revisions</li>
                        </ul>
                    </div>
                </div>
                <div className="text-start py-3 px-5 border-b border-x border-gray-200">
                    <p className="text-sm text-gray-800">Enter promo code <span className="text-gray-800">?</span></p>
                </div>
                <div className="flex justify-between py-3 px-5 text-sm border-b border-x border-gray-200">
                    <span>Service fee <span className="text-gray-800">?</span></span>
                    <span>PKR 1,206.66</span>
                </div>
                <div className='px-5 border-x border-gray-200 border-b'>
                    <div className="pt-3 flex justify-between font-semibold">
                        <span className='text-base text-gray-800'>Total</span>
                        <span className='text-base text-gray-800'>PKR 4,186.07</span>
                    </div>
                    <p className="text-xs text-gray-800 text-start pt-2">Total delivery time 4 days</p>
                    <p className='text-xs text-start text-gray-800 py-3'>By clicking the button, you agree to Fiverr's <span className='underline'>Terms of Service</span> and <span className='underline'>Payment Terms</span></p>

                    {method === 'card' ? (
                        <button
                            type="submit"
                            form="paymentForm"
                            className="w-full py-2 bg-black text-white rounded hover:opacity-90 text-base mb-2"
                        >
                            Confirm & Pay
                        </button>
                    ) : (
                        <button
                            onClick={handlePaypal}
                            className="w-full py-2 bg-black text-white rounded hover:opacity-90 text-base mb-2"
                        >
                            Pay with PayPal
                        </button>
                    )}
                    <div className="flex items-center justify-center text-sm font-medium text-gray-800">
                        <LockIcon className="mr-1" fontSize="small" /> SSL Secure Payment
                    </div>
                    <p className="px-5 pt-2 pb-4 text-xs text-start text-gray-800 mt-2 border-gray-200">You will be charged PKR 4,186.07. Total amount includes currency conversion fees.</p>
                </div>

            </div>
        </div>
    );
};

export default Payment;