import BreadCrumbs from '../breadCrumbs'
import Button from '../button';


function Profile({ children }) {
  return (
    <div>
      <div className='flex flex-col gap-5 px-5 justify-between py-4 bg-white sm:flex-row sm:items-center sm:border-b-[1px] sm:border-b-[#c4c4c4] sm:px-10 md:px-20'>
        <BreadCrumbs />
        <Button>Save</Button>
      </div>
      <div className='bg-[#F8F8F8] w-full pb-10 px-6 sm:px-6 md:px-10 '>
        <div className='lg:px-10'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Profile