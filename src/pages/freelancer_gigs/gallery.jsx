import Profile from '../../component/freelancers_gigs/profile';
import { useState } from 'react';
import Button from '../../component/button';
import CollectionsIcon from '@mui/icons-material/Collections';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAddGigs, useGetSingleGigs } from '../../../api/client/gigs';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resetGigDetails } from '../../../redux/slices/gigsDetailSlice';

function Gallery() {
  const { id } = useParams();
  const data = useSelector(state => state.gigs.gigsDetails);
  const profileDetails = useSelector(state => state.userProfile.userProfile);
  const { addGigs, isSuccess, isPending, isError, error } = useAddGigs();
  const { data: gigsData } = useGetSingleGigs(id);
  console.log("gigs details: ", gigsData);

  const [images, setImages] = useState([null, null, null]);

  const handleReplaceImage = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = file;
        return newImages;
      });
    }
  };

  const handleDeleteImage = (indexToDelete) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[indexToDelete] = null;
      return newImages;
    });
  };

  const onSubmit = () => {
    const formData = new FormData();
    for (const key in data) {
      if (key === 'packages') {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    }

    images.forEach((file) => {
      if (file) formData.append("files", file);
    });

    formData.append('freelancerId', profileDetails.id);
    addGigs(formData);
  };

  return (
    <Profile>
      <div className='md:py-5'>
        <p className='text-lg font-semibold sm:text-2xl'>Showcase Your Services In A Gig Gallery</p>
        <p className='text-[#515151] mt-3'>Encourage buyers to choose your Gig by featuring a variety of your work.</p>
        <div className='bg-[#EEEEEE] mt-3 p-5'>
          <p className='text-[#515151]'>
            Help buyers find your services more easily by adding tags to all your work samples. To comply with ICCD Freelance’s
            terms of service, make sure to upload only content you either own or have the permission or license to use.
          </p>
        </div>
      </div>

      <div className='py-5 sm:border-y-2 sm:border-[#ecebeb] sm:py-8'>
        <p className='text-medium font-bold'>Images (up to 3)</p>
        <p className='text-[#515151] text-sm'>Get noticed by the right buyers with visual example of your services.</p>

        <div className="mt-4 flex gap-4 flex-wrap sm:flex-nowrap">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="w-52 h-32 flex flex-col items-center justify-center border border-gray-300 relative overflow-hidden rounded">
              {images[index] ? (
                <>
                  <img
                    src={URL.createObjectURL(images[index])}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleDeleteImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                  >
                    ×
                  </button>
                </>
              ) : (
                <>
                  <input
                    id={`file-input-${index}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleReplaceImage(index, e)}
                    className="hidden"
                  />
                  <label
                    htmlFor={`file-input-${index}`}
                    className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
                  >
                    <CollectionsIcon style={{ scale: 2 }} className="text-gray-400" />
                    <p className="text-gray-500 mt-3 text-sm font-semibold">Drop a Photo</p>
                    <p className="text-blue-500 text-sm">Browse</p>
                  </label>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex sm:justify-end">
        <Button className='px-5 py-2' onClick={onSubmit}>Save & Continue</Button>
      </div>
    </Profile>
  );
}

export default Gallery;
