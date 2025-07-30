import { lazy, Suspense, useEffect, useState } from 'react';
import CollectionsIcon from '@mui/icons-material/Collections';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAddGigs, useEditGigsFiles, useGetGigsFiles } from '../../../api/client/gigs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ICCDLoader from '../../component/loader';

// Lazy loaded components
const Profile = lazy(() => import('../../component/freelancers_gigs/profile'));
const Button = lazy(() => import('../../component/button'));

// Loader fallback
// const ICCDLoader = () => <div className="text-center py-5 font-medium">Loading...</div>;

function Gallery() {
  const { id } = useParams();
  const location = useLocation();

  const { addGigs } = useAddGigs();
  const { editGigsFiles } = useEditGigsFiles(id);
  const { data: gigsData } = useGetGigsFiles(id);

  const [images, setImages] = useState([]);
  const [delImgFileKey, setDelImgFileKey] = useState([]);

  useEffect(() => {
    setImages(gigsData || []);
  }, [gigsData]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (images.length >= 3) {
      toast.warn("Only 3 images allowed");
      return;
    }

    const fileUrl = URL.createObjectURL(file);
    setImages((prev) => [...prev, { file, fileUrl }]);
  };

  const handleDeleteImage = (fileObj) => {
    if (fileObj?.fileKey) {
      setDelImgFileKey((prev) => [...prev, fileObj.fileKey]);
    }
    setImages((prev) => prev.filter((img) => img.fileUrl !== fileObj.fileUrl));
  };

  const onSubmit = async () => {
    const formData = new FormData();

    if (delImgFileKey.length > 0) {
      formData.append('delFilesKey', JSON.stringify(delImgFileKey));
    }

    images.forEach((img) => {
      if (img.file) formData.append('files', img.file);
    });

    try {
      if (location.pathname.includes('edit')) {
        await editGigsFiles(formData);
        toast.success("Images updated successfully!");
      } else {
        await addGigs(formData);
        toast.success("Images uploaded successfully!");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Suspense fallback={<ICCDLoader />}>
      <Profile>
        <div className="md:py-5">
          <p className="text-lg font-semibold sm:text-2xl">Showcase Your Services In A Gig Gallery</p>
          <p className="text-[#515151] mt-3">
            Encourage buyers to choose your Gig by featuring a variety of your work.
          </p>
          <div className="bg-[#EEEEEE] mt-3 p-5">
            <p className="text-[#515151]">
              Help buyers find your services more easily by adding tags to all your work samples.
              To comply with ICCD Freelance’s terms of service, make sure to upload only content
              you either own or have the permission or license to use.
            </p>
          </div>
        </div>

        <div className="py-5 sm:border-y-2 sm:border-[#ecebeb] sm:py-8">
          <p className="text-medium font-bold">Images (up to 3)</p>
          <p className="text-[#515151] text-sm">
            Get noticed by the right buyers with visual examples of your services.
          </p>

          <div className="mt-4 flex gap-4 flex-wrap sm:flex-nowrap">
            {images?.map((item, index) => (
              <div
                key={index}
                className="w-52 h-32 flex items-center justify-center border border-gray-300 relative overflow-hidden rounded"
              >
                <img
                  src={item?.fileUrl}
                  alt={`Preview ${index}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleDeleteImage(item)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}

            {images.length < 3 &&
              Array.from({ length: 3 - images.length }).map((_, i) => (
                <div
                  key={`drop-${i}`}
                  className="w-52 h-32 border-2 border-dashed border-gray-300 rounded flex items-center justify-center relative"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center pointer-events-none">
                    <CollectionsIcon style={{ scale: 2 }} className="text-gray-400" />
                    <p className="text-gray-500 mt-3 text-sm font-semibold">Drop a Photo</p>
                    <p className="text-blue-500 text-sm">Browse</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-5 flex sm:justify-end">
          <Button className="px-5 py-2" onClick={onSubmit}>
            Save & Continue
          </Button>
        </div>
      </Profile>
    </Suspense>
  );
}

export default Gallery;
