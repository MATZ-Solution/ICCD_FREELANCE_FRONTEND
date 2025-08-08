import { useForm, Controller } from 'react-hook-form';
import ReactSelect from 'react-select';
import { useSelector } from "react-redux";
import services from "../../../data/gigsServiceData";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setGigsDetails } from '../../../redux/slices/gigsDetailSlice';
const packageTypes = ['Basic', 'Standard', 'Premium'];

const deliveryOptions = [
  { value: '1', label: '1 Day' },
  { value: '3', label: '3 Days' },
  { value: '7', label: '7 Days' },
];

const revisionsOptions = [
  { value: '1', label: '1 Revision' },
  { value: '3', label: '3 Revisions' },
  { value: 'Unlimited', label: 'Unlimited' },
];

const conceptsOptions = [
  { value: '1', label: '1 Concept' },
  { value: '2', label: '2 Concepts' },
  { value: '3', label: '3 Concepts' },
];

export default function PricingForm() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const gigs_details = useSelector(state => state.gigs.gigsDetails);

  const features = services.categories.filter(item => item.name === gigs_details.category)[0]?.
    subcategories?.filter(item => item.name === gigs_details.subCategory)[0]?.services

  const { control, register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const structuredData = {};
    packageTypes.forEach((pkgType, index) => {
      const pkgKey = pkgType.toLowerCase();
      const raw = data.packages?.[index] || {};
      const formattedFeatures = {};
      features.forEach((feature) => {
        formattedFeatures[feature.replace(/\s+/g, '_').toLowerCase()] = raw.features?.[feature] || false;
      });
      structuredData[pkgKey] = {
        packageType: pkgKey,
        name: raw.name || '',
        description: raw.description || '',
        delivery_time: raw.deliveryTime?.value || '',
        revisions: raw.revisions?.value || '',
        concepts: raw.concepts?.value || '',
        price: raw.price || '',
        ...formattedFeatures
      };
    });
    console.log({ packages: structuredData });
    if (location.pathname.includes('edit')) {
      editGigs(data)
      navigate(`/freelancer/manage-gigs/description/edit/${id}`)
    } else {
      dispatch(setGigsDetails({ packages: structuredData }));
      navigate('/freelancer/manage-gigs/description')
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Scope & Pricing</h2>
      <div className="flex flex-col gap-6 lg:flex-row">
        {packageTypes.map((pkgType, index) => (
          <div key={pkgType} className="flex-1 border rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-center">{pkgType}</h3>

            <label className="block text-sm font-medium">Name *</label>
            <input
              {...register(`packages.${index}.name`)}
              className="mt-2 w-full border p-2 rounded mb-4"
              placeholder="Name Your Package"
            />

            <label className="block text-sm font-medium">Description *</label>
            <textarea
              {...register(`packages.${index}.description`)}
              className="mt-2 w-full border p-2 rounded mb-4"
              placeholder="Describe your offering..."
            />

            <label className="block text-sm font-medium">Delivery Time *</label>
            <Controller
              control={control}
              name={`packages.${index}.deliveryTime`}
              render={({ field }) => (
                <ReactSelect
                  {...field}
                  options={deliveryOptions}
                  placeholder="Select"
                  className="mt-2 mb-4"
                />
              )}
            />

            <label className="block text-sm font-medium">Revisions *</label>
            <Controller
              control={control}
              name={`packages.${index}.revisions`}
              render={({ field }) => (
                <ReactSelect
                  {...field}
                  options={revisionsOptions}
                  placeholder="Select"
                  className="mt-2 mb-4"
                />
              )}
            />

            <label className="block text-sm font-medium">Concepts *</label>
            <Controller
              control={control}
              name={`packages.${index}.concepts`}
              render={({ field }) => (
                <ReactSelect
                  {...field}
                  options={conceptsOptions}
                  placeholder="Select"
                  className="mt-2 mb-4"
                />
              )}
            />

            <label className="block text-sm font-medium">Price ($) *</label>
            <input
              {...register(`packages.${index}.price`)}
              type="number"
              className="mt-2 w-full border p-2 rounded mb-4"
              placeholder="$"
            />

            {features?.map((feature, fIndex) => (
              <div key={fIndex} className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  {...register(`packages.${index}.features.${feature}`)}
                />
                <label>{feature}</label>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <button type="button" className="px-4 py-2 border rounded">
          Back
        </button>
        <button
          type="submit"
          className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700"
        >
          Save & Continue
        </button>
      </div>
    </form>
  );
}
