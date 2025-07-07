import { useState } from 'react';
import ReactSelect from '../../component/buttonSelect';
import Profile from '../../component/freelancers_gigs/profile';
import Table from '../../component/freelancers_gigs/gigPricingTable'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Button from '../../component/button';
import { useNavigate } from 'react-router-dom';

function Pricing() {
  const navigate = useNavigate()
  let data = [
    { name: 'Gig title', details: 'As your Gig storefront, your title is the most important place to include keywords that buyers would likely use to search for a service like yours.' },
    { name: 'Category', details: 'Choose the category and sub-category most suitable for your Gig.' },
    { name: 'Search tags', details: 'Tag your Gig with buzz words that are relevant to the services you offer. Use all 5 tags to get found.' },
  ]
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);

  return (
    <Profile>
      <div className='font-semibold text-2xl py-2 sm:border-b-[1px] sm:border-b-[#c4c4c4] sm:py-5'>
        <p className=''>Scope & Pricing</p>
      </div>
      <div className='mt-5'>
        <p className='text-gray-600 font-semibold'>Packages</p>
        <Table />
      </div>
      <div className="mt-5 flex sm:justify-end">
        <Button className='px-5 py-2' onClick={() => navigate('/freelancer/manage-gigs/description')}>Save & Continue</Button>
      </div>
    </Profile>
  )
}

export default Pricing